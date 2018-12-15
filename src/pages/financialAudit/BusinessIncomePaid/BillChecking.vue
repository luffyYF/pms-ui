// 订单对账
<template>
  <div>
    <el-col :span="24" class="title">
      <div class="finan-search-form">
        入住日期：
        <el-date-picker v-model="searchForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="search" size="mini">
        </el-date-picker>
        订单状态：
        <el-select v-model="searchForm.status" multiple placeholder="请选择" size="mini" w>
          <el-option label="退房未结" value="7"></el-option>
          <el-option label="结账离店" value="4"></el-option>
        </el-select>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>订单对账确认收账</h3>
        </div>
        <div class="tabs-contetn">
          <!-- <p style="margin: 0px">酒店日期：<span>2018-03-09</span></p> -->
          <el-table 
          :data="orderTable" 
          @selection-change="handleSelectionChange"
          @expand-change="expandChange"
          v-loading="loading" 
          height="400"
          border style="width: 100%; margin-top: 5px" 
          size="mini">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="subTableData[scope.row.orderPk]" border size="mini">
                  <el-table-column prop="billCode" label="入账编号"></el-table-column>
                  <el-table-column prop="roomNumber" label="房号"></el-table-column>
                  <el-table-column prop="memName" label="客人姓名"></el-table-column>
                  <el-table-column prop="businessDate" label="营业日期"></el-table-column>
                  <el-table-column prop="projectName" label="项目"></el-table-column>
                  <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
                  <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="beginDate" label="入住日期">
              <template slot-scope="scope">
                <span>{{moment(scope.row.beginDate).format('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderNo" label="订单编号"></el-table-column>
            <el-table-column prop="userName" label="预定人"></el-table-column>
            <el-table-column prop="userPhone" label="预定人手机号"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="totalConsume" label="消费金额"></el-table-column>
            <el-table-column prop="totalFree" label="房费"></el-table-column>
            <el-table-column prop="totalOtherConsume" label="其他消费"></el-table-column>
            <el-table-column prop="totalCommission" label="佣金"></el-table-column>
            <el-table-column prop="totalPromotion" label="优惠"></el-table-column>
          </el-table>
          <div class="sum-opr">
            <p class="sum-opr-item">
              消费总额：<span>¥ {{settleData.settleConsume}}</span>
            </p>
            <p class="sum-opr-item">
              房费总额：<span>¥ {{settleData.settleRoomConsume}}</span>
            </p>
            <p class="sum-opr-item">
              其他消费总额：<span>¥ {{settleData.settleOtherConsume}}</span>
            </p>
            <p class="sum-opr-item">
              佣金总额：<span>¥ {{settleData.settleCommission}}</span>
            </p>
            <p class="sum-opr-item">
              优惠总额：<span>¥ {{settleData.settlePromotion}}</span>
            </p>
            <p class="r-sum-opr-item">
              操作员：{{this.createUserName}} &nbsp;&nbsp;&nbsp;
              <el-button type="primary" size="mini" @click="saveBillChecking" :loading="clickLoading">确认收账</el-button>
            </p>
          </div>
          <el-pagination style="margin: 10px 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import moment from "moment";
import { formatDate, copyObj } from "@/utils/index";
import { historyRoomExchange } from "@/api/reportCenter";
import {
  billChecking,
  billList,
  saveBillChecking
} from "@/api/financial/FinancialAuditController";
export default {
  data() {
    return {
      searchForm: {
        datepicker: [
          moment()
            .subtract(1, "M")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ],
        status: ["4", "7"],
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      orderTable: [],
      loading: false,
      clickLoading: false,
      moment: moment,
      multipleSelection: [],
      subTableData: {},
      settleData:{
        settleConsume: 0,//消费总额
        settleRoomConsume: 0,//房费总额
        settleCommission: 0,//佣金总额
        settlePromotion: 0,//优惠总额
        settleOtherConsume: 0,//优惠总额
      },
      createUserName: JSON.parse(localStorage.getItem('pms_userinfo')).upmsRealName
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      if (!this.searchForm.datepicker) {
        this.$message.warning("请选择入住日期");
        return;
      }
      if (!this.searchForm.status || this.searchForm.status.length <= 0) {
        this.$message.warning("请选择订单状态");
        return;
      }
      
      let data = {
        begin: this.searchForm.datepicker[0],
        end: this.searchForm.datepicker[1],
        status: this.searchForm.status.toString(),
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize
      };
      this.subTableData={}
      this.loading = true;
      billChecking(data).then(res => {
        this.total = Number(res.data.totalCount);
        this.orderTable = res.data.list;
        //初始化子账单table
        this.orderTable.forEach(item=>{
          this.$set(this.subTableData, item.orderPk, [])
          // this.subTableData[item.orderPk] = []
        })
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
    //列表选择
    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.settleData.settleConsume = 0;
      this.settleData.settleRoomConsume = 0;
      this.settleData.settleCommission = 0;
      this.settleData.settlePromotion = 0;

      let temp1 = 0;
      let temp2 = 0;
      let temp3 = 0;
      let temp4 = 0;
      let temp5 = 0;
      this.multipleSelection.forEach(item=>{
        temp1 += Number(item.totalConsume)
        temp2 += Number(item.totalFree)
        temp3 += Number(item.totalCommission)
        temp4 += Number(item.totalPromotion)
        temp5 += Number(item.totalOtherConsume)
      })

      this.settleData.settleConsume = temp1.toFixed(2);
      this.settleData.settleRoomConsume = temp2.toFixed(2);
      this.settleData.settleCommission = temp3.toFixed(2);
      this.settleData.settlePromotion = temp4.toFixed(2);
      this.settleData.settleOtherConsume = temp5.toFixed(2);

    },
    // 列表展开，加载账单
    expandChange(row, expandedRows) {
      if(this.subTableData[row.orderPk].length>0) {
        return;
      }
      billList({orderPk:row.orderPk}).then(res=>{
        this.$set(this.subTableData,row.orderPk,res.data)
      })
    },

    saveBillChecking(){
      if(this.multipleSelection.length<=0){
        this.$message.warning('至少选择一条')
        return;
      }
      let temparr = [];
      this.multipleSelection.forEach(item=>{
        temparr.push({
          orderPk: item.orderPk,
          orderNo: item.orderNo,
          userName: item.userName,
          totalConsume: item.totalConsume,
          totalRoomConsume: item.totalFree,
          totalOtherConsume: item.totalOtherConsume,
          totalCommission: item.totalCommission,
          totalPromotion: item.totalPromotion
        });
      })
      let data = {
        check:{
          createUserName: this.createUserName,
          totalConsume:this.settleData.settleConsume,
          totalRoomConsume:this.settleData.settleRoomConsume,
          totalCommission:this.settleData.settleCommission,
          totalPromotion:this.settleData.settlePromotion,
          totalOtherConsume:this.settleData.settleOtherConsume,

          diffConsume:0,
          diffRoomConsume:0,
          diffCommission:0,
          diffPromotion:0,
          diffOtherConsume:0,
        },
        checkDetails:temparr
      }
      this.clickLoading=true;
      saveBillChecking(data).then(res=>{
        this.$message.success('确认收账成功');
        this.search();
      }).finally(()=>{
        this.clickLoading=false;
      })
    }
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


