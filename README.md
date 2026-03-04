# Digilock — Advanced Secure Document Locker Platform

Digilock is a production-oriented monorepo blueprint for a globally scalable, security-first digital document locker PWA.

## 1) Architecture (Step 1)

### High-level components
- **Frontend (Next.js + TypeScript + Tailwind + PWA):** installable app, offline cache, encrypted local vault preview, biometric/WebAuthn login flow, push notifications.
- **Backend (Node.js + Express + TypeScript):** REST API, JWT auth, RBAC, MFA, secure sharing, verification, OCR/AI orchestration.
- **Database (PostgreSQL):** users, roles, sessions, MFA secrets, documents, tags, versions, shares, verifications, blockchain anchors.
- **Storage (S3-compatible):** encrypted object storage with server-side envelope encryption.
- **Async services:** queue workers for OCR, AI classification, reminders, authenticity scoring.
- **Security controls:** AES-256 at rest, E2E encryption options, signed URLs, anti-malware checks, tamper hashing.

### Scalability strategy
- Stateless API pods behind load balancer.
- PostgreSQL with read replicas + partitioning for large document metadata tables.
- Redis for session/state, rate limiting, short-lived share tokens.
- CDN edge caching for static frontend and previews.
- Event-driven workers for heavy tasks (OCR, AI extraction, timeline indexing).

## 2) Folder Structure (Step 2)

```text
frontend/      # Next.js PWA client
backend/       # Express REST API
database/      # SQL schema and migrations bootstrap
config/        # env templates and centralized platform config
deployment/    # docker compose + k8s manifests
```

## 3) Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 15+
- S3 compatible bucket (AWS S3 / MinIO)

### Setup
1. Copy env files:
   - `cp config/.env.example backend/.env`
   - `cp config/.env.frontend.example frontend/.env.local`
2. Database bootstrap:
   - `psql -U postgres -f database/schema.sql`
3. Start backend:
   - `cd backend && npm install && npm run dev`
4. Start frontend:
   - `cd frontend && npm install && npm run dev`

## 4) Deployment

- Local containers: `docker compose -f deployment/docker-compose.yml up --build`
- Kubernetes manifests under `deployment/k8s/` as baseline for production hardening.

## 5) Security Highlights

- JWT access + rotating refresh tokens.
- RBAC with resource-level ownership checks.
- MFA (TOTP + recovery codes) and biometric passkey-ready endpoints.
- Rate limiting + IP reputation hooks.
- MIME/type validation, AV scanning hook, size checks, content hashing.
- Audit trails and document tamper detection (`SHA-256`).
- Optional blockchain anchoring for verification receipts.

See `config/security-architecture.md` for details.
