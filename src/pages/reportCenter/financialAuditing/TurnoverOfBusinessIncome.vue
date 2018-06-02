<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="reportBusinessIncome"></el-date-picker>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini"><a class="exportLink" :href="baseUrl+ziurl+'businessDate='+datepicker" target="_blank">导出EXCEL</a></el-button>
          <el-button type="primary" size="mini">添加到收藏夹</el-button>
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-turnoverofbusinessincome">
      <div class="tabs">
        <div class="tavs-title">
          <h3>{{activeCompany.companyName}}</h3>
          <h3>营业收入报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            border
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="projectName" label="营业项目"></el-table-column>
            <el-table-column prop="dayCumulative" label="本年实际情况">
              <template>					
                <el-table-column prop="dayCumulative" label="当日"></el-table-column>
                <el-table-column prop="monthCumulative" label="月累计"></el-table-column>
                <el-table-column prop="upMonthCumulative" label="上月累计"></el-table-column>
                <el-table-column prop="yearCumulative" label="年累计"></el-table-column>
              </template>
            </el-table-column>					
            <el-table-column prop="amount3" label="去年同期">
              <template>					
                <el-table-column prop="monthCumulativeLastYear" label="月累计"></el-table-column>
                <el-table-column prop="monthlyDifference" label="月差异"></el-table-column>
                <el-table-column prop="yearCumulativeLastYear" label="年累计"></el-table-column>
                <el-table-column prop="annualDifference" label="年差异"></el-table-column>
              </template>
            </el-table-column>		
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.userName}}</span></p>
          <p class="note_p">注：宾客账=借方总计-结算【当宾客账为负数时，代表结算大于消费，即多收客人的押金】</p>
          <p class="note_p1">自动房费：夜核房费、公寓租金</p>
          <p class="note_p1">房费调整：全日租、半日租、钟点房费、特殊房费、房费调整</p>
          <p class="note_p1">零售早餐：早餐券、正餐券、晚餐券、餐费</p>
          <p class="note_p1">客房赔偿：赔偿（通过客房赔偿添加的项目全部统计在赔偿下）</p>
          <p class="note_p1">其他消费：传真复印、其他杂费、外界租金、清洁费</p>
          <p class="note_p1">现金：现金、现金支出、收预付金、人民币押金、退预付金、杂费现金押金、公寓押金</p>
          <p class="note_p1">银行卡：银行卡、网上支付、银行卡支付、银行卡押金、杂费银行卡押金</p>
          <p class="note_p2">其他结算：退订退款、积分兑换、汇款、集团招待、优惠券、礼券、储值卡、支付宝支付等</p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {reportBusinessIncome} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
export default {
  data() {
    return {
      datepicker: moment().format("YYYY-MM-DD"),
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
      baseUrl:common.baseUrl,
      ziurl:"/pms/report/businessIncomeExcel?"
    }
  },
  created(){
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userInfo = JSON.parse(localStorage.sessionInfo);
    this.reportBusinessIncome();
  },
  methods: {
    reportBusinessIncome(){
      const datepicker = this.datepicker;
      console.log(datepicker)
      reportBusinessIncome({businessDate:datepicker}).then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
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


