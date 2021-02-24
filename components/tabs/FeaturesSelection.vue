<template>
  <div>
    <v-chip-group v-model="selectedFeatures" column multiple>
      <div v-for="(feature, index) in featureNames" :key="index">
        <v-tooltip bottom transition="none" :disabled="!feature.description">
          <template #activator="{ on }">
            <v-chip filter outlined :value="feature.label" v-on="on">
              {{ feature.label }}
            </v-chip>
          </template>
          <span>{{ feature.description }}</span>
        </v-tooltip>
      </div>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    featureNames: { type: Array, default: () => [], required: false },
  },
  computed: {
    selectedFeatures: {
      get() {
        return this.$store.state.features.selectedFeatures
      },
      set(selectedFeatures) {
        this.$store.commit('features/UPDATE_SELECTED_FEATURES', selectedFeatures)
      },
    },
  },
}
</script>
