#!/bin/bash

CONTAINER_NAME="dev-db-redis-session-1"

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker exec -it $CONTAINER_NAME redis-cli
else
  echo "Container $CONTAINER_NAME is not running"
fi 
