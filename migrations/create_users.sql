-- Migration: create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  whatsapp TEXT,
  accepted_terms BOOLEAN NOT NULL DEFAULT FALSE,
  accepted_whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Note: gen_random_uuid() requires the pgcrypto extension on some Postgres setups
-- Alternatively use uuid_generate_v4() if uuid-ossp is available.
