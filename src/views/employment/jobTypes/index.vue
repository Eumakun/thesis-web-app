<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> Job Type List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showJobTypeModal">Create New Job Type</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <JobTypeTable :callbackRefresh="fetchJobTypesDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="jobTypeModal">
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
                                    placeholder="Job Type"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingJobTypeState.initial || getUpdatingJobTypeState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import JobTypeTable from './components/JobTypeTable'
    export default {
        name: "index.vue",
        components: {
            JobTypeTable,
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                },
                type: "create",
                title: "Add JobType"
            }
        },
        mounted() {
            this.$root.$on("update-job-type", this.updateJobTypeModal)
            this.$root.$on("delete-job-type", this.deleteJobTypeModal)
            this.$root.$on("job-type-query", (e) => {
                this.query = e
            })
        },
        computed: {
            ...mapGetters([
                "getCreatingJobTypeState",
                "getUpdatingJobTypeState",
                "getDeletingJobTypeState",
                "getJobTypeErrorMessage"
            ])
        },
        watch: {
            getCreatingJobTypeState({ initial, success, fail}) {
                if(success) {
                    this.fetchJobTypesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a Job Type!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getJobTypeErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingJobTypeState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchJobTypesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a Job Type!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getJobTypeErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingJobTypeState({ initial, success, fail}) {
                if(success) {
                    this.fetchJobTypesDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a Job Type!',
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
                "fetchJobTypesDatatable",
                "createJobTypes",
                "updateJobTypes",
                "deleteJobTypes"
            ]),
            updateJobTypeModal(e) {
                this.type = "update"
                this.form = {
                    name: e.val.name,
                }
                this.title = "Update Job Type"
                this.updateID = e.updateId
                this.$refs.jobTypeModal.show()
            },
            deleteJobTypeModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this job type?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteJobTypes(data)
                    }
                })
            },
            hideModal() {
                this.$refs.jobTypeModal.hide()
            },
            onSubmit(){
                if(this.form.name == null || this.form.name == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the Job Type!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        name: this.form.name,
                    }
                    this.createJobTypes(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.updateJobTypes(data)
                }
            },
            showJobTypeModal() {
                this.type = "create"
                this.title = "Add Job Type"
                this.form = {
                    name: null,
                    email: null
                }
                this.$refs.jobTypeModal.show()
            }
        }
    }
</script>

<style scoped>

</style>