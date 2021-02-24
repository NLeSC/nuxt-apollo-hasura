<template>
  <v-container>
    <div class="headline">Participant {{ video_metadata.participant }}</div>
    <p>study: {{ video_metadata.study }}</p>
    <p>Session: {{ video_metadata.session }}</p>
    <p>Memory Type: {{ video_metadata.memory_type }}</p>
    <p>Memory Index: {{ video_metadata.memory_index }}</p>
  </v-container>
</template>

<script>
import get_video_metadata from '~/apollo/get_video_metadata'
export default {
  data() {
    return {
      video_metadata: {},
    }
  },
  computed: {
    video_hash() {
      // Retrieve selected video from vuex store
      const selectedVideo = this.$store.state.videos.selectedVideo
      return selectedVideo.hash
    },
  },
  apollo: {
    videoMetadata: {
      variables() {
        return {
          hash: this.video_hash,
        }
      },
      query: get_video_metadata,
      result({ data }) {
        if (data) {
          this.video_metadata = data.videoMetadata[0]
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
        console.error('Error', this.error)
      },
    },
  },
}
</script>
