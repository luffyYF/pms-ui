// 收银员收款报表 交班报表
<template>
  <div class="container">
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item>
          营业日期：<el-date-picker v-model="listQuery.now" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" :editable="false" :clearable="false"></el-date-picker>
        <el-button type="primary" @click="init()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <!-- <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button> -->
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div  style="padding: 20px;text-align: center;border-top: 3px solid #eee;margin-bottom: 50px;overflow-y: auto;margin-top: 20px;">
      <div  id="print-receiptsreport">
      <div style="margin-left:20px;text-align: left;margin-bottom:0px;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
      </div>
      <h3 style="text-align:left;margin-left:320px;">客房营业统计表</h3>
      <div style="width: 100%;margin: 0 auto;text-align:left;overflow:hidden; ">
          <!-- <span style="display: inline-block;width: 46%;text-align: left;font-size: 14px;font-weight:bold;margin-left:3%;">店铺：{{activeCompany.companyName}}</span>
          <span style="display: inline-block;width: 39%;text-align: right;font-size: 14px;font-weight:bold;margin-right:12%;">营业日期：{{listQuery.now}}</span> -->
          <span style="text-align: left;font-size: 14px;font-weight:bold;margin-right:40%;margin-left:3%;">店铺：{{activeCompany.companyName}}</span>
          <span style="text-align: right;font-size: 14px;font-weight:bold;margin-right:20%;">营业日期：{{listQuery.now}}</span>
          <br>
        <!-- <span>{{currentDate}}</span><span style="padding-left:10px;">{{currentWeek}}</span> -->
      </div>
      </div>
        <!-- <div id="print-receiptsreportTable"> -->
          <div style="width: 60%;margin: 0 auto;text-align:left;overflow:hidden;border-top:2px solid black;margin-left:20px;">
            <div id="print-receiptsreportTable1" style="float: left;width: 46%;">
              <!-- <div style="text-align:center;float:left;width:40%;font-size:20px;margin:0;">========今 </div>
               <div style="text-align:center;float:right;width:40%;font-size:20px;margin:0;">日========</div> -->
                 <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
                  <tr>
                    <td colspan="2" style="text-align:center;width:40%;font-size:20px;margin:0;">========今</td>
                    <td colspan="2" style="text-align:center;width:40%;font-size:20px;margin:0;">日========</td>
                  </tr>
                  <tr>
                    <th>开房数</th>
                    <th>开房率%</th>
                    <th>平均租</th>
                    <th>房租收入</th>
                  </tr>
                  <tr v-for="(y,index) in toDayData" :key="index" v-if="index == toDayData.length-1 ">
                    <td>{{y.roomNum}}</td>
                    <td>{{y.roomRate}}</td>
                    <td>{{y.avgPrice}}</td>
                    <td>{{y.price}}</td>
                  </tr>
                 </table>
            </div>
            <div id="print-receiptsreportTable2" style="float: right;width: 40%;">
              <!-- <p style="text-align:center;font-size:20px;margin:0;">========<span style="display: inline-block;width: 100px;">本月至今日</span>========</p> -->
                <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
                  <tr>
                    <td colspan="2" style="text-align:center;width:50%;font-size:20px;margin:0;">========本月</td>
                    <td colspan="2" style="text-align:center;width:50%;font-size:20px;margin:0;">今日========</td>
                  </tr>
                 <tr>
                    <th>开房数</th>
                    <th>开房率%</th>
                    <th>平均租</th>
                    <th>房租收入</th>
                 </tr>
                 <tr v-for="(y,index) in momthData" :key="index" v-if="index == momthData.length-1 ">
                    <td>{{y.roomNum}}</td>
                    <td>{{y.roomRate}}</td>
                    <td>{{y.avgPrice}}</td>
                    <td>{{y.price}}</td>
                </tr>
            </table>
        </div>
      </div>

      <div style="width: 60%;margin: 0 auto;text-align:left;border-top:2px solid black;overflow:hidden;margin-left:20px; ">
        <div id="print-receiptsreportTable3" style="float: left;width: 46%;">
          <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
            <thead>
            <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr>
            </thead>
            <!-- <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr> -->
              <tr v-for="(y,index) in toDayData" :key="index" v-if="index < toDayData.length-3 ">
                <td>{{y.channelName}}<span v-if="y.checkInTypeName">({{y.checkInTypeName}})</span></td>
                <td>{{y.roomNum}}</td>
                <td>{{y.roomRate}}</td>
                <td>{{y.avgPrice}}</td>
                <td>{{y.price}}</td>
              </tr>
              <tr v-for="(y,index) in toDayData" :key="index" v-if="index == toDayData.length-3 ">
                <td style="border-top: 1px solid black;">{{y.channelName}}</td>
                <td style="border-top: 1px solid black;">{{y.roomNum}}</td>
                <td style="border-top: 1px solid black;">{{y.roomRate}}</td>
                <td style="border-top: 1px solid black;">{{y.avgPrice}}</td>
                <td style="border-top: 1px solid black;">{{y.price}}</td>
              </tr>
              <tr v-for="(y,index) in toDayData" :key="index" v-if="index > toDayData.length-3 ">
                <td>{{y.channelName}}</td>
                <td>{{y.roomNum}}</td>
                <td>{{y.roomRate}}</td>
                <td>{{y.avgPrice}}</td>
                <td>{{y.price}}</td>
              </tr>
              <tfoot>
                <tr>
                  <td colspan="5" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
                  <!-- <td colspan="3" style="text-align: right;font-size: 12px;">打印日期：<span>{{currentDate}} {{currentWeek}}</span></td> -->
                </tr>
             </tfoot>
          </table>
        </div>

        <div id="print-receiptsreportTable4" style="float: right;width: 46%;">
            <table style="text-align: left;font-family: 微软雅黑;font-size: 14px;margin:0 auto;margin-left:20px;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
            <thead>
            <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr>
            </thead>
            <!-- <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr> -->
              <tr v-for="(y,index) in momthData" :key="index" v-if="index < momthData.length-3 ">
                <td>{{y.channelName}}<span v-if="y.checkInTypeName">({{y.checkInTypeName}})</span></td>
                <td>{{y.roomNum}}</td>
                <td>{{y.roomRate}}</td>
                <td>{{y.avgPrice}}</td>
                <td>{{y.price}}</td>
              </tr>
              <tr v-for="(y,index) in momthData" :key="index" v-if="index == momthData.length-3 ">
                <td style="border-top: 1px solid black;">{{y.channelName}}</td>
                <td style="border-top: 1px solid black;">{{y.roomNum}}</td>
                <td style="border-top: 1px solid black;">{{y.roomRate}}</td>
                <td style="border-top: 1px solid black;">{{y.avgPrice}}</td>
                <td style="border-top: 1px solid black;">{{y.price}}</td>
              </tr>
              <tr v-for="(y,index) in momthData" :key="index" v-if="index > momthData.length-3 ">
                <td>{{y.channelName}}</td>
                <td>{{y.roomNum}}</td>
                <td>{{y.roomRate}}</td>
                <td>{{y.avgPrice}}</td>
                <td>{{y.price}}</td>
              </tr>
               <tfoot>
                <tr>
                  <!-- <td colspan="2" style="text-align: left;font-size: 12px;">打印人：<span>{{userInfo.realName}}</span></td> -->
                  <td colspan="5" style="text-align: right;font-size: 14px;">打印日期：<span>{{currentDate}} {{currentWeek}}</span></td>
                </tr>
             </tfoot>
          </table>
        </div>
      </div>
      <div style="width: 1200px;margin: 5px auto;text-align:left;color:red; ">
        <span>注:钟点房不统计入住率</span>
      </div>
      <!-- </div> -->
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {toDayHouseDoBusinessStatistics} from "@/api/reportCenter/pmsReportFormController"
import downloadExcel from '@/components/download/downloadExcel'
import { getLodop } from '@/utils/lodop'
import moment from "moment"

export default {
  data() {
    return {
      userInfo:{},
      toDayData:[],
      momthData:[],
      activeCompany:{},
      listQuery:{
          now: moment().subtract(1,"days").format("YYYY-MM-DD"),
      },
      currentDate:null,
      currentWeek:null,
       LODOP: null
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
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'))
    this.init()
  },
  computed:{
  },
  methods: {
    init(){
      this.getList()
    },
    getList() {
      toDayHouseDoBusinessStatistics({now:this.listQuery.now,type:"day"}).then((data)=>{
        this.toDayData = [];
        this.momthData = [];
        if(data.code == 1){
            var dayData = data.data.dayData
            var momthData = data.data.month
            console.log(dayData.length)
            console.log(momthData.length)
            this.toDayData = data.data.dayData;
            this.momthData = data.data.month;
            // this.$set(this,"toDayData",dayData)
            // this.$set(this,"momthData",momthData)

        }
        this.currentDate = this.listQuery.now
        this.currentWeek = moment(new Date(this.listQuery.now)).format("dddd")
      });
    //   toDayHouseDoBusinessStatistics({now:this.listQuery.now,type:"month"}).then((data)=>{
    //     if(data.code == 1){
    //         this.momthData = data.data;
    //     }
    //   });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },

    //导出EXCEL
    downloadExcel(){
    //   let url = '/pms/report/uploadShouYinYuanShouKuanExcel?begin='+this.queryObj.begenAndEnd[0]+'&end='+this.queryObj.begenAndEnd[1]+'&userPk='+this.queryObj.userPk+'&userName='+this.queryObj.userName+'&shift='+this.queryObj.shift+'&shiftPk='+this.queryObj.shiftPk
    //   downloadExcel(url, '收银员收款报表');
    },
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
      //this.LODOP.NewPageA(); // 自动分页
      this.LODOP.SET_PRINT_PAGESIZE(2,0,0,"A5");//2指定横向打印，指定A5纸，
      this.LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);//横向时的正向显示
      // this.LODOP.ADD_PRINT_HTM(6,10,790,120,document.getElementById("print-receiptsreport").innerHTML);
      //this.LODOP.ADD_PRINT_TABLE(156,10,345,300,document.getElementById("print-receiptsreportTable").innerHTML);
      this.LODOP.ADD_PRINT_TABLE(126,10,345,250,document.getElementById("print-receiptsreportTable1").innerHTML);
      this.LODOP.ADD_PRINT_TABLE(126,370,360,250,document.getElementById("print-receiptsreportTable2").innerHTML);
      this.LODOP.ADD_PRINT_TABLE(220,10,330,250,document.getElementById("print-receiptsreportTable3").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Offset2Top",-100); //设置次页偏移把区域向上扩 
      this.LODOP.ADD_PRINT_TABLE(220,350,340,250,document.getElementById("print-receiptsreportTable4").innerHTML);

      this.LODOP.SET_PRINT_STYLEA(0,"Offset2Top",-100); //设置次页偏移把区域向上扩 
      this.LODOP.ADD_PRINT_HTM(6,10,790,120,document.getElementById("print-receiptsreport").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",3);
      this.LODOP.ADD_PRINT_HTM(1100,15,500,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
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
  .p-r-5 {
    display: inline-block;
    padding-right: 5px;
  }
  .head-item {
    display: inline-block;
    padding: 0 15px;
  }
  .table-container {
    padding: 20px;
    text-align: center;
    border-top: 3px solid #eee;
    margin-bottom: 50px;
    overflow-y: auto;
  }
  .table-box {
    width: 800px;
    margin: 0 auto;
  }
  .mailTable {
    width: 600px;
    margin: 0 auto;
    border-left: 1px solid #999;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
  }
  .mailTable .column-left {
    border-right: 1px solid #999;
    width: 55%;
  }
  .mailTable .column-left,
  .mailTable .column-right {
    border-bottom: 1px solid #999;
    line-height: 28px;
    text-align: right;
    padding: 0 10px;
  }
</style>

