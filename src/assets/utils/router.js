import Index from '../../components/Index'
import Account from '../../components/AccountSetting'
import Register from '../../components/Register'
import Salle from '../../components/Salle'
import store from '../../store/store.js'


import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    { path: '*', component: Index},
    { path: '/', component: Index},
    { path: "/account",
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    { path: "/register",component: Register},
    { path: "/salle/*",component: Salle}
  ]
  
const router = new VueRouter({
    mode:"history",
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/') 
    } else {
      next() 
    }
})

export default router