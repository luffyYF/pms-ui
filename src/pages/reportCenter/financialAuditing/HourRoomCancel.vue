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
                  @change="hourRoomCancelDate" size="mini">
              </el-date-picker>
            房号：<el-input v-model="value" size="mini" style="width:120px;margin-bottom:5px"></el-input>
            日租类别：<el-select v-model="region" placeholder="请选择收银员" size="mini" style="margin-bottom:5px">
                    <el-option label="全部" value="shanghai"></el-option>
                    <el-option label="全天日租" value="beijing"></el-option>
                    <el-option label="钟点房费" value="beijing"></el-option>
                    <el-option label="特殊房费" value="beijing"></el-option>
                    <el-option label="房费调整" value="beijing"></el-option>
                    <el-option label="半天日租" value="beijing"></el-option>
                    <el-option label="公寓租金" value="beijing"></el-option>
                    <el-option label="超时房费" value="beijing"></el-option>
                </el-select>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
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
          <h3>日租钟点取消报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table :data="tableData" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="id" label="日租类别"></el-table-column>
            <el-table-column prop="name" label="组单号"></el-table-column>
            <el-table-column prop="amount1" label="客单号"></el-table-column>
            <el-table-column prop="amount2" label="房号"></el-table-column>
            <el-table-column prop="amount3" label="客人级别"></el-table-column>
            <el-table-column prop="amount3" label="入住时间"></el-table-column>
            <el-table-column prop="amount3" label="取消时间"></el-table-column>
            <el-table-column prop="amount3" label="授权人"></el-table-column>
            <el-table-column prop="amount3" label="取消金额"></el-table-column>
            <el-table-column prop="amount3" label="备注"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {hourRoomCancel} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
export default {
  data() {
    return {
      datepicker: '',
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      value: '',
      region: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  created(){
    this.hourRoomCancelDate();
  },
  methods: {
    hourRoomCancelDate(){
      const datepicker = this.datepicker;  
      hourRoomCancel({begin: datepicker[0], end: datepicker[1]}).then(res => {
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


