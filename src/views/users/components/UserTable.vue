<template>
    <div>
        <b-row v-if="getFetchingUserDatatableState.initial" class="justify-content-center">
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
    import UserDatatableButton from './UserDatatableButton'
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
            UserDatatableButton,
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
                        title: "Email Address",
                        field: "email",
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
                        tdComp: "UserDatatableButton",
                    },
                ],

            }
        },
        computed: {
            ...mapGetters([
                "getFetchingUserDatatableState",
                "getUsersDatatable",
                "getUserTotal"
            ])
        },
        watch: {
            getUsersDatatable(newData) {
                this.data = newData
                this.total = this.getUserTotal
            },
            /**
             * Method for watching the values inside the datatable
             */
            query: {
                handler(query) {
                    this.callbackRefresh(query)
                    this.$root.$emit("user-query",query)
                },
                deep: true
            },
        }
    }
</script>

<style scoped>

</style>