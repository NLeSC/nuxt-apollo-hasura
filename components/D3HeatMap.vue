<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import aggregate_features from '~/apollo/aggregate_features'

export default {
  props: {
    features: { type: Array, required: true },
    cursor: { required: false, type: Number, default: 0 },
  },
  data() {
    return {
      svg: null,
      cursorWidth: 5,
      startTime: 0,
      endTime: 420,
      resolution: 1,
      chartData: [],
      height: 500,
      width: 700,
    }
  },
  computed: {
    featuresNames() {
      return this.features.map((feature) => feature.label)
    },
    localCursor: {
      set() {},
      get() {
        return this.cursor
      },
    },
  },
  watch: {
    features: {
      handler(newval, oldval) {
        this.updateChart()
      },
    },
  },
  apollo: {
    aggregate_features: {
      // graphql query
      query: aggregate_features,
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  methods: {
    updateChart() {
      this.$apollo.queries.aggregate_features.refetch().then((results) => {
        this.chartData = this.longify(results.data.aggregate_features)
        this.drawChart()
      })
    },
    longify(rows) {
      const extracted = []
      rows.forEach((row) => {
        this.features.forEach((varr) => {
          extracted.push({
            frame: row.min_timestamp,
            variable: varr.label,
            value: row[varr.label],
          })
        })
      })
      return extracted
    },
    drawChart() {
      // remove old chart if its there
      d3.select('#chart > *').remove()

      const margin = { top: 0, right: 0, bottom: 50, left: 50 }
      this.chartWidth = this.width - margin.left - margin.right
      this.chartHeight = this.height - margin.top - margin.bottom

      this.svg = d3.select('#chart').append('svg').attr('width', this.chartWidth).attr('height', this.chartHeight)
      const chartGroup = this.svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Clipping
      const defs = chartGroup.append('defs')
      defs
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.chartWidth - margin.left - margin.right)
        .attr('height', this.chartHeight - margin.top - margin.bottom)

      defs
        .append('clipPath')
        .attr('id', 'clipx')
        .append('rect')
        .attr('x', 0)
        .attr('y', this.chartHeight - margin.top - margin.bottom)
        .attr('width', this.chartWidth - margin.left - margin.right)
        .attr('height', margin.bottom)

      defs
        .append('clipPath')
        .attr('id', 'clipy')
        .append('rect')
        .attr('x', -margin.left)
        .attr('y', 0)
        .attr('width', margin.left + 1)
        .attr('height', this.chartHeight - margin.top - margin.bottom)

      // Labels for row & column
      const timeBins = d3.range(this.startTime, this.endTime, 1)
      const tickValues = d3.range(this.startTime, this.endTime, 30)
      const formatDuration = (d) => new Date(1000 * d).toISOString().substr(14, 5)

      // Build X scales and axis:
      const x = d3.scaleBand().range([0, this.chartWidth]).domain(timeBins).padding(0.01)
      const xAxis = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipx)')
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (this.chartHeight - margin.bottom) + ')')
        .call(d3.axisBottom(x).tickValues(tickValues).tickFormat(formatDuration))

      // Build Y scales and axis:
      const y = d3
        .scaleBand()
        .range([this.chartHeight - margin.bottom - margin.top, 0])
        .domain(this.featuresNames)
        .padding(0.01)
      const yAxis = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipy)')
        .append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))

      // Build color scale
      const myColor = d3.scaleSequential().domain([0, 4]).interpolator(d3.interpolateInferno)

      // Cursor
      let deltaX

      function dragHandler(that) {
        function dragstarted(event) {
          deltaX = cursorLine.attr('x') - event.x
        }

        function dragged(event) {
          let newX = event.x + deltaX
          const maxValue = that.chartWidth - margin.left - margin.right

          if (newX < 0) newX = 0
          if (newX > maxValue) newX = maxValue

          const eachBand = x.step()
          const index = Math.round(newX / eachBand)
          const cursor = x.domain()[index]

          cursorLine.attr('x', newX)
          that.$emit('onCursorUpdate', cursor)
        }

        function dragended(event) {
          deltaX = 0
        }

        return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
      }

      // Zoom Handler
      function zoomHandler(that) {
        function zoomed(event) {
          const t = event.transform
          cells.attr('transform', t)
          cursorLine.attr('transform', t)

          xAxis.attr('transform', d3.zoomIdentity.translate(t.x, that.chartHeight - margin.bottom).scale(t.k))
          xAxis.selectAll('text').attr('transform', d3.zoomIdentity.scale(1 / t.k))
          xAxis.selectAll('line').attr('transform', d3.zoomIdentity.scale(1 / t.k))

          yAxis.attr('transform', d3.zoomIdentity.translate(0, t.y).scale(t.k))
          yAxis.selectAll('text').attr('transform', d3.zoomIdentity.scale(1 / t.k))
          yAxis.selectAll('line').attr('transform', d3.zoomIdentity.scale(1 / t.k))
        }

        return d3
          .zoom()
          .scaleExtent([1, 20])
          .translateExtent([
            [0, 0],
            [that.chartWidth, that.chartHeight],
          ])
          .extent([
            [0, 0],
            [that.chartWidth, that.chartHeight],
          ])
          .on('zoom', zoomed)
      }

      // Group for main content
      const cells = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clip)')
        .selectAll('.cell')
        .data(this.chartData, (d) => '' + d.frame + ':' + d.variable)
        .enter()
        .append('rect')
        .attr('class', 'cell')
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
      cells.exit().remove()

      const cursorLineGroup = chartGroup.append('g').attr('clip-path', 'url(#clip)')

      const cursorLine = cursorLineGroup
        .selectAll('.cursorline')
        .data([this.cursor])
        .enter()
        .append('rect')
        .attr('class', 'cursorline')
        .attr('x', (d) => x(d) - this.cursorWidth / 2)
        .attr('y', 0)
        .attr('width', this.cursorWidth)
        .attr('height', this.chartHeight - margin.bottom)
        .attr('fill', '#4EC0FF')
        .call(dragHandler(this))

      this.svg.call(zoomHandler(this))
    },
  },
}
</script>
