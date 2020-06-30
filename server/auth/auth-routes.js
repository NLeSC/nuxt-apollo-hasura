const router = require('express').Router()
const axios = require('axios')
const createJWT = require('./createJWT')

const INSERT_USER_ONE_QUERY = `
mutation insert_users_one($email: String, $email_verified: Boolean, $gender: String, $locale: String, $name: String, $avatar_url: String, $google_id: String) {
  insert_users_one(object: {email: $email, email_verified: $email_verified, gender: $gender, locale: $locale, name: $name, avatar_url: $avatar_url, google_id: $google_id},
  on_conflict: {update_columns: updated_at, constraint: users_google_id_key}) {
    id
    email
    email_verified
    gender
    locale
    name
    avatar_url
    google_id
    created_at
    updated_at
    role
  }
}
`
/*
 * Create new token
 * @user {}
 */
router.post('/login/token', (req, res) => {
  console.log('⚡️ User from api /login/token', req.query)
  if (req.query.user) {
    const token = createJWT(req.query.user)
    res.send(token)
  } else {
    res.send('<h3>❌ No user defined</h3>')
  }
})

// Insert user in the database everytime a user is logged in
router.post('/api/auth/insert_user', async (req, res) => {
  console.log(' USEER LOGGED IN')
  try {
    const resultUser = await axios({
      url: 'http://localhost:4000/v1/graphql',
      method: 'post',
      headers: {
        'x-hasura-admin-secret': 'adminpassword',
      },
      data: {
        query: INSERT_USER_ONE_QUERY,
        variables: { ...req.query },
      },
    })
    const createdUser = resultUser.data.data.insert_users_one

    // TODO Get the token for this user

    const token = createJWT(createdUser)
    // console.log('🎹 token', token)
    res.json({ createdUser, token })
  } catch (error) {
    console.error('❌ Error in creating the user', error)
    res.send(error)
  }
})

module.exports = router
