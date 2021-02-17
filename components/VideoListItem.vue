<template>
  <v-row>
    <v-col cols="3">
      <transition name="fade">
        <video v-if="video.src" :src="video.src" width="100%" height="140" controls></video>
      </transition>
    </v-col>
    <v-col cols="8">
      <div>{{ video.name }}</div>
      <div class="caption grey--text">Sha256: {{ video.hash }}</div>
      <div class="caption grey--text">src: {{ video.src }}</div>
      <div>
        <!--              There is no data on the server about this video:-->
        <nuxt-link :to="{ name: 'erd', query: { video: video.id } }">
          <v-btn color="primary">Analyze</v-btn>
        </nuxt-link>
      </div>
    </v-col>
    <v-col cols="1">
      <v-btn icon color="#aaa" @click="$emit('removeVideo')">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mdiClose } from '@mdi/js'
export default {
  name: 'VideoListItem',
  props: {
    video: {},
  },
  data() {
    return {
      mdiClose,
    }
  },
}
</script>

<style>
video.video {
  width: 100%;
}

video {
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
