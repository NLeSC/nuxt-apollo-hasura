<template>
  <div id="binaryLegendChart" ref="binaryLegendChart"></div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {},
  data() {
    return {
      svg: null,
      defs: null,
      y: null,
      x: null,
      yAxis: null,
      xAxis: null,
      height: 100,
      width: 100,
      margins: { top: 0, right: 0, bottom: 0, left: 0 },
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.width = this.$el.parentElement.clientWidth
      window.addEventListener('resize', this.onResize)
      this.updateChart()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    updateChart() {
      this.drawChart()
    },
    onResize() {
      this.$nextTick(() => {
        this.width = this.$el.parentElement.clientWidth
        this.updateChart()
      })
    },
    drawChart() {
      // remove old chart if its there
      d3.select('#binaryLegendChart').selectAll('*').remove()

      this.chartWidth = this.width - this.margins.left - this.margins.right
      this.chartHeight = this.height - this.margins.top - this.margins.bottom

      this.svg = d3.select('#binaryLegendChart').append('svg').attr('width', this.width).attr('height', this.height)

      const chartGroup = this.svg
        .append('g')
        .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')')

      this.silenceLegend = chartGroup.append('g').attr('class', 'binaryGroup').attr('transform', 'translate(0, 20)')
      this.drawBinaryLegend(this.silenceLegend, 'silence', d3.schemeSet1, 6)
    },

    drawBinaryLegend(d3Group, descriptor, ordinalColorscheme) {
      const binaryColor = d3.scaleOrdinal(ordinalColorscheme)
      const ordinal_size = 10
      const x_offset = 10
      const y_offset = 20

      d3Group
        .append('text')
        .attr('class', 'binaryLegendHeader')
        .attr('x', 0)
        .attr('y', 0)
        .text(descriptor)
        .attr('text-anchor', 'left')
        .attr('font-size', '10px')
        .style('alignment-baseline', 'middle')

      d3Group
        .append('circle')
        .attr('class', 'binarySymbol')
        .attr('r', ordinal_size / 2)
        .attr('cx', x_offset)
        .attr('cy', y_offset)
        .style('fill', function (d) {
          return binaryColor(0)
        })

      d3Group
        .append('text')
        .attr('class', 'binaryDescription')
        .attr('x', x_offset + ordinal_size)
        .attr('y', y_offset)
        .text('false')
        .attr('text-anchor', 'left')
        .attr('font-size', '10px')
        .style('alignment-baseline', 'middle')

      d3Group
        .append('circle')
        .attr('class', 'binarySymbol')
        .attr('r', ordinal_size / 2)
        .attr('cx', x_offset)
        .attr('cy', y_offset + (ordinal_size + 5))
        .style('fill', function (d) {
          return binaryColor(1)
        })

      d3Group
        .append('text')
        .attr('class', 'binaryDescription')
        .attr('x', x_offset + ordinal_size)
        .attr('y', y_offset + (ordinal_size + 5))
        .text('true')
        .attr('text-anchor', 'left')
        .attr('font-size', '10px')
        .style('alignment-baseline', 'middle')
    },
  },
}
</script>

<style></style>
