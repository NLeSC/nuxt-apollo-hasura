const router = require('express').Router()
const passport = require('passport')
const createJWT = require('./createJWT')

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// On redirect, the callback function for passport will be called!
router.get(
  '/login/google/redirect',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    // Passport passes the currently logged user on the req param
    // res.send({ user: req.user })
    const token = createJWT(req.user)

    res.redirect(`${'/'}?token=${token}`)
  }
)
// // middelware to check if the user is logged in
// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     // if not logged in
//     res.redirect('login')
//   } else {
//     // if logged in
//     next()
//   }
// }
// router.get('/login', (req, res) => {
//   res.send('you are not logged in')
// })
// router.get('/', authCheck, (req, res) => {
//   res.send({
//     hello: 'Hello World!',
//     user: req.user,
//   })
// }) // todo delete this

module.exports = router
