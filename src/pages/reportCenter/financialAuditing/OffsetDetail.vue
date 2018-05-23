<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
          <!-- 营业日期：<el-date-picker v-model="form.datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" style="margin-bottom:5px"></el-date-picker> -->
          营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  @change="offsetDetailDate" size="mini">
              </el-date-picker>
          房号：<el-input v-model="value" size="mini" style="width:120px;margin-bottom:5px"></el-input>
          收银员：<el-select v-model="value" placeholder="请选择收银员" size="mini" style="margin-bottom:5px">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          班次：<el-select v-model="value" placeholder="请选择班次" size="mini" style="margin-bottom:5px">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="早班" value="beijing"></el-option>
                  <el-option label="中班" value="beijing"></el-option>
                  <el-option label="晚班" value="beijing"></el-option>
                  <el-option label="凌晨班" value="beijing"></el-option>
              </el-select>
          项目：<el-select v-model="value" placeholder="请选择项目" size="mini" style="margin-bottom:5px">
                  <el-option label="全部" value="shanghai"></el-option>
                  <el-option label="房费" value="beijing"></el-option>
                  <el-option label="房费" value="beijing"></el-option>
                  <el-option label="支付宝支付" value="beijing"></el-option>
                  <el-option label="信用支付" value="beijing"></el-option>
                  <el-option label="其他" value="beijing"></el-option>
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
          <h3>冲减明细报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table :data="tableData" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="房号"></el-table-column>
            <el-table-column prop="name" label="客人姓名"></el-table-column>
            <el-table-column prop="amount1" label="项目名称"></el-table-column>
            <el-table-column prop="amount2" label="入账时间"></el-table-column>
            <el-table-column prop="amount3" label="消费金额"></el-table-column>
            <el-table-column prop="amount3" label="结算金额"></el-table-column>
            <el-table-column prop="amount3" label="收银员"></el-table-column>
            <el-table-column prop="amount3" label="授权人"></el-table-column>
            <el-table-column prop="amount3" label="备注"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {offsetDetail} from '@/api/reportCenter'
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
    this.offsetDetailDate();
  },
  methods: {
    offsetDetailDate(){
      const datepicker = this.datepicker;
      offsetDetail({begin: datepicker[0], end: datepicker[1]}).then(res => {
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


