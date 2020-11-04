const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const cors = require('cors')
// const cookieSession = require('cookie-session')
// const passport = require('passport')
const authRoutes = require('./auth-routes')

const app = express()
// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(
  cors()
  /*
  {
    origin: 'http://yourapp.com'   todo: when production
  }
  */
)

function start() {
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

  const { host, port } = { host: 'localhost', port: 5000 } // todo get the ports and uri

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Auth Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
