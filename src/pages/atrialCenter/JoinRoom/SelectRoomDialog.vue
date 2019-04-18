// 选房
<template>
  <section>
    <el-dialog title="选房" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-row>
        <el-col :span="12">

        </el-col>
        <el-col :span="12">
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          房态：
          <el-radio-group v-model="radio2">
            <el-radio :label="3">干净</el-radio>
            <el-radio :label="6">脏房</el-radio>
            <el-radio :label="9">预离房</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-table :data="billTable" size="mini" height="150" border style="width: 100%">
            <el-table-column prop="projectName" label="房型"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="1">
          &nbsp;
        </el-col>
        <el-col :span="18">
          <el-table :data="billTable" size="mini" height="150" border style="width: 100%">
            <el-table-column prop="projectName" label="楼栋" width="80"></el-table-column>
            <el-table-column prop="projectName" label="楼层" width="80"></el-table-column>
            <el-table-column type="selection" label="全选" width="55" ></el-table-column>
            <el-table-column prop="projectName" label="房号" ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          已选房型
          <el-table :data="billTable" size="mini" height="150" border style="width: 100%">
            <el-table-column prop="projectName" label="房型" width="100"></el-table-column>
            <el-table-column prop="projectName" label="数量" width="100"></el-table-column>
            <el-table-column prop="projectName" label="房号" ></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <div class="settle-left"> 
          <span>已选合计 0 间</span>
          <span>需选 0 间</span>
        </div>
        <el-button type="primary" size="mini" @click="addBill('CONSUMER')" style="width:80px">确认</el-button>
        <el-button @click="handleClose" size="mini" style="width:80px">取消</el-button>
      </span>
    </el-dialog>

  </section>
</template>

<script>
import {billStatusMap} from '@/utils/orm'
import { add,listBill,settle } from "@/api/financial/OutsideBillOrderController"
export default {
  components: {},
  data() {
    return {
      loading1:false,
      loading2:false,
      dialogVisible: false,
      billStatusMap:billStatusMap,
      billTable:[],
      addTable:[],
      outsideBillOrderPk:null,
      multipleSelection:[],
      radio2:null,
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
