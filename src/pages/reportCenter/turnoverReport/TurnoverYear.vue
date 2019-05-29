<template>
  <div class="container">
    <el-form :inline="true" size="mini" style="margin-top:10px;"  class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker
          v-model="year"
          type="year"
          value-format="yyyy"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="businessYearReport()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
        <el-button type="primary">PDF预览</el-button>
        <el-button type="primary" @click="downloadExcel" >导出EXCEL</el-button>
        <el-button type="primary" @click="print"><span class="el-icon-printer p-r-5"></span>打印预览</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div id="print-managerdailyreportTitle">
        <div style="margin-left: 7px;text-align: left;">
          <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
        </div>
        <h3 style="text-align: center">营业年报</h3>
      </div>
      <div class="table-box" id="print-managerdailyreportTable">
        <table width="100%" border="0" style="border-collapse:collapse;font-family: 宋体;font-size: 12px;margin+= e. auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
        <thead>
           <tr>
              <th colspan="5" style="text-align: left;font-size: 12px;">店铺：{{activeCompany.companyName}}</th>
              <th  style="text-align: right;font-size: 12px;">营业时间：{{sDate}}</th>
            </tr>
            <tr>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">编号</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">项目</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;" v-for=" item in tableData" >{{item.businessDate}}</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">合计</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">A</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">一.营业收入</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.totalIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'totalIncome',0).toFixed(2)}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">A1</td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.房费收入</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.houseFeeIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'houseFeeIncome',0).toFixed(2)}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">全日租</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.commonRoomIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'commonRoomIncome',0).toFixed(2)}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">半日租</td>
              <td v-for="item in tableData" style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.halfDayRoomIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'halfDayRoomIncome',0).toFixed(2)}}</td>

            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">钟点房费</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.hourRoomIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'hourRoomIncome',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">房费折扣</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.roomDiscount|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'roomDiscount',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">加床费</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.addBedFee|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'addBedFee',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.赔偿</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.pcConsumptionAmount|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'pcConsumptionAmount',0).toFixed(2)}}</td>

            </tr>


            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.会议</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.meetingFee|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'meetingFee',0).toFixed(2)}}</td>
            </tr>

            <!-- <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">4.电话</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.ffConsumptionAmount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.ffConsumptionAmount)|toMoney}}</td>
            </tr> -->
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">4.餐饮</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.cateringFeeIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'cateringFeeIncome',0).toFixed(2)}}</td>
            </tr>

             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">5.其他</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.orderFeeIncome|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'orderFeeIncome',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">B</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">二.前台收款统计</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.receptionIncome|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'receptionIncome',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">现金</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterCash|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterCash',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">银行卡</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterBank|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterBank',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">支付宝</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterAlipay|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterAlipay',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">微信支付</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterWechat|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterWechat',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">预授权</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterAuth|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterAuth',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">刷卡</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterPos|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterPos',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">AR账</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"> {{item.arAccount|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'arAccount',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">支票</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterCheque|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterCheque',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">汇款</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterRemittance|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterRemittance',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">其他账</td>
               <td v-for="item in tableData" style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterOrderPayment|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterOrderPayment',0).toFixed(2)}}</td>
            </tr>


            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C=C1+C2</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">三.前台余额</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterOrderPayment|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'houseFeeIncome',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C1=B-A</td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">本期发生</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterOrderPayment|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterOrderPayment',0).toFixed(2)}}</td>

            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C2</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">上期结余</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterOrderPayment|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterOrderPayment',0).toFixed(2)}}</td>

            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">四.财务</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.会员储值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.counterOrderPayment|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'counterOrderPayment',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员充值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.memberRecharge|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'memberRecharge',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员现金充值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.memberCashRecharge|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'memberCashRecharge',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员刷卡充值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.memberCardRecharge|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'memberCardRecharge',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员其他充值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.memberOtherRecharge|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'memberOtherRecharge',0).toFixed(2)}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员赠送充值</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.memberGiftRecharge|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'memberGiftRecharge',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.会员新增</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.newMemberNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'newMemberNum',0)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.转应收</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.unitLedger+item.intermediaryLedger|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'unitLedger',0)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">单位挂账</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.unitLedger|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'unitLedger',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">中介挂账</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.intermediaryLedger|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'intermediaryLedger',0).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">五.客房销售统计</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.总房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{parseFloat(item.repairRoomNum)+parseFloat(item.onlineRoomNum)|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'repairRoomNum',0)+calculation(tableData,'onlineRoomNum',0)|toMoney}}</td>
            </tr>
              <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D1</td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">维修房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.repairRoomNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'repairRoomNum',0)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D2</td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">可售房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.onlineRoomNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'onlineRoomNum',0)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">E</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.售房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.individualRoomNum+item.teamRoomNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{ (calculation(tableData,'individualRoomNum',0)+calculation(tableData,'teamRoomNum',0)).toFixed(2)|toMoney}}</td>
            </tr>

             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">散客售房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.individualRoomNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{parseFloat(calculation(tableData,'individualRoomNum',0)).toFixed(2)}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">团队售房数</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.teamRoomNum|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{parseFloat(calculation(tableData,'teamRoomNum',0)).toFixed(2)}}</td>
            </tr>

             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">F=E/D</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.出租率(总房数)</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{((item.individualRoomNum+item.teamRoomNum)/item.totalRoomNum*100).toFixed(2)|toMoney}}%</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'leaseRate',0).toFixed(2)}}%</td>
            </tr>

            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">G=E/D2</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">4.出租率(可售房)</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.leaseRate|toMoney}}%</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'leaseRate',0).toFixed(2)}}%</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">H=A1</td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">5.房费收入</td>
              <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.totalIncome|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'totalIncome',0).toFixed(2)}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">I=H/E</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">6.平均房价</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.averageRoomRate|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'averageRoomRate',0).toFixed(2)}}</td>
            </tr>
             <!-- <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">J=I*F</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">平均收益(总房数)</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterOrderPayment)|toMoney}}</td>
            </tr> -->
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">六.中介佣金</td>
               <td v-for="item in tableData"  style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{item.intermediaryCommission|toMoney}}</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">{{calculation(tableData,'intermediaryCommission',0).toFixed(2)}}</td>
            </tr>


          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="text-align: left;font-size: 12px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="3"  style="text-align: right;font-size: 12px;">打印日期：<span>{{sDate}}</span></td>
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
import {businessYearReport } from "@/api/reportCenter/pmsReportFormController"
import { getLodop } from '@/utils/lodop'
import downloadExcel from '@/components/download/downloadExcel'
import moment from "moment"


export default {
   data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD"),
      year:'',
      activeCompany:{},
      tableData: {},
      tableMonth:{},
      tableYear:{},
      LODOP: null,
      value1:'',
      totalIncome:0,
      houseFeeIncome:0,
      commonRoomIncome:0,
      halfDayRoomIncome:0,
      hourRoomIncome:0,
      roomDiscount:0,
      addBedFee:0.,
      pcConsumptionAmount:0,
      meetingFee:0,
      cateringFeeIncome:0,
      orderFeeIncome:0,
      receptionIncom:0,
      counterCash:0,
      counterBank:0,
      counterAlipay:0,
      counterWechat:0,
      counterAuth:0,
      counterPos:0,
      arAccount:0,
      counterCheque:0,
      counterRemittance:0,
      counterOrderPaymen:0,
      counterOrderPayment:0,
      counterOrderPayment:0,
      memberRecharge:0,
      memberCashRecharge:0,
      memberCardRecharge:0,
      memberOtherRecharge:0,
      memberGiftRecharge:0,
      averageRoomRate:0,
     intermediaryCommission:0,
      newMemberNum:0,


      unitLedger:0,
      intermediaryLedger:0,

      repairRoomNum:0,
      onlineRoomNum:0,

      individualRoomNum:0,
      teamRoomNum:0,



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
      this.year =  moment().format("YYYY"),
      // this.queryObj.begin = moment.format("yyyy");
      this.businessYearReport();
    },
//增加
additem(){

},
    //查询所有营业月报表数据
    businessYearReport(){
       let self = this
      businessYearReport({year:this.year}).then(res =>{
        self.tableData=res.data;
        console.log(self.tableData)

        let newMemberNum=0;
        let unitLedger=0;
        let intermediaryLedger=0;
        let repairRoomNum=0;
        let onlineRoomNum=0;

        let individualRoomNum=0;
        let teamRoomNum=0;

        let averageRoomRate=0;
     let  intermediaryCommission=0;
        self.tableData.forEach(function(e){

          newMemberNum+= e.newMemberNum,
          unitLedger+= e.unitLedger,
          intermediaryLedger+= e.intermediaryLedger,
          repairRoomNum+= e.repairRoomNum,
          onlineRoomNum+= e.onlineRoomNum,
          individualRoomNum+= e.individualRoomNum,
          teamRoomNum+= e.teamRoomNum,
          averageRoomRate+= e.averageRoomRate,
        intermediaryCommission+= e.intermediaryCommission
        })
        this.onlineRoomNum = onlineRoomNum
        this.individualRoomNum = individualRoomNum
        this.repairRoomNum = repairRoomNum
        this.onlineRoomNum = onlineRoomNum
        this.unitLedger = unitLedger
        this.intermediaryCommission = intermediaryCommission
      })
    },
    calculation (list, name, type) {
      let sum = 0
      let i = 0
      if (list != undefined) {
        list.forEach(item => {
          if (item[name] == null || item[name] == undefined) {
            item[name] = 0.00
          }
          sum += parseFloat(item[name])
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
      let url = '/pms/report/businessYearReportExcel?year='+this.year
      downloadExcel(url, '营业年报表');
    },
    //  打印预览
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
      this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      this.LODOP.NewPageA(); // 自动分页
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题 1123 1023 963
      this.LODOP.ADD_PRINT_TABLE(90,10,700,843,document.getElementById("print-managerdailyreportTable").innerHTML);
      // LODOP.ADD_PRINT_TABLE(128,"5%","90%",314,strStyle+document.getElementById("div2").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      this.LODOP.ADD_PRINT_HTM(30,30,700,80,document.getElementById("print-managerdailyreportTitle").innerHTML);//设置log
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.ADD_PRINT_RECT(0,0,0,0,0,0);//边框
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM("1010px",15,"794px","30px","<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
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





