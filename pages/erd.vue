<template>
  <v-container>
    <v-row>
      <v-col sm="3" style="background-color: #eee"> AColumn</v-col>
      <v-col sm="9" style="background-color: #ddd">
        <v-row justify="center">
          <div style="width: 600px">
            <video-player :video-src="'videos/' + $route.query.video" :cursor="cursor" @onTimeupdate="timeupdate" />
            <br />
            Cursor position: {{ cursor }}
            <D3HeatMap style="transform: translateX(-50px)" :cursor="cursor" @onCursorUpdate="onCursorUpdate" />
          </div>
        </v-row>
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
      cursor: 0,
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
    timeupdate(cursorPosition) {
      this.cursor = cursorPosition
    },
    onCursorUpdate(cursor) {
      this.cursor = cursor
    },
  },
}
</script>
