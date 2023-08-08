package com.bootProject.jwt;

import com.bootProject.common.RedisUtil;
import com.bootProject.entity.Member;
import com.bootProject.entity.RefreshToken;
import com.bootProject.repository.MemberRepository;
import com.bootProject.repository.RefreshTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = resolveToken(request);

        try {
            // 액세스 토큰 블랙리스트 체크
            if(!redisUtil.hasKeyBlackList(jwt)) {
                Authentication auth = null;

                if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                    auth = tokenProvider.getAuthentication(jwt);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    String memberId = tokenProvider.getSubjectFromRefreshToken(jwt);
                    String redisRefreshToken = redisUtil.getData(memberId);

                    if(null != redisRefreshToken) {
                        String token = tokenProvider.generateAccessToken(memberId);
                        auth = tokenProvider.getAuthentication(token);
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
