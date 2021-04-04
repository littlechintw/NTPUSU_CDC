import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GIFT from '../views/Gift.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gift',
    name: 'GIFT',
    component: GIFT
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
