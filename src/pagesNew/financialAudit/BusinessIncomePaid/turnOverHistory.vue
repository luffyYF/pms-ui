<template>
  <div style="padding:0 30px">
    <el-col :span="24" class="title">
      <el-form :inline="true" size="mini" style="margin-top:10px;" :model="queryObj" class="demo-form-inline">
      <el-form-item label="投缴营业日期：">
        <el-date-picker v-model="queryObj.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
      </el-form-item>
      <el-form-item label="操作员：">
        <el-select v-model="queryObj.cashier" placeholder="选择操作员">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="CRT" value="CRT"></el-option>
          <el-option label="CRI" value="CRI"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次：">
        <el-select v-model="queryObj.shift" placeholder="选择班次">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="凌晨班" value="凌晨班"></el-option>
          <el-option label="早班" value="早班"></el-option>
          <el-option label="午班" value="午班"></el-option>
          <el-option label="早班" value="早班"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="demo-input-suffix">
      <div style="margin-top:10px;">
        <el-button type="primary" size="mini">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <el-button type="primary" size="mini">导出EXCEL</el-button>
        <el-button type="primary" size="mini">添加到收藏夹</el-button>
        <el-button type="primary" size="mini">打印预览</el-button>
      </div>
    </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>营业额上缴查询报表</h3>
        </div>
        <div class="tabs-contetn">
            <p style="margin: 0 0 5px;text-align:center; ">
              投缴营业日期：<span> {{queryObj.dateRange[0]}}至{{queryObj.dateRange[1]}}</span>
              班次：<span  style="padding:0 40px 0 20px;"> {{queryObj.shift}}</span>
              收银员：<span  style="padding:0 20px;"> {{queryObj.cashier}}</span>
            </p>
          <el-table :data="tableData6" border height="250" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="投缴时间"></el-table-column>
            <el-table-column prop="name" label="净现金"></el-table-column>
            <el-table-column prop="id" label="银行卡"></el-table-column>
            <el-table-column prop="name" label="其它"></el-table-column>
            <el-table-column prop="totalConsumption" label="小计"></el-table-column>
            <el-table-column prop="totalConsumption" label="净现金"></el-table-column>
            <el-table-column prop="id" label="银行卡"></el-table-column>
            <el-table-column prop="id" label="其它"></el-table-column>
            <el-table-column prop="balance" label="小计"></el-table-column>
            <el-table-column prop="id" label="投缴人"></el-table-column>
            <el-table-column prop="id" label="授权人"></el-table-column>
            <el-table-column prop="balance" label="备注"></el-table-column>

            <!-- <el-table-column prop="amount1" label="原房型"></el-table-column>
            <el-table-column prop="amount2" label="原房价"></el-table-column>
            <el-table-column prop="amount3" label="目的房号"></el-table-column>
            <el-table-column prop="rechargeAmount" label="目的房型"></el-table-column>
            <el-table-column prop="invoiceValue" label="目的房价"></el-table-column>
            <el-table-column prop="name" label="换房类型"></el-table-column>
            
            <el-table-column prop="deposit" label="操作时间"></el-table-column>
           
            <el-table-column prop="balance" label="操作员"></el-table-column>
            <el-table-column prop="balance" label="授权人"></el-table-column> -->
            
          </el-table>
          <p style="height:20px;"><span class="left">第一页，共一页</span><span style="padding-left:50px;">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import Moment from "moment";
export default {
  data() {
    return {
      value: "",
      queryObj: {
        cashier: "全部",
        shift: "全部",
        roomNum: "",
        dateRange: [
          Moment(new Date()).format("YYYY-MM-DD"),
          Moment(new Date()).format("YYYY-MM-DD")
        ],
        beginDate: Moment(new Date()).format("YYYY-MM-DD"),
        endDate: Moment(new Date()).format("YYYY-MM-DD")
      },
      tableData6: [
        {
          id: "12987122",
          name: "小兰",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
          rechargeAmount: 113,
          invoiceValue: 121,
          deposit: 1231,
          totalConsumption: 313,
          balance: 221
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
          rechargeAmount: 113,
          invoiceValue: 121,
          deposit: 1231,
          totalConsumption: 313,
          balance: 221
        },
        {
          id: "12987124",
          name: "测试",
          amount1: "120",
          amount2: "1.9",
          amount3: 9,
          rechargeAmount: 113,
          invoiceValue: 121,
          deposit: 1231,
          totalConsumption: 313,
          balance: 221
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
          rechargeAmount: 113,
          invoiceValue: 121,
          deposit: 1231,
          totalConsumption: 313,
          balance: 221
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
          rechargeAmount: 113,
          invoiceValue: 121,
          deposit: 1231,
          totalConsumption: 313,
          balance: 221
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.title {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title {
  text-align: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
.tabsAdd {
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
</style>


