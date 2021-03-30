<template>
  <v-row justify="end" class="pr-10">
    <v-col lg="1">
      <ExportButton title="Export To CSV"></ExportButton>
    </v-col>
  </v-row>
</template>
<script>
import ExportButton from './ExportButton.vue'
export default {
  components: { ExportButton },
}
</script>
