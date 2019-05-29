// 批量续住
<template>
  <el-dialog class="pattern-dialog dialog-batch-continueroom" title="批量续住" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container" >
        <el-table
          border
          tooltip-effect="dark"
          style="width: 100%"
          height="318"
          :data="tableData"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
          <el-table-column label="抵店日期"  prop="beginDate" width="180"></el-table-column>
          <el-table-column label="离店日期"  prop="endDate" width="180"></el-table-column>
          <el-table-column label="人数"  prop="guestNumber"></el-table-column>
          <el-table-column label="房租"  prop="currPrice"></el-table-column>
        </el-table>
        <div class="date-opr">
          延期至：
          <el-date-picker v-model="continueDate" type="date" size="mini" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:120px"></el-date-picker>
          离店
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submit()" :loading="loading">确认</el-button>
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
</template>

<script>
import {listGuest, continuedRoomBatch} from '@/api/order/pmsOrderController'

export default {
  data(){
    return {
      dialogVisible:false,
      loading: false,
      tableData: [],
      orderPk: null,
      multipleSelection:[],
      continueDate:null,
    }
  },
  methods: {
    showDialog(orderPk) {
      this.dialogVisible = true
      this.orderPk = orderPk
      this.tableData = []
      this.loadGuestList()
    },
    loadGuestList() {
      listGuest({orderPk: this.orderPk}).then(res=>{
        let temp = []
        res.data.forEach(ele => {
          if(ele.mainFlag=='Y' && (ele.orderStatus=='RESERVE' || ele.orderStatus=='CHECKIN')){
            temp.push(ele)
          }
        })
        this.tableData = temp
      })
    },
    submit() {
      this.loading = true
      if(!this.continueDate){
        this.loading = false
        this.$message.warning('请选择续房日期');
        return
      }
      if(this.multipleSelection.length<=0){
        this.loading = false
        this.$message.warning('至少选择一条');
        return
      }
      let guestPks = []
      this.multipleSelection.forEach(ele=>{
        guestPks.push(ele.guestOrderPk)
      })
      let data = {
        orderPk: this.orderPk,
        guestPks: guestPks,
        continueDate: this.continueDate
      }
      continuedRoomBatch(data).then(res=>{
        this.$message.success('续住成功');
        this.loadGuestList()
      }).finally(()=>{
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(){
      this.$emit("callback")
      this.dialogVisible = false
    }
  }
}
</script>
<style scope>
.dialog-batch-continueroom .date-opr{
  text-align: right;
  margin: 16px;
}

</style>

<style>
.dialog-batch-continueroom .el-dialog__body{
  height: 380px;
  padding:0 10px;
}
</style>
