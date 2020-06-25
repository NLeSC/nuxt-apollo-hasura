<template>
  <div>
    <v-container>
      <h3>Users List</h3>
      <div v-for="user in usersList" :key="user.id">
        <pre>
          {{ user }}
        </pre>
      </div>
    </v-container>
  </div>
</template>
<script>
import users_subscription from '~/apollo/users_subscription'
export default {
  middleware: ['auth'],
  data() {
    return {
      usersList: [],
    }
  },
  apollo: {
    $subscribe: {
      usersList: {
        query: users_subscription,
        result({ data }) {
          this.usersList = data.users
        },
      },
    },
  },
}
</script>
