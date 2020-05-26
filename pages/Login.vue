<template>
  <v-content>
    <v-container>
      <h1>Login Page</h1>
      <v-alert v-if="errorMessage" show color="danger">
        {{ errorMessage }}
      </v-alert>
      <v-alert v-if="$auth.$state.redirect" color="blue lighten-3">
        You have to login before accessing to
        <strong>{{ $auth.$state.redirect }}</strong>
      </v-alert>

      is logged in? {{ $auth.loggedIn }} <br />
      User?: {{ $auth.user }} <br />
      Token?: {{ $auth.token }} <br />
      is admin?: {{ $auth.hasScope('admin') }}

      <v-row>
        <!--        <v-btn @click="loginClicked">Login with google</v-btn>-->
        <v-btn @click="$auth.loginWith('auth0')">Login with auth0</v-btn>
        <v-btn @click="$auth.logout()">Logout</v-btn>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'auth',

  data() {
    return {
      username: '',
      password: '123',
      error: null,
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    },
  },

  methods: {
    consoleLog(text) {
      if (this.log !== null) {
        this.log += text + '\n'
      } else {
        this.log = text + '\n'
      }
    },
    async loginClicked() {
      try {
        const res = await this.$auth.loginWith('google')
        console.log('login result: ' + res)
      } catch (err) {
        this.consoleLog('login error: ' + err)
      }
    },

    loginWithGoogle() {
      this.$auth
        .loginWith('google')
        .then(() => this.$toast.success('Logged In!'))
    },
  },
}
</script>
