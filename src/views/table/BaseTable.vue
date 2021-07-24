<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <span>基础表格</span>
      </div>
      <!--筛选条件-->
      <div class="filter-box mb20">
        <el-button type="primary" icon="delete" @click="delData">批量删除</el-button>

        <el-select v-model="conditions.abnormal" placeholder="是否异常" class="ml10  mr10">
          <el-option key="0" label="全部异常" value="0"></el-option>
          <el-option key="1" label="是" value="1"></el-option>
          <el-option key="2" label="否" value="2"></el-option>
        </el-select>
        <el-date-picker class="mr10" style="width:480px"
                        v-model="conditions.time"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
        </el-date-picker>
        <el-input v-model="conditions.text" placeholder="筛选关键词" class=" mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <!--筛选条件 end-->
      <v-table
        ref="table"
        :columns="tabelColumns"
        :data-method="getData"
      ></v-table>

    </el-card>
  </div>

</template>

<script>
  import * as Api from '@/api/api';
  import VTable from '@/components/VTable';

  export default {
    name: 'BaseTable',
    components: {VTable},
    data() {
      return {
        tabelColumns: [],
        conditions: {},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    created() {
    },
    computed: {},
    mounted() {
    },
    methods: {
      initTable() {
        this.tabelColumns = [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址2'},
          {prop: 'operate', label: '操作', type: 'operate', slot: 'button'}
        ];
      },
      getData() {
        return Api.getTableList();
      },
      delData() {
        this.$refs.table.delData()
      },
      search() {
        this.$message.success(`搜索条件 ${JSON.stringify(this.conditions)} `);
      }
    }
  }

</script>
