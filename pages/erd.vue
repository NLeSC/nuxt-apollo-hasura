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
            <D3HeatMap :features="selected_features" style="transform: translateX(-50px)" :cursor="cursor" />
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import retrieveColumnNames from '~/apollo/retrieve_column_names'

export default {
  name: 'Erd',

  data() {
    return {
      isPlaying: false,
      time: 0,
      feature_names: [],
      selected_features: [],
    }
  },
  mounted() {
    this.$apollo.queries.retrieveColumnNames.refetch().then((results) => {
      this.feature_names = results.data.retrieveColumnNames.fields
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
    timeupdate(time) {
      this.time = time
    },
  },
  apollo: {
    retrieveColumnNames: {
      query: retrieveColumnNames,
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
}
</script>

<style>
#erd {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 500px;
  height: 500px;
}

#features ul li {
  list-style: none;
}
</style>
