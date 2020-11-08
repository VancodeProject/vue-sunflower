import Vue from 'vue'
import Axios from 'axios'

import App from './App'
import store from './store/store'
import router from './assets/utils/router.js'
import './assets/css/styles.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
