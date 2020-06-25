const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
// const cookieSession = require('cookie-session')
require('./auth/passport-setup')
// const passport = require('passport')
const authRoutes = require('./auth/auth-routes')

const app = express()
require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Use Cookie session
  // app.use(
  //   cookieSession({
  //     // one day long
  //     maxAge: 24 * 60 * 60 * 1000,
  //     keys: ['lkajdlkfajs;dlkfj'], // todo create pass that lives in the .env
  //   })
  // )
  // Initialize passport
  // app.use(passport.initialize())
  // app.use(passport.session())
  app.use('/', authRoutes)

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
  // All custom routes mus go before the nuxt routes
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
