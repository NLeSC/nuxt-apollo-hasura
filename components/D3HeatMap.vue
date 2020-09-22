<template>
  <div>
    {{ cursor }} - {{ localCursor }}
    <div id="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import testaggau from '~/apollo/action_units'

export default {
  props: {
    cursor: { required: false, type: Number, default: 0 },
  },
  computed: {
    localCursor: {
      set() {},
      get() {
        return this.cursor
      },
    },
  },
  data() {
    return {
      svg: null,

      startTime: 0,
      endTime: 350,
      resolution: 1,
      chartData: [],
      myVars: [
        'au01r',
        'au01c',
        'au04r',
        'au04c',
        'au09r',
        'au09c',
        'au10r',
        'au10c',
        'au12r',
        'au12c',
        'au14r',
        'au14c',
      ],
      height: 500,
      width: 750,
    }
  },
  mounted() {
    this.$apollo.queries.testaggau.refetch().then((results) => {
      this.chartData = this.longify(results.data.testaggau)
      this.drawChart()
    })
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
  methods: {
    longify(rows) {
      const extracted = []
      rows.forEach((row) => {
        this.myVars.forEach((varr) => {
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
    //   this.myVars.forEach((varr) => {
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
      const margin = { top: 30, right: 100, bottom: 50, left: 50 }
      this.width = this.width - margin.left - margin.right
      this.height = this.height - margin.top - margin.bottom
      this.svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', this.width + margin.left + margin.right)
        .attr('height', this.height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      // Clipping
      this.svg
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
      this.svg.append('g').attr('class', 'x-axis').attr('clip-path', 'url(#clip)').call(xAxis)
      // Build Y scales and axis:
      const y = d3.scaleBand().range([this.height, 0]).domain(this.myVars).padding(0.01)
      const yAxis = (g) => g.call(d3.axisLeft(y))
      this.svg.append('g').attr('class', 'y-axis').call(yAxis)

      //
      // Cursor
      //

      // const onCursorChange = this.onCursorChange;

      const dragmove = (dragEvent) => {
        const eventX = dragEvent.x
        //      console.log("dragmove: " + x.invert(eventX));
        this.svg.selectAll('.cursorline').attr('x1', eventX).attr('x2', eventX)
        cursorGroup.attr('transform', 'translate(' + eventX + ',' + 0 + ')')

        /// CONTINUE HERE!!!!!!!
        this.localCursor = eventX

        this.$emit('onCursorUpdate', eventX)
        // onCursorChange(eventX)
      }

      // Group for main content
      const main = this.svg.append('g').attr('class', 'main').attr('clip-path', 'url(#clip)')
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
      this.svg.selectAll('.x-axis').call(xAxis)
      this.svg.selectAll('.y-axis').call(yAxis)
      const zoomed = ({ transform }) => {
        x.range([margin.left, this.width - margin.right].map((d) => transform.applyX(d)))
        this.svg
          .selectAll('.cell')
          .attr('x', (d) => x(d.frame))
          .attr('width', x.bandwidth())
        this.svg.selectAll('.x-axis').call(xAxis)
      }
      const zoom = d3.zoom().on('zoom', zoomed)
      this.svg.call(zoom)

      const cursorGroup = this.svg
        .append('g')
        .attr('class', 'cursor')
        .append('line')
        .attr('class', 'cursorline')
        .attr('x1', () => {
          return x(this.cursor)
        })
        .attr('y1', 0 - margin.top)
        .attr('x2', () => x(this.cursor))
        .attr('y2', this.height + margin.bottom)
        .attr('stroke', '#4ec0ff')
        .attr('stroke-width', 4)
        .call(d3.drag().on('drag', dragmove))
    },
  },
}
</script>
