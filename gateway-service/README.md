# 🛡️ API Gateway

The Entrance & Security Guard of the CareCircle-Pro ecosystem. This service acts as a centralized entry point for all frontend traffic, providing routing, security, and identity translation.

## 🛠️ Tech Stack
- **Framework**: Spring Cloud Gateway
- **Security**: Spring Security 6 (Reactive)
- **Token Handling**: JWT Claims extraction & Redis Blacklist check.

## 🎯 Key Features
1.  **Uniform Routing**: Maps clean URL patterns (e.g., `/auth/**`) to specific internal microservice ports (e.g., `8081`).
2.  **JwtAuthFilter**: A global filter that intercepts every request, validates the JWT signature, and checks the **Redis Blacklist** to ensure the session hasn't been revoked via logout.
3.  **Identity Injection**: Once a token is validated, the Gateway extracts the `userId` and `role` from the claims and injects them as trusted headers (`X-User-Id`, `X-User-Role`) for downstream microservices.
4.  **CORS Management**: Centrally configured to allow secure communication with the React frontend.

## 🔌 Service Routes
| Route ID | Path Pattern | Internal Target |
| :--- | :--- | :--- |
| `auth-service` | `/auth/**` | `http://auth-service:8081` |
| `profile-service` | `/parents/**`, `/caregiver/**` | `http://user-profile-service:8083` |
| `booking-service` | `/bookings/**`, `/matching/**` | `http://matching-booking-service:8085` |
| `comm-service` | `/chats/**`, `/ws/**` | `http://communication-service:8082` |

## 🚀 Port & Configuration
- **Port**: `8080`
- **Internal Host**: `gateway-service`

---
*The gatekeeper of technical integrity and security.*
