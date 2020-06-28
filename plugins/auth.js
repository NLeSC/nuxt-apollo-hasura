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
      // console.log('😎', $auth.user)
      // console.log('🎹', user, user.token)
      $auth.setUser({ ...user.createdUser, token: user.token, ...$auth.user })
      $apolloHelpers.onLogin(user.token)

      localStorage.setItem('token', user.token)
      // $auth.setUserToken(user.token)
      // console.log('🎹')

      // console.log('😎', $auth.user)
      // $auth.setToken('google', user.token)
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
