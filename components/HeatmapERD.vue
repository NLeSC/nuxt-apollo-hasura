<template>
  <div id="svg-container" ref="svgcontainer"></div>
</template>

<script>
import * as d3 from 'd3'
// import * as fc from 'd3fc'

export default {
  name: 'HeatmapERD',
  data() {
    return {}
  },
  mounted() {
    this.generateHeatmap()
  },
  methods: {
    generateHeatmap() {
      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 100, bottom: 30, left: 50 }
      const width = 1000 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3
        .select(this.$refs.svgcontainer)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Labels of row and columns
      const start_time = 0
      const end_time = 350
      let resolution = 10
      let myGroups = d3.range(start_time, end_time, resolution)
      const myVars = [
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
      ]

      // Build X scales and axis:
      const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01)
      const xAxis = (g) => g.attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x))
      svg.append('g').attr('class', 'x-axis').call(xAxis)

      // Build Y scales and axis:
      const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01)
      const yAxis = (g) => g.call(d3.axisLeft(y))
      svg.append('g').attr('class', 'y-axis').call(yAxis)

      // Group for main content
      const main = svg.append('g').attr('class', 'main')

      // Build color scale
      const myColor = d3.scaleSequential().domain([0, 4]).interpolator(d3.interpolateInferno)

      // Converts wide format data to long format
      const longify = (rows) => {
        const extracted = []
        rows.forEach((row) => {
          myVars.forEach((varr) => {
            extracted.push({ frame: row.min_timestamp, variable: varr, value: row[varr] })
          })
        })
        return extracted
      }

      const fetchData = () => {
        const body = JSON.stringify({
          query: `query MyQuery2 {
      testaggau(args: {start_time: ${start_time}, end_time: ${end_time}, resolution: ${resolution}}) {
        ${myVars.join(', ')}
        grouped_seconds
        min_timestamp
      }
  }`,
        })

        return fetch('http://localhost:4000/v1/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })
          .then((res) => res.json())
          .then((res) => {
            const data = longify(res.data.testaggau)

            const cells = main.selectAll('.cell').data(data, (d) => '' + d.frame + ':' + d.variable)
            cells.exit().remove()
            cells
              .enter()
              .append('rect')
              .attr('class', 'cell')
              .merge(cells)
              .attr('x', (d) => x(d.frame))
              .attr('y', (d) => y(d.variable))
              .attr('width', x.bandwidth())
              .attr('height', y.bandwidth())
              .style('fill', (d) => myColor(d.value))
            // .on("mouseover", handleMouseOver)
            // .on("mouseout", handleMouseOut);

            svg.selectAll('.x-axis').call(xAxis)
            svg.selectAll('.y-axis').call(yAxis)
          })
      }
      fetchData()

      function zoomed() {
        x.range([margin.left, width - margin.right].map((d) => d3.event.transform.applyX(d)))
        svg
          .selectAll('.cell')
          .attr('x', (d) => x(d.frame))
          .attr('width', x.bandwidth())
        svg.selectAll('.x-axis').call(xAxis)

        const k = d3.event.transform.k
        const new_resolution = Math.floor(10 / k)
        if (new_resolution !== resolution) {
          resolution = Math.max(new_resolution, 1)
          console.log(resolution)

          // Update groups used for x-axis
          myGroups = d3.range(start_time, end_time, resolution)
          x.domain(myGroups)

          // Update cells
          fetchData()
        }
      }

      const zoom = d3.zoom().on('zoom', zoomed)
      svg.call(zoom)

      // function handleMouseOver(d, i) {
      //   // Specify where to put label of text
      //   const node = svg.append('text').attrs({
      //     id: 'popup', // Create an id for text so we can select it later for removing on mouseout
      //     x: d3.event.pageX, // - document.getElementById('svg-container').getBoundingClientRect().x,
      //     y: d3.event.pageY, // - document.getElementById('svg-container').getBoundingClientRect().y
      //   })
      //   // console.log(node);
      //
      //   node.text(function () {
      //     return [d.value] // Value of the text
      //   })
      // }

      // function handleMouseOut(d, i) {
      //   d3.selectAll('#popup').remove()
      // }
    },
  },
}
</script>

<style scoped></style>
