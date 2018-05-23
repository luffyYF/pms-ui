<template>
  <div>
      <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <!-- 营业日期：<el-date-picker v-model="datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker> -->
        营业日期：<el-date-picker v-model="datepicker"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" 
                    :picker-options="startTimeOptions"
                    @change="roomDailyReportList" size="mini">
                </el-date-picker>
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
          <h3>管理层日报表</h3>
        </div>
        <div class="tabs-contetn">
          <!-- <p style="margin: 0px">打印日期：<span>自 2018-03-09 至 2018-03-09</span>&nbsp;&nbsp;&nbsp;&nbsp;营业日期：<span>2018-03-09</span> </p> -->
          <el-table :data="tableData" border height="350" style="width: 100%; margin-top: 5px">
            <!-- <el-table-column prop="name" label="星期"></el-table-column> -->
            <el-table-column prop="businessDate" label="日期"></el-table-column>
            <el-table-column prop="totalRoomNum" label="可出租间数"></el-table-column>
            <el-table-column prop="rentalRoomNum" label="过夜出租间数"></el-table-column>
            <!-- <el-table-column prop="name" label="时租间数"></el-table-column> -->
            <!-- <el-table-column label="过夜出租率">
                <template slot-scope="scope">{{(scope.row.rentalRoomNum/scope.row.totalRoomNum)}}</template>
            </el-table-column> -->
            <el-table-column label="平均房价">
                <template slot-scope="scope">{{scope.row.totalIncome == 0 ? 0 : scope.row.totalIncome/scope.row.rentalRoomNum}}</template>
            </el-table-column>
            <el-table-column prop="totalIncome" label="总收入"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {dailyMgReport,roomDailyReport} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
export default {
  data() {
    return {
      datepicker: '',
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  created(){
    this.roomDailyReportList();
  },
  methods: {
    roomDailyReportList(){
      const datepicker = this.datepicker;
      console.log(datepicker[0])
      roomDailyReport({begin: datepicker[0],end: datepicker[1]}).then(res => {
        console.log(res.data)
        this.tableData = res.data;
      });
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


