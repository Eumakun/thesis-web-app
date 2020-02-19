<template>
    <CChartBar
            :datasets="defaultDatasets"
            :labels="labels"
            :options="options"
    />
</template>

<script>
    import { CChartBar } from '@coreui/vue-chartjs'

    export default {
        name: 'GenderBarChart',
        components: { CChartBar },
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
                    maintainAspectRatio: true,
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                // OR //
                                steps: 10,
                                stepValue: 5,
                                max: 100,
                                beginAtZero: true   // minimum value will be 0.
                            }
                        }]
                    }
                }
            }
        },
        computed: {
            labels() {
                return this.cData.gender.map(e => _.startCase(e.gender))
            },
            defaultDatasets () {
                return [
                    {
                        label: 'Employment Rate Per Gender',
                        backgroundColor: '#41B883',
                        data: this.cData.employedGender.map(e => parseFloat(parseInt(e.employed) / this.cData.total * 100).toFixed(2) ),
                    },
                    {
                        label: 'Unemployment Rate Per Gender',
                        backgroundColor: '#f87979',
                        data: this.cData.unemployedGender.map(e => parseFloat(parseInt(e.unemployed) / this.cData.total * 100).toFixed(2) ),
                    },
                ]
            }
        }
    }
</script>
