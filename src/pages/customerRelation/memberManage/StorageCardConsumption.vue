<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        消费分店：<el-select v-model="value" placeholder="请选择分店" size="mini" class="report-right">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="华发商都" value="beijing"></el-option>
              <el-option label="吉大水库" value="beijing"></el-option>
              <el-option label="格力香樟" value="beijing"></el-option>
            </el-select>
        注册分店：<el-select v-model="value" placeholder="请选择分店" size="mini" class="report-right">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="华发商都" value="beijing"></el-option>
              <el-option label="吉大水库" value="beijing"></el-option>
              <el-option label="格力香樟" value="beijing"></el-option>
            </el-select>   
        会员级别：<el-select v-model="value" placeholder="请选择级别" size="mini" style="width:180px; margin-bottom:10px">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="普通会员" value="beijing"></el-option>
              <el-option label="高级会员" value="beijing"></el-option>
              <el-option label="VIP会员" value="beijing"></el-option>
              <el-option label="铂金会员" value="beijing"></el-option>
              <el-option label="尊贵会员" value="beijing"></el-option>
            </el-select>     
        会员号：<el-input placeholder="请输入内容" v-model="value" clearable size="mini" class="report-right"></el-input><br/>
        营业日期：<el-date-picker v-model="value" :picker-options="startTimeOptions" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" style="margin-bottom:10px"></el-date-picker>    
        收银员：<el-select v-model="value" placeholder="请选择充值来源" size="mini" class="report-right">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="鹿鹿鹿" value="beijing"></el-option>
              <el-option label="乌拉拉" value="beijing"></el-option>
            </el-select>
        班次：<el-select v-model="value" placeholder="请选择充值类型" size="mini" class="report-right">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="早班" value="beijing"></el-option>
                  <el-option label="晚班" value="beijing"></el-option>
                </el-select>
        <div style="margin-bottom:10px">
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
          <h3>会员储值卡消费报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table :data="tableData6" border height="200" show-summary style="width: 100%; margin-top: 5px">
            <el-table-column prop="name" label="消费分店"></el-table-column>
            <el-table-column prop="id" label="注册分店"></el-table-column>
            <el-table-column prop="amount1" label="来源"></el-table-column>
            <el-table-column prop="amount2" label="收银员"></el-table-column>
            <el-table-column prop="amount2" label="会员号"></el-table-column>
            <el-table-column prop="amount2" label="姓名"></el-table-column>
            <el-table-column prop="amount2" label="会员级别"></el-table-column>
            <el-table-column prop="amount2" label="组单"></el-table-column>
            <el-table-column prop="amount2" label="客单"></el-table-column>
            <el-table-column prop="amount2" label="房号"></el-table-column>
            <el-table-column prop="amount2" label="结算"></el-table-column>
            <el-table-column prop="amount2" label="发生日期"></el-table-column>
            <el-table-column prop="amount2" label="原始凭证"></el-table-column>
            <el-table-column prop="amount2" label="备注"></el-table-column>
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
.report-right{
  width: 180px;
  margin-bottom: 10px;
}
.report-right+.report-right{
  margin-right: 10px;
}
</style>