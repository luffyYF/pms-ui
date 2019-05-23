<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form ref="form" :model="form" :inline="true">
          <!-- 换房日期：<el-date-picker v-model="form.datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker> -->
        <el-form-item label="开始日期">
        <el-date-picker
          v-model="form.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="form.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
          原房号：<el-input v-model="form.srcRoomNumber" size="mini" style="width:120px"></el-input>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="historyRoomExchangeDate">网页预览</el-button>
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
        <div id="print-historicalroomexchange">
        <div class="tavs-title">
          <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3 style="text-align:center;">深圳市前海豪斯菲尔信息科技有限公司</h3> -->
          <h3 style="text-align:center;">历史换房报表</h3>
        </div>
          <!-- <p style="margin: 0px;text-align:center;">酒店日期：<span>{{localDate}}</span></p> -->
        </div>
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
          <div id="print-historicalroomexchangeTable">
          <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <td colspan="7" style="text-align: left;font-size: 14px;">公司:深圳市前海豪斯菲尔信息科技有限公司</td>
              <td colspan="7" style="text-align: right;font-size: 14px;">酒店日期：<span>{{localDate}}</span></td>
            </tr>
            <tr>
              <th style="width:8%;border: 1px solid #000;">客人姓名</th>
              <th style="width:6%;border: 1px solid #000;">原房号</th>
              <th style="width:6%;border: 1px solid #000;">原房型</th>
              <th style="width:6%;border: 1px solid #000;">原房价</th>
              <th style="width:8%;border: 1px solid #000;">目的房号</th>
              <th style="width:8%;border: 1px solid #000;">目的房型</th>
              <th style="width:8%;border: 1px solid #000;">目的房价</th>
              <th style="width:8%;border: 1px solid #000;">换房类型</th>
              <th style="width:8%;border: 1px solid #000;">入住时间</th>
              <th style="width:8%;border: 1px solid #000;">操作时间</th>
              <th style="width:6%;border: 1px solid #000;">组单号</th>
              <th style="width:7%;border: 1px solid #000;">操作员</th>
              <th style="width:7%;border: 1px solid #000;">授权人</th>
              <th style="width:7%;border: 1px solid #000;">备注</th>
            </tr>
          </thead>
            <!-- <tr>
              <th style="width:8%;border: 1px solid #000;">客人姓名</th>
              <th style="width:6%;border: 1px solid #000;">原房号</th>
              <th style="width:6%;border: 1px solid #000;">原房型</th>
              <th style="width:6%;border: 1px solid #000;">原房价</th>
              <th style="width:8%;border: 1px solid #000;">目的房号</th>
              <th style="width:8%;border: 1px solid #000;">目的房型</th>
              <th style="width:8%;border: 1px solid #000;">目的房价</th>
              <th style="width:8%;border: 1px solid #000;">换房类型</th>
              <th style="width:8%;border: 1px solid #000;">入住时间</th>
              <th style="width:8%;border: 1px solid #000;">操作时间</th>
              <th style="width:6%;border: 1px solid #000;">组单号</th>
              <th style="width:7%;border: 1px solid #000;">操作员</th>
              <th style="width:7%;border: 1px solid #000;">授权人</th>
              <th style="width:7%;border: 1px solid #000;">备注</th>
            </tr> -->
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.guestName}}</td>
              <td style="border: 1px solid #000;">{{item.srcRoomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.srcRoomTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.srcRoomPrice}}</td>
              <td style="border: 1px solid #000;">{{item.targetRoomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.targetRoomTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.targetRoomPrice}}</td>
              <td style="border: 1px solid #000;">{{item.changeRoomType}}</td>
              <td style="border: 1px solid #000;">{{item.checkInDate}}</td>
              <td style="border: 1px solid #000;">{{item.createTime}}</td>
              <td style="border: 1px solid #000;">{{item.orderNo}}</td>
              <td style="border: 1px solid #000;">{{item.createUserName}}</td>
              <td style="border: 1px solid #000;">{{item.authPerson}}</td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="7" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="7" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          <!-- <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.realName}}</span></p> -->
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
import moment from "moment"
export default {
  data() {
    return {
      form: {
        // datepicker: [],
        begin:moment().format("YYYY-MM-DD"),
        end:moment().add(1,'days').format("YYYY-MM-DD"),
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
    // this.form.datepicker = [formatDate(date, 'yyyy-MM-dd'), formatDate(date, 'yyyy-MM-dd')]
    this.historyRoomExchangeDate();
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
     var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
  },
  methods: {
    historyRoomExchangeDate(){
      this.loading = true
      let data = {
        // beginDate: this.form.datepicker != null ? this.form.datepicker[0] : null,
        // endDate: this.form.datepicker != null ? this.form.datepicker[1] : null,
        beginDate: this.form.begin != null ? this.form.begin : null,
        endDate: this.form.end != null ? this.form.end : null,
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
      // this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-historicalroomexchangeTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-historicalroomexchange").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "历史换房报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-historicalroomexchangeTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-historicalroomexchange").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
    exportReport() {
      // exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.datepicker[0] + "&endDate=" + this.form.datepicker[1] + "&srcRoomNumber=" + this.form.srcRoomNumber);
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.begin + "&endDate=" + this.form.end + "&srcRoomNumber=" + this.form.srcRoomNumber);
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


