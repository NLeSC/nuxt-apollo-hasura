const fs = require('fs')
const jose = require('jose')

const privateKey =
  process.env.AUTH_PRIVATE_KEY ||
  jose.JWK.asKey(fs.readFileSync('./auth-server/keys/private.pem'))

/**
 * x-hasura-role has to be sent with the http request.
 * It is not expected to be part of the JWT's hasura claims and as such it is ignored.
 * The x-hasura-role sent with the request is checked to see if it is part of the
 * x-hasura-allowed-roles and if yes, the request is executed as that role.
 * In case the x-hasura-role is missing, the x-hasura-default-role from the JWT is used.
 */

module.exports = (user_id = 0, user_role = 'user') => {
  // get the roles from the DB to see what  are the roles the user is able to have
  // const parsedUser = typeof user_id === "string" ? JSON.parse(user_id) : user_id;

  // Based on the role, add he allowed roles in the token
  const allowedRoles = ['user']

  if (user_role !== 'user') {
    allowedRoles.push(user_role)
  }

  const claims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-user-id': user_id.toString(), // auto integer in the database
      // default role if the http call is missing 'x-hasura-role'
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': allowedRoles,
      // x-hasura-role: it is ignored in the JWT. Has to be sent in the http call.
    },
  }
  try {
    // return token
    return jose.JWT.sign(claims, privateKey, {
      algorithm: 'PS256',
      expiresIn: '15 min',
    })
  } catch (error) {
    console.error('❌ Error redirecting the user', error)
    return error
  }
}
