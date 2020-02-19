<template>
    <div>
        <b-row class="mb-3">
            <b-col lg="3">
                <b-form-input
                        id="lng"
                        v-model="form.name"
                        type="text"
                        required
                        placeholder="Full Name"
                ></b-form-input>
            </b-col>
            <b-col lg="3">
                <b-form-input
                        id="lng"
                        v-model="form.jobDescription"
                        type="text"
                        required
                        placeholder="Job Description"
                ></b-form-input>
            </b-col>
            <b-col lg="2">
                <Select
                    :options="employmentOptions"
                    :onSelect="(e) => employmentStatus = e"
                    :selected="employmentStatus"/>
            </b-col>
<!--            <b-col lg="3">-->
<!--                <Select-->
<!--                        :options="jobTypeOptions"-->
<!--                        :onSelect="(e) => jobTypeSelected = e"-->
<!--                        :disabled="getFetchingJobTypeState.initial"-->
<!--                        :selected="getFetchingJobTypeState.initial ? {-->
<!--                                        value: null,-->
<!--                                        text: 'Fetching Job Types..'-->
<!--                                    } : jobTypeSelected"/>-->
<!--            </b-col>-->
            <b-col lg="3" md="3">
                <b-button variant="primary" @click="search">Search</b-button> &nbsp;
                <b-button variant="primary" @click="clear">Clear Search</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="3">
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Select from '@/components/base/Select'
    import { mapActions, mapGetters } from "vuex";
    export default {
        name: "GraduateSearch",
        components: {
            Select
        },
        data() {
            return {
                form: {
                    name: "",
                    jobDescription: "",
                },
                employmentStatus: {
                    value: null,
                    text: "Select Employment Status"
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
            }
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            search() {
                const data = {
                    full_name: this.form.name,
                    job_description: this.form.jobDescription,
                    employment_status: this.employmentStatus.value != null ? this.employmentStatus.value : ""
                }
                this.$root.$emit("survey-search-query", data)
            },
            clear() {
                this.form = {
                    name: "",
                    jobDescription: "",
                }
                this.employmentStatus = {
                    value: null,
                    text: "Select Employment Status"
                }
                const data = {
                    full_name: "",
                    job_description: "",
                    employment_status: ""

                }
                this.$root.$emit("survey-search-query", data)
            }
        }
    }
</script>

<style scoped>

</style>