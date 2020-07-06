export default async (error, nuxtContext) => {
  // todo if the token is expired.. then get another one!!!! wop weop
  if (error.toString().includes('Malformed Authorization header')) {
    console.log(
      'Malformed Authorization header',
      error.toString().includes('Malformed Authorization header')
    )
  }
  const isTokenExpired = error.toString().includes('JWTExpired')
  if (isTokenExpired) {
    // todo get the new token here
    await console.log('JWTExpired', isTokenExpired)
  }

  console.error(error)
}
