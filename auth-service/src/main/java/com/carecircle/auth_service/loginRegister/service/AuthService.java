package com.carecircle.auth_service.loginRegister.service;

import com.carecircle.auth_service.loginRegister.dto.request.LoginRequest;
import com.carecircle.auth_service.loginRegister.dto.request.RegisterRequest;
import com.carecircle.auth_service.loginRegister.dto.request.*;

import com.carecircle.auth_service.loginRegister.dto.response.JwtResponse;
import com.carecircle.auth_service.loginRegister.dto.response.TokenRefreshResponse;
import com.carecircle.auth_service.loginRegister.dto.request.TokenRefreshRequest;

public interface AuthService {

    void register(RegisterRequest request);

    JwtResponse login(LoginRequest request);
    
    void verifyAccount(VerifyEmailRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    TokenRefreshResponse refreshToken(TokenRefreshRequest request);

    void logout(String token);
}


