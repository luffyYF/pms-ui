<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        发卡营业日期自：<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        会员级别：<el-select v-model="value" size="mini" placeholder="请选择会员级别">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="普通会员" value="beijing"></el-option>
                </el-select>
        发卡人：<el-select v-model="value" size="mini" placeholder="请选择发卡人">
                <el-option label="全部" value="shanghai"></el-option>
                <el-option label="CRT" value="beijing"></el-option>
              </el-select>
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
          <h3>会员发卡报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">自然日从：<span>2018-03-09</span>&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<span>2018-03-10</span></p>
          <el-table :data="tableData6" border height="200" show-summary :summary-method="getSummaries" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="会员卡号"></el-table-column>
            <el-table-column prop="name" label="客人姓名"></el-table-column>
            <el-table-column prop="amount1" label="性别"></el-table-column>
            <el-table-column prop="amount2" label="籍贯"></el-table-column>
            <el-table-column prop="amount3" label="证件号码"></el-table-column>
            <el-table-column prop="name" label="出生日期"></el-table-column>
            <el-table-column prop="name" label="会员级别"></el-table-column>
            <el-table-column prop="amount1" label="电话"></el-table-column>
            <el-table-column prop="amount2" label="发卡人"></el-table-column>
            <el-table-column prop="membershipFee" label="会员卡费"></el-table-column>
            <el-table-column prop="name" label="注册时间"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
          <p style="margin-top:20px; color: red">注：此报表只统计会员发卡数据，会员换卡的数据请在会员换卡报表中查询。</p>
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
        membershipFee: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
        membershipFee: 10
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
        membershipFee: 10
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
        membershipFee: 10
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
        membershipFee: 10
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
        if(column.property === 'membershipFee') {
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


