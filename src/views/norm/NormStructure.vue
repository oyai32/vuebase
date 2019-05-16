<template>
  <pre>
    <code class="hljs css">
      ├── <span class="folder lh35">build   构建脚本目录</span>
      │ ├── <span>build.js</span>   生产环境构建脚本
      │ ├── <span>check-versions.js</span>   vue-cli中检查版本的js文件
      │ ├── <span>utils.js</span>   构建相关工具方法
      │ ├── <span>vue-loader.conf.js</span>   vue加载器的配置
      │ ├── <span>webpack.base.conf.js</span>   wabpack基础配置
      │ ├── <span>webpack.dev.conf.js</span>   wabpack开发环境配置
      │ └── <span>webpack.prod.conf.js</span>   wabpack生产环境配置
      ├── <span class="folder lh35">config   项目配置</span>
      │ ├── <span>dev.env.js</span>   开发环境变量
      │ ├── <span>index.js</span>   项目配置文件
      │ └── <span>prod.env.js</span>   生产环境变量
      ├── <span class="folder lh35">src   源码目录</span>
      │ ├── <span class="folder ">api   数据接口目录</span>
      │ │ ├── <span>api.js</span>   管理接口（可分多个文件）
      │ │ ├── <span>login.js</span>   管理登陆相关接口
      │ │ └── <span>mock.js</span>   所有mock的数据
      │ ├── <span class="folder">assets   资源目录,这里的资源会被wabpack构建</span>
      │ │ ├── <span class="folder">iconfont   字体图标文件夹</span>
      │ │ ├── <span class="folder">img   图片文件夹</span>
      │ │ ├── <span class="folder">styles   样式文件夹</span>
      │ │ │ ├── <span>base.scc</span>   基础样式（重置标签样式和一些常用样式）
      │ │ │ ├── <span>common.scc</span>   全局通用样式（自己写的或修改框架的）
      │ │ │ ├── <span>main.scc</span>   样式引用入口文件（方便App.vue统一引用样式）
      │ │ │ ├── <span>mixin.scc</span>   管理通用的样式函数
      │ │ │ └── <span>page.scc</span>   各页面单独的样式（用各个页面独有的样式标记区分）
      │ │ └── <span class="folder">theme   主题文件夹</span>
      │ │   ├── <span class="folder">dark   深色主题</span>
      │ │   ├── <span class="folder">default   默认主题</span>
      │ │   └── <span>setTheme.js</span>   设置主题的方法
      │ ├── <span class="folder">common   管理一些通用的js文件（如全局变量，工具类等）</span>
      │ │ └── <span>global.js</span>   管理全局变量
      │ ├── <span class="folder">components   公共组件目录</span>
      │ │ ├── <span>TheHeader.vue</span>   头部组件
      │ │ ├── <span>TheHome.vue</span>   布局
      │ │ ├── <span>TheSidebar.vue</span>   菜单导航组件
      │ │ └── <span>TheTags.vue</span>   标签栏组件（一般不使用）
      │ ├── <span class="folder">router   路由文件夹</span>
      │ │ └── <span>index.js</span>   路由配置
      │ ├── <span class="folder">store   vuex的管理</span>
      │ │ ├── <span class="folder">modules   管理vuex的各个模块</span>
      │ │ └── <span>store.js</span>   vuex配置
      │ ├── <span class="folder">views   页面目录</span>
      │ ├── <span>main.js</span>   入口js文件
      │ └── <span>app.vue</span>   vue根组件
      ├── <span>index.html</span>   入口页面
      ├── <span>package.json</span>   npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
      └── <span>README.md</span>   项目介绍
    </code>
  </pre>
</template>

<script>
  export default {
    name: 'NormStructure',
    components: {},
    props: {},
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .folder {
    font-weight: bold;
    font-size: 15px;
  }

  .lh35 {
    line-height: 35px;
  }

  .hljs, .cnblogs-post-body .hljs {
    font-family: "Courier New", sans-serif !important;
    font-size: 15px !important;
    line-height: 24px;
    padding: 5px;
  }

  .hljs, .cnblogs-post-body .hljs {
    display: block;
    overflow-x: auto;
    padding: .5em;
    background: #fff;
    color: #000;
  }

  pre code, .cnblogs-post-body pre code {
    display: block;
    margin: auto;
    vertical-align: auto;
    height: auto;
    line-height: 1.5;
    padding: 5px !important;
  }

  code, .cnblogs-post-body code {
    font-family: "Courier New", sans-serif !important;
    font-size: 12px !important;
    line-height: 20px;
    background-color: #f5f5f5 !important;
    border: 1px solid #ccc !important;
    padding: 0 5px !important;
    border-radius: 3px !important;
    line-height: 1.8;
    margin: 1px 5px;
    vertical-align: middle;
    display: inline-block;
  }
</style>
