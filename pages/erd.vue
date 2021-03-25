<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <tabs />
      </v-col>
      <v-col lg="6">
        <video-player />
      </v-col>
    </v-row>
    <v-row>
      <D3HeatMap :features="selectedFeatures" />
    </v-row>
    <ActionButtons></ActionButtons>
  </v-container>
</template>

<script>
import get_feature_names from '~/apollo/get_feature_names.gql'

export default {
  data() {
    return {
      reveal: false,
      isPlaying: false,
      cursor: 0,
      featureNames: [],
    }
  },
  computed: {
    defaultEnabledFeatures() {
      return this.$store.state.features.selectedFeatures
    },
    selectedFeatures() {
      return this.featureNames.filter((filed) => filed.active)
    },
    featureNamesStore() {
      return this.$store.state.features.featureNames
    },
  },
  apollo: {
    get_feature_names: {
      query: get_feature_names,
      result({ data, loading, networkStatus }) {
        if (data) {
          const featureNames = data.get_feature_names.fields
            .map((field) => ({
              label: field.name,
              active: this.defaultEnabledFeatures.includes(field.name),
              description: field.description,
            }))
            .filter((filed) => {
              return filed.label !== 'grouped_seconds' && filed.label !== 'min_timestamp'
            })
          this.featureNames = featureNames
          this.$store.commit('features/UPDATE_FEATURES_NAME', data.get_feature_names.fields)
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  methods: {
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
