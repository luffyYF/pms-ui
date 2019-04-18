// 选联房
<template>
  <section>
    <el-dialog title="选联房" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <div class="settle-left"> 
        <span style="color:red">凡是已经有退房房间的联房均不允许被合并；预定联房有部分房间未入住暂不允许合并</span>
      </div>

      <div style="clear:both">
        搜索：<el-input type="text" size="mini" style="width:200px" v-model="inputValue" v-on:input="inputChange"></el-input>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" size="mini" height="350" border style="width: 100%">
        <el-table-column type="selection" label="全选" width="55" ></el-table-column>
        <el-table-column prop="linkName" label="联房订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roomCount" label="房间数"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="confirm" style="width:80px">确认</el-button>
        <el-button @click="handleClose" size="mini" style="width:80px">取消</el-button>
      </span>
    </el-dialog>

  </section>
</template>

<script>
import {billStatusMap} from '@/utils/orm'
import { add,listBill,settle } from "@/api/financial/OutsideBillOrderController"
import {linkListGroup} from '@/api/order/pmsOrderController'
export default {
  components: {},
  data() {
    return {
      loading1:false,
      loading2:false,
      dialogVisible: false,
      billStatusMap:billStatusMap,
      tableData:[],
      tempTableData:[],
      outsideBillOrderPk:null,
      multipleSelection:[],
      orderPk:null,
      inputValue:""
    }
  },
  methods: {
    showDialog(orderPk){
      this.dialogVisible = true
      this.inputValue = ""
      this.tableData = []
      this.multipleSelection = []
      this.orderPk = orderPk
      this.listGuest();
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit('callback')
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    listGuest() {
      linkListGroup().then(res=>{
        this.tableData = res.data.filter(item=>{
          return item.orderPk != this.orderPk
        })
        this.tempTableData = this.tableData
      })
    },
    confirm() {
      this.dialogVisible = false;
      let guestList = []
      this.multipleSelection.forEach(item=>{
        item.guestList.forEach(item2=>{
          guestList.push(item2)
        })
      })
      this.$emit('callback', guestList)
    },
    inputChange(val) {
      if(val) {
        let temp = [];
        this.tempTableData.forEach(item=>{
          if(item.linkName.indexOf(val)!=-1){
            temp.push(item)
          }
        })
        this.tableData = temp;
      }else {
        this.tableData = this.tempTableData;
      }
    },



    listBill() {
      listBill(this.outsideBillOrderPk).then(res=>{
        this.tableData = res.data
      })
    },
    //添加账单
    addBill(projectType) {
      this.$refs.addBillDialogRef.showDialog(projectType);
    },
    addBillCallback(data) {
    },
    //移除账单
    removeBill(index) {
    },
    //保存账务
    saveBillOrder() {},
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
.el-dialog__body {
  padding: 0px 20px !important;
}
.joinRoom-line{
  height: 5px;
  text-align: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #bdbdbd;
}
.joinRoom-line span{
  position: relative;
  top: -3px;
  background: #Fff;
  padding: 0 4px;
}
.center-button {
  /* text-align: right; */
  margin: 6px 0px;
}
.settle-left{
  float:left;
  height: 30px;
  
}
.settle-left span{
  margin-right: 12px;
}
.settle-right{
  text-align: right;
}
</style>
