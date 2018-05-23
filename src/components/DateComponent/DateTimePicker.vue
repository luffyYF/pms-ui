<template>
  <el-date-picker
    v-model="filterDate"
    type="datetimerange"
    value-format="yyyy-MM-dd HH:mm:ss"
    :picker-options="pickerOptions"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="handlerChange"
    align="right">
  </el-date-picker>
</template>

<script>
  export default {
    props: ['value'],
    watch: {
      value: function () {
        if (this.value) {
          this.filterDate = [this.value.begin, this.value.end]
        }
      }
    },
    data: function () {
      return {
        filterDate: [],
        pickerOptions: {
          shortcuts: [{
            text: '一小时内',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(start.getHours() - 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '三小时内',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(start.getHours() - 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '六小时内',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(start.getHours() - 6)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 89)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setDate(1)
              end.setMonth(end.getMonth() + 1)
              end.setDate(end.getDate() - 1)
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本年',
            onClick (picker) {
              let tempDate = new Date()
              const end = new Date(tempDate.getFullYear(), 11, 31)
              const start = new Date(tempDate.getFullYear(), 0, 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三年',
            onClick (picker) {
              let tempDate = new Date()
              const end = new Date(tempDate.getFullYear(), 11, 31)
              const start = new Date(tempDate.getFullYear() - 2, 0, 1)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      handlerChange (value) {
        this.$emit('input', {begin: value[0], end: value[1]})
      }
    },
    mounted () {
      if (this.value) {
        this.filterDate = [this.value.begin, this.value.end]
      }
    }
  }
</script>
