<template>
  <div class="container">
    <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item label="开始营业日：">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束营业日：">
        <el-date-picker
          v-model="queryObj.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收银员">
        <el-select v-model="queryObj.userPk" placeholder="选择收银员">
          <el-option  label="全部" value=""></el-option>
          <el-option
      v-for="item in listCashierOperatorData"
      :key="item.userPk"
      :label="item.userName"
      :value="item.userPk"></el-option>
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
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <el-button type="primary">PDF预览</el-button>
        <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk" class="exportLink" target="_blank">导出EXCEL</a></el-button>
        <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-accountsummaryreport">
       <h3>{{activeCompany.companyName}}</h3>
      <h4>收银入账汇总报表</h4>
      <div class="table-box">
        <p>
          营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;
          收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span>
        </p>
        <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.userName}}</span></p>
        <el-table 
          :header-cell-style="tableStyleObj" 
          :cell-style="tableStyleObj" 
          :data="listData" 
          border
          style="width: 100% margin-top:-2px;"
          :span-method="arraySpanMethod"
          :row-class-name="tableRowClassName">
          <el-table-column prop="createUserName" align="center" label="收银员">
            <template slot-scope="scope">
              <span>{{scope.row.project?scope.row.projectName:scope.row.createUserName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderGuestNo" align="center" label="组单"></el-table-column>
          <el-table-column prop="orderNo" align="center" label="客单"></el-table-column>
          <el-table-column prop="roomNumber" align="center" label="房号"></el-table-column>
          <el-table-column prop="memName" align="center" label="姓名"></el-table-column>
          <el-table-column prop="consumptionAmount" align="center" label="消费金额"></el-table-column>
          <el-table-column prop="settlementAmount" align="center"  label="结算金额"></el-table-column>
          <el-table-column prop="createTime" align="center" label="发生日期"></el-table-column>
          <el-table-column prop="remark" align="center" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {reportShouYinYuanHuiZong} from "@/api/reportCenter/pmsReportFormController"
import {selectShift} from "@/api/utils/pmsShiftController"
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
        padding: '8px',
        'text-align':'center'
      },baseUrl:common.baseUrl
      ,ziurl:"/pms/report/shouYinYuanHuiZongExcel?"
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
    this.userInfo = JSON.parse(localStorage.sessionInfo);
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
      listCashierOperator().then((data)=>{
        console.log(data)
        if(data.code == 1){
          self.listCashierOperatorData = data.data
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
      self.listCashierOperatorData.forEach((data)=>{
        if(data.userPk == self.queryObj.userPk){
          self.queryObj.userName = data.userName
        }
      });
      reportShouYinYuanHuiZong(this.queryObj).then((data)=>{
        console.log(data)
        if(data.code == 1){
          self.listData = [];
          let typeNameObj = "";
          data.data.forEach((obj)=>{
            if(typeNameObj == "" || obj.projectName != typeNameObj){
              typeNameObj = obj.projectName
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
.exportLink{
  color: white;
  text-decoration: none;
}
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