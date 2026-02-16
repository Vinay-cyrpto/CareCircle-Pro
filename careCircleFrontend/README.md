# 💻 CareCircle-Pro Frontend

The Modern, Responsive User Interface of CareCircle-Pro. Built with React and Vite, this application provides a seamless experience for parents and caregivers to manage bookings and communicate in real-time.

## 🛠️ Tech Stack
- **Framework**: React 18+ (Vite)
- **Styling**: Vanilla CSS (High-Performance)
- **State Management**: React Context API & Hooks
- **Real-time**: SockJS & STOMP Client (WebSockets)
- **API Client**: Axios with Interceptors

## 🎯 Key Features
1.  **JWT-First Auth Flow**: Includes a dedicated Axios interceptor that automatically injects the `Bearer` token into outgoing requests and handles `401 Unauthorized` responses with silent refresh logic.
2.  **Dual-Role Dashboard**: Dynamic UI rendering based on whether the logged-in user is a **Parent** (Search/Book focus) or a **Caregiver** (Manage/Accept focus).
3.  **Real-time Chat UI**: A high-fidelity messaging interface that subscribes to STOMP topics and reflects new messages instantly without page refreshes.
4.  **Component Architecture**: Reusable UI components (Buttons, Input, Cards) ensuring a consistent, premium look and feel across the platform.

## 📂 Project Structure
- `/src/components`: Reusable UI atom components.
- `/src/pages`: Feature-specific views (Login, Profile, Matching, Chat).
- `/src/context`: Global authentication and notification states.
- `/src/services`: API abstraction layers using Axios.

## 🚀 Development Setup
Navigate to this folder and run:
```bash
npm install
npm run dev
```
- **Port**: `5173`

---
*Designing a caregiver ecosystem that is as reliable as it is beautiful.*
