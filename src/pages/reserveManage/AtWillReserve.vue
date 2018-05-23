<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="250">
          <el-table-column
            fixed
            prop="date"
            align="center"
            width="250"
            label="2018-06-06"
            :render-header="renderDate">
            <el-table-column align="center" width="250" :render-header="renderHeader">
            </el-table-column>
          </el-table-column>
          <el-table-column v-for="item in tableColumnData" :label="item.label" v-bind:key="item.label" align="center" >
            <el-table-column header-row-class-name="headerRowClassName()"
              :prop="item.prop"
              align="center"
              :label="item.cycle">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
var moment = require('moment');
export default {
  data () {
    return {
      weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      tableColumnData:[],
      tableData:[],
      value1:'2018-06-08'
    }
  },
  created () {
    this.getColumnData()
  },
  methods: {
    getColumnData(){
      const self = this
      for(let i=0; i<10; i++){
        let dates = moment().add(i, 'days');
        let prop = dates.format("MMDD");  // 0 to 11
        let label = dates.format("MM-DD");
        console.log(label)
        // moment().day(10);
        let cycle = dates.day();
        self.tableColumnData.push({
          prop:prop,
          label:label,
          cycle:self.weekdays[cycle],
          cycleI:cycle
        });
      }
      if(self.tableColumnData.length > 0){
        self.tableColumnData[0].cycle = "今";
      }
    },
    renderDate(createElement, { _self }) {
      return createElement(
        'div',
        {
          'class': 'renderTableHead'
        },
        [
          createElement('el-button', {
            attrs: { 
              type: 'text',
            },
            on: {click: this.handleDate }
          }, [this.value1])
        ]
      );
    },
    renderHeader(createElement, { _self }) {
      return createElement(
        'div',
        {
          'class': 'renderTableHead'
        },
        [
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader1 }
          }, ['前10天']
          ),
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader2 }
          }, ['今天']
          ),
          createElement('el-button', {
            attrs: { type: 'text' },
            on: { click: this.handleHeader3 }
          }, ['后10天']
          )
        ]
      );
    },
    handleDate(){},
    handleHeader1(){},
    handleHeader2(){},
    handleHeader3(){},
  }
}
</script>

<style scoped>
.table-heweek{
  color:#F60;
}
.el-table th.is-hidden>*{
  visibility: initial;
}
.el-table th div{
  overflow: -webkit-paged-x;
}
</style>
