<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="350px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on"> Export </v-btn>
      </template>
      <v-card>
        <v-row>
          <v-col lg="9">
            <v-card-title>Export Features</v-card-title>
          </v-col>
          <v-col lg="3">
            <v-btn color="blue darken-1" text @click="dialog = false"> X </v-btn>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-card-text style="height: 300px"> text here </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialogm1: '',
      dialog: false,
    }
  },
}
</script>
