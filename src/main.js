// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入字体图标库
import './assets/iconfont/iconfont.css'
import bus from 'vue-bus'
import GLOBAL from './common/global.js'
import store from './store/store.js'

Vue.use(ElementUI)
Vue.use(bus)

// 挂载到Vue实例上面
Vue.prototype.GLOBAL = GLOBAL

if (process.env.NODE_ENV === 'development') {
  require('./api/mock');
}

// 页面刷新时，重新赋值
if (window.sessionStorage.getItem('userData')) {
  let data = JSON.parse(window.sessionStorage.getItem('userData'));
  store.commit('SET_INFO', {name: data.name, id: data.id})
  store.commit('SET_THEME', data.theme)
}

router.beforeEach(({meta, path}, from, next) => {
  var {auth = true} = meta
  // true用户已登录， false用户未登录
  var isLogin = Boolean(store.state.user.info)
  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'})
  }
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
