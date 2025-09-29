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

-- Migration: create pontos table to store heat and gems per user
CREATE TABLE IF NOT EXISTS pontos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  heat INTEGER NOT NULL DEFAULT 0,
  gems INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- optional index for lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_pontos_user ON pontos(user_id);
