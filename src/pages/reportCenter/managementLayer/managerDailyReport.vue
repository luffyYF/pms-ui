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
        <!-- <el-button type="primary">PDF预览</el-button> -->
        <el-button type="primary" @click="downloadExcel" >导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div id="print-managerdailyreportTitle">
        <div style="margin-left: 7px;text-align: left;">
          <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
        </div>
        <h3 style="text-align: center">经理日报表</h3>
      </div>
      <div class="table-box" id="print-managerdailyreportTable">
        <table width="100%" border="0" style="border-collapse:collapse;font-family: 宋体;font-size: 12px;margin:0 auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
          <thead>
            <tr>
              <th colspan="4" style="text-align: left;font-size: 12px;">店铺：{{activeCompany.companyName}}</th>
                   <th colspan="4" style="text-align: right;font-size: 14px;">营业日期：{{queryObj.begin}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">营业收入</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">房费收入</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.houseFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">全日租</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.commonRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">半日租</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.halfDayRoomIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">钟点房费</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.hourRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">房费折扣</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.roomDiscount)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">其他收入</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.orderFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">会员新增</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.newMemberNum)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">会员充值</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.memberRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">单位挂账</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.unitLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">中介挂账</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.intermediaryLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">前台收款</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.receptionIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">总房数</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.totalRoomNum)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">可用房</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.leasedRoomsNum)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">维修房</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.repairRoomNum)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">总售房数</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.individualRoomNum + tableData.reportPos.teamRoomNum)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">散客售房数</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.individualRoomNum)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">团队售房数</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.teamRoomNum)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">出租率(可用房)</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : (Number(tableData.reportPos.leaseRate)*100).toFixed(2))}}%</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">平均房价</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.averageRoomRate)|toMoney}}</td>
            </tr>
            <tr>
              <th colspan="8" style="text-align: left;font-family: 黑体;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">前台收银分类统计</th>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">现金</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCash)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">银行卡</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterBank)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">支付宝</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAlipay)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">微信支付</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterWechat)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">预授权</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAuth)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">刷卡</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterPos)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">AR账</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.arAccount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">支票</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCheque)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">汇款</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterRemittance)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">其他账</td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
            </tr>
            <tr>
              <th colspan="6" style="text-align: left;width: 75%;font-family: 黑体;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">客源售房统计</th>
              <th colspan="2" style="text-align: left;width: 25%;font-family: 黑体;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">总房数：{{(tableData.reportPos == null ? '' : tableData.reportPos.totalRoomNum)}}</th>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">客源类型</td>
              <td style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">夜间数</td>
              <td style="text-align: center;background-color: #dcdcdc;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">出租率</td>
              <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">总收入</td>
              <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">平均房价</td>
            </tr>
            <tr v-for="(item, index) in tableData.customerSource" :key="index">
              <td colspan="2" style="text-align: left;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">
                {{(item.type == 0 ? '散客' : (item.type == 1 ? '会员' : (item.type == 2 ? '单位' : '中介')))}}
              </td>
              <td style="text-align: right;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{item.peopleNightRoomNum}}</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{(Number(item.leaseRate)*100).toFixed(2)}}%</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{item.totalIncome|toMoney}}</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{item.averageRoomRate|toMoney}}</td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: left;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">合计</td>
              <td style="text-align: right;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{calculation(tableData.customerSource, 'peopleNightRoomNum', 0)}}</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{(Number(calculation(tableData.customerSource, 'leaseRate', 0))*100).toFixed(2)}}%</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{calculation(tableData.customerSource, 'totalIncome', 0)|toMoney}}</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{(calculation(tableData.customerSource, 'totalIncome', 0)/calculation(tableData.customerSource, 'peopleNightRoomNum', 0))|toMoney}}</td>
            </tr>
            <tr>
              <th colspan="8" style="text-align: left;width: 100%;font-family: 黑体;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">房型售房统计</th>
            </tr>
            <tr>
              <td style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">房型</td>
              <td style="text-align: center;background-color: #dcdcdc;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">总房数</td>
              <td style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">入住数</td>
              <td style="text-align: center;background-color: #dcdcdc;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">出租率</td>
              <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">房费总收入</td>
              <td colspan="2" style="text-align: center;background-color: #dcdcdc;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">平均房价</td>
            </tr>
            <tr v-for="ele in tableData.roomType" :key="ele.reportPk">
              <td style="text-align: left;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ele.roomTypeName}}</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ele.onlineRoomNum == null ? 0 : ele.onlineRoomNum}}</td>
              <td style="text-align: right;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ele.rentalRoomNum}}</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{(Number(ele.leaseRate == null ? 0 : ele.leaseRate)*100).toFixed(2)}}%</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ele.houseFeeIncome|toMoney}}</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ele.averageRoomRate|toMoney}}</td>
            </tr>
            <tr>
              <td style="text-align: left;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">合计</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{calculation(tableData.roomType, 'onlineRoomNum', 0)}}</td>
              <td style="text-align: right;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{calculation(tableData.roomType, 'rentalRoomNum', 0)}}</td>
              <td style="text-align: right;width: 9%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{(isNaN(calculation(tableData.roomType, 'rentalRoomNum', 0)/calculation(tableData.roomType, 'onlineRoomNum', 0)) ? 0 : (calculation(tableData.roomType, 'rentalRoomNum', 0)/calculation(tableData.roomType, 'onlineRoomNum', 0))*100).toFixed(2)}}%</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{calculation(tableData.roomType, 'houseFeeIncome', 0)|toMoney}}</td>
              <td colspan="2" style="text-align: right;width: 25%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-weight: bolder;font-size: 12px;">{{(calculation(tableData.roomType, 'houseFeeIncome', 0)/calculation(tableData.roomType, 'rentalRoomNum', 0))|toMoney}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 12px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="4" style="text-align: right;font-size: 12px;">打印日期：<span>{{sDate}}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import { managerReport } from "@/api/reportCenter/pmsReportFormController"
import { getLodop } from '@/utils/lodop'
import downloadExcel from '@/components/download/downloadExcel'
import moment from "moment"

export default {
   data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD")},
      activeCompany:{},
      tableData: {},
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

    //导出EXCEL
    downloadExcel(){
      let url = '/pms/report/mg/managerDailyExcel?begin='+this.queryObj.begin
      downloadExcel(url, '经理日报表');
    },
     //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-managerdailyreport").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // },
    //打印预览
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
      // var sdf = this.LODOP.PRINT_INIT("经理日报打印");
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "经理日报打印");
      // this.LODOP.NewPageA(); // 自动分页0
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Full-Page");// 打印页整宽显示
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      // this.LODOP.SET_PREVIEW_WINDOW(1, 1, 0, 0, 0, "")
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题 1123 1023 963
      // this.LODOP.ADD_PRINT_TABLE(90, 10, 774, 900, document.getElementById("print-managerdailyreportTable").innerHTML);
      // LODOP.ADD_PRINT_TABLE(128,"5%","90%",314,strStyle+document.getElementById("div2").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
      // this.LODOP.ADD_PRINT_HTM(10, 10, 774, 80, document.getElementById("print-managerdailyreportTitle").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
      // this.LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);
      // this.LODOP.ADD_PRINT_HTM(1123, 15, 764, 30, "<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0, "ItemType", 1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0, "Horient", 0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      // this.LODOP.SET_PRINT_STYLEA(0, "Vorient", 0);

      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-managerdailyreportTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-managerdailyreportTitle").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"1%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
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
table:nth-child(1),table:nth-child(2) {
  border-top-color: transparent;
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
  /* font-size: 14px; */
  color: #909399;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>


