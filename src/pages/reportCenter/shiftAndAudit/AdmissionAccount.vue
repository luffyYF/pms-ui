// 收银入账明细报表
<template>
  <div class="container">
    <p style="margin-top:0; margin-bottom:5px;">项目：</p>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" size="mini" :checked="true" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemChange" style="height: 100px;overflow-y: auto;">
      <el-checkbox class="checkboxgrou" size="mini" v-for="item in itemList" :label="item.projectPk" :key="item.projectPk">{{item.projectName}}</el-checkbox>
    </el-checkbox-group>
    <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item label="营业日期">
        <el-date-picker
        v-model="queryObj.begenAndEnd"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false">
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
            :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">({{ item.beginTime.substring(0,5) }}-{{item.endTime.substring(0,5)}})</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <!-- <el-button type="primary">PDF预览</el-button> -->
        <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem.join(',')" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
        <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>

    <div class="table-container" id="print-admissionaccount">
      <h3>{{activeCompany.companyName}}</h3>
      <h4>收银入账明细报表</h4>
      <p>营业日期从：{{reportBeginDate}}&nbsp;&nbsp;到&nbsp;&nbsp;{{reportEndDate}}&nbsp;&nbsp;&nbsp;&nbsp;收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span></p>
      <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.realName}}</span></p>
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
import {roomStatus,reportShouYinYuanRuZhangMingXi} from "@/api/reportCenter/pmsReportFormController"
import {listProject} from "@/api/systemSet/pmsProjectController"
import {selectShift} from "@/api/utils/pmsShiftController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
import downloadExcel from '@/components/download/downloadExcel'
import common from "@/api/common"
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
      queryObj:{ 
        userName:"",
        shift:"",
        userPk:'',
        shiftPk:'',
        begenAndEnd:[
          moment().format("YYYY-MM-DD"),
          moment().add(1,'days').format("YYYY-MM-DD"),
        ],
      },
      selectShiftData:[],
      listCashierOperatorData:[],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      reportBeginDate:null,
      reportEndDate:null,
      // baseUrl:common.baseUrl,
      // ziurl:"/pms/report/shouYinYuanRuZhangMingXiExcel?"
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
      selectShift().then((data)=>{
        self.selectShiftData = data.data
      })
      listCashierOperator().then((data)=>{
        self.listCashierOperatorData = data.data
      })
      listProject({projectMaster:"CONSUMER"}).then(data=>{
        self.itemList = data.data
        self.itemList.forEach((data)=>{
          self.allItemList.push(data.projectPk)
          self.checkedItem.push(data.projectPk)
        })
        this.getList()
      })
      this.handleCheckAllChange();
    },
    getList(){
      this.autoChagneReportDate();

      let self = this
      self.queryObj.shift = ''
      self.queryObj.userName = ''
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
       let params = {
        userName: this.queryObj.userName,
        shift: this.queryObj.shift,
        userPk: this.queryObj.userPk,
        shiftPk: this.queryObj.shiftPk,
        begin: this.queryObj.begenAndEnd[0],
        end: this.queryObj.begenAndEnd[1],
        projectPks: this.checkedItem.join(',')
      }
      reportShouYinYuanRuZhangMingXi(params).then((data)=>{
        if(data.code == 1){
          self.admissionBank =  data.data
        }
      });
    },
    /**
     * 设置报表日期显示
     */
    autoChagneReportDate() {
      let beginTime;
      let endTime;
      //循环班次
      this.selectShiftData.forEach(item=>{
        if(item.value==this.queryObj.shiftPk) {
          beginTime = item.beginTime
          endTime = item.endTime
        }
      })
      if(this.queryObj.shiftPk) {
        if(beginTime && endTime && beginTime>endTime){
          if(this.queryObj.begenAndEnd[0]==this.queryObj.begenAndEnd[1]){
            this.$set(this.queryObj.begenAndEnd, 1, moment(this.queryObj.begenAndEnd[0]).add(1,'days').format("YYYY-MM-DD"))
            this.$alert("日期已自动变更为"+this.queryObj.begenAndEnd[0]+" 至 "+this.queryObj.begenAndEnd[1],"提示",{type:'warning'});
          }
        }
        this.reportBeginDate = this.queryObj.begenAndEnd[0] + " " + beginTime.substring(0,5)
        this.reportEndDate = this.queryObj.begenAndEnd[1] + " " + endTime.substring(0,5)
      }else {
        //班次选择全部
        if(this.queryObj.begenAndEnd[0]==this.queryObj.begenAndEnd[1]) {
          this.$set(this.queryObj.begenAndEnd, 1, moment(this.queryObj.begenAndEnd[0]).add(1,'days').format("YYYY-MM-DD"))
          this.$alert("日期已自动变更为"+this.queryObj.begenAndEnd[0]+" 至 "+this.queryObj.begenAndEnd[1],"提示",{type:'warning'});
        }
        this.reportBeginDate = this.queryObj.begenAndEnd[0] + " 06:00"
        this.reportEndDate = this.queryObj.begenAndEnd[1] + " 05:59"
      }
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
    //导出EXCEL
    downloadExcel(){
      let url = '/pms/report/shouYinYuanRuZhangMingXiExcel?begin='+this.queryObj.begenAndEnd[0]+'&end='+this.queryObj.begenAndEnd[1]+'&userPk='+this.queryObj.userPk+'&userName='+this.queryObj.userName+'&shift='+this.queryObj.shift+'&shiftPk='+this.queryObj.shiftPk+'&projectPks='+this.checkedItem.join(",")
      downloadExcel(url, '收银入账明细报表');
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
