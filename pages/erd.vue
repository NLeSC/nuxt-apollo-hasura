<template>
  <v-container>
    <v-row>
      <v-col sm="3" style="background-color: #eee">
        <v-switch
          v-for="name in feature_names"
          :key="name"
          v-model="selected_features"
          :label="name"
          :value="name"
          dense
          >{{ name }}
        </v-switch>
      </v-col>
      <v-col sm="9" style="background-color: #ddd">
        <v-row justify="center">
          <div style="width: 600px">
            <video-player :video-src="'videos/' + $route.query.video" :cursor="cursor" @onTimeupdate="timeupdate" />
            <br />
            <D3HeatMap
              :features="selected_features"
              style="transform: translateX(-50px)"
              :cursor="cursor"
              @onCursorUpdate="onCursorUpdate"
            />
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
      selected_features: [],
    }
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
        .map((field) => {
          return field.name
        })
        .filter((name) => {
          return name !== 'grouped_seconds' && name !== 'min_timestamp'
        })
      this.selected_features = this.feature_names
    })
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
    timeupdate(cursorPosition) {
      this.cursor = cursorPosition
    },
    onCursorUpdate(cursor) {
      this.cursor = cursor
    },
  },
}
</script>
