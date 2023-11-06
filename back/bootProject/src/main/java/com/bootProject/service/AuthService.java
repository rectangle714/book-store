package com.bootProject.service;

import com.bootProject.common.CookieUtil;
import com.bootProject.common.RedisUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.NaverToken;
import com.bootProject.dto.TokenDTO;
import com.bootProject.entity.Member;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.common.code.ErrorCode;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.repository.member.MemberRepository;
import com.bootProject.repository.RefreshTokenRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
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
import java.util.Base64;
import java.util.Date;
import java.util.LinkedHashMap;

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

    /** 네이버 로그인 관련 config 값 **/
    @Value("${spring.security.oauth2.client.provider.naver.authorization-uri}")
    private String naverUrl;
    @Value("${spring.security.oauth2.client.provider.naver.token-url}")
    private String naverTokenUrl;
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

    public String getNaverAuthorizeUrl(String type, String accessToken) throws Exception {

        if("authorize".equals(type)) {
            String baseUrl = naverUrl;
            String clientId = naverClientId;
            String redirectUrl = naverRedirectUri;

            UriComponents uriComponents = UriComponentsBuilder
                    .fromUriString(baseUrl + "/" + type)
                    .queryParam("response_type", "code")
                    .queryParam("client_id", clientId)
                    .queryParam("redirectUrl", redirectUrl)
                    .queryParam("state", "test", "UTF-8")
                    .build();
            return uriComponents.toString();
        } else if("token".equals(type)) {
            String baseUrl = naverTokenUrl;
            String clientId = naverClientId;
            String clientSecret = naverClientSecret;
            String redirectUrl = naverRedirectUri;

            UriComponents uriComponents = UriComponentsBuilder
                    .fromUriString(baseUrl)
                    .queryParam("grant_type", "authorization_code")
                    .queryParam("client_id", clientId)
                    .queryParam("client_secret", clientSecret)
                    .queryParam("redirect_uri", redirectUrl)
                    .queryParam("code", accessToken)
                    .queryParam("state", URLEncoder.encode("test", "UTF-8"))
                    .build();
            try {
                URL url = new URL(uriComponents.toString());
                HttpURLConnection con = (HttpURLConnection)url.openConnection();
                con.setRequestMethod("GET");
                int responseCode = con.getResponseCode();
                BufferedReader br;

                if(responseCode == 200) {
                    br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                } else {
                    br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                }

                String inputLine = "";
                StringBuffer response = new StringBuffer();
                while((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }

                br.close();
                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
            }

            return uriComponents.toString();
        }
        return null;
    }

    public String getNaverUserByToken(String token) {

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

            String resultUser = response.toString();

            JSONObject jObject = new JSONObject(resultUser);
            JSONObject responseObj = jObject.getJSONObject("response");
            String email = responseObj.getString("email");
            String name = responseObj.getString("name");

            // email로 확인 후 있으면 로그인 없으면 회원가입으로 이동

            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
