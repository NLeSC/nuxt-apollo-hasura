<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title class="headline">Add Videos</v-card-title>
          <v-container>
            <v-row justify="center">
              <v-col cols="10">
                <v-file-input
                  id="videodir"
                  v-model="files"
                  label="Videos"
                  counter
                  color="primary"
                  placeholder="Select your videos"
                  outlined
                  multiple
                  chips
                />
              </v-col>
              <v-col cols="2">
                <v-btn color="primary" fab dark @click="addVideo()">
                  <v-icon dark x-large>{{ mdiPlus }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card id="video-list" outlined>
          <v-card-title class="headline">Videos</v-card-title>
          <v-container v-if="localVideos">
            <v-row v-for="(path, name) in localVideos" :key="name" class="video">
              <v-col md="3" sm="4">
                {{ name }}
                <video-player :video-src="'videos/' + name" :controls="false"></video-player>
              </v-col>
              <v-col md="8" sm="6">
                <p>{{ name }}</p>
                <nuxt-link :to="{ name: 'erd', params: { db_videos: videos[0] }, query: { video: name } }">
                  <v-btn color="primary"> Analyze </v-btn>
                </nuxt-link>
              </v-col>
              <v-col md="1" sm="2">
                <v-btn color="error" fab dark x-small @click="removeVideo(name)">
                  <v-icon dark small>{{ mdiDelete }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mdiPlus, mdiDelete } from '@mdi/js'
import get_video_metadata from '~/apollo/videos'
export default {
  data() {
    return {
      mdiPlus,
      mdiDelete,
      localVideos: {},
      files: [],
    }
  },
  mounted() {
    if (process.browser) {
      if (localStorage.localVideos) {
        this.localVideos = JSON.parse(localStorage.localVideos)
      }
    }
  },
  apollo: {
    videos: {
      query: get_video_metadata,
      result({ data }) {
        if (data) {
          console.log('data', data)
        }
      },
    },
  },
  methods: {
    addVideo() {
      const newVideos = this.files.filter((value, index, array) => {
        return value.type.startsWith('video')
      })

      for (const video of newVideos) {
        if (!(video.name in this.videos)) {
          this.localVideos[video.name] = video.webkitRelativePath
        }
      }

      this.files = []
      if (process.browser) {
        localStorage.localVideos = JSON.stringify(this.localVideos)
      }
    },
    removeVideo(name) {
      if (name in this.localVideos) {
        this.$delete(this.localVideos, name)
        if (process.browser) {
          localStorage.localVideos = JSON.stringify(this.localVideos)
        }
      }
    },
  },
}
</script>

<style>
#video-list {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: block;
}
</style>
