# 🔑 Auth Service

The Core Identity & Security engine of CareCircle-Pro. This service handles the entire lifecycle of a user's session, from registration to stateless verification.

## 🛠️ Tech Stack
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security 6 (Stateless)
- **Token Library**: JJWT (Java JWT)
- **Database**: MySQL (`carecircle_auth`)
- **Cache**: Redis (Session Revocation & Refresh Tokens)

## 🎯 Key Features
1.  **Stateless Authentication**: Issues high-entropy JWT Access Tokens.
2.  **Stateful Revocation**: Uses Redis to store "Blacklisted" tokens upon logout, allowing for instant session termination without state in the microservice.
3.  **Refresh Token Pattern**: Robust rotation of refresh tokens to keep users logged in securely.
4.  **BCrypt Hashing**: Passwords are never stored in plain text; protected by one-way salted hashing.

## 🔌 API Summary
| Path | Method | Description |
| :--- | :--- | :--- |
| `/auth/register` | `POST` | User registration (Parent/Caregiver). |
| `/auth/login` | `POST` | Credential verification & Token issuance. |
| `/auth/logout` | `POST` | Blacklisting Access Token in Redis. |
| `/auth/refresh` | `POST` | Reviving sessions via Refresh Tokens. |

## 🚀 Port & Configuration
- **Port**: `8081`
- **Internal Host**: `auth-service`

---
*Part of the CareCircle-Pro Distributed Ecosystem.*
