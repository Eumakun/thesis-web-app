import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_SCHOOLS = generateMutationTypes('schools', 'FETCH_SCHOOLS')
const FETCH_SCHOOLS_DATATABLE = generateMutationTypes('schools', 'FETCH_SCHOOLS_DATATABLE')
const CREATE_SCHOOLS = generateMutationTypes('schools', 'CREATE_SCHOOLS')
const UPDATE_SCHOOLS = generateMutationTypes('schools', 'UPDATE_SCHOOLS')
const DELETE_SCHOOLS = generateMutationTypes('schools', 'DELETE_SCHOOLS')

const state = {
    fetchingSchools: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingSchoolsDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingSchools: {
        initial: false,
        success: false,
        fail: false
    },
    updatingSchools: {
        initial: false,
        success: false,
        fail: false
    },
    deletingSchools: {
        initial: false,
        success: false,
        fail: false
    },
    schools: [],
    schoolErrorMessage: "",
    schoolsDatatable: [],
    schoolsTotal: 0
}
const getters = {
    getFetchingSchoolState() {
        return state.fetchingSchools
    },
    getFetchingSchoolDatatableState() {
        return state.fetchingSchoolsDatatable
    },
    getCreatingSchoolState() {
        return state.creatingSchools
    },
    getUpdatingSchoolState() {
        return state.updatingSchools
    },
    getDeletingSchoolState() {
        return state.deletingSchools
    },
    getSchools() {
        return state.schools
    },
    getSchoolErrorMessage() {
        return state.schoolErrorMessage
    },
    getSchoolsDatatable() {
        return state.schoolsDatatable
    },
    getSchoolTotal() {
        return state.schoolsTotal
    }
}

const mutations = {
    //FETCH SCHOOLS
    [FETCH_SCHOOLS.initial](state) {
        state.fetchingSchools = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_SCHOOLS.success](state,payload) {
        state.fetchingSchools = {
            initial: false,
            success: true,
            fail: false,
        }
        state.schools = payload.meta
    },
    [FETCH_SCHOOLS.fail](state) {
        state.fetchingSchools = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH SCHOOLS
    [FETCH_SCHOOLS_DATATABLE.initial](state) {
        state.fetchingSchoolsDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_SCHOOLS_DATATABLE.success](state,payload) {
        state.fetchingSchoolsDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.schoolsDatatable = payload.meta.data
        state.schoolsTotal = payload.meta.total
    },
    [FETCH_SCHOOLS_DATATABLE.fail](state) {
        state.fetchingSchoolsDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.schoolsDatatable = []
        state.schoolsTotal = 0
    },
    //CREATE SCHOOLS
    [CREATE_SCHOOLS.initial](state) {
        state.creatingSchools = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_SCHOOLS.success](state,payload) {
        state.creatingSchools = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_SCHOOLS.fail](state, payload) {
        state.creatingSchools = {
            initial: false,
            success: false,
            fail: true,
        }
        state.schoolErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE SCHOOLS
    [UPDATE_SCHOOLS.initial](state) {
        state.updatingSchools = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_SCHOOLS.success](state,payload) {
        state.updatingSchools = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_SCHOOLS.fail](state, payload) {
        state.updatingSchools = {
            initial: false,
            success: false,
            fail: true,
        }
        state.schoolErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_SCHOOLS.initial](state) {
        state.deletingSchools = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_SCHOOLS.success](state,payload) {
        state.deletingSchools = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_SCHOOLS.fail](state) {
        state.deletingSchools = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchSchools({commit}, params) {
        const slug = 'api.schools.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_SCHOOLS.initial, FETCH_SCHOOLS.success, FETCH_SCHOOLS.fail])
    },
    fetchSchoolsDatatable({commit}, params) {
        const slug = 'api.schools.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_SCHOOLS_DATATABLE.initial, FETCH_SCHOOLS_DATATABLE.success, FETCH_SCHOOLS_DATATABLE.fail])
    },
    createSchools({commit}, params) {
        const slug = 'api.schools.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_SCHOOLS.initial, CREATE_SCHOOLS.success, CREATE_SCHOOLS.fail])
    },
    updateSchools({commit}, params) {
        const slug = 'api.schools.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_SCHOOLS.initial, UPDATE_SCHOOLS.success, UPDATE_SCHOOLS.fail])
    },
    deleteSchools({commit}, params) {
        const slug = 'api.schools.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_SCHOOLS.initial, DELETE_SCHOOLS.success, DELETE_SCHOOLS.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
