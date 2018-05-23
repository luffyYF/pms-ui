<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="value" :picker-options="startTimeOptions" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        手机号码：<el-input placeholder="请输入内容" v-model="value" clearable size="mini" style="width:180px"></el-input>
        排序：<el-select v-model="value" placeholder="请选择活动区域" size="mini" style="width:180px">
                  <el-option label="入住天数" value="shanghai"></el-option>
                  <el-option label="来店次数" value="beijing"></el-option>
                  <el-option label="房租消费" value="beijing"></el-option>
                  <el-option label="消费总数" value="beijing"></el-option>
                </el-select>
        <div style="margin-top: 10px;">
          <el-button size="mini" type="primary">网页预览</el-button>
          <el-button size="mini" type="primary">PDF预览</el-button>
          <el-button size="mini" type="primary">导出EXCEL</el-button>
          <el-button size="mini" type="primary">添加到收藏夹</el-button>
          <el-button size="mini" type="primary">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>会员消费排名</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">消费日期：<span>2018-03-09</span></p>
          <p style="color:red">注：此报表为夜审报表，数据统计截止到昨天。</p>
          <el-table :data="tableData6" border height="200" show-summary style="width: 100%; margin-top: 5px">
            <el-table-column prop="name" label="会员号"></el-table-column>
            <el-table-column prop="id" label="会员名称"></el-table-column>
            <el-table-column prop="amount1" label="性别"></el-table-column>
            <el-table-column prop="amount2" label="会员级别"></el-table-column>
            <el-table-column prop="amount2" label="手机号码"></el-table-column>
            <el-table-column prop="amount2" label="入住天数"></el-table-column>
            <el-table-column prop="amount2" label="来店次数"></el-table-column>
            <el-table-column prop="amount2" label="房租消费"></el-table-column>
            <el-table-column prop="amount2" label="消费总数"></el-table-column>
          </el-table>
          <p><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  methods: {
    init(){},
  },
  data() {
    return {
      value: '',
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      aaaa: Date.now(),
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