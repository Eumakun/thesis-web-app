<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> Course List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showCourseModal">Create New Course</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <CourseTable :callbackRefresh="fetchCoursesDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="courseModal">
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
                                    placeholder="Course Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingCourseState.initial || getUpdatingCourseState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import CourseTable from './components/CourseTable'
    export default {
        name: "index.vue",
        components: {
            CourseTable,
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                },
                type: "create",
                title: "Add Course"
            }
        },
        mounted() {
            this.$root.$on("update-course", this.updateCourseModal)
            this.$root.$on("delete-course", this.deleteCourseModal)
            this.$root.$on("course-query", (e) => {
                this.query = e
            })
        },
        computed: {
            ...mapGetters([
                "getCreatingCourseState",
                "getUpdatingCourseState",
                "getDeletingCourseState",
                "getCourseErrorMessage"
            ])
        },
        watch: {
            getCreatingCourseState({ initial, success, fail}) {
                if(success) {
                    this.fetchCoursesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a Course!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getCourseErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingCourseState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchCoursesDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a Course!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getCourseErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingCourseState({ initial, success, fail}) {
                if(success) {
                    this.fetchCoursesDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a Course!',
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
                "fetchCoursesDatatable",
                "createCourses",
                "updateCourses",
                "deleteCourses"
            ]),
            updateCourseModal(e) {
                this.type = "update"
                this.form = {
                    name: e.val.name,
                }
                this.title = "Update Course"
                this.updateID = e.updateId
                this.$refs.courseModal.show()
            },
            deleteCourseModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this course?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteCourses(data)
                    }
                })
            },
            hideModal() {
                this.$refs.courseModal.hide()
            },
            onSubmit(){
                if(this.form.name == null || this.form.name == "") {
                    return this.$swal(
                        'Oh No!',
                        'Please fill in the Course Name!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        name: this.form.name,
                    }
                    this.createCourses(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        name: this.form.name,
                        email: this.form.email
                    }
                    this.updateCourses(data)
                }
            },
            showCourseModal() {
                this.type = "create"
                this.title = "Add Course"
                this.form = {
                    name: null,
                    email: null
                }
                this.$refs.courseModal.show()
            }
        }
    }
</script>

<style scoped>

</style>