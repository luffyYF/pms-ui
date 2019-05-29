// 外账账单冲减
<template>
  <el-dialog class="offset-bill-class" title="冲减" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" :append-to-body="true">
    <el-form ref="splitForm" :model="splitForm" size="mini" label-width="100px" class="batchOccupancy-content">
      <!-- <el-form-item label="授权员：">
        <el-input value="深圳市前海豪斯菲尔信息科技有效公司" :disabled="true"></el-input>
      </el-form-item> -->
      <el-form-item label="原始金额：">
        <el-input v-model="splitForm.oldPrice" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="冲减金额：">
        <el-input v-model="splitForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="冲减原因：">
        <el-input v-model="splitForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="confirm()" :loading="loading">确认</el-button>
      <el-button size="mini" @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { offset } from "@/api/financial/OutsideBillOrderController"

export default {
  data() {
    return {
      loading:false,
      dialogVisible:false,
      splitForm: {
        billPk:null,
        oldPrice: null,
        amount:null,
        remark:null
      }
    }
  },
  methods: {
    showDialog(billPk, amount) {
      this.splitForm.billPk = billPk
      this.splitForm.oldPrice = amount
      this.splitForm.amount = null
      this.splitForm.remark = null
      this.dialogVisible = true
    },
    confirm() {
      this.loading = true
      if(!this.splitForm.amount) {
        this.$message.warning("请输入冲减金额")
        this.loading = false
        return
      }
      if(this.splitForm.amount<=0) {
        this.$message.warning("冲减金额不能为0")
        this.loading = false
        return
      }

      offset(this.splitForm).then(res=>{
        this.dialogVisible = false
        this.$emit('callback')
      }).finally(()=>{
        this.loading = false
      })
    }
  }
}
</script>

<style scope>
.offset-bill-class {

}
.offset-bill-class .batchOccupancy-content .el-form-item{
  margin-bottom: 5px;
}
</style>
