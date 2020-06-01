<template>
  <div>
    <div v-if="!$auth.$state.loggedIn">
      <div>
        Login to see this component
      </div>
      <v-btn outlined @click="$auth.loginWith('auth0')">Login</v-btn>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'AuthComponent',
  methods: {
    // ...mapActions({
    //   toggleDialogLogin: 'login/TOGGLE_LOGIN_DIALOG_USER',
    // }),
  },
}
</script>

<style scoped></style>
