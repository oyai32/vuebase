<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) of crumbList" :key="index" :to="{ path:item.path }">{{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';

  export default {
    data() {
      return {
        tagsList: [],
        collapse: false,
        crumbList: ''
      }
    },
    components: {
      vHead, vSidebar
    },
    created() {
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      })
      this.$bus.$on('crumbList', msg => {
        this.crumbList = msg;
        // 多级面包屑
        // [{title:'第一层页面',path:'/form'},{title:'本层页面'}]
      })
    }
  }
</script>
