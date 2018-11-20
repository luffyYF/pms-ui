// 库存盘点
<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="盘点仓库">
            <el-select v-model="storageId" style="width: 200px;" placeholder="请选择仓库" @change="listSearch()">
              <el-option v-for="obj in storageData" :key="obj.storageId" :label="obj.name" :value="obj.storageId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="盘点单号">
            <el-input placeholder="请输入盘点单号" readonly="readonly" v-model="stockNo" style="width: 150px;" size="small" />
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-if="stock == null" readonly="readonly" value="未保存" style="width: 150px;" size="small" clearable/>
            <el-input v-else readonly="readonly" :value="takeStockStatusMap[stock.status.toString()]" style="width: 150px;" size="small" clearable/>
            <!-- <el-input v-else-if="stock != null && stock.status == 0" readonly="readonly" value="已创建" style="width: 150px;" size="small" clearable/> -->
            <!-- <el-input v-else-if="stock != null && stock.status == 1" readonly="readonly" value="已预审" style="width: 150px;" size="small" clearable/> -->
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="listSearch()" size="small">查询</el-button>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-table :data="rows" border fit size="small" highlight-current-row v-loading="loading " class="tables-list">
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
      <el-row :gutter="24" style="margin-top:15px;">
        <el-col :span="8" :offset="16">
          <el-button v-if="stock == null" type="primary" @click="addClick(0)" size="small">创建盘点单</el-button>
          <el-button v-if="stock != null && stock.status == 0" type="primary" @click="cancelOrComplete(-1)" size="small">取消盘点</el-button>
          <el-button v-if="stock != null && stock.status == 1" type="primary" @click="cancelOrComplete(2)" size="small">完成</el-button>
          <el-button v-if="stock != null && stock.status == 0" @click="addClick(1)" type="primary" size="small">完成预审</el-button>

          <el-button v-if="stock != null" type="primary" @click="toPrint" size="small">打印</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {takeStockStatusMap} from '@/utils/orm'
import {
  viewTakeStockDetail,
  saveTakeStock,
  cancelOrCompleteTakeStock,
  getStorageList,
  getPkSequence
} from "@/api/upmsStorage";

export default {
  components: {},
  data() {
    return {
      loading: false,
      rows: [],
      storageId: "",
      PRINT_ROOT: process.env.PRINT_ROOT,
      storageData: [],
      stock: null,
      stockNo: null,
      currCompanyPk: Cookies.get("select_company_pk"),
      takeStockStatusMap:takeStockStatusMap,
    };
  },
  methods: {
    init() {
      getStorageList({ companyPk: this.currCompanyPk }).then(res => {
        this.storageData = res.data;
      });
    },
    getPkSequence(){
      getPkSequence().then(res=>{
        this.stockNo = res.data
      })
    },
    listSearch() {
      if(!this.storageId){
        this.$message.warning('请选择仓库');
        return;
      }
      this.loading = true;
      viewTakeStockDetail({ storageId: this.storageId })
        .then(res => {
          this.rows = res.data.list;
          this.stock = res.data.stock;
          // this.stockNo = this.stock != null ? this.stock.stockNo : new Date().getTime();
          if(this.stock==null){
            this.getPkSequence();
          }else{
            this.stockNo = this.stock.stockNo
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addClick(status) {
      var data = {
        status: status,
        stockNo: this.stockNo,
        storageId: this.storageId,
        details: this.rows,
        stockId: this.stock == null ? null : this.stock.stockId
      };
      saveTakeStock(data)
        .then(res => {
          this.listSearch();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelOrComplete(status) {
      var data = {
        status: status,
        stockId: this.stock.stockId,
        storageId: this.storageId
      };
      cancelOrCompleteTakeStock(data)
        .then(res => {
          this.listSearch();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    amountChange(row) {
      row.yingKuiNum = row.stockNum - row.amount;
      row.yingKuiSum = row.yingKuiNum * row.price;
    },
    toPrint(row){
      let storageName=''
      this.storageData.forEach(s =>{
        if(s.storageId==this.storageId){
          storageName = s.name;
        }
      })
      let companyName = JSON.parse(window.localStorage.getItem("current_logon_company")).companyName;
      window.open("http://localhost:8083/#/pmsTakeStock?storageId="+this.storageId
        +"&statusName="+takeStockStatusMap[this.stock.status.toString()]
        +"&companyName="+companyName
        +"&storageName="+storageName);
    }
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.book-info {
  height: 537px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 178px;
}
</style>
