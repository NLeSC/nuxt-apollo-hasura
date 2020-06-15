# Nuxt Apollo Hasura Example

Project idea: [Full Stack Recipes](https://github.com/NLeSC/full-stack-recipes)

ChangeLog: [Changelog](https://github.com/NLeSC/nuxt-apollo-hasura/blob/master/CHANGELOG.md)

Tech Stack:
- [x] Nuxt.js
- [x] Vuetify
- [x] Hasura
- [x] Postgres

Features list: 
- [x] Authotization with PassportJs (with Google) -> JWT -> Hasura
- [x] CRUD example with Subscriptions
- [x] Roles definitions
- [x] Federated login with Google
- [ ] Federated login with Github
- [x] Deploy to Firebase Hosting and Github pages
- [ ] DB migrations between environments 

## Template setup

From Github, you can click on [`Use this template`](https://github.com/NLeSC/nuxt-apollo-hasura/generate) to create a new repository based on this one.

Alternatively, you can create a new repository from your terminal:

``` bash
# Clone this repo
$ git clone https://github.com/NLeSC/nuxt-apollo-hasura -b master --single-branch <project-name>

# Enter the new directory
$ cd <project-name>

# Replace origin with your repository url
$ git remote set-url origin <git repository>

# Send this repository to the remote
$ git push --origin master

# Add template repository
$ git remote add template https://github.com/NLeSC/nuxt-apollo-hasura
```

## Setting up JWT signing tokens
- Generate a new key public/private key running `./server/generate_RS512.sh` in the console.
- Copy the content of `./server/publickey.txt` into the `docker-compose.yml` inside the environment variable `HASURA_GRAPHQL_JWT_SECRET` (inside the "key" string).
- Create an application in [Google Console](https://console.cloud.google.com) for Oauth2.
    - Grant JavaScript origins: `http://localhost:3000` and redirect url: `http://localhost:3000/redirect`.
    - Copy the `GOOGLE_CLIENT_ID` and  `GOOGLE_CLIENT_SECRET` inside the `.env` file.
    

## Environment variables
Rename `.env.example` file to `.env` and modify the variables in this file and the and `docker-compose.yml` accordingly.

## Getting started

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
