<template>
  <div class="container">
    <p style="margin-top:0; margin-bottom:5px;">项目：</p>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" size="mini" checked="true" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemChange" style="height: 100px;overflow-y: auto;">
      <el-checkbox class="checkboxgrou" size="mini" v-for="item in itemList" :label="item.projectPk" :key="item.projectPk">{{item.projectName}}</el-checkbox>
    </el-checkbox-group>
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
        <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem" class="exportLink" target="_blank">导出EXCEL</a></el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-admissionaccount">
      <h3>{{activeCompany.companyName}}</h3>
      <h4>收银入账明细报表</h4>
      <p>营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span></p>
      <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.userName}}</span></p>
      <el-table
        :header-cell-style="tableStyleObj"
        :cell-style="tableStyleObj"
        :data="admissionBank"
        border style="width: 100%">
        <el-table-column prop="createUserName" align="center" label="收银员" width="80"></el-table-column>
        <el-table-column prop="projectName" align="center" label="项目"></el-table-column>
        <el-table-column prop="orderGuestNo" align="center" label="组单"></el-table-column>
        <el-table-column prop="orderNo" align="center" label="客单"></el-table-column>
        <el-table-column prop="roomNumber" align="center" label="房号"></el-table-column>
        <el-table-column prop="memName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="consumptionAmount" align="center" label="消费"></el-table-column>
        <el-table-column prop="settlementAmount" align="center"  label="结算"></el-table-column>
        <el-table-column prop="createTime" align="center" label="发生日期"></el-table-column>
        <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      </el-table>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>

  </div>
</template>

<script>
import common from "@/api/common"
import {roomStatus,reportShouYinYuanRuZhangMingXi} from "@/api/reportCenter/pmsReportFormController"
import {listProject} from "@/api/systemSet/pmsProjectController"
import {selectShift} from "@/api/utils/pmsShiftController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
import moment from "moment"

export default {
  data() {
    return {
      checkAll: false,
      checkedItem: [],
      allItemList: [],
      itemList: [],
      isIndeterminate:true,
      userInfo:{},
      admissionBank:[],
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD"),projectPks:null},
      selectShiftData:[],
      listCashierOperatorData:[],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },baseUrl:common.baseUrl
      ,ziurl:"/pms/report/shouYinYuanRuZhangMingXiExcel?"
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
        if(data.code == 1){
          self.selectShiftData = data.data
        }
      })
      listCashierOperator().then((data)=>{
        if(data.code == 1){
          self.listCashierOperatorData = data.data
        }
      })
      listProject({
        projectMaster:"CONSUMER"
      }).then((data)=>{
        if(data.code == 1){
          self.itemList = data.data
          self.itemList.forEach((data)=>{
            self.allItemList.push(data.projectPk)
            self.checkedItem.push(data.projectPk)
          })
        }
      })
      this.handleCheckAllChange();
    },
    getList(){
      let self = this
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
      this.queryObj.projectPks =JSON.stringify(this.checkedItem);
      // console.log(this.checkedItem.length);
      reportShouYinYuanRuZhangMingXi(this.queryObj).then((data)=>{
        if(data.code == 1){
          self.admissionBank =  data.data
        }
      });
    },
    handleCheckAllChange(val) {
      this.checkedItem = val ? this.allItemList : [];
      this.isIndeterminate = false;
    },
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allItemList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allItemList.length;
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-admissionaccount").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
  }
};
</script>

<style scoped>
.exportLink{
      color: white;
      text-decoration: none;
}
.container {
  height: 100%;
}
.el-checkbox {
  margin-top: 5px;
  margin-left: 30px;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 320px);
  overflow-y: auto;
  border-top: 3px solid #eee;
}
.head-item {
  display: inline-block;
  padding: 0 15px;
}

</style>
<style>
.checkboxgrou span.el-checkbox__label{
  width: 100px;
}
</style>
