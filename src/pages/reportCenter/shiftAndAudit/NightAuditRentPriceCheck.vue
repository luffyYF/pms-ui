// 夜审房费前核对报表
<template>
  <div class="container-nightAuditCheck">
    <el-button type="primary" @click="getList()" size="mini"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
    <!-- <el-button type="primary">PDF预览</el-button> -->
    <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+queryObj.begin+'&end='+queryObj.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk+'&projectPks='+checkedItem.join(',')" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
    <!-- <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button> -->
    <!-- <el-button type="primary"><span class="el-icon-star-on p-r-5"></span>添加到收藏夹</el-button> -->
    <el-button type="primary" @click="print" size="mini"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>

    <div class="table-container">
      <div id="print-admissionaccount">
      <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
      </div>
      <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
      <h3 style="text-align:center;">夜审房费前核对报表</h3>
      <!-- <p style="text-align:center;">营业日期：{{businessDate}}</p> -->
      </div>
      <!-- <p style="text-align:center;">打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.realName}}</span></p> -->
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
      <div  id="print-admissionaccountTable">
      <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
             <thead>
            <tr>
              <td colspan="6" style="text-align: left;font-size: 14px;">店铺：{{activeCompany.companyName}}</td>
              <td colspan="7" style="text-align:right;margin-left:480px">营业日期：{{businessDate}}</td>
            </tr>
          </thead>
            <tr>
              <th style="border: 1px solid #000;">房号</th>
              <th style="border: 1px solid #000;">日期</th>
              <th style="border: 1px solid #000;">主单号</th>
              <th style="border: 1px solid #000;">客单号</th>
              <th style="border: 1px solid #000;">姓名</th>
              <th style="border: 1px solid #000;">入住类型</th>
              <th style="border: 1px solid #000;">渠道</th>
              <th style="border: 1px solid #000;">房租</th>
              <th style="border: 1px solid #000;">优惠/促销价</th>
              <th style="border: 1px solid #000;">佣金</th>
              <th style="border: 1px solid #000;">备注</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.rentDate}}</td>
              <td style="border: 1px solid #000;">{{item.orderNo}}</td>
              <td style="border: 1px solid #000;">{{item.orderGuestNo}}</td>
              <td style="border: 1px solid #000;">{{item.guestName}}</td>
              <td style="border: 1px solid #000;">{{item.checkInType}}</td>
              <td style="border: 1px solid #000;">{{item.channelTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.rentPrice}}</td>
              <td style="border: 1px solid #000;">{{item.promotionPrice}}</td>
              <td style="border: 1px solid #000;">{{item.commissionPrice}}</td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
            <tfoot>
            <tr>
              <td colspan="5" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="6" style="text-align: right;font-size: 14px;">打印日期：<span>{{sDate}}</span></td>
            </tr>
          </tfoot>
          </table>
      </div>
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
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
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
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-admissionaccountTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-admissionaccount").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "夜审房费前核对报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-admissionaccountTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-admissionaccount").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
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
