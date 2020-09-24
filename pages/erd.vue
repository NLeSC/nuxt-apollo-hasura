<template>
  <v-container>
    <v-row>
      <v-col sm="3" style="background-color: #eee; column-count: 2">
        <v-switch
          style="display: inline-block"
          v-for="feature in feature_names"
          :key="feature.label"
          v-model="feature.active"
          :label="feature.label"
          @change="updateFeatures(feature)"
          dense
          flat
          inset
        >
          {{ feature.label }}
        </v-switch>
      </v-col>
      <v-col sm="9" style="background-color: #ddd">
        <v-row justify="center">
          <div style="width: 600px">
            <video-player :video-src="'videos/' + $route.query.video" />
            <br />
            <D3HeatMap :features="selected_features" style="transform: translateX(-50px)" />
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import get_feature_names from '~/apollo/get_feature_names'

export default {
  name: 'Erd',

  data() {
    return {
      isPlaying: false,
      cursor: 0,
      feature_names: [],
      defaultEnabledFeatures: ['au01c', 'au01r', 'au02c', 'au02r', 'au04c'],
    }
  },
  computed: {
    selected_features() {
      return this.feature_names.filter((filed) => filed.active)
    },
  },
  apollo: {
    get_feature_names: {
      query: get_feature_names,
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  mounted() {
    this.$apollo.queries.get_feature_names.refetch().then((results) => {
      this.feature_names = results.data.get_feature_names.fields
        .map((field) => ({
          label: field.name,
          active: this.defaultEnabledFeatures.includes(field.name),
          description: field.description,
        }))
        .filter((filed) => {
          return filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp'
        })
    })
  },
  methods: {
    updateFeatures(feature) {
      this.selected_features.findIndex((feat) => feat.label === feature.label)
    },
    play() {
      this.$refs.myvideo.play()
      this.isPlaying = true
    },
    stop() {
      this.$refs.myvideo.pause()
      this.isPlaying = false
    },
  },
}
</script>
<style>
.v-messages {
  display: none;
}
.v-input--selection-controls {
  margin-top: 0 !important;
}
</style>
