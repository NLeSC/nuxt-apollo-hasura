<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <tabs :feature-names="featureNames" />
      </v-col>
      <v-col lg="6">
        <video-player />
      </v-col>
    </v-row>
    <v-row>
      <D3HeatMap :feature-names="featureNames" :selected-features="selectedFeatures" />
    </v-row>
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
    selectedFeatures() {
      return this.$store.state.features.selectedFeatures
    },
  },
  apollo: {
    get_feature_names: {
      query: get_feature_names,
      result({ data, loading, networkStatus }) {
        if (data) {
          this.featureNames = data.get_feature_names.fields
            .map((field) => ({
              label: field.name,
              active: this.selectedFeatures.includes(field.name),
              description: field.description,
            }))
            .filter((field) => {
              return field.label !== 'grouped_seconds' && field.label !== 'min_timestamp'
            })
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  // mounted() {
  //   this.$store.dispatch('features/getFeaturesName')
  // },
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
