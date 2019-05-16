<template>
  <div class="container">
    <p>首页虽丑，内容不错</p>
    <p class="mt30">github地址：<a href="https://github.com/oyai32/vuebase">https://github.com/oyai32/vuebase</a></p>
    <p class="mt30">千万不要忘了star哦!</p>
    <img :src="gitImg" class="w200 mt30">
  </div>
</template>

<script>
  import gitImg from '@/assets/img/zan.jpg'

  export default {
    data: function () {
      return {
        buttonHtml: '<v-button></v-button>',
        gitImg
      }
    },
    created() {
    }
  }
</script>
