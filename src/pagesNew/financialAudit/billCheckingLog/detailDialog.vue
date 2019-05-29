<template>
  <el-dialog title="收账详情" :visible.sync="dialogVisible">
    <el-table :data="tableData">
      <el-table-column property="orderNo" label="订单号"></el-table-column>
      <el-table-column property="userName" label="预定人" ></el-table-column>
      <el-table-column property="totalRoomConsume" label="房费总额"></el-table-column>
      <el-table-column property="totalCommission" label="佣金总额"></el-table-column>
      <el-table-column property="totalPromotion" label="优惠总额"></el-table-column>
      <!-- <el-table-column property="diffRoomConsume" label="房费差额"></el-table-column>
      <el-table-column property="diffCommission" label="佣金差额"></el-table-column>
      <el-table-column property="diffPromotion" label="优惠差额"></el-table-column> -->
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listBillCheckingDetail } from "@/api/financial/FinancialAuditController";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData:[],
    };
  },
  methods: {
    showDialog(checkingPk) {
      this.dialogVisible = true;
      listBillCheckingDetail({checkingPk:checkingPk}).then(res=>{
        this.tableData = res.data;
      })
    }
  }
};
</script>

<style>
</style>
