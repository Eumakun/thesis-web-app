<template>
  <CChartPie
    :datasets="defaultDatasets"
    :options="options"
    :labels="['Highly Relevant - '+ tier1Total + '%', 'Relevant Relevant - '+ tier2Total + '%', 'Slightly Relevant - '+ tier3Total + '%','Not Relevant - '+ unclassifiedTotal + '%' ]"
  />
</template>

<script>
import { CChartPie } from '@coreui/vue-chartjs'

export default {
  name: 'JobAccuracy',
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
        legend: {
          position: 'right',
          // labels: {
          //   fontSize: 16
          // }
          labels: {
            fontSize: 15,
            generateLabels: (chart) => {
              var data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map(function (label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var ds = data.datasets[0];
                  var arc = meta.data[i];
                  var custom = arc && arc.custom || {};
                  var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                  var arcOpts = chart.options.elements.arc;
                  var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                  var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                  var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                    return {
                      // And finally :
                      text: label,
                      fillStyle: fill,
                      strokeStyle: stroke,
                      lineWidth: bw,
                      hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                      index: i
                    }
                });
              }
            }
          },
        }
        }
    }
  },
  computed: {
    tier1Total() {
      if(this.cData.tier1 > 0) {
        return ((this.cData.tier1 / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    tier2Total() {
      if(this.cData.tier2 > 0) {
        return ((this.cData.tier2 / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    tier3Total() {
      if(this.cData.tier3 > 0) {
        return ((this.cData.tier3 / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    unclassifiedTotal() {
      if(this.cData.unclassified > 0) {
        return ((this.cData.unclassified / this.cData.total) * 100).toFixed(2)
      } else {
        return 0
      }
    },
    defaultDatasets () {
      return [
        {
          backgroundColor: [
            '#41B883',
            '#FFCC00',
            '#f87979',
            '#808080',
          ],
          data: [this.cData.tier1, this.cData.tier2, this.cData.tier3, this.cData.unclassified]
        }
      ]
    }
  }
}
</script>
