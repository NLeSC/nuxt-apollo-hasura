Seting up the project


Set up Authentication and Authorization
Hasura documentation doesn't cover the details to make it work with Auth).

Steps:
- Create account in AUth0.
  - Create a tenant
  - Create rules
  - Create custom api
- Nuxt:
  - Install all modules (@nuxt/apollo, @nuxt/axios and @nuxt/auth)
  - Config Nuxt Auth module
  - Config Nuxt apollo module
- Hasura:
  - Set roles with authentification in Hasura
  - Set up enviroment variables for Hasura

Enviromentals:
- BASE_URI_HASURA=
- BASE_WS_HASURA=


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
