/*
 * TEMPORARY FILE, DELETE
 */

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
const axios = require('axios')
//
const INSERT_USER_ONE_QUERY = `
mutation insert_users_one($google_id: String, $name: String, $email: String, $gender: String, $email_verified: Boolean, $avatar_url: String) {
  insert_users_one(object: {google_id: $google_id, name: $name, email: $email, email_verified: $email_verified, avatar_url: $avatar_url, gender: $gender}, on_conflict: {update_columns: updated_at, constraint: users_google_id_key}) {
    id
    name
    email
    google_id
    github_id
    avatar_url
    gender
    updated_at
  }
}
`
const GET_USER_QUERY = `
  query users_by_pk($id: Int!) {
    users_by_pk(id: $id) {
      id
      google_id
      avatar_url
      email
      name
      created_at
      role
    }
  }
`

// const GET_USER_WHERE_GOOGLE_ID = `
// query users($google_id: String_comparison_exp = {}) {
//   users(where: {google_id: $google_id}) {
//     id
//     google_id
//     name
//     email
//     avatar_url
//     gender
//     role
//     updated_at
//     created_at
//   }
// }
// `

/*
 * Store id in the browser cookie Session
 */
passport.serializeUser((user, done) => {
  console.log('serializeUser 🎹', user)
  done(null, user.id)
})

/*
 * Read the user id from the browser cookie session,
 * get the user from the DB and return the user profile.
 * passport.deserialize will attach the user profile to the
 * req param in the express server
 */
passport.deserializeUser((id, done) => {
  console.log('🎹 deserializeUser, id:', id)
  axios({
    url: 'http://localhost:4000/v1/graphql',
    method: 'post',
    headers: { 'x-hasura-admin-secret': 'adminpassword' },
    data: {
      query: GET_USER_QUERY,
      variables: { id },
    },
  })
    .then((result) => {
      console.log('🎹 from the database', result.data)
      done(null, result.data)
    })
    .catch((error) => {
      console.error(error)
      done(error, null)
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        '956336158440-r92a5pvq8597pi32fph1234n9m185pv7.apps.googleusercontent.com', /// // TODO
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || 'JQWgVMYm3qxq_7F7s__UcJ6c', /// ///// TODO
      callbackURL: '/login/google/redirect',
    },
    // Callback function to called when the auth is retrieved
    (accessToken, refreshToken, profile, done) => {
      const user = {
        // id will be created in the DB, autoincrement Integer
        google_id: profile.id,
        name: profile._json.name || '',
        avatar_url: profile._json.picture || '',
        gender: profile._json.gender || '',
        email: profile._json.email || '',
        email_verified: profile._json.email_verified || '',
      }

      //
      // Create or update new user in DB
      //
      axios({
        url: 'http://localhost:4000/v1/graphql', /// / TODO
        method: 'post',
        headers: {
          'x-hasura-admin-secret': 'adminpassword', /// /// TODO
        },
        data: {
          query: INSERT_USER_ONE_QUERY,
          variables: user,
        },
      })
        .then((result) => {
          // go to serialize the user, to store it in the cookie
          const info = { scope: '*' }
          done(null, result.data.data.insert_users_one, info)
        })
        .catch((error) => {
          console.error('❌ Error in creating the user')
          done(error)
        })

      //
      // Find first user with google_id
      //
      /* axios({
        url: 'http://localhost:4000/v1/graphql',
        method: 'post',
        headers: { 'x-hasura-admin-secret': 'adminpassword' },
        data: {
          query: GET_USER_WHERE_GOOGLE_ID,
          variables: { google_id: profile.id },
        },
      })
        .then((result) => {
          console.log('🎹 from the database', result.data)
          done(null, result.data)
        })
        .catch((error) => {
          console.error(error)
          done(error, null)
        }) */
    }
  )
)
/*

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'JWT_SECRET_OR_KEY'
passport.use(
  new JwtStrategy(opts, function (payload, done) {
    axios({
      url: 'http://localhost:4000/v1/graphql',
      method: 'post',
      headers: { 'x-hasura-admin-secret': 'adminpassword' },
      data: {
        query: GET_USER_QUERY,
        //todo <-- user id ? not sure if payload has it
        variables: { id: payload.user.google_id },
      },
    })
      .then((result) => {
        console.log('🎹 from the database', result.data)
        done(null, result.data)
      })
      .catch((error) => {
        console.error(error)
        done(error, null)
      })
    // users.findById(payload, function (err, user) {
    //   if (err) {
    //     return done(err, false)
    //   }
    //   if (user) {
    //     return done(null, user)
    //   }
    //   return done(null, false)
    // })
  })
)
*/
