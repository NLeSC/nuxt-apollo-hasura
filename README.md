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
```
$ npx hasura migrate apply
```

```
# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
