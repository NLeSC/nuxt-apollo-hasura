const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
require('./auth/passport-setup')
const passport = require('passport')
const generateJWT = require('./auth/createJWT')
const cookieSession = require('cookie-session')
const authRoutes = require('./routes/auth-routes')

const app = express()
require('dotenv').config()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use(
  cookieSession({
    // one day long
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['lkajdlkfajs;dlkfj'], // todo create pass that lives in the .env
  })
)
// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// async function start() {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(config)
//
//   const { host, port } = nuxt.options.server
//
//   await nuxt.ready()
//   // Build only in dev mode
//   if (config.dev) {
//     const builder = new Builder(nuxt)
//     await builder.build()
//   }
//
//   // Give nuxt middleware to express
//   app.use(nuxt.render)
//
//   // Listen the server
//   app.listen(port, host)
//   consola.ready({
//     message: `Server listening on http://${host}:${port}`,
//     badge: true,
//   })
// }
// start()
app.listen(5000, 'localhost')
consola.ready({
  message: `Server listening on http://localhost:5000`,
  badge: true,
})
