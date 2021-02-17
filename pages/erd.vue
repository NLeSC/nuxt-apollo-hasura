<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <tabs :features="selected_features" :feature_names="feature_names" />
      </v-col>
      <v-col lg="6">
        <video-player />
      </v-col>
    </v-row>
    <v-row>
      <D3HeatMap :features="selected_features" />
    </v-row>
  </v-container>
</template>

<script>
import get_feature_names from '~/apollo/get_feature_names'
export default {
  data() {
    return {
      reveal: false,
      isPlaying: false,
      cursor: 0,
      feature_names: [],
      defaultEnabledFeatures: [
        'success',
        'topic',
        'silence',
        'pitch',
        'intensity',
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
