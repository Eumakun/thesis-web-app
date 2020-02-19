<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> Industry List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showIndustriesModal">Create New Industries</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <IndustriesTable :callbackRefresh="fetchIndustriesDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="industriesModal">
            <b-form @submit.stop.prevent="onSubmit">
                <b-row>
                    <b-col lg="12">
                        <b-form-group
                                id="name"
                                label="Name"
                                label-for="name"
                        >
                            <b-form-input
                                    id="lng"
                                    v-model="form.name"
                                    type="text"
                                    required
                                    placeholder="Industry Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingIndustriesState.initial || getUpdatingIndustriesState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import IndustriesTable from './components/IndustriesTable'
    export default {
        name: "index.vue",
        components: {
            IndustriesTable,
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                },
                type: "create",
                title: "Add Industry"
            }
        },
        mounted() {
            this.$root.$on("update-industries", this.updateIndustriesModal)
            this.$root.$on("delete-industries", this.deleteIndustriesModal)
            this.$root.$on("industries-query", (e) => {
                this.query = e
            })
        },
        computed: {
            ...mapGetters([
                "getCreatingIndustriesState",
                "getUpdatingIndustriesState",
                "getDeletingIndustriesState",
                "getIndustriesErrorMessage"
            ])
        },
        watch: {
            getCreatingIndustriesState({ initial, success, fail}) {
                if(success) {
                    this.fetchIndustriesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a Industry!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getIndustriesErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingIndustriesState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchIndustriesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a Industry!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getIndustriesErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingIndustriesState({ initial, success, fail}) {
                if(success) {
                    this.fetchIndustriesDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a Industry!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        'Server Error!',
                        'error'
                    )
                }
            }
        },
        methods: {
            ...mapActions([
                "fetchIndustriesDatatable",
                "createIndustries",
                "updateIndustries",
                "deleteIndustries"
            ]),
            updateIndustriesModal(e) {
                this.type = "update"
                this.form = {
                    name: e.val.name,
                }
                this.title = "Update Industry"
                this.updateID = e.updateId
                this.$refs.industriesModal.show()
            },
            deleteIndustriesModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this industry?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteIndustries(data)
                    }
                })
            },
            hideModal() {
                this.$refs.industriesModal.hide()
            },
            onSubmit(){
                if(this.form.name == null || this.form.name == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the Industry Name!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        name: this.form.name,
                    }
                    this.createIndustries(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.updateIndustries(data)
                }
            },
            showIndustriesModal() {
                this.type = "create"
                this.title = "Add Industries"
                this.form = {
                    name: null,
                    email: null
                }
                this.$refs.industriesModal.show()
            }
        }
    }
</script>

<style scoped>

</style>