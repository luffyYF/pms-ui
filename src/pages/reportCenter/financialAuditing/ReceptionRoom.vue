<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
          营业日期：<el-date-picker
                      v-model="form.beginDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :clearable="false" size="mini">
                    </el-date-picker>
          至：<el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :clearable="false" size="mini">
            </el-date-picker>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="receptionRoomDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
        </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div  id="print-receptionroom">
        <div class="tavs-title">
           <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
          <h3 style="text-align:center;">接待房报表</h3>
        </div>
        <div class="tabs-contetn">
          <!-- <p style="text-align: center;">
            抵店时间：{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}
          </p> -->
        </div>
          <!-- <el-table
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="roomNumber" label="房间号"></el-table-column>
            <el-table-column prop="roomTypeName" label="房间类型"></el-table-column>
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="guestName" label="客人"></el-table-column>
            <el-table-column prop="beginDate" label="来店时间"></el-table-column>
            <el-table-column prop="endDate" label="离店时间"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="orderStatus" label="房间状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus == 'RESERVE'">预定</span>
                    <span v-else-if="scope.row.orderStatus == 'OBLIGATION'">待付款</span>
                    <span v-else-if="scope.row.orderStatus == 'CHECKIN'">在住</span>
                    <span v-else-if="scope.row.orderStatus == 'PAYMENT'">已支付</span>
                    <span v-else-if="scope.row.orderStatus == 'LEAVE'">结账离店</span>
                    <span v-else-if="scope.row.orderStatus == 'CANCEL'">取消</span>
                    <span v-else-if="scope.row.orderStatus == 'NOSHOW'">NoShow</span>
                    <span v-else>退房未结</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table> -->
          <div id="print-receptionroomTable">
            <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <thead>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td colspan="5" style="text-align: right;font-size: 14px;">抵店时间：{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #000;">房间号</th>
              <th style="border: 1px solid #000;">房间类型</th>
              <th style="border: 1px solid #000;">组单号</th>
              <th style="border: 1px solid #000;">客人</th>
              <th style="border: 1px solid #000;">来店时间</th>
              <th style="border: 1px solid #000;">离店时间</th>
              <th style="border: 1px solid #000;">操作员</th>
              <th style="border: 1px solid #000;">房间状态</th>
              <th style="border: 1px solid #000;">备注</th>
            </tr>
          </thead>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.roomTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.orderNo}}</td>
              <td style="border: 1px solid #000;">{{item.guestName}}</td>
              <td style="border: 1px solid #000;">{{item.beginDate}}</td>
              <td style="border: 1px solid #000;">{{item.endDate}}</td>
              <td style="border: 1px solid #000;">{{item.createUserName}}</td>
              <td style="border: 1px solid #000;">
                 <span v-if="item.orderStatus == 'RESERVE'">预定</span>
                  <span v-else-if="item.orderStatus == 'OBLIGATION'">待付款</span>
                  <span v-else-if="item.orderStatus == 'CHECKIN'">在住</span>
                  <span v-else-if="item.orderStatus == 'PAYMENT'">已支付</span>
                  <span v-else-if="item.orderStatus == 'LEAVE'">结账离店</span>
                  <span v-else-if="item.orderStatus == 'CANCEL'">取消</span>
                  <span v-else-if="item.orderStatus == 'NOSHOW'">NoShow</span>
                  <span v-else>退房未结</span>
              </td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="5" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          </div>
          <!-- <p style="height:60px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	打印人：	{{userInfo.realName}}</span></p> -->
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {receptionRoom} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import moment from "moment"
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      loading: false,
      form: {
        beginDate: moment().format("YYYY-MM-DD"),
        //endDate: moment().format("YYYY-MM-DD")
        endDate:moment().add(1,'days').format("YYYY-MM-DD")
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/receptionRoomExcel",
       LODOP: null
    }
  },
  created(){
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
    this.receptionRoomDate();
  },
  methods: {
    receptionRoomDate(){
      this.loading = true
      receptionRoom(this.form).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-receptionroom").innerHTML;
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
      this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      this.LODOP.NewPageA(); // 自动分页
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-receptionroomTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-receptionroom").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
   
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.beginDate + "&endDate=" + this.form.endDate);
    },
  }
}
</script>
<style scoped>
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
  margin-top: 20px;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
</style>
