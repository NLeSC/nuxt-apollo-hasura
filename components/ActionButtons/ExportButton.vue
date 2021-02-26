<template>
  <div>
    <v-dialog v-model="exportScreen" scrollable max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on"> {{ title }} </v-btn>
      </template>
      <v-card>
        <v-row align="center">
          <v-col sm="10">
            <v-card-title>Export Features</v-card-title>
          </v-col>
          <v-col sm="2">
            <v-btn color="blue darken-1" text @click="exportScreen = false"> X </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-title class="pb-0">Aggregates to export for each topic (select multiple):</v-card-title>
        <v-list class="d-flex">
          <div v-for="(column, index) in columns" :key="index" class="col">
            <v-list-item v-for="(item, id) in column" :key="id">
              <v-checkbox v-model="selected" :label="item" :value="item"></v-checkbox>
            </v-list-item>
          </div>
        </v-list>
        <v-divider></v-divider>
        <v-card-title class="pb-0">Options for duration, occurrence and frequency:</v-card-title>
        <v-container fluid>
          <v-row class="pl-5">
            <v-col sm="4">
              <v-text-field v-model="threshold" label="Threshold" clearable placeholder="Enter value here" />
            </v-col>
            <v-col sm="4">
              <v-text-field
                v-model="minimumDuration"
                label="Minimum duration"
                clearable
                placeholder="Enter value here"
              />
            </v-col>
            <v-col sm="4">
              <v-btn @click="exportToCSV">Export To CSV</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ExportButton',
  props: {
    title: { type: String, default: () => '' },
  },
  data() {
    return {
      exportOptions: [
        'Mean',
        'Standard deviation',
        'Z-score',
        'Duration',
        'Relative duration',
        'Occurrence count',
        'Frequency (relative occurrence)',
      ],
      selected: [],
      exportScreen: false,
      cols: 2,
      minimumDuration: '',
      threshold: '',
    }
  },
  computed: {
    columns() {
      const columns = []
      const mid = Math.ceil(this.exportOptions.length / this.cols)
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.exportOptions.slice(col * mid, col * mid + mid))
      }
      return columns
    },
  },
  methods: {
    exportToCSV() {
      console.log('Selected Options', this.selected, this.minimumDuration, this.threshold)
    },
  },
}
</script>
