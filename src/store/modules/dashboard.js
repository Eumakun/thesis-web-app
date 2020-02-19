import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_DASHBOARD = generateMutationTypes('courses', 'FETCH_DASHBOARD')

const state = {
    fetchingDashboard: {
        initial: false,
        success: false,
        fail: false
    },
    dashboardData: {}
}
const getters = {
    getFetchingDashboardState() {
        return state.fetchingDashboard
    },
    getDashboardData() {
        return state.dashboardData
    }
}

const mutations = {
    //FETCH DASHBOARD
    [FETCH_DASHBOARD.initial](state) {
        state.fetchingDashboard = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_DASHBOARD.success](state,payload) {
        state.fetchingDashboard = {
            initial: false,
            success: true,
            fail: false,
        }
        state.dashboardData = payload.meta
    },
    [FETCH_DASHBOARD.fail](state) {
        state.fetchingDashboard = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchingDashboard({commit}, params) {
        const slug = 'api.dashboard.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_DASHBOARD.initial, FETCH_DASHBOARD.success, FETCH_DASHBOARD.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
