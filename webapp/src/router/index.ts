import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Api from '@/plugins/api/api'

Vue.use(VueRouter)

function loggedGuard(to:any, from:any, next:any) {
  if (!Api.isLogged) {
    next({name:"Login"})
  }else{
    next();
  }
}

function notLoggedGuard(to:any, from:any, next:any) {
  if (!Api.isLogged) {
    next();
  }else{
    next(false)
  }
}


const routes: Array<RouteConfig> = [
  {
    path:"/",
    name:"Home",
    component:Home,
    beforeEnter: loggedGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: notLoggedGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
