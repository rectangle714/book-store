package com.bootProject.service;

import com.bootProject.common.CookieUtil;
import com.bootProject.common.RedisUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDTO;
import com.bootProject.entity.Member;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.repository.MemberRepository;
import com.bootProject.repository.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieUtil cookieUtil;

    @Transactional
    public MemberDTO signup(MemberDTO requestDto) {
        if(memberRepository.existsByEmail(requestDto.getEmail())) {
            log.debug("이미 가입되어 있는 유저입니다.");
        }

        Member member = requestDto.toMember(passwordEncoder);
        return MemberDTO.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDTO login(MemberDTO requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

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

}
