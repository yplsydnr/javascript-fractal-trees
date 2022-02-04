import { createRouter, createWebHistory } from 'vue-router'
import Tree from '../views/Tree.vue'

const routes = [
  {
    path: '/',
    name: 'Tree',
    component: Tree
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
