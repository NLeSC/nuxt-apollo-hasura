<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="goBack">Back</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div id="erd">
          <VideoPlayer :src="'../videos/' + video"></VideoPlayer>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from '~/components/VideoPlayer'

export default {
  name: 'Erd',
  components: {
    VideoPlayer,
  },
  data() {
    return {
      video: '',
    }
  },
  created() {
    if (this.$route.query.video) {
      this.video = this.$route.query.video
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
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
