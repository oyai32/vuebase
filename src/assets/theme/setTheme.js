/**
 * 使用此方法设置主题
 *
 * 新增主题需先在此处引入新主题的.scss文件，再在themeConfig里配置主题相关组件颜色
 */

// 先加载所有的主题
import './default/element-variables.scss';
// import './bootstrap/element-variables.scss';
// import './dark/element-variables.scss';

// 默认主题
export const defaultTheme = 'default';

/**
 *  配置组件样式
 *  (使用变量名改变样式的组件，如侧边菜单栏)
 */
let themeConfig = {
  // key为主题名
  'bootstrap': {
    // 侧边菜单栏
    sidebar: {
      backgroundColor: '#FFFFFF',
      textColor: '#606266',
      activeTextColor: '#2776C9'
    },
    // 头部
    header: {
      backgroundColor: '#337AB7'
    }
  },
  'dark': {
    // 侧边菜单栏
    sidebar: {
      backgroundColor: 'rgba(0,0,0,0)',
      textColor: '#718BAD',
      activeTextColor: '#fff'
    },
    // 头部
    header: {
      backgroundColor: 'rgba(0,0,0,0)'
    }
  }
}

export const setTheme = (themeName = defaultTheme) => {
  let key = 'themeProperty';
  if (themeName === 'default') {
    // 移除之前主题的属性
    window.localStorage.removeItem(key)
    if (document.body.className) document.body.className = ''
  } else {
    // 把该主题的所有属性存到缓存
    window.localStorage.setItem(key, JSON.stringify(themeConfig[themeName]))
    document.body.className = themeName;
  }
}
