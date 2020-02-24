<template>
    <div>
        <b-row v-if="getFetchingTierDatatableState.initial" class="justify-content-center">
            <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
        </b-row>
        <b-row v-else>
            <b-col lg="12">
                <div class="table-responsive-sm">
                <datatable v-bind="$data"/>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import TierDatatableButton from './TierDatatableButton'
    import TableDataFormatter from '@/components/base/TableDataFormatter'

    export default {
        name: "index.vue",
        props: {
            callbackRefresh: {
                default() {
                return () => {};
                }
            },
        },
        components: {
            TierDatatableButton,
            TableDataFormatter
        },
        data() {
            return {
                HeaderSettings: false,
                total: 0,
                query: {},
                data: [],
                tblClass: "table table-bordered table-hover",
                columns: [
                    {
                        title: "Course",
                        field: "course_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Job Type",
                        field: "job_type_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Industry Type",
                        field: "industry_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Tier Type",
                        field: "tier",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Actions",
                        field: "id",
                        sortable: false,
                        thClass: "text-center",
                        tdClass: "text-center",
                        tdComp: "TierDatatableButton",
                    },
                ],

            }
        },
        computed: {
            ...mapGetters([
                "getFetchingTierDatatableState",
                "getTierDatatable",
                "getTierTotal"
            ])
        },
        watch: {
            getTierDatatable(newData) {
                this.data = newData
                this.data.forEach((e) => {
                    e.course_name = e.course.name
                    e.job_type_name = e.job_type.name
                    e.industry_name = e.industry.name
                    if(e.tier_number == 1) {
                        e.tier = "Highly Relevant"
                    }
                    if(e.tier_number == 2) {
                        e.tier = "Relevant"
                    }
                    if(e.tier_number == 3) {
                        e.tier = "Somewhat Relevant"
                    }
                })
                this.total = this.getTierTotal
            },
            /**
             * Method for watching the values inside the datatable
             */
            query: {
                handler(query) {
                    this.callbackRefresh(query)
                    this.$root.$emit("tier-query",query)
                },
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>
