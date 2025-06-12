#!/bin/bash

set -e

DB_FILE="app.db"

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
echo "Creating SQLite DB: $DB_FILE"
sqlite3 "$DB_FILE" <<EOF
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

echo "✅ Database initialized with admin user: $ADMIN_USERNAME"
