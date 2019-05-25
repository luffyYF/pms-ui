<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
       <el-form :inline="true" size="mini">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini"></el-date-picker>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <!-- <el-button type="primary" size="mini"><a class="exportLink" :href="baseUrl+ziurl+'businessDate='+datepicker" target="_blank">导出EXCEL</a></el-button> -->
          <el-button type="primary" size="mini" @click="downloadExcel">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
       </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs" >
        <div class="tavs-title" id="print-turnoverofbusinessincome" >
          <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
          <h3 style="text-align:center;">营业收入报表</h3>
        </div>
        <div class="tabs-contetn" id="print-turnoverofbusinessincomeTable">
          <!-- <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            border
            style="width: 100%; margin-top: 5px;border:1px solid black">
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
          </el-table> -->
           <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
             <thead>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td colspan="5" style="text-align: right;font-size: 14px;">营业日期：{{datepicker}}</td>
            </tr>
             <tr>
              <th rowspan="2" style="border: 1px solid #000;">营业项目</th>
              <th colspan="4" style="border: 1px solid #000;">本年实际情况</th>
              <th colspan="4" style="border: 1px solid #000;">去年同期</th>
            </tr>
            <tr>
              <th style="border: 1px solid #000;">当日</th>
              <th style="border: 1px solid #000;">月累计</th>
              <th style="border: 1px solid #000;">上月累计</th>
              <th style="border: 1px solid #000;">年累计</th>
              <th style="border: 1px solid #000;">月累计</th>
              <th style="border: 1px solid #000;">月差异</th>
              <th style="border: 1px solid #000;">年累计</th>
              <th style="border: 1px solid #000;">年差异</th>
            </tr>
          </thead>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.projectName}}</td>
              <td style="border: 1px solid #000;">{{item.dayCumulative}}</td>
              <td style="border: 1px solid #000;">{{item.monthCumulative}}</td>
              <td style="border: 1px solid #000;">{{item.upMonthCumulative}}</td>
              <td style="border: 1px solid #000;">{{item.yearCumulative}}</td>
              <td style="border: 1px solid #000;">{{item.monthCumulativeLastYear}}</td>
              <td style="border: 1px solid #000;">{{item.monthlyDifference}}</td>
              <td style="border: 1px solid #000;">{{item.yearCumulativeLastYear}}</td>
              <td style="border: 1px solid #000;">{{item.annualDifference}}</td>
            </tr>
            <tfoot>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="5" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          </div>
          </div>
          <!-- <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.realName}}</span></p> -->
          <p class="note_p">注：宾客账=借方总计-结算【当宾客账为负数时，代表结算大于消费，即多收客人的押金】</p>
          <p class="note_p1">自动房费：夜核房费、公寓租金</p>
          <p class="note_p1">房费调整：全日租、半日租、钟点房费、特殊房费、房费调整</p>
          <p class="note_p1">零售早餐：早餐券、正餐券、晚餐券、餐费</p>
          <p class="note_p1">客房赔偿：赔偿（通过客房赔偿添加的项目全部统计在赔偿下）</p>
          <p class="note_p1">其他消费：传真复印、其他杂费、外界租金、清洁费</p>
          <p class="note_p1">现金：现金、现金支出、收预付金、人民币押金、退预付金、杂费现金押金、公寓押金</p>
          <p class="note_p1">银行卡：银行卡、网上支付、银行卡支付、银行卡押金、杂费银行卡押金</p>
          <p class="note_p2">其他结算：退订退款、积分兑换、汇款、集团招待、优惠券、礼券、储值卡、支付宝支付等</p>


    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {reportBusinessIncome} from '@/api/reportCenter/pmsReportFormController'
import downloadExcel from '@/components/download/downloadExcel'
import moment from "moment"
import { getLodop } from '@/utils/lodop'
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
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
       LODOP: null
      // baseUrl:common.baseUrl,
      // ziurl:"/pms/report/businessIncomeExcel?"
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
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
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
    //导出EXCEL
    downloadExcel(){
      let url = '/pms/report/businessIncomeExcel?businessDate='+this.datepicker
      downloadExcel(url, '营业收入报表');
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-turnoverofbusinessincome").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // }
      print() {
      this.createOneFormPage();
      if (this.LODOP) {
        this.LODOP.PREVIEW();
      }
    },
     createOneFormPage() {
      this.LODOP=getLodop();
      if (!this.LODOP) {
        return
      }
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,803,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "营业收入报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",950,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
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
  margin-top: 20px
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


