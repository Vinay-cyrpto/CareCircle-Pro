package com.carecircle.auth_service.loginRegister.dto.response;

import java.util.List;
import java.util.UUID;

public class JwtResponse {
  private String accessToken;
  private String type = "Bearer";
  private String refreshToken;
  private UUID id;
  private String email;
  private String role;

  public JwtResponse(String accessToken, String refreshToken, UUID id, String email, String role) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getRefreshToken() {
    return refreshToken;
  }

  public void setRefreshToken(String refreshToken) {
    this.refreshToken = refreshToken;
  }
  
  public String getRole() {
      return role;
  }

  public void setRole(String role) {
      this.role = role;
  }
}
