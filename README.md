# 后台管理系统前端base框架

> 在网上有很多后台管理系统的案例，但看来看去不是太复杂就是太简单，始终没有一版是完全适合自己的，所以只有自己写了。参考了许多例子，写了这个符合本人当前需求的框架，不知是否也恰好是你的诉求?

####本案例的主要目的是：构建管理系统的base框架（前端）
>基于vue全家桶，element-ui
####主要实现的功能：
>登录拦截、注销用户、主题切换（重点）、全局面包屑

####主要使用的插件
>vue-router (路由)\
>vue-bus (负责与业务无关的组件信息传输)\
>vuex (负责用户等相关信息的存储)\
>iconfont (阿里图标库)\
>mock (模拟后端请求)\
>axios (封装了请求工具类)

####主要特色

1、主题切换
>案例中提供两套主题：浅灰、深黑主题。\
很多案例中都有换肤，但是浅色系简单，黑色系复杂，此套换肤方法是我自己研究的，有更好的方法也欢迎留言一起讨论\
assets/theme下的文件为主题\
思路：每个主题的对应一个class名字（除default），每次切换主题是更换body的class，在该class下重写样式\

![image](https://github.com/oyai32/vuebase/blob/master/src/assets/img/darkTheme.png)

![image](https://github.com/oyai32/vuebase/blob/master/src/assets/img/grayTheme.png)

2、全局面包屑
>案例中把面包屑移到了route的上一个页面中，即子页面不维护单独的页面导航，统一在Home.vue中维护\
>提供多级面包屑

3、mock配了多种情况
>方便mock不同情况的数据，本案例中没有连接数据库，但通过mock模拟的登陆的多种情况

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

