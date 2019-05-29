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
        <el-button type="primary" @click="turnoverDailyReport()"><span class="el-icon-tickets p-r-5"></span>网页预览</el-button>
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
        <h3 style="text-align: center">营业报表</h3>
      </div>
      <div class="table-box" id="print-managerdailyreportTable">
        <table width="100%" border="0" style="border-collapse:collapse;font-family: 宋体;font-size: 12px;margin:0 auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
        <thead>
           <tr>
              <th colspan="4" style="text-align: left;font-size: 12px;">店铺：{{activeCompany.companyName}}</th>
              <th  style="text-align: right;font-size: 12px;">营业时间：{{sDate}}</th>
            </tr>
            <tr>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">编号</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">项目</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">当日发生</th>
              <th style="text-align: center;background-color: #dcdcdc;width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">当月累计</th>
              <th  style="text-align: center;background-color: #dcdcdc;width:16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">去年同期</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">A</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">一.营业收入</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.totalIncome)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">A1</td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.房费收入</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.houseFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.houseFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.totalIncome)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">全日租</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.commonRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.commonRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.commonRoomIncome)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">半日租</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.halfDayRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.halfDayRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.halfDayRoomIncome)|toMoney}}</td>

            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">钟点房费</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.hourRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.hourRoomIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.hourRoomIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">房费折扣</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.roomDiscount)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.roomDiscount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.roomDiscount)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">加床费</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.addBedFee)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.addBedFee)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.addBedFee)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.赔偿</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.pcConsumptionAmount)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.pcConsumptionAmount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.pcConsumptionAmount)|toMoney}}</td>
            </tr>


            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.会议</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.meetingFee)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.meetingFee)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.meetingFee)|toMoney}}</td>
            </tr>

            <!-- <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">4.电话</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.ffConsumptionAmount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.ffConsumptionAmount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.ffConsumptionAmount)|toMoney}}</td>
            </tr> -->
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">4.餐饮</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.cateringFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.cateringFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.cateringFeeIncome)|toMoney}}</td>
            </tr>

             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">5.其他</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.orderFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.orderFeeIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.orderFeeIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">B</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">二.前台收款统计</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.receptionIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.receptionIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.receptionIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">现金</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCash)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterCash)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterCash)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">银行卡</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterBank)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterBank)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterBank)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">支付宝</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAlipay)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterAlipay)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterAlipay)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">微信支付</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterWechat)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterWechat)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterWechat)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">预授权</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterAuth)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterAuth)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterAuth)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">刷卡</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterPos)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterPos)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterPos)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">AR账</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.arAccount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.arAccount)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.arAccount)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">支票</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterCheque)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterCheque)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterCheque)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">汇款</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterRemittance)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterRemittance)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterRemittance)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">其他账</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterOrderPayment)|toMoney}}</td>
            </tr>


            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C=C1+C2</td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">三.前台余额</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterOrderPayment)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C1=B-A</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">本期发生</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.receptionIncome)-(tableData.reportPo == null ? 0 : tableData.reportPo.totalIncome)}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.receptionIncome)-(tableMonth == null ? 0 : tableMonth.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.receptionIncome)-(tableYear == null ? 0 : tableYear.totalIncome)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">C2</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">上期结余</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPos.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterOrderPayment)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">四.财务</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.会员储值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.counterOrderPayment)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.counterOrderPayment)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员充值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPos == null ? 0 : tableData.reportPo.memberRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.memberRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.memberRecharge)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员现金充值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.memberCashRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.memberCashRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.memberCashRecharge)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员刷卡充值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.memberCardRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.memberCardRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.memberCardRecharge)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员其他充值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.memberOtherRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.memberOtherRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.memberOtherRecharge)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">会员赠送充值</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.memberGiftRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.memberGiftRecharge)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.memberGiftRecharge)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.会员新增</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.newMemberNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.newMemberNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.newMemberNum)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.转应收</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.unitLedger)+(tableData.reportPo == null ? 0 : tableData.reportPo.intermediaryLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.unitLedger)+(tableMonth == null ? 0 : tableMonth.intermediaryLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.unitLedger)+(tableYear == null ? 0 : tableYear.intermediaryLedger)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">单位挂账</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.unitLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.unitLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.unitLedger)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">中介挂账</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.intermediaryLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.intermediaryLedger)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.intermediaryLedger)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">五.客房销售统计</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;"></td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">1.总房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.totalRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.totalRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.totalRoomNum)|toMoney}}</td>
            </tr>
              <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D1</td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">维修房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.repairRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.repairRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.repairRoomNum)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">D2</td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">可售房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.onlineRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.onlineRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.onlineRoomNum)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">E</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">2.售房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.individualRoomNum)+(tableData.reportPo == null ? 0 : tableData.reportPo.teamRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.individualRoomNum)+(tableMonth == null ? 0 : tableMonth.teamRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.individualRoomNum)+(tableYear == null ? 0 : tableYear.teamRoomNum)|toMoney}}</td>
            </tr>


             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">散客售房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.individualRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.individualRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.individualRoomNum)|toMoney}}</td>
            </tr>
            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;"></td>
               <td style="width: 16%;padding: 6px 2px 6px 30px;border: 1px solid #000;font-size: 12px;">团队售房数</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.teamRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.teamRoomNum)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.teamRoomNum)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">F=E/D</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">3.出租率(总房数)</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(((tableData.reportPo == null ? 0 : tableData.reportPo.individualRoomNum)+(tableData.reportPo == null ? 0 : tableData.reportPo.teamRoomNum))/(tableData.reportPo == null ? 0 : tableData.reportPo.totalRoomNum)*100).toFixed(2)}}%</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(((tableMonth == null ? 0 : tableMonth.individualRoomNum)+(tableMonth == null ? 0 : tableMonth.teamRoomNum))/(tableMonth == null ? 0 : tableMonth.totalRoomNum)*100).toFixed(2)}}%</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(((tableYear == null ? 0 : tableYear.individualRoomNum)+(tableYear == null ? 0 : tableYear.teamRoomNum))/(tableYear == null ? 0 : tableYear.totalRoomNum)*100).toFixed(2)}}%</td>
            </tr>

            <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">G=E/D2</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">4.出租率(可售房)</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(Number(tableData.reportPo == null ? 0 : tableData.reportPo.leaseRate)*100).toFixed(2)}}%</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(Number(tableMonth == null|| tableMonth.leaseRate==null ? 0 : tableMonth.leaseRate)*100).toFixed(2)}}%</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(Number(tableYear == null ? 0 : tableYear.leaseRate)*100).toFixed(2)}}%</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">H=A1</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">5.房费收入</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.totalIncome)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.totalIncome)|toMoney}}</td>
            </tr>
             <tr>
              <td style="width: 16%;padding: 6px 2px 6px 1px;border: 1px solid #000;font-size: 12px;">I=H/E</td>
               <td style="width: 16%;padding: 6px 2px 6px 15px;border: 1px solid #000;font-size: 12px;">6.平均房价</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.averageRoomRate)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.averageRoomRate)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.averageRoomRate)|toMoney}}</td>
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
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableData.reportPo == null ? 0 : tableData.reportPo.intermediaryCommission)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableMonth == null ? 0 : tableMonth.intermediaryCommission)|toMoney}}</td>
              <td style="width: 16%;padding: 6px 2px 6px 1px;text-align: right;border: 1px solid #000;font-size: 12px;">{{(tableYear == null ? 0 : tableYear.intermediaryCommission)|toMoney}}</td>
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
import { managerReport,turnoverDailyReport } from "@/api/reportCenter/pmsReportFormController"
import { getLodop } from '@/utils/lodop'
import downloadExcel from '@/components/download/downloadExcel'
import moment from "moment"


export default {
   data() {
    return {
      userInfo:{},
      sDate: moment().format("YYYY-MM-DD"),
      queryObj:{ userName:"",shift:"",userPk:'',shiftPk:'',begin:moment().format("YYYY-MM-DD"),end:moment().add(1,"days").format("YYYY-MM-DD")},
      activeCompany:{},
      tableData: {},
      tableMonth:{},
      tableYear:{},
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
      // this.getList()
      this.turnoverDailyReport();
    },

    //查询所有营业日报数据
    turnoverDailyReport(){
       let self = this
      turnoverDailyReport(this.queryObj).then(res =>{
          self.tableData = res.data;
          console.log(res.data)
          self.tableMonth = res.data.monReportPo;
          self.tableYear = res.data.subReportPo;

      })
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
      let url = '/pms/report/mg/businessDailyExcel?begin='+this.queryObj.begin
      downloadExcel(url, '营业报表');
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
      this.LODOP.ADD_PRINT_TABLE(90,10,750,843,document.getElementById("print-managerdailyreportTable").innerHTML);
      // LODOP.ADD_PRINT_TABLE(128,"5%","90%",314,strStyle+document.getElementById("div2").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      this.LODOP.ADD_PRINT_HTM(30,30,700,80,document.getElementById("print-managerdailyreportTitle").innerHTML);//设置log
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.ADD_PRINT_RECT(0,0,0,0,0,0);//边框

      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM("1000px",15,"794px","30px","<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.ADD_PRINT_HTM(1003,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
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





