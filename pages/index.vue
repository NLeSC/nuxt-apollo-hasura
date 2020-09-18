<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card max-width="700" width="100%" class="mt-4" outlined>
      <v-card-title class="headline"> Emotion Recognition for Dementia </v-card-title>
    </v-card>
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
