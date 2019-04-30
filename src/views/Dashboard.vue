<template>
  <div class="container dashboard">
    <h1 class="pageTitle">vue 开发命名规范</h1>
    <p>views 文件夹下面是由 以页面为单位的 vue 文件 或者 模块文件夹 组成的，放在 src 目录之下，与 components、assets 同级。</p>
    <h2 class="pLabel mt20">views 下的文件夹命名:</h2>
    <ol class="pl30">
      <li><p>views 下面的文件夹代表着模块的名字</p></li>
      <li><p>由名词组成（car、order、cart）</p></li>
      <li><p>单词只能有一个（good: car order cart）（bad: carInfo carpage）</p></li>
      <li><p>尽量是名词（good: car）（bad: greet good）</p></li>
      <li><p>以小写开头（good: car）（bad: Car）</p></li>
    </ol>
    <h2 class="pLabel mt20">views 下的 vue 文件命名:</h2>
    <ol class="pl30">
      <li><p>views 下面的 vue 文件代表着页面的名字</p></li>
      <li><p>放在模块文件夹之下</p></li>
      <li><p>只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home</p></li>
      <li><p>尽量是名词</p></li>
      <li><p>大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）</p></li>
      <li><p>名字至少两个单词（good: CarDetail）（bad: Car）</p></li>
      <li><p>常用结尾单词有（Detail、Edit、List、Info、Report）</p></li>
      <li><p>以 Item 结尾的代表着组件（CarListItem、CarInfoItem）</p></li>
    </ol>
    <h2 class="pLabel mt20">views 下的 vue 文件命名:</h2>
    <ol class="pl30">
      <li><p>views 下面的 vue 文件代表着页面的名字</p></li>
      <li><p>放在模块文件夹之下</p></li>
      <li><p>只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home</p></li>
      <li><p>尽量是名词</p></li>
      <li><p>大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）</p></li>
      <li><p>名字至少两个单词（good: CarDetail）（bad: Car）</p></li>
      <li><p>常用结尾单词有（Detail、Edit、List、Info、Report）</p></li>
      <li><p>以 Item 结尾的代表着组件（CarListItem、CarInfoItem）</p></li>
    </ol>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    created() {
    }
  }
</script>
<style lang="scss">
  .dashboard {
    p {
      line-height: 28px;
    }
  }
</style>
