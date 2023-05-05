.PHONY: frontend/dev admin/format dev 

# import sqitch env, create it first if it doesn't exist
include ./sqitch/.env
export $(shell sed 's/=.*//' ./sqitch/.env)

MAKEFLAGS += -j3

frontend/dev:
	npm run dev

admin/format:
	npm run format --prefix admin

dev: server/watch frontend/dev blog/dev
