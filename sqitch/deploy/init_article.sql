-- Deploy fakhrusy-com:init_article to pg

BEGIN;

-- XXX Add DDLs here.

CREATE TABLE IF NOT EXISTS article (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


COMMIT;
