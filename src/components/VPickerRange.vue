<!--时间范围插件-->
<template>
  <el-date-picker
    v-model="time"
    :value-format="formatter"
    :type="type"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    :default-time="defaultTime"
    @change="changeCallBack"
  >
  </el-date-picker>
</template>

<script>
  export default {
    name: 'VPickerRange',
    components: {},
    props: {
      // 开始时间
      startTime: {
        type: String,
        default: ''
      },
      // 结束时间
      endTime: {
        type: String,
        default: ''
      },
      // 默认只日期
      type: {
        type: String,
        default: 'daterange'
      },
      // 默认日期类型 today/yesterday/tomorrow/no
      defaultDateType: {
        type: String,
        default: 'no'
      },
      // 若只选择日期，默认的时间尾巴（只在type为datetimerange时有效）
      defaultTime: {
        type: Array,
        default: function () {
          return ['00:00:00', '23:59:59'];
        }
      },
      // el-date-picker 的格式
      formatter: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      // 禁选规则，默认不禁用，具体参数见方法：dealDisabledRule
      disabledRule: {
        type: String,
        default: 'no'
      },
      disabledRuleFn: {
        type: Function,
        default: function () {
          // 需要return值，参考dealDisabledRule
        }
      },
      // 改变时间后的回调方法
      changeCallBack: {
        type: Function,
        default: function () {

        }
      }
    },
    data() {
      return {
        time: '',
        pickerOptions: {},
        momentFormatter: '' // moment的格式
      }
    },
    created() {
      this.initData();
      this.initTimeRange();
    },
    mounted() {

    },
    methods: {
      initData() {
        // 由于el-date-picker的formatter和moment的formatter不一样，所以要做处理
        let formatter = this.formatter.replace('yyyy', 'YYYY').replace('dd', 'DD');
        this.momentFormatter = formatter;
        if (this.startTime && this.endTime) {
          this.time = [this.startTime, this.endTime];
        } else if (this.defaultDateType) {
          let startTime = '';
          let endTime = '';
          switch (this.defaultDateType) {
            case 'today':
              startTime = this.$moment().format('YYYY-MM-DD 00:00:00');
              endTime = this.$moment().format('YYYY-MM-DD 23:59:59');
              break;
            case 'yesterday':
              startTime = this.$moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
              endTime = this.$moment().subtract(1, 'days').format('YYYY-MM-DD 23:59:59');
              break;
            case 'tomorrow':
              startTime = this.$moment().add(1, 'days').format('YYYY-MM-DD 00:00:00');
              endTime = this.$moment().add(1, 'days').format('YYYY-MM-DD 23:59:59');
              break;
            case 'lastWeek': // 上个7天
              startTime = this.$moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
              endTime = this.$moment().format('YYYY-MM-DD 23:59:59');
              break;
            case 'nextWeek': // 下个7天
              startTime = this.$moment().format('YYYY-MM-DD 00:00:00');
              endTime = this.$moment().add(7, 'days').format('YYYY-MM-DD 23:59:59');
              break;
          }
          if (startTime && endTime) {
            // 为了让格式通用，所以处理格式时用最细单位，再format为需要格式
            this.time = [this.$moment(startTime).format(this.momentFormatter), this.$moment(endTime).format(this.momentFormatter)]
          }
        }
      },
      initTimeRange() {
        const that = this;
        this.pickerOptions = {
          // 禁选今日之后的日期
          disabledDate(time) {
            return that.dealDisabledRule(time)
          },
          shortcuts: [{
            text: '最近7天',
            onClick(picker) {
              that.recentlyDay(picker, 7)
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              that.recentlyDay(picker, 30)
            }
          }, {
            text: '上周',
            onClick(picker) {
              that.lastCycle(picker, 'week')
            }
          }, {
            text: '上月',
            onClick(picker) {
              that.lastCycle(picker, 'month')
            }
          }, {
            text: '本周',
            onClick(picker) {
              that.thisCycle(picker, 'week')
            }
          }, {
            text: '本月',
            onClick(picker) {
              that.thisCycle(picker, 'month')
            }
          }, {
            text: '下周',
            onClick(picker) {
              that.nextCycle(picker, 'week')
            }
          }, {
            text: '下月',
            onClick(picker) {
              that.nextCycle(picker, 'month')
            }
          }]
        }
      },
      // 最近几天
      recentlyDay(picker, day) {
        const end = new Date(this.$moment().format('YYYY-MM-DD 23:59:59'));
        const start = new Date(this.$moment().format('YYYY-MM-DD 00:00:00'));
        start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
        picker.$emit('pick', [start, end]);
      },
      // 上周期，昨日/上周/上月/上季度/去年
      lastCycle(picker, cycleName) {
        let startDay = this.$moment().month(this.$moment().month() - 1).startOf(cycleName).valueOf();
        const start = new Date(startDay);
        let endDay = this.$moment().month(this.$moment().month() - 1).endOf(cycleName).valueOf();
        const end = new Date(endDay);
        picker.$emit('pick', [start, end]);
      },
      // 下周期，明日/下周/下月/下季度/明年
      nextCycle(picker, cycleName) {
        let startDay = this.$moment().month(this.$moment().month() + 1).startOf(cycleName).valueOf();
        const start = new Date(startDay);
        let endDay = this.$moment().month(this.$moment().month() + 1).endOf(cycleName).valueOf();
        const end = new Date(endDay);
        picker.$emit('pick', [start, end]);
      },
      // 本周期，本日/本周/本月/本季/本年
      thisCycle(picker, cycleName) {
        let startDay = this.$moment().month(this.$moment().month()).startOf(cycleName).valueOf();
        const start = new Date(startDay);
        let endDay = this.$moment().month(this.$moment().month()).endOf(cycleName).valueOf();
        const end = new Date(endDay);
        picker.$emit('pick', [start, end]);
      },
      // 处理禁选规则
      dealDisabledRule(time) {
        let rule = this.disabledRule;
        let formatter = this.momentFormatter;
        // 禁选今日之后的日期（不含今日）
        let value = ''
        switch (rule) {
          case 'after':
            value = this.Utils.dealDate(time, formatter) > this.Utils.dealDate(Date.now(), formatter)
            break;
          case 'nowAndAfter':
            value = this.Utils.dealDate(time, formatter) >= this.Utils.dealDate(Date.now(), formatter)
            break;
          case 'before':
            value = this.Utils.dealDate(time, formatter) < this.Utils.dealDate(Date.now(), formatter)
            break;
          case 'nowAndBefore':
            value = this.Utils.dealDate(time, formatter) <= this.Utils.dealDate(Date.now(), formatter)
            break;
          case 'no':
            value = false
            break;
          default:
            value = this.disabledRuleFn()
        }
        return value;
      },
      // 获取得当前时间框里的时间
      getTimeObj(startName = 'startTime', endName = 'endTime') {
        // 返回对象格式
        return this.Utils.dealTimeArr(this.time, startName, endName)
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss">

</style>
