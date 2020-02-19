<template>
    <div>
        <b-row v-if="getFetchingSurveyDatatableState.initial" class="justify-content-center">
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
    import GraduateDatatableButton from "../../graduates/components/GraduateDatatableButton";
    import TableDataFormatter from '@/components/base/TableDataFormatter'
    import {mapGetters} from "vuex";
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
            GraduateDatatableButton,
            TableDataFormatter
        },
        mounted() {
            this.$root.$on("survey-search-query", (e) => {
                this.query.offset = 0
                this.query =  {...this.query, ...e}
                this.$root.$emit("survey-query",this.query)
                this.callbackRefresh(this.query)
            })
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
                        title: "First Name",
                        field: "first_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Middle Name",
                        field: "middle_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Last Name",
                        field: "last_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Course",
                        field: "course_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                     {
                        title: "Job Description",
                        field: "job_description",
                        sortable: false,
                        thClass: "text-center",
                        tdClass: "text-center",
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "School",
                        field: "school_name",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Status",
                        field: "employment_status_view",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: false,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Date Inserted",
                        field: "date_inserted",
                        thClass: "text-center",
                        tdClass: "text-center",
                        sortable: true,
                        tdComp: "TableDataFormatter",
                    },
                    {
                        title: "Actions",
                        field: "id",
                        sortable: false,
                        thClass: "text-center",
                        tdClass: "text-center",
                        tdComp: "GraduateDatatableButton",
                    },
                ],

            }
        },
        computed: {
            ...mapGetters([
                "getFetchingSurveyDatatableState",
                "getSurveysDatatable",
                "getSurveyTotal"
            ])
        },
        watch: {
            getSurveysDatatable(newData) {
                this.data = newData
                this.data.forEach((e) => {
                    e.date_inserted = this.$moment(e.created_at).format("LL")
                   if(e.education.length > 0) {
                           e.course_name = e.education[e.education.length-1].course.name
                           e.school_name = e.education[e.education.length-1].school.name
                   }
                   e.employment_status_view = _.startCase(e.employment_status)
                    if(e.employment.length > 0) {
                        // e.industry_name = e.employment[e.employment.length-1].industry.name
                        // e.job_type_name = e.employment[e.employment.length-1].job_type.name
                        e.job_description = e.employment[e.employment.length-1].job_description
                    }
                })
                this.total = this.getSurveyTotal
            },
            /**
             * Method for watching the values inside the datatable
             */
            query: {
                handler(query) {
                    this.callbackRefresh(query)
                    this.$root.$emit("survey-query",query)
                },
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>