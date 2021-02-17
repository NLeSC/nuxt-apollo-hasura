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
      <D3HeatMap :features="selected_features" />
    </v-row>
  </v-container>
</template>

<script>
import get_feature_names from '~/apollo/get_feature_names'
export default {
  name: 'Erd',

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
    selected_features: {
      get() {
        return this.feature_names.filter((filed) => filed.active)
      },
      set() {
        return this.feature_names.filter((filed) => filed.active)
      },
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
<style>
.descContainer {
  height: 350px;
  overflow-y: scroll;
  position: relative;
}
.desc {
  height: 100%;
  max-height: 200px;
  overflow-y: scroll;
}
.bottom {
  position: absolute;
  bottom: 0;
}
.featuresPanel {
  height: 100%;
  max-height: 320px;
  overflow: scroll;
}
.v-messages {
  display: none;
}
.v-input--selection-controls {
  margin-top: 0 !important;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
