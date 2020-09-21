<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6">
        <video-player :video-src="'videos/' + $route.query.video" @onTimeupdate="timeupdate" />
        <br />
        time: {{ time }}
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <!-- <HeatMap /> -->
        <D3HeatMap />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Erd',

  data() {
    return {
      isPlaying: false,
      time: 0,
    }
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
</style>
