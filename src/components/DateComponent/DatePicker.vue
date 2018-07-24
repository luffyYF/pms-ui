<template>
  <el-date-picker
    v-model="filterDate"
    type="daterange"
    :picker-options="pickerOptions"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"
    size="mini"
    @change="handlerChange"
    align="right">
  </el-date-picker>
</template>

<script>
import Moment from 'Moment'
  export default {
    props: ['value'],
    // watch: {
    //   value: function () {
    //     if (this.value) {
    //       this.filterDate = [this.value.begin, this.value.end]
    //     }
    //   }
    // },
    data: function () {
      return {
        filterDate: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              start.setTime(start.getTime() - 3600 * 1000 * 24)
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
            text: '上个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setDate(1)
              end.setDate(end.getDate() - 1)
              start.setDate(1)
              start.setMonth(start.getMonth() - 1)
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
            text: '上年',
            onClick (picker) {
              let tempDate = new Date()
              const end = new Date(tempDate.getFullYear() - 1, 11, 31)
              const start = new Date(tempDate.getFullYear() - 1, 0, 1)
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
        console.log(value)
        // this.$emit('input', {begin: value[0], end: value[1]})
        if(value){
          this.$emit('input', {begin: value[0], end: value[1]})
        }else{
          this.filterDate = ''
          this.$emit('input', {begin: null, end: null})
        }
      }
    },
    mounted () {
      // if (this.value) {
      //   this.filterDate = [this.value.begin, this.value.end]
      // }
    }
  }
</script>
