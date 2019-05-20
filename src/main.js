// Imports
import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/store'
import linkify from 'vue-linkify'

// Layouts
import Default from '@/layouts/Default'
import Dashboard from '@/layouts/Dashboard'
import Error from '@/layouts/Error'

// Global declaration for layouts
Vue.component('default-layout', Default)
Vue.component('dashboard-layout', Dashboard)
Vue.component('error-layout', Error)

Vue.directive('linkified', linkify)

Vue.use(require('vue-moment'))

// Vue global
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
