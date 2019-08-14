const app = {
  state: {
    keepAlive: []
  },
  mutations: {
    SET_KEEP_ALIVE: (state, data) => {
      state.keepAlive = data
    }
  },
  actions: {
    changeKeepAlive: ({commit, state}, name) => {
      // 由于vue的文件名首字母大写，导致默认生成的vue文件的name为大写，但是router中的name为小写
      // keepAlive中的name要与vue文件中name一致，所以此处做下转换
      name = name.replace(name[0], name[0].toUpperCase());
      let keepAlive = [...state.keepAlive]
      console.log('name', name, JSON.stringify(state.keepAlive))
      if (name && !keepAlive.includes(name)) {
        keepAlive.push(name)
      }
      console.log('keepAlive', JSON.stringify(keepAlive))
      commit('SET_KEEP_ALIVE', keepAlive)
    },
    clearKeepAlive: ({commit, state}) => {
      commit('SET_KEEP_ALIVE', [])
    }
  }
}
export default app
