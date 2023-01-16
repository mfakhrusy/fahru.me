#!/bin/bash

export $(grep -v '^#' ../.env | xargs)

psql $DATABASE_URL -f ../sql/app_user.sql
