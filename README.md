# Nuxt Apollo Hasura Example

Project idea: [Full Stack Recipes](https://github.com/NLeSC/full-stack-recipes)

ChangeLog: [Changelog](https://github.com/NLeSC/nuxt-apollo-hasura/blob/master/CHANGELOG.md)

Tech Stack:
- [x] Nuxt.js
- [x] Vuetify
- [x] Hasura
- [x] Postgres

Features list: 
- [x] Authotization with Auth0 -> JWT -> Hasura
- [x] CRUD example with Subscriptions
- [x] Roles definitions
- [x] Federated login with Google and Github
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

## Running the application
Requirements locally: docker and Yarn. 

```bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn serve
```

```
# build for production
$ yarn build
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
