<template>
  <div>
    <div id="erd">
      <VideoPlayer src="video/erd_video.mp4"></VideoPlayer>
    </div>
    <HeatMap />
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer'
import HeatMap from '../components/HeatMap'
export default {
  name: 'Erd',
  components: {
    VideoPlayer,
    HeatMap,
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
