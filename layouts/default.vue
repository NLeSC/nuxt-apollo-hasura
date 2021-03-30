<template>
  <v-app>
    <v-app-bar clipped-left fixed app dense>
      <nuxt-link to="/" style="text-decoration: none; color: initial">
        <div class="d-flex">
          <v-icon color="#555">mdi-account-box-outline</v-icon>
          <v-toolbar-title class="ml-4" v-text="title" />
        </div>
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app class="flex">
      <img
        src="https://www.esciencecenter.nl/wp-content/themes/raadhuis/dist/assets/img/favicons/apple-touch-icon.png"
        width="20"
        class="mr-3"
      />
      <small>eScience Center &copy; {{ new Date().getFullYear() }}</small>
      <v-spacer></v-spacer>
      <small>App version {{ version }}</small>
    </v-footer>
  </v-app>
</template>

<script>
import { version } from '~/package.json'

export default {
  data() {
    return {
      drawer: this.$vuetify.breakpoint.smAndUp,
      miniVariant: false,
      items: [
        {
          icon: 'mdi-movie-filter-outline',
          title: 'Videos',
          to: '/',
        },
      ],
      title: 'EMO Spectre',
    }
  },
  computed: {
    version: () => version,
  },
}
</script>
