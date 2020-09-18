<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6">
        <VideoPlayer src="video/erd_video.mp4" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <!-- <HeatMap /> -->
        <D3HeatMap />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer'
// import HeatMap from '../components/HeatMap'
import D3HeatMap from '../components/D3HeatMap'
export default {
  name: 'Erd',
  components: {
    VideoPlayer,
    // HeatMap,
    D3HeatMap,
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
