import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import persist from './plugins/persist'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persist],
  modules: {
    user,
    app
  },
  getters: {
    name: state => state.user.info.name,
    userId: state => state.user.info.id,
    theme: state => state.user.info.theme
  }
})
