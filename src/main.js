
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App'
import Index from './components/Index'
import Account from './components/AccountSetting'

import './assets/css/styles.css'

Vue.config.productionTip = false

const routes = [
  { path: '*', component: Index},
  { path: '/', component: Index},
  { path: "/account",component: Account}
]

const router = new VueRouter({
  mode:"history",
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
