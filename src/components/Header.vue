<template>
  <div class="header" :style="{'background':headerTheme.backgroundColor}">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator"><img src="../assets/img/img.jpg"></div>
        <div class="user-name">{{name}}</div>
        <div class="user-logout curp" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  // 头部栏默认颜色
  const headerTheme = {
    backgroundColor: '#314156'
  }
  export default {
    data() {
      return {
        collapse: false,
        headerTheme: {}
      }
    },
    created() {
      this.setTheme();
    },
    computed: {
      ...mapGetters([
        'name', 'userId', 'theme'
      ])
    },
    watch: {
      // 如果主题改变
      theme() {
        this.setTheme();
      }
    },
    methods: {
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        this.$bus.$emit('collapse', this.collapse);
      },
      logout() {
        this.$store.dispatch('Logout');
        this.$router.push('/login');
      },
      // 设置主题颜色
      setTheme() {
        let key = 'themeProperty';
        let themeProperty = localStorage.getItem(key);
        if (themeProperty) {
          themeProperty = JSON.parse(themeProperty);
          if (themeProperty.header) {
            this.headerTheme = themeProperty.header;
            return;
          }
        }
        this.headerTheme = headerTheme;
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }

  .collapse-btn {
    float: left;
    width: 63px;
    text-align: center;
    height: 100%;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;
    margin-left: 20px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 20px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
    font-size: 16px;
  }

  .user-name {
    margin: 0 20px 0 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-logout {
    border: 1px solid #fff;
    border-radius: 18px;
    padding: 3px 18px;
    font-size: 14px;
  }

  .collapse-btn:hover {
    background: rgba(0, 0, 0, 0.15)
  }
</style>
