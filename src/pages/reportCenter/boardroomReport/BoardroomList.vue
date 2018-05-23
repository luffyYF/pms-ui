<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-button size="mini" type="primary">网页预览</el-button>
        <el-button size="mini" type="primary">PDF预览</el-button>
        <el-button size="mini" type="primary">导出EXCEL</el-button>
        <el-button size="mini" type="primary">添加到收藏夹</el-button>
        <el-button size="mini" type="primary">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>会议室报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">自然日从：<span>2018-03-09</span></p>
          <el-table :data="tableData6" border height="200" show-summary style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="会议室编号"></el-table-column>
            <el-table-column prop="name" label="会议室名称"></el-table-column>
            <el-table-column prop="amount1" label="会场规格"></el-table-column>
            <el-table-column prop="amount2" label="面积"></el-table-column>
            <el-table-column prop="amount3" label="容纳人数"></el-table-column>
            <el-table-column prop="name" label="管理员"></el-table-column>
          </el-table>
          <p><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
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


