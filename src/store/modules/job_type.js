import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_JOB_TYPES = generateMutationTypes('job_types', 'FETCH_JOB_TYPES')
const FETCH_JOB_TYPES_DATATABLE = generateMutationTypes('job_types', 'FETCH_JOB_TYPES_DATATABLE')
const CREATE_JOB_TYPES = generateMutationTypes('job_types', 'CREATE_JOB_TYPES')
const UPDATE_JOB_TYPES = generateMutationTypes('job_types', 'UPDATE_JOB_TYPES')
const DELETE_JOB_TYPES = generateMutationTypes('job_types', 'DELETE_JOB_TYPES')

const state = {
    fetchingJobTypes: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingJobTypesDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingJobTypes: {
        initial: false,
        success: false,
        fail: false
    },
    updatingJobTypes: {
        initial: false,
        success: false,
        fail: false
    },
    deletingJobTypes: {
        initial: false,
        success: false,
        fail: false
    },
    job_types: [],
    job_typeErrorMessage: "",
    job_typesDatatable: [],
    job_typesTotal: 0
}
const getters = {
    getFetchingJobTypeState() {
        return state.fetchingJobTypes
    },
    getFetchingJobTypeDatatableState() {
        return state.fetchingJobTypesDatatable
    },
    getCreatingJobTypeState() {
        return state.creatingJobTypes
    },
    getUpdatingJobTypeState() {
        return state.updatingJobTypes
    },
    getDeletingJobTypeState() {
        return state.deletingJobTypes
    },
    getJobTypes() {
        return state.job_types
    },
    getJobTypeErrorMessage() {
        return state.job_typeErrorMessage
    },
    getJobTypesDatatable() {
        return state.job_typesDatatable
    },
    getJobTypeTotal() {
        return state.job_typesTotal
    }
}

const mutations = {
    //FETCH JOB_TYPES
    [FETCH_JOB_TYPES.initial](state) {
        state.fetchingJobTypes = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_JOB_TYPES.success](state,payload) {
        state.fetchingJobTypes = {
            initial: false,
            success: true,
            fail: false,
        }
        state.job_types = payload.meta
    },
    [FETCH_JOB_TYPES.fail](state) {
        state.fetchingJobTypes = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH JOB_TYPES
    [FETCH_JOB_TYPES_DATATABLE.initial](state) {
        state.fetchingJobTypesDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_JOB_TYPES_DATATABLE.success](state,payload) {
        state.fetchingJobTypesDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.job_typesDatatable = payload.meta.data
        state.job_typesTotal = payload.meta.total
    },
    [FETCH_JOB_TYPES_DATATABLE.fail](state) {
        state.fetchingJobTypesDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.job_typesDatatable = []
        state.job_typesTotal = 0
    },
    //CREATE JOB_TYPES
    [CREATE_JOB_TYPES.initial](state) {
        state.creatingJobTypes = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_JOB_TYPES.success](state,payload) {
        state.creatingJobTypes = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_JOB_TYPES.fail](state, payload) {
        state.creatingJobTypes = {
            initial: false,
            success: false,
            fail: true,
        }
        state.job_typeErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE JOB_TYPES
    [UPDATE_JOB_TYPES.initial](state) {
        state.updatingJobTypes = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_JOB_TYPES.success](state,payload) {
        state.updatingJobTypes = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_JOB_TYPES.fail](state, payload) {
        state.updatingJobTypes = {
            initial: false,
            success: false,
            fail: true,
        }
        state.job_typeErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_JOB_TYPES.initial](state) {
        state.deletingJobTypes = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_JOB_TYPES.success](state,payload) {
        state.deletingJobTypes = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_JOB_TYPES.fail](state) {
        state.deletingJobTypes = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchJobTypes({commit}, params) {
        const slug = 'api.job_types.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_JOB_TYPES.initial, FETCH_JOB_TYPES.success, FETCH_JOB_TYPES.fail])
    },
    fetchJobTypesDatatable({commit}, params) {
        const slug = 'api.job_types.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_JOB_TYPES_DATATABLE.initial, FETCH_JOB_TYPES_DATATABLE.success, FETCH_JOB_TYPES_DATATABLE.fail])
    },
    createJobTypes({commit}, params) {
        const slug = 'api.job_types.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_JOB_TYPES.initial, CREATE_JOB_TYPES.success, CREATE_JOB_TYPES.fail])
    },
    updateJobTypes({commit}, params) {
        const slug = 'api.job_types.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_JOB_TYPES.initial, UPDATE_JOB_TYPES.success, UPDATE_JOB_TYPES.fail])
    },
    deleteJobTypes({commit}, params) {
        const slug = 'api.job_types.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_JOB_TYPES.initial, DELETE_JOB_TYPES.success, DELETE_JOB_TYPES.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
