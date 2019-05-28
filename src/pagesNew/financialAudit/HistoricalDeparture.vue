<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  @change="historyStoreDate" size="mini">
              </el-date-picker>
        房号：<el-input v-model="value" size="mini" style="width:120px;margin-bottom:5px"></el-input>
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
          <h3>历史离店报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table :data="tableData" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="组单号"></el-table-column>
            <el-table-column prop="name" label="房号"></el-table-column>
            <el-table-column prop="amount1" label="房间类型"></el-table-column>
            <el-table-column prop="amount2" label="房价"></el-table-column>
            <el-table-column prop="amount3" label="宾客姓名"></el-table-column>
            <el-table-column prop="amount3" label="入住时间"></el-table-column>
            <el-table-column prop="amount3" label="离店时间"></el-table-column>
            <el-table-column prop="amount3" label="消费">
              <template>		
                <el-table-column prop="amount3" label="房费"></el-table-column>
                <el-table-column prop="amount3" label="商品"></el-table-column>
                <el-table-column prop="amount3" label="其他"></el-table-column>
              </template>
            </el-table-column>					
            <el-table-column prop="amount3" label="消费合计	"></el-table-column>
            <el-table-column prop="amount3" label="结算">
              <template>		
                <el-table-column prop="amount3" label="现金"></el-table-column>
                <el-table-column prop="amount3" label="银行卡"></el-table-column>
                <el-table-column prop="amount3" label="储值卡"></el-table-column>
                <el-table-column prop="amount3" label="支付宝"></el-table-column>
                <el-table-column prop="amount3" label="微信支付"></el-table-column>
                <el-table-column prop="amount3" label="其他"></el-table-column>
              </template>
            </el-table-column>		
            <el-table-column prop="amount3" label="结算合计	"></el-table-column>
            <el-table-column prop="amount3" label="操作员	"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {historyStore} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
export default {
  data() {
    return {
      datepicker: '',
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      value: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  created(){
    this.historyStoreDate();
  },
  methods: {
    historyStoreDate(){
      const datepicker = this.datepicker;
      historyStore({begin: datepicker[0], end: datepicker[1]}).then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
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


