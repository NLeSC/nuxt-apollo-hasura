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

Setup database schema and data
Uncomment the following line in docker-compose.yml
```yml
#    ports:
#        - "5432:5432"
```

Start the docker stack and load the sql dump
```
$ docker-compose up -d
$ docker exec -i <container_name> psql --username postgres <postgres)password> < ./dump.sql
There will be some errors but that doesn't hurt.
```

Now recomment the lines in docker-compose and stop the containers
$ docker-compose down

```
# build for production and launch server
$ yarn build
$ yarn serve
```

Go to the hasura console at http://localhost:4000/console/
Under 'data' make sure that the query testaggau is tracked.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
