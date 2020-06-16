<template>
  <div id="erd">
    <VideoPlayer src="video/erd_video.mp4"></VideoPlayer>
  </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer";

export default {
  name: "Erd",
  components: {
    VideoPlayer
  }
};
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
