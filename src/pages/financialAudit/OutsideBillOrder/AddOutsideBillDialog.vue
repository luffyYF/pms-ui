<template>
  <section>

    <el-dialog title="外账单管理" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-table :data="billTable" height="250" border style="width: 100%">
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
        <el-table-column prop="createUserName" label="操作员"></el-table-column>
        <el-table-column prop="createTime" label="发生日期"  min-width="180"></el-table-column>
        <el-table-column prop="remark" label="备注"  min-width="180"></el-table-column>
      </el-table>

      <div class="center-button">
        <div style="text-align: left;">
          <!-- <span>消费金额：{{}}</span>
          <span>结算金额：{{}}</span> -->
        </div>
        <div style="text-align: right;">
          <el-button type="primary" size="mini" @click="settle" :loading="loading2">结账</el-button>
          <el-button type="primary" size="mini">冲减</el-button>
          <el-button type="primary" size="mini">挂账</el-button>
        </div>
      </div>

      <el-table :data="addTable" height="250" border style="width: 100%">
        <el-table-column prop="projectName" label="项目" width="100"></el-table-column>
        <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
        <el-table-column prop="remark" label="备注"  min-width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="removeBill(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="addBill('CONSUMER')">入账</el-button>
        <el-button type="primary" size="mini" @click="addBill('SETTLEMENT')">收款</el-button>
        <el-button type="primary" size="mini" @click="saveBillOrder" :loading="loading1">保存账务</el-button>
        <el-button @click="handleClose" size="mini">关闭</el-button>
      </span>
    </el-dialog>

    <add-bill-dialog ref="addBillDialogRef" @callback="addBillCallback"></add-bill-dialog>
  </section>
</template>

<script>
import {billStatusMap} from '@/utils/orm'
import { add,listBill,settle } from "@/api/financial/OutsideBillOrderController"
import AddBillDialog from './AddBillDialog'
export default {
  components: {AddBillDialog},
  data() {
    return {
      loading1:false,
      loading2:false,
      dialogVisible: false,
      billStatusMap:billStatusMap,
      billTable:[],
      addTable:[],
      outsideBillOrderPk:null,

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
      console.log(data)
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
      let data = {
        outsideBillOrderPk: this.outsideBillOrderPk,
        projectCode: 0,
        remark:'',
      }
      settle(data).then(res=>{
        
      }).finally(()=>{
        this.loading2 = false
      })
    },
  }
}
</script>

<style scope>
.center-button {
  /* text-align: right; */
  margin: 14px 0px;
}
</style>
