<template>
  <v-container>
    <div class="headline">Participant {{ db_video.participant }}</div>
    <p>study: {{ db_video.study }}</p>
    <p>Session: {{ db_video.session }}</p>
    <p>Memory Type: {{ db_video.memory_type }}</p>
    <p>Memory Index: {{ db_video.memory_index }}</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      db_video: {}, // Todo
    }
  },
}
</script>
