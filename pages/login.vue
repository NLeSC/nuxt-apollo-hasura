<template>
  <div>
    <!--    <form @submit.prevent="login">-->
    <p v-if="error">
      {{ error }}
    </p>

    <p>
      <input v-model="username" type="email" placeholder="Email" />
    </p>
    <p>
      <input v-model="password" type="password" placeholder="Password" />
    </p>

    <v-btn @click="login">Login</v-btn>
    <!--      <button :disabled="loading">-->
    <!--        {{ loading ? 'Loading...' : 'Login' }}-->
    <!--      </button>-->
    <!--    </form>-->
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      email: '',

      error: '',
      loading: false,
    }
  },
  methods: {
    async login() {
      this.error = ''
      this.loading = true

      // if (!this.username || !this.password) {
      //   return
      // }

      try {
        await this.$auth.loginWith('refresh', {
          data: {
            email: 'ctw@ctwhome.com',
            password: '1234',
            casa: 'what?',
            // email: this.username,
            // username: this.username,
            // password: this.password,
          },
        })

        await this.$router.push(this.$route.query.next || '/')
      } catch (err) {
        console.error('Login failed', err)
        this.error = err.message
      }

      this.loading = false
    },
  },
  head: {
    title: 'Login',
  },
}
</script>
