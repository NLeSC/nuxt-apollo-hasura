import { InMemoryCache } from 'apollo-cache-inmemory'

export default function (context) {
  return {
    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
      // headers: getHeaders(),
    },
    getAuth: () => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('auth._token.auth0')
      return !token ? token : ''
    },
    cache: new InMemoryCache(),
    wsEndpoint: process.env.baseWsHasura,
  }
}
