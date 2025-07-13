#!/bin/bash

set -e

# Load .env file
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi
source .env

if [ -z "$ADMIN_USERNAME" ] || [ -z "$ADMIN_PASSWORD" ]; then
  echo "Missing ADMIN_USERNAME or ADMIN_PASSWORD"
  exit 1
fi

# Hash password (SHA-256)
PASSWORD_HASH=$(echo -n "$ADMIN_PASSWORD" | sha256sum | awk '{print $1}')

# Create DB and table
echo "Creating SQLite DB: $DB_FILENAME"
sqlite3 "$DB_FILENAME" <<EOF
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO users (username, password_hash) VALUES (
  '$ADMIN_USERNAME',
  '$PASSWORD_HASH'
);
EOF

# Add sessions table
sqlite3 "$DB_FILENAME" <<EOF
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_token TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  expires_at INTEGER NOT NULL  -- UNIX timestamp
);
EOF

# add guestbook table
sqlite3 "$DB_FILENAME" <<EOF
CREATE TABLE IF NOT EXISTS guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  website TEXT,
  message TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT 0,
  deleted BOOLEAN NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL  -- UNIX timestamp
);
EOF

echo "✅ Database initialized with admin user: $ADMIN_USERNAME"
