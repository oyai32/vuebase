<template>
  <div class="table">
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
  export default {
    name: 'VTable',
    components: {},
    props: {
      // 查询表格数据的方法
      dataMethod: {
        type: Function,
        require: true,
        default: function () {
          // 样例,必须是返回一个promise方法
          return new Promise(function (resolve) {
            resolve([{
              id: '1',
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }])
          })
        }
      },
      // table每列的名字及对应的字段名
      columns: {
        type: Array,
        require: true,
        default: function () {
          // 样例数据
          return [
            {prop: 'date', label: '日期', unit: '天'},
            {prop: 'name', label: '姓名', type: 'time'},
            {prop: 'address', label: '地址', type: 'date'}
          ]
        }
      }
    },
    data() {
      return {
        tableData: [],
        cur_page: 1,
        checkOptions: [],

        del_list: [],
        editVisible: false,
        delVisible: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,
      }
    },
    created() {
      this.selTableData();
    },
    computed: {},
    mounted() {
    },
    methods: {
      selTableData() {
        this.dataMethod().then(res => {
          this.tableData = res;
        })
      },
      // 分页导航
      handleCurrentChange(val) {
        this.cur_page = val;
        this.getData();
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

      handleSelectionChange(val) {
        this.checkOptions = val;
      },
      delData() {
        let reList = JSON.parse(JSON.stringify(this.tableData));
        let delIdList = [];// 要删除的id，便于后台做删除
        for (let item of this.checkOptions) {
          reList.splice(reList.findIndex(v => v.id === item.id), 1)
          delIdList.push(item.id)
        }
        this.tableData = reList;
        this.$message.success(`删除Id ${JSON.stringify(delIdList)} `);
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

<style lang="scss">

</style>
