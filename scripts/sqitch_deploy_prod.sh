#!/bin/bash

if [ -f ../sqitch/.env ]; then
    export $(cat ../sqitch/.env | xargs)
fi

cd ../sqitch && ./bin/sqitch deploy db:${PG_URL_PROD} && cd -
