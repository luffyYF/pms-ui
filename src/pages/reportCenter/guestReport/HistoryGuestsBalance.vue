<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        <el-button type="primary" size="mini">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <el-button type="primary" size="mini">导出EXCEL</el-button>
        <el-button type="primary" size="mini">添加到收藏夹</el-button>
        <el-button type="primary" size="mini">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>历史在店宾客余额及押金报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">开票日期：<span>自 2018-03-10 至 2018-03-10</span></p>
          <el-table :data="tableData6" border height="200"  show-summary :summary-method="getSummaries" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="宾客姓名"></el-table-column>
            <el-table-column prop="name" label="性别"></el-table-column>
            <el-table-column prop="amount1" label="证件类型"></el-table-column>
            <el-table-column prop="amount2" label="证件号码"></el-table-column>
            <el-table-column prop="amount3" label="房号"></el-table-column>
            <el-table-column prop="rechargeAmount" label="房型"></el-table-column>
            <el-table-column prop="invoiceValue" label="房价"></el-table-column>
            <el-table-column prop="name" label="入住时间"></el-table-column>
            <el-table-column prop="name" label="预离时间"></el-table-column>
            <el-table-column prop="deposit" label="已交押金"></el-table-column>
            <el-table-column prop="totalConsumption" label="消费总数"></el-table-column>
            <el-table-column prop="balance" label="余额"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      tableData6: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
        rechargeAmount: 113,
        invoiceValue: 121,
        deposit: 1231,
        totalConsumption: 313,
        balance: 221
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        rechargeAmount: 113,
        invoiceValue: 121,
        deposit: 1231,
        totalConsumption: 313,
        balance: 221
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        rechargeAmount: 113,
        invoiceValue: 121,
        deposit: 1231,
        totalConsumption: 313,
        balance: 221
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        rechargeAmount: 113,
        invoiceValue: 121,
        deposit: 1231,
        totalConsumption: 313,
        balance: 221
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
        rechargeAmount: 113, 
        invoiceValue: 121,
        deposit: 1231,
        totalConsumption: 313,
        balance: 221
      }]
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        console.log(column)
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(column.property === 'deposit' || column.property === 'totalConsumption' || column.property === 'balance') {
          const values = data.map(item => parseInt(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' ';
          } else {
            sums[index] = '';
          }
        }
      });
      return sums;
    }


  }
}
</script>
<style scoped>
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
</style>


