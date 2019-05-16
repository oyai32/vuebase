<template>
  <div class="container textPage">
    <h1 class="pageTitle">开发命名规范</h1>
    views 文件夹下面是由 以页面为单位的 vue 文件 或者 模块文件夹 组成的，放在 src 目录之下，与 components、assets 同级。
    <h2 class="pLabel mt20">views 下的文件夹命名:</h2>
    <ol class="pl30">
      <li>views 下面的文件夹代表着模块的名字</li>
      <li>由名词组成（car、order、cart）</li>
      <li>单词只能有一个（good: car order cart）（bad: carInfo carpage）</li>
      <li>尽量是名词（good: car）（bad: greet good）</li>
      <li>以小写开头（good: car）（bad: Car）</li>
    </ol>
    <h2 class="pLabel mt20">views 下的 vue 文件命名:</h2>
    <ol class="pl30">
      <li>views 下面的 vue 文件代表着页面的名字</li>
      <li>放在模块文件夹之下</li>
      <li>只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home</li>
      <li>尽量是名词</li>
      <li>大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）</li>
      <li>名字至少两个单词（good: CarDetail）（bad: Car）</li>
      <li>常用结尾单词有（Detail、Edit、List、Info、Report）</li>
      <li>以 Item 结尾的代表着组件（CarListItem、CarInfoItem）</li>
    </ol>
    <h2 class="pLabel mt20">Vue 组件的命名:</h2>
    <ol class="pl30">
      <li>组件名必须避免使用Vue保留标签名（包括HTML标签和Vue内部标签）,应该始终是多个单词,且必须使用pascal命名法，如TodoItem</li>
      <li>引用组件时<strong>禁止</strong>使用别名</li>
      <li>组件文件和组件使用相同的名字</li>
      <li>基础组件名:应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 VButton,VTable</li>
      <li>单例组件名:只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性，比如 TheHeader,TheSidebar</li>
      <li>紧密耦合的组件名:和父组件紧密耦合的子组件应该以父组件名作为前缀命名</li>
      <li>组件标签使用 kebab-case 命名如VButton使用 {{buttonHtml}}</li>
    </ol>
    <h2 class="pLabel mt20">Vue 项目中的其他命名规则:</h2>
    <ol class="pl30">
      <li>Store 中的Module 使用 camel 命名</li>
      <li>Store 中的Mutation 使用 <strong>全部大写的下划线命名法</strong></li>
      <li>Store 中的state/getters/action 使用 camel 命名</li>
      <li>prop 的定义应该尽量详细，至少需要指定其类型</li>
      <li>在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case</li>
      <li>总是用 key 配合 v-for</li>
      <li>永远不要把 v-if 和 v-for 同时用在同一个元素上</li>
      <li>指令缩写 (用 : 表示 v-bind: 和用 @ 表示 v-on:)</li>
      <li>前端路由<strong>路径使用全小写命名法</strong></li>
      <li>其他vue详细规范参考：<a href="https://cn.vuejs.org/v2/style-guide/">https://cn.vuejs.org/v2/style-guide/</a></li>
    </ol>
    <h2 class="pLabel mt20">JS变量命名:</h2>
    <ol class="pl30">
      <li>变量名、参数名、函数名、方法/属性、命名空间：必须使用camel命名法</li>
      <li>私有（保护）成员：必须以下划线_开头</li>
      <li>常量名、枚举的属性：必须使<strong>用全部大写的下划线命名法</strong>，如IS_DEBUG_ENABLED</li>
      <li>类名、枚举名：必须使用pascal命名法</li>
      <li>语义：<strong>命名同时还需要关注语义</strong>，如：</li>
      <li>变量名应当使用名词</li>
      <li>boolean类型的应当使用is、has等起头,表示其类型</li>
    </ol>
    <h2 class="pLabel mt20">CSS变量命名:</h2>
    <ol class="pl30">
      <li>css 文件名必须使用小写字母</li>
      <li>选择器必须单词全字母小写,多个单词情况下使用中划线分割</li>
      <li>class选择器必须代表相应模块或部件的内容或功能，不得以样式信息进行命名</li>
      <li>id 选择器必须保证页面唯一</li>
      <li>同一页面，应避免使用相同的 name 与 id</li>
    </ol>
  </div>
</template>

<script>
    export default {
        name: 'NormName',
        components: {},
        props: {},
        data() {
            return {
              buttonHtml: '<v-button></v-button>'
            }
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
