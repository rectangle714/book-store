package com.bootProject.service;

import com.bootProject.dto.MemberRequestDto;
import com.bootProject.dto.MemberResponseDto;
import com.bootProject.dto.TokenDto;
import com.bootProject.entity.Member;
import com.bootProject.entity.RefreshToken;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.repository.MemberRepository;
import com.bootProject.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional()
    public MemberResponseDto signup(MemberRequestDto requestDto) {
        if(memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }

        Member member = requestDto.toMember(passwordEncoder);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDto login(MemberRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        TokenDto token = new TokenDto();
        token = tokenProvider.generateTokenDto(authentication);
        refreshTokenRepository.save(new RefreshToken(Long.valueOf(authentication.getName()), token.getRefreshToken(), token.getAccessToken()));

        return token;
    }

    public TokenDto validationToken(String token){
        TokenDto tokenDto = new TokenDto();
        tokenProvider.validateToken(token);

        return tokenDto;
    }

    @Transactional
    public void saveTokenInfo(Long memberId, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(memberId, refreshToken, accessToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        refreshTokenRepository.findByAccessToken(accessToken)
                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
    }

}
