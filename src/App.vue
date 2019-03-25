<template>
  <div id="app" class="wh">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters([
        'theme'
      ])
    },
    created() {
    }
  }
</script>

<style lang="scss">
  //  由于base.scss不涉及主题颜色且会影响element组件的间距，所以单独加载
  @import './assets/styles/base';
</style>
