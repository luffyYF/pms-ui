// 订单批注记录
<template>
  <div>
    <el-col :span="24">
      <el-form :model="searchForm" label-width="80px" size="mini" :inline="true">
        <el-form-item label="创建日期">
          <el-date-picker v-model="searchForm.datepicker" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="外账单号">
          <el-input type="text" v-model="searchForm.orderNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.billStatus" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未结账" value="UN_SET"></el-option>
            <el-option label="已结账" value="FINISH"></el-option>
          </el-select>
        </el-form-item>
        
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addBillOrder">新增</el-button>
      </el-form>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <!-- <div class="tavs-title">
          <h3>订单对账确认收账</h3>
        </div> -->
        <div class="tabs-contetn">
          <!-- <p style="margin: 0px">酒店日期：<span>2018-03-09</span></p> -->
          <el-table 
          :data="orderTable" 
          v-loading="loading"
          height="400"
          border style="width: 100%; margin-top: 5px" 
          size="mini">
            <el-table-column prop="orderNo" label="外账单号"></el-table-column>
            <el-table-column prop="billStatus" label="状态">
              <template slot-scope="scope">
                <span>{{billStatusMap[scope.row.billStatus]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="settleTime" label="结账时间"></el-table-column>
            <el-table-column prop="consumptionAmount" label="消费"></el-table-column>
            <el-table-column prop="settlementAmount" label="收款"></el-table-column>
            <el-table-column prop="shiftPk" label="班次">
              <template slot-scope="scope">
                <span>{{shiftName(scope.row.shiftPk)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.row.outsideBillOrderPk)">详情</el-button>
                <!-- <el-button type="primary" size="mini" >结账</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin: 10px 20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>

    <add-outside-bill-dialog ref="addOutsideBillDialogRef" @callback="search"></add-outside-bill-dialog>
  </div>
</template>
<script>
import moment from "moment";
import {billStatusMap} from '@/utils/orm'
import { list } from "@/api/financial/OutsideBillOrderController"
import {selectShift} from "@/api/utils/pmsShiftController"
import AddOutsideBillDialog from './AddOutsideBillDialog'
export default {
  components: {AddOutsideBillDialog},
  data() {
    return {
      billStatusMap: billStatusMap,
      loading: false,
      searchForm: {
        datepicker: [],
        orderNo: null,
        datepicker:[],
        billStatus:'',
        // pageNum: 1,
        // pageSize: 10
      },
      currPage: 1,
      total: 0,
      pageSize: 10,
      total: 0,
      orderTable: [],
      shiftArray:[],
    };
  },
  mounted() {
    this.search();
    this.shiftArray = []
    selectShift().then((data)=>{
      this.shiftArray = data.data
    })
  },
  computed: {
    shiftName() {
      return function(shiftPk){
        let name = ''
        this.shiftArray.forEach(item=>{
          if(item.value==shiftPk) {
            name = item.label
          }
        })
        return name
      }
    },
  },
  methods: {
    search() {
      let data = {
        orderNo: this.searchForm.orderNo,
        pageNum: this.currPage,
        pageSize: this.pageSize,
        beginDateTime: this.searchForm.datepicker ? this.searchForm.datepicker[0] : null,
        endDateTime: this.searchForm.datepicker ? this.searchForm.datepicker[1] : null,
        billStatus:this.searchForm.billStatus
      };
      list(data).then(res => {
        this.total = Number(res.data.total);
        this.orderTable = res.data.list;
      })
    },
    
    addBillOrder() {
      this.$refs.addOutsideBillDialogRef.showDialog()
    },
    showDetail(outsideBillOrderPk){
      this.$refs.addOutsideBillDialogRef.showDialog(outsideBillOrderPk)
    },
    // 分页相关
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.search();
    },
    // 分页相关
    handleCurrentChange(currPage) {
      this.currPage = currPage
      this.search();
    },
  }
};
</script>
<style scoped>
.price-big{
  color:green;
}
.price-small{
  color:red;
}
.title {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title {
  text-align: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
.tabsAdd {
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
.sum-opr{
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  margin-top: 0px;
  padding: 0 14px;
  background: #f7f7f7;
}
.sum-opr .sum-opr-item{
  float: left;
  font-size: 16px;
  margin-right: 35px;
}
.sum-opr .sum-opr-item span{
  color: #e41700;
  /* font-size: 18px; */
  font-weight: bold;
}
.sum-opr .r-sum-opr-item{
  float: right;
}
</style>
<style>
.finan-search-form .el-input--mini {
  width: 200px;
}
</style>


