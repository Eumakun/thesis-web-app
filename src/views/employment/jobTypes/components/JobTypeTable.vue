<template>
    <div>
        <b-row v-if="getFetchingJobTypeDatatableState.initial" class="justify-content-center">
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
    import JobTypeDatatableButton from './JobTypeDatatableButton'
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
            JobTypeDatatableButton,
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
                        tdComp: "JobTypeDatatableButton",
                    },
                ],

            }
        },
        computed: {
            ...mapGetters([
                "getFetchingJobTypeDatatableState",
                "getJobTypesDatatable",
                "getJobTypeTotal"
            ])
        },
        watch: {
            getJobTypesDatatable(newData) {
                this.data = newData
                this.total = this.getJobTypeTotal
            },
            /**
             * Method for watching the values inside the datatable
             */
            query: {
                handler(query) {
                    this.callbackRefresh(query)
                    this.$root.$emit("job-type-query",query)
                },
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>