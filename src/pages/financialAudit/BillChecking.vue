// 订单对账
<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        开始日期：<el-date-picker v-model="datepicker"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" 
                @change="historyRoomExchangeDate" size="mini">
            </el-date-picker>
        原房号：<el-input v-model="srcRoomNumber" size="mini" style="width:120px"></el-input>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>退房未结订单对账结账</h3>
        </div>
        <div class="tabs-contetn">
          <!-- <p style="margin: 0px">酒店日期：<span>2018-03-09</span></p> -->
          <el-table v-loading="loading" :data="tableData" border height="200" style="width: 100%; margin-top: 5px">
            <el-table-column prop="guestName" label="客人姓名"></el-table-column>
            <el-table-column prop="srcRoomNumber" label="原房号"></el-table-column>
            <el-table-column prop="srcRoomTypeName" label="原房型"></el-table-column>
            <el-table-column prop="srcRoomPrice" label="原房价"></el-table-column>
            <el-table-column prop="targetRoomNumber" label="目的房号"></el-table-column>
            <el-table-column prop="targetRoomTypeName" label="目的房型"></el-table-column>
            <el-table-column prop="targetRoomPrice" label="目的房价"></el-table-column>
            <el-table-column prop="changeRoomType" label="换房类型"></el-table-column>
            <el-table-column prop="checkInDate" label="入住时间"></el-table-column>
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="authPerson" label="授权人"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
          <p style="height:20px;color:red">	注：此报表在2017年-11月升级后，新操作的换房数据才会显示房型、换房类型。</p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {formatDate, copyObj} from '@/utils/index'
import {historyRoomExchange} from '@/api/reportCenter'
import {billChecking} from '@/api/financial/FinancialAuditController'
export default {
  data() {
    return {
      datepicker: '',
      srcRoomNumber: '',
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      loading: false
    }
  },
  created(){
    this.historyRoomExchangeDate();
  },
  methods: {
    search(){
      console.log(this.datepicker);
      let data = {
        begin:this.datepicker[0],
        end:this.datepicker[1],
        status:[4,7],
        pageNum:1,
        pageSize:10
      }
      billChecking(data).then(res=>{
        console.log("结果",res.data)
      })
    },
    historyRoomExchangeDate(){
      this.loading = true
      historyRoomExchange().then(res => {
        this.loading = false
        this.tableData = res.data;
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


