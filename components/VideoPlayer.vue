<!-- Description of the Component-->
<template>
  <div style="width: 100%">
    <video
      ref="video"
      class="video"
      :src="videoSrc"
      :controls="true"
      :playsinline="playsinline"
      @play="play"
      @pause="pause"
      @ended="atEnded"
      @seeking="timeUpdate"
      @timeupdate="timeUpdate"
      @volumechange="atVolumechange"
      height="350"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'VideoPlayer',
  props: {
    videoSrc: { required: true, type: String },
    /**
     * set the video to autoplay as it's loaded
     */
    autoplay: { type: Boolean, default: false },
    /**
     * show/hide the controls
     */
    controls: { type: Boolean, default: undefined },
    /**
     * set the video to playsinline as it's loaded
     */
    playsinline: { type: Boolean, default: false },
  },
  data() {
    return {
      wasPlaying: false,
      showSound: false,
      mouseover: false,
      playing: false,
      started: false,
      loading: false,
      time: 0,
      duration: 0,
      volumeInternal: 1,
      fullscreenInternal: false,
    }
  },
  computed: {
    ...mapState('cursor', ['position', 'seeking']),
  },

  watch: {
    seeking() {
      // start seeking
      if (this.playing && this.seeking) {
        this.wasPlaying = true
        this.pause()
      }
      // stopped seeking
      if (!this.seeking && this.wasPlaying) {
        this.wasPlaying = false
        this.play()
      }
    },
    position() {
      if (!this.playing) {
        this.$refs.video.currentTime = this.position
      }
    },

    volume() {
      this.$refs.video.volume = this.volumeComputed
    },
  },
  methods: {
    atEnded() {
      console.log('video ended')
    },
    atVolumechange() {
      this.volume = this.$refs.video.volume
      console.log('volume changed')
    },
    timeUpdate() {
      this.$store.commit('cursor/UPDATE_CURSOR_POSITION', this.$refs.video.currentTime)
    },
    play() {
      this.playing = true
      this.$refs.video.play()
      // console.log('Called play')
    },
    pause() {
      this.playing = false
      this.$refs.video.pause()
      // console.log('Called pause')
    },
  },
}
</script>
<style>
video.video {
  width: 100%;
}
</style>
