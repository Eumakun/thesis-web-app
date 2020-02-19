<template>
    <div>
        <b-row v-if="getFetchingCourseDatatableState.initial" class="justify-content-center">
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
    import CourseDatatableButton from './CourseDatatableButton'
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
            CourseDatatableButton,
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
                        title: "Name",
                        field: "name",
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
                        tdComp: "CourseDatatableButton",
                    },
                ],

            }
        },
        computed: {
            ...mapGetters([
                "getFetchingCourseDatatableState",
                "getCoursesDatatable",
                "getCourseTotal"
            ])
        },
        watch: {
            getCoursesDatatable(newData) {
                this.data = newData
                this.total = this.getCourseTotal
            },
            /**
             * Method for watching the values inside the datatable
             */
            query: {
                handler(query) {
                    this.callbackRefresh(query)
                    this.$root.$emit("course-query",query)
                },
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>