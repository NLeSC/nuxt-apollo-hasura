import { InMemoryCache } from 'apollo-cache-inmemory'

/*
 * Check if token is expired
 */
const isTokenExpired = (token) => {
  // Decoded token into its values
  const decoded = JSON.parse(atob(token.split('.')[1]))
  // check if token is expired
  return Date.now() >= decoded.ep * 1000
}

// Retrieve token from the localStorage
const getToken = () => {
  if (process.browser) {
    const token = localStorage.getItem('auth._token_local')
    return isTokenExpired(token) ? '' : token
  }
}

/*
 * Runs once after the user is logged (or the app starts and the user exists)
 */
const getHeaders = () => {
  if (process.browser) {
    const headers = {
      'x-hasura-role': localStorage['auth.role'],
    }
    return headers
  }
}

// You can pass context to the function (context):
export default function (/* context */) {
  // if (process.browser) {
  //   console.log(
  //     '🎹client config +++++++++++++> user role?: ',
  //     localStorage['auth.role']
  //   )
  // }
  return {
    //
    // Executes every time there is a call with Apollo
    //
    getAuth() {
      const token = getToken()
      return token ? 'Bearer ' + token : null
    },
    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
      headers: getHeaders(),
    },
    cache: new InMemoryCache(),
    wsEndpoint: process.env.baseWsHasura,
  }
}
