// 提醒
<template>
<section class="remind-dialog-class">
  <!-- 退房超时 收费提醒 -->
  <el-dialog class="remind-dialog" title="退房超时收费提醒" :visible.sync="timeoutVisable" width="600px" :before-close="handleClose" :append-to-body="true">
      <p style="color:#bb8c00;">以下入住客单<span style="color:red;">超过了退房时间</span>，可能需要收取额外费用</p>
      <el-table
        size="mini"
        border
        :data="timeoutTable"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="离店日期"  prop="endDate"></el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="charge1">收取</el-button>
      <el-button size="mini" @click="toLoading">不收取</el-button>
    </span>
  </el-dialog>

  <!-- 提前退房 收费提醒 -->
  <el-dialog class="remind-dialog" title="提前退房收费提醒" :visible.sync="advanceVisable" width="600px" :before-close="handleClose" :append-to-body="true">
      <p style="color:#bb8c00;">以下客人是<span style="color:red;">提前退房</span>，可能需要收取额外费用</p>
      <el-table
        border
        size="mini"
        :data="advanceTable"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="当天合约价"  prop="currPrice"></el-table-column>
        <el-table-column label="预计离店日期"  prop="endDate"></el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="charge2">收取</el-button>
      <el-button size="mini" @click="toLoading">不收取</el-button>
    </span>
  </el-dialog>

  <!-- 钟点房 退房收费提醒 -->
  <el-dialog class="remind-dialog" title="钟点房收费提醒" :visible.sync="hourRoomVisable" width="600px" :before-close="handleClose" :append-to-body="true">
      <p style="margin:0">收费规则</p>
      <p style="margin:0">1.入住时长小于等于实际起步时间：总价 = 起步价</p>
      <p style="margin:0">2.入住时长超过实际起步时间：总价 = 起步价 + （超时时间 / 标准计费时间 x 标准价）</p>
      <p style="margin:0">注：除数结果往上取整；实际起步时间=起步时间+据缓冲时间</p>
      <p style="color:#bb8c00;">应补交<span style="color:red;">钟点房费</span>如下：</p>
      <el-table
        border
        size="mini"
        :data="hourRoomTable"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber" width="100"></el-table-column>
        <el-table-column label="钟点房费"  prop="price" width="100"></el-table-column>
        <el-table-column label="实际入住日期"  prop="checkinDate"></el-table-column>
        <el-table-column label="预计离店日期"  prop="endDate"></el-table-column>
      </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="charge3">收取</el-button>
      <el-button size="mini" @click="toLoading">不收取</el-button>
    </span>
  </el-dialog>

  <!-- 批量入账 -->
  <dialog-batch-add-bill ref="dialogBatchAddBillRef" @callback="toLoading"></dialog-batch-add-bill> 
</section>
</template>

<script>
import DialogBatchAddBill from './dialogBatchAddBill'
import {
  overtimeRemind,
  advanceCheckoutRemind,
  hourRoomChargeRemind,
  hourRoomPreChargeRemind} 
from '@/api/order/pmsChargeRemindController'

export default {
  components:{DialogBatchAddBill},
  data() {
    return {
      timeoutVisable: false,
      advanceVisable: false,
      hourRoomVisable: false,
      timeoutTable:[],
      advanceTable: [],
      hourRoomTable: [],
      guestOrderPk:null,
      orderPk:null,
      count: 0,
      preFlag:false,
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
      this.preFlag = false
      this.load()
    },

    showPreChargeDialog(orderPk, guestOrderPk) {
      this.preFlag = true
      hourRoomPreChargeRemind({guestOrderPk:guestOrderPk}).then(res=>{
        if(res.data) {
          let preChargePrice = res.data
          this.$confirm('该钟点房需预收取费用'+preChargePrice+'元, 是否收取?', '提示', {
            confirmButtonText: '收取',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let billItems = [{
              projectCode:234,
              guestOrderPk: guestOrderPk,
              price: preChargePrice
            }]
            this.$refs.dialogBatchAddBillRef.showDialog(orderPk, false, billItems, null, 1)
          })
        }
      })
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
        }).catch(error=>{
          this.toLoading()
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
        }).catch(error=>{
          this.toLoading()
        }).finally(()=>{
          this.count++;
        })
      }else if(this.count==2) {
        hourRoomChargeRemind({orderPk: this.orderPk, guestOrderPk: this.guestOrderPk}).then(res=>{
          if(res.data.length>0) {
            this.hourRoomVisable = true
            this.hourRoomTable = res.data
          }else {
            this.toLoading()
          }
        }).catch(error=>{
          this.toLoading()
        }).finally(()=>{
          this.count++;
        })
      } else {
        this.handleClose()
      }
    },
    //继续监测
    toLoading() {
      if(this.preFlag) {
        return
      }
      // this.$emit('callback')
      this.timeoutVisable = false
      this.advanceVisable = false
      this.hourRoomVisable = false
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
    charge3() {
      let billItems = []
      this.hourRoomTable.forEach(item=>{
        billItems.push({
          projectCode:112,
          guestOrderPk:item.guestOrderPk,
          price:item.price
        })
      })
      this.$refs.dialogBatchAddBillRef.showDialog(this.orderPk, false, billItems, null, 1)
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
/* .timeout-remind-dialog .el-dialog__body{
  height: 340px;
}
.remind-dialog-class .hourRoomClass .dialog__body {
  height: 240px !important;
} */

.remind-dialog .el-dialog__body {
  padding: 0 4px;
  height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f7f7f7;
  border: 1px solid #ddd;
}
</style>


