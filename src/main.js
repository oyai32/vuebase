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

Vue.use(ElementUI)
Vue.use(bus)

// 挂载到Vue实例上面
Vue.prototype.GLOBAL = GLOBAL
Vue.prototype.Utils = Utils
Vue.prototype.$moment = moment

if (process.env.NODE_ENV === 'development') {
  require('./api/mock');
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
