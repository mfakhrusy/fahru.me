#!/bin/bash

printf "Migration name: "
read -r name
printf "Migration comment: "
read -r comment
cd ../sqitch && ./bin/sqitch add $name -n "$comment" && cd -
