# CareCircle Pro

CareCircle Pro is a comprehensive microservices-based platform designed for caregiver matching, booking, and communication.

## System Architecture

The project consists of several microservices:
- **Auth Service**: Manages user authentication, registration, and JWT token lifecycle.
- **User Profile Service**: Handles caregiver and parent profiles, including verification audits.
- **Matching & Booking Service**: Core logic for finding caregivers and managing booking lifecycles.
- **Communication Service**: Real-time chat and notification system.
- **Gateway Service**: API Gateway for routing and cross-cutting concerns.
- **Frontend**: A modern React-based application for user interaction.

## Prerequisites

Ensure you have the following installed:
- [Docker & Docker Compose](https://www.docker.com/get-started)
- [Java 17+](https://adoptium.net/)
- [Node.js 18+](https://nodejs.org/)
- [Maven](https://maven.apache.org/)

## Getting Started

### 1. Environment Configuration

The application uses environment variables for secure configuration.

1. Copy the `.env.example` file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your actual credentials (database passwords, mail server secrets, JWT keys).

> [!IMPORTANT]
> Never commit your `.env` file to version control. It is already included in `.gitignore`.

### 2. Running with Docker

The easiest way to run the entire stack is using Docker Compose:

```bash
docker-compose up --build
```

This will start:
- MySQL Database
- Redis
- All Microservices
- Frontend Application

### 3. Accessing the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Auth Service**: [http://localhost:8081](http://localhost:8081)

## Development

If you want to run services individually, navigate to the specific service directory and use:

```bash
mvn spring-boot:run  # For Java services
npm run dev         # For the Frontend
```

Ensure your `.env` variables are available in your shell or IDE environment.
