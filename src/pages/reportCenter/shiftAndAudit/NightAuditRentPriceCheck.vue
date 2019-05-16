// 夜审房费前核对报表
<template>
  <div class="container-nightAuditCheck">
    <el-button type="primary" @click="getList()" size="mini"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
    <!-- <el-button type="primary">PDF预览</el-button> -->
    <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem.join(',')" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
    <!-- <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button> -->
    <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
    <el-button type="primary" @click="print" size="mini"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>

    <div class="table-container" id="print-admissionaccount">
      <h3 style="text-align:center;">{{activeCompany.companyName}}</h3>
      <h4 style="text-align:center;">夜审房费前核对报表</h4>
      <p style="text-align:center;">营业日期：{{businessDate}}</p>
      <p style="text-align:center;">打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p>
      <!-- <el-table
        :header-cell-style="tableStyleObj"
        :cell-style="tableStyleObj"
        :data="tableData"
        border 
        style="width: 100%;border:1px solid black">
        <el-table-column prop="roomNumber" align="center" label="房号" min-width="100px"></el-table-column>
        <el-table-column prop="rentDate" align="center" width="130" label="日期" min-width="100px"></el-table-column>
        <el-table-column prop="orderNo" align="center" label="主单号" min-width="100px"></el-table-column>
        <el-table-column prop="orderGuestNo" align="center" label="客单号" min-width="100px"></el-table-column>
        <el-table-column prop="guestName" align="center" label="姓名" min-width="100px"></el-table-column>
        <el-table-column prop="checkInType" align="center" label="入住类型" min-width="100px"></el-table-column>
        <el-table-column prop="channelTypeName" align="center" label="渠道" min-width="100px"></el-table-column>
        <el-table-column prop="rentPrice" align="center" label="房租" min-width="100px"></el-table-column>
        <el-table-column prop="promotionPrice" align="center" label="优惠/促销价" min-width="100px"></el-table-column>
        <el-table-column prop="commissionPrice" align="center" label="佣金" min-width="100px"></el-table-column>
        <el-table-column prop="remark" align="center" label="备注" min-width="100px"></el-table-column>
      </el-table> -->
      <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th>房号</th>
              <th>日期</th>
              <th>主单号</th>
              <th>客单号</th>
              <th>姓名</th>
              <th>入住类型</th>
              <th>渠道</th>
              <th>房租</th>
              <th>优惠/促销价</th>
              <th>佣金</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{item.roomNumber}}</td>
              <td>{{item.rentDate}}</td>
              <td>{{item.orderNo}}</td>
              <td>{{item.orderGuestNo}}</td>
              <td>{{item.guestName}}</td>
              <td>{{item.checkInType}}</td>
              <td>{{item.channelTypeName}}</td>
              <td>{{item.rentPrice}}</td>
              <td>{{item.promotionPrice}}</td>
                <td>{{item.commissionPrice}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
      <div style="height:50px"></div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>

  </div>
</template>

<script>
import {narpCheck} from "@/api/reportCenter/pmsReportFormController"
import moment from "moment"
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      checkAll: false,
      checkedItem: [],
      isIndeterminate:true,
      userInfo:{},
      tableData:[],
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
          'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
       LODOP: null,
      // 营业日期
      businessDate:  moment().hour()<6 ? moment().subtract(1,'days').format('YYYY-MM-DD') :moment().format('YYYY-MM-DD')
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
      this.getList()
    },
    getList(){
      narpCheck().then((data)=>{
        this.tableData =  data.data
      });
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
.container-nightAuditCheck {
  height: 100%;
}
.el-checkbox {
  margin-top: 5px;
  margin-left: 30px;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 100px);
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
.container-nightAuditCheck .el-collapse-item__header{
 border-bottom-width: 0px; 
}
.container-nightAuditCheck .el-icon-arrow-right {
  float: left;
}
.container-nightAuditCheck .el-table th.gutter{
  display: table-cell!important;
}

.container-nightAuditCheck .el-table colgroup.gutter{
  display: table-cell!important;
}
</style>
