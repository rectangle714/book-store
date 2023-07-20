package com.bootProject.repository;

import com.bootProject.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String>{

    Optional<RefreshToken> findByAccessToken(String accesToken);


}
