
## Setting up JWT signing tokens
- Generate a new key public/private key running `./server/generate_RS512.sh` in the console.
- Copy the content of `./server/publickey.txt` into the `docker-compose.yml` inside the environment variable `HASURA_GRAPHQL_JWT_SECRET` (inside the "key" string).
- Create an application in [Google Console](https://console.cloud.google.com) for Oauth2.
    - Grant JavaScript origins: `http://localhost:3000` and redirect url: `http://localhost:3000/redirect`.
    - Copy the `GOOGLE_CLIENT_ID` and  `GOOGLE_CLIENT_SECRET` inside the `.env` file.
    

## Environment variables
Rename `.env.example` file to `.env` and modify the variables in this file and the and `docker-compose.yml` accordingly.

## Getting started
You will need to have installed in your machine: Node, Yarn, Docker compose and Prettier
``` bash
# Install the dependencies
$ yarn

# Start the development server
$ yarn serve
```

To run in production, use the `start` command

``` bash
$ yarn start
```

### Updating from template

Fetch from the `template` remote. If you cloned via github, you will need to add the remote as above.

``` bash
$ git fetch --all --allow-unrelated-histories
```


# Database replication
Hasura needs 2 pieces of information to recreate your GraphQL API, the underlying PG database schema and the Hasura metadata which is used to describe the exposed GraphQL API.

- Database migration files: The state of your PG database is managed via incremental SQL migration files. These migration files can be applied one after the other to achieve the final DB schema. DB migration files can be generated incrementally and can by applied in parts to reach particular checkpoints. They can be used to roll-back the DB schema as well.
- Hasura metadata files: The state of Hasura metadata is managed via snapshots of the metadata. These snapshots can be applied as a whole to configure Hasura to a state represented in the snapshot. Hasura metadata can be exported and imported as a whole.

opening the console while making changes to the schema in hasura:
```bash
# After running 'yarn serve' from '/client'
cd client/hasura
npx hasura console --admin-secret adminpassword
```
you can have the admin-secret as a .env variable: 
HASURA_GRAPHQL_ADMIN_SECRET=<your-admin-secret>
Create copy of the metadata:
```bash
cd client/hasura
npx hasura migrate create "init" --from-server <name_of_the_version>
npx hasura metadata export --admin-secret adminpassword


```
Apply migrations 
```bash
hasura migrate apply
hasura metadata apply
````

[Hasura Migrations documentation](https://hasura.io/docs/1.0/graphql/manual/migrations/basics.html#migrations-basics)


# Extras
## Adding incons
