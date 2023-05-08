#!/bin/bash

# Read the migration name from the terminal input
read -p "Enter migration name: " migration_name

# Run the Prisma migrate dev command with the provided name
npx prisma migrate dev --name $migration_name
