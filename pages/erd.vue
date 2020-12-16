<template>
  <v-container>
    <v-row>
      <v-col sm="3" style="background-color: #eee; column-count: 2">
        <v-switch
          v-for="feature in feature_names"
          :key="feature.label"
          v-model="feature.active"
          :label="feature.label"
          dense
          flat
          inset
          style="display: inline-block"
          @change="updateFeatures(feature)"
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
      defaultEnabledFeatures: [
        'success',
        'topic',
        'au01r',
        'au01c',
        'au04r',
        'au04c',
        'au09r',
        'au09c',
        'au10r',
        'au10c',
        'au12r',
        'au12c',
        'au14r',
        'au14c',
        'au15r',
        'au15c',
      ],
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
      result({ data, loading, networkStatus }) {
        if (data) {
          this.feature_names = data.get_feature_names.fields
            .map((field) => ({
              label: field.name,
              active: this.defaultEnabledFeatures.includes(field.name),
              description: field.description,
            }))
            .filter((filed) => {
              return filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp'
            })
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
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
