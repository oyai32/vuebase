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
  @import './assets/styles/main';
</style>
