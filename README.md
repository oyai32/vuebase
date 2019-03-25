# 后台管理系统前端base框架

> 在网上有很多后台管理系统的案例，但看来看去不是太复杂就是太简单，始终没有一版是完全适合自己的，所以只有自己写了。参考了许多例子，写了这个符合本人当前需求的框架，不知是否也恰好是你的诉求?

####本案例的主要目的是：构建管理系统的base框架（前端）
>基于vue全家桶，element-ui
####主要实现的功能：
>登录拦截、注销用户、全局面包屑\

>现在是基础基础版，后续推出深浅主题切换功能...

####主要使用的插件
>vue-router (路由)\
>vue-bus (负责与业务无关的组件信息传输)\
>vuex (负责用户等相关信息的存储)\
>iconfont (阿里图标库)\
>mock (模拟后端请求)\
>axios (封装了请求工具类)



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
