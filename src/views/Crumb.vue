<template>
  <div class="container">
    <p>这是一个二级页面，为了演示二级面包屑  <el-button type="primary" size="mini" @click=" $router.push({name: 'form', params: {crumb: 'sub'}})
">跳到表单页面
    </el-button></p>

  </div>
</template>

<script>
  export default {
    name: 'Crumb',
    components: {},
    props: {},
    data() {
      return {}
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
