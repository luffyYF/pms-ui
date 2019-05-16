// 营业数据明细
<template>
  <div class="container-business-detail">
    <!-- <p style="margin-top:0; margin-bottom:5px;">项目：</p> -->
    <el-collapse style="border:none">
      <el-collapse-item title="项目选择" name="4">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" size="mini" :checked="true" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedItem" @change="handleCheckedItemChange" style="height: 100px;overflow-y: auto;">
          <el-checkbox class="checkboxgrou" size="mini" v-for="item in itemList" :label="item.projectPk" :key="item.projectPk">{{item.projectName}}</el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
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
        <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem.join(',')" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
        <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div>
      <span style="color:red">注：营业日期查询包含结束日期</span>
    </div>

    <div class="table-container" id="print-admissionaccount">
      <h3 style="text-align:center">营业数据明细报表</h3>
      <!-- <h4></h4> -->
      <p style="text-align:center">分店：{{activeCompany.companyName}}&nbsp;&nbsp;&nbsp;&nbsp;
        营业日期从：{{queryObj.begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;&nbsp;
        收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;
        班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}}</span>
      </p>
      <!-- <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p> -->
      <!-- <el-table
        :header-cell-style="tableStyleObj"
        :cell-style="tableStyleObj"
        :data="admissionBank"
        border 
        style="width: 100%;border:1px solid black">
        <el-table-column prop="roomNumber" align="center" label="房号"></el-table-column>
        <el-table-column prop="beginDate" align="center" width="130" label="抵店日期"></el-table-column>
        <el-table-column prop="endDate" align="center"  width="130" label="离店日期"></el-table-column>
        <el-table-column prop="createUserName" align="center" label="收银员" min-width="80"></el-table-column>
        <el-table-column prop="projectName" align="center" label="项目"></el-table-column>
        <el-table-column prop="orderGuestNo" align="center" label="组单"></el-table-column>
        <el-table-column prop="orderNo" align="center" label="客单"></el-table-column>
        <el-table-column prop="memName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="consumptionAmount" align="center" label="消费"></el-table-column>
        <el-table-column prop="settlementAmount" align="center"  label="结算"></el-table-column>
        <el-table-column prop="businessDate" align="center" width="130" label="营业日期"></el-table-column>
        <el-table-column prop="checkInType" align="center" width="100" label="入住类型"></el-table-column>
        <el-table-column prop="channelTypeName" align="center" label="渠道"></el-table-column>
        <el-table-column prop="payment" align="center" label="支付方式">
          <template slot-scope="scope">{{paymentMap[scope.row.payment]}}</template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      </el-table> -->
         <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
            <tr>
              <th>房号</th>
              <th>抵店日期</th>
              <th>离店日期</th>
              <th>收银员</th>
              <th>项目</th>
              <th>组单</th>
              <th>客单</th>
              <th>姓名</th>
              <th>消费</th>
              <th>结算</th>
              <th>营业日期</th>
              <th>入住类型</th>
              <th>渠道</th>
              <th>支付方式</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item, index) in admissionBank" :key="index">
              <td>{{item.roomNumber}}</td>
              <td>{{item.beginDate}}</td>
              <td>{{item.endDate}}</td>
              <td>{{item.createUserName}}</td>
              <td>{{item.projectName}}</td>
              <td>{{item.orderGuestNo}}</td>
              <td>{{item.orderNo}}</td>
              <td>{{item.memName}}</td>
              <td>{{item.consumptionAmount}}</td>
              <td>{{item.settlementAmount}}</td>
              <td>{{item.businessDate}}</td>
              <td>{{item.checkInType}}</td>
              <td>{{item.channelTypeName}}</td>
              <td>{{item.payment}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
      <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
      <p class="note_p2"></p>
      <!-- <div style="height:50px"></div> -->
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>

  </div>
</template>

<script>
import {businessDeatil,businessDetailExcel} from "@/api/reportCenter/pmsReportFormController"
import {listProject} from "@/api/systemSet/pmsProjectController"
import {selectShift} from "@/api/utils/pmsShiftController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
import downloadExcel from '@/components/download/downloadExcel'
import common from "@/api/common"
import moment from "moment"
import {paymentMap} from '@/utils/orm'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      checkAll: false,
      checkedItem: [],
      allItemList: [],
      itemList: [],
      isIndeterminate:true,
      userInfo:{},
      admissionBank:[],
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().subtract(1,"days").format("YYYY-MM-DD"),end:moment().format("YYYY-MM-DD"),projectPks:null},
      selectShiftData:[],
      listCashierOperatorData:[],
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
         'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      paymentMap:paymentMap,
       LODOP: null
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
      this.queryObj.projectPks = this.checkedItem.join(',');
      // console.log(this.checkedItem.length);
      businessDeatil(this.queryObj).then((data)=>{
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
    //导出EXCEL
    downloadExcel(){
      let url = '/pms/report/businessDetailExcel?begin='+this.queryObj.begin+'&end='+this.queryObj.end+'&userPk='+this.queryObj.userPk+'&userName='+this.queryObj.userName+'&shift='+this.queryObj.shift+'&shiftPk='+this.queryObj.shiftPk+'&projectPks='+this.checkedItem.join(",")
      downloadExcel(url, '营业数据明细');
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-admissionaccount").innerHTML;
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
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-admissionaccount").innerHTML);
    }
  }
};
</script>

<style scoped>
.exportLink{
  color: white;
  text-decoration: none;
}
.container-business-detail {
  height: 100%;
}
.el-checkbox {
  margin-top: 5px;
  margin-left: 30px;
}
/* .table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 320px);
  overflow-y: auto;
  border-top: 3px solid #eee;
} */
.head-item {
  display: inline-block;
  padding: 0 15px;
}
.note_p2{
  padding-left:28px;
  margin-bottom:65px
}
</style>
<style>
.checkboxgrou span.el-checkbox__label{
  width: 100px;
}
.container-business-detail .el-collapse-item__header{
 border-bottom-width: 0px; 
}
.container-business-detail .el-icon-arrow-right {
  float: left;
}
.container-business-detail .el-table th.gutter{
  display: table-cell!important;
}

.container-business-detail .el-table colgroup.gutter{
  display: table-cell!important;
}
</style>
