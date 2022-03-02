import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    isGo: true,
  },
  {
    path: '/node',
    name: 'node',
    component: () => import('../views/node.vue'),
  },
  {
    path: '/faucet',
    name: 'faucet',
    component: () => import('../views/faucet.vue'),
  },
  {
    path: '/settle',
    name: 'settle',
    component: () => import('../views/settle.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
