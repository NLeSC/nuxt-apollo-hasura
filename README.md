# Emotion Recognition in Dementia

## Development

Requirements locally: `docker` and `Yarn`.

## First time setup
```bash
yarn install
yarn dev
```
```shell
# on another terminal
make reset-db-to-defaults
yarn hasura-console #http://localhost:9596
```
## Development
```shell
yarn dev # http://localhost:3000
```
```shell
# On another terminal, open hasura console (Will track hasura metadata changes)
yarn hasura-console  # http://localhost:9596 Password sits inside docker compose, by default: 'adminpassword'
```
### To stop all docker containers you can use:
```bash
yarn stop
# or
docker-compose down
```

# Back up and restore Database

`docker-compose` needs to be running.

### Back up (Create Dump)

```shell
docker exec -it erd-hasura pg_dump -n public --username postgres postgres > ./dump.sql
```
### Restore PostgresDB data

#### Automatically with make
```shell
make reset-db-to-defaults
```
#### or run the commands manually 
Navigate to the folder containing the database dump and run psql from there.
```shell
docker exec -i erd-postgres psql --username postgres postgres < ./dump.sql
```
### Need clean up everything?
```shell
# delete completely the database:
docker exec -i erd-postgres dropdb -U postgres postgres
# Create it again
docker exec -i erd-postgres createdb -U postgres postgres
```
And then, import the data dump and apply the hasura metadata:
```shell
docker exec -i erd-postgres psql --username postgres postgres < ./dump.sql
yarn hasura-metadata-apply
```

# Deploy production
There are three services that run with docker-compose:

- http-server: Static Nuxt application
- Postgres: Database
- hasura: GraphQL API

Steps:

1. Build and run (with default environment variables or from system environment variables):
```shell
docker-compose -f docker-compose.yml -f docker-compose-production.yml up -d
# To force build nuxt application use --build
docker-compose -f docker-compose.yml -f docker-compose-production.yml up -d --build
```
3. Import database.

Import the dump data:
 ```shell
docker exec -i erd-postgres psql --username postgres postgres < ./dump.sql
 ```
4. Migrate hasura schema:
```shell
yarn hasura-metadata-apply
```
   
