<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card max-width="700" width="100%" class="mt-4" outlined>
      <v-card-title class="headline">
        Videos
      </v-card-title>
    <input type="file" id="videodir" v-on:change="filesChanged($event.target.name, $event.target.files);" webkitdirectory directory multiple  />
    <div v-for="video in videos">
      {{video}}
    </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videos: [],
    }
  },
  methods: {
    filesChanged(name, files) {
      for (const file of files) {
          if (file.type.startsWith('video')) {
            this.videos.push(file.name)
          }
      }
    }
  }
}
</script>