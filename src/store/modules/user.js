import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_USERS = generateMutationTypes('users', 'FETCH_USERS')
const FETCH_USERS_DATATABLE = generateMutationTypes('users', 'FETCH_USERS_DATATABLE')
const CREATE_USERS = generateMutationTypes('users', 'CREATE_USERS')
const UPDATE_USERS = generateMutationTypes('users', 'UPDATE_USERS')
const UPDATE_USER_PASSWORD = generateMutationTypes('users', 'UPDATE_USER_PASSWORD')
const DELETE_USERS = generateMutationTypes('users', 'DELETE_USERS')

const state = {
    fetchingUsers: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingUsersDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingUsers: {
        initial: false,
        success: false,
        fail: false
    },
    updatingUsers: {
        initial: false,
        success: false,
        fail: false
    },
    updatingUserPassword: {
        initial: false,
        success: false,
        fail: false
    },
    deletingUsers: {
        initial: false,
        success: false,
        fail: false
    },
    users: [],
    userErrorMessage: "",
    usersDatatable: [],
    usersTotal: 0
}
const getters = {
    getFetchingUserState() {
        return state.fetchingUsers
    },
    getFetchingUserDatatableState() {
        return state.fetchingUsersDatatable
    },
    getCreatingUserState() {
        return state.creatingUsers
    },
    getUpdatingUserState() {
        return state.updatingUsers
    },
    getUpdatingUserPasswordState() {
        return state.updatingUserPassword
    },
    getDeletingUserState() {
        return state.deletingUsers
    },
    getUsers() {
        return state.users
    },
    getUserErrorMessage() {
        return state.userErrorMessage
    },
    getUsersDatatable() {
        return state.usersDatatable
    },
    getUserTotal() {
        return state.usersTotal
    }
}

const mutations = {
    //FETCH USERS
    [FETCH_USERS.initial](state) {
        state.fetchingUsers = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_USERS.success](state,payload) {
        state.fetchingUsers = {
            initial: false,
            success: true,
            fail: false,
        }
        state.users = payload.data
    },
    [FETCH_USERS_DATATABLE.fail](state) {
        state.fetchingUsers = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH USERS
    [FETCH_USERS_DATATABLE.initial](state) {
        state.fetchingUsersDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_USERS_DATATABLE.success](state,payload) {
        state.fetchingUsersDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.usersDatatable = payload.meta.data
        state.usersTotal = payload.meta.total
    },
    [FETCH_USERS_DATATABLE.fail](state) {
        state.fetchingUsersDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.usersDatatable = []
        state.usersTotal = 0
    },
    //CREATE USERS
    [CREATE_USERS.initial](state) {
        state.creatingUsers = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_USERS.success](state,payload) {
        state.creatingUsers = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_USERS.fail](state, payload) {
        state.creatingUsers = {
            initial: false,
            success: false,
            fail: true,
        }
        state.userErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE USERS
    [UPDATE_USERS.initial](state) {
        state.updatingUsers = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_USERS.success](state,payload) {
        state.updatingUsers = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_USERS.fail](state, payload) {
        state.updatingUsers = {
            initial: false,
            success: false,
            fail: true,
        }
        state.userErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE USERS PASSWORD
    [UPDATE_USER_PASSWORD.initial](state) {
        state.updatingUserPassword = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_USER_PASSWORD.success](state,payload) {
        state.updatingUserPassword = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_USER_PASSWORD.fail](state, payload) {
        state.updatingUserPassword = {
            initial: false,
            success: false,
            fail: true,
        }
        if(payload.hasOwnProperty("error")) {
            state.tierErrorMessage = payload.error
        }
        state.userErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_USERS.initial](state) {
        state.deletingUsers = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_USERS.success](state,payload) {
        state.deletingUsers = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_USERS.fail](state) {
        state.deletingUsers = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchUsers({commit}, params) {
        const slug = 'api.users.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_USERS.initial, FETCH_USERS.success, FETCH_USERS.fail])
    },
    fetchUsersDatatable({commit}, params) {
        const slug = 'api.users.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_USERS_DATATABLE.initial, FETCH_USERS_DATATABLE.success, FETCH_USERS_DATATABLE.fail])
    },
    createUsers({commit}, params) {
        const slug = 'api.users.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_USERS.initial, CREATE_USERS.success, CREATE_USERS.fail])
    },
    updateUsers({commit}, params) {
        const slug = 'api.users.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_USERS.initial, UPDATE_USERS.success, UPDATE_USERS.fail])
    },
    updateUserPassword({commit}, params) {
        const slug = 'api.users.password'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_USER_PASSWORD.initial, UPDATE_USER_PASSWORD.success, UPDATE_USER_PASSWORD.fail])
    },
    deleteUsers({commit}, params) {
        const slug = 'api.users.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_USERS.initial, DELETE_USERS.success, DELETE_USERS.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
