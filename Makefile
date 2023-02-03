.PHONY: server/run server/format server/deploy server/watch admin/dev

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

dev: server/watch admin/dev
