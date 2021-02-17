<template>
  <v-chip-group v-model="selected_features" column multiple>
    <div v-for="(feature, index) in feature_names" :key="index">
      <v-tooltip bottom transition="none" :disabled="!feature.description">
        <template #activator="{ on }">
          <v-chip v-model="feature.active" :value="feature" filter outlined v-on="on">
            {{ feature.label }}
          </v-chip>
        </template>
        <span>{{ feature.description }}</span>
      </v-tooltip>
    </div>
  </v-chip-group>
</template>

<script>
export default {
  props: {
    features: { type: Array, required: false },
    feature_names: { type: Array, required: false },
  },
  data() {
    return {}
  },
  computed: {
    selected_features() {
      return this.feature_names.filter((filed) => filed.active)
    },
  },
}
</script>
