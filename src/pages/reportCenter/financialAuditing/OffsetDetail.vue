<template>
  <div class="container">
    <el-form :inline="true" size="mini"  class="demo-form-inline">
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="queryObj.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收银员">
        <el-select v-model="queryObj.userPk" placeholder="选择收银员">
          <el-option  label="全部" value=""></el-option>
          <!-- <el-option
          v-for="item in listCashierOperatorData"
          :key="item.userPk"
          :label="item.userName"
          :value="item.userPk"></el-option> -->
        </el-select>     
      </el-form-item>
      <el-form-item label="班次">
        <el-select v-model="queryObj.shiftPk" placeholder="选择班次">
          <el-option label="全部" value=""></el-option>
          <el-option
          v-for="item in selectShiftData"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-select v-model="queryObj.projectPk" placeholder="选择项目">
          <el-option label="全部" value=""></el-option>
          <el-option
          v-for="item in listProjectData"
          :key="item.projectPk"
          :label="item.projectName"
          :value="item.projectPk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
       <!-- <el-button type="primary">PDF预览</el-button> -->
              <el-button type="primary" @click="exportReport">导出EXCEL</el-button>
              <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>

      </el-form-item>
    </el-form>
    <div class="table-container">
      <div id="print-receiptsreport">
         <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
      <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
      <h3 style="text-align:center;">冲减明细报表</h3>
        <!-- <p style="text-align:center;">
          营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;
          收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span>
        </p> -->
      </div>
        <!-- <p style="text-align:center;">打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.realName}}</span></p> -->
        <!-- <el-table :data="tableData"
        :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj" border style="width: 100%; margin:0 auto;border:1px solid black" size="mini">
          <el-table-column prop="roomNumber" label="房号"></el-table-column>
          <el-table-column prop="memName" label="客人姓名"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="createTime" label="入账时间"></el-table-column>
          <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
          <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
          <el-table-column prop="createUserName" label="收银员"></el-table-column>
          <el-table-column prop="amount3" label="授权人"></el-table-column> -->
           <!--<el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>  -->
        <div id="print-receiptsreportTable">
          <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <thead>
            <tr>
              <td colspan="3" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td colspan="11" style="text-align: right;font-size: 14px;" >
          营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;
          收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span></td>
            </tr>
            <tr>
              <th style="width:6%;border: 1px solid #000;">房号</th>
              <th style="width:9%;border: 1px solid #000;">客人姓名</th>
              <th style="width:10%;border: 1px solid #000;">项目名称</th>
              <th style="width:18%;border: 1px solid #000;">入账时间</th>
              <th style="width:10%;border: 1px solid #000;">消费金额</th>
              <th style="width:10%;border: 1px solid #000;">结算金额</th>
              <th style="width:8%;border: 1px solid #000;">收银员</th>
              <th style="width:10%;border: 1px solid #000;">授权人</th>
              <th style="width:10%;border: 1px solid #000;">备注</th>
            </tr>
          </thead>
            <!-- <tr>
              <th style="width:6%;border: 1px solid #000;">房号</th>
              <th style="width:9%;border: 1px solid #000;">客人姓名</th>
              <th style="width:10%;border: 1px solid #000;">项目名称</th>
              <th style="width:18%;border: 1px solid #000;">入账时间</th>
              <th style="width:10%;border: 1px solid #000;">消费金额</th>
              <th style="width:10%;border: 1px solid #000;">结算金额</th>
              <th style="width:8%;border: 1px solid #000;">收银员</th>
              <th style="width:10%;border: 1px solid #000;">授权人</th>
              <th style="width:10%;border: 1px solid #000;">备注</th>
            </tr> -->
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.memName}}</td>
              <td style="border: 1px solid #000;">{{item.projectName}}</td>
              <td style="border: 1px solid #000;">{{item.createTime|formatDate}}</td>
               <td style="border: 1px solid #000;">{{item.consumptionAmount}}</td>
              <td style="border: 1px solid #000;">{{item.settlementAmount}}</td>
              <td style="border: 1px solid #000;">{{item.createUserName}}</td>
              <td style="border: 1px solid #000;">{{item.amount3}}</td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="5" style="text-align: right;font-size: 14px;">打印日期：<span>{{sDate}}</span></td>
            </tr>
          </tfoot>
          </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {reportOffsetDetail} from '@/api/reportCenter/pmsReportFormController'
import {selectShift} from "@/api/utils/pmsShiftController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
import moment from "moment"
import { listProjects } from '@/api/systemSet/pmsProjectController'
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD"),projectPk:''},
      tableData:[],
      selectShiftData:[],
      listCashierOperatorData:[],
      listProjectData: [],
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/offsetDetailExcel",
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
      selectShift().then((data)=>{
        console.log(data)
        if(data.code == 1){
          self.selectShiftData = data.data
        }
      })
      // listCashierOperator().then((data)=>{
      //   console.log(data)
      //   if(data.code == 1){
      //     self.listCashierOperatorData = data.data
      //   }
      // })
      //加载结算项目、消费项目
      listProjects().then(res => {
        if(res.code == 1){
          self.listProjectData = res.data
        }
      })
    },
    getList(){
      let self = this
      console.log(this.queryObj)
      self.selectShiftData.forEach((data)=>{
        if(data.value == self.queryObj.shiftPk){
          self.queryObj.shift = data.label
        }
      });
      // self.listCashierOperatorData.forEach((data)=>{
      //   if(data.userPk == self.queryObj.userPk){
      //     self.queryObj.userName = data.userName
      //   }
      // });
      reportOffsetDetail(this.queryObj).then((data)=>{
        console.log(data)
        if(data.code == 1){
          self.tableData =  data.data
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-receiptsreport").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // },
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
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,803,document.getElementById("print-receiptsreportTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-receiptsreport").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "冲减明细报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-receiptsreportTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-receiptsreport").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?begin=" + this.queryObj.begin + "&end=" + this.queryObj.end + "&shiftPk=" + this.queryObj.shiftPk + "&projectPk=" + this.queryObj.projectPk + "&userPk=" + this.queryObj.userPk);
    },
  },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          if(!val){
            return ""
          }
          return moment(new Date(val)).format("YY/MM/DD HH:mm:ss")
      },
  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
  .p-r-5 {
    display: inline-block;
    padding-right: 5px;
  }
  .head-item {
    display: inline-block;
    padding: 0 15px;
  }
  .table-container {
    padding: 20px;
    text-align: center;
    border-top: 3px solid #eee;
    margin-bottom: 50px;
    overflow-y: auto;
  }
  .table-box {
    width: 800px;
    margin: 0 auto;
  }
  .mailTable {
    width: 600px;
    margin: 0 auto;
    border-left: 1px solid #999;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
  }
  .mailTable .column-left {
    border-right: 1px solid #999;
    width: 55%;
  }
  .mailTable .column-left,
  .mailTable .column-right {
    border-bottom: 1px solid #999;
    line-height: 28px;
    text-align: right;
    padding: 0 10px;
  }
</style>


