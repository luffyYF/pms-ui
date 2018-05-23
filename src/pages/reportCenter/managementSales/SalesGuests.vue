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
          <h3>销售分析报表 - 渠道</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">营业日期：<span>自 2018-03-09 至 2018-03-09</span></p>
          <el-table :data="tableData6" border height="450" show-summary :summary-method="getSummaries" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="渠道"></el-table-column>
            <el-table-column prop="roomNightNumber" label="房晚数"></el-table-column>
            <el-table-column prop="amount1" label="房晚数%"></el-table-column>
            <el-table-column prop="lateNumberOfPeople" label="人晚数"></el-table-column>
            <el-table-column prop="amount3" label="人晚数%"></el-table-column>
            <el-table-column prop="rentIncome" label="房租收入"></el-table-column>
            <el-table-column prop="amount3" label="房租收入%"></el-table-column>
            <el-table-column prop="restaurantIncome" label="餐饮收入"></el-table-column>
            <el-table-column prop="otherIncome" label="其他收入"></el-table-column>
            <el-table-column prop="totalConsumption" label="消费合计"></el-table-column>
            <el-table-column prop="amount3" label="消费合计%"></el-table-column>
            <el-table-column prop="amount3" label="平均房价"></el-table-column>
            <el-table-column prop="amount3" label="房均消费"></el-table-column>
            <el-table-column prop="amount3" label="人均消费"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
          <p style="height:20px;color:red">	注：此报表为夜审报表，数据统计截止到昨天。。</p>
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
        roomNightNumber: 10,  
        lateNumberOfPeople: 10, 
        rentIncome: 10, 
        restaurantIncome: 10, 
        otherIncome: 10, 
        totalConsumption: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        roomNightNumber: 10,  
        lateNumberOfPeople: 10, 
        rentIncome: 10, 
        restaurantIncome: 10, 
        otherIncome: 10, 
        totalConsumption: 10
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        roomNightNumber: 10,  
        lateNumberOfPeople: 10, 
        rentIncome: 10, 
        restaurantIncome: 10, 
        otherIncome: 10, 
        totalConsumption: 10
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        roomNightNumber: 10,  
        lateNumberOfPeople: 10, 
        rentIncome: 10, 
        restaurantIncome: 10, 
        otherIncome: 10, 
        totalConsumption: 10
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
        roomNightNumber: 10,  
        lateNumberOfPeople: 10, 
        rentIncome: 10, 
        restaurantIncome: 10, 
        otherIncome: 10, 
        totalConsumption: 10
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
        if(column.property === 'roomNightNumber' || column.property === 'lateNumberOfPeople'  || column.property === 'rentIncome' || column.property === 'restaurantIncome' || column.property === 'otherIncome' || column.property === 'totalConsumption') {
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


