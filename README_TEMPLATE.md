# Nuxt Apollo Hasura Example

Project idea: [Full Stack Recipes](https://github.com/NLeSC/full-stack-recipes)

ChangeLog: [Changelog](https://github.com/NLeSC/nuxt-apollo-hasura/blob/master/CHANGELOG.md)

Tech Stack: Nuxt.js, Vuetify, Hasura, Postgres, Passport.js.

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
## Environment variables

Modify the .env file to use the urls from NHost. You will need to add urls for GraphQL and auth.

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
