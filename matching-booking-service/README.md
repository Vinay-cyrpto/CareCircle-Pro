# 📅 Matching & Booking Service

The Transaction & Logic Engine of CareCircle-Pro. This service is responsible for the intelligent matching of caregivers to parents and managing the lifecycle of every caregiving contract.

## 🛠️ Tech Stack
- **Framework**: Spring Boot 3.x
- **Database**: MySQL (`carecircle_booking`)
- **Querying**: Spring Data JPA with custom JPQL for overlap validation.

## 🎯 Key Features
1.  **Elite Matchmaking Engine**: Filters caregivers by city, service type, and availability slots using optimized SQL queries.
2.  **Double-Booking Prevention**: Implements a strict **Overlap Check** algorithm. Before any booking is saved or accepted, the service validates scheduled time slots against existing `ACCEPTED` bookings to prevent deadlocks.
3.  **Lifecycle Management**: Drives the transition of bookings from `REQUESTED` to `ACCEPTED`, `COMPLETED`, or `CANCELLED`.
4.  **Rating Integration**: Records parent feedback and updates cumulative caregiver ratings post-service.

## 🔌 API Summary
| Path | Method | Description |
| :--- | :--- | :--- |
| `/matching/search` | `POST` | The search engine: find available caregivers. |
| `/bookings` | `POST` | Initiate a new booking (includes overlap check). |
| `/bookings/{id}/status` | `PUT` | State machine update (e.g. Accept, Complete). |
| `/bookings/rate` | `POST` | Feedback collection & Rating adjustment. |

## 🚀 Port & Configuration
- **Port**: `8085`
- **Internal Host**: `matching-booking-service`

---
*Powering the core matching logic that drives trust and reliability.*
