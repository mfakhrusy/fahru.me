#!/bin/bash

# Deploys a pre-compiled binary as a systemd service.
# Handles both initial setup and subsequent updates.
#
# Usage: sudo ./deploy.sh /path/to/binary

set -e # Exit immediately if a command exits with a non-zero status.

# export .env to environment variables
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "Warning: .env file not found. Proceeding without environment variables."
fi

# --- Configuration & Checks ---
INSTALL_DIR="/usr/local/bin/fahru-dot-me"
DB_DIR="$DB_PATH"

# create the database directory if it doesn't exist
if [ ! -d "${DB_DIR}" ]; then
    echo "Creating database directory at ${DB_DIR}..."
    mkdir -p "${DB_DIR}"
    chown nobody:nogroup "${DB_DIR}"
    chmod 755 "${DB_DIR}"
else
    echo "Database directory already exists at ${DB_DIR}."
fi

if [[ $EUID -ne 0 ]]; then
   echo "Error: This script must be run as root."
   exit 1
fi

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 /path/to/binary"
    exit 1
fi

SOURCE_BINARY="$1"

if [ ! -f "$SOURCE_BINARY" ]; then
    echo "Error: File not found at '${SOURCE_BINARY}'"
    exit 1
fi

# --- Variables ---
EXECUTABLE_NAME=$(basename "$SOURCE_BINARY")
INSTALL_PATH="${INSTALL_DIR}/${EXECUTABLE_NAME}"
SERVICE_NAME="${EXECUTABLE_NAME}.service"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}"

# copy db file to the database directory if it exists and is not already there
DB_FULL_PATH="${DB_DIR}${DB_FILENAME}"

if [ -f "${DB_FILENAME}" ]; then
    echo "Database file found: ${DB_FILENAME}"
    if [ ! -f "${DB_FULL_PATH}" ]; then
        echo "Copying database file to ${DB_DIR}..."
        cp "${DB_FILENAME}" "${DB_DIR}"
        chown nobody:nogroup "${DB_FULL_PATH}"
        chmod 644 "${DB_FULL_PATH}"
    fi
fi

# copy env file to the installation directory
if [ -f ".env" ]; then
    echo "Copying .env file to ${INSTALL_DIR}..."
    cp ".env" "${INSTALL_DIR}/.env"
    chown nobody:nogroup "${INSTALL_DIR}/.env"
    chmod 644 "${INSTALL_DIR}/.env"
else
    echo "Warning: .env file not found. Proceeding without copying."
fi

echo "Deploying '${EXECUTABLE_NAME}'..."

# --- Deployment ---
# Stop the service if it's running to release the binary file.
echo "--> Stopping current service..."
systemctl stop "${SERVICE_NAME}" &>/dev/null || true

# Copy the new binary to the system path.
echo "--> Installing binary to ${INSTALL_PATH}..."
cp "${SOURCE_BINARY}" "${INSTALL_PATH}"
chmod +x "${INSTALL_PATH}"

# Create/update the systemd service file.
echo "--> Writing systemd service file..."
cat << EOF > "${SERVICE_FILE}"
[Unit]
Description=Service for ${EXECUTABLE_NAME}
After=network.target

[Service]
ExecStart=${INSTALL_PATH} --production
User=nobody
Group=nogroup
Restart=always
RestartSec=3
EnvironmentFile=${INSTALL_DIR}/.env

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and restart the service.
echo "--> Reloading daemon and restarting service..."
systemctl daemon-reload
systemctl enable "${SERVICE_NAME}"
systemctl restart "${SERVICE_NAME}"

echo
echo "Deployment finished."
echo "To check status, run: systemctl status ${SERVICE_NAME}"
echo "To view logs, run:    journalctl -u ${SERVICE_NAME} -f"
