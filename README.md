
⚠️ 🚧 APP in development. Readme indication may not be accurate. 🚧 ⚠️


# Nuxt Apollo Hasura Template
📝 Please raise any questions over the installation process in the issues page.

<hr>
Project idea: [Full Stack Recipes by NLeSC](https://github.com/NLeSC/full-stack-recipes)

[![Edit nuxtjs-postgres-graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/hasura/graphql-engine/tree/master/community/sample-apps/nuxtjs-postgres-graphql?fontsize=14)
ChangeLog: [Changelog](https://github.com/NLeSC/nuxt-apollo-hasura/blob/master/CHANGELOG.md)


Tech Stack: Nuxt.js, Vuetify, Hasura, Postgres, Passport.js.

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

Once you have created a copy of the template, you can deploy the app in one step deploying to heroku: <br>
<a href="https://heroku.com/deploy"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy"></a>

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

# Run locally
```bash
$ make install
$ cd client
$ yarn serve

# on another terminal:

```
