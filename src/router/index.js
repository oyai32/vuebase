import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/Home.vue'], resolve),
      meta: {title: '自述文件'},
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../views/Dashboard.vue'], resolve),
          meta: {title: '系统首页'}
        },
        {
          path: '/table',
          component: resolve => require(['../views/BaseTable.vue'], resolve),
          meta: {title: '基础表格'}
        },
        {
          path: '/form',
          component: resolve => require(['../views/BaseForm.vue'], resolve),
          meta: {title: '基本表单'}
        },
        {
          path: '/theme',
          component: resolve => require(['../views/Theme.vue'], resolve),
          meta: {title: '主题切换'}
        },
        {
          path: '/tree',
          component: resolve => require(['../views/Tree.vue'], resolve),
          meta: {title: '懒加载树'}
        },
        {
          path: '/404',
          component: resolve => require(['../views/404.vue'], resolve),
          meta: {title: '404'}
        },
        {
          path: '/403',
          component: resolve => require(['../views/403.vue'], resolve),
          meta: {title: '403'}
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../views/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
