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
  </div>
</template>

<script>
  export default {
    name: 'JumpTwo',
    components: {},
    props: {},
    data() {
      return {
        value: 'two'
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {
      jumpPage() {
        this.$router.push({name: 'jumpThree', params: {text: this.value, page: 'two'}})
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
