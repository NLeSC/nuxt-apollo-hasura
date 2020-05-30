## Steps and notes

Set up Authentication and Authorization
Hasura documentation doesn't cover the details to make it work with Auth).

Steps:
- **Create account in Auth0**
  - Create two applications (production and localhost)
  - Create rules (2 for production, and 1 for localhost)
  - Create custom api
- **Nuxt**
  - Install all modules (@nuxt/apollo, @nuxt/axios and @nuxt/auth)
  - Config Nuxt Auth module
  - Config Nuxt apollo module
- **Hasura**
  - Set roles with authentification in Hasura
  - Set up enviroment variables for Hasura

## Working locally
When running locally, Auth0 is able to create correct JWT but it doesn't create the user in the localdatabase, Auth0 doesn't simply have a way to communicate with localhost:3000 when creating a user in its database and then create a user in hasura. 

You can login, and then create **manually** a user in your localhost with the 'sub' returned from the authentication.

## Setting up the project

**Enviromentals**
- BASE_URI_HASURA=
- BASE_WS_HASURA=

- HASURA_GRAPHQL_UNAUTHORIZED_ROLE = public # or any other name you choose for the public role
- HASURA_GRAPHQL_ADMIN_SECRET = adminpassword
- HASURA_GRAPHQL_JWT_SECRET = [generate in jwt-config](https://hasura.io/jwt-config)


- PRODUCTION_AUTH0_CLIENT_ID= ...  # do not forget to place the localhost app id in the nuxt app

/nuxt.config.js:
```
/**
 * Auth
 */
auth: {
    redirect: {
      callback: '/callback',
    },

    strategies: {
      local: false,
      auth0: {
        domain: 'nuxt-apollo-hasura.eu.auth0.com',
        client_id: 'client_id....',
        audience: 'custom_auth0_api_audience',
      },
    },
  },
  
/**
 * Apollo
 */
  apollo: {
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: '~/apollo/clientConfig.js',
    },
  },
```
/apollo/clientConfig
```
import { InMemoryCache } from 'apollo-cache-inmemory'

export default function (context) {
  return {
    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
    },
    getAuth: () => {
      // get the authentication token from local storage if it exists
      return localStorage.getItem('auth._token.auth0') || ''
    },
    cache: new InMemoryCache(),
    wsEndpoint: process.env.baseWsHasura,
  }
}

```

## Protect route
in page add:
```
export default {
  middleware: ['auth'],
  ...
```

## Add dinamyc headers variables
```
apolloClient.query({
    query: GRAPHQL_QUERY,
    variables: {
        var1: "this is a variable"
    },
    context: {
        headers: {
            X-Hasura-Role: "public"
        }
    }
})
```
