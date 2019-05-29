<template>
  <el-dialog
    title="操作记录"
    :visible.sync="dialogVisible"
    width="600px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-table 
      :data="tableData"
      ref="singleTable" 
      size="mini" 
      :cell-style="function() {return 'font-size:10px;-webkit-text-size-adjust: none;'}" 
      border 
      max-height="628">
      <el-table-column label="时间" prop="createTime"  width="160">
      </el-table-column>
      <el-table-column label="操作人" prop="createUserName"  width="100">
      </el-table-column>
      <el-table-column label="操作描述" prop="details">
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {listOrderLog} from "@/api/order/pmsReserveOrderController"

export default {
  data() {
    return {
      dialogVisible:false,
      tableData:[]
    }
  },
  methods: {
    showDialog(orderPk){
      this.tableData = []
      this.dialogVisible=true
      listOrderLog({orderPk: orderPk}).then(res=>{
        this.tableData = res.data
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
  }
}
</script>

<style>

</style>
