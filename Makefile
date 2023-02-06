.PHONY: server/run server/format server/deploy server/watch admin/dev admin/format

MAKEFLAGS += -j2

server/run: 
	cargo run --manifest-path=server/Cargo.toml

server/format:
	cargo fmt --manifest-path=server/Cargo.toml

server/watch:
	cargo watch -x "run server"

server/deploy:
	flyctl deploy ./server/

admin/dev:
	npm run dev --prefix admin

admin/format:
	npm run format --prefix admin

dev: server/watch admin/dev
