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
      name: 'menu',
      component: resolve => require(['../components/TheHome.vue'], resolve),
      children: [
        {
          path: '/normname',
          name: 'normName',
          component: resolve => require(['../views/norm/NormName.vue'], resolve),
          meta: {title: '命名规范'}
        },
        {
          path: '/normstructure',
          name: 'normStructure',
          component: resolve => require(['../views/norm/NormStructure.vue'], resolve),
          meta: {title: '目录结构'}
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: resolve => require(['../views/Dashboard.vue'], resolve),
          meta: {title: '首页'}
        },
        {
          path: '/theme',
          name: 'theme',
          component: resolve => require(['../views/Theme.vue'], resolve),
          meta: {title: '主题切换'}
        },
        {
          path: '/form',
          name: 'form',
          component: resolve => require(['../views/BaseForm.vue'], resolve),
          meta: {title: '基本表单'}
        },
        {
          path: '/table',
          name: 'table',
          component: resolve => require(['../views/BaseTable.vue'], resolve),
          meta: {title: '基础表格'}
        },
        {
          path: '/tree',
          name: 'tree',
          component: resolve => require(['../views/Tree.vue'], resolve),
          meta: {title: '懒加载树'}
        },
        {
          path: '/crumb',
          name: 'crumb',
          component: resolve => require(['../views/Crumb.vue'], resolve),
          meta: {title: '二级面包屑'}
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../views/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
