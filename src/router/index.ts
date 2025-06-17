import { createRouter, createWebHistory } from 'vue-router'
import { isMobilePortrait } from '@/utils'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' },
        },
      ],
    },

    { path: '/404', component: () => import('@/views/404.vue') },
    // { path: "/test", component: () => import("@/views/Article/1.vue") },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
export default router
