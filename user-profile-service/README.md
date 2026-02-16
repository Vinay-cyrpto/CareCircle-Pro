# 👤 User Profile Service

The Persona & Metadata Management layer of CareCircle-Pro. This service manages the detailed information for Parent and Caregiver entities, ensuring data integrity through cross-service validation.

## 🛠️ Tech Stack
- **Framework**: Spring Boot 3.x
- **Database**: MySQL (`carecircle_profile`)
- **Integration**: Feign/RestTemplate for inter-service calls.

## 🎯 Key Features
1.  **Multi-Role Personas**: Specialized storage for Parents (children, addresses) and Caregivers (skills, experience, ratings).
2.  **Validation Bridge**: During profile creation, this service makes a synchronous REST call to the **Matching Service** to verify city/region data before committing to the database.
3.  **UUID Linking**: Profiles are linked to the Auth system via the `userId` UUID, ensuring strict separation of Identity and Persona.
4.  **Admin Moderation**: APIs for approving caregiver profiles and managing system-wide metadata.

## 🔌 API Summary
| Path | Method | Description |
| :--- | :--- | :--- |
| `/parents/profile` | `POST` | Creating a parent profile (validated against city data). |
| `/caregiver/profile` | `POST` | Onboarding a new caregiver. |
| `/children` | `POST/GET` | Managing child profiles for parents. |
| `/admin/profiles` | `PUT` | Moderating and approving user profiles. |

## 🚀 Port & Configuration
- **Port**: `8083`
- **Internal Host**: `user-profile-service`

---
*Ensuring every persona in the CareCircle ecosystem is verified and detailed.*
