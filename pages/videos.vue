<template>
  <v-container grid-list-md>
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
                  class
                />
              </v-col>
              <v-col cols="2">
                <v-btn color="primary" fab dark @click="addVideo()">
                  <v-icon dark x-large>mdi-plus</v-icon>
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
          <v-container>
            <v-row
              v-for="(path, name) in videos"
              :key="name"
              class="video"
              align="center"
            >
              <v-col cols="3">
                <VideoPlayer
                  :src="'../videos/' + name"
                  :controls="false"
                ></VideoPlayer>
              </v-col>
              <v-col cols="8">
                <p>{{ name }}</p>
                <nuxt-link
                  v-slot="{ href, route, navigate }"
                  :to="{ name: 'erd', query: { video: name } }"
                >
                  <v-btn :href="href" color="primary" @click="navigate"
                    >Analyze</v-btn
                  >
                </nuxt-link>
              </v-col>
              <v-col cols="1">
                <v-btn
                  color="error"
                  fab
                  dark
                  x-small
                  @click="removeVideo(name)"
                >
                  <v-icon dark small>mdi-close</v-icon>
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
import VideoPlayer from '../components/VideoPlayer'

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videos: {},
      files: [],
    }
  },
  mounted() {
    if (localStorage.videos) {
      this.videos = JSON.parse(localStorage.videos)
    }
  },
  methods: {
    addVideo() {
      const newVideos = this.files.filter((value, index, array) => {
        return value.type.startsWith('video')
      })

      for (const video of newVideos) {
        if (!(video.name in this.videos)) {
          this.videos[video.name] = video.webkitRelativePath
        }
      }
      this.files = []
      localStorage.videos = JSON.stringify(this.videos)
    },
    removeVideo(name) {
      if (name in this.videos) {
        this.$delete(this.videos, name)
        localStorage.videos = JSON.stringify(this.videos)
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

#video-list video.video {
  width: 250px;
}
</style>
