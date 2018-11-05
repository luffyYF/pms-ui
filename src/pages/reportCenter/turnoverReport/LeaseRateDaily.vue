<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="reportBusinessIncome"></el-date-picker>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" :disabled="true">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
      <span style="color:red">注：数据统计截止到昨天</span>
      
    </el-col>
    
    <el-col :span="24" id="print-turnoverofbusinessincome">
      <div class="tabs">
        <div class="tavs-title">
          <h3>各营业点开房数日报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            :show-summary="true"
            :summary-method="getSummaries"
            border
            style="width: 100%; margin-top: 5px">
            <!-- 遍历表头 -->
            <el-table-column prop="companyName" label="营业点" width="300" fixed></el-table-column>
            <el-table-column v-for="(y,i) in headers"  :prop="y.code" :label="y.desc" :key="i" ></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
          <p class="note_p">注：当日开房率 = 当日合计/当日可上线房</p>
          <p class="note_p2"></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {leaseRateDaily} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
export default {
  data() {
    return {
      datepicker: moment().subtract(1,'days').format("YYYY-MM-DD"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      value: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
      headers:[],
    }
  },
  created(){
    this.reportBusinessIncome();
  },
  methods: {
    reportBusinessIncome(){
      const datepicker = this.datepicker;
      leaseRateDaily({businessDate:datepicker}).then(res => {
        // console.log(res.data.tableData)
        this.headers=res.data.headers;
        this.tableData = res.data.tableData;
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          if(column.property=='leaseRate'){
            //开房率特殊统计
            sums[index] = (sums[index-2]/sums[index-1]*100).toFixed(2)
          }else{
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return  prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += ' 元';
          }
         
        } else {
          sums[index] = '-';
        }
      });
      return sums;
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-turnoverofbusinessincome").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
  }
}
</script>
<style scoped>
.exportLink{
  color: white;
  text-decoration: none;
}
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
.note_p,
.note_p1,
.note_p2{
  color:red;
  margin:5px;
}
.note_p1{
  padding-left:28px;
}
.note_p2{
  padding-left:28px;
  margin-bottom:65px
}
</style>


