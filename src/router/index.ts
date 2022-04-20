// @ts-ignore
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { start, close } from '@/utils/nprogress'

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = []

// 存放固定的路由
// @ts-ignore
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    props: true,
    meta: {
      title: 'egrader(云助教)',
    },
    children: [
      {
        path: ':showHeader',
        name: 'chooseRole',
        component: () => import('@/pages/login/index.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/enroll/:showArea',
    name: 'enroll',
    component: () => import('@/pages/enroll/index.vue'),
    props: true,
  },
  {
    path: '/base',
    name: 'base',
    component: () => import('@/layouts/index.vue'),
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404',
  },
]

export const allRoutes = [...defaultRouterList, ...asyncRouterList]

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

router.beforeEach((to, from, next) => {
  start()
  if (to.meta.title) {
    document.title = String(to.meta.title)
  } else {
    document.title = 'egrader（云助教）'
  }
  next()
})

router.afterEach(() => {
  close()
})

export default router
