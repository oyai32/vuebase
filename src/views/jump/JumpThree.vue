<template>
  <div class="container">
    <p class="m20 c-primary">I from {{$route.params.page}} 【{{$route.params.text}}】</p>
    <p class="mt20">
      <el-input v-model="value"></el-input>
    </p>
    <p class="mt20">
      <el-button type="primary" size="mini" @click="jumpPage">跳到下一页
      </el-button>
    </p>
    <p class="mt20">也可将菜单页面作为下级页面跳转</p>
  </div>
</template>

<script>
  export default {
    name: 'JumpThree',
    components: {},
    props: {},
    data() {
      return {
        value: 'three'
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      jumpPage() {
        this.$router.push({name: 'theme', params: {crumb: 'sub'}})
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
