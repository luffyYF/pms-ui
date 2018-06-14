<template>
  <div style="height:100%;">
        <div class="primary-tool">
            <el-button type="primary" size="mini" @click="init()">网页预览</el-button>
            <el-button type="primary" size="mini">PDF预览</el-button>
            <el-button type="primary" size="mini"><a class="exportLink" :href="baseUrl+ziurl" target="_blank">导出EXCEL</a></el-button>
            <el-button type="primary" size="mini">添加到收藏夹</el-button>
            <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
        <div class="table-container" id="print-shopguestdeposi">
          <h3>{{activeCompany.companyName}}</h3>
          <h4>在店宾客余额及押金报表</h4>
          <span style="padding-right:20px">打印日期：{{sDate}}</span>
          <span style="padding-right:20px">打印时间：{{sTime}}</span>
          <span>营业日期：{{sDate}}</span>
          <span style="float:right">注：余额 = 消费总计 - 收款总计</span>
          <el-table
            :header-cell-style="tableStyleObj" 
            :cell-style="tableStyleObj" 
            :data="tableData" 
            size="mini"
            :summary-method="getSummaries"
            show-summary
            border 
            style="width: 100%; margin:0 auto;">
            <el-table-column prop="orderNo" align="center" label="组单号" ></el-table-column>
            <el-table-column prop="memName" align="center" label="客人姓名" ></el-table-column>
            <el-table-column prop="memSex" align="center" label="性别" >
              <template slot-scope="scope">
                <span>{{scope.row.memSex == "M"?"男":"女"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="certificateTypeName" align="center" label="证件类型" ></el-table-column>
            <el-table-column prop="certificateNo" align="center" label="证件号码" >
              <template slot-scope="scope">
                <span>{{scope.row.certificateNo == "null"?"":scope.row.certificateNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="roomNumber" align="center" label="房号" ></el-table-column>
            <el-table-column prop="typeName" align="center" label="房型" ></el-table-column>
            <el-table-column align="center" label="房价" >
              <template slot-scope="props">
                  {{props.row.price | unit}}
                </template>
            </el-table-column>
            <el-table-column prop="beginDate" align="center" label="入住时间" ></el-table-column>
            <el-table-column prop="endDate" align="center" label="预离时间" ></el-table-column>
            <el-table-column label="收款明细" align="center">
              <el-table-column prop="preLicensing" align="center" label="预授权"></el-table-column>
              <el-table-column prop="wxPay" align="center" label="微信"></el-table-column>
              <el-table-column prop="aliPay" align="center" label="支付宝"></el-table-column>
              <el-table-column prop="cash" align="center" label="现金"></el-table-column>
              <el-table-column prop="bankCard" align="center" label="银行卡"></el-table-column>
              <el-table-column prop="check" align="center" label="支票"></el-table-column>
              <el-table-column prop="remittance" align="center" label="汇款"></el-table-column>
              <el-table-column prop="order" align="center" label="其它"></el-table-column>
              <el-table-column prop="total" align="center" label="总计">
                <template slot-scope="scope">
                  <span>{{total(scope.row)}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="consumptionAmount" align="center" label="消费总数"></el-table-column>
            <el-table-column prop="balance" align="center" label="余额">
              <template slot-scope="scope">
                  <span>{{balance(scope.row)}}</span>
                </template>
            </el-table-column>
          </el-table>
        </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {roomStatus,reportZaiDianBinKeYueJiYaJin} from "@/api/reportCenter/pmsReportFormController"
import moment from "moment"
export default {
  data() {
    return {
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      tableData: [],
      roomStatus: roomStatus,
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },baseUrl:common.baseUrl,
      ziurl:"/pms/report/zaiDianBinKeYueJiYaJinExcel"
    };
  },
  created() {
    this.init();
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
  filters: {
    unit: function (value) {
      if(!value){
        return 0;
      }
      return value+"元"
    }
  },
  methods: {
    init(){
      this.getList()
    },
    getList(){
      let self = this
      reportZaiDianBinKeYueJiYaJin().then((data)=>{
        console.log(data.data)
        if(data.code == 1){
          self.tableData =  data.data
        }
      });
    },
    total(row){
      return row.preLicensing + row.wxPay + row.aliPay + row.cash + row.bankCard + row.check + row.remittance + row.order + row.order;
    },
    balance(row){
      return this.total(row) - row.consumptionAmount;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        if(index >= 10){
          const values = data.map(item => Number(item[column.property]));
          // console.log(values)
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
          }else if(index == 18){
            const valueses = data.map(item => {
              return Number(item["preLicensing"])+Number(item["wxPay"])+ Number(item["aliPay"])+Number(item["cash"])+ Number(item["bankCard"])+Number(item["check"])+Number(item["remittance"])+Number(item["order"])
            });
            sums[index] = valueses.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          }else if(index == 20){
            const valueses = data.map(item => {
              return Number(item["preLicensing"])+Number(item["wxPay"])+ Number(item["aliPay"])+Number(item["cash"])+ Number(item["bankCard"])+Number(item["check"])+Number(item["remittance"])+Number(item["order"])
            });
            sums[index] = valueses.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            const valueset = data.map(item => {
              return Number(item["consumptionAmount"])
            });

            sums[index] = sums[index] - valueset.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);;
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
      });
      return sums;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.tableData.length-1 === rowIndex) {
        if (columnIndex === 0) {
            return [1, 10];
          } else if (columnIndex <= 10) {
            return [0, 0];
          }
        
      }
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-shopguestdeposi").innerHTML;
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
 .table-container {
    padding: 20px;
    text-align: center;
    height: calc(100% - 180px);
    overflow-y: auto;
  }
</style>
