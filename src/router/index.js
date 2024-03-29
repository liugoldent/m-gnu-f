import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cross/:marketType',
      name: 'marketType',
      props: (route) => {
        return {
          componentType: route.params.marketType
        }
      },
      component: () => import('@/views/ListView.vue')
    },
    {
      path: '/scharts',
      name: 'scharts',
      props: () => {
        return {
        }
      },
      component: () => import('@/views/SChartsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
