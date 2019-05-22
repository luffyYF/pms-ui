<template>
  <section>
    <el-form :inline="true" size="mini" label-width="120px"  class="demo-form-inline">
      <el-col :span="24">
        <el-form-item label="快捷搜索:">
          <el-radio-group v-model="formInline.orderStatus" size="small">
            <el-radio-button :label="value" :key="value" v-for="(key, value) in reserveOrderStatusMap">{{key}}</el-radio-button>
            <el-radio-button label="">全部状态</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-form-item label="预订人:">
        <el-input v-model="formInline.userName" placeholder="请输入预订人" clearable style="width: 178px;"></el-input>
      </el-form-item>
      <el-form-item label="预订手机号:">
        <el-input v-model="formInline.userPhone" placeholder="预订人手机号" clearable style="width: 178px;"></el-input>
      </el-form-item>
      <el-form-item label="订单号:">
        <el-input v-model="formInline.orderNo" placeholder="请输入订单号" clearable style="width: 178px;"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      v-loading="loading" 
      :data="tableData" 
      ref="singleTable" 
      size="mini" 
      :cell-style="function() {return 'font-size:10px;-webkit-text-size-adjust: none;'}" 
      row-key="orderNo" 
      filter-change="handlerFilterChange" 
      border 
      max-height="628">
      <el-table-column label="订单号" prop="orderNo"  width="110">
      </el-table-column>
      <el-table-column label="预订人" prop="userName"  width="110">
      </el-table-column>
      <el-table-column label="预订人手机号" prop="userPhone"  width="110">
      </el-table-column>
      <el-table-column label="订单总额（元）" prop="totalPrice"  width="120">
      </el-table-column>
      <el-table-column label="抵店日期" prop="beginDate" width="120">
      </el-table-column>
      <el-table-column label="离店时间" prop="endDate" width="120">
      </el-table-column>
      <el-table-column label="房型" prop="roomTypeName" align="center" width="120">
      </el-table-column>
      <el-table-column label="房间数" prop="rentCount" align="center" width="70">
      </el-table-column>
      <el-table-column label="订单状态" prop="orderStatus" width="100">
        <template slot-scope="scope">
          {{reserveOrderStatusMap[scope.row.orderStatus]}}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" width="150" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column label="操作员" prop="createUserName">
      </el-table-column> -->
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button v-if="hasPerm('pms:miniappOrder:detail')" size="mini" type="primary" @click="orderDetail(scope.row)">详情</el-button>
          <el-button v-if="scope.row.orderStatus==1 && hasPerm('pms:miniappOrder:takeOrder')" @click="takeOrder(scope.row)" size="mini" type="primary">接单</el-button>
          <el-button v-if="scope.row.orderStatus==2 && hasPerm('pms:miniappOrder:confirmCheckin')" @click="confirmCheckin(scope.row)" size="mini" type="primary">确认入住</el-button>
          <el-button v-if="(scope.row.orderStatus==2 || scope.row.orderStatus==3) && hasPerm('pms:miniappOrder:finish')" @click="finishOrder(scope.row)" size="mini" type="success">完成订单</el-button>
          <el-button v-if="scope.row.orderStatus>0 && hasPerm('pms:miniappOrder:refund')" @click="refundClick(scope.row)" size="mini" type="primary">退款</el-button>
          <el-button v-if="scope.row.orderStatus<=4 && hasPerm('pms:miniappOrder:cancel')" @click="cancelOrder(scope.row)" size="mini" type="primary">取消订单</el-button>
          <el-button v-if="hasPerm('pms:miniappOrder:oprLog')" size="mini" type="primary" @click="orderLog(scope.row)">操作记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 20px 10px 0;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formInline.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="formInline.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 退款 -->
    <el-dialog
      title="退款"
      :visible.sync="refundDialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :before-close="refundHandleClose">
      订单总支付金额：￥{{formRefund.paymentPrice}} <br>
      请输入退款金额
      <el-input type="text" v-model="formRefund.refundPrice" size="mini"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false" size="mini">关 闭</el-button>
        <el-button type="primary" @click="refundConfirm" size="mini" :loading="refundLoading">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消订单 -->
    <el-dialog
      title="取消订单"
      :visible.sync="cancelDialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :before-close="cancelHandleClose">
      订单总支付金额：￥{{formCancel.paymentPrice}} <br>
      可退款金额：￥{{formCancel.remainRefundPrice}} <br>
      请输入退款金额
      <el-input type="text" v-model="formCancel.refundPrice" size="mini"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible = false" size="mini">关 闭</el-button>
        <el-button v-if="formCancel.orderStatus==4" @click="cancelConfirm(false)" size="mini">撤 销</el-button>
        <el-button type="primary" @click="cancelConfirm(true)" size="mini" :loading="refundLoading">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 订单操作记录 -->
    <MiniappLogDialog ref="miniappLogDialogRef"></MiniappLogDialog>
    <!-- 订单详情 -->
    <MiniappDetailDialog ref="miniappDetailDialogRef"></MiniappDetailDialog>

  </section>
</template>

<script>
import {reserveOrderStatusMap} from '@/utils/orm'
import {listOrder,takeOrder, updateCheckin,updateFinish, orderRefund, cancelOrder,getRemainRefundPrice} from "@/api/order/pmsReserveOrderController"
import MiniappLogDialog from './MiniappLogDialog'
import MiniappDetailDialog from './MiniappDetailDialog'

export default {
  components:{MiniappLogDialog,MiniappDetailDialog},
  data() {
    return {
      reserveOrderStatusMap:reserveOrderStatusMap,
      loading:false,
      tableData:[],
      total: 0,
      formInline: {
        pageNum:1,
        pageSize: 10,
      },
      refundDialogVisible:false,
      refundLoading:false,
      formRefund: {
        orderPk:null,
        refundPrice:0,
        paymentPrice:0,
      },

      cancelDialogVisible:false,
      cancelLoading:false,
      formCancel: {
        orderPk:null,
        paymentPrice:0,//实际支付价格
        remainRefundPrice:0,//可退款金额
        refundPrice:0,//退款金额
        orderStatus:null,
      },
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      listOrder(this.formInline).then(res=>{
        this.tableData = res.data.list
        this.total = Number(res.data.total)
      }).finally(()=>{
        this.loading = false
      })
    },
    handleSizeChange(pageSize){
      this.formInline.pageSize = pageSize;
      this.getList();
    },
    handleCurrentChange(pageNum){
      this.formInline.pageNum = pageNum
      this.getList();
    },
    //接单
    takeOrder(row) {
      this.$confirm("是否确认接单？", "提示", {type: 'warning',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          takeOrder(row.orderPk).then(res=>{
            this.$message.success('已接单成功');
            this.getList()
          }).finally(()=>{
            instance.confirmButtonLoading = false;
            done();
          })
          
        } else {
          if (instance.confirmButtonLoading == false) {
            done();
          }
        }
      }}).then(() => {});
    },
    //确认入住
    confirmCheckin(row) {
      this.$confirm("是否确认入住？", "提示", {type: 'warning',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          updateCheckin(row.orderPk).then(res=>{
            this.$message.success("入住成功")
            this.getList();
          }).finally(()=>{
            instance.confirmButtonLoading = false;
            done();
          })
        } else {
          if (instance.confirmButtonLoading == false) {
            done();
          }
        }
      }}).then(() => {});
    },
    //完成订单
    finishOrder(row) {
      this.$confirm("是否完成订单？", "提示", {type: 'warning',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          updateFinish(row.orderPk).then(res=>{
            this.$message.success("订单已完成")
            this.getList();
          }).finally(()=>{
            instance.confirmButtonLoading = false;
            done();
          })
        } else {
          if (instance.confirmButtonLoading == false) {
            done();
          }
        }
      }}).then(() => {});
    },
    refundHandleClose() {
      this.refundDialogVisible = false
    },
    // 退款
    refundClick(row) {
      this.formRefund.paymentPrice = row.paymentPrice
      this.formRefund.refundPrice = 0
      this.formRefund.orderPk = row.orderPk
      this.refundDialogVisible = true
    },
    refundConfirm() {
      this.refundLoading = true
      if(isNaN(this.formRefund.refundPrice) || Number(this.formRefund.refundPrice)<=0) {
        this.$message.warning('退款金额输入有误')
        this.refundLoading = false
        return
      }
      let data = {
        orderPk: this.formRefund.orderPk,
        refundPrice: this.formRefund.refundPrice
      }
      orderRefund(data).then(res=>{
        this.$message.success(res.sub_msg)
        this.getList()
      }).finally(()=>{
        this.refundLoading = false
      })
    },
    //取消订单
    cancelOrder(row) {
      let remainRefundPrice = 0
      getRemainRefundPrice({orderPk:row.orderPk}).then(res=>{
        remainRefundPrice = Number(res.data)
      }).finally(()=>{
        this.formCancel.orderPk = row.orderPk
        this.formCancel.paymentPrice = row.paymentPrice
        this.formCancel.remainRefundPrice = remainRefundPrice
        this.formCancel.refundPrice = Math.floor(remainRefundPrice*100)/100
        this.formCancel.orderStatus = row.orderStatus
        this.cancelDialogVisible = true
      })
    },
    cancelConfirm(confirmFlag) {
      this.cancelLoading=true
      if(this.formCancel.refundPrice>this.formCancel.remainRefundPrice) {
        this.$message.warning("超出可退款金额")
        this.cancelLoading=false
        return
      }
      let data = {
        orderPk:this.formCancel.orderPk,
        refundPrice:this.formCancel.refundPrice,
        confirmFlag:confirmFlag,
      }
      cancelOrder(data).then(res=>{
        this.$message.success(res.sub_msg)
        this.cancelDialogVisible = false
        this.getList()
      }).finally(()=>{
        this.cancelLoading=false
      })
    },
    cancelHandleClose() {
      this.cancelDialogVisible = false
    },
    //操作记录
    orderLog(row){
      this.$refs.miniappLogDialogRef.showDialog(row.orderPk)
    },
    //详情
    orderDetail(row) {
      this.$refs.miniappDetailDialogRef.showDialog(row.orderPk)
    }
  }
}
</script>

<style>

</style>
