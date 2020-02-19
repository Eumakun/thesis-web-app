<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> School List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showSchoolModal">Create New School</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <SchoolTable :callbackRefresh="fetchSchoolsDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="schoolModal">
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
                                    placeholder="School Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingSchoolState.initial || getUpdatingSchoolState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import SchoolTable from './components/SchoolTable'
    export default {
        name: "index.vue",
        components: {
            SchoolTable,
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                },
                type: "create",
                title: "Add School"
            }
        },
        mounted() {
            this.$root.$on("update-school", this.updateSchoolModal)
            this.$root.$on("delete-school", this.deleteSchoolModal)
            this.$root.$on("school-query", (e) => {
                this.query = e
            })
        },
        computed: {
            ...mapGetters([
                "getCreatingSchoolState",
                "getUpdatingSchoolState",
                "getDeletingSchoolState",
                "getSchoolErrorMessage"
            ])
        },
        watch: {
            getCreatingSchoolState({ initial, success, fail}) {
                if(success) {
                    this.fetchSchoolsDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a School!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getSchoolErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingSchoolState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchSchoolsDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a School!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getSchoolErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingSchoolState({ initial, success, fail}) {
                if(success) {
                    this.fetchSchoolsDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a School!',
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
                "fetchSchoolsDatatable",
                "createSchools",
                "updateSchools",
                "deleteSchools"
            ]),
            updateSchoolModal(e) {
                this.type = "update"
                this.form = {
                    name: e.val.name,
                }
                this.title = "Update School"
                this.updateID = e.updateId
                this.$refs.schoolModal.show()
            },
            deleteSchoolModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this school?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteSchools(data)
                    }
                })
            },
            hideModal() {
                this.$refs.schoolModal.hide()
            },
            onSubmit(){
                if(this.form.name == null || this.form.name == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the School Name!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        name: this.form.name,
                    }
                    this.createSchools(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.updateSchools(data)
                }
            },
            showSchoolModal() {
                this.type = "create"
                this.title = "Add School"
                this.form = {
                    name: null,
                    email: null
                }
                this.$refs.schoolModal.show()
            }
        }
    }
</script>

<style scoped>

</style>