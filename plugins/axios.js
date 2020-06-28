export default function ({ context, $axios }) {
  $axios.onError((error) => {
    if (error.response && error.response.status === 401) {
      console.log('🎹 token expired')
      context.$auth.reset()
    }

    return Promise.reject(error)
  })
}
