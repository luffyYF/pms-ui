<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        协议名称：<el-input v-model="value" size="mini" style="width:120px"></el-input>
        房间状态：<el-select v-model="value" size="mini" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        自然日：<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
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
          <h3>协议单位佣金明细报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">自然日从：<span>2018-03-09</span></p>
          <el-table :data="tableData6" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="会议室编号"></el-table-column>
            <el-table-column prop="name" label="会议室名称"></el-table-column>
            <el-table-column prop="amount1" label="会场规格"></el-table-column>
            <el-table-column prop="amount2" label="面积"></el-table-column>
            <el-table-column prop="amount3" label="容纳人数"></el-table-column>
            <el-table-column prop="name" label="管理员"></el-table-column>
          </el-table>
          <p class="tabsAdd">协议名称：	</p>
          <p class="tabsAdd">
            <span>房号_</span>
            <span>房型_</span>
            <span>抵店_</span>
            <span>离店_</span>
            <span>状态_</span>							
          </p>
          <p class="tabsAdd"><span>房号_</span></p>
          <p class="tabsAdd"><span>小计</span></p>
          <p class="tabsAdd"><span>合计</span></p>
          <p class="tabsAdd"><span>总计</span></p>
          <p style="height:20px;"><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
          <p style="margin-top:20px;">注：按照房费（只统计夜核房费和全日租）产生的营业日期统计，其他房间转账到协议单位房间的房费也统计佣金</p>
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
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
</style>


