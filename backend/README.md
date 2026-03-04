# Backend API Overview

Base URL: `/api`

## Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/password/reset`
- `GET /auth/biometric/challenge` (auth required)

## Documents
- `POST /documents` (auth required)
- `GET /documents/search?q=` (auth required)

## Planned enterprise endpoints
- `POST /documents/:id/share` time-limited share links
- `POST /documents/:id/verify` signature + blockchain anchor
- `GET /timeline` life-event grouped docs
- `POST /assistant/query` AI assistant natural language retrieval
