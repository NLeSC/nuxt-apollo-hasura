<template>
  <div>
    <v-alert color="info"> You have been signed out! </v-alert>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false,
  },
}
</script>
