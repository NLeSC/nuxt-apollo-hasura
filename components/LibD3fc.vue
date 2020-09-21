<template>
  <div>
    <h1>Chart</h1>
    <!--    <d3fc-svg use-device-pixel-ratio></d3fc-svg>-->
    <!-- Create a div where the graph will take place -->
    <div ref="my_dataviz"></div>

    <div ref="dataviz_basicZoom"></div>

    <div id="chart"></div>
    <div id="arc"></div>
    <!--    <div id="my_dataviz"></div>-->
    <hr />
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as fc from 'd3fc'
// import { event as currentEvent } from 'd3'

export default {
  name: 'LibD3fc',
  data() {
    return {
      gdp: [
        { country: 'USA', value: 20.5 },
        { country: 'China', value: 13.4 },
        { country: 'Germany', value: 4.0 },
        { country: 'Japan', value: 4.9 },
        { country: 'France', value: 2.8 },
      ],
    }
  },
  mounted() {
    // append the svg object to the body of the page
    const svg = d3
      .select(this.$refs.dataviz_basicZoom)
      .append('svg')
      .attr('width', 460)
      .attr('height', 460)
      .call(
        d3.zoom().on('zoom', function () {
          svg.attr('transform', d3.event.transform)
        })
      )
      .append('g')

    svg.append('circle').attr('cx', 300).attr('cy', 300).attr('r', 40).style('fill', '#68b2a1')

    this.generateArc()
    this.generateLines()
    this.generateDiamondData()
  },
  methods: {
    generateDiamondData() {
      // https://raw.githubusercontent.com/d3fc/d3fc/master/examples/diamonds/diamond-data.tsv
      d3.tsv('https://raw.githubusercontent.com/d3fc/d3fc/master/examples/diamonds/diamond-data.tsv', (d) => ({
        carat: Number(d.carat),
        price: Number(d.price),
      })).then((data) => {
        const xExtent = fc.extentLinear().accessors([(d) => d.carat])
        const yExtent = fc.extentLinear().accessors([(d) => d.price])

        const xScale = d3.scaleLog().domain(xExtent(data))
        const xScaleCopy = xScale.copy()
        const yScale = d3.scaleLog().domain(yExtent(data))
        const yScaleCopy = yScale.copy()

        const zoom = d3.zoom().on('zoom', () => {
          console.log('🎹')
          xScale.domain(d3.event.transform.rescaleX(xScaleCopy).domain())
          yScale.domain(d3.event.transform.rescaleY(yScaleCopy).domain())
          render()
        })

        const gridlines = fc.annotationSvgGridline()

        const pointSeries = fc
          .seriesWebglPoint()
          .crossValue((d) => d.carat)
          .mainValue((d) => d.price)
          .size((d) => Math.pow(Math.max(2, xScaleCopy(d.carat + 0.01) - xScaleCopy(d.carat)), 2))
          .type(d3.symbolSquare)
          .defined(() => true)
          .equals((d) => d.length)
          .decorate((program) => {
            fc.webglFillColor([60 / 255, 180 / 255, 240 / 255, 1.0])(program)

            program.fragmentShader().appendBody(`
                if (gl_PointCoord.y > 0.6 || gl_PointCoord.y < 0.4) {
                    discard;
                }
            `)

            const gl = program.context()
            gl.clearColor(1.0, 1.0, 1.0, 0.0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.enable(gl.BLEND)
            gl.blendColor(0.0, 0.0, 0.0, 1.0)
            gl.blendFuncSeparate(gl.DST_COLOR, gl.ZERO, gl.CONSTANT_ALPHA, gl.ZERO)
          })

        const chart = fc
          .chartCartesian(xScale, yScale)
          .svgPlotArea(gridlines)
          .webglPlotArea(pointSeries)
          .yOrient('left')
          .xLabel('Carats →')
          .yLabel('↑ Price $')
          .xTickFormat(d3.format('.1f'))
          .yTickFormat(d3.format('.1s'))
          .decorate((selection) => {
            selection
              .enter()
              .select('.webgl-plot-area')
              .raise()
              .on('measure.range', () => {
                xScaleCopy.range([0, d3.event.detail.width])
                yScaleCopy.range([d3.event.detail.height, 0])
              })
              .call(zoom)
          })

        function render() {
          d3.select('#chart').datum(data).call(chart)
        }

        render()
      })
    },
    generateArc() {
      const w = 400
      const h = 400

      const svg = d3.select('#arc').append('svg').attr('width', w).attr('height', h)

      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1))
      const color = d3.scaleOrdinal(d3.schemeDark2)

      const max_gdp = d3.max(sortedGDP, (o) => o.value)

      const angleScale = d3
        .scaleLinear()
        .domain([0, max_gdp])
        .range([0, 1.5 * Math.PI])

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 25)
        .outerRadius((d, i) => (i + 2) * 25)
        .startAngle(angleScale(0))
        .endAngle((d) => angleScale(d.value))

      const g = svg.append('g')

      g.selectAll('path')
        .data(sortedGDP)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .attr('stroke', '#FFF')
        .attr('stroke-width', '1px')
        .on('mouseenter', function () {
          d3.select(this).transition().duration(200).attr('opacity', 0.5)
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('opacity', 1)
        })

      g.selectAll('text')
        .data(this.gdp)
        .enter()
        .append('text')
        .text((d) => `${d.country} -  ${d.value} Trillion`)
        .attr('x', -150)
        .attr('dy', -8)
        .attr('y', (d, i) => -(i + 1) * 25)

      g.attr('transform', 'translate(200,200)')
    },

    generateLines() {
      // set the dimensions and margins of the graph
      const margin = { top: 30, right: 30, bottom: 30, left: 30 }
      const width = 450 - margin.left - margin.right
      const height = 450 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3
        .select(this.$refs.my_dataviz)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Labels of row and columns
      const myGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
      const myVars = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10']

      // Build X scales and axis:
      const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01)
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))

      // Build X scales and axis:
      const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01)
      svg.append('g').call(d3.axisLeft(y))

      // Build color scale
      const myColor = d3.scaleLinear().range(['white', '#69b3a2']).domain([1, 100])
      // Read the data

      d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv', (data) => {
        // create a tooltip
        // const tooltip = d3
        //   .select('#my_dataviz')
        //   .append('div')
        //   .style('opacity', 0)
        //   .attr('class', 'tooltip')
        //   .style('background-color', 'white')
        //   .style('border', 'solid')
        //   .style('border-width', '2px')
        //   .style('border-radius', '5px')
        //   .style('padding', '5px')

        // Three function that change the tooltip when user hover / move / leave a cell
        // const mouseover = function (d) {
        //   console.log('🎹', d)
        //   tooltip.style('opacity', 1)
        // }
        // const mousemove = function (d) {
        //   tooltip
        //     .html('The exact value of<br>this cell is: ' + d.value)
        //     .style('left', d3.mouse(this)[0] + 70 + 'px')
        //     .style('top', d3.mouse(this)[1] + 'px')
        // }
        // const mouseleave = function (d) {
        //   tooltip.style('opacity', 0)
        // }
        // add the squares
        svg
          .selectAll()
          .data(data, function (d) {
            debugger
            return d.group + ':' + d.variable
          })
          .enter()
          .append('rect')
          .attr('x', function (d) {
            return x(d.group)
          })
          .attr('y', function (d) {
            return y(d.variable)
          })
          .attr('width', x.bandwidth())
          .attr('height', y.bandwidth())
          .style('fill', function (d) {
            return myColor(d.value)
          })
        // .on('mouseover', mouseover)
        // .on('mousemove', mousemove)
        // .on('mouseleave', mouseleave)
      })
    },
  },
}
</script>

<style scoped>
d3fc-group.cartesian-chart > .y-label {
  grid-row: 2;
  grid-column: 2;
  transform: none;
  font-size: 10px;
  padding: 0.5em 0;
}
d3fc-group.cartesian-chart > .x-label {
  grid-row: 5;
  grid-column: 5;
  justify-self: end;
  font-size: 10px;
  margin-top: -1em;
  margin-left: -2em;
}
</style>
