/*
 * Auth plugin.
 * It will run after the application start
 */

export default async function ({ $auth, $axios, $apolloHelpers }) {
  if (!$auth.loggedIn) {
    return
  }

  //
  // Insert or update user in the DB
  //
  if (process.client) {
    //
    // Enters every time the user is logged in
    //
    try {
      const { data: user } = await $axios({
        method: 'post',
        url: '/api/auth/insert_user',
        params: {
          email: $auth.user.email,
          email_verified: $auth.user.email_verified,
          gender: $auth.user.gender,
          locale: $auth.user.locale,
          name: $auth.user.name,
          avatar_url: $auth.user.picture,
          google_id: $auth.user.sub,
        },
      })
      // Attach the new user to the user data retrieved from the provider
      // $auth.setUser({ ...user.createdUser, token: user.token, ...$auth.user })
      // console.log('🎹', user)
      localStorage.setItem('auth._token_local', user.token)
      localStorage.setItem('auth.role', user.createdUser.role)

      const interval = setInterval(async function () {
        console.log('GET NEW TOKEN INTERVAL')
        if (!$auth.user) {
          clearInterval(interval)
          return
        }

        //
        // Request New token
        //
        const { data: token } = await $axios({
          method: 'post',
          url: '/login/token',
          params: {
            user: user.createdUser,
          },
        })
        localStorage.setItem('auth._token_local', token)
      }, 840000) // 840000 = 14min, less than 15 min before the expiration date of the token.
    } catch (error) {
      console.error('❌ Error in creating the user', error)
    }
  }
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
