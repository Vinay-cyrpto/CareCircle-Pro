package com.carecircle.auth_service.loginRegister.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class RedisSessionService {

    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.refreshExpiration}")
    private Long refreshTokenDurationMs;

    public RedisSessionService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Store Refresh Token in Redis: refreshToken:<id> -> userId
     */
    public String createRefreshToken(String userId) {
        String token = UUID.randomUUID().toString();
        String key = "refreshToken:" + token;
        
        redisTemplate.opsForValue().set(key, userId, refreshTokenDurationMs, TimeUnit.MILLISECONDS);
        
        return token;
    }

    /**
     * Get UserId from RefreshToken
     */
    public String getUserIdFromRefreshToken(String token) {
        return redisTemplate.opsForValue().get("refreshToken:" + token);
    }

    /**
     * Revoke Refresh Token (Delete from Redis)
     */
    public void deleteRefreshToken(String token) {
        redisTemplate.delete("refreshToken:" + token);
    }

    /**
     * Blacklist Access Token on Logout: blacklist:<accessToken> -> true
     * TTL should be the remaining life of the JWT.
     */
    public void blacklistAccessToken(String accessToken, long remainingTtlMs) {
        if (remainingTtlMs > 0) {
            redisTemplate.opsForValue().set("blacklist:" + accessToken, "true", remainingTtlMs, TimeUnit.MILLISECONDS);
        }
    }

    /**
     * Check if Access Token is Blacklisted
     */
    public boolean isTokenBlacklisted(String accessToken) {
        return Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:" + accessToken));
    }

    /**
     * Delete all refresh tokens for a specific user (Revoke all sessions)
     * Note: This is a bit expensive in large Redis DBs but works fine for this scale.
     */
    public void deleteUserSessions(String userId) {
        var keys = redisTemplate.keys("refreshToken:*");
        if (keys != null) {
            for (String key : keys) {
                String value = redisTemplate.opsForValue().get(key);
                if (userId.equals(value)) {
                    redisTemplate.delete(key);
                }
            }
        }
    }
}
