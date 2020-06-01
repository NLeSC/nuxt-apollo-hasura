const getHeaders = () => {
  const headers = {}
  const token = localStorage.getItem('auth._token.auth0')
  if (token !== 'false') {
    headers.authorization = token
  }
  return headers
}

export default function (context) {
  return {
    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
      headers: getHeaders(),
    },
    wsEndpoint: process.env.baseWsHasura,
  }
}
