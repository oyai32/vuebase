<template>
  <div class="sidebar">
    <!--background-color="#152739"-->
    <!--text-color="#bfcbd9" active-text-color="#2776C9"-->
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
              unique-opened router
             @select="selectFn">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  // 默认颜色
  const sidebarTheme = {
    backgroundColor: '#314156',
    textColor: '#bfcbd9',
    activeTextColor: '#66B1FF'
  }
  export default {
    data() {
      return {
        collapse: false,
        sidebarTheme: {},
        items: [
          {
            icon: 'el-icon-news',
            index: 'dashboard',
            title: '使用指南'
          },
          // {
          //   icon: 'el-icon-date',
          //   index: 'theme',
          //   title: '主题切换'
          // },
          {
            icon: 'el-icon-setting',
            index: '3',
            title: '一级菜单',
            subs: [
              {
                index: 'form',
                title: '基本表单'
              },
              {
                index: 'table',
                title: '基础表格'
              },
              {
                index: '3-2',
                title: '二级菜单',
                subs: [
                  {
                    index: 'tree',
                    title: '懒加载树'
                  }
                ]
              }
            ]
          }
        ],
        itemMap: {'dashboard': '使用指南', 'theme': '主题切换', 'form': '基本表单', 'tree': '懒加载树', 'table': '基础表格'}
      }
    },
    created() {
      this.setTheme();
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
    computed: {
      ...mapGetters([
        'userId', 'theme'
      ]),
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    watch: {
      theme() {
        this.setTheme()
      }
    },
    methods: {
      selectFn(index) {
        // bus.$emit('crumbText', this.itemMap[index]);
      },
      setTheme() {
        let key = 'themeProperty'
        let themeProperty = localStorage.getItem(key);
        if (themeProperty) {
          themeProperty = JSON.parse(themeProperty);
          if (themeProperty.sidebar) {
            this.sidebarTheme = themeProperty.sidebar;
            return;
          }
        }
        this.sidebarTheme = sidebarTheme
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
