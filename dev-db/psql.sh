#!/bin/bash

# Load environment variables from .env file
if [[ -f .env ]]; then
  export $(cat .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

# Check if POSTGRES_PASSWORD is set in the .env file
if [[ -z "$POSTGRES_PASSWORD" ]]; then
  echo "POSTGRES_PASSWORD is not set in the .env file"
  exit 1
fi

# Check if POSTGRES_USER is set in the .env file
if [[ -z "$POSTGRES_USER" ]]; then
  echo "POSTGRES_USER is not set in the .env file"
  exit 1
fi

# Check if POSTGRES_CONTAINER_NAME is set in the .env file
if [[ -z "$POSTGRES_CONTAINER_NAME" ]]; then
  echo "POSTGRES_CONTAINER_NAME is not set in the .env file"
  exit 1
fi

# Check if POSTGRES_DB is set in the .env file
if [[ -z "$POSTGRES_DB" ]]; then
  echo "POSTGRES_DB is not set in the .env file"
  exit 1
fi

# Check if container is running
if [[ "$(podman container inspect --format='{{.State.Status}}' ${POSTGRES_CONTAINER_NAME} 2>/dev/null)" != "running" ]]; then
  echo "Container ${POSTGRES_CONTAINER_NAME} is not running"
  exit 1
fi

PGPASSWORD=${POSTGRES_PASSWORD} podman exec -it ${POSTGRES_CONTAINER_NAME} psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}