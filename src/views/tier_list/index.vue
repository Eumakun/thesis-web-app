<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> Tier List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showTierModal">Create New Tier</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <TierTable :callbackRefresh="fetchTiersDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="md" ref="tierModal">
            <b-form @submit.stop.prevent="onSubmit">
                <b-row>
                    <b-col lg="12">
                        <b-form-group
                                id="course"
                                label="Course"
                                label-for="course"
                        >
                            <Select
                                    :options="courseOptions"
                                    :onSelect="(e) => courseSelected = e"
                                    :search="true"
                                    :disabled="getFetchingCourseState.initial"
                                    :selected="getFetchingCourseState.initial ? {
                                        value: null,
                                        text: 'Fetching Courses..'
                                    } : courseSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12">
                        <b-form-group
                                id="job"
                                label="Job Type"
                                label-for="job"
                        >
                            <Select
                                    :options="jobTypeOptions"
                                    :onSelect="(e) => jobTypeSelected = e"
                                    :search="true"
                                    :disabled="getFetchingJobTypeState.initial"
                                    :selected="getFetchingJobTypeState.initial ? {
                                        value: null,
                                        text: 'Fetching Job Types..'
                                    } : jobTypeSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12">
                        <b-form-group
                                id="industry"
                                label="Industry Type"
                                label-for="industry"
                        >
                            <Select
                                    :options="industryOptions"
                                    :onSelect="(e) => industrySelected = e"
                                    :search="true"
                                    :disabled="getFetchingIndustriesState.initial"
                                    :selected="getFetchingIndustriesState.initial ? {
                                        value: null,
                                        text: 'Fetching Industries..'
                                    } : industrySelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="12">
                        <b-form-group
                                id="tier"
                                label="Tier Number"
                                label-for="tier"
                        >
                            <Select
                                    :options="tierOptions"
                                    :onSelect="(e) => tierSelected = e"
                                    :selected="tierSelected"/>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingTierState.initial || getUpdatingTierState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Select from '@/components/base/Select'
    import TierTable from './components/TierTable'
    export default {
        name: "index.vue",
        components: {
            TierTable,
            Select
        },
        data() {
            return {
                query: {},
                updateID: null,
                form: {
                    name: null,
                },
                courseSelected: {
                    value: null,
                    text: "Select Course"
                },
                jobTypeSelected: {
                    value: null,
                    text: "Select Job Type"
                },
                industrySelected: {
                    value: null,
                    text: "Select Industry"
                },
                tierSelected: {
                    value: null,
                    text: "Select Tier"
                },
                tierOptions: [
                    {
                        value: 1,
                        text: "Highly Relevant"
                    },
                    {
                        value: 2,
                        text: "Relevant"
                    },
                    {
                        value: 3,
                        text: "Slightly Relevant"
                    },
                ],
                type: "create",
                title: "Add Course"
            }
        },
        mounted() {
            this.$root.$on("update-tier", this.updateTierModal)
            this.$root.$on("delete-tier", this.deleteTierModal)
            this.$root.$on("tier-query", (e) => {
                this.query = e
            })
            this.fetchCourses()
            this.fetchJobTypes()
            this.fetchIndustries()
        },
        computed: {
            ...mapGetters([
                "getCreatingTierState",
                "getUpdatingTierState",
                "getDeletingTierState",
                "getTierErrorMessage",
                "getCourses",
                "getFetchingCourseState",
                "getJobTypes",
                "getFetchingJobTypeState",
                "getIndustries",
                "getFetchingIndustriesState",
            ]),
            courseOptions() {
                return this.getCourses.map(e => ({value: e.id, text: e.name}))
            },
            jobTypeOptions() {
                return this.getJobTypes.map(e => ({value: e.id, text: e.name}))
            },
            industryOptions() {
                return this.getIndustries.map(e => ({value: e.id, text: e.name}))
            }
        },
        watch: {
            getCreatingTierState({ initial, success, fail}) {
                if(success) {
                    this.fetchTiersDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a Tier!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getTierErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingTierState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchTiersDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a Tier!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getTierErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingTierState({ initial, success, fail}) {
                if(success) {
                    this.fetchTiersDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a Tier!',
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
                "fetchTiersDatatable",
                "createTiers",
                "updateTiers",
                "deleteTiers",
                "fetchCourses",
                "fetchJobTypes",
                "fetchIndustries"
            ]),
            updateTierModal(e) {
                console.log(e)
                this.type = "update"
                this.courseSelected = this.courseOptions.filter((x) => x.value == e.val.course_id)[0]
                this.jobTypeSelected = this.jobTypeOptions.filter((x) => x.value == e.val.job_id)[0]
                this.industrySelected = this.industryOptions.filter((x) => x.value == e.val.industry_id)[0]
                this.tierSelected = this.tierOptions.filter((x) => x.value == e.val.tier_number)[0]
                this.title = "Update Tier"
                this.updateID = e.updateId
                this.$refs.tierModal.show()
            },
            deleteTierModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this tier?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteTiers(data)
                    }
                })
            },
            hideModal() {
                this.$refs.tierModal.hide()
            },
            onSubmit(){
                if(this.courseSelected.value == null) {
                    return this.$swal(
                        'Oh No!',
                        'Course is required!',
                        'error'
                    )
                }
                if(this.jobTypeSelected.value == null) {
                    return this.$swal(
                        'Oh No!',
                        'Job Type is required!',
                        'error'
                    )
                }
                if(this.industrySelected.value == null) {
                    return this.$swal(
                        'Oh No!',
                        'Industry is required!',
                        'error'
                    )
                }
                if(this.tierSelected.value == null) {
                    return this.$swal(
                        'Oh No!',
                        'Tier number is required!',
                        'error'
                    )
                }
                if(this.type === "create") {
                    const data = {
                        course_id: this.courseSelected.value,
                        job_id: this.jobTypeSelected.value,
                        industry_id: this.industrySelected.value,
                        tier_number: this.tierSelected.value,
                    }
                    this.createTiers(data)
                }
                else {
                    const data = {
                        id: this.updateID,
                        course_id: this.courseSelected.value,
                        job_id: this.jobTypeSelected.value,
                        industry_id: this.industrySelected.value,
                        tier_number: this.tierSelected.value,
                    }
                    this.updateTiers(data)
                }
            },
            showTierModal() {
                this.type = "create"
                this.title = "Add Tier"
                this.courseSelected = {
                    value: null,
                    text: "Select Course"
                }
                this.jobTypeSelected = {
                    value: null,
                    text: "Select Job Type"
                }
                this.industrySelected = {
                    value: null,
                    text: "Select Industry"
                }
                this.tierSelected = {
                    value: null,
                    text: "Select Tier"
                }
                this.$refs.tierModal.show()
            }
        }
    }
</script>

<style scoped>

</style>