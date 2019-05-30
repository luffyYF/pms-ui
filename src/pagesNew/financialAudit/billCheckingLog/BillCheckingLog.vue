// 订对账记录
<template>
  <div>
    <el-col :span="24">
      <el-form :model="searchForm" label-width="80px" size="mini" :inline="true">
        <el-form-item label="入住日期">
          <el-date-picker v-model="searchForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="search"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作员">
          <el-input type="text" v-model="searchForm.createUserName"></el-input>
        </el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
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
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="totalRoomConsume" label="房费总额"></el-table-column>
            <el-table-column prop="totalCommission" label="佣金总额"></el-table-column>
            <el-table-column prop="totalPromotion" label="优惠总额"></el-table-column>
            <el-table-column prop="diffRoomConsume" label="房费差额"></el-table-column>
            <el-table-column prop="diffCommission" label="佣金差额"></el-table-column>
            <el-table-column prop="diffPromotion" label="优惠差额"></el-table-column>
            <el-table-column prop="createTime" label="日期">
              <!-- <template slot-scope="scope">
                <span>{{moment(scope.row.beginDate).format('YYYY-MM-DD')}}</span>
              </template> -->
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">  
                <el-button type="primary" size="mini" @click="showDetail(scope.row.checkingPk)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin: 10px 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>


    <DetailDialog ref="detailDialogRef"></DetailDialog>
  </div>
</template>
<script>
import moment from "moment";
import { formatDate, copyObj } from "@/utils/index";
import { historyRoomExchange } from "@/api/reportCenter";
import { listBillChecking } from "@/api/financial/FinancialAuditController" ;
import DetailDialog from './detailDialog'
export default {
  components:{DetailDialog},
  data() {
    return {
      searchForm: {
        datepicker: [],
        createUserName: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      orderTable: [],
      loading: false,
      moment: moment,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      let data = {
        begin: this.searchForm.datepicker !=null && this.searchForm.datepicker[0] ?  this.searchForm.datepicker[0] : null,
        end: this.searchForm.datepicker !=null && this.searchForm.datepicker[1]  ? this.searchForm.datepicker[1] : null,
        createUserName: this.searchForm.createUserName,
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize
      };
      this.loading = true;
      listBillChecking(data).then(res => {
        this.total = Number(res.data.count);
        this.orderTable = res.data.list;
      }).finally(()=>{
        this.loading = false;
      });
    },
    // 分页相关
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.search();
    },
    // 分页相关
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.search();
    },
    showDetail(checkingPk){
      this.$refs.detailDialogRef.showDialog(checkingPk);
    },
  }
};
</script>
<style scoped>
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


