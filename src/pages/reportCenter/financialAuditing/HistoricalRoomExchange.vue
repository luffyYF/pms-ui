<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form ref="form" :model="form">
          换房日期：<el-date-picker v-model="form.datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
          原房号：<el-input v-model="form.srcRoomNumber" size="mini" style="width:120px"></el-input>
        </el-form>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="historyRoomExchangeDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-historicalroomexchange">
      <div class="tabs">
        <div class="tavs-title">
          <h3 style="text-align:center;">深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h4 style="text-align:center;">历史换房报表</h4>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px;text-align:center;">酒店日期：<span>{{localDate}}</span></p>
          <!-- <el-table 
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="guestName" label="客人姓名" min-width="100px"></el-table-column>
            <el-table-column prop="srcRoomNumber" label="原房号" min-width="100px"></el-table-column>
            <el-table-column prop="srcRoomTypeName" label="原房型" min-width="100px"></el-table-column>
            <el-table-column prop="srcRoomPrice" label="原房价" min-width="100px"></el-table-column>
            <el-table-column prop="targetRoomNumber" label="目的房号" min-width="100px"></el-table-column>
            <el-table-column prop="targetRoomTypeName" label="目的房型" min-width="100px"></el-table-column>
            <el-table-column prop="targetRoomPrice" label="目的房价" min-width="100px"></el-table-column>
            <el-table-column prop="changeRoomType" label="换房类型" min-width="100px"></el-table-column>
            <el-table-column prop="checkInDate" label="入住时间" min-width="100px"></el-table-column>
            <el-table-column prop="createTime" label="操作时间" min-width="100px"></el-table-column>
            <el-table-column prop="orderNo" label="组单号" min-width="100px"></el-table-column>
            <el-table-column prop="createUserName" label="操作员" min-width="100px"></el-table-column>
             <el-table-column prop="authPerson" label="授权人"></el-table-column> -->
            <!-- <el-table-column prop="remark" label="备注" min-width="100px"></el-table-column>
          </el-table> -->
          <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th>客人姓名</th>
              <th>原房号</th>
              <th>原房型</th>
              <th>原房价</th>
              <th>目的房号</th>
              <th>目的房型</th>
              <th>目的房价</th>
              <th>换房类型</th>
              <th>入住时间</th>
              <th>操作时间</th>
              <th>组单号</th>
              <th>操作员</th>
              <th>授权人</th>
              <th>备注</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{item.guestName}}</td>
              <td>{{item.srcRoomNumber}}</td>
              <td>{{item.srcRoomTypeName}}</td>
              <td>{{item.srcRoomPrice}}</td>
              <td>{{item.targetRoomNumber}}</td>
              <td>{{item.targetRoomTypeName}}</td>
              <td>{{item.targetRoomPrice}}</td>
              <td>{{item.changeRoomType}}</td>
              <td>{{item.checkInDate}}</td>
              <td>{{item.createTime}}</td>
              <td>{{item.orderNo}}</td>
              <td>{{item.createUserName}}</td>
              <td>{{item.authPerson}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
          <p style="height:60px;color:red">	注：此报表在2017年-11月升级后，新操作的换房数据才会显示房型、换房类型。</p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {historyRoomExchange} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import common from "@/api/common"
import { getLodop } from '@/utils/lodop'
import exportExcel from '@/components/download/exportExcel'
export default {
  data() {
    return {
      form: {
        datepicker: [],
        srcRoomNumber: ''
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      localDate: formatDate(new Date(), 'yyyy-MM-dd'),
      tableData: [],
      loading: false,
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/historicalRoomExchangeExcel",
       LODOP: null
    }
  },
  created(){
    let date = new Date();
    date.setDate(date.getDate() - 1)
    this.form.datepicker = [formatDate(date, 'yyyy-MM-dd'), formatDate(date, 'yyyy-MM-dd')]
    this.historyRoomExchangeDate();
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
  },
  methods: {
    historyRoomExchangeDate(){
      this.loading = true
      let data = {
        beginDate: this.form.datepicker != null ? this.form.datepicker[0] : null,
        endDate: this.form.datepicker != null ? this.form.datepicker[1] : null,
        srcRoomNumber: this.form.srcRoomNumber
      }
      historyRoomExchange(data).then(res => {
        // console.log(res.data)
        this.loading = false
        this.tableData = res.data;
      })
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-historicalroomexchange").innerHTML;
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
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-historicalroomexchange").innerHTML);
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.datepicker[0] + "&endDate=" + this.form.datepicker[1] + "&srcRoomNumber=" + this.form.srcRoomNumber);
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
  padding: 20px;
  text-align: center;
  height: calc(100% - 100px);
  overflow-y: auto;
  border-top: 3px solid #eee;

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


