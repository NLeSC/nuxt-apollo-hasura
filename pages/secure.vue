<template>
  <div>
    <v-alert show color="warning">This is a secure page!</v-alert>
    <v-card title="State">
      <pre>{{ state }}</pre>
    </v-card>
    <v-card title="Scopes" class="mt-4 pa-2">
      User: {{ $auth.hasScope('user') }} <br />
      Test: {{ $auth.hasScope('test') }} <br />
      Admin: {{ $auth.hasScope('https://hasura.io/jwt/claims') }}
    </v-card>
    <v-card class="mt-4 pa-2" title="token">
      Auth token {{ $auth.getToken('auth0') || '-' }}
    </v-card>
    <hr />
    <v-row class="mt-4">
      <v-btn @click="$auth.fetchUser()">Fetch User</v-btn>
      <v-btn @click="$auth.logout()">Logout</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    },
  },
}
</script>
