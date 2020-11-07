import Vue from 'vue'
import VueRouter from 'vue-router';
import Axios from 'axios'

Vue.use(VueRouter);

import App from './App'
import Index from './components/Index'
import Account from './components/AccountSetting'
import Register from './components/Register'
import store from './store/store'

import './assets/css/styles.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const routes = [
  { path: '*', component: Index},
  { path: '/', component: Index},
  { path: "/account",component: Account},
  { path: "/register",component: Register}
]

const router = new VueRouter({
  mode:"history",
  routes
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
