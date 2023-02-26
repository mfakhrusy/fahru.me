.PHONY: server/run server/format server/deploy server/watch frontend/dev admin/format blog/dev dev db sqitch-setup

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

sqitch-setup: # change the email and the name
	chmod 755 ./bin/sqitch config --user user.name "M Fahru"
	chmod 755 ./bin/sqitch config --user user.email "fakhrusy.m@gmail.com"

db:
	docker-compose -f ./dev-db/docker-compose.yml up -d

dev: server/watch frontend/dev blog/dev
