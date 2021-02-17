<template>
  <div>
    <h1>Chart</h1>
    <!--    <d3fc-svg use-device-pixel-ratio></d3fc-svg>-->
    <!-- Create a div where the graph will take place -->
    <div id="my_dataviz"></div>

    <hr />
  </div>
</template>

<script>
export default {
  name: 'LibD3fc',
  mounted() {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    const width = 450 - margin.left - margin.right
    const height = 450 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
      .select('#my_dataviz')
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
    d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv', function (data) {
      // create a tooltip
      const tooltip = d3
        .select('#my_dataviz')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px')

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function (d) {
        console.log('🎹')
        tooltip.style('opacity', 1)
      }
      const mousemove = function (d) {
        tooltip
          .html('The exact value of<br>this cell is: ' + d.value)
          .style('left', d3.mouse(this)[0] + 70 + 'px')
          .style('top', d3.mouse(this)[1] + 'px')
      }
      const mouseleave = function (d) {
        tooltip.style('opacity', 0)
      }

      // add the squares
      svg
        .selectAll()
        .data(data, function (d) {
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
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)
    })
  },
}
</script>

<style scoped></style>
