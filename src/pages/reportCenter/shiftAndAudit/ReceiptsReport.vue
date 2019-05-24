// 收银员收款报表 交班报表
<template>
  <div class="container">
    <el-form :inline="true" size="mini" :rules="addressRules"  class="demo-form-inline">
      <!-- <el-form-item label="营业日期" prop="begenAndEnd">
        <el-date-picker
        v-model="queryObj.begenAndEnd"
        type="daterange"
        range-separator="至"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :clearable="false">
      </el-date-picker>
      </el-form-item> -->
       <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="queryObj.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="收银员">
        <el-select v-model="queryObj.userPk" placeholder="选择收银员">
          <el-option  label="全部" value=""></el-option>
          <el-option
            v-for="item in listCashierOperatorData"
            :key="item.userPk"
            :label="item.userName"
            :value="item.userPk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次">
        <el-select v-model="queryObj.shiftPk" placeholder="选择班次">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in selectShiftData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">({{ item.beginTime.substring(0,5) }}-{{item.endTime.substring(0,5)}})</span>
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <!-- <el-button type="primary">PDF预览</el-button> -->
        <!-- <el-button type="primary"><a :href="baseUrl+ziurl+'begin='+begenAndEnd.begin+'&end='+begenAndEnd.end+'&userPk='+queryObj.userPk+'&userName='+queryObj.userName+'&shift='+queryObj.shift+'&shiftPk='+queryObj.shiftPk" class="exportLink" target="_blank">导出EXCEL</a></el-button> -->
        <el-button type="primary" @click="downloadExcel">导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div id="print-receiptsreport" style="padding: 20px;text-align: center;border-top: 3px solid #eee;margin-bottom: 50px;overflow-y: auto;">
      <!-- <h3 style="text-align:center">{{activeCompany.companyName}}</h3> -->
       <div style="margin-left: 50px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
        </div>
      <h3 style="text-align:center">收银员收款报表</h3>

      <div style="width: 800px;margin: 0 auto;text-align:center">
        <span style="margin-left:-300px;font-size: 14px;">
          营业日期从：{{queryObj.begin}}&nbsp;到&nbsp;{{queryObj.end}}&nbsp;&nbsp;&nbsp;
          收银员：{{queryObj.userName==""?"全部":queryObj.userName}}&nbsp;&nbsp;&nbsp;&nbsp;班次:<span class="head-item">{{queryObj.shift==""?"全部":queryObj.shift}} </span>
        </span>
         <span style="margin-left:-750px;font-size: 14px;">店铺：{{activeCompany.companyName}}</span><br>
        <!-- <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.realName}}</span></p> -->

        <div style="float: left;width: 37%;margin-left:30px;">

          <!-- <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :summary-method="getSummaries"
            show-summary
            :data="settlement"
            size="mini" 
            border style="width: 100%; margin:0 auto;">
            <el-table-column prop="projectName" align="center" label="收入项目" ></el-table-column>
            <el-table-column prop="settlementAmount" align="center" label="金额" ></el-table-column>
          </el-table> -->
          <table style="border-collapse:collapse;text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
             <!-- <thead>
            <tr>
              <th colspan="2" style="text-align: left;font-size: 14px;">店铺：{{activeCompany.companyName}}</th>
            </tr>
          </thead> -->
         <tbody>
            <tr>
                <th style="border: 1px solid #000;">收入项目</th>
                <th style="border: 1px solid #000;">金额</th>
            </tr>
                <tr v-for="y in settlement">
                  <td style="border: 1px solid #000;">{{y.projectName}}</td>
                  <td style="border: 1px solid #000;">{{y.settlementAmount}}</td>
                </tr>
              <tr style="background-color: #e8e8e8;">
                <td style="border: 1px solid #000;">总价</td>
                <td style="border: 1px solid #000;">{{settlPrice}}</td>
              </tr>
         </tbody>
           <!-- <tfoot>
            <tr>
              <td colspan="2" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
            </tr>
          </tfoot> -->
          </table>
        </div>

        <div style="float: right;width: 37%;margin-right:120px;">
          <!-- <el-table :data="consumer"
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :summary-method="getSummaries"
            show-summary
            size="mini" border style="width: 100%; margin:0 auto;">
            <el-table-column prop="projectName" align="center" label="消费项目" ></el-table-column>
            <el-table-column prop="consumptionAmount" align="center" label="金额" ></el-table-column>
          </el-table> -->

          <table style="border-collapse:collapse;text-align: center;font-family: 微软雅黑;font-size: 14px;margin:0 auto;"  width="100%" border="0"  cellpadding="8" cellspacing="0">
           <tbody>
            <tr>
                <th style="border: 1px solid #000;">消费项目</th>
                <th style="border: 1px solid #000;">金额</th>
              <tr v-for="y in consumer">
                <td style="border: 1px solid #000;">{{y.projectName}}</td>
                <td style="border: 1px solid #000;">{{y.consumptionAmount}}</td>
              </tr>
              <tr style="background-color: #e8e8e8;">
                <td style="border: 1px solid #000;">总价</td>
                <td style="border: 1px solid #000;">{{consumPrice}}</td>
              </tr>
            </tr>
            </tbody>
            <!-- <tfoot>
              <tr>
             <td colspan="2" style="text-align: right;font-size: 14px;">打印日期：<span>{{sDate}}</span></td>
             </tr>
            </tfoot> -->
          </table>
        </div>
        <div style="width: 800px;height:20px;margin: 0 auto;text-align:left;clear:both;">
            <span style="margin-left:50px;font-size: 14px;">打印人：{{userInfo.realName}}<span style="font-size: 14px;margin-left:300px;">打印日期：{{sDate}}</span></span><br>
       </div>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {roomStatus,reportShouYinYuanShouKuan} from "@/api/reportCenter/pmsReportFormController"
import {selectShift} from "@/api/utils/pmsShiftController"
import {listCashierOperator} from "@/api/operators/pmsUserController"
import downloadExcel from '@/components/download/downloadExcel'
import { getLodop } from '@/utils/lodop'
import moment from "moment"

export default {
  data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      sTime: moment().format("HH:mm:ss"),
      queryObj:{
        userName:"",
        shift:"",
        userPk:'',
        shiftPk:'',
        begin: moment().format("YYYY-MM-DD"),
        end: moment().add(1,'days').format("YYYY-MM-DD"),
        // begenAndEnd:[
        //   moment().format("YYYY-MM-DD"),
        //   moment().add(1,'days').format("YYYY-MM-DD"),
        // ],
      },
      reportBeginDate: null,
      reportEndDate: null,
      consumer: [],
      settlement: [],
      selectShiftData:[],
      listCashierOperatorData:[],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
       LODOP: null,
      addressRules: {},
      // baseUrl:common.baseUrl
      // ,ziurl:"/pms/report/uploadShouYinYuanShouKuanExcel?"
    };
  },
  // watch:{
  //   begenAndEnd: function () {
  //     if (this.begenAndEnd) {
  //       this.queryObj.begin = this.begenAndEnd.begin;
  //       this.queryObj.end = this.begenAndEnd.end;
  //     }
  //   }
  // },
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
    consumPrice:function() {
      let temp = 0;
      this.consumer.forEach(item=>{
        temp = temp + Number(item.consumptionAmount)
      })
      return parseFloat(temp.toFixed(2));
    },
    settlPrice:function() {
      let temp = 0;
      this.settlement.forEach(item=>{
        temp = temp + Number(item.settlementAmount)
      })
      return parseFloat(temp.toFixed(2));
    }
  },
  methods: {
    init(){
      let self = this
      selectShift().then((data)=>{
        if(data.code == 1){
          self.selectShiftData = data.data
        }
        this.getList()
      })
      listCashierOperator().then((data)=>{
        if(data.code == 1){
          self.listCashierOperatorData = data.data
        }
      })
      
    },
    getList() {
      this.autoChagneReportDate();

      let self = this
      self.consumer = []
      self.settlement = []
      self.queryObj.shift = ''
      self.queryObj.userName = ''
      
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
      let params = {
        userName: this.queryObj.userName,
        shift: this.queryObj.shift,
        userPk: this.queryObj.userPk,
        shiftPk: this.queryObj.shiftPk,
        // begin: this.queryObj.begenAndEnd[0],
        // end: this.queryObj.begenAndEnd[1]
        begin:this.queryObj.begin,
        end:this.queryObj.end
      }
      reportShouYinYuanShouKuan(params).then((data)=>{
        if(data.code == 1){
          self.consumer =  data.data.consumer
          self.settlement =  data.data.settlement
        }
      });
    },

    /**
     * 设置报表日期显示
     */
    autoChagneReportDate() {
      let beginTime;
      let endTime;
      //循环班次
      this.selectShiftData.forEach(item=>{
        if(item.value==this.queryObj.shiftPk) {
          beginTime = item.beginTime
          endTime = item.endTime
        }
      })
      if(this.queryObj.shiftPk) {
        if(beginTime && endTime && beginTime>endTime){
          // if(this.queryObj.begenAndEnd[0]==this.queryObj.begenAndEnd[1]){
          //   this.$set(this.queryObj.begenAndEnd, 1, moment(this.queryObj.begenAndEnd[0]).add(1,'days').format("YYYY-MM-DD"))
          //   this.$alert("日期已自动变更为"+this.queryObj.begenAndEnd[0]+" 至 "+this.queryObj.begenAndEnd[1],"提示",{type:'warning'});
          // }
          if(this.queryObj.begin==this.queryObj.end){
            this.$set(this.queryObj.begin, 1, moment(this.queryObj.begin).add(1,'days').format("YYYY-MM-DD"))
            this.$alert("日期已自动变更为"+this.queryObj.begin+" 至 "+this.queryObj.end,"提示",{type:'warning'});
          }
        }
        // this.reportBeginDate = this.queryObj.begenAndEnd[0] + " " + beginTime.substring(0,5)
        // this.reportEndDate = this.queryObj.begenAndEnd[1] + " " + endTime.substring(0,5)
           this.reportBeginDate = this.queryObj.begin + " " + beginTime.substring(0,5)
        this.reportEndDate = this.queryObj.end + " " + endTime.substring(0,5)
      }else {
        //班次选择全部
        // if(this.queryObj.begenAndEnd[0]==this.queryObj.begenAndEnd[1]) {
        //   this.$set(this.queryObj.begenAndEnd, 1, moment(this.queryObj.begenAndEnd[0]).add(1,'days').format("YYYY-MM-DD"))
        //   this.$alert("日期已自动变更为"+this.queryObj.begenAndEnd[0]+" 至 "+this.queryObj.begenAndEnd[1],"提示",{type:'warning'});
        // }
         if(this.queryObj.begin==this.queryObj.end) {
          this.$set(this.queryObj.begin, 1, moment(this.queryObj.begin).add(1,'days').format("YYYY-MM-DD"))
          this.$alert("日期已自动变更为"+this.queryObj.begin+" 至 "+this.queryObj.end,"提示",{type:'warning'});
        }
        // this.reportBeginDate = this.queryObj.begenAndEnd[0] + " 06:00"
        // this.reportEndDate = this.queryObj.begenAndEnd[1] + " 05:59"
          this.reportBeginDate = this.queryObj.begin + " 06:00"
        this.reportEndDate = this.queryObj.end + " 05:59"
      }
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
      // let url = '/pms/report/uploadShouYinYuanShouKuanExcel?begin='+this.queryObj.begenAndEnd[0]+'&end='+this.queryObj.begenAndEnd[1]+'&userPk='+this.queryObj.userPk+'&userName='+this.queryObj.userName+'&shift='+this.queryObj.shift+'&shiftPk='+this.queryObj.shiftPk
       let url = '/pms/report/uploadShouYinYuanShouKuanExcel?begin='+this.queryObj.begin+'&end='+this.queryObj.end+'&userPk='+this.queryObj.userPk+'&userName='+this.queryObj.userName+'&shift='+this.queryObj.shift+'&shiftPk='+this.queryObj.shiftPk
      downloadExcel(url, '收银员收款报表');
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-receiptsreport").innerHTML;
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
      // this.LODOP.ADD_PRINT_HTM(10,10,770,1103,document.getElementById("print-receiptsreport").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",4); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
   
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "收银员收款报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",1103,document.getElementById("print-receiptsreport").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",3);
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

