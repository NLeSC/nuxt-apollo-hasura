<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="true"
      :clipped="clipped"
      fixed
      app
      :width="220"
      mobile-break-point="759"
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-4" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
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
import {
  mdiChevronRight,
  mdiChevronLeft,
  mdiApplication,
  mdiHomeOutline,
  mdiDatabaseSync,
  mdiFileLockOutline,
  mdiMovieFilterOutline,
} from '@mdi/js'
import { version } from '~/package.json'

export default {
  data() {
    return {
      mdiChevronRight,
      mdiChevronLeft,
      mdiApplication,
      mdiHomeOutline,
      mdiDatabaseSync,
      mdiFileLockOutline,
      mdiMovieFilterOutline,

      clipped: true,
      drawer: this.$vuetify.breakpoint.smAndUp,
      miniVariant: false,
      items: [
        {
          icon: mdiMovieFilterOutline,
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
