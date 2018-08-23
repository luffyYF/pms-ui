<template>
  <div class="container">
    <el-form :inline="true" size="mini"  class="demo-form-inline">
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
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
      <el-form-item label="项目">
        <el-select v-model="queryObj.shiftPk" placeholder="选择项目">
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
        <el-button type="primary">导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-receiptsreport">
      <h3>{{activeCompany.companyName}}</h3>
      <h4>冲减明细报表</h4>
      <div>
        <p>
          营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;
          收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span>
        </p>
        <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p>
        <el-table :data="tableData" 
        :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj" border style="width: 100%; margin:0 auto;" size="mini">
          <el-table-column prop="id" label="房号"></el-table-column>
          <el-table-column prop="name" label="客人姓名"></el-table-column>
          <el-table-column prop="amount1" label="项目名称"></el-table-column>
          <el-table-column prop="amount2" label="入账时间"></el-table-column>
          <el-table-column prop="amount3" label="消费金额"></el-table-column>
          <el-table-column prop="amount3" label="结算金额"></el-table-column>
          <el-table-column prop="amount3" label="收银员"></el-table-column>
          <el-table-column prop="amount3" label="授权人"></el-table-column>
          <el-table-column prop="amount3" label="备注"></el-table-column>
        </el-table>
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
export default {
  data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD")},
      tableData:[],
      selectShiftData:[],
      listCashierOperatorData:[],
      tableStyleObj:{
        border: '1px solid #ebeef5',
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
    print(){
      let bodyhtml = document.getElementById("print-receiptsreport").innerHTML;
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


