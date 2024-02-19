import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bull',
      name: 'bull',
      props: {
        componentType: 'bull'
      },
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/bear',
      name: 'bear',
      props: {
        componentType: 'bear'
      },
      component: () => import('../views/ListView.vue')
    }
  ]
})

export default router
