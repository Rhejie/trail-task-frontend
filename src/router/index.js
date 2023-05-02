import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Home Page',
      component: () => import('../views/HomePage.vue'),
      meta: {
        header: 'Dashboard'
      },
    },
    {
      path: '/404',
      name: 'Not Found',
      component: () => import('../views/404.vue'),
    }
]

const router = createRouter({
  history: createWebHistory(),
  hashbang: false,
  routes
})

export default router
