// 单房结账
<template>
  <!-- 单房结账 -->
  <el-dialog class="pattern-dialog single-settl" title="单房结账" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 10px 4px;">
      <el-table
        border
        height="200"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="消费金额"  prop="consumptionAmount"></el-table-column>
        <el-table-column label="结算金额"  prop="settlementAmount"></el-table-column>
      </el-table>

      <div style="height:10px"></div>

      <el-form ref="billForm" :inline="true" :model="billForm" size="mini" label-width="90px">
        <el-form-item label="消费金额：">
          <el-input type="text" v-model="billForm.consumptionAmount" style="width:110px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="实收：" label-width="70">
          <el-input type="text" v-model="billForm.settlementAmount" style="width:110px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="billForm.diffAmount<=0? '找零：': '应收：'" label-width="70" class="diff-class">
          <el-input type="text" v-model="billForm.diffShow" style="width:110px;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="结算项目：">
          <el-select v-model="billForm.projectName" :disabled="true" placeholder="现金支出" style="width:178px">
            <el-option label="现金" value="shanghai"></el-option>
            <el-option label="银行卡" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式：" required>
          <el-select v-model="billForm.payment" placeholder="请选择支付方式" style="width:178px">
            <el-option v-for="(value, key) in paymentMap" :key="key" :label="value" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客单：">
          <el-select v-model="billForm.guestOrderPk" placeholder="请选择客单" style="width:460px">
            <el-option v-for="(item,index) in guestOrderSelect" :key="index" :label="'房间号:'+item.roomNumber+' 客人姓名:'+item.memName" :value="item.guestOrderPk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="text" v-model="billForm.remark" style="width:460px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submit()" :loading="loading">确认</el-button>
      <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {checkoutGuest, countCheckoutBill, selectGuestOrderBill, singleRoomCheckoutBill} from '@/api/bill'
import {paymentMap} from '@/utils/orm'
export default {
  data() {
    return {
      loading:false,
      dialogVisible: false,
      tableData: [],
      guestOrderSelect: [],
      multipleSelection: [],
      paymentMap: paymentMap,
      billForm:{
        consumptionAmount:null,
        settlementAmount:null,
        diffAmount:null,
        diffShow: null,
        guestOrderPk:null,
        payment:null,
        remark:null,
        orderPk:null,

      }
    }
  },
  methods: {
    showDialog(orderPk) {
      this.dialogVisible = true
      this.billForm.orderPk=orderPk
      this.billForm.consumptionAmount=0
      this.billForm.settlementAmount=0
      this.billForm.diffAmount=0
      this.billForm.diffShow=0
      this.billForm.guestOrderPk=null
      this.billForm.payment='0'
      this.billForm.remark=null
      this.tableData = []
      this.guestOrderSelect = []
      countCheckoutBill({ orderPk: orderPk }).then(res => {
        console.log('返回',res.data)
        this.tableData = res.data.group
        // this.countCheckoutDate = res.data;
        // this.backMoney = Math.abs(this.countCheckoutDate.settlementAmount-this.countCheckoutDate.consumptionAmount) | 0;
      });

      selectGuestOrderBill({ orderPk: orderPk }).then(res => {
        res.data.forEach(item=>{
          if(item.orderStatus=="CHECKIN" || item.orderStatus=='LEAVENOPAY') {
            this.guestOrderSelect.push(item)
          }
        })
        if(this.guestOrderSelect.length>0){
          this.billForm.guestOrderPk = this.guestOrderSelect[0].guestOrderPk
        }
      });
    },
    submit() {
      if(this.multipleSelection.length<=0){
        this.$message.warning('至少选择一条')
        return
      }
      if(this.multipleSelection.length==this.tableData.length) {
        this.dialogVisible =  false
        this.$emit('to-settle')
        return
      }
      this.loading = true
      let guestPks = []
      this.multipleSelection.forEach(item=>{
        guestPks.push(item.guestOrderPk)
      })
      let data = {
        orderPk: this.billForm.orderPk,
        guestOrderPk: this.billForm.guestOrderPk,
        remark: this.billForm.remark,
        payment: this.billForm.payment,
        guestPks: guestPks
      }
      singleRoomCheckoutBill(data).then(res=>{
        this.dialogVisible =  false
        this.$message.success("结账成功")
        this.$emit('callback')
      }).finally(()=>{
        this.loading = false
      })
    },
    selectionChange(val) {
      this.multipleSelection = val
      let cons = 0
      let settl = 0
      this.multipleSelection.forEach(item=>{
        cons = cons + Number(item.consumptionAmount)
        settl = settl + Number(item.settlementAmount)
      })
      let diff = cons - settl
      this.billForm.consumptionAmount = cons
      this.billForm.settlementAmount = settl
      this.billForm.diffAmount = diff
      this.billForm.diffShow = Math.abs(diff);
    },
    
  }
};
</script>

<style>
.single-settl .el-dialog__body {
  height: 420px;
}
.diff-class .el-input__inner{
  color:red !important;
}
</style>

