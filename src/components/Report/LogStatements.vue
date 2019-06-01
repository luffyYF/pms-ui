<template>
  <div>
    <div id="print-LogStatements">
      <table
        cellpadding="5"
        style="padding:20px; border-collapse:collapse;text-align:center;width:100%;table-layout: fixed;"
      >
        <caption style="font-size:18px;font-weight: bold;">交班报表</caption>

        <tr style="text-align:left">
          <td colspan="3">班次:{{shiftDataPo.shiftNo}}</td>
          <td colspan="4">交班人:{{shiftDataPo.userName}}</td>
          <td
            colspan="5"
            style="font-size:12px;text-align:right"
          >交班日期:{{shiftDataPo.beginDate}}至{{shiftDataPo.endDate}}</td>
        </tr>
        <tr>
          <th colspan="12" style="border:1px solid black;">本班权责</th>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">结算</td>
          <td colspan="2" style="border:1px solid black;">现金</td>
          <td rowspan="2" style="border:1px solid black;">银行卡</td>
          <td rowspan="2" style="border:1px solid black;">支付宝</td>
          <td rowspan="2" style="border:1px solid black;">微信</td>
          <td rowspan="2" style="border:1px solid black;">会员卡</td>
          <td colspan="2" style="border:1px solid black;">挂账</td>
          <td rowspan="2" style="border:1px solid black;">免单</td>
          <td rowspan="2" style="border:1px solid black;">代金卷</td>
          <td rowspan="2" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">收</td>
          <td style="border:1px solid black;">退</td>
          <td style="border:1px solid black;">单位</td>
          <td style="border:1px solid black;">中介</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">{{shiftDataPo.qzCashCollect}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzCashRefund}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzBankCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzZFB}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzWX}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzMemberCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzHangBillAgreement}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzHangBillIntermediary}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzFreeSheet}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzCashCoupon}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.qzCash}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzBankCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzZFB}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzWX}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzMemberCard}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.qzHangBill}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzFreeSheet}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzCashCoupon}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzSettlOther}}</td>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">收入</td>
          <td colspan="3" style="border:1px solid black;">房费</td>
          <td colspan="4" style="border:1px solid black;">商品销售</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">全日租</td>
          <td style="border:1px solid black;">半日租</td>
          <td style="border:1px solid black;">钟点房</td>
          <td style="border:1px solid black;">赔偿</td>
          <td style="border:1px solid black;">会议</td>
          <td style="border:1px solid black;">电话</td>
          <td style="border:1px solid black;">餐饮</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">{{shiftDataPo.qzFullTime}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzHalfDay}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzHourRoom}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzPC}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzMeeting}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzPhoneRate}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.qzMeals}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.qzOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="3" style="border:1px solid black;">{{shiftDataPo.qzRoomCharge}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.qzGoods}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.qzSettlOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">总计</td>
          <td colspan="11" style="border:1px solid black;text-align:left">
            <span style="margin:0 10px">结算：{{shiftDataPo.qzSettlementAmount}}</span>
            <span style="margin:0 10px">收入：{{shiftDataPo.qzConsumptionAmount}}</span>
          </td>
        </tr>
        <tr>
          <th colspan="12" style="border:1px solid black;">本班收付</th>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">结算</td>
          <td colspan="2" style="border:1px solid black;">现金</td>
          <td rowspan="2" style="border:1px solid black;">银行卡</td>
          <td rowspan="2" style="border:1px solid black;">支付宝</td>
          <td rowspan="2" style="border:1px solid black;">微信</td>
          <td rowspan="2" style="border:1px solid black;">会员卡</td>
          <td colspan="2" style="border:1px solid black;">挂账</td>
          <td rowspan="2" style="border:1px solid black;">免单</td>
          <td rowspan="2" style="border:1px solid black;">代金卷</td>
          <td rowspan="2" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">收</td>
          <td style="border:1px solid black;">退</td>
          <td style="border:1px solid black;">单位</td>
          <td style="border:1px solid black;">中介</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">{{shiftDataPo.rpCashCollect}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpCashRefund}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpBankCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpZFB}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpWX}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpMemberCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpHangBillAgreement}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpHangBillIntermediary}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpFreeSheet}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpCashCoupon}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpCash}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpBankCard}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpZFB}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpWX}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpMemberCard}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpHangBill}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpFreeSheet}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpCashCoupon}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpSettlOther}}</td>
        </tr>
        <tr>
          <td rowspan="2" style="border:1px solid black;">收入</td>
          <td colspan="3" style="border:1px solid black;">房费</td>
          <td colspan="4" style="border:1px solid black;">商品销售</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">全日租</td>
          <td style="border:1px solid black;">半日租</td>
          <td style="border:1px solid black;">钟点房</td>
          <td style="border:1px solid black;">赔偿</td>
          <td style="border:1px solid black;">会议</td>
          <td style="border:1px solid black;">电话</td>
          <td style="border:1px solid black;">餐饮</td>
          <td colspan="4" style="border:1px solid black;">其他</td>
        </tr>
        <tr>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;">{{shiftDataPo.rpFullTime}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpHalfDay}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpHourRoom}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpPC}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpMeeting}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpPhoneRate}}</td>
          <td style="border:1px solid black;">{{shiftDataPo.rpMeals}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.rpOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">小计</td>
          <td colspan="3" style="border:1px solid black;">{{shiftDataPo.rpRoomCharge}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.rpGoods}}</td>
          <td colspan="4" style="border:1px solid black;">{{shiftDataPo.rpSettlOther}}</td>
        </tr>
        <tr>
          <td style="border:1px solid black;">总计</td>
          <td colspan="11" style="border:1px solid black;text-align:left">
            <span style="margin:0 10px">结算：{{shiftDataPo.rpConsumptionAmount}}</span>
            <span style="margin:0 10px">收入：{{shiftDataPo.rpSettlementAmount}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="10" style="border:1px solid black;">会员充值</td>
          <td colspan="2" style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">现金充值</td>
          <td colspan="2" style="border:1px solid black;">银行卡</td>
          <td colspan="2" style="border:1px solid black;">支付宝</td>
          <td colspan="2" style="border:1px solid black;">微信</td>
          <td colspan="2" style="border:1px solid black;">充值赠送</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpMemberCashRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpMemberBankCardRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpMemberZFBRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpMemberWXRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{shiftDataPo.rpMemberReChargeGive}}</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr>
          <td colspan="2" style="border:1px solid black;">前台操作员</td>
          <td colspan="2" style="border:1px solid black;">现金充值</td>
          <td colspan="2" style="border:1px solid black;">银行卡</td>
          <td colspan="2" style="border:1px solid black;">支付宝</td>
          <td colspan="2" style="border:1px solid black;">微信</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
        <tr v-for="(item,index) in billList" :key="index">
          <td colspan="2" style="border:1px solid black;">{{item.userName}}</td>
          <td colspan="2" style="border:1px solid black;">{{item.memberCashRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{item.memberBankCardRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{item.memberZFBRecharge}}</td>
          <td colspan="2" style="border:1px solid black;">{{item.memberWXRecharge}}</td>
          <td style="border:1px solid black;"></td>
          <td style="border:1px solid black;"></td>
        </tr>
      </table>
    </div>

    <div style="text-align:right;padding:10px;font-size:12px">
      <el-button type="primary" icon="el-icon-printer" @click="print()">打印发票</el-button>
      <el-button type="primary" icon="el-icon-paperclip" @click="downloadExcel(shiftDataPo)">导出excel</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shiftDataPo: {},
    billList: []
  },
  data() {
    return {};
  },
  methods: {
    print() {
      this.$emit("print");
    },
    downloadExcel(shiftDataPo) {
      this.$emit("downloadExcel", shiftDataPo);
    }
  }
};
</script>

