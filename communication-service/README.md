# 💬 Communication Service

The Interaction & Real-time Layer of CareCircle-Pro. This service enables high-trust, real-time messaging between parents and caregivers, enforced by critical business state.

## 🛠️ Tech Stack
- **Framework**: Spring Boot 3.x
- **Real-time**: Spring WebSocket with **STOMP** sub-protocol.
- **Protocol**: SockJS for cross-browser compatibility.
- **Database**: MySQL (`carecircle_comm`) for persistent chat history.

## 🎯 Key Features
1.  **Service Bridging Pattern**: A chat room is **not** created on registration. This service calls the **Booking Service** to verify that a booking is `ACCEPTED` or `COMPLETED` before a room is initialized.
2.  **Automated Participant Linking**: Once a booking is verified, the system automatically adds the Parent and Caregiver from the booking record to the chat room.
3.  **Safety Guards**: Integrates with the `BlockService` to prevent message broadcasting if a participant has blocked the sender.
4.  **WebSocket Persistence**: Unlike transient chats, every message is saved to MySQL for history, while simultaneously being broadcasted to all room participants via STOMP topics.

## 🔌 API Summary
| Path | Method | Description |
| :--- | :--- | :--- |
| `/chats/rooms` | `POST` | Initialize a room for a specific `bookingId`. |
| `/chats/messages` | `GET` | Retrieve persistent chat history. |
| `/ws` | `WS` | The WebSocket endpoint for real-time STOMP connection. |

## 🚀 Port & Configuration
- **Port**: `8082`
- **Internal Host**: `communication-service`

---
*Connecting the circle with real-time trust.*
