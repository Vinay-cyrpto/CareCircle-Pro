package com.parentpulse.gateway_service.security;

import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class BlacklistService {

    private final ReactiveStringRedisTemplate redisTemplate;

    public BlacklistService(ReactiveStringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Check if Access Token is Blacklisted
     */
    public Mono<Boolean> isTokenBlacklisted(String accessToken) {
        return redisTemplate.hasKey("blacklist:" + accessToken);
    }
}
