const fs = require('fs')
const jose = require('jose')

const privateKey =
  process.env.AUTH_PRIVATE_KEY ||
  jose.JWK.asKey(fs.readFileSync('./server/auth/private.pem'))

/**
 * x-hasura-role has to be sent with the http request.
 * It is not expected to be part of the JWT's hasura claims and as such it is ignored.
 * The x-hasura-role sent with the request is checked to see if it is part of the
 * x-hasura-allowed-roles and if yes, the request is executed as that role.
 * In case the x-hasura-role is missing, the x-hasura-default-role from the JWT is used.
 */

module.exports = (user = '') => {
  // get the roles from the DB to see what  are the roles the user is able to have
  const claims = {
    //TODO
    'https://hasura.io/jwt/claims': {
      'x-hasura-user-id': user.id.toString(),
      // default role if the http call is missing 'x-hasura-role'
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['admin', 'user'], // todo: <-- which roles are allowed???
      // x-hasura-role: it is ignored in the JWT. Has to be sent in the http call.
    },
  }
  try {
    const token = jose.JWT.sign(claims, privateKey, {
      algorithm: 'PS256',
      expiresIn: '15 min',
    })
    return token

    // res.redirect(`${process.env.REDIRECT_URL}?token=${token}`)
    // res.redirect(`/?token=${token}`)
  } catch (error) {
    console.error('❌ Error redirecting the user', error)
    return null
  }
}
