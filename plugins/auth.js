/*
 * Auth plugin.
 * It will run after the application start
 */

export default function ({ $auth, $axios, $apolloHelpers }) {
  // Watch state changes
  $auth.$storage.watchState('loggedIn', (newValue) => {
    console.log('🎹 new loggedin value', newValue)
  })
  $auth.$storage.watchState('user', (newValue) => {
    console.log('🎹 New user value', newValue)
  })

  if (!$auth.loggedIn) {
    localStorage.removeItem('auth._token_local')
    localStorage.removeItem('auth.role')
    return
  }
  //
  // Enters every time the user is logged in
  //
  async function interval() {
    console.log('GET NEW TOKEN INTERVAL')
    if (!$auth.user) {
      console.log('🎹 no user')
      // localStorage.removeItem('auth._token_local')
      // localStorage.removeItem('auth.role')
      return
    }

    //
    // Insert or update user in the DB and request New token
    //
    const {
      data: { token, user },
    } = await $axios({
      method: 'post',
      url: 'http://localhost:5000/login/token', // todo correct .env
      data: {
        user: {
          email: $auth.user.email,
          email_verified: $auth.user.email_verified,
          gender: $auth.user.gender,
          locale: $auth.user.locale,
          name: $auth.user.name,
          avatar_url: $auth.user.picture,
          google_id: $auth.user.sub,
        },
      },
    })
    $auth.$storage.setState('token_local', token, false)
    $auth.$storage.setState('role', user.role, false)
    console.log('🎹', $auth)
    // localStorage.setItem('auth.token_local', token)
    // localStorage.setItem('auth.role', user.role)

    // Renew token every 15 minutes
    // 840000 = 14min, less than 15 min before the expiration date of the token.
    setTimeout(interval, 840000)
  }
  //
  // get user token at start and in the interval
  //
  interval().catch((error) =>
    console.error('❌ Error in creating the user', error)
  )

  /*
   * Watch on redirect
   * you can optionally change `to` by returning a new value
   */
  // $auth.onRedirect((to, from) => {
  //   const loggedIn = $auth.loggedIn
  //   console.log('⁉️ REDIRECT ⁉️', loggedIn, $auth, to, from)
  //   console.error(to)
  // })
}
