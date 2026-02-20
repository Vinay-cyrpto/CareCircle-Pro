package com.parentpulse.gateway_service.filter;

import com.parentpulse.gateway_service.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import com.parentpulse.gateway_service.security.BlacklistService;

import java.util.List;

@Component
public class JwtAuthFilter implements GlobalFilter {

    private final JwtUtil jwtUtil;
    private final BlacklistService blacklistService;

    // Gateway-level service prefixes (ADD MORE HERE LATER)
    private static final List<String> SERVICE_PREFIXES = List.of(
            "/matching-booking-service",
            "/user-profile-service",
            "/auth-service",
            "/communication-service");

    public JwtAuthFilter(JwtUtil jwtUtil, BlacklistService  blacklistService) {
        this.jwtUtil = jwtUtil;
        this.blacklistService = blacklistService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        // ===== PUBLIC ENDPOINTS =====
        if (path.startsWith("/auth/") ||
                path.startsWith("/actuator/") ||
                path.startsWith("/cities") ||
                path.startsWith("/services") ||
                path.startsWith("/ws")) {
            return chain.filter(exchange);
        }

        // ===== JWT REQUIRED =====
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        // Check Blacklist FIRST
        return blacklistService.isTokenBlacklisted(token)
                .flatMap(isBlacklisted -> {
                    if (isBlacklisted) {
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }

                    Claims claims;
                    try {
                        claims = jwtUtil.validateAndExtractClaims(token);
                    } catch (Exception e) {
                        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        return exchange.getResponse().setComplete();
                    }

                    String role = claims.get("role", String.class);
                    String userId = claims.get("userId", String.class);

                    // ===== NORMALIZE PATH (CRITICAL FIX) =====
                    String normalizedPath = normalizePath(path);

                    // ===== ROLE-BASED AUTHORIZATION =====
                    if (!isAuthorized(normalizedPath, role)) {
                        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                        return exchange.getResponse().setComplete();
                    }

                    // ===== FORWARD TRUSTED HEADERS =====
                    ServerWebExchange mutatedExchange = exchange.mutate()
                            .request(builder -> builder
                                    .headers(headers -> {
                                        headers.remove("X-User-Email");
                                        headers.remove("X-User-Role");
                                        headers.remove("X-Request-Source");
                                    })
                                    .header("X-User-Email", claims.getSubject())
                                    .header("X-User-Role", role)
                                    .header("X-User-Id", userId)
                                    .header("X-Request-Source", "GATEWAY"))
                            .build();

                    return chain.filter(mutatedExchange);
                });
    }

    // ===== PATH NORMALIZATION =====
    private String normalizePath(String path) {
        for (String prefix : SERVICE_PREFIXES) {
            if (path.startsWith(prefix + "/")) {
                return path.substring(prefix.length());
            }
        }
        return path;
    }

    // ===== AUTHORIZATION RULES =====
    private boolean isAuthorized(String path, String role) {
        // Relaxed Authorization:
        // We defer role-based access control to the downstream services.
        // The Gateway's job is simply to validate the JWT and forward user identity
        // headers.
        return true;
    }
}
