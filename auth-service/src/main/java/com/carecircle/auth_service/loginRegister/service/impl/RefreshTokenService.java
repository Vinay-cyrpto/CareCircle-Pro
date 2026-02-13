package com.carecircle.auth_service.loginRegister.service.impl;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carecircle.auth_service.loginRegister.exception.UserNotFoundException;
import com.carecircle.auth_service.loginRegister.model.RefreshToken;
import com.carecircle.auth_service.loginRegister.repository.RefreshTokenRepository;
import com.carecircle.auth_service.loginRegister.repository.UserRepository;

@Service
public class RefreshTokenService {
  @Value("${jwt.refreshExpiration}")
  private Long refreshTokenDurationMs;

  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;

  public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
    this.userRepository = userRepository;
  }

  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

  public RefreshToken createRefreshToken(UUID userId) {
    RefreshToken refreshToken = new RefreshToken();

    var user = userRepository.findById(userId).orElseThrow(
        () -> new UserNotFoundException("User not found: " + userId));

    refreshToken.setUser(user);
    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
    refreshToken.setToken(UUID.randomUUID().toString());

    refreshToken = refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new RuntimeException("Refresh token was expired. Please make a new signin request");
    }
    return token;
  }

  @Transactional
  public int deleteByUserId(UUID userId) {
    var user = userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException("User not found"));
    return refreshTokenRepository.deleteByUser(user);
  }
}
