CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE role_type AS ENUM ('USER', 'ADMIN', 'AUDITOR', 'FAMILY_MEMBER');
CREATE TYPE doc_category AS ENUM ('ID', 'CERTIFICATE', 'CONTRACT', 'NOTE', 'HEALTH', 'FINANCE', 'OTHER');
CREATE TYPE share_permission AS ENUM ('VIEW', 'DOWNLOAD');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role role_type NOT NULL DEFAULT 'USER',
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  biometric_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category doc_category NOT NULL,
  storage_key TEXT NOT NULL UNIQUE,
  encrypted_data_key BYTEA NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  content_hash CHAR(64) NOT NULL,
  authenticity_score NUMERIC(5,2) DEFAULT 0,
  life_event TEXT,
  expires_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_no INT NOT NULL,
  storage_key TEXT NOT NULL,
  content_hash CHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (document_id, version_no)
);

CREATE TABLE document_tags (
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  PRIMARY KEY (document_id, tag)
);

CREATE TABLE shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_email TEXT,
  access_token_hash TEXT NOT NULL,
  permission share_permission NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE verification_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  hash_snapshot CHAR(64) NOT NULL,
  signed_by TEXT,
  blockchain_tx_id TEXT,
  verification_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_documents_owner_created ON documents(owner_id, created_at DESC);
CREATE INDEX idx_documents_search ON documents USING GIN (to_tsvector('english', title));
CREATE INDEX idx_shares_expiry ON shares(expires_at);
