// 实现登录状态持久化
export default store => {
  // 初始化store时从localStorage获取数据
  if (localStorage) {
    const userData = _getLocalData('userData')
    if (userData) {
      store.dispatch('user/SetUserData', userData)
    }
  }
  // 状态发生变化时
  store.subscribe((mutation, state) => {
    const {type, payload} = mutation;
    // 如果设置的是用户信息
    if (type === 'user/setStateAttr' && Object.keys(payload).includes('info')) {
      const {info} = payload
      if (info && Object.keys(info).length > 0) {
        localStorage.setItem('userData', JSON.stringify(info))
      } else {
        localStorage.removeItem('userData')
      }
    }
  })
}

// 获取localStorage里的数据
function _getLocalData(key) {
  return JSON.parse(localStorage.getItem(key))
}
