import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'

const FETCH_COURSES = generateMutationTypes('courses', 'FETCH_COURSES')
const FETCH_COURSES_DATATABLE = generateMutationTypes('courses', 'FETCH_COURSES_DATATABLE')
const CREATE_COURSES = generateMutationTypes('courses', 'CREATE_COURSES')
const UPDATE_COURSES = generateMutationTypes('courses', 'UPDATE_COURSES')
const DELETE_COURSES = generateMutationTypes('courses', 'DELETE_COURSES')

const state = {
    fetchingCourses: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingCoursesDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingCourses: {
        initial: false,
        success: false,
        fail: false
    },
    updatingCourses: {
        initial: false,
        success: false,
        fail: false
    },
    deletingCourses: {
        initial: false,
        success: false,
        fail: false
    },
    courses: [],
    courseErrorMessage: "",
    coursesDatatable: [],
    coursesTotal: 0
}
const getters = {
    getFetchingCourseState() {
        return state.fetchingCourses
    },
    getFetchingCourseDatatableState() {
        return state.fetchingCoursesDatatable
    },
    getCreatingCourseState() {
        return state.creatingCourses
    },
    getUpdatingCourseState() {
        return state.updatingCourses
    },
    getDeletingCourseState() {
        return state.deletingCourses
    },
    getCourses() {
        return state.courses
    },
    getCourseErrorMessage() {
        return state.courseErrorMessage
    },
    getCoursesDatatable() {
        return state.coursesDatatable
    },
    getCourseTotal() {
        return state.coursesTotal
    }
}

const mutations = {
    //FETCH COURSES
    [FETCH_COURSES.initial](state) {
        state.fetchingCourses = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_COURSES.success](state,payload) {
        state.fetchingCourses = {
            initial: false,
            success: true,
            fail: false,
        }
        state.courses = payload.meta
    },
    [FETCH_COURSES.fail](state) {
        state.fetchingCourses = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH COURSES
    [FETCH_COURSES_DATATABLE.initial](state) {
        state.fetchingCoursesDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_COURSES_DATATABLE.success](state,payload) {
        state.fetchingCoursesDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.coursesDatatable = payload.meta.data
        state.coursesTotal = payload.meta.total
    },
    [FETCH_COURSES_DATATABLE.fail](state) {
        state.fetchingCoursesDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.coursesDatatable = []
        state.coursesTotal = 0
    },
    //CREATE COURSES
    [CREATE_COURSES.initial](state) {
        state.creatingCourses = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_COURSES.success](state,payload) {
        state.creatingCourses = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_COURSES.fail](state, payload) {
        state.creatingCourses = {
            initial: false,
            success: false,
            fail: true,
        }
        state.courseErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //UPDATE COURSES
    [UPDATE_COURSES.initial](state) {
        state.updatingCourses = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_COURSES.success](state,payload) {
        state.updatingCourses = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_COURSES.fail](state, payload) {
        state.updatingCourses = {
            initial: false,
            success: false,
            fail: true,
        }
        state.courseErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_COURSES.initial](state) {
        state.deletingCourses = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_COURSES.success](state,payload) {
        state.deletingCourses = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_COURSES.fail](state) {
        state.deletingCourses = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchCourses({commit}, params) {
        const slug = 'api.courses.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_COURSES.initial, FETCH_COURSES.success, FETCH_COURSES.fail])
    },
    fetchCoursesDatatable({commit}, params) {
        const slug = 'api.courses.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_COURSES_DATATABLE.initial, FETCH_COURSES_DATATABLE.success, FETCH_COURSES_DATATABLE.fail])
    },
    createCourses({commit}, params) {
        const slug = 'api.courses.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_COURSES.initial, CREATE_COURSES.success, CREATE_COURSES.fail])
    },
    updateCourses({commit}, params) {
        const slug = 'api.courses.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_COURSES.initial, UPDATE_COURSES.success, UPDATE_COURSES.fail])
    },
    deleteCourses({commit}, params) {
        const slug = 'api.courses.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_COURSES.initial, DELETE_COURSES.success, DELETE_COURSES.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
