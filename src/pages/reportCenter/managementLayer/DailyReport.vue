<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <!-- 营业日期：<el-date-picker v-model="datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker> -->
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="dailyReport"></el-date-picker>
        <el-button type="primary" size="mini" @click="dailyReport()">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <!-- <el-button type="primary" size="mini"><a class="exportLink" :href="baseUrl+ziurl+'date='+datepicker" target="_blank">导出EXCEL</a></el-button> -->
        <el-button type="primary" size="mini" @click="downloadExcel">导出EXCEL</el-button>
        <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
        <el-button type="primary" size="mini" @click="print">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24" id="print-dailyreport" style="padding:20px">
      <div class="tabs">
        <div class="tavs-title" style="text-align:center">
          <h3>{{activeCompany.companyName}}</h3>
          <h4>管理层日报表</h4>
        </div>
        <div class="tabs-container">
          <!-- <p style="margin: 0px">打印日期：<span>自 2018-03-09 至 2018-03-09</span>&nbsp;&nbsp;&nbsp;&nbsp;营业日期：<span>2018-03-09</span> </p> -->
          <!-- <el-table 
            :header-cell-style="tableStyleObj" 
            :cell-style="tableStyleObj" 
            :data="tableData" 
            border 
            style="width: 100%; margin-top: -5px;border:1px solid black;">
            <el-table-column prop="name" label="项目"></el-table-column>
            <el-table-column prop="day" label="当日"></el-table-column>
            <el-table-column prop="month" label="本月累计"></el-table-column>
            <el-table-column prop="year" label="本年累计"></el-table-column>
          </el-table> -->
          <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th>项目</th>
              <th>当日</th>
              <th>本月累计</th>
              <th>本年累计</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.day}}</td>
              <td>{{item.month}}</td>
              <td>{{item.year}}</td>
            </tr>
          </table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
          <p style="height:20px;color:red">注(1)：此报表为夜审报表，数据统计截止到昨天。</p>
          <p style="height:20px;color:red">注(1)：房晚数 = 夜核房晚数 + 日租房晚数 + 钟点房晚数 + 特殊房晚数 + 公寓房晚数</p>
          <p style="height:20px;color:red;padding-left:44px">应收合计 = 房租收入+其他收入</p>
          <p style="height:20px;color:red;padding-left:44px">会员房晚：会员入住的，不区分客人来源</p>
          <p style="height:20px;color:red;padding-left:44px">平均房价 = 房租收入/房晚数</p>
          <p style="height:20px;color:red;padding-left:44px">房均消费 = 应收合计/房晚数</p>
          <p style="height:20px;color:red;padding-left:44px">人均消费 = 应收合计/人晚数</p>
          <p style="height:20px;color:red;padding-left:44px;margin-bottom:50px;">出租率 = 房晚数 / (总房间数) * 100</p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {dailyMgReport} from '@/api/reportCenter'
import { getLodop } from '@/utils/lodop'
import downloadExcel from '@/components/download/downloadExcel'
import moment from "moment"

export default {
  data() {
    return {
      datepicker:  moment().format("YYYY-MM-DD"),
      datepickerTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      tableData: [],
      activeCompany:{},
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '20px',
        'color':'black',
       'border-color':'black'
      },
      // baseUrl:common.baseUrl,
      // ziurl:"/pms/report/mg/dailyExcel?"
       LODOP: null
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
    this.dailyReport();
  },
  methods: {
    dailyReport(){
      const datepicker = this.datepicker;
      console.log(datepicker)
      dailyMgReport({date: datepicker}).then(res => {
        console.log(res.data)
        this.tableData = res.data;
      });
    },
    //导出EXCEL
    downloadExcel(){
      let url = '/pms/report/mg/dailyExcel?date='+this.datepicker
      downloadExcel(url, '管理层日报表');
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-dailyreport").innerHTML;
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
      this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      //LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-dailyreport").innerHTML);
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
  padding: 20px;
  height: calc(100% - 200px);
  overflow-y: auto;
  border-top: 3px solid #eee;
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
</style>
