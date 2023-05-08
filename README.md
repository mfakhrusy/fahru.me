https://fahru.me site repository.

Requirement:

- podman / docker (if using docker, change all the `podman` executable to `docker` to use docker instead of podman)

To run locally:

1. Set up dev database:
  - chmod +x *.sh
  - cd ./dev-db
  - ./init.sh
  - ./create-db.sh
2. To check if the database is running, type `podman ps`, it should return a running postgres container

## Attribution

"[Moka Icons](http://snwh.org/moka)" by [Sam Hewitt](http://samuelhewitt.com/) is licensed under [CC-SA-4.0](http://creativecommons.org/licenses/by-sa/4.0/)
