<template>
  <client-only>
    <div>
      <!-- {{ getTestaggau }} -->
      <VueApexCharts
        width="700"
        type="heatmap"
        :options="chartOptions"
        :series="getTestaggau"
      ></VueApexCharts>
    </div>
  </client-only>
</template>

<script>
import testaggau from '~/apollo/action_units'
export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  data() {
    return {
      testaggau: [],
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
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          height: 700,
        },
        plotOptions: {
          heatmap: {
            distributed: true,
            shadeIntensity: 0.5,
            radius: 2,
            useFillColorAsStroke: false,
            colors: ['#008FFB'],
            // colorScale: {
            //   ranges: [
            //     {
            //       from: 0,
            //       to: 0.05,
            //       name: 'low',
            //       color: '#00A100',
            //     },
            //     {
            //       from: 0.06,
            //       to: 1,
            //       name: 'medium',
            //       color: '#128FD9',
            //     },
            //     {
            //       from: 21,
            //       to: 45,
            //       name: 'high',
            //       color: '#FFB200',
            //     },
            //     {
            //       from: 46,
            //       to: 55,
            //       name: 'extreme',
            //       color: '#FF0000',
            //     },
            //   ],
            // },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
        title: {
          text: 'HeatMap Chart with Color Range',
        },
      },
    }
  },
  computed: {
    getTestaggau() {
      const extracted = []
      this.myVars.forEach((varr) => {
        const data = []
        this.testaggau.forEach((row) => {
          data.push({
            x: row.min_timestamp,
            y: row[varr],
          })
        })
        extracted.push({
          name: varr,
          data,
        })
      })
      return extracted
    },
  },

  methods: {
    generateData(count, yrange) {
      let i = 0
      const series = []
      while (i < count) {
        const x = (i + 1).toString()
        const y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        series.push({
          x,
          y,
        })
        i++
      }

      return series
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
