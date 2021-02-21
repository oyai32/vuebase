<template>
  <div class="container">
    <el-select v-model="themeV" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.key"
        :label="item.name"
        :value="item.key">
      </el-option>
    </el-select>
    <h2 class="pLabel mt20">标题</h2>

    <el-row class="mt20">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-row class="mt20">
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </el-row>
    <el-row class="mt20">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row class="mt20">
      <el-button plain disabled>朴素按钮</el-button>
      <el-button type="primary" plain disabled>主要按钮</el-button>
      <el-button type="success" plain disabled>成功按钮</el-button>
      <el-button type="info" plain disabled>信息按钮</el-button>
      <el-button type="warning" plain disabled>警告按钮</el-button>
      <el-button type="danger" plain disabled>危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
  import {themeList} from '@/assets/theme/setTheme.js';
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        themeV: '',
        options: themeList
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'theme'
      ])
    },
    created() {
      this.themeV = this.theme;
    },
    watch: {
      themeV(d) {
        this.changeTheme(d)
      }
    },
    mounted() {

    },
    methods: {
      changeTheme(d) {
        this.$store.dispatch('user/ChangeTheme', d)
      }
    }
  }
</script>
<style lang="scss">
</style>
