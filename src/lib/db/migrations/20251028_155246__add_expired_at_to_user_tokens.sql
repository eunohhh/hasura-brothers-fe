-- Migration: add expired_at to user_tokens
-- Created at: 2025-10-28T06:52:46Z

ALTER TABLE user_tokens
ADD COLUMN IF NOT EXISTS expired_at TIMESTAMPTZ;

-- Optional: index
-- CREATE INDEX IF NOT EXISTS idx_user_tokens_expired_at ON user_tokens(expired_at);
