<template>
  <div class="container">
    <p class="mt20">此页面为了演示多级面包屑及页面缓存功能</p>
    <p class="mt20">
      <el-input v-model="value"></el-input>
    </p>
    <p class="mt20">在输入框中输入文字，可显示出该页面的缓存功能。</p>
    <p class="mt20">
      <el-button type="primary" size="mini" @click="jumpPage">跳到下一页
      </el-button>
    </p>
    <p class="mt20"><span class="fb">功能描述：</span>
      <br/>
      通过点击跳到下一页按钮离开页面，再通过面包屑返回，能保持离开时的样子。
      <br/>
      若通过点击其他菜单后再进入该页面，则不会走缓存，会重新刷新该页面
      <br/> 支持this.$router.params的传参方式
    </p>
  </div>
</template>

<script>
  export default {
    name: 'JumpOne',
    components: {},
    props: {},
    data() {
      return {
        value: 'one'
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
        this.$router.push({name: 'jumpTwo', params: {text: this.value, page: 'one'}})
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
