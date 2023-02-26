-- Deploy flipr:init_app_user to pg

BEGIN;

-- XXX Add DDLs here.

CREATE TABLE IF NOT EXISTS app_user (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

COMMIT;