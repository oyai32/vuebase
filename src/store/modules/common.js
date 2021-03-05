const common = {
  namespaced: true, // 避免命名冲突
  state: {
    reloadFlag: '1', // 刷新标记
    keepAliveMax: 10,
    keepAlivePages: [], // 需缓存的页面的vueName
    keepAliveParams: {}, // 当前keepAlive对应的页面的参数
    crumbList: [],
    activePage: ''// 默认选中的页面
  },
  mutations: {
    ADD_KEEP_ALIVE_PAGES: (state, {vueName, paramStr}) => {
      state.keepAlivePages.push(vueName);
      state.keepAliveParams[vueName] = paramStr
      if (state.keepAlivePages.length > state.keepAliveMax) {
        let pageName = state.keepAlivePages.shift();
        delete state.keepAliveParams[pageName]
      }
    },
    DEL_KEEP_ALIVE_PAGES: (state, vueName) => {
      let pageName = state.keepAlivePages.splice(state.keepAlivePages.findIndex(v => v === vueName), 1)
      delete state.keepAliveParams[pageName]
    },
    SET_CURMB_LIST: (state, data) => {
      state.crumbList = data
      state.activePage = data[0].name
      window.sessionStorage.setItem('crumbList', JSON.stringify(data))
    },
    SET_RELOAD_FLAG(state, data) {
      state.reloadFlag = data
    }
  },
  actions: {
    reload({commit}) {
      // 通过赋值时间戳，使得数据变化
      commit('SET_RELOAD_FLAG', new Date().valueOf())
    },
    // 加入keepAlive
    addKeepAlive: ({commit, state}, data) => {
      commit('ADD_KEEP_ALIVE_PAGES', data)
    },
    // 移除keepAlive
    removeKeepAlive: ({commit}, vueName) => {
      commit('DEL_KEEP_ALIVE_PAGES', vueName)
    },
    // 设置面包屑的数据
    setCrumb: ({commit, state}, to) => {
      const {path, name, params, meta} = to
      let pageDetail = params.pageDetail;
      let title = pageDetail ? `${meta.title} [${pageDetail}]` : meta.title
      let crumb = {title, path, name, params}
      let crumbList = [...state.crumbList]
      if (crumbList.length > 0) { // 存在多级面包屑时
        let idx = crumbList.findIndex(item => item.name === crumb.name)
        // 如果面包屑里已经存在,则是回退（从原面包屑里删）
        if (idx > -1) {
          crumbList = crumbList.slice(0, idx + 1)
        } else {
          // 若是次级页面
          if (to.meta.type === 'sub' || to.params.crumb === 'sub') {
            crumbList.push(crumb)
          } else {
            crumbList = [crumb]
          }
        }
      } else {
        crumbList = [crumb]
      }
      commit('SET_CURMB_LIST', crumbList)
    }
  }
}

export default common
