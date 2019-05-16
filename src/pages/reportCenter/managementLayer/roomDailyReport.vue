<template>
  <div class="container">
    <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <el-button type="primary">PDF预览</el-button>
        <el-button type="primary" :disabled="true">导出EXCEL</el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-accountsummaryreport">
      <h3 style="text-align:center">{{activeCompany.companyName}}</h3>
      <h4 style="text-align:center">经理日报表</h4>
      <div class="table-box">
        <p style="text-align:center">打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p>
        <!-- <el-table 
          :header-cell-style="tableStyleObj" 
          :cell-style="tableStyleObj" 
          :data="listData" 
          border
          style="width: 100% margin-top:-2px;border:1px solid black;"
          :span-method="arraySpanMethod"
          :row-class-name="tableRowClassName">
          <el-table-column prop="name" align="center" label="统计项目">
            <template slot-scope="scope">
              <span>{{scope.row.project?scope.row.projectName:scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="DAY" align="center" label="今日发生"></el-table-column>
          <el-table-column prop="MONTH" align="center" label="本月累计"></el-table-column>
          <el-table-column prop="UP_MONTH" align="center" label="上月同期"></el-table-column>
          <el-table-column prop="YEAR" align="center" label="本年累计"></el-table-column>
          <el-table-column prop="UP_YEAR" align="center" label="上年同期"></el-table-column>
          <el-table-column prop="settlementAmount" align="center"  label="年增长率"></el-table-column>
        </el-table> -->
         <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th>统计项目</th>
              <th>今日发生</th>
              <th>本月累计</th>
              <th>上月同期</th>
              <th>本年累计</th>
              <!-- <th>年增长率</th> -->
            </tr>
            <tr v-for="(item, index) in listData" :key="index">
              <td v-if="item.project == true" colspan="6" style="background: oldlace;text-align: center">{{item.project?item.projectName:item.name}}</td>
              <td v-else>{{item.project?item.projectName:item.name}}</td>
              <td v-if="item.project == false">{{item.DAY}}</td>
              <td v-if="item.project == false">{{item.MONTH}}</td>
              <td v-if="item.project == false">{{item.UP_MONTH}}</td>
              <td v-if="item.project == false">{{item.YEAR}}</td>
              <!-- <td v-if="item.project == false">{{item.settlementAmount}}</td> -->
            </tr>
          </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import {reportJingLiRiBao} from "@/api/reportCenter/pmsReportFormController"
import { getLodop } from '@/utils/lodop'
import moment from "moment"
export default {
   data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD")},
      listData: [],
      selectShiftData:[],
      listCashierOperatorData:[],
      activeCompany:{},
      tableStyleObj:{
        border: '1px solid black',
        // 'border-left': '0',
        // 'border-top': '0',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
       LODOP: null
    };
  },
  created() {
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
    this.init()
  },
  methods: {
    init(){
      let self = this
      this.getList()
    },
    getList(){
      let self = this
      console.log(this.queryObj)
      reportJingLiRiBao(this.queryObj).then((data)=>{
        console.log(data)
        if(data.code == 1){
          self.listData = [];
          let typeNameObj = "";
          data.data.forEach((obj)=>{
            if(typeNameObj == "" || obj.type != typeNameObj){
              typeNameObj = obj.type
              self.listData.push({
                projectName:typeNameObj,
                project:true
              });
            }
            obj.project = false
            self.listData.push(obj);
          })
        }
      });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(row.project){
        return [1, 6];
      }
    },
    tableRowClassName({row, rowIndex}) {
      if(row.project){
        return 'warning-row';
      }
      // if (rowIndex === 1) {
        
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return '';
    },
     //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-accountsummaryreport").innerHTML;
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
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-accountsummaryreport").innerHTML);
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 200px);
  overflow-y: auto;
  border-top: 3px solid #eee;
}
.head-item {
  display: inline-block;
  padding: 0 15px;
}
.item-type {
  /* border-left:1px solid #ebeef5;
  border-right:1px solid #ebeef5; */
  margin: 0;
  line-height: 60px;
  font-size: 14px;
  color: #909399;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>


