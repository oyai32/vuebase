<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header">
        <span>灵活配置表格（与基础表格达到的效果一致，但可复用）</span>
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
      <v-table-jsx
        ref="table"
        :columns="tabelColumns"
        :data-method="getData"
        :row-btns="rowBtns"
      ></v-table-jsx>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
      </el-dialog>

      <!-- 删除提示框 -->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDel">确 定</el-button>
            </span>
      </el-dialog>
    </el-card>
  </div>

</template>

<script>
  import * as Api from '@/api/api';
  import VTableJsx from '@/components/VTableJsx';

  export default {
    name: 'JsxTable',
    components: {VTableJsx},
    data() {
      return {
        cur_page: 1,
        del_list: [],
        editVisible: false,
        delVisible: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,
        conditions: {
          abnormal: '',
          text: '',
          time: ''
        },
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
      this.initTable();
    },
    computed: {},
    mounted() {
    },
    methods: {
      initTable() {
        this.rowBtns = [{
          name: '编辑',
          onlyIcon: true,
          icon: 'el-icon-edit',
          fn: this.handleEdit
        },
          {
            name: '询问删除',
            onlyIcon: true,
            icon: 'el-icon-delete',
            fn: this.handleDelete
          }, {
            name: '直接删除',
            type: 'danger',
            size: 'mini',
            fn: this.deleteRow
          }]
        this.tabelColumns = [
          {prop: 'date', label: '日期2'},
          {prop: 'name', label: '姓名2'},
          {prop: 'address', label: '地址2'},
          {prop: 'operate', label: '操作2', btns: this.rowBtns}
        ];
      },
      handleEdit({index, row}) {
        this.idx = index;
        this.form = {
          name: row.name,
          date: row.date,
          address: row.address
        }
        this.editVisible = true;
      },
      handleDelete({index}) {
        this.idx = index;
        this.delVisible = true;
      },
      // 直接删除
      deleteRow({index, rows}) {
        rows.splice(index, 1);
      },
      getData() {
        return Api.getTableList();
      },
      // 保存编辑
      saveEdit() {
        this.$refs.table.updateRow(this.idx, this.form);
        this.editVisible = false;
      },
      // 确定删除
      confirmDel() {
        this.$refs.table.delRow(this.idx);
        this.delVisible = false;
      },
      search() {
        this.$message.success(`搜索条件 ${JSON.stringify(this.conditions)} `);
      },
      delData() {
        this.$refs.table.batchDelRow();
      }
    }
  }

</script>
