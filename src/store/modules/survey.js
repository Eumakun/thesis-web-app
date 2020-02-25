import { STATE_API } from '@/utils/api/api-helper'
import { generateMutationTypes } from '@/utils/api/state-mutation'
import { RAW_API } from '@/utils/api/raw-api'

const FETCH_SURVEY = generateMutationTypes('survey', 'FETCH_SURVEY')
const FETCH_SURVEY_DATATABLE = generateMutationTypes('survey', 'FETCH_SURVEY_DATATABLE')
const CREATE_SURVEY = generateMutationTypes('survey', 'CREATE_SURVEY')
const IMPORT_SURVEY = generateMutationTypes('survey', 'IMPORT_SURVEY')
const UPDATE_SURVEY = generateMutationTypes('survey', 'UPDATE_SURVEY')
const DELETE_SURVEY = generateMutationTypes('survey', 'DELETE_SURVEY')

const state = {
    fetchingSurveys: {
        initial: false,
        success: false,
        fail: false
    },
    fetchingSurveysDatatable: {
        initial: false,
        success: false,
        fail: false
    },
    creatingSurveys: {
        initial: false,
        success: false,
        fail: false
    },
    importingSurveys: {
        initial: false,
        success: false,
        fail: false
    },
    updatingSurveys: {
        initial: false,
        success: false,
        fail: false
    },
    deletingSurveys: {
        initial: false,
        success: false,
        fail: false
    },
    surveys: [],
    surveyErrorMessage: "",
    surveysDatatable: [],
    surveysTotal: 0
}
const getters = {
    getFetchingSurveyState() {
        return state.fetchingSurveys
    },
    getFetchingSurveyDatatableState() {
        return state.fetchingSurveysDatatable
    },
    getCreatingSurveyState() {
        return state.creatingSurveys
    },
    getImportingSurveyState() {
        return state.importingSurveys
    },
    getUpdatingSurveyState() {
        return state.updatingSurveys
    },
    getDeletingSurveyState() {
        return state.deletingSurveys
    },
    getSurveys() {
        return state.surveys
    },
    getSurveyErrorMessage() {
        return state.surveyErrorMessage
    },
    getSurveysDatatable() {
        return state.surveysDatatable
    },
    getSurveyTotal() {
        return state.surveysTotal
    }
}

const mutations = {
    //FETCH SURVEY
    [FETCH_SURVEY.initial](state) {
        state.fetchingSurveys = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [FETCH_SURVEY.success](state,payload) {
        state.fetchingSurveys = {
            initial: false,
            success: true,
            fail: false,
        }
        state.surveys = payload.data
    },
    [FETCH_SURVEY.fail](state) {
        state.fetchingSurveys = {
            initial: false,
            success: false,
            fail: true,
        }
    },
    //FETCH SURVEY
    [FETCH_SURVEY_DATATABLE.initial](state) {
        state.fetchingSurveysDatatable = {
            initial: true,
            success: false,
            fail: false,
        }
        state.surveysDatatable = []
        state.surveysTotal = 0
    },
    [FETCH_SURVEY_DATATABLE.success](state,payload) {
        state.fetchingSurveysDatatable = {
            initial: false,
            success: true,
            fail: false,
        }
        state.surveysDatatable = payload.meta.data
        state.surveysTotal = payload.meta.total
    },
    [FETCH_SURVEY_DATATABLE.fail](state) {
        state.fetchingSurveysDatatable = {
            initial: false,
            success: false,
            fail: true,
        }
        state.surveysDatatable = []
        state.surveysTotal = 0
    },
    //CREATE SURVEY
    [CREATE_SURVEY.initial](state) {
        state.creatingSurveys = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [CREATE_SURVEY.success](state,payload) {
        state.creatingSurveys = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [CREATE_SURVEY.fail](state, payload) {
        state.creatingSurveys = {
            initial: false,
            success: false,
            fail: true,
        }
        state.surveyErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    //IMPORT SURVEY
    [IMPORT_SURVEY.initial](state) {
        state.importingSurveys = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [IMPORT_SURVEY.success](state,payload) {
        state.importingSurveys = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [IMPORT_SURVEY.fail](state, payload) {
        state.importingSurveys = {
            initial: false,
            success: false,
            fail: true,
        }
        console.log(payload)
        state.surveyErrorMessage =  "Internal Server Error"
    },
    //UPDATE SURVEY
    [UPDATE_SURVEY.initial](state) {
        state.updatingSurveys = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [UPDATE_SURVEY.success](state,payload) {
        state.updatingSurveys = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [UPDATE_SURVEY.fail](state, payload) {
        state.updatingSurveys = {
            initial: false,
            success: false,
            fail: true,
        }
        state.surveyErrorMessage = Object.values(payload.errors)[0][0] != undefined ?
            Object.values(payload.errors)[0][0] : "Internal Server Error"
    },
    [DELETE_SURVEY.initial](state) {
        state.deletingSurveys = {
            initial: true,
            success: false,
            fail: false,
        }
    },
    [DELETE_SURVEY.success](state,payload) {
        state.deletingSurveys = {
            initial: false,
            success: true,
            fail: false,
        }
    },
    [DELETE_SURVEY.fail](state) {
        state.deletingSurveys = {
            initial: false,
            success: false,
            fail: true,
        }
    },
}

const actions = {
    fetchSurveys({commit}, params) {
        const slug = 'api.surveys.fetchAll'
        STATE_API({
            slug,
            params
        }, commit, [FETCH_SURVEY.initial, FETCH_SURVEY.success, FETCH_SURVEY.fail])
    },
    fetchSurveysDatatable({commit}, params) {
        const slug = 'api.surveys.fetchAll'
        params.page = params.offset.toString()[0] !== 0 ? parseInt(params.offset.toString()[0]) + parseInt("1") : 1
        if (params.sort == 'date_inserted') {
            params.sort_by = 'created_at'
        }
        params.per_page = params.limit
        STATE_API({
            slug,
            params
        }, commit, [FETCH_SURVEY_DATATABLE.initial, FETCH_SURVEY_DATATABLE.success, FETCH_SURVEY_DATATABLE.fail])
    },
    createSurveys({commit}, params) {
        const slug = 'api.surveys.create'
        STATE_API({
            slug,
            params
        }, commit, [CREATE_SURVEY.initial, CREATE_SURVEY.success, CREATE_SURVEY.fail])
    },
    importSurveys({commit}, params) {
        console.log(params)
        RAW_API({
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                url:  '/api/survey/import',
                data: params,
            },
            commit,
            [IMPORT_SURVEY.initial, IMPORT_SURVEY.success, IMPORT_SURVEY.fail])

    },
    updateSurveys({commit}, params) {
        const slug = 'api.surveys.update'
        STATE_API({
            slug,
            params
        }, commit, [UPDATE_SURVEY.initial, UPDATE_SURVEY.success, UPDATE_SURVEY.fail])
    },
    deleteSurveys({commit}, params) {
        const slug = 'api.surveys.delete'
        STATE_API({
            slug,
            params
        }, commit, [DELETE_SURVEY.initial, DELETE_SURVEY.success, DELETE_SURVEY.fail])
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
