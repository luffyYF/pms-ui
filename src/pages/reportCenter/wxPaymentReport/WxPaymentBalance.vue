<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        自然日：<el-date-picker  v-model="value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        <el-button size="mini">网页预览</el-button>
        <el-button size="mini">PDF预览</el-button>
        <el-button size="mini">导出EXCEL</el-button>
        <el-button size="mini">添加到收藏夹</el-button>
        <el-button size="mini">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>微信支付对账明细报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">自然日从：<span>2018-03-09 00:00:00</span>&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<span>2018-03-09 23:59:59</span></p>
          <el-table :data="tableData6" border height="200" show-summary style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="项目"></el-table-column>
            <el-table-column prop="amount1" label="组单"></el-table-column>
            <el-table-column prop="amount2" label="客单"></el-table-column>
            <el-table-column prop="amount3" label="房号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="amount1" label="金额"></el-table-column>
            <el-table-column prop="amount2" label="发生日期"></el-table-column>
            <el-table-column prop="amount3" label="备注"></el-table-column>
          </el-table>
          <p><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">打印人：	深圳前海豪菲尔</span></p>
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
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    


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
</style>


