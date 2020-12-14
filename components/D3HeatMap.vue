<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import aggregate_features from '~/apollo/aggregate_features'
import end_time from '~/apollo/end_time'

export default {
  props: {
    features: { type: Array, required: true },
  },
  data() {
    return {
      svg: null,
      cursorLine: null,
      cells: null,
      defs: null,
      y: null,
      x: null,
      yAxis: null,
      xAxis: null,
      cursorWidth: 5,
      endTime: 0,
      startTime: 0,
      resolution: 1,
      chartData: [],
      height: 500,
      width: 700,
      localCursor: 0,
    }
  },
  computed: {
    cursor() {
      return this.$store.state.cursor.position
    },
    featuresNames() {
      return this.features.map((feature) => feature.label)
    },
  },
  watch: {
    cursor(newPosition) {
      // Set new data (it must be an integer number)
      this.cursorLine.data([newPosition]).enter()
      // Update attribute
      this.cursorLine.attr('x', (d) => {
        return this.x(d)
      })
    },
    features() {
      this.updateChart()
    },
  },
  apollo: {
    aggregate_features: {
      // graphql query
      query: aggregate_features,
      variables() {
        return {
          duration: this.endTime,
        }
      },
      result({ data, loading, networkStatus }) {
        this.updateChart(data)
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
    end_time: {
      query: end_time,
      result({ data, loading, networkStatus }) {
        if (data) {
          this.endTime = Math.ceil(data.end_time.aggregate.max.timestamp)
        }
      },
      error(error) {
        this.error = JSON.stringify(error.message)
      },
    },
  },
  methods: {
    updateChart(data) {
      if (data?.aggregate_features) {
        this.chartData = this.longify(data.aggregate_features)
        this.drawChart()
      }
    },
    /**
     * Format data for the graph
     */
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
      d3.select('#chart').selectAll('*').remove()
      const margin = { top: 0, right: 0, bottom: 50, left: 50 }
      this.chartWidth = this.width - margin.left - margin.right
      this.chartHeight = this.height - margin.top - margin.bottom

      this.svg = d3.select('#chart').append('svg').attr('width', this.chartWidth).attr('height', this.chartHeight)
      const chartGroup = this.svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Clipping
      this.defs = chartGroup.append('defs')
      this.defs
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.chartWidth - margin.left - margin.right)
        .attr('height', this.chartHeight - margin.top - margin.bottom)
      this.defs
        .append('clipPath')
        .attr('id', 'clipx')
        .append('rect')
        .attr('x', 0)
        .attr('y', this.chartHeight - margin.top - margin.bottom)
        .attr('width', this.chartWidth - margin.left - margin.right)
        .attr('height', margin.bottom)
      this.defs
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
      this.x = d3.scaleBand().range([0, this.chartWidth]).domain(timeBins).padding(0.01)
      this.xAxis = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipx)')
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (this.chartHeight - margin.bottom) + ')')
        .call(d3.axisBottom(this.x).tickValues(tickValues).tickFormat(formatDuration))

      // Build Y scales and axis:
      this.y = d3
        .scaleBand()
        .range([this.chartHeight - margin.bottom - margin.top, 0])
        .domain(this.featuresNames)
        .padding(0.01)
      this.yAxis = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipy)')
        .append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(this.y))
      // Tooltip
      const tooltip = d3
        .select('#chart')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px')

      this.yAxis
        .selectAll('.tick')
        .style('cursor', 'pointer')
        .data(this.features)
        ._groups[0].forEach((d) => {
          d3.select(d)
            .on('mouseover', function (event, data) {
              tooltip.transition().duration(200).style('opacity', 0.9)
              tooltip
                .html(data.description)
                .style('left', event.layerX + 70 + 'px')
                .style('top', event.layerY + 'px')
                .style('opacity', 1)
            })
            .on('mouseleave', function (event, d) {
              tooltip.style('opacity', 0)
              d3.select(this).style('stroke', 'none').style('opacity', 0.8)
            })
        })
      // Build color scale
      const myColor = d3.scaleSequential().domain([0, 4]).interpolator(d3.interpolateInferno)
      const topicColor = d3.scaleOrdinal(d3.schemeCategory10)
      const successColor = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateRdYlGn)
      /**
       * Cursor
       */
      let deltaX
      function dragHandler(that) {
        function dragstarted(event) {
          that.$store.commit('cursor/SEEKING', true)

          deltaX = that.cursorLine.attr('x') - event.x
        }
        function dragged(event) {
          let newX = event.x + deltaX
          const maxValue = that.chartWidth - margin.left - margin.right
          if (newX < 0) newX = 0
          if (newX > maxValue) newX = maxValue

          const eachBand = that.x.step()
          const index = Math.round(newX / eachBand)
          const cursor = that.x.domain()[index]

          that.cursorLine.attr('x', newX)
          that.$store.commit('cursor/UPDATE_CURSOR_POSITION', cursor)
        }
        function dragended(event) {
          that.$store.commit('cursor/SEEKING', false)
          deltaX = 0
        }
        return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
      }

      // Zoom Handler
      function zoomHandler(that) {
        function zoomed(event) {
          const t = event.transform
          that.cells.attr('transform', t)
          that.cursorLine.attr('transform', t)

          that.xAxis.attr('transform', d3.zoomIdentity.translate(t.x, that.chartHeight - margin.bottom).scale(t.k))
          that.xAxis.selectAll('text').attr('transform', d3.zoomIdentity.scale(1 / t.k))
          that.xAxis.selectAll('line').attr('transform', d3.zoomIdentity.scale(1 / t.k))

          that.yAxis.attr('transform', d3.zoomIdentity.translate(0, t.y).scale(t.k))
          that.yAxis.selectAll('text').attr('transform', d3.zoomIdentity.scale(1 / t.k))
          that.yAxis.selectAll('line').attr('transform', d3.zoomIdentity.scale(1 / t.k))
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
      this.cells = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clip)')
        .selectAll('.cell')
        .data(this.chartData, (d) => '' + d.frame + ':' + d.variable)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('x', (d) => {
          return this.x(d.frame)
        })
        .attr('y', (d) => this.y(d.variable))
        .attr('width', this.x.bandwidth())
        .attr('height', this.y.bandwidth())
        .style('fill', (d) => {
          if (d.variable === 'topic') {
            return topicColor(d.value)
          } else if (d.variable === 'success') {
            return successColor(d.value)
          } else if (d.variable.endsWith('c')) {
            return myColor(d.value * 4)
          }
          return myColor(d.value)
        })
      this.cells.exit().remove()
      /**
       * Draw cursor
       */
      this.cursorLine = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clip)')
        .selectAll('.cursorline')
        .data([this.cursor]) // this doesn't give two way data binding
        .enter()
        .append('rect')
        .attr('class', 'cursorline')
        .attr('x', (d) => {
          return this.x(d)
        })
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
<style>
#chart {
  overscroll-behavior: contain;
}
</style>
