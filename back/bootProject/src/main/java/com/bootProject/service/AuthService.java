package com.bootProject.service;

import com.bootProject.common.RedisUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDTO;
import com.bootProject.entity.Member;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.repository.MemberRepository;
import com.bootProject.repository.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional()
    public MemberDTO signup(MemberDTO requestDto) {
        if(memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
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
    public void logOut(String accessToken) {
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        String currentMemberId = authentication.getName();

        // 레디스 refreshtoken 제거
        redisUtil.deleteData(currentMemberId);

        Long expiration = tokenProvider.getExpiration(accessToken);
        redisUtil.setBlackList(accessToken, "access_token", expiration);
        
    }

}
