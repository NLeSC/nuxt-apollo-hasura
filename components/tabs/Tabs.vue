<template>
  <v-card height="350" outlined>
    <v-tabs v-model="tab">
      <v-tab>Info</v-tab>
      <v-tab>Features</v-tab>
      <v-tab>Legend</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Info />
      </v-tab-item>
      <v-tab-item>
        <FeaturesSelection />
      </v-tab-item>
      <v-tab-item>
        <Legend />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  computed: {
    tab: {
      get() {
        return this.$store.state.general.selectedTab
      },
      set(value) {
        this.$store.commit('general/SELECTED_TAB', value)
      },
    },
  },
}
</script>

<style scoped></style>
