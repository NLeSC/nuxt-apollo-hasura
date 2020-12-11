<template>
  <div>
    <h2>CRUD Example with realtime Subscriptions</h2>
    <p>
      <a :href="dbUrl" target="_blank"> DB Console </a>
    </p>
    <v-row>
      <v-col sm="6" cols="12">
        <todos title="Public todos" type="public" />
      </v-col>
      <v-col sm="6" cols="12">
        <auth-component class="mt-3">
          <todos title="My todos" type="private" />
        </auth-component>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Crud',
  computed: {
    dbUrl() {
      return process.env.dbUrl
    },
  },
}
</script>
