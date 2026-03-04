# Security Architecture

## Defense in depth
1. **Identity:** JWT access tokens + refresh sessions, TOTP MFA, passkey/biometric challenge.
2. **Authorization:** RBAC + ownership checks per document.
3. **Data protection:**
   - Envelope encryption using AES-256-GCM data keys per object.
   - Data keys wrapped with KMS master key.
   - Hash-based tamper detection (SHA-256) and immutable audit records.
4. **Transport:** TLS 1.3 everywhere, HSTS and secure headers.
5. **Abuse prevention:** rate limiting, IP throttling, anomaly scoring.
6. **Upload security:** strict MIME allowlist, file size thresholds, antivirus sandbox hook.
7. **Observability:** signed audit logs streamed to SIEM.

## E2E encryption model
- Client generates ephemeral key pair and encrypts file before upload.
- Server stores encrypted blob and encrypted DEK; private key never leaves secure enclave.
- Shared access re-encrypts DEK for recipient key.

## Compliance strategy
- Regional data residency buckets.
- GDPR-style right-to-delete workflow.
- SOC2 controls: MFA for admins, immutable logs, key rotation and secret vaulting.
