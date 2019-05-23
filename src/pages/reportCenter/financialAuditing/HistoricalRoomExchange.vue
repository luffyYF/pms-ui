<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form ref="form" :model="form">
          换房日期：<el-date-picker v-model="form.datepicker" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
          原房号：<el-input v-model="form.srcRoomNumber" size="mini" style="width:120px"></el-input>
        </el-form>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="historyRoomExchangeDate">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-historicalroomexchange">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>历史换房报表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">酒店日期：<span>{{localDate}}</span></p>
          <el-table 
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="guestName" label="客人姓名"></el-table-column>
            <el-table-column prop="srcRoomNumber" label="原房号"></el-table-column>
            <el-table-column prop="srcRoomTypeName" label="原房型"></el-table-column>
            <el-table-column prop="srcRoomPrice" label="原房价"></el-table-column>
            <el-table-column prop="targetRoomNumber" label="目的房号"></el-table-column>
            <el-table-column prop="targetRoomTypeName" label="目的房型"></el-table-column>
            <el-table-column prop="targetRoomPrice" label="目的房价"></el-table-column>
            <el-table-column prop="changeRoomType" label="换房类型"></el-table-column>
            <el-table-column prop="checkInDate" label="入住时间"></el-table-column>
            <el-table-column prop="createTime" label="操作时间"></el-table-column>
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <!-- <el-table-column prop="authPerson" label="授权人"></el-table-column> -->
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.realName}}</span></p>
          <p style="height:60px;color:red">	注：此报表在2017年-11月升级后，新操作的换房数据才会显示房型、换房类型。</p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {historyRoomExchange} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
export default {
  data() {
    return {
      form: {
        datepicker: [],
        srcRoomNumber: ''
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      localDate: formatDate(new Date(), 'yyyy-MM-dd'),
      tableData: [],
      loading: false,
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/historicalRoomExchangeExcel"
    }
  },
  created(){
    let date = new Date();
    date.setDate(date.getDate() - 1)
    this.form.datepicker = [formatDate(date, 'yyyy-MM-dd'), formatDate(date, 'yyyy-MM-dd')]
    this.historyRoomExchangeDate();
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
  },
  methods: {
    historyRoomExchangeDate(){
      this.loading = true
      let data = {
        beginDate: this.form.datepicker != null ? this.form.datepicker[0] : null,
        endDate: this.form.datepicker != null ? this.form.datepicker[1] : null,
        srcRoomNumber: this.form.srcRoomNumber
      }
      historyRoomExchange(data).then(res => {
        // console.log(res.data)
        this.loading = false
        this.tableData = res.data;
      })
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-historicalroomexchange").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.datepicker[0] + "&endDate=" + this.form.datepicker[1] + "&srcRoomNumber=" + this.form.srcRoomNumber);
    },
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


