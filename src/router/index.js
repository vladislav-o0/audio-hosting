import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Reg from '../views/Reg.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/registration',
    name: 'Reg',
    component: Reg
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
