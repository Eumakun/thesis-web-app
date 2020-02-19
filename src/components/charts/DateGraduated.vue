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
                    maintainAspectRatio: false,
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
                console.log(this.cData)
                return Object.keys(this.cData.date_graduated)
            },
            defaultDatasets () {
                return [
                    {
                        label: 'Employment Rate Per Year Graduated',
                        backgroundColor: '#41B883',
                        data: this.cData.employedDateGraduated.map(e => parseFloat(parseInt(e.employed) / this.cData.total * 100).toFixed(2) ),
                    },
                    {
                        label: 'Unemployment Rate Per Year Graduated',
                        backgroundColor: '#f87979',
                        data: this.cData.unemployedDateGraduated.map(e => parseFloat(parseInt(e.unemployed) / this.cData.total * 100).toFixed(2) ),
                    },
                ]
            }
        }
    }
</script>
