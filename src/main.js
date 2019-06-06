// Imports
import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/store'
import linkify from 'vue-linkify'
import vueMoment from 'vue-moment'
import moment from 'moment'
import VueCookies from 'vue-cookies'

// Layouts
import Default from '@/layouts/Default'
import Dashboard from '@/layouts/Dashboard'
import Auth from '@/layouts/Auth'

// Global declaration for layouts
Vue.component('default-layout', Default)
Vue.component('dashboard-layout', Dashboard)
Vue.component('auth-layout', Auth)

Vue.directive('linkified', linkify)

Vue.use(vueMoment)
Vue.use(VueCookies)


// Vue global
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
