<template>
  <div>
    <v-alert show color="warning">This is a secure page!</v-alert>
    <v-card title="State">
      Federated user:
      <pre>{{ state }}</pre>
    </v-card>
    <v-card title="Scopes" class="mt-4 pa-2"> Role: {{ role }} </v-card>
    <v-card class="mt-4 pa-2" title="token">
      Custom local JWT token: {{ token }}
    </v-card>
    <hr />
    <v-row class="mt-4">
      <v-btn @click="$auth.logout()">Logout</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      role: '',
      token: '',
    }
  },
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    },
  },
  mounted() {
    if (process.browser) {
      this.role = localStorage['auth.role'] || ''
      this.token = localStorage['auth._token_local'] || ''
    }
  },
}
</script>
