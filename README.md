# Nuxt Apollo Hasura Example

See project: https://github.com/NLeSC/full-stack-recipes

## Setup

Requirements locally: docker and Yarn.

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

### First time setup database schema and data

This section is only needed the first time running the application.

First start the docker stack and load the sql dump

```
$ docker-compose up -d
$ docker exec -i emo-spectre_postgres_1 psql --username postgres postgres < ./dump.sql
```

There may be some errors but that doesn't hurt.

If this command does not work you may need to supply a different container name,
you can find out which containers are running with

```
$ docker images
```

change `emo-spectre_postgres_1` in the docker exec command with the container name that runs postgres

### Build the application and launch server

```
$ yarn build
$ yarn serve
```

### First time setup

The following also needs to be done the first time you run the application

Go to the hasura console at http://localhost:4000/console/
In the `Data` tab make sure that the query aggregate_features is tracked.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Running in production

There are three services that run with docker-compose:

- http-server: Static Nuxt application (SPA)
- Postgres: Database
- hasura: GraphQL API

The videos folder for production is /videos, instead of static/videos.

Steps:

1. Build locally nuxt: `yarn generate`
2. Create the image:

```shell
$ docker-compose -f docker-compose.yml -f docker-compose-production.yml build
```

3. Copy videos to ./videos
4. Add data to DB. Use the dump.sql - -

## TODO:

2.```shell
\$ docker-compose -f docker-compose.yml -f docker-compose-production.yml up -d

```

```
