package com.bootProject.jwt;

import com.bootProject.dto.TokenDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";

    private final long accessTokenExpireTime;
    private final long refreshTokenExpireTime;

    private final SecretKey accessKey;
    private final SecretKey refreshKey;

    public TokenProvider(
            @Value(value = "${jwt.token.accessTokenSecretKey}") final String accessTokenSecretKey,
            @Value(value = "${jwt.token.accessTokenExpireTime}") final long accessTokenExpireTime,
            @Value(value = "${jwt.token.refreshTokenSecretKey}") final String refreshTokenSecretKey,
            @Value(value = "${jwt.token.refreshTokenExpireTime}") final long refreshTokenExpireTime) {
        this.accessKey = Keys.hmacShaKeyFor(accessTokenSecretKey.getBytes(StandardCharsets.UTF_8));
        this.refreshKey = Keys.hmacShaKeyFor(refreshTokenSecretKey.getBytes(StandardCharsets.UTF_8));;
        this.accessTokenExpireTime = accessTokenExpireTime;
        this.refreshTokenExpireTime = refreshTokenExpireTime;
    }

    /**
    *   access 토큰 생성
    */
    public TokenDto generateTokenDto(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining());

        long now = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(now + accessTokenExpireTime);
        Date refreshTokenExpiresIn = new Date(now + refreshTokenExpireTime);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(accessKey, SignatureAlgorithm.HS256)
                .compact();

        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .signWith(refreshKey, SignatureAlgorithm.HS256)
                .compact();

        log.info("accessToken = {}", accessToken);
        log.info("refreshToken = {}", refreshToken);

        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshTokenExpiresIn(refreshTokenExpiresIn.getTime())
                .build();
    }
    /**
     *  refresh 토큰 생성
     *  access 토큰 만료 시 재발급의 용도이기 때문에 setClaim 없이 생성
     */
    public String generateRefreshToken(Authentication authentication) {
        Date now = new Date();
        Date expiresIn = new Date(now.getTime() + refreshTokenExpireTime);

        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(expiresIn)
                .signWith(refreshKey)
                .compact();
    }

    /**
     * 토큰 정보 확인
     */
    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);
        if(claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    /* 토큰 validation */
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(token);
            Date tokenExpirationDate = claims.getBody().getExpiration();
            validationTokenExpiration(tokenExpirationDate);

            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (JwtException | IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public void validationTokenExpiration(Date tokenExpirationDate) {
        if(tokenExpirationDate.before(new Date())) {
            throw new RuntimeException("refresh 토큰 시간이 만료되었습니다.");
        }
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }



}
