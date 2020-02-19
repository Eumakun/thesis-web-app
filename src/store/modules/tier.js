import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_TIER = generateMutationTypes('tier', 'FETCH_TIER')
const FETCH_TIER_DATATABLE = generateMutationTypes('tier', 'FETCH_TIER_DATATABLE')
const CREATE_TIER = generateMutationTypes('tier', 'CREATE_TIER')
const UPDATE_TIER = generateMutationTypes('tier', 'UPDATE_TIER')
const DELETE_TIER = generateMutationTypes('tier', 'DELETE_TIER')

const state = {
        fetchingTier: {
        initial: false,
        success: false,
        fail: false
    },
        fetchingTierDatatable: {
        initial: false,
        success: false,
        fail: false
    },
        creatingTier: {
        initial: false,
        success: false,
        fail: false
    },
        updatingTier: {
        initial: false,
        success: false,
        fail: false
    },
        deletingTier: {
        initial: false,
        success: false,
        fail: false
    },
    tier: [],
    tierErrorMessage: "",
    tierDatatable: [],
    tierTotal: 0
}
const getters = {
    getFetchingTierState() {
            return state.fetchingTier
    },
    getFetchingTierDatatableState() {
            return state.fetchingTierDatatable
    },
    getCreatingTierState() {
            return state.creatingTier
    },
    getUpdatingTierState() {
            return state.updatingTier
    },
    getDeletingTierState() {
            return state.deletingTier
    },
    getTier() {
        return state.tier
    },
    getTierErrorMessage() {
        return state.tierErrorMessage
    },
    getTierDatatable() {
        return state.tierDatatable
    },
    getTierTotal() {
        return state.tierTotal
    }
}

const mutations = {
    //FETCH TIER
    [FETCH_TIER.initial](state) {
            state.fetchingTier = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_TIER.success](state,payload) {
            state.fetchingTier = {
            initial: false,
            success: true,
            fail: false,
        }
        state.tier = payload.meta
    },
    [FETCH_TIER.fail](state) {
            state.fetchingTier = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH TIER
    [FETCH_TIER_DATATABLE.initial](state) {
            state.fetchingTierDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_TIER_DATATABLE.success](state,payload) {
            state.fetchingTierDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.tierDatatable = payload.meta.data
        state.tierTotal = payload.meta.total
    },
    [FETCH_TIER_DATATABLE.fail](state) {
            state.fetchingTierDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.tierDatatable = []
        state.tierTotal = 0
    },
    //CREATE TIER
    [CREATE_TIER.initial](state) {
            state.creatingTier = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_TIER.success](state,payload) {
            state.creatingTier = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_TIER.fail](state, payload) {
            state.creatingTier = {
            initial: false,
            success: false,
            fail: true,
        }
        if(payload.hasOwnProperty("error")) {
            state.tierErrorMessage = payload.error
        }
        state.tierErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE TIER
    [UPDATE_TIER.initial](state) {
            state.updatingTier = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_TIER.success](state,payload) {
            state.updatingTier = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_TIER.fail](state, payload) {
            state.updatingTier = {
            initial: false,
            success: false,
            fail: true,
        }
        if(payload.hasOwnProperty("error")) {
            state.tierErrorMessage = payload.error
        }
        state.tierErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_TIER.initial](state) {
            state.deletingTier = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_TIER.success](state,payload) {
            state.deletingTier = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_TIER.fail](state) {
            state.deletingTier = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchTiers({commit}, params) {
        const slug = 'api.tier.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_TIER.initial, FETCH_TIER.success, FETCH_TIER.fail])
    },
    fetchTiersDatatable({commit}, params) {
        const slug = 'api.tier.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_TIER_DATATABLE.initial, FETCH_TIER_DATATABLE.success, FETCH_TIER_DATATABLE.fail])
    },
    createTiers({commit}, params) {
        const slug = 'api.tier.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_TIER.initial, CREATE_TIER.success, CREATE_TIER.fail])
    },
    updateTiers({commit}, params) {
        const slug = 'api.tier.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_TIER.initial, UPDATE_TIER.success, UPDATE_TIER.fail])
    },
    deleteTiers({commit}, params) {
        const slug = 'api.tier.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_TIER.initial, DELETE_TIER.success, DELETE_TIER.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
