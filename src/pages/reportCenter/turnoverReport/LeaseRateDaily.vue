<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini"></el-date-picker>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <el-button type="primary" size="mini" :disabled="true">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
        </el-form>
      </div>
      <div class="tips">
        <p>注：数据统计截止到昨天</p>
        <p>当日开房率 = 当日合计/当日可上线房</p>
      </div>
    </el-col>
    
    <el-col :span="24" >
      <div class="tabs">
        <div class="tavs-title"  id="print-turnoverofbusinessincome">
            <div style="margin-left: 7px;text-align: left;margin-top:20px">
              <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
           </div>
          <h3 style="text-align:center;">各营业点开房数日报表</h3>
        </div>
        <div class="tabs-contetn" id="print-turnoverofbusinessincomeTable">
          <!-- <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            :show-summary="true"
            :summary-method="getSummaries"
            border
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="companyName" label="营业点" width="300" fixed></el-table-column>
            <el-table-column v-for="(y,i) in headers"  :prop="y.code" :label="y.desc" :key="i" ></el-table-column>
          </el-table> -->
          <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
              <thead>
                <tr>
                 <td colspan="22" style="text-align: right;">营业日期:{{datepicker}}</td>
                </tr>
                <tr>
                  <td  style="border: 1px solid #000">营业点</td>
                  <td  style="border: 1px solid #000;" v-for="(y, i) in headers" :key="i">{{y.desc}}</td>
                </tr>
              </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.companyName}}</td>
              <td style="border: 1px solid #000;">{{item.channel0}}</td>
              <td style="border: 1px solid #000;">{{item.channel1}}</td>
              <td style="border: 1px solid #000;">{{item.channel2}}</td>
              <td style="border: 1px solid #000;">{{item.channel3}}</td>
              <td style="border: 1px solid #000;">{{item.channel4}}</td>
              <td style="border: 1px solid #000;">{{item.channel5}}</td>
              <td style="border: 1px solid #000;">{{item.channel6}}</td>
              <td style="border: 1px solid #000;">{{item.channel7}}</td>
              <td style="border: 1px solid #000;">{{item.channel8}}</td>
              <td style="border: 1px solid #000;">{{item.channel9}}</td>
              <td style="border: 1px solid #000;">{{item.channel10}}</td>
              <td style="border: 1px solid #000;">{{item.channel11}}</td>
              <td style="border: 1px solid #000;">{{item.channel12}}</td>
              <td style="border: 1px solid #000;">{{item.channel13}}</td>
              <td style="border: 1px solid #000;">{{item.channel14}}</td>
              <td style="border: 1px solid #000;">{{item.channel15}}</td>
              <td style="border: 1px solid #000;">{{item.channel16}}</td>
              <td style="border: 1px solid #000;">{{item.channel17}}</td>
              <td style="border: 1px solid #000;">{{item.rentalRoomNum}}</td>
              <td style="border: 1px solid #000;">{{item.onlineRoomNum}}</td>
              <td style="border: 1px solid #000;">{{item.leaseRate}}</td>
            </tr>
          </tbody>
             <tfoot>
            <tr>
              <td colspan="11" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="11" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          <!-- <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.realName}}</span></p> -->
          <p class="note_p2"></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <!-- <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe> -->
  </div>
</template>
<script>
import common from "@/api/common"
import {leaseRateDaily} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
import { getLodop } from '@/utils/lodop'
export default {
  data() {
    return {
      datepicker: moment().subtract(1,'days').format("YYYY-MM-DD"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      value: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
      headers:[],
       LODOP: null
    }
  },
  created(){
    this.reportBusinessIncome();
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
    reportBusinessIncome(){
      const datepicker = this.datepicker;
      leaseRateDaily({businessDate:datepicker}).then(res => {
        // console.log(res.data.tableData)
        this.headers=res.data.headers;
        this.tableData = res.data.tableData;
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          if(column.property=='leaseRate'){
            //开房率特殊统计
            sums[index] = (sums[index-2]/sums[index-1]*100).toFixed(2)
          }else{
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return  prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += ' 元';
          }
         
        } else {
          sums[index] = '-';
        }
      });
      return sums;
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-turnoverofbusinessincome").innerHTML;
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
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。

      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "入住率日报打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    }
  }
}
</script>
<style scoped>
.tips{
  color: red;
  margin-top: 10px;
}
.tips p{
  margin:0px;
}
.tips :nth-child(n+2){
  padding-left:28px;
}

.exportLink{
  color: white;
  text-decoration: none;
}
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
.note_p,
.note_p1,
.note_p2{
  color:red;
  margin:5px;
}
.note_p1{
  padding-left:28px;
}
.note_p2{
  padding-left:28px;
  margin-bottom:65px
}
</style>


