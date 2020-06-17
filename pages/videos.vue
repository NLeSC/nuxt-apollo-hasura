<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card max-width="700" width="100%" class="mt-4" outlined>
      <v-card-title class="headline">
        Videos
      </v-card-title>
      <input type="file" id="videodir" webkitdirectory directory multiple/>
    </v-card>
  </div>
</template>
<script>
export default {
}
</script>