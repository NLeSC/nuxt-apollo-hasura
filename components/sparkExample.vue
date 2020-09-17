<template>
  <v-container fill-height grid-list-xs>
    <v-layout row wrap fill-height>
      <v-flex xs11 sm2 d-flex align-center justify-center>
        <v-btn slot="activator" @click="updateData"> Update</v-btn>
      </v-flex>

      <v-flex xs12 sm10 fill-height>
        <svg id="visualization"></svg>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SparkExample',
  data() {
    return {
      dataModel: [
        { x: 1, y: 5 },
        { x: 20, y: 20 },
        { x: 40, y: 10 },
        { x: 60, y: 40 },
        { x: 80, y: 5 },
        { x: 100, y: 60 },
      ],
    }
  },
  watch: {
    dataModel(data) {
      this.drawSVG()
    },
  },
  mounted() {
    this.drawSVG()
  },
  methods: {
    updateData() {
      this.dataModel = this.dataModel.map((item) => {
        item.x = Math.floor(Math.random() * 60)
        item.y = Math.floor(Math.random() * 60)
        return item
      })
    },
    drawSVG() {
      const element = document.getElementById('visualization')

      if ($(element).children()) {
        console.log('re-drawing')
        $(element).empty()
      }

      const lineData = this.dataModel
      const vis = d3.select('#visualization')
      const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50,
      }
      const width = Math.max($(element).width(), 400) - margin.left - margin.right
      const height = $(element).height() - margin.top - margin.bottom

      const xRange = d3
        .scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([
          d3.min(lineData, function (d) {
            return d.x
          }),
          d3.max(lineData, function (d) {
            return d.x
          }),
        ])

      const yRange = d3
        .scaleLinear()
        .range([height - margin.top, margin.bottom])
        .domain([
          d3.min(lineData, function (d) {
            return d.y
          }),
          d3.max(lineData, function (d) {
            return d.y
          }),
        ])

      let xAxis = d3.axisBottom(xRange) // .tickSize(1).tickSubdivide(true)

      let yAxis = d3.axisLeft(yRange) // .tickSize(1).orient('left').tickSubdivide(true)

      vis
        .append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
        .call(xAxis)

      xAxis = d3.axisBottom(xRange) // .tickSize(1).tickSubdivide(true)

      yAxis = d3.axisLeft(yRange) // .tickSize(1).orient('left').tickSubdivide(true)

      vis
        .append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
        .call(xAxis)

      vis
        .append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ',0)')
        .call(yAxis)

      const lineFunc = d3
        .line()
        .x(function (d) {
          return xRange(d.x)
        })
        .y(function (d) {
          return yRange(d.y)
        })
      // .interpolate('basis')

      vis
        .append('svg:path')
        .attr('d', lineFunc(lineData))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
    },
  },
}
</script>

<style scoped>
#app {
  min-height: 350px;
  width: 100%;
}

#visualization {
  width: 100%;
  height: 98%;
}
</style>
