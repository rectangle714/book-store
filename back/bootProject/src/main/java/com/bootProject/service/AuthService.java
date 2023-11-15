package com.bootProject.service;

import com.bootProject.common.util.CookieUtil;
import com.bootProject.common.util.RedisUtil;
import com.bootProject.common.code.ErrorCode;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDTO;
import com.bootProject.entity.Member;
import com.bootProject.entity.Role;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.oauth2.SocialType;
import com.bootProject.repository.member.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;
    private final CookieUtil cookieUtil;
    @Value(value = "${jwt.token.accessTokenExpireTime}")
    private long accessTokenExpireTime;
    @Value(value = "${jwt.token.refreshTokenExpireTime}")
    private long refreshTokenExpireTime;

    /** 네이버 로그인 관련 config 값 **/
    @Value("${spring.security.oauth2.client.provider.naver.authorization-uri}")
    private String naverUrl;
    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String naverTokenUri;
    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String naverClientId;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String naverClientSecret;
    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String naverRedirectUri;

    /** 카카오 로그인 관련 config 값 **/
    /*@Value("${spring.security.oauth2.client.registration.kakao.base-url}")
    private String kakaoUrl;*/
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Transactional
    public MemberDTO signup(MemberDTO requestDto) throws BusinessException {
        MemberDTO memberDTO = new MemberDTO();
        if(!memberRepository.existsByEmail(requestDto.getEmail())) {
            Member member = requestDto.toMember(passwordEncoder);
            return memberDTO= MemberDTO.of(memberRepository.save(member));
        }else {
            log.debug("이미 가입되어 있는 유저입니다.");
            throw new BusinessException(ErrorCode.DUPLICATE_LOGIN_ID, ErrorCode.DUPLICATE_LOGIN_ID.getDescription());
        }
    }

    @Transactional
    public TokenDTO login(MemberDTO requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        TokenDTO token = new TokenDTO();
        token = tokenProvider.generateTokenDto(authentication);
        redisUtil.setData(authentication.getName(), token.getRefreshToken(), token.getRefreshTokenExpiresIn());

        return token;
    }

    @Transactional
    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        try {
            Cookie cookie = cookieUtil.getCookie(request, "accessToken");
            String accessToken = cookie.getValue();
            String memberId = tokenProvider.parseClaims(accessToken).getSubject();

            // 레디스 refreshtoken 제거
            redisUtil.deleteData(memberId);

            Long expiration = (tokenProvider.parseClaims(accessToken).getExpiration().getTime() - (new Date().getTime()));
            if(expiration <= 0){
                expiration = 1L;
            }
            redisUtil.setBlackList(accessToken, "access_token", expiration);

            cookieUtil.expiringCookie(request, response, "accessToken");
        } catch (NullPointerException e) {
            log.debug("[로그아웃] 쿠키가 비어있습니다.");
        }
    }

    public TokenDTO getNaverUserByToken(String token) {

        try {
            String accessToken = token;

            URL url = new URL("https://openapi.naver.com/v1/nid/me");
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", "bearer" + " " + accessToken);

            int responseCode = con.getResponseCode();
            BufferedReader br;

            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }

            br.close();

            /** 회원 여부 확인 후 없으면 생성, 토큰 생성 **/
            String resultUser = response.toString();

            JSONObject jObject = new JSONObject(resultUser);
            JSONObject responseObj = jObject.getJSONObject("response");
            String socialId = responseObj.getString("id");
            String userEmail = responseObj.getString("email");
            String userName = responseObj.getString("name");

            // email로 확인 후 있으면 로그인 없으면 사용자 저장
            String generatedAccessToken = "";
            Member member = memberRepository.findByEmail(userEmail).orElse(null);

            TokenDTO newToken = new TokenDTO();
            if(member != null) {
                newToken = tokenProvider.generateTokenDtoByOauth(member.getEmail());
                redisUtil.setData(member.getEmail(), newToken.getRefreshToken(), newToken.getRefreshTokenExpiresIn());
            } else {
                Member guest = Member.builder()
                        .email(userEmail)
                        .name(userName)
                        .role(Role.GUEST)
                        .socialId(socialId)
                        .socialType(SocialType.NAVER)
                        .build();
                guest = memberRepository.save(guest);
                newToken = tokenProvider.generateTokenDtoByOauth(guest.getEmail());
                redisUtil.setData(guest.getEmail(), newToken.getRefreshToken(), newToken.getRefreshTokenExpiresIn());
            }

            Authentication auth = null;
            auth = tokenProvider.getAuthentication(newToken.getAccessToken());
            SecurityContextHolder.getContext().setAuthentication(auth);
            return newToken;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
