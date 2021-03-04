/**
 * 全局的mixin方法
 * 解决keepAlive缓存问题：
 * 规则：
 * 1、参数变化或从菜单点击，则走不缓存
 * 2、参数不变则走缓存
 */
export default {
  created() {
    const vueName = _getPageName(this.$route, this.$options)
    if (!vueName) return
    console.log('created')
    let paramStr = JSON.stringify(this.$route.params)
    // 只要是页面，则都先加入keepAlive
    this.$store.dispatch('common/addKeepAlive', {vueName, paramStr})
  },
  // 设置了keepAlive的页面才有该生命周期
  activated() {
    const vueName = _getPageName(this.$route, this.$options)
    if (!vueName) return
    // 从route中拿到该页面当前的参数（若是回退，已在路由中加上原参数）
    let paramStr = JSON.stringify(this.$route.params);
    // 拿出之前缓存该页面的参数，与之做比较
    let oldParamStr = this.$store.state.common.keepAliveParams[vueName]
    console.log('paramStr', paramStr)
    console.log('oldParamStr', oldParamStr)
    // 若不同，则刷新
    if (oldParamStr !== paramStr) {
      console.log('-----refresh')
      // 先把该页面的keepAlive删除，刷新时才能进入created方法
      this.$store.dispatch('common/removeKeepAlive', vueName)
      this.$store.dispatch('common/reload')
    }
  }
}

/**
 * 获得vue页面的name（过滤掉组件）
 * @private
 */
function _getPageName(route, options) {
  if (!route) return null
  const vueName = _nameToVueName(route.name)
  const parentVnode = options._parentVnode
  if (parentVnode) {
    let tag = parentVnode.tag.split('-').pop()
    if (vueName === tag) return vueName
  }
  return null
}

/**
 * route的name转vueName
 */
function _nameToVueName(name) {
  // 当前命名规则vue页面的name与route的name只是首字母大学的差异
  return name && name.charAt(0).toUpperCase() + name.slice(1)
}
