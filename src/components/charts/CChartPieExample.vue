<template>
  <CChartPie
    :datasets="defaultDatasets"
    :options="options"
    :labels="['Employed - '+ employedTotal + '%', 'Unemployed - '+ unemployedTotal + '%']"
  />
</template>

<script>
import { CChartPie } from '@coreui/vue-chartjs'

export default {
  name: 'CChartPieExample',
  components: { CChartPie },
  props: {
    legends: {
      default() {
        return [];
      }
    },
    cData: {
      default() {
        return {};
      }
    },
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  computed: {
    employedTotal() {
      if(this.cData.employed > 0) {
        return ((this.cData.employed / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    unemployedTotal() {
      if(this.cData.unemployed > 0) {
        return ((this.cData.unemployed / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    defaultDatasets () {
      return [
        {
          backgroundColor: [
            '#41B883',
            '#f87979',
          ],
          data: [this.cData.employed, this.cData.unemployed]
        }
      ]
    }
  }
}
</script>
