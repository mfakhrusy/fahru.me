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

# Check if a container with the same name already exists
if podman container exists "$POSTGRES_CONTAINER_NAME"; then
  if podman container inspect --format '{{.State.Status}}' "$POSTGRES_CONTAINER_NAME" | grep -Eq '^running$'; then
    echo "A container with the name $POSTGRES_CONTAINER_NAME is already running. Exiting..."
    exit 1
  fi
  echo "Starting existing container $POSTGRES_CONTAINER_NAME..."
  podman container start "$POSTGRES_CONTAINER_NAME"
else
  echo "Creating new container $POSTGRES_CONTAINER_NAME..."

  podman run --name "$POSTGRES_CONTAINER_NAME" \
    -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
    -e POSTGRES_USER="$POSTGRES_USER" \
    -d docker.io/library/postgres:15.2
fi
