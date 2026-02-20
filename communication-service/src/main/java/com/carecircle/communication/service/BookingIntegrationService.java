package com.carecircle.communication.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

import java.util.UUID;
import java.util.Map;

@Service
public class BookingIntegrationService {

    private final RestClient restClient;
    private static final String BOOKING_SERVICE_URL = "http://matching-booking-service:8085";

    public BookingIntegrationService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl(BOOKING_SERVICE_URL).build();
    }

    public record BookingDetailResponse(
            UUID id,
            UUID parentId,
            String parentName,
            UUID caregiverId,
            String caregiverName,
            UUID serviceId,
            String bookingType,
            String status
    ) {}

    public BookingDetailResponse getBooking(UUID bookingId) {
        try {
            var requestSpec = restClient.get()
                    .uri("/bookings/" + bookingId);
            
            addAuthHeaders(requestSpec);

            return requestSpec
                    .retrieve()
                    .body(BookingDetailResponse.class);
        } catch (Exception e) {
            System.err.println("Error fetching booking info: " + e.getMessage());
            return null; // or throw custom exception
        }
    }

    private void addAuthHeaders(RestClient.RequestHeadersSpec<?> requestSpec) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest currentRequest = attributes.getRequest();
            String auth = currentRequest.getHeader("Authorization");
            String userEmail = currentRequest.getHeader("X-User-Email");
            String userRole = currentRequest.getHeader("X-User-Role");
            String userId = currentRequest.getHeader("X-User-Id");

            if (auth != null) requestSpec.header("Authorization", auth);
            if (userEmail != null) requestSpec.header("X-User-Email", userEmail);
            if (userRole != null) requestSpec.header("X-User-Role", userRole);
            if (userId != null) requestSpec.header("X-User-Id", userId);
        }
    }
}
