Vue.use(Vuex)
import Vue from 'vue'
import Vuex from 'vuex'

import auth from "./modules/auth"
import dashboard from "./modules/dashboard"
import survey from "./modules/survey"
import user from "./modules/user"
import course from "./modules/course"
import industry from "./modules/industry"
import job_type from "./modules/job_type"
import tier from "./modules/tier"
import school from "./modules/school"

/**
 * Declare imported modules to store.
 */
const store = new Vuex.Store({
    modules: {
        auth,
        course,
        dashboard,
        industry,
        job_type,
        school,
        survey,
        tier,
        user
    }
})

Vue.prototype.$store = store

export default store
