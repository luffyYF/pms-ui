// 收银员收款报表 交班报表
<template>
  <div class="container">
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-form-item>
          营业日期：<el-date-picker v-model="listQuery.now" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" :editable="false" :clearable="false"></el-date-picker>
        <el-button type="primary" @click="init()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <!-- <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button> -->
      </el-form-item>
    </el-form>
    <div id="print-receiptsreport" style="padding: 20px;text-align: center;border-top: 3px solid #eee;margin-bottom: 50px;overflow-y: auto;">
      <h3 style="text-align:center">客房营业统计表</h3>
      <!-- <h4 style="text-align:center"></h4> -->
      <div style="width: 900px;margin: 0 auto;text-align:left;overflow:hidden; ">
          <span>{{activeCompany.companyName}}</span><br>
        <span>{{currentDate}}</span><span style="padding-left:10px;">{{currentWeek}}</span>
      </div>
        
      <div style="width: 900px;margin: 0 auto;text-align:center;overflow:hidden;border-top:2px solid black; ">
          <div style="float: left;width: 46%;">
              <div style="text-align:center;float:left;width:45%;font-size:20px;margin:0;">=========今 </div>
              <div style="text-align:center;float:right;width:45%;font-size:20px;margin:0;">日=========</div>
              
              <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
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
          <div style="float: right;width: 50%;">
            <p style="text-align:center;font-size:20px;margin:0;">==========<span style="display: inline-block;width: 100px;">本月至今日</span>==========</p>
            <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
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

      <div style="width: 900px;margin: 0 auto;text-align:center;border-top:2px solid black; ">
        <div style="float: left;width: 46%;">
          <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
            <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr>
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
          </table>
        </div>

        <div style="float: right;width: 51%;">
            <table style="text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
            <tr style="border-bottom: 1px solid black;">
                <th style="border-bottom: 1px solid black;">类别</th>
                <th style="border-bottom: 1px solid black;">房数</th>
                <th style="border-bottom: 1px solid black;">开房率%</th>
                <th style="border-bottom: 1px solid black;">平均租</th>
                <th style="border-bottom: 1px solid black;">房租收入</th>
            </tr>
              <tr v-for="(y,index) in momthData" :key="index" v-if="index < momthData.length-3 ">
                <td>{{y.channelName}}<span v-if="y.checkInTypeName">({{y.checkInTypeName}})</span></td>
                <td>{{y.roomNum}}</td>
                <td>{{y.roomRate}}</td>
                <td>{{y.avgPrice}}</td>
                <td>{{y.price}}</td>
              </tr>
              <tr v-for="(y,index) in momthData" :key="index" v-if="index == momthData.length-3 ">
                <td style="border-top: 1px solid black;min-width:10em;">{{y.channelName}}</td>
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
          </table>
        </div>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {toDayHouseDoBusinessStatistics} from "@/api/reportCenter/pmsReportFormController"
import downloadExcel from '@/components/download/downloadExcel'
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
      currentWeek:null
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
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-receiptsreport").innerHTML;
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

