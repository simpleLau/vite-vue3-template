import { Router, createRouter, createWebHistory } from 'vue-router'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/views/home/index.vue')
    },
    {
      name: 'My',
      path: '/my',
      component: () => import('@/views/my/index.vue')
    },
    {
      name: 'Xlsx',
      path: '/xlsx',
      component: () => import('@/views/xlsx/index.vue')
    }
  ]
})

export default router
