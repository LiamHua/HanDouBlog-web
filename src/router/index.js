import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '憨豆博客'
    }
  },
  {
    path: '/user/:nickname',
    name: 'UserHome',
    component: () => import('@/views/UserHome')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('@/views/Article')
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import('@/views/Write'),
    meta: {
      title: '写文章'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // 进入新页面时重置滚动条
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
