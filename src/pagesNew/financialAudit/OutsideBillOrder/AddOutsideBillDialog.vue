<template>
  <section>

    <el-dialog title="外账单管理" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-table :data="billTable" size="mini" height="250" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column prop="projectName" label="项目" width="100"></el-table-column>
        <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
        <el-table-column prop="billStatus" label="状态">
          <template slot-scope="scope">
            <span>{{billStatusMap[scope.row.billStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="businessDate" label="营业日期" min-width="110"></el-table-column>
        <el-table-column prop="createUserName" label="操作员" min-width="110"></el-table-column>
        <el-table-column prop="createTime" label="发生日期"  min-width="180"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip min-width="180"></el-table-column>
      </el-table>

      <div class="center-button">
        <div class="settle-left">
          <span>消费金额：{{totalConsum}}</span>
          <span>结算金额：{{totalSettle}}</span>
          <span v-if="diff<0">找零：{{Math.abs(diff)}}</span>
          <span v-if="diff>=0">应收：{{diff}}</span>
        </div>
        <div class="settle-right">
          <el-button type="primary" size="mini" @click="settle" v-if="hasPerm('pms:outsideBill:settleAccounts')" :loading="loading2">结账</el-button>
          <el-button type="primary" size="mini" @click="offset" v-if="hasPerm('pms:outsideBill:offset')">冲减</el-button>
          <!-- <el-button type="primary" size="mini">挂账</el-button> -->
        </div>
      </div>

      <el-table :data="addTable" size="mini" height="200" border style="width: 100%">
        <el-table-column prop="projectName" label="项目" width="100"></el-table-column>
        <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip min-width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="removeBill(scope.$index)" style="color:red">移除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="addBill('CONSUMER')" v-if="hasPerm('pms:outsideBill:accountEntry')">入账</el-button>
        <el-button type="primary" size="mini" @click="addBill('SETTLEMENT')" v-if="hasPerm('pms:outsideBill:receivables')">收款</el-button>
        <el-button type="primary" size="mini" @click="saveBillOrder" v-if="hasPerm('pms:outsideBill:save')" :loading="loading1">保存账务</el-button>
        <el-button @click="handleClose" size="mini">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 入账弹出 -->
    <add-bill-dialog ref="addBillDialogRef" @callback="addBillCallback"></add-bill-dialog>
    <!-- 结账弹出 -->
    <settle-bill-dialog ref="settleBillDialogRef" @callback="listBill"></settle-bill-dialog>
    <!-- 冲减弹出 -->
    <offset-bill-dialog ref="offsetBillDialogRef" @callback="listBill"></offset-bill-dialog>
  </section>
</template>

<script>
import {billStatusMap} from '@/utils/orm'
import { add,listBill,settle } from "@/api/financial/OutsideBillOrderController"
import AddBillDialog from './AddBillDialog'
import SettleBillDialog from './SettleBillDialog'
import OffsetBillDialog from './OffsetBillDialog'
export default {
  components: {AddBillDialog, SettleBillDialog, OffsetBillDialog},
  data() {
    return {
      loading1:false,
      loading2:false,
      dialogVisible: false,
      billStatusMap:billStatusMap,
      billTable:[],
      addTable:[],
      outsideBillOrderPk:null,
      multipleSelection:[]

    }
  },
  computed: {
    totalConsum: function() {
      let temp = 0
      this.billTable.forEach(item=>{
        temp += Number(item.consumptionAmount)
      })
      return parseFloat(temp.toFixed(2))
    },
    totalSettle: function() {
      let temp = 0
      this.billTable.forEach(item=>{
        temp += Number(item.settlementAmount)
      })
      return parseFloat(temp.toFixed(2))
    },
    diff: function () {
      return this.totalConsum-this.totalSettle
    }
  },
  methods: {
    showDialog(outsideBillOrderPk){
      this.outsideBillOrderPk = outsideBillOrderPk
      this.dialogVisible = true
      this.billTable = []
      this.addTable = []
      if(outsideBillOrderPk) {
        this.listBill()
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit('callback')
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    listBill() {
      listBill(this.outsideBillOrderPk).then(res=>{
        this.billTable = res.data
      })
    },
    //添加账单
    addBill(projectType) {
      this.$refs.addBillDialogRef.showDialog(projectType);
    },
    addBillCallback(data) {
      this.addTable.push(data)
    },
    //移除账单
    removeBill(index) {
      this.addTable.splice(index,1)
    },
    //保存账务
    saveBillOrder() {
      if(this.addTable.length<=0) {
        return
      }
      this.loading1 = true
      let bills = []
      this.addTable.forEach(item=>{
        bills.push({
          projectCode: item.projectCode,
          remark: item.remark,
          amount: item.consumptionAmount+item.settlementAmount
        })
      })
      // loading1
      let data = {
        outsideBillOrderPk: this.outsideBillOrderPk,
        bills:bills
      }
      add(data).then(res=>{
        this.outsideBillOrderPk = res.data
        this.listBill()
        this.addTable = []
      }).finally(()=>{
        this.loading1 = false
      })
    },
    //结账
    settle(){
      this.loading2 = true
      if(!this.outsideBillOrderPk) {
        this.loading2 = false
        this.$message.warning("请先添加账务")
        return
      }
      if(this.diff!=0) {
        this.loading2 = false
        this.$refs.settleBillDialogRef.showDialog(this.outsideBillOrderPk, this.totalConsum, this.totalSettle)
        return
      }
      this.$confirm('是否确认结账?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          outsideBillOrderPk: this.outsideBillOrderPk,
        }
        settle(data).then(res=>{
          this.$message.success('结算成功')
          this.listBill()
        }).finally(()=>{
          this.loading2 = false
        })
      }).catch(() => {
        this.loading2 = false
      });
    },
    //冲减
    offset(){
      if(this.multipleSelection.length<=0){
        this.$message.warning('请至少选择一条账单')
        return 
      }
      let amount = this.multipleSelection[0].consumptionAmount + this.multipleSelection[0].settlementAmount
      this.$refs.offsetBillDialogRef.showDialog(this.multipleSelection[0].billPk, amount)
    },
   
  }
}
</script>

<style scope>
.center-button {
  /* text-align: right; */
  margin: 14px 0px;
}
.settle-left{
  float:left
}
.settle-left span{
  margin-right: 12px;
}
.settle-right{
  text-align: right;
}
</style>
