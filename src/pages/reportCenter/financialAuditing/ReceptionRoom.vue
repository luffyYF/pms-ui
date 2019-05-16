<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
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
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="receptionRoomDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-receptionroom">
      <div class="tabs">
        <div class="tavs-title">
          <h3 style="text-align:center;">{{activeCompany.companyName}}</h3>
          <h4 style="text-align:center;">接待房报表</h4>
        </div>
        <div class="tabs-contetn">
          <p style="text-align: center;">
            抵店时间：{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}
          </p>
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
            <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th>房间号</th>
              <th>房间类型</th>
              <th>组单号</th>
              <th>客人</th>
              <th>来店时间</th>
              <th>离店时间</th>
              <th>操作员</th>
              <th>房间状态</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{item.roomNumber}}</td>
              <td>{{item.roomTypeName}}</td>
              <td>{{item.orderNo}}</td>
              <td>{{item.guestName}}</td>
              <td>{{item.beginDate}}</td>
              <td>{{item.endDate}}</td>
              <td>{{item.createUserName}}</td>
              <td>
                 <span v-if="item.orderStatus == 'RESERVE'">预定</span>
                  <span v-else-if="item.orderStatus == 'OBLIGATION'">待付款</span>
                  <span v-else-if="item.orderStatus == 'CHECKIN'">在住</span>
                  <span v-else-if="item.orderStatus == 'PAYMENT'">已支付</span>
                  <span v-else-if="item.orderStatus == 'LEAVE'">结账离店</span>
                  <span v-else-if="item.orderStatus == 'CANCEL'">取消</span>
                  <span v-else-if="item.orderStatus == 'NOSHOW'">NoShow</span>
                  <span v-else>退房未结</span>
              </td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
          <p style="height:60px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	打印人：	{{userInfo.upmsUserName}}</span></p>
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
        endDate: moment().format("YYYY-MM-DD")
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
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-receptionroom").innerHTML);
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