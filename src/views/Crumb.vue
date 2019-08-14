<template>
  <div class="container">
    <el-button type="primary" size="mini" @click="jumpPage">跳到表单页面
    </el-button>
    <p class="mt20">此页面为了演示二级面包屑及页面缓存功能</p>
    <p class="mt20">
      <el-input v-model="value"></el-input>
    </p>
    <p class="mt20">在输入框中输入文字，可显示出该页面的缓存功能。</p>
    <p class="mt20"><span class="fb">功能描述：</span><br/>点击跳到表单详情页再回到该页面能保持离开前的样子。若通过点击其他菜单后再进入该页面，则不会走缓存，会重新刷新该页面</p>
  </div>
</template>

<script>
  export default {
    name: 'Crumb',
    components: {},
    props: {},
    data() {
      return {
        value: ''
      }
    },
    created() {
    },
    activated() {
    },
    mounted() {

    },
    methods: {
      jumpPage() {
        this.$router.push({name: 'form', params: {crumb: 'sub'}})
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
