<template>
  <div class="wrapper">
    <the-header></the-header>
    <the-sidebar></the-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) of crumbList" :key="index" :to="{ path:item.path }">{{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="keepAlivePages" :max="keepAliveMax">
            <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import TheHeader from './TheHeader.vue';
  import TheSidebar from './TheSidebar.vue';
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        collapse: false,
        isRouterAlive: true
      }
    },
    components: {
      TheHeader, TheSidebar
    },
    created() {
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    computed: {
      ...mapState('common', ['crumbList', 'reloadFlag', 'keepAlivePages', 'keepAliveMax'])
    },
    watch: {
      // 监听重载标记，改变则重载
      reloadFlag() {
        this.reload()
      }
    }
  }
</script>
