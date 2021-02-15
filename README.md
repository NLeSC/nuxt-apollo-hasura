# Emotion Recognition in Dementia

## Development

Requirements locally: `docker` and `Yarn`.

```bash
# install dependencies
npm i -g hasura-cli
yarn install

# serve in development mode with hot reload at localhost:3000
yarn dev

# Apply hasura metadata: 
cd hasura && hasura metadata apply --admin-secret adminpassword

# If migrations needed 
cd hasura && hasura migrations apply --admin-secret adminpassword

# Open hasura console (Will track hasura metadata changes)
yarn hasura-console # Password sits inside docker compose, by default: 'adminpassword'
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
Navigate to the folder containing the database dump and run psql from there.
```shell
docker exec -i erd-postgres psql --username postgres postgres < ./dump.sql
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
 ```shell
 docker exec -i erd-postgres psql --username postgres postgres < ./dump.sql
 ```
4. Migrate hasura schema:
```shell
hasura metadata apply --admin-secret adminpassword
```
   
