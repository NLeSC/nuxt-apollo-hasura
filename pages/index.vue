<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card max-width="700" width="100%" class="mt-4" outlined>
      <v-card-title class="headline"> Emotion Recognition for Dementia </v-card-title>

      <heatmap-e-r-d class="ma-10" />

      <spark-example />
      <lib-d3fc class="ma-10" />
    </v-card>
  </div>
</template>

<script>
import { mdiDatabase, mdiLink } from '@mdi/js'
import SparkExample from '~/components/sparkExample'
import HeatmapERD from '~/components/HeatmapERD'
import LibD3fc from '~/components/LibD3fc'
export default {
  name: 'Home',
  components: { HeatmapERD, SparkExample, LibD3fc },
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
          link: 'https://hasura.io/blog/add-authentication-and-authorization-to-vue-js-apps-with-auth0-graphql/',
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
