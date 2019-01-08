<template>
  <!-- 结账恢复 -->
  <el-dialog class="pattern-dialog recover-bill-dialog" title="结账恢复" :visible.sync="dialogVisable" width="720px" :before-close="handleClose" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 25px 4px;">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :row-style="tableRowStyle"
        @selection-change="handleSelectionChange">
        <el-table-column  type="selection" width="55"></el-table-column>
        <el-table-column label="消费" width="80" prop="consumptionAmount"></el-table-column>
        <el-table-column label="结算" width="80" prop="settlementAmount"></el-table-column>
        <el-table-column label="结账时间" width="180" prop="createTime"></el-table-column>
        <el-table-column label="营业日期" width="120" prop="businessDate"></el-table-column>
        <el-table-column label="记录数" width="70" prop="number"></el-table-column>
        <el-table-column label="详细" width="100" type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.subItem" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column width="53"></el-table-column>
              <el-table-column label="消费" width="80" prop="consumptionAmount"></el-table-column>
              <el-table-column label="结算" width="80" prop="settlementAmount"></el-table-column>
              <el-table-column label="发生时间" width="180" prop="createTime"></el-table-column>
              <el-table-column label="营业日期" width="120" prop="businessDate"></el-table-column>
              <el-table-column label="房号" width="70" prop="roomNumber"></el-table-column>
              <el-table-column label="项目" width="100" prop="projectName"></el-table-column>
            </el-table> 
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submit" :loading="loading">确认恢复</el-button>
      <el-button size="mini"  @click="dialogVisable = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {findBillEndRecordOfRoom, recoverBillEndRecord} from '@/api/bill'
export default {
  data() {
    return {
      loading: false,
      dialogVisable:false,
      multipleSelection: [],
      tableData:[],
    }
  },
  methods: {
    showDialog(orderPk) {
      this.dialogVisable = true
      this.tableData = []
      findBillEndRecordOfRoom({orderPk:orderPk}).then(res=>{
        res.data.forEach(ele => {
          let obj = ele.recordPo
          this.$set(obj, 'subItem', ele.item)
          this.tableData.push(obj)
        });
        console.log(this.tableData);
      })
    },
    submit() {
      this.loading = true
      
      if(this.multipleSelection.length<=0) {
        this.$message.warning('至少选择一条')
        this.loading = false
        return
      }
      let data = []
      this.multipleSelection.forEach(item=>{
        data.push(item.billEndRecordPk)
      })
      recoverBillEndRecord(data).then(res=>{
        this.$message.success('恢复成功')
        this.$emit('callback')
        this.dialogVisable = false
      }).finally(()=>{
        this.loading = false
      })
    },
    tableRowStyle({ row, rowIndex }) {
      // return 'background-color: #ecf5ff'
    },
    handleClose() {
      this.dialogVisable = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style>
.recover-bill-dialog .el-dialog__body{
  height: 340px;
}
.recover-bill-dialog .el-table__expanded-cell{
  padding: 0px !important
}
</style>
