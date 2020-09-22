<template>
  <div id="chart"></div>
</template>

<script>
import * as d3 from 'd3'
import testaggau from '~/apollo/action_units'

export default {
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      startTime: 0,
      endTime: 350,
      resolution: 1,
      chartData: [],
      height: 700,
      width: 900,
    }
  },
  watch: {
    features: {
      handler(newval, oldval) {
        this.updateChart()
      },
    },
  },
  mounted() {
    this.margin = { top: 30, right: 100, bottom: 50, left: 50 }
    this.width = this.width - this.margin.left - this.margin.right
    this.height = this.height - this.margin.top - this.margin.bottom

    this.updateChart()
  },
  methods: {
    updateChart() {
      this.$apollo.queries.testaggau.refetch().then((results) => {
        this.chartData = this.longify(results.data.testaggau)
        this.drawChart()
      })
    },
    longify(rows) {
      const extracted = []
      rows.forEach((row) => {
        this.features.forEach((varr) => {
          extracted.push({
            frame: row.min_timestamp,
            variable: varr,
            value: row[varr],
          })
        })
      })
      return extracted
    },
    // getTestaggau() {
    //   const extracted = []
    //   this.features.forEach((varr) => {
    //     const data = []
    //     this.testaggau.forEach((row) => {
    //       data.push({
    //         x: row.min_timestamp,
    //         y: row[varr],
    //       })
    //     })
    //     extracted.push({
    //       name: varr,
    //       data,
    //     })
    //   })
    //   return extracted
    // },
    drawChart() {
      // remove old chart if its there
      d3.select('#chart > *').remove()

      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      // Clipping
      svg
        .append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.width)
        .attr('height', this.height)

      // Labels for row & column
      const myGroups = d3.range(this.startTime, this.endTime, 1)
      const tickValues = d3.range(this.startTime, this.endTime, 30)
      const formatDuration = (d) => new Date(1000 * d).toISOString().substr(14, 5)
      // Build X scales and axis:
      const x = d3.scaleBand().range([0, this.width]).domain(myGroups).padding(0.01)
      const xAxis = (g) =>
        g
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(formatDuration))
      svg.append('g').attr('class', 'x-axis').attr('clip-path', 'url(#clip)').call(xAxis)
      // Build Y scales and axis:
      const y = d3.scaleBand().range([this.height, 0]).domain(this.features).padding(0.01)
      const yAxis = (g) => g.call(d3.axisLeft(y))
      svg.append('g').attr('class', 'y-axis').call(yAxis)

      //
      // Cursor
      //
      const cursor = this.cursor
      const height = 580 // todo get it dynamic
      // const onCursorChange = this.onCursorChange;
      const cursorGroup = svg
        .append('g')
        .attr('class', 'cursor')
        .append('line')
        .attr('class', 'cursorline')
        .attr('x1', () => {
          console.log(cursor)
          return x(cursor)
        })
        .attr('y1', 0 - this.margin.top)
        .attr('x2', () => x(cursor))
        .attr('y2', height + this.margin.bottom)
        .attr('stroke', '#4ec0ff')
        .attr('stroke-width', 4)
        .call(d3.drag().on('drag', dragmove))

      function dragmove(dragEvent) {
        const eventX = dragEvent.x
        //      console.log("dragmove: " + x.invert(eventX));
        svg.selectAll('.cursorline').attr('x1', eventX).attr('x2', eventX)
        cursorGroup.attr('transform', 'translate(' + eventX + ',' + 0 + ')')

        /// CONTINUE HERE!!!!!!!
        console.log('🎹', eventX)
        // onCursorChange(eventX)
      }

      // Group for main content
      const main = svg.append('g').attr('class', 'main').attr('clip-path', 'url(#clip)')
      // Build color scale
      const myColor = d3.scaleSequential().domain([0, 4]).interpolator(d3.interpolateInferno)
      const cells = main.selectAll('.cell').data(this.chartData, (d) => '' + d.frame + ':' + d.variable)
      cells.exit().remove()
      cells
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .merge(cells)
        .attr('x', (d) => {
          return x(d.frame)
        })
        .attr('y', (d) => y(d.variable))
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', (d) => {
          if (d.variable.endsWith('c')) {
            return myColor(d.value * 4)
          }
          return myColor(d.value)
        })
      svg.selectAll('.x-axis').call(xAxis)
      svg.selectAll('.y-axis').call(yAxis)
      const zoomed = ({ transform }) => {
        x.range([this.margin.left, this.width - this.margin.right].map((d) => transform.applyX(d)))
        svg
          .selectAll('.cell')
          .attr('x', (d) => x(d.frame))
          .attr('width', x.bandwidth())
        svg.selectAll('.x-axis').call(xAxis)
      }
      const zoom = d3.zoom().on('zoom', zoomed)
      svg.call(zoom)
    },
  },

  apollo: {
    testaggau: {
      // graphql query
      query: testaggau,
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
}
</script>
