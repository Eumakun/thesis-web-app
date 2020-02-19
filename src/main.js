import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import _ from "lodash"
import VueSweetalert2 from 'vue-sweetalert2'
import Datatable from "vue2-datatable-component"
import Selector from "@/components/base/DatatableSelector";
import datePicker from 'vue-bootstrap-datetimepicker';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
// import moment from 'moment-timezone'

// Install BootstrapVue
Vue.use(BootstrapVue)

// Vue.use(VueMoment, {
//   moment,
// })
Vue.use(require('vue-moment'))
Vue.use(datePicker);
Vue.use(VueSweetalert2)
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(Vuex)
Vue.use(Datatable)
Vue.component("Selector",Selector)
/**
 * region Navigation Guard
 */
router.beforeEach((to, from, next) => {
  const exemptedLoggedInRoutes = ["/home", "/login"];

  let validityStatus = false
  if (store.state.auth.accessToken) {
    validityStatus = true;
  }

  if (validityStatus) {
    // if logged in
    if (_.includes(exemptedLoggedInRoutes, to.path)) {
      router.push({
        path: "/dashboard"
      });
    } else {
      next()
    }
  } else {
    // if not logged in
    if (_.includes(exemptedLoggedInRoutes, to.path)) {
      next();
    } else {
      router.push({
        path: "/login"
      });
    }
  }
})


new Vue({
  el: '#app',
  router,
  icons,
  store,
  template: '<App/>',
  components: {
    App
  },
})
