// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// 引入字体图标库
import 'element-ui/lib/theme-chalk/icon.css';
import './assets/iconfont/iconfont.css'
import bus from 'vue-bus'
import GLOBAL from './common/global.js'
import store from './store/store.js'
import * as Utils from './common/utils.js'
import moment from 'moment'
import 'moment/locale/zh-cn'
import keepAliveMixin from './mixins/keepAliveMixin.js'

Vue.mixin(keepAliveMixin)
Vue.use(ElementUI)
Vue.use(bus)

// 挂载到Vue实例上面
Vue.prototype.GLOBAL = GLOBAL
Vue.prototype.Utils = Utils
Vue.prototype.$moment = moment

if (process.env.NODE_ENV === 'development') {
  require('./api/mock');
}

router.beforeEach((to, from, next) => {
  // 用户是否登录标记
  var isLogin = Boolean(store.state.user.info)
  if (!isLogin && to.path !== '/login') {
    return next({path: '/login'})
  }

  const {crumbList} = store.state.common;
  // 若新打开的是一个非菜单页面，且面包屑里没值，则回到首页
  // 场景：（二级页面地址用新窗口打开，跳转首页）
  // 非新窗口，跳转非菜单页，仍会因缺参而报错
  if (to.meta.type === 'sub' && crumbList.length === 0) {
    return next({path: '/'})
  }

  // 若需访问的页面的参数是{}，可能是点击面包屑返回的，从面包屑中取到原来的参数
  let paramsStr = JSON.stringify(to.params)
  if (paramsStr === '{}') {
    const crumb = crumbList.find(item => item.name === to.name)
    // 是面包屑的上的页面，且有参，则带上原来的参
    if (crumb && Object.keys(crumb.params).length > 0) {
      return next({name: crumb.name, params: crumb.params})
    }
  }

  // 设置面包屑的数据
  store.dispatch('common/setCrumb', to)
  next()
})
Vue.config.productionTip = false

let vm = new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})

Vue.use({
  vm
})
