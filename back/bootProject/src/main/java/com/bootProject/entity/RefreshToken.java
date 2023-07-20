package com.bootProject.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 3600)
public class RefreshToken {

    @Id
    private Long id;
    private String refreshToken;
    @Indexed
    private String accessToken;

}
