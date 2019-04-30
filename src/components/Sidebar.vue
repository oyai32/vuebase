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
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        collapse: false,
        // key为路由的name，value为路由的路径和title
        routeMap: {},
        activeIndex: '',
        items: [{
          icon: 'el-icon-news',
          name: 'dashboard',
          title: '使用指南'
        },
          {
            icon: 'el-icon-date',
            name: 'theme',
            title: '主题切换'
          },
          {
            icon: 'el-icon-setting',
            name: 'one',
            title: '一级菜单',
            subs: [
              {
                name: 'form',
                title: '基本表单'
              },
              {
                name: 'table',
                title: '基础表格'
              },
              {
                name: 'two',
                title: '二级菜单',
                subs: [
                  {
                    name: 'tree',
                    title: '懒加载树'
                  },
                  {
                    name: 'crumb',
                    title: '二级面包屑'
                  }
                ]
              }
            ]
          }]
      }
    },
    created() {
      this.activeIndex = this.$route.name
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      })
      let pageList = this.$router.options.routes.filter(cur => cur.name === 'menu');
      let routeMap = {};
      for (let item of pageList[0].children) {
        if (item.name) {
          routeMap[item.name] = {path: item.path, title: item.meta.title}
        }
      }
      this.routeMap = routeMap;
    },
    computed: {
      ...mapGetters([
        'userId', 'theme'
      ])
    },
    watch: {},
    methods: {
      getTitle(item) {
        console.log(JSON.stringify(item))
        if (item.subs && item.subs.length > 0) return item.title
        else return this.routeMap[item.name] && this.routeMap[item.name].title
      },
      // 选中菜单的方法
      selectFn(index, indexPath) {
        this.$router.push({name: index})
        this.activeIndex = index
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
