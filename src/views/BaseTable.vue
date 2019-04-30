<template>
  <div class="container">
    <div class="filter-box mb20">
      <el-button type="primary" icon="delete" @click="delAll">批量删除</el-button>

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
    <el-table :data="tableData" ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="date" label="日期" sortable width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
                     title="编辑"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                     title="询问删除"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native.prevent="deleteRow(scope.$index,tableData)">直接删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination mt20">
      <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
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

  </div>
</template>

<script>
  import * as Api from '@/api/api'

  export default {
    data() {
      return {
        tableData: [],
        cur_page: 1,
        checkOptions: [],
        conditions: {
          abnormal: '',
          text: '',
          time: ''
        },
        del_list: [],
        editVisible: false,
        delVisible: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,
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
      this.getData();
    },
    computed: {},
    mounted() {
    },
    methods: {
      getData() {
        Api.getTableList().then(res => {
          this.tableData = res;
        })
      },
      // 分页导航
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
      },
      search() {
        this.$message.success(`搜索条件 ${JSON.stringify(this.conditions)} `);
      },
      formatter(row, column) {
        return row.address;
      },
      handleEdit(index, row) {
        this.idx = index;
        const item = this.tableData[index];
        this.form = {
          name: item.name,
          date: item.date,
          address: item.address
        }
        this.editVisible = true;
      },
      handleDelete(index, row) {
        this.idx = index;
        this.delVisible = true;
      },
      delAll() {
        let reList = JSON.parse(JSON.stringify(this.tableData));
        let delIdList = [];// 要删除的id，便于后台做删除
        for (let item of this.checkOptions) {
          reList.splice(reList.findIndex(v => v.id === item.id), 1)
          delIdList.push(item.id)
        }
        this.tableData = reList;
        this.$message.success(`删除Id ${JSON.stringify(delIdList)} `);
      },
      handleSelectionChange(val) {
        this.checkOptions = val;
      },
      // 保存编辑
      saveEdit() {
        this.$set(this.tableData, this.idx, this.form);
        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      },
      // 确定删除
      confirmDel() {
        this.tableData.splice(this.idx, 1);
        this.$message.success('删除成功');
        this.delVisible = false;
      },
      // 直接删除
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }

</script>
