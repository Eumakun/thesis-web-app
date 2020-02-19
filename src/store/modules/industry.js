import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_INDUSTRIES = generateMutationTypes('industries', 'FETCH_INDUSTRIES')
const FETCH_INDUSTRIES_DATATABLE = generateMutationTypes('industries', 'FETCH_INDUSTRIES_DATATABLE')
const CREATE_INDUSTRIES = generateMutationTypes('industries', 'CREATE_INDUSTRIES')
const UPDATE_INDUSTRIES = generateMutationTypes('industries', 'UPDATE_INDUSTRIES')
const DELETE_INDUSTRIES = generateMutationTypes('industries', 'DELETE_INDUSTRIES')

const state = {
    fetchingIndustries: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingIndustriesDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingIndustries: {
        initial: false,
        success: false,
        fail: false
    },
    updatingIndustries: {
        initial: false,
        success: false,
        fail: false
    },
    deletingIndustries: {
        initial: false,
        success: false,
        fail: false
    },
    industries: [],
    industriesErrorMessage: "",
    industriesDatatable: [],
    industriesTotal: 0
}
const getters = {
    getFetchingIndustriesState() {
        return state.fetchingIndustries
    },
    getFetchingIndustriesDatatableState() {
        return state.fetchingIndustriesDatatable
    },
    getCreatingIndustriesState() {
        return state.creatingIndustries
    },
    getUpdatingIndustriesState() {
        return state.updatingIndustries
    },
    getDeletingIndustriesState() {
        return state.deletingIndustries
    },
    getIndustries() {
        return state.industries
    },
    getIndustriesErrorMessage() {
        return state.industriesErrorMessage
    },
    getIndustriesDatatable() {
        return state.industriesDatatable
    },
    getIndustriesTotal() {
        return state.industriesTotal
    }
}

const mutations = {
    //FETCH INDUSTRIES
    [FETCH_INDUSTRIES.initial](state) {
        state.fetchingIndustries = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_INDUSTRIES.success](state,payload) {
        state.fetchingIndustries = {
            initial: false,
            success: true,
            fail: false,
        }
        state.industries = payload.meta
    },
    [FETCH_INDUSTRIES.fail](state) {
        state.fetchingIndustries = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH INDUSTRIES
    [FETCH_INDUSTRIES_DATATABLE.initial](state) {
        state.fetchingIndustriesDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_INDUSTRIES_DATATABLE.success](state,payload) {
        state.fetchingIndustriesDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.industriesDatatable = payload.meta.data
        state.industriesTotal = payload.meta.total
    },
    [FETCH_INDUSTRIES_DATATABLE.fail](state) {
        state.fetchingIndustriesDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.industriesDatatable = []
        state.industriesTotal = 0
    },
    //CREATE INDUSTRIES
    [CREATE_INDUSTRIES.initial](state) {
        state.creatingIndustries = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_INDUSTRIES.success](state,payload) {
        state.creatingIndustries = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_INDUSTRIES.fail](state, payload) {
        state.creatingIndustries = {
            initial: false,
            success: false,
            fail: true,
        }
        state.industriesErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE INDUSTRIES
    [UPDATE_INDUSTRIES.initial](state) {
        state.updatingIndustries = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_INDUSTRIES.success](state,payload) {
        state.updatingIndustries = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_INDUSTRIES.fail](state, payload) {
        state.updatingIndustries = {
            initial: false,
            success: false,
            fail: true,
        }
        state.industriesErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_INDUSTRIES.initial](state) {
        state.deletingIndustries = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_INDUSTRIES.success](state,payload) {
        state.deletingIndustries = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_INDUSTRIES.fail](state) {
        state.deletingIndustries = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchIndustries({commit}, params) {
        const slug = 'api.industries.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_INDUSTRIES.initial, FETCH_INDUSTRIES.success, FETCH_INDUSTRIES.fail])
    },
    fetchIndustriesDatatable({commit}, params) {
        const slug = 'api.industries.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_INDUSTRIES_DATATABLE.initial, FETCH_INDUSTRIES_DATATABLE.success, FETCH_INDUSTRIES_DATATABLE.fail])
    },
    createIndustries({commit}, params) {
        const slug = 'api.industries.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_INDUSTRIES.initial, CREATE_INDUSTRIES.success, CREATE_INDUSTRIES.fail])
    },
    updateIndustries({commit}, params) {
        const slug = 'api.industries.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_INDUSTRIES.initial, UPDATE_INDUSTRIES.success, UPDATE_INDUSTRIES.fail])
    },
    deleteIndustries({commit}, params) {
        const slug = 'api.industries.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_INDUSTRIES.initial, DELETE_INDUSTRIES.success, DELETE_INDUSTRIES.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
