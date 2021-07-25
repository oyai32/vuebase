<template>
  <div class="sidebar">
    <!--background-color="#152739"-->
    <!--text-color="#bfcbd9" active-text-color="#2776C9"-->
    <el-menu class="sidebar-el-menu" :default-active="activeIndex" :collapse="collapse"
             unique-opened
             @select="selectFn">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.name" :key="item.name">
            <template slot="title">
              <i :class="['iconfont','mr5',item.icon]"></i><span slot="title">{{ getTitle(item) }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.name" :key="subItem.name">
                <template slot="title">{{ getTitle(subItem) }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.name">
                  {{ getTitle(threeItem)}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.name" :key="subItem.name">
                {{ getTitle(subItem)}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.name" :key="item.name">
            <i :class="['iconfont','mr5',item.icon]"></i><span slot="title">{{ getTitle(item)}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'

  export default {
    data() {
      return {
        collapse: false,
        // key为路由的name，value为路由的路径和title
        routeMap: {},
        activeIndex: '',
        // 定义菜单的结构，每个对象都需要有name
        items: [{
          icon: 'icon-home',
          name: 'dashboard'
        }, {
          icon: 'icon-cuowubaogao',
          name: 'norm',
          title: '开发规范',
          subs: [
            {
              name: 'normStructure'
            },
            {
              name: 'normName'
            }
          ]
        },
          {
            icon: 'icon-jingzi',
            name: 'theme'
          },
          {
            icon: 'icon-ui',
            name: 'plugin',
            title: '插件',
            subs: [
              {
                name: 'pluginTime'
              }
            ]
          },
          {
            icon: 'icon-project',
            name: 'one',
            title: '一级菜单',
            subs: [
              {
                name: 'baseForm'
              },
              {
                name: 'baseTable'
              },
              {
                name: 'jsxTable'
              },
              {
                name: 'two',
                title: '二级菜单',
                subs: [
                  {
                    name: 'tree'
                  },
                  {
                    name: 'jumpOne'
                  }
                ]
              }
            ]
          }]
      }
    },
    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      })
      let pageList = this.getAllRoutes(this.$router.options.routes);
      let routeMap = {};
      for (let item of pageList) {
        if (item.name) {
          routeMap[item.name] = {path: item.path, title: item.meta.title}
        }
      }
      this.routeMap = routeMap
    },
    computed: {
      ...mapGetters([
        'userId', 'theme'
      ]),
      ...mapState('common', ['crumbList', 'activePage'])
    },
    watch: {
      activePage: {
        handler(page) {
          this.activeIndex = page || this.items[0].name
        },
        immediate: true
      }
    },
    methods: {
      getTitle(item) {
        if (item.subs && item.subs.length > 0) return item.title
        else return this.routeMap[item.name] && this.routeMap[item.name].title
      },
      // 选中菜单的方法（点击菜单进入，需刷新页面）
      selectFn(name) {
        let crumb = this.crumbList.find(route => route.name === name)
        // 若该菜单已作为非一级页面打开，则需要重置面包屑
        if (crumb) {
          this.$store.commit('common/SET_CURMB_LIST', [crumb])
        }
        // 此处需要拿到vue文件的name，当前vue页面的name与route的name只是首字母大学的差异
        let vueName = name.charAt(0).toUpperCase() + name.slice(1)
        this.$store.dispatch('common/removeKeepAlive', vueName)
        // 由于调reload方法无法清空input的值
        // 所以，此处变换一下路由的值，使得下方的$router.push({name})可以识别到路由变化后重新渲染
        this.$router.push('/')
        this.$nextTick(() => {
          this.$router.push({name})
          this.activeIndex = name
        })
      },
      // 递归查所有既有name又有path的路由
      getAllRoutes(list) {
        let allRoutes = []
        for (let item of list) {
          if (item.children) {
            allRoutes.push(...this.getAllRoutes(item.children))
          } else if (item.path && item.name) {
            allRoutes.push(item);
          }
        }
        return allRoutes;
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    z-index: 1;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
