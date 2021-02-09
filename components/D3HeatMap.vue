<template>
  <div ref="heatmapContainer">
    <div id="heatmapChart" ref="heatmapChart"></div>
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
      yAxisGroup: null,
      xAxisGroup: null,
      cursorWidth: 5,
      endTime: 0,
      startTime: 0,
      resolution: 1,
      chartData: [],
      height: 500,
      width: 1000,
      margins: { top: 0, right: 50, bottom: 50, left: 50 },
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
        return this.xScale(d)
      })
    },
    features() {
      this.$apollo.queries.aggregate_features.refetch()
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
        if (data) {
          this.chartData = this.longify(data.aggregate_features)
          this.updateChart()
        }
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
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight

      this.drawChart()
    },
    updateChart() {
      if (this.chartData && this.chartData.length > 0) {
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
      d3.select('#heatmapChart').selectAll('*').remove()
      this.chartWidth = this.width - this.margins.left - this.margins.right
      this.chartHeight = this.height - this.margins.top - this.margins.bottom

      this.svg = d3
        .select('#heatmapChart')
        .append('svg')
        .attr('width', this.chartWidth)
        .attr('height', this.chartHeight)
      const chartGroup = this.svg
        .append('g')
        .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')')

      // Clipping
      this.defs = chartGroup.append('defs')
      this.defs
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.chartWidth)
        .attr('height', this.chartHeight)
      this.defs
        .append('clipPath')
        .attr('id', 'clipx')
        .append('rect')
        .attr('x', 0)
        .attr('y', this.chartHeight)
        .attr('width', this.chartWidth)
        .attr('height', this.margins.bottom)
      this.defs
        .append('clipPath')
        .attr('id', 'clipy')
        .append('rect')
        .attr('x', -this.margins.left)
        .attr('y', 0)
        .attr('width', this.margins.left + 1)
        .attr('height', this.chartHeight)

      // Labels for row & column
      const timeBins = d3.range(this.startTime, this.endTime, 1)
      const tickValues = d3.range(this.startTime, this.endTime, 30)
      const formatDuration = (d) => new Date(1000 * d).toISOString().substr(14, 5)

      // Build X scales and axis:
      this.xScale = d3.scaleBand().range([0, this.chartWidth]).domain(timeBins).padding(0.01)
      this.xAxis = d3.axisBottom(this.xScale).tickValues(tickValues).tickFormat(formatDuration)
      this.xAxisGroup = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipx)')
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (this.chartHeight - this.margins.bottom) + ')')
        .call(this.xAxis)

      // Build Y scales and axis:
      this.yScale = d3
        .scaleBand()
        .range([this.chartHeight - this.margins.bottom - this.margins.top, 0])
        .domain(this.featuresNames)
        .padding(0.01)
      this.yAxis = d3.axisLeft(this.yScale)
      this.yAxisGroup = chartGroup
        .append('g')
        .attr('clip-path', 'url(#clipy)')
        .append('g')
        .attr('class', 'axis axis--y')
        .call(this.yAxis)

      // Tooltip
      const tooltip = d3
        .select('#heatmapChart')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px')

      this.yAxisGroup
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

      this.drawCells(chartGroup)

      /**
       * Cursor
       */
      let initialX
      function dragHandler(that) {
        function dragstarted(event) {
          d3.select(this).raise()

          that.$store.commit('cursor/SEEKING', true)
          initialX = that.cursorLine.attr('x') - event.x
        }

        function dragged(event) {
          let newX = initialX + event.x
          const maxValue = that.chartWidth
          if (newX < 0) newX = 0
          if (newX > maxValue) newX = maxValue

          const eachBand = that.xScale.step()
          const index = Math.floor(newX / eachBand)
          const cursor = that.xScale.domain()[index]

          d3.select(this).attr('x', newX)
          that.$store.commit('cursor/UPDATE_CURSOR_POSITION', cursor)
        }

        function dragended(event) {
          that.$store.commit('cursor/SEEKING', false)
        }
        return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
      }

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
          return this.xScale(d)
        })
        .attr('y', 0)
        .attr('width', this.cursorWidth)
        .attr('height', this.chartHeight - this.margins.bottom)
        .attr('fill', '#4EC0FF')
        .call(dragHandler(this))

      function zoom(that) {
        const extent = [
          [0, 0],
          [that.chartWidth, that.chartHeight],
        ]

        function zoomed(event) {
          that.xScale.range([0, that.chartWidth].map((d) => event.transform.applyX(d)))
          that.cells.attr('x', (d) => that.xScale(d.frame)).attr('width', that.xScale.bandwidth())
          that.cursorLine.attr('transform', event.transform)
          that.xAxisGroup.call(that.xAxis)
        }

        that.svg.call(d3.zoom().scaleExtent([1, 20]).translateExtent(extent).extent(extent).on('zoom', zoomed))
      }

      this.svg.call(zoom(this))
    },
    drawCells(chartGroup) {
      // Build color scale
      const myColor = d3.scaleSequential().domain([0, 5]).interpolator(d3.interpolateInferno)
      const topicColor = d3.scaleOrdinal(d3.schemeCategory10)
      const successColor = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateRdYlGn)
      const pitchColor = d3.scaleSequential().domain([0, 255]).interpolator(d3.interpolateViridis)
      const intensityColor = d3.scaleSequential().domain([0, 100]).interpolator(d3.interpolatePlasma)
      const silenceColor = d3.scaleOrdinal(d3.schemeSet1)

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
          return this.xScale(d.frame)
        })
        .attr('y', (d) => this.yScale(d.variable))
        .attr('width', this.xScale.bandwidth())
        .attr('height', this.yScale.bandwidth())
        .style('fill', (d) => {
          if (d.variable === 'topic') {
            return topicColor(d.value)
          } else if (d.variable === 'success') {
            return successColor(d.value)
          } else if (d.variable.endsWith('c')) {
            return myColor(d.value * 4)
          } else if (d.variable === 'pitch') {
            return pitchColor(d.value)
          } else if (d.variable === 'intensity') {
            return intensityColor(d.value)
          } else if (d.variable === 'silence') {
            return silenceColor(d.value)
          }
          return myColor(d.value)
        })
      this.cells.exit().remove()
    },
  },
}
</script>

<style>
#heatmapChart {
  overscroll-behavior: contain;
}
</style>
