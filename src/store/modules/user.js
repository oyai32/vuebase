import {getUserInfo} from '@/api/login'
import {setTheme, defaultTheme} from '@/assets/theme/setTheme.js'

const user = {
  state: {
    info: '',
    theme: defaultTheme
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        getUserInfo(loginForm).then(res => {
          if (res.state === 'success') {
            // 将用户信息存入store
            commit('SET_INFO', {name: res.name, id: res.id})
            if (res.theme) {
              this.dispatch('ChangeTheme', res.theme)
            } else {
              this.dispatch('ChangeTheme', defaultTheme)
            }
            // 将用户信息存到本地缓存
            sessionStorage.setItem('userData', JSON.stringify(res));
            resolve()
          } else {
            reject(res.message)
          }
        }).catch(error => {
          reject(error)
        })
      });
    },
    // 登出
    Logout({commit, state}) {
      commit('SET_INFO', '')
      sessionStorage.removeItem('userData')
    },
    // 改变用户主题
    ChangeTheme({commit, state}, theme) {
      commit('SET_THEME', theme)
      setTheme(theme);
      // 将用户改变的主题数据，存到缓存的userData里
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      sessionStorage.setItem('userData', JSON.stringify({...userData, theme: theme}));
      // 存到数据库（不方便mock所以省略）
    }
  }
}

export default user
