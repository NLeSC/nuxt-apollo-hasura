<template>
  <div id="gradientLegendChart" ref="gradientLegendChart"></div>
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
      height: 200,
      width: 200,
      margins: { top: 0, right: 20, bottom: 0, left: 10 },
      barHeight: 10,
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
      d3.select('#gradientLegendChart').selectAll('*').remove()

      this.chartWidth = this.width - this.margins.left - this.margins.right
      this.chartHeight = this.height - this.margins.top - this.margins.bottom

      this.svg = d3.select('#gradientLegendChart').append('svg').attr('width', this.width).attr('height', this.height)

      const chartGroup = this.svg
        .append('g')
        .attr('transform', 'translate(' + this.margins.left + ',' + this.margins.top + ')')

      this.heatmapLegend = chartGroup
        .append('g')
        .attr('class', 'topicGroup')
        .attr('transform', 'translate(0, ' + this.barHeight * 2 + ')')
      this.drawGradientLegend(this.heatmapLegend, 'features', [0, 5], d3.interpolateInferno, 6)

      this.pitchLegend = chartGroup
        .append('g')
        .attr('class', 'topicGroup')
        .attr('transform', 'translate(0, ' + this.barHeight * 7 + ')')
      this.drawGradientLegend(this.pitchLegend, 'pitch', [0, 255], d3.interpolateViridis, 6)

      this.intensityLegend = chartGroup
        .append('g')
        .attr('class', 'topicGroup')
        .attr('transform', 'translate(0, ' + this.barHeight * 12 + ')')
      this.drawGradientLegend(this.intensityLegend, 'intensity', [0, 100], d3.interpolatePlasma, 6)

      this.silenceLegend = chartGroup
        .append('g')
        .attr('class', 'topicGroup')
        .attr('transform', 'translate(0, ' + this.barHeight * 17 + ')')
      this.drawGradientLegend(this.silenceLegend, 'silence', [0, 1], d3.interpolateRdYlGn, 6)
    },

    drawGradientLegend(d3Group, descriptor, extent, interpolator, ticks) {
      const colorScale = d3.scaleSequential().domain(extent).interpolator(interpolator)

      const yScale = d3.scaleLinear().range([0, this.chartWidth]).domain(extent)
      const yAxis = d3.axisBottom(yScale).tickSize(this.barHeight).ticks(ticks)

      const defs = d3Group.append('defs')
      const linearGradient = defs.append('linearGradient').attr('id', 'linear-gradient-' + descriptor + '')

      linearGradient
        .selectAll('stop')
        .data(colorScale.ticks().map((t, i, n) => ({ offset: `${(100 * i) / n.length}%`, color: colorScale(t) })))
        .enter()
        .append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color)

      d3Group
        .append('text')
        .attr('class', 'gradientDescription')
        .attr('x', 0)
        .attr('y', -this.barHeight)
        .text(descriptor)
        .attr('text-anchor', 'left')
        .attr('font-size', '10px')
        .style('alignment-baseline', 'middle')

      d3Group
        .append('rect')
        .attr('width', this.chartWidth)
        .attr('height', this.barHeight)
        .style('fill', 'url(#linear-gradient-' + descriptor + ')')

      d3Group.append('g').attr('class', `x-axis`).attr('transform', `translate(0,${this.barHeight})`).call(yAxis)
    },
  },
}
</script>

<style></style>
