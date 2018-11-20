// 盘点记录
<template>
  <div>
    <el-dialog title="盘点单详细" :visible.sync="dialogVisible" width="800px">
      <div class="forminfo">
        <el-row>
          <el-col :span="8">盘点单号：{{stock.stockNo}} </el-col>
          <el-col :span="8">状态：
            <span v-if="stock.status = 2">已完成</span>
            <span v-else-if="stock.status = 1">已预审</span>
            <span v-else-if="stock.status = 0">已创建</span>
            <span v-else-if="stock.status = 0">已取消</span>
          </el-col>
          <el-col :span="8">盘点时间：{{stock.updateTime}} </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" border fit size="small" highlight-current-row v-loading="loading" class="tables-list">
        <el-table-column prop="inventoryNo" label="编号" align="left" show-overflow-tooltip/>
        <el-table-column prop="inventoryName" label="名称" align="left" show-overflow-tooltip/>
        <el-table-column prop="shortName" label="简拼" align="left" show-overflow-tooltip/>
        <el-table-column prop="typeName" label="类型" align="left" show-overflow-tooltip/>
        <el-table-column prop="unit" label="单位" align="left" show-overflow-tooltip/>
        <el-table-column prop="amount" label="库存数量" align="left" show-overflow-tooltip/>
        <el-table-column label="盘点数量" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="stock == null || stock.status != 0">{{scope.row.stockNum}}</span>
            <el-input type="number" v-if="stock != null && stock.status == 0" min="0" @change="amountChange(scope.row)" v-model="scope.row.stockNum" style="width: 100%;" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="成本价" align="left" show-overflow-tooltip/>
        <el-table-column prop="yingKuiNum" label="盈亏数量" align="left" show-overflow-tooltip/>
        <el-table-column prop="yingKuiSum" label="盈亏金额" align="left" show-overflow-tooltip/>
        <el-table-column prop="remark" label="备注" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="stock == null || stock.status != 0">{{scope.row.remark}}</span>
            <el-input v-if="stock != null && stock.status == 0" v-model="scope.row.remark" style="width: 100%" size="small" />
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button @click="toPrint" size="mini">打 印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTakeStockDetail } from "@/api/upmsStorage";

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      stock: {},
      tableData: [],
      PRINT_ROOT: process.env.PRINT_ROOT,
      stockId:null
    };
  },
  methods: {
    init(stockId) {
      this.stockId = stockId;
      this.dialogVisible = true;
      if (stockId) {
        getTakeStockDetail({ stockId: stockId }).then(res => {
          this.stock = res.data.stock;
          this.tableData = res.data.list;
        });
      }
    },
    toPrint(){
      window.open("http://localhost:8083/#/pmsTakeStockDetail?stockId="+this.stockId);
    }
  }
};
</script>

<style scoped>
.forminfo {
  line-height: 26px;
  margin-bottom: 16px;
}
</style>
