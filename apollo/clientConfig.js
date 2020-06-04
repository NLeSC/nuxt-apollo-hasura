const getHeaders = () => {
  const headers = {}
  const token = localStorage.getItem('auth._token.auth0')
  if (token && token !== 'false') {
    headers.authorization = token
  }
  return headers
}

// You can pass context to the function:
// export default function (context) {
export default function () {
  return {
    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
      headers: getHeaders(),
    },
    wsEndpoint: process.env.baseWsHasura,
  }
}
