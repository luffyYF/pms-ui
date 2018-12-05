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
        订单描述：<el-input type="text" v-model="searchForm.name" size="mini"></el-input>
        
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>订单对账确认收账</h3>
        </div>
        <div class="tabs-contetn">
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
                  <el-table-column prop="billCode" label="账单编号"></el-table-column>
                  <el-table-column prop="roomNumber" label="房号"></el-table-column>
                  <el-table-column prop="memName" label="客人姓名"></el-table-column>
                  <el-table-column prop="businessDate" label="营业日期"></el-table-column>
                  <el-table-column prop="projectName" label="项目"></el-table-column>
                  <el-table-column prop="sysPrice" label="系统价格"></el-table-column>
                  <el-table-column prop="inputPrice" label="录入价格">
                    <template slot-scope="billScope">
                      <span>{{billScope.row.inputPrice}}</span>
                      <el-button type="text" icon="el-icon-edit" @click="editInput(scope.row, billScope.row)"></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="diffPrice" label="差价">
                    <template slot-scope="scope">
                      <span :class="{'price-big':scope.row.diffPrice>0,'price-small':scope.row.diffPrice<0}">{{scope.row.diffPrice}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="postilRemark" label="备注"></el-table-column>
                  <!-- <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
                  <el-table-column prop="settlementAmount" label="结算金额"></el-table-column> -->
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="beginDate" label="入住日期">
              <template slot-scope="scope">
                <span>{{moment(scope.row.beginDate).format('YYYY-MM-DD')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="orderNo" label="订单编号"></el-table-column>
            <el-table-column prop="name" label="订单描述"></el-table-column>
            <el-table-column prop="userName" label="预定人"></el-table-column>
            <el-table-column prop="userPhone" label="预定人手机号"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="totalFree" label="房费"></el-table-column>
            <el-table-column prop="totalCommission" label="佣金"></el-table-column>
            <el-table-column prop="totalPromotion" label="平台优惠/促销"></el-table-column>
          </el-table>
          <div class="sum-opr">
            <p class="sum-opr-item">
              房费总额：<span>¥ {{settleData.settleRoomConsume}}</span>
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

    <el-dialog title="价格批注" :visible.sync="dialogVisiblePostil" width="300px" class="postil-dialog">
      <el-form ref="postilForm" :model="postilForm" label-width="85px" size="mini">
        <el-form-item label="系统价格：">
          <span>{{postilForm.sysPrice}}</span>
        </el-form-item>
        
        <el-form-item label="录入价格：">
          <el-input v-model="postilForm.inputPrice"></el-input>
        </el-form-item>
        <el-form-item label="差价：">
          <span :class="{'price-big':postilForm.diffPrice>0,'price-small':postilForm.diffPrice<0}">{{postilForm.diffPrice}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="postilForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savePostil" size="mini" :loading="postilLoading">确 认</el-button>
        <el-button @click="dialogVisiblePostil = false" size="mini">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { formatDate, copyObj } from "@/utils/index";
import { historyRoomExchange } from "@/api/reportCenter";
import {
  billChecking,
  billList,
  saveBillChecking,
  saveBillPostil
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
        name:null,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisiblePostil:false,
      total: 0,
      orderTable: [],
      loading: false,
      clickLoading: false,
      postilLoading: false,
      moment: moment,
      multipleSelection: [],
      subTableData: {},
      settleData:{
        settleRoomConsume: 0,//房费总额
        settleCommission: 0,//佣金总额
        settlePromotion: 0,//优惠总额
      },
      postilForm:{
        sysPrice: 0,
        diffPrice: 0, 
        inputPrice: null,
        remark:null,
        billPk:null,
        orderPk: null,
        orderNo: null,
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
        name: this.searchForm.name,
        pageNum: this.searchForm.pageNum,
        pageSize: this.searchForm.pageSize
      };
      this.subTableData={}
      this.loading = true;
      //查找收账订单列表
      billChecking(data).then(res => {
        this.total = Number(res.data.totalCount);
        this.orderTable = res.data.list;
        //初始化子账单table
        this.orderTable.forEach(item=>{
          this.$set(this.subTableData, item.orderPk, [])
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

      this.settleData.settleRoomConsume = 0;
      this.settleData.settleCommission = 0;
      this.settleData.settlePromotion = 0;

      // let temp1 = 0;
      let temp2 = 0;
      let temp3 = 0;
      let temp4 = 0;
      // let temp5 = 0;
      this.multipleSelection.forEach(item=>{
        temp2 += Number(item.totalFree)
        temp3 += Number(item.totalCommission)
        temp4 += Number(item.totalPromotion)
      })

      this.settleData.settleRoomConsume = temp2.toFixed(2);
      this.settleData.settleCommission = temp3.toFixed(2);
      this.settleData.settlePromotion = temp4.toFixed(2);

    },
    // 列表展开，加载账单
    expandChange(row, expandedRows) {
      if(this.subTableData[row.orderPk].length>0) {
        return;
      }
      this.billList(row.orderPk);
    },
    billList(orderPk){
      billList({orderPk:orderPk}).then(res=>{
        this.$set(this.subTableData,orderPk,res.data)
        //消费金额和结算金额合并为系统价格
        this.subTableData[orderPk].forEach(element => {
          this.$set(element, 'sysPrice', 0)
          if(Math.abs(element.consumptionAmount)>0){
            this.$set(element, 'sysPrice', Math.abs(element.consumptionAmount))
          }else if(Math.abs(element.settlementAmount)>0){
            this.$set(element, 'sysPrice',Math.abs(element.settlementAmount))
          }
        });
      })
    },

    //保存收账
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
          totalRoomConsume: item.totalFree,
          totalCommission: item.totalCommission,
          totalPromotion: item.totalPromotion
        });
      })
      let data = {
        check:{
          createUserName: this.createUserName,
          totalRoomConsume:this.settleData.settleRoomConsume,
          totalCommission:this.settleData.settleCommission,
          totalPromotion:this.settleData.settlePromotion,

          diffRoomConsume:0,
          diffCommission:0,
          diffPromotion:0,
        },
        checkDetails:temparr
      }
      const h = this.$createElement;
      this.$msgbox({
        title: '确认收账？',
        message: h('p', null, [
          h('p', null, '本次结账金额如下'),
          h('p', null, '房费总额：'+data.check.totalRoomConsume),
          h('p', null, '佣金总额：'+data.check.totalCommission),
          h('p', null, '优惠总额：'+data.check.totalPromotion),
          // h('span', null, '内容可以是 '),
          // h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            saveBillChecking(data).then(res=>{
              done();
              instance.confirmButtonLoading = false;
              this.$message.success('确认收账成功');
              this.search();
            }).finally(()=>{
              instance.confirmButtonLoading = false;
            })
          } else {
              // instance.confirmButtonLoading = false;
            done();
          }
        }
      }).then(action => {
          // this.$message.success('确认收账成功');
      });
    },

    //输入价格
    editInput(orderRow, billRow){
      this.dialogVisiblePostil  = true;
      this.postilForm.sysPrice = billRow.sysPrice
      this.postilForm.diffPrice = billRow.diffPrice
      this.postilForm.inputPrice = billRow.inputPrice
      this.postilForm.remark = billRow.postilRemark
      this.postilForm.billPk = billRow.billPk
      this.postilForm.orderNo = orderRow.orderNo
      this.postilForm.orderPk = orderRow.orderPk
    },
    savePostil(){
      this.postilLoading = true;
      saveBillPostil(this.postilForm).then(res=>{
        this.$message.success('更改成功');
        this.dialogVisiblePostil = false;
        this.billList(this.postilForm.orderPk);
      }).finally(()=>{
        this.postilLoading = false;
      })
    }
  },

  computed: {
    inputPrice() {
      return this.postilForm.inputPrice
    }
  },
  watch: {
    //监听输入金额的变化
    inputPrice(newValue, oldValue) {
      if(newValue==null || newValue==undefined || newValue==''){
        this.postilForm.diffPrice = 0
        return;
      }
      this.postilForm.diffPrice =  Number(newValue) - this.postilForm.sysPrice;
    }
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
.postil-dialog .el-dialog__body{
  padding: 0px 20px !important;
}
.finan-search-form .el-input--mini {
  width: 200px;
}
</style>


