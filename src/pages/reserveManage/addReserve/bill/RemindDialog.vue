// 提醒
<template>
<section>
  <!-- 退房超时提醒 -->
  <el-dialog class="pattern-dialog timeout-remind-dialog" title="提醒" :visible.sync="timeoutVisable" width="600px" :before-close="handleClose" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 10px 4px;">
      <p style="color:#bb8c00;">以下入住客单<span style="color:red;">超过了退房时间</span>，可能需要收取额外费用</p>
      <el-table
        border
        :data="timeoutTable"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="离店日期"  prop="endDate"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="charge1">收取</el-button>
      <el-button size="mini" @click="toLoading">不收取</el-button>
    </span>
  </el-dialog>

  <!-- 提前退房，收取房费提醒 -->
  <el-dialog class="pattern-dialog advance-checkout-remind-dialog" title="提醒" :visible.sync="advanceVisable" width="600px" :before-close="handleClose" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 10px 4px;">
      <p style="color:#bb8c00;">以下客人是<span style="color:red;">提前退房</span>，可能需要收取额外费用</p>
      <el-table
        border
        :data="advanceTable"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="当天合约价"  prop="currPrice"></el-table-column>
        <el-table-column label="预计离店日期"  prop="endDate"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="charge2">收取</el-button>
      <el-button size="mini" @click="toLoading">不收取</el-button>
    </span>
  </el-dialog>

  <!-- 批量入账 -->
  <dialog-batch-add-bill ref="dialogBatchAddBillRef" @callback="toLoading"></dialog-batch-add-bill> 
</section>
</template>

<script>
import DialogBatchAddBill from './dialogBatchAddBill'
import {overtimeRemind, advanceCheckoutRemind} from '@/api/order/pmsChargeRemindController'

export default {
  components:{DialogBatchAddBill},
  data() {
    return {
      timeoutVisable: false,
      advanceVisable: false,
      timeoutTable:[],
      advanceTable: [],
      guestOrderPk:null,
      orderPk:null,
      count: 0,
    }
  },
  methods: {
    /**
     * @augments orderPk 必传
     * @augments guestOrderPk 可选
     */
    showDialog(orderPk, guestOrderPk) {
      this.orderPk = orderPk
      this.guestOrderPk = guestOrderPk;
      this.count = 0
      this.load()
    },

    load() {
      //检测入住的客单是否超过退房时间，进行提醒
      if(this.count==0){
        advanceCheckoutRemind({orderPk: this.orderPk, guestOrderPk: this.guestOrderPk}).then(res=>{
          if(res.data.length>0) {
            this.advanceVisable = true
            this.advanceTable = res.data;
          }else {
            this.toLoading()
          }
        }).finally(()=>{
          this.count++;
        })
      }else if(this.count==1) {
        overtimeRemind({orderPk: this.orderPk, guestOrderPk: this.guestOrderPk}).then(res=>{
          if(res.data.length>0) {
            this.timeoutVisable = true
            this.timeoutTable = res.data
          }else {
            this.toLoading()
          }
        }).finally(()=>{
          this.count++;
        })
      }else {
        this.handleClose()
      }
    },
    //继续监测
    toLoading() {
      // this.$emit('callback')
      this.timeoutVisable = false
      this.advanceVisable = false
      this.load()
    },

    //收取
    charge1() {
      let billItems = []
      this.timeoutTable.forEach(item=>{
        billItems.push({
          projectCode:112,
          guestOrderPk:item.guestOrderPk,
          price:null
        })
      })
      this.$refs.dialogBatchAddBillRef.showDialog(this.orderPk, false, billItems,null, 2)
    },
    charge2() {
      let billItems = []
      this.advanceTable.forEach(item=>{
        billItems.push({
          projectCode:104,
          guestOrderPk:item.guestOrderPk,
          price:item.currPrice
        })
      })
      this.$refs.dialogBatchAddBillRef.showDialog(this.orderPk, false, billItems, null, 3)
    },
   
    //关闭
    handleClose() {
      this.$emit('callback', this.guestOrderPk)
      this.timeoutVisable = false;
    }
  }
}
</script>

<style>
.timeout-remind-dialog .el-dialog__body{
  height: 340px;
}
</style>


