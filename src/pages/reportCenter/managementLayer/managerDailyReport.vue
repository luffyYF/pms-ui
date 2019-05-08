<template>
  <div class="container">
    <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <el-button type="primary">PDF预览</el-button>
        <el-button type="primary" :disabled="true">导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container" id="print-managerdailyreport">
      <h3>{{activeCompany.companyName}}</h3>
      <h4>经理日报表</h4>
      <div class="table-box">
        <p>打印日期：<span class="head-item">{{sDate}}</span>打印人：<span class="head-item">{{userInfo.upmsUserName}}</span></p>
        <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
          <tr>
            <td style="width: 12.5%;padding: 6px;">营业收入</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.totalIncome)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">房费收入</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.houseFeeIncome)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">全日租</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.commonRoomIncome)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">半日租</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.halfDayRoomIncome)|toMoney}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">钟点房费</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.hourRoomIncome)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">房费折扣</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.roomDiscount)}}</td>
            <td style="width: 12.5%;padding: 6px;">其他收入</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.orderFeeIncome)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">会员新增</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.newMemberNum)}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">会员充值</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.memberRecharge)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">单位挂账</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.unitLedger)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">中介挂账</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.intermediaryLedger)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">前台收款</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.receptionIncome)|toMoney}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">总房数</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.totalRoomNum)}}</td>
            <td style="width: 12.5%;padding: 6px;">可用房</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.leasedRoomsNum)}}</td>
            <td style="width: 12.5%;padding: 6px;">维修房</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.repairRoomNum)}}</td>
            <td style="width: 12.5%;padding: 6px;">总售房数</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.individualRoomNum + tableData.reportPos.teamRoomNum)}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">散客售房数</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.individualRoomNum)}}</td>
            <td style="width: 12.5%;padding: 6px;">团队售房数</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.teamRoomNum)}}</td>
            <td style="width: 12.5%;padding: 6px;">出租率(可用房)</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.leaseRate.toFixed(3))}}</td>
            <td style="width: 12.5%;padding: 6px;">平均房价</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.averageRoomRate)|toMoney}}</td>
          </tr>
          <tr>
            <th colspan="8" style="text-align: left;font-family: 黑体;padding: 6px;">前台收银分类统计</th>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">现金</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCash)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">银行卡</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterBank)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">支付宝</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAlipay)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">微信支付</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterWechat)|toMoney}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">预授权</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAuth)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">刷卡</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterPos)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">AR账</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.arAccount)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">支票</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCheque)|toMoney}}</td>
          </tr>
          <tr>
            <td style="width: 12.5%;padding: 6px;">汇款</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterRemittance)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;">其他账</td>
            <td style="width: 12.5%;padding: 6px;text-align: right">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterOrderPayment)|toMoney}}</td>
            <td style="width: 12.5%;padding: 6px;"></td>
            <td style="width: 12.5%;padding: 6px;"></td>
            <td style="width: 12.5%;padding: 6px;"></td>
            <td style="width: 12.5%;padding: 6px;"></td>
          </tr>
        </table>
        <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: left;border-top-color: transparent;" cellpadding="6" cellspacing="0">
          <tr>
            <th colspan="6" style="text-align: left;width: 80%;font-family: 黑体;padding: 6px;">客源售房统计</th>
            <th colspan="2" style="text-align: left;width: 20%;font-family: 黑体;padding: 6px;">总房数：{{(tableData.reportPos == null ? '' : tableData.reportPos.totalRoomNum)}}</th>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px;">客源类型</td>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">夜间数</td>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">出租率</td>
            <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px;">总收入</td>
            <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px;">平均房价</td>
          </tr>
          <tr v-for="(item, index) in tableData.customerSource" :key="index">
            <td colspan="2" style="text-align: left;width: 25%;padding: 6px;">
              {{(item.type == 0 ? '散客' : (item.type == 1 ? '会员' : (item.type == 2 ? '单位' : '中介')))}}
            </td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{item.peopleNightRoomNum}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{(Number(item.leaseRate)*100).toFixed(2)}}%</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{item.totalIncome|toMoney}}</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{item.averageRoomRate|toMoney}}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: left;width: 25%;padding: 6px;">合计</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{calculation(tableData.customerSource, 'peopleNightRoomNum', 0)}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{(Number(calculation(tableData.customerSource, 'leaseRate', 0))*100).toFixed(2)}}%</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{calculation(tableData.customerSource, 'totalIncome', 0)|toMoney}}</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{(calculation(tableData.customerSource, 'totalIncome', 0)/calculation(tableData.customerSource, 'peopleNightRoomNum', 0))|toMoney}}</td>
          </tr>
        </table>
        <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: left;border-top-color: transparent;" cellpadding="6" cellspacing="0">
          <tr>
            <th colspan="8" style="text-align: left;width: 100%;font-family: 黑体;padding: 6px;">房型售房统计</th>
          </tr>
          <tr>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">房型</td>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">总房数</td>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">入住数</td>
            <td style="text-align: center;background-color: #dcdcdc;width: 12.5%;padding: 6px;">出租率</td>
            <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px;">总收入</td>
            <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px;">平均房价</td>
          </tr>
          <tr v-for="(ele, i) in tableData.roomType" :key="i">
            <td style="text-align: left;width: 12.5%;padding: 6px;">{{ele.roomTypeName}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{ele.onlineRoomNum == null ? 0 : ele.onlineRoomNum}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{ele.rentalRoomNum}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{(Number(ele.leaseRate == null ? 0 : ele.leaseRate)*100).toFixed(2)}}%</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{ele.totalIncome|toMoney}}</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{ele.averageRoomRate|toMoney}}</td>
          </tr>
          <tr>
            <td style="text-align: left;width: 12.5%;padding: 6px;">合计</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{calculation(tableData.roomType, 'onlineRoomNum', 0)}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{calculation(tableData.roomType, 'rentalRoomNum', 0)}}</td>
            <td style="text-align: right;width: 12.5%;padding: 6px;">{{(isNaN(calculation(tableData.roomType, 'rentalRoomNum', 0)/calculation(tableData.roomType, 'onlineRoomNum', 0)) ? 0 : (calculation(tableData.roomType, 'rentalRoomNum', 0)/calculation(tableData.roomType, 'onlineRoomNum', 0))).toFixed(2)}}%</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{calculation(tableData.roomType, 'totalIncome', 0)|toMoney}}</td>
            <td colspan="2" style="text-align: right;width: 25%;padding: 6px;">{{(calculation(tableData.roomType, 'totalIncome', 0)/calculation(tableData.roomType, 'rentalRoomNum', 0))|toMoney}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import { managerReport } from "@/api/reportCenter/pmsReportFormController"
import moment from "moment"
export default {
   data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD")},
      activeCompany:{},
      tableData: {},
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
      let self = this
      this.getList()
    },
    getList(){
      let self = this
      managerReport(this.queryObj).then((res)=>{
        console.log(res)
        if(res.code == 1){
          self.tableData = res.data;
        }
      });
    },
    calculation (list, name, type) {
      let sum = 0
      let i = 0
      if (list != undefined) {
        list.forEach(item => {
          if (item[name] == null || item[name] == undefined) {
            item[name] = 0
          }
          sum += item[name]
          i++
        });
      }
      if (type == 1 && i != 0) {
        sum = sum/i
      }
      return sum
    },

    // //导出EXCEL
    // downloadExcel(){
    //   let url = '/pms/report/mg/dailyExcel?date='+this.datepicker
    //   downloadExcel(url, '经理日报表');
    // },
     //打印预览
    print(){
      let bodyhtml = document.getElementById("print-managerdailyreport").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
  },
  filters: {
    toMoney: function(num) {
      if(num){
        if(isNaN(num)) {
          alert("金额中含有不能识别的字符");
          return;
        }
        num = typeof num == "string"?parseFloat(num):num//判断是否是字符串如果是字符串转成数字
        num = num.toFixed(2);//保留两位
        num = parseFloat(num);//转成数字
        num = num.toLocaleString();//转成金额显示模式
        //判断是否有小数
        if(num.indexOf(".")==-1){
            num = num+".00";
        }else{
            num = num.split(".")[1].length<2?num+"0":num;
        }
        return num;//返回的是字符串23,245.12保留2位小数
      } else {
        return num = 0;
      }
    }
  }
}
</script>

<style scoped>
table td {
  height: 30px;
  line-height: 30px;
}
table th {
  height: 30px;
  line-height: 30px;
}
.container {
  height: 100%;
}
.table-container {
  padding: 20px;
  text-align: center;
  height: calc(100% - 200px);
  overflow-y: auto;
  border-top: 3px solid #eee;
}
.head-item {
  display: inline-block;
  padding: 0 15px;
}
.item-type {
  /* border-left:1px solid #ebeef5;
  border-right:1px solid #ebeef5; */
  margin: 0;
  line-height: 60px;
  font-size: 14px;
  color: #909399;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>


