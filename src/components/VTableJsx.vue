<script type='text/jsx'>
  let tableCellContent = {
    props: {
      rowData: Object,
      col: Object,
      idx: Number,
      tableData: Array
    },
    render() {
      const btns = this.col.btns;
      return (
        <div>
          {
            btns.map(item => {
              return <el-button type={item.type || 'text'}
                                size={item.size || 'medium'}
                                icon={item.icon || ''}
                                nativeOnClick={() => item.fn({
                                  index: this.idx,
                                  row: this.rowData,
                                  rows: this.tableData
                                })}
                                title={item.name}>{item.onlyIcon ? '' : item.name}</el-button>
            })
          }
        </div>
      );
    }
  }

  export default {
    name: 'VTableJsx',
    components: {tableCellContent},
    props: {
      columns: {
        type: Array,
        require: true,
        default: function () {
          // 样例数据
          return [
            {prop: 'date', label: '日期'},
            {prop: 'name', label: '姓名'},
            {prop: 'address', label: '地址'},
            {prop: 'operate', label: '操作', btns: this.rowBtns}
          ]
        }
      },
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
      }
    },
    data() {
      return {
        tableData: [],
        checkOptions: []
      };
    },
    computed: {
      tableColumns() {
        return this.columns
      }
    },
    created() {
      this.selTableData();
    },
    methods: {
      selTableData() {
        this.dataMethod().then(res => {
          this.tableData = res;
        })
      },
      handleSelectionChange(val) {
        this.checkOptions = val;
      },
      delRow(idx) {
        this.tableData.splice(idx, 1);
        this.$message.success('删除成功');
      },
      updateRow(idx, row) {
        this.$set(this.tableData, idx, row);
        this.$message.success(`修改第 ${idx + 1} 行成功`);
      },
      batchDelRow() {
        let reList = JSON.parse(JSON.stringify(this.tableData));
        let delIdList = [];// 要删除的id，便于后台做删除
        for (let item of this.checkOptions) {
          reList.splice(reList.findIndex(v => v.id === item.id), 1)
          delIdList.push(item.id)
        }
        this.tableData = reList;
        this.$message.success(`删除Id ${JSON.stringify(delIdList)} `);
      }
    },
    render() {
      let {tableData, handleSelectionChange, tableColumns} = this;
      return (
        <div class="table">
          <el-table
            ref="multipleTable"
            data={tableData}
            on-selection-change={(val) => handleSelectionChange(val)}
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            {
              tableColumns.map((item, idx) => {
                let scopedSlots = {
                  default: ({row, $index}) => {
                    if (Array.isArray(item.btns) && item.btns.length > 0) {
                      return <table-cell-content
                        idx={$index}
                        row-data={row}
                        table-data={tableData}
                        col={item}
                      ></table-cell-content>
                    } else {
                      return row[item.prop]
                    }
                  }
                }
                return (
                  <el-table-column
                    prop={item.prop}
                    label={item.label}
                    scopedSlots={scopedSlots}
                  />
                );
              })
            }
          </el-table>
        </div>
      )
    }
  };

</script>

<style lang='scss'>

</style>
