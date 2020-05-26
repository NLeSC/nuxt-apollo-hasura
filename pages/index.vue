<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-img
      max-width="700"
      width="100%"
      src="images/stack.webp"
      class="mt-4"
      :aspect-ratio="255 / 122"
    />

    <v-card max-width="700" width="100%" class="mt-4" outlined>
      <v-card-title class="headline">
        NuxtJs + Apollo + Hasura + Postgres template
      </v-card-title>

      <v-card-text>
        <v-icon>{{ mdiDatabase }}</v-icon> Database:
        <a href="http://localhost:4000" target="_blank" class="link"
          >Hasura console</a
        >
        <hr class="my-3" />
        <v-row>
          <v-col sm="6" cols="12" class="mb-4"
            ><h4>Perks</h4>
            <ul>
              <li>Vue Nuxt Structure</li>
              <li>Auth Login with user roles</li>
              <li>Private Auth pages</li>
              <li>Realtime subscription</li>
              <li>Optimistic UI</li>
              <li>Responsive UI</li>
              <li>One dev command with Docker</li>
              <li>Deploy to Github pages</li>
            </ul>
          </v-col>
          <v-col sm="6" cols="12"
            ><h4>Documentation</h4>
            <div v-for="link in links" :key="link.name">
              <v-icon>{{ mdiLink }}</v-icon>
              <a :href="link.link" target="_blank">{{ link.name }}</a>
            </div></v-col
          >
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="/crud">
          CRUD and Subscriptions
        </v-btn>
      </v-card-actions>
    </v-card>
    User status:
    {{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}
  </div>
</template>

<script>
import { mdiDatabase, mdiLink } from '@mdi/js'
export default {
  name: 'Home',
  data() {
    return {
      mdiDatabase,
      mdiLink,
      links: [
        {
          name: 'Nuxt Documentation',
          link: 'https://nuxtjs.org/',
        },
        {
          name: 'Nuxt Apollo',
          link: 'https://auth.nuxtjs.org/',
        },
        {
          name: 'Auth0 with Vue and Hasura',
          link:
            'https://hasura.io/blog/add-authentication-and-authorization-to-vue-js-apps-with-auth0-graphql/',
        },
        {
          name: 'Hasura documentation',
          link: 'https://hasura.io/vue-graphql/',
        },
        {
          name: 'Vuetify',
          link: 'https://vuetifyjs.com/en/components',
        },
        {
          name: 'Material Design Icons',
          link: 'https://materialdesignicons.com/',
        },

        {
          name: 'Deploy to Github pages',
          link: 'https://nlesc.github.io/nuxt-apollo-hasura',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
