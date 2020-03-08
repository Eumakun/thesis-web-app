<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-list"/> Graduate List
            </CCardHeader>
            <CCardBody>
                <b-row lg="12" class="mb-2 pull-right">
                    <b-col lg="12">
                        <b-button variant="primary" @click="showUserModal">Create Survey Data</b-button> &nbsp;
                        <b-button variant="primary" @click="$refs.importExcel.show()">Import Survey Data</b-button> &nbsp;
<!--                        <b-btn :class="showCollapse ? 'collapsed' : null"-->
<!--                               :aria-expanded="showCollapse ? 'true' : 'false'"-->
<!--                               aria-controls="collapse1"-->
<!--                               @click="showCollapse = !showCollapse"-->
<!--                               variant="secondary"><span><CIcon :name="showCollapse ? 'cil-chevron-bottom' : 'cil-chevron-top'"></CIcon></span></b-btn>-->
                        <b-btn :class="showCollapse ? 'collapsed' : null"
                               :aria-expanded="showCollapse ? 'true' : 'false'"
                               aria-controls="collapse1"
                               @click="showCollapse = !showCollapse"
                               variant="secondary"><span><i class="fa fa-search"></i></span></b-btn>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <b-collapse id="collapse1" v-model="showCollapse" class="mt-2">
                        <CCard>
                            <CCardBody>
                                <GraduateSearch/>
                            </CCardBody>
                        </CCard>
                        </b-collapse>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="12">
                        <GraduateTable :callbackRefresh="fetchSurveysDatatable"/>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
        <b-modal okTitle="Save" :title="title" size="lg" ref="surveyModal">
            <b-form @submit.stop.prevent="onSubmit">
                <b-row>
                    <b-col lg="3">
                        <b-form-group
                                id="firstName"
                                label="First Name"
                                label-for="firstName"
                        >
                            <b-form-input
                                    id="firstName"
                                    v-model="form.firstName"
                                    type="text"
                                    required
                                    placeholder="First Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group
                                id="middleName"
                                label="Middle Name"
                                label-for="middleName"
                        >
                            <b-form-input
                                    id="middleName"
                                    v-model="form.middleName"
                                    type="text"
                                    required
                                    placeholder="Middle Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group
                                id="lastName"
                                label="Last Name"
                                label-for="lastName"
                        >
                            <b-form-input
                                    id="lastName"
                                    v-model="form.lastName"
                                    type="text"
                                    required
                                    placeholder="Last Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="8">
                        <b-form-group
                        id="address"
                        label="Address"
                        label-for="address"
                        >
                        <b-form-input
                                id="address"
                                v-model="form.address"
                                type="text"
                                required
                                placeholder="Address"
                        ></b-form-input>
                        </b-form-group>
                    </b-col>
<!--                    <b-col lg="3">-->
<!--                        <b-form-group-->
<!--                                id="age"-->
<!--                                label="Age"-->
<!--                                label-for="age"-->
<!--                        >-->
<!--                            <b-form-input-->
<!--                                    id="age"-->
<!--                                    v-model="form.age"-->
<!--                                    type="number"-->
<!--                                    required-->
<!--                                    placeholder="Age"-->
<!--                            ></b-form-input>-->
<!--                        </b-form-group>-->
<!--                    </b-col>-->
                    <b-col lg="4">
                        <b-form-group
                                id="gender"
                                label="Gender"
                                label-for="gender"
                        >
                            <Select
                                    :options="genderOptions"
                                    :onSelect="(e) => genderSelected = e"
                                    :selected="genderSelected"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6">
                        <b-form-group
                                id="birthDate"
                                label="Birth Date"
                                label-for="birthDate"
                        >
                            <date-picker v-model="form.birthDate" placeholder="Birth Date" :config="options"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group
                                id="empStatus"
                                label="Employment Status"
                                label-for="empStatus"
                        >
                            <Select
                                    :options="employmentOptions"
                                    :onSelect="(e) => employmentStatus = e"
                                    :selected="employmentStatus"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                    <b-col lg="10">
                        <h5>Education Details</h5>
                    </b-col>
                    <b-col lg="2" class="float-right">
                        <b-button variant="success" size="sm" @click="addEducationHistory"><i class="fa fa-plus"></i> Add Details</b-button>
                    </b-col>
                </b-row>
                <hr>
                <b-row v-for="(education,index) in education">
                    <b-col lg="5">
                        <b-form-group
                                id="course"
                                label="Course"
                                label-for="course"
                        >
                            <Select
                                    :options="courseOptions"
                                    :onSelect="(e) => {onSelectCourse(e,index)}"
                                    :search="true"
                                    :disabled="getFetchingCourseState.initial"
                                    :selected="getFetchingCourseState.initial ? {
                                        value: null,
                                        text: 'Fetching Courses..'
                                    } : education.courseSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group
                                id="school"
                                label="School"
                                label-for="school"
                        >
                            <Select
                                    :options="schoolOptions"
                                    :onSelect="(e) => {onSelectSchool(e,index)}"
                                    :disabled="getFetchingSchoolState.initial"
                                    :search="true"
                                    :selected="getFetchingSchoolState.initial ? {
                                        value: null,
                                        text: 'Fetching Schools..'
                                    } : education.schoolSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group
                                id="dateGraduated"
                                label="Date Graduated"
                                label-for="dateGraduated"
                        >
                            <b-input-group>
                                <date-picker v-model="education.dateGraduated" placeholder="Date Graduated" :config="options"/>
                                <b-input-group-append v-if="index > 0">
                                    <b-button variant="danger" size="sm" @click="removeEducation(index)"><i class="fa fa-trash"></i></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                    <b-col lg="10 mb-0">
                        <h5 class="mb-0">Employment Details</h5>
                        <small >Leave blank if unemployed</small>
                    </b-col>
                    <b-col lg="2" class="float-right">
                            <b-button variant="success" size="sm" @click="addEmployment"><i class="fa fa-plus"></i> Add Details</b-button>
                    </b-col>
                </b-row>

                <hr/>
                <template v-for="(employment,index) in employments">
                    <b-row >
                        <b-col lg="6">
                            <b-form-group
                                    id="jobDescription"
                                    label="Job Description"
                                    label-for="jobDescription"
                            >
                                <b-form-input
                                        id="jobDescription"
                                        v-model="employment.jobDescription"
                                        type="text"
                                        required
                                        placeholder="Job Description"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="3">
                            <b-form-group
                                    id="dateEmployed"
                                    label="Date Employed"
                                    label-for="dateEmployed"
                            >
                                <date-picker v-model="employment.dateEmployed" placeholder="Date Employed" :config="options"/>
                            </b-form-group>
                        </b-col>
                        <b-col lg="3">
                            <b-form-group
                                    id="dateResigned"
                                    label="Date Resigned"
                                    label-for="dateEmployed"
                            >
                                <date-picker v-model="employment.dateResigned" placeholder="Date Resigned" :config="options"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6">
                            <b-form-group
                                    id="jobType"
                                    label="Job Type"
                                    label-for="jobType"
                            >
                                <Select
                                        :options="jobTypeOptions"
                                        :search="true"
                                        :onSelect="(e) => {onSelectType(e,index)}"
                                        :disabled="getFetchingJobTypeState.initial"
                                        :selected="getFetchingJobTypeState.initial ? {
                                            value: null,
                                            text: 'Fetching Job Types..'
                                        } : employment.jobTypeSelected"/>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group
                                    id="industry"
                                    label="Industry"
                                    label-for="industry"
                            >
                                <Select
                                        :options="industryOptions"
                                        :onSelect="(e) => {onSelectIndustry(e,index)}"
                                        :search="true"
                                        :disabled="getFetchingIndustriesState.initial"
                                        :selected="getFetchingIndustriesState.initial ? {
                                            value: null,
                                            text: 'Fetching Job Types..'
                                        } : employment.industrySelected"/>

                            </b-form-group>
                        </b-col>
                    </b-row>
                    <div >
                        <b-row class="d-flex flex-row-reverse">
                        <b-button v-if="index > 0" variant="danger" class="mr-3" size="sm" @click="removeEmployment(index)"><i class="fa fa-trash"></i> Remove</b-button>
                        </b-row>
                        <hr v-if="employments.length > 1">
                    </div>
                </template>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getCreatingSurveyState.initial || getUpdatingSurveyState.initial" variant="primary"  @click="onSubmit">Save</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
        <b-modal okTitle="Save" :title="title" size="lg" ref="viewSurveyModal">
            <b-form @submit.stop.prevent="onSubmit">
                <b-row>
                    <b-col lg="3">
                        <b-form-group
                                id="firstName"
                                label="First Name"
                                label-for="firstName"
                        >
                            <b-form-input
                                    id="firstName"
                                    disabled
                                    v-model="form.firstName"
                                    type="text"
                                    required
                                    placeholder="First Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group
                                id="middleName"
                                label="Middle Name"
                                label-for="middleName"
                        >
                            <b-form-input
                                    id="middleName"
                                    v-model="form.middleName"
                                    type="text"
                                    required
                                    disabled
                                    placeholder="Middle Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group
                                id="lastName"
                                label="Last Name"
                                label-for="lastName"
                        >
                            <b-form-input
                                    id="lastName"
                                    disabled
                                    v-model="form.lastName"
                                    type="text"
                                    required
                                    placeholder="Last Name"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="8">
                        <b-form-group
                        id="address"
                        label="Address"
                        label-for="address"
                        >
                        <b-form-input
                                id="address"
                                disabled
                                v-model="form.address"
                                type="text"
                                required
                                placeholder="Address"
                        ></b-form-input>
                        </b-form-group>
                    </b-col>
<!--                    <b-col lg="3">-->
<!--                        <b-form-group-->
<!--                                id="age"-->
<!--                                label="Age"-->
<!--                                label-for="age"-->
<!--                        >-->
<!--                            <b-form-input-->
<!--                                    id="age"-->
<!--                                    disabled-->
<!--                                    v-model="form.age"-->
<!--                                    type="number"-->
<!--                                    required-->
<!--                                    placeholder="Age"-->
<!--                            ></b-form-input>-->
<!--                        </b-form-group>-->
<!--                    </b-col>-->
                    <b-col lg="4">
                        <b-form-group
                                id="gender"
                                label="Gender"
                                label-for="gender"
                        >
                            <Select
                                    :disabled="true"
                                    :options="genderOptions"
                                    :onSelect="(e) => genderSelected = e"
                                    :selected="genderSelected"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="6">
                        <b-form-group
                                id="birthDate"
                                label="Birth Date"
                                label-for="birthDate"
                        >
                            <date-picker v-model="form.birthDate" disabled placeholder="Birth Date" :config="options"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="6">
                        <b-form-group
                                id="empStatus"
                                label="Employment Status"
                                label-for="empStatus"
                        >
                            <Select
                                    :options="employmentOptions"
                                    :disabled="true"
                                    :onSelect="(e) => employmentStatus = e"
                                    :selected="employmentStatus"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                    <b-col lg="10">
                        <h5>Education Details</h5>
                    </b-col>
                </b-row>
                <hr>
                <b-row v-for="(education,index) in education" :key="index">
                    <b-col lg="5">
                        <b-form-group
                                id="course"
                                label="Course"
                                label-for="course"
                        >
                            <Select
                                    :options="courseOptions"
                                    :onSelect="(e) => education.courseSelected = e"
                                    :disabled="true"
                                    :selected="getFetchingCourseState.initial ? {
                                        value: null,
                                        text: 'Fetching Courses..'
                                    } : education.courseSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="4">
                        <b-form-group
                                id="school"
                                label="School"
                                label-for="school"
                        >
                            <Select
                                    :options="schoolOptions"
                                    :onSelect="(e) => education.schoolSelected = e"
                                    :disabled="true"
                                    :selected="getFetchingSchoolState.initial ? {
                                        value: null,
                                        text: 'Fetching Schools..'
                                    } : education.schoolSelected"/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group
                                id="dateGraduated"
                                label="Date Graduated"
                                label-for="dateGraduated"
                        >
                            <date-picker v-model="education.dateGraduated" disabled placeholder="Date Graduated" :config="options"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <br>
                <b-row>
                    <b-col lg="3">
                        <h5>Employment Details</h5>
                    </b-col>
                </b-row>
                <hr/>
                <template  v-for="employment in employments">
                    <b-row>
                        <b-col lg="6">
                            <b-form-group
                                    id="jobDescription"
                                    label="Job Description"
                                    label-for="jobDescription"
                            >
                                <b-form-input
                                        id="jobDescription"
                                        v-model="employment.jobDescription"
                                        type="text"
                                        disabled
                                        required
                                        placeholder="Job Description"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col lg="3">
                            <b-form-group
                                    id="dateEmployed"
                                    label="Date Employed"
                                    label-for="dateEmployed"
                            >
                                <date-picker v-model="employment.dateEmployed" disabled placeholder="Date Employed" :config="options"/>
                            </b-form-group>
                        </b-col>
                        <b-col lg="3">
                            <b-form-group
                                    id="dateResigned"
                                    label="Date Resigned"
                                    label-for="dateResigned"
                            >
                                <date-picker v-model="employment.dateResigned" disabled placeholder="Date Resigned" :config="options"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6">
                            <b-form-group
                                    id="jobType"
                                    label="Job Type"
                                    label-for="jobType"
                            >
                                <Select
                                        :options="jobTypeOptions"
                                        :onSelect="(e) => employment.jobTypeSelected = e"
                                        :disabled="true"
                                        :selected="getFetchingJobTypeState.initial ? {
                                            value: null,
                                            text: 'Fetching Job Types..'
                                        } : employment.jobTypeSelected"/>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6">
                            <b-form-group
                                    id="industry"
                                    label="Industry"
                                    label-for="industry"
                            >
                                <Select
                                        :options="industryOptions"
                                        :onSelect="(e) => employment.industrySelected = e"
                                        :disabled="true"
                                        :selected="getFetchingIndustriesState.initial ? {
                                            value: null,
                                            text: 'Fetching Industries..'
                                        } : employment.industrySelected"/>

                            </b-form-group>
                        </b-col>
                    </b-row>
                    <div >
                        <hr v-if="employments.length > 1">
                    </div>
                </template>
            </b-form>
            <template slot="modal-footer">
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
        <b-modal okTitle="Save" title="Import Survey Data (Spreadsheet)" size="lg" ref="importExcel">
            <b-form @submit.stop.prevent="onImport">
                <b-form-group
                        id="customFile"
                        label="File"
                        label-for="file"
                >
                    <b-form-file
                            v-model="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            :state="Boolean(file)"
                            :disabled="getImportingSurveyState.initial"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                    ></b-form-file>
                </b-form-group>
            </b-form>
            <template slot="modal-footer">
                <b-button type="submit" :disabled="getImportingSurveyState.initial" variant="primary"  @click="onImport">Import</b-button>
                <b-button variant="secondary"  @click="hideModal">Close</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import GraduateTable from './components/GraduateTable'
    import Select from '@/components/base/Select'
    import GraduateSearch from "./components/GraduateSearch"

    export default {
        name: "index.vue",
        components: {
            GraduateTable,
            GraduateSearch,
            Select
        },
        data() {
            return {
                showCollapse: false,
                query: {},
                title: "",
                type: "create",
                updateID: null,
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false,
                },
                employmentOptions: [
                    {
                        value: "employed",
                        text: "Employed"
                    },
                    {
                        value: "unemployed",
                        text: "Unemployed"
                    },
                ],
                genderOptions: [
                    {
                        value: "male",
                        text: "Male"
                    },
                    {
                        value: "female",
                        text: "Female"
                    },
                ],
                genderSelected: {
                    value: null,
                    text: "Select a Gender"
                },
                education: [
                    {
                        schoolSelected: {
                            value: null,
                            text: "Select a School"
                        },
                        courseSelected: {
                            value: null,
                            text: "Select a Course"
                        },
                        dateGraduated: null,
                    },
                ],
                employments: [
                    {
                        jobDescription: "",
                        dateEmployed: null,
                        dateResigned: null,
                        jobTypeSelected: {
                            value: null,
                            text: "Select a Job Type"
                        },
                        industrySelected: {
                            value: null,
                            text: "Select an Industry"
                        }
                    }
                ],
                employmentStatus: {
                    value: null,
                    text: "Please select Status"
                },
                file: null,
                form: {
                    firstName: "",
                    lastName: "",
                    middleName: "",
                    address: "",
                    birthDate: null,
                    age: "",
                }
            }
        },
        mounted() {
            this.$root.$on("update-survey", this.updateSurveyModal)
            this.$root.$on("delete-survey", this.deleteSurveyModal)
            this.$root.$on("view-survey", this.viewSurveyModal)
            this.$root.$on("survey-query", (e) => {
                this.query = e
            })
            this.fetchSchools()
            this.fetchCourses()
            this.fetchJobTypes()
            this.fetchIndustries()
        },
        computed: {
            ...mapGetters([
                "getCreatingSurveyState",
                "getImportingSurveyState",
                "getUpdatingSurveyState",
                "getDeletingSurveyState",
                "getSurveyErrorMessage",
                "getCourses",
                "getFetchingCourseState",
                "getJobTypes",
                "getFetchingJobTypeState",
                "getIndustries",
                "getFetchingIndustriesState",
                "getSchools",
                "getFetchingSchoolState",
            ]),
            courseOptions() {
                return this.getCourses.map(e => ({value: e.id, text: e.name}))
            },
            schoolOptions() {
                return this.getSchools.map(e => ({value: e.id, text: e.name}))
            },
            jobTypeOptions() {
                return this.getJobTypes.map(e => ({value: e.id, text: e.name}))
            },
            industryOptions() {
                return this.getIndustries.map(e => ({value: e.id, text: e.name}))
            }
        },
        watch: {
            getCreatingSurveyState({ initial, success, fail}) {
                if(success) {
                    this.fetchSurveysDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Created a Survey Data!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getSurveyErrorMessage,
                        'error'
                    )
                }
            },
            getUpdatingSurveyState({ initial, success, fail}) {
                if(success) {
                    this.updateID = null
                    this.fetchSurveysDatatable(this.query)
                    this.hideModal()
                    this.$swal(
                        'Good job!',
                        'Successfully Updated a Survey Data!',
                        'success'
                    )
                }
                else if(fail){
                    this.$swal(
                        'Oh No!',
                        this.getSurveyErrorMessage,
                        'error'
                    )
                }
            },
            getDeletingSurveyState({ initial, success, fail}) {
                if(success) {
                    this.fetchSurveysDatatable(this.query)
                    this.$swal(
                        'Good job!',
                        'Successfully Deleted a Survey Data!',
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
            },
            getImportingSurveyState({ initial, success, fail}) {
                if(success) {
                    this.fetchSurveysDatatable(this.query)
                    this.$refs.importExcel.hide()
                    this.$swal(
                        'Good job!',
                        'Successfully Imported Survey Data!',
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
                "fetchSurveysDatatable",
                "createSurveys",
                "importSurveys",
                "updateSurveys",
                "deleteSurveys",
                "fetchSchools",
                "fetchCourses",
                "fetchJobTypes",
                "fetchIndustries",
            ]),
            onImport() {
                if(this.file == null) {
                    return this.$swal(
                        'Oh No!',
                        'Import a file!',
                        'error'
                    )
                }
                const formData = new FormData()
                formData.append("file", this.file);
                this.importSurveys(formData)
            },
            onSelectCourse(e,index) {
                this.education[index].courseSelected = e
                this.$forceUpdate()
            },
            onSelectSchool(e,index) {
                this.education[index].schoolSelected = e
                this.$forceUpdate()
            },
            onSelectType(e,index) {
                this.employments[index].jobTypeSelected = e
                this.$forceUpdate()
            },
            onSelectIndustry(e,index) {
                this.employments[index].industrySelected = e
                this.$forceUpdate()
            },
            addEducationHistory() {
                this.education.push(
                    {
                        schoolSelected: {
                            value: null,
                            text: "Select a School"
                        },
                        courseSelected: {
                            value: null,
                            text: "Select a Course"
                        },
                        dateGraduated: null,
                    })
                this.$forceUpdate()
            },
            removeEducation(e) {
              this.education.splice(e,1)
            },
            addEmployment() {
                this.employments.push(
                    {
                        jobDescription: "",
                        dateEmployed: null,
                        dateResigned: null,
                        jobTypeSelected: {
                            value: null,
                            text: "Select a Job Type"
                        },
                        industrySelected: {
                            value: null,
                            text: "Select an Industry"
                        }
                    }
                )
            },
            removeEmployment(e) {
                this.employments.splice(e,1)
            },
            viewSurveyModal(e) {
                // this.type = "update"
                this.education = [
                    {
                        schoolSelected: {
                            value: null,
                            text: "Select a School"
                        },
                        courseSelected: {
                            value: null,
                            text: "Select a Course"
                        },
                        dateGraduated: null,
                    },
                ]
                this.employments = [
                    {
                        jobDescription: "",
                        dateEmployed: null,
                        dateResigned: null,
                        jobTypeSelected: {
                            value: null,
                            text: "Select a Job Type"
                        },
                        industrySelected: {
                            value: null,
                            text: "Select an Industry"
                        }
                    }
                ]

                this.form = {
                    firstName: e.val.first_name,
                    lastName: e.val.last_name,
                    middleName: e.val.middle_name,
                    address: e.val.address,
                    age: e.val.age,
                    birthDate: e.val.birth_date
                }

                this.employmentStatus = this.employmentOptions.filter((y) => y.value == e.val.employment_status)[0]
                this.genderSelected = this.genderOptions.filter((y) => y.value == e.val.gender)[0]

                e.val.education.forEach((x,index) => {
                    this.education[index] = {
                        schoolSelected: this.schoolOptions.filter((y) => y.value == x.school_id)[0],
                        courseSelected: this.courseOptions.filter((y) => y.value == x.course_id)[0],
                        dateGraduated: x.date_graduated,
                        id: x.id
                    }
                })
                e.val.employment.forEach((x,index) => {
                    this.employments[index] = {
                        jobTypeSelected: this.jobTypeOptions.filter((y) => y.value == x.job_id)[0],
                        industrySelected: this.industryOptions.filter((y) => y.value == x.industry_id)[0],
                        dateEmployed: x.date_employed,
                        jobDescription: x.job_description,
                        dateResigned: x.date_resigned,
                        id: x.id
                    }
                })
                this.title = "View Survey"
                // this.updateID = e.updateId
                this.$refs.viewSurveyModal.show()
            },
            updateSurveyModal(e) {
                this.type = "update"
                this.education = [
                    {
                        schoolSelected: {
                            value: null,
                            text: "Select a School"
                        },
                        courseSelected: {
                            value: null,
                            text: "Select a Course"
                        },
                        dateGraduated: null,
                    },
                ]
                this.employments = [
                    {
                        jobDescription: "",
                        dateEmployed: null,
                        dateResigned: null,
                        jobTypeSelected: {
                            value: null,
                            text: "Select a Job Type"
                        },
                        industrySelected: {
                            value: null,
                            text: "Select an Industry"
                        }
                    }
                ]
                this.form = {
                    firstName: e.val.first_name,
                    lastName: e.val.last_name,
                    middleName: e.val.middle_name,
                    address: e.val.address,
                    age: e.val.age,
                    birthDate: e.val.birth_date
                }
                this.employmentStatus = this.employmentOptions.filter((y) => y.value == e.val.employment_status)[0]
                this.genderSelected = this.genderOptions.filter((y) => y.value == e.val.gender)[0]
                e.val.education.forEach((x,index) => {
                    this.education[index] = {
                        schoolSelected: this.schoolOptions.filter((y) => y.value == x.school_id)[0],
                        courseSelected: this.courseOptions.filter((y) => y.value == x.course_id)[0],
                        dateGraduated: x.date_graduated,
                        id: x.id
                    }
                })
                e.val.employment.forEach((x,index) => {
                    this.employments[index] = {
                        jobTypeSelected: this.jobTypeOptions.filter((y) => y.value == x.job_id)[0],
                        industrySelected: this.industryOptions.filter((y) => y.value == x.industry_id)[0],
                        dateEmployed: x.date_employed,
                        jobDescription: x.job_description,
                        dateResigned: x.date_resigned,
                        id: x.id
                    }
                })
                this.title = "Update Survey"
                this.updateID = e.updateId
                this.$refs.surveyModal.show()
            },
            deleteSurveyModal (e) {
                const data = {
                    id: e.updateId
                }
                this.$swal({
                    title: 'Are you sure?',
                    text: "You want to delete this user?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteSurveys(data)
                    }
                })
            },
            showUserModal(){
                this.title = "Add Survey Data"
                this.type = "create"
                this.employmentStatus = {
                    value: null,
                        text: "Please select Status"
                }
                this.genderSelected = {
                    value: null,
                    text: "Select a Gender"
                }
                this.education = [
                    {
                        schoolSelected: {
                            value: null,
                            text: "Select a School"
                        },
                        courseSelected: {
                            value: null,
                            text: "Select a Course"
                        },
                        dateGraduated: null,
                    },
                ]
                this.employments = [
                    {
                        jobDescription: "",
                        dateEmployed: null,
                        dateResigned: null,
                        jobTypeSelected: {
                            value: null,
                            text: "Select a Job Type"
                        },
                        industrySelected: {
                            value: null,
                            text: "Select an Industry"
                        }
                    }
                ]
                this.form =  {
                    firstName: "",
                    lastName: "",
                    address: "",
                    age: "",
                    jobDescription: "",
                    schoolSelected: {
                        value: null,
                        text: "Select a School"
                    },
                    courseSelected: {
                        value: null,
                        text: "Select a Course"
                    },
                    dateGraduated: null,
                    dateEmployed: null,
                    jobTypeSelected: {
                        value: null,
                        text: "Select a Job Type"
                    },
                    industrySelected: {
                        value: null,
                        text: "Select an Industry"
                    }
                }
                this.$refs.surveyModal.show()
            },
            onSubmit(){
                if(this.type === "create") {
                    const data = {
                        first_name: this.form.firstName,
                        last_name: this.form.lastName,
                        middle_name: this.form.middleName,
                        address: this.form.address,
                        birth_date: this.form.birthDate,
                        age: this.form.age,
                        gender: this.genderSelected.value,
                        employment_status: this.employmentStatus.value,
                        education: this.education.map((e) => ({
                            course_id: e.courseSelected.value,
                            school_id: e.schoolSelected.value,
                            date_graduated: e.dateGraduated,
                        })),
                        employment: this.employments.map((e) => ({
                            job_id: e.jobTypeSelected.value,
                            industry_id: e.industrySelected.value,
                            job_description: e.jobDescription,
                            date_employed: e.dateEmployed,
                            date_resigned: e.dateResigned,
                        }))
                    }
                    this.createSurveys(data)
                }
                else {
                    let employment = []
                    let education = []
                    this.employments.forEach((e) => {
                        if(e.hasOwnProperty("id")) {
                            employment.push({
                                id: e.id,
                                job_id: e.jobTypeSelected.value,
                                industry_id: e.industrySelected.value,
                                job_description: e.jobDescription,
                                date_employed: e.dateEmployed,
                                date_resigned: e.dateResigned,
                            })
                        } else {
                            employment.push({
                                job_id: e.jobTypeSelected.value,
                                industry_id: e.industrySelected.value,
                                job_description: e.jobDescription,
                                date_employed: e.dateEmployed,
                                date_resigned: e.dateResigned,
                            })
                        }
                    })
                    this.education.forEach((e) => {
                        if(e.hasOwnProperty("id")) {
                            education.push({
                                id: e.id,
                                course_id: e.courseSelected.value,
                                school_id: e.schoolSelected.value,
                                date_graduated: e.dateGraduated,
                            })
                        } else {
                            education.push({
                                course_id: e.courseSelected.value,
                                school_id: e.schoolSelected.value,
                                date_graduated: e.dateGraduated,
                            })
                        }
                    })
                    const data = {
                        id: this.updateID,
                        first_name: this.form.firstName,
                        last_name: this.form.lastName,
                        middle_name: this.form.middleName,
                        address: this.form.address,
                        birth_date: this.form.birthDate,
                        age: this.form.age,
                        gender: this.genderSelected.value,
                        employment_status: this.employmentStatus.value,
                        education: education,
                        employment: employment
                    }
                    this.updateSurveys(data)
                }
            },
            hideModal() {
                this.$refs.surveyModal.hide()
                this.$refs.viewSurveyModal.hide()
            }
        }

    }
</script>

<style scoped>

</style>
