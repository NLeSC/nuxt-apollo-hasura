import { InMemoryCache } from 'apollo-cache-inmemory'
export default function (context) {
  return {
    httpLinkOptions: {
      uri: 'http://localhost:4000/v1/graphql',
      credentials: 'same-origin',
    },
    cache: new InMemoryCache(),
    wsEndpoint: 'ws://localhost:4000/v1/graphql',

    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    getAuth: (tokenName = 'apollo-token') => {
      const token = localStorage.getItem(tokenName)
      if (token) {
        return 'Bearer ' + token
      } else {
        return ''
      }
    },
  }
}
