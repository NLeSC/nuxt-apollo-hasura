const isTokenExpired = (token) => {
  // Decoded token into its values
  const decoded = JSON.parse(atob(token.split('.')[1]))
  // check if token is expired
  return Date.now() >= decoded.exp * 1000
}

const getToken = () => {
  return localStorage.getItem('token')
}

const getHeaders = () => {
  if (process.client) {
    const headers = {
      'x-hasura-role': 'admin',
    }
    const token = getToken()

    if (token && token !== 'false') {
      if (isTokenExpired(token)) {
        console.log('🛑🔑 token expired, GET A NEW TOKEN')

        // CALL AXIOS HERE TO GET THE TOKEN! CONTINUE HERE!!!!!!!
      }

      headers.Authorization = 'Bearer ' + token
    }
    return headers
  }
}

// You can pass context to the function:
// export default function (context) {
export default function (context) {
  // console.log('🎹', context, context.$auth)
  return {
    getAuth() {
      // console.log(
      //   '⚡️⚡️⚡️⚡️⚡️⚡️️️️️from client config GET AUTH',
      //   $auth.loggedIn
      // )
      // const loggedIn = $auth?.loggedIn
      // const token = true
      // if (loggedIn && token) {
      //   return token
      // }
      // console.log('🎹 apollo client config. LoggedIn:', loggedIn)
      // return 'Bearer eyJhbGciOiJQUzI1NiIsImtpZCI6Ik9NMzhmUmRtaHVSVzRKWmdzS01KT2sxZlZlcW1saTlRTXUtS3RFSl9sUWMifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXVzZXItaWQiOiIxNyIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImFkbWluIiwidXNlciJdfSwiaWF0IjoxNTkyNzQ3NTUzLCJleHAiOjE1OTI3NDg0NTN9.g7pfDSbutpFhMyTDpa3jvVT498IjCKcVh2KUl5z71OF0uv7uNqCuHHIr9bOhvyOe3aWo2fPAK-ghkTjcmD64o9YnHB6OzjqIR12ublkGAlNCsw7-H4cnbPXSvJ5A1nqB4rFiNlAiJjmUZSgKWzCI64pOmYAFwVtYxRql7v50CfVyu2tJ_-G7uLq9B6Ddl_EnFbR67ucyXapqE0VRQwE--Z6KjLeamU44HcJ00gQkGgDKkkpFUs4ts5718PFVK1Qwbyw9h_-sbsSMvluGIBuKmSLkA7X_VjZnNJP72NP1t_B6pg9CQze-wG7epfAv-uBMbX_OcnIUW1YpH5XH7H8KNw'
    }, // use this method to overwrite functions\

    httpLinkOptions: {
      uri: process.env.baseUriHasura,
      credentials: 'same-origin',
      headers: getHeaders(),
    },
    wsEndpoint: process.env.baseWsHasura,
  }
}
