.PHONY: server/run server/format server/deploy server/watch frontend/dev admin/format blog/dev dev 
.PHONY: db sqitch/setup

# import sqitch env, create it first if it doesn't exist
include ./sqitch/.env
export $(shell sed 's/=.*//' ./sqitch/.env)

MAKEFLAGS += -j3

server/run: 
	cargo run --manifest-path=server/Cargo.toml

server/format:
	cargo fmt --manifest-path=server/Cargo.toml

server/watch:
	cargo watch -x "run server"

server/deploy:
	flyctl deploy ./server/

admin/format:
	npm run format --prefix admin

frontend/dev:
	npm run dev

blog/dev:
	./blog/bin/rails server

sqitch/setup: # change the email and the name
	chmod 755 ./sqitch/bin/sqitch
	./sqitch/bin/sqitch config --user user.name "M Fahru"
	./sqitch/bin/sqitch config --user user.email "fakhrusy.m@gmail.com"

db:
	docker-compose -f ./dev-db/docker-compose.yml up -d

dev: server/watch frontend/dev blog/dev
