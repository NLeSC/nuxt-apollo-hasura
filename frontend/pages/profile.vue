<template>
  <div>
    <v-app-bar dense elevation="0">
      <v-btn rounded text @click="goBack">
        <v-icon left>mdi-arrowLeft</v-icon>
        <span class="hidden-xs-only">Go back</span>
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row v-if="!!$auth.user" no-gutters justify="center" align="start">
        <v-card width="500" class="mx-4 pa-2">
          <div class="d-flex">
            <v-img
              :src="$auth.user.picture || $auth.user.avatar_url"
              max-width="100px"
              contain
            />
            <div class="ml-3">
              <h2>
                {{ $auth.user.name }}
              </h2>
              <h4>{{ $auth.user.email }}</h4>
              <div v-if="$auth.user.created_at">
                Since
                {{
                  $dateFns.formatDistanceToNow(
                    Date.parse($auth.user.created_at)
                  )
                }}
              </div>
            </div>
          </div>
          <v-card-actions>
            <v-btn depressed @click="$auth.logout()"> LOG OUT </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {
  // mapGetters,
  mapState,
} from 'vuex'
// import { roles } from '@/types/roles'

export default {
  name: 'App',
  data() {
    return {
      showButton: false,
    }
  },
  computed: {
    ...mapState('user', ['user', 'loggedIn']),
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
