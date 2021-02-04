<template>
  <div>
    <v-row>
      <v-col cols="3">
        <video :src="video.src" width="100%" height="auto" controls></video>
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
  </div>
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
