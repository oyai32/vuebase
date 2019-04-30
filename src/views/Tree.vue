<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="10">
        <h2 class="pLabel">一次性加载的树</h2>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>

      </el-col>
      <el-col :span="10" :offset="4">
        <h2 class="pLabel">懒加载的树</h2>
        <el-tree
          :props="treeProps"
          :load="loadNode1"
          lazy
          show-checkbox>
        </el-tree>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import * as Api from '@/api/api'

  export default {
    data() {
      return {
        treeProps: {
          label: 'name',
          isLeaf: 'isLeaf' // 标记：是否为最后一层
        },
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {},
    computed: {},
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    created() {
      this.getTreeOnceData();
    },
    mounted() {

    },
    methods: {
      getTreeOnceData() {
        Api.getTreeOnce().then(res => {
          this.data2 = res;
        })
      },
      loadNode1(node, resolve) {
        if (node.level === 0) {
          Api.getFirstTree().then(res => {
            return resolve(res);
          })
        }
        if (node.level > 0) {
          let nodeId = node.id;
          Api.getTreeList({id: nodeId}).then(res => {
            return resolve(res);
          })
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
  }
</script>
<style lang="scss">
</style>
