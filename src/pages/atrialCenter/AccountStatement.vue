<template>
  <div class="container">
    <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <el-button type="primary">PDF预览</el-button>
        <el-button type="primary">导出EXCEL</el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-accountsummaryreport">
       <h3>{{activeCompany.companyName}}</h3>
      <h4>催账报表</h4>
      <div class="table-box">
        <p>打印日期：<span class="head-item">{{sDate}}</span>打印时间：<span class="head-item">{{sTime}}</span>酒店日期：<span class="head-item">{{userInfo.realName}}</span></p>
        <p>注：余额 = 已交押金-消费总额。</p>
        <el-table 
          :header-cell-style="tableStyleObj" 
          :cell-style="tableStyleObj" 
          :data="listData" 
          border
          style="width: 100% margin-top:-2px;"
          :span-method="arraySpanMethod"
          :row-class-name="tableRowClassName">
          <el-table-column prop="orderNo" align="center" label="组单"></el-table-column>
          <el-table-column prop="roomNumber" align="center" label="房号"></el-table-column>
          <el-table-column prop="guestName" align="center" label="姓名"></el-table-column>
          <el-table-column prop="roomTypeName" align="center" label="房型"></el-table-column>
          <el-table-column align="center"  label="房价">
            <template slot-scope="props">
              {{props.row.price | unit}}
            </template>
          </el-table-column>
          <el-table-column prop="beginDate" align="center" label="入住日期"></el-table-column>
          <el-table-column prop="endDate" align="center" label="预离日期"></el-table-column>
          <el-table-column align="center" label="押金">
            <template slot-scope="props">
              {{props.row.settlementAmount | unit}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="消费总额">
            <template slot-scope="props">
              {{props.row.consumptionAmount | unit}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="余额">
            <template slot-scope="props">
              {{props.row.remainingSum | unit}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import {reportCuiZhangBaoBiao} from "@/api/reportCenter/pmsReportFormController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
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
        border: '1px solid #ebeef5',
        'border-left': '0',
        'border-top': '0',
        padding: '8px',
        'text-align':'center'
      }
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
  filters: {
    unit: function (value) {
      return value+"元"
    }
  },
  methods: {
    init(){
      let self = this
      this.getList()
    },
    getList(){
      let self = this
      console.log(this.queryObj)
      reportCuiZhangBaoBiao(this.queryObj).then((data)=>{
        console.log(data)
        if(data.code == 1){
        //   self.listData = data.data;
          data.data.forEach((obj)=>{
            obj.plusMinus = "余"
            if(obj.remainingSum < 0){
                obj.plusMinus = "欠"
                obj.remainingSum  = Math.abs(obj.remainingSum)
            }
            self.listData.push(obj);
          })
        }
      });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(row.project){
        return [1, 9];
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
    print(){
      let bodyhtml = document.getElementById("print-accountsummaryreport").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
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
  border-left:1px solid #ebeef5;
  border-right:1px solid #ebeef5;
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


