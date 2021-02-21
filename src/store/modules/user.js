import {getUserInfo} from '@/api/login'
import {setTheme, defaultTheme} from '@/assets/theme/setTheme.js'

const user = {
  namespaced: true,
  strict: true, // 严格模式
  state: {
    info: {}
  },
  mutations: {
    // 更新state数据
    setStateAttr(state, param = {}) {
      for (let key in param) {
        state[key] = param[key];
      }
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({commit, state, dispatch}, loginForm) {
      return getUserInfo(loginForm).then(res => {
        if (res.state === 'success') {
          // 存用户数据
          dispatch('SetUserData', {name: res.name, id: res.id, theme: res.theme || defaultTheme})
        }
        return res
      })
    },
    // 设置用户数据
    SetUserData({commit, dispatch}, info) {
      commit('setStateAttr', {info})
      // 将用户信息存到本地缓存
      sessionStorage.setItem('userData', JSON.stringify(info));
      // 设置主题
      setTheme(info.theme);
    },
    // 登出
    Logout({commit}) {
      commit('setStateAttr', {info: {}})
      sessionStorage.removeItem('userData')
    },
    // 改变用户主题
    ChangeTheme({dispatch, state}, theme) {
      const {info} = state;
      info.theme = theme;
      dispatch('SetUserData', info);
      // 再将该用户选的主题存到数据库（不方便mock所以省略）
    }
  }
}

export default user
