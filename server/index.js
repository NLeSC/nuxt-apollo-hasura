const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const fs = require('fs')
const jose = require('jose')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express()
const axios = require('axios')
require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const privateKey =
  process.env.AUTH_PRIVATE_KEY ||
  jose.JWK.asKey(fs.readFileSync('./server/private.pem'))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/redirect',
    },
    // Callback function to called when the auth is retrieved
    (accessToken, refreshToken, profile, done) => {
      // console.log('⏩ access token: ', accessToken)
      // console.log('refresh token: ', refreshToken)
      console.log('profile: ', profile)
      // console.log('done: ', done)

      // function (user, context, callback) {
      const userId = profile._json.id
      const nickname = profile._name

      // GET request for remote image in node.js
      axios({
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
        url: 'http://localhost:4000/v1/graphql',
        body: `{\"query\":\"mutation($userId: String!, $nickname: String) {\\n          insert_users(\\n            objects: [{ auth0_id: $userId, name: $nickname }]\\n            on_conflict: {\\n              constraint: users_pkey\\n              update_columns: [last_seen, name]\\n            }\\n          ) {\\n            affected_rows\\n          }\\n        }\",\"variables\":{\"userId\":\"${userId}\",\"nickname\":\"${nickname}\"}}`,
      })
        .then(() => {
          console.log('🎹 USER IN THE DATABSE!!!!!!!!!!!!!!!!!!!!')
          done(null, accessToken)
        })
        .catch((error) => {
          console.error(error)
          done(null, accessToken)
        })

      // }

      // TODO ADD THE USER TO THE HASURA CONSOLE HERE
    }
  )
)

app.use(passport.initialize())

app.get(
  // '/oauth2',
  '/log',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // hostedDomain: process.env.HOSTED_DOMAIN,
  })
)

// On redirect, the callback function for passport will be called!
app.get('/redirect', passport.authenticate('google'), (req, res) => {
  console.log('🎹', req.user, req.profile)
  const claims = {
    // sub: req.user.id,
    // email: req.user.email,
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      // 'x-hasura-user-id': req.user.id,
      'x-hasura-allowed-roles': ['admin', 'user'],
    },
  }

  try {
    const token = jose.JWT.sign(claims, privateKey, {
      algorithm: 'PS256',
      expiresIn: '15 min',
    })
    res.redirect(`${process.env.REDIRECT_URL}?token=${token}`)
  } catch (error) {
    console.error(error)
  }
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
