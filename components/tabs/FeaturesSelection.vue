<template>
  <v-card-text class="pb-0 featuresPanel">
    <v-chip-group v-model="selected_features" column multiple>
      <div v-for="(feature, index) in feature_names" :key="index">
        <v-tooltip v-if="feature.description" bottom lazy>
          <template #activator="{ on }">
            <v-chip v-model="feature.active" :value="feature" filter outlined v-on="on">
              {{ feature.label }}
            </v-chip>
          </template>
          <span>{{ feature.description }}</span>
        </v-tooltip>
        <v-chip v-else v-model="feature.active" :value="feature" filter outlined v-on="on">
          {{ feature.label }}
        </v-chip>
      </div>
    </v-chip-group>
  </v-card-text>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
