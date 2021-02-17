<!-- Description of the Component-->
<template>
  <div>
    <v-btn v-if="showRequest" color="warning" depressed class="ml-6" @click="requestPermissions">
      <v-icon left> mdi-file-check-outline</v-icon>
      Allow local video access</v-btn
    >
    <transition name="fade">
      <video
        v-if="videoSrc"
        ref="video"
        class="video"
        :src="videoSrc"
        :controls="true"
        :playsinline="playsinline"
        height="350"
        @play="play"
        @pause="pause"
        @ended="atEnded"
        @seeking="timeUpdate"
        @timeupdate="timeUpdate"
        @volumechange="atVolumechange"
      />
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { openDB } from 'idb'

export default {
  name: 'VideoPlayer',
  props: {
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
      showRequest: false,
      videoSrc: null,
      videoRef: null,
      db: null,
      wasPlaying: false,
      showSound: false,
      mouseover: false,
      playing: false,
      started: false,
      loading: false,
      time: 0,
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
      if (!this.playing && this.$refs.video) {
        this.$refs.video.currentTime = this.position
      }
    },

    volume() {
      this.$refs.video.volume = this.volumeComputed
    },
  },

  async mounted() {
    // Create DB in indexDB
    this.db = await openDB('db', 1, {
      upgrade(db) {
        db.createObjectStore('store')
      },
    })

    try {
      this.videoRef = (await this.db.get('store', this.$route.query.video)) || null
      this.videoSrc = URL.createObjectURL(await this.videoRef.fileHandle.getFile())
      this.showRequest = !this.videoSrc
    } catch (e) {
      this.showRequest = !this.videoSrc
      console.log('🚨 mounted video player', e)
    }
  },
  methods: {
    async requestPermissions() {
      try {
        await this.verifyPermission(this.videoRef.fileHandle)
        this.videoSrc = URL.createObjectURL(await this.videoRef.fileHandle.getFile())
        this.showRequest = !this.videoSrc
      } catch (e) {
        console.log('🚨 request permissions', e)
      }
    },
    async verifyPermission(fileHandle, readWrite) {
      const options = {}
      if (readWrite) {
        options.mode = 'readwrite'
      }
      // Check if permission was already granted. If so, return true.
      if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true
      }
      // Request permission. If the user grants permission, return true.
      if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true
      }
      // The user didn't grant permission, so return false.
      return false
    },

    atVolumechange() {
      this.volume = this.$refs.video.volume
    },
    timeUpdate() {
      this.$store.commit('cursor/UPDATE_CURSOR_POSITION', this.$refs?.video?.currentTime)
    },
    play() {
      this.playing = true
      this.$refs.video?.play()
    },
    pause() {
      this.playing = false
      this.$refs.video?.pause()
    },
  },
}
</script>
<style>
video.video {
  width: 100%;
  background-color: black;
  border-radius: 8px;
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
