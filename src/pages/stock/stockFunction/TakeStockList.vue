// 盘点记录
<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="盘点仓库">
            <el-select v-model="listQuery.storageId" style="width: 200px;" placeholder="请选择仓库" @change="listSearch()">
              <el-option v-for="obj in storageData" :key="obj.storageId" :label="obj.name" :value="obj.storageId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" style="width: 200px;" placeholder="请选择状态">
              <el-option v-for="obj in statusData" :key="obj.value" :label="obj.name" :value="obj.value"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="listSearch()" size="small">查询</el-button>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-table :data="rows" border fit size="small" highlight-current-row v-loading="loading" class="tables-list">
        <el-table-column prop="stockNo" label="盘点单号"></el-table-column>
        <el-table-column prop="name" label="仓库名称"></el-table-column>
        <el-table-column prop="name" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == -1">已取消</span>
            <span v-if="scope.row.status == 0">已创建</span>
            <span v-if="scope.row.status == 1">已预审</span>
            <span v-if="scope.row.status == 2">已完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="盘点时间">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300" min-width="250">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-tickets" @click="detailClick(scope.row.stockId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 10px 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- <el-row :gutter="24" style="margin-top:15px;">
        <el-col :span="8" :offset="16">
          <el-button v-if="stock == null" type="primary" @click="addClick(0)" icon="el-icon-search" size="small">创建盘点单</el-button>
          <el-button v-if="stock != null && stock.status == 0" type="primary" @click="cancelOrComplete(-1)" icon="el-icon-search" size="small">取消盘点</el-button>
          <el-button v-if="stock != null && stock.status == 1" type="primary" @click="cancelOrComplete(2)" icon="el-icon-search" size="small">完成</el-button>
          <el-button v-if="stock != null && stock.status == 0" @click="addClick(1)" type="primary" icon="el-icon-search" size="small">完成预审</el-button>
        </el-col>
      </el-row> -->
    </el-row>

    <TakeStockDetail ref="detailRef"></TakeStockDetail>
  </div>
</template>

<script>
import { getTakeStockList, getStorageList } from "@/api/upmsStorage";
import TakeStockDetail from './TakeStockDetail'
export default {
  components: {TakeStockDetail},
  data() {
    return {
      loading: false,
      currCompanyPk: localStorage.getItem("select_company_pk"),
      rows: [],
      PRINT_ROOT: process.env.PRINT_ROOT,
      storageData: [],
      listQuery: {
        storageId: null,
        status: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      statusData: [
        { name: "全部", value: "" },
        { name: "已完成", value: 2 },
        { name: "已预审", value: 1 },
        { name: "已创建", value: 0 },
        { name: "已取消", value: -1 }
      ]
    };
  },
  methods: {
    init() {
      getStorageList({ companyPk: this.currCompanyPk }).then(res => {
        this.storageData = res.data;
        this.listQuery.storageId = this.storageData[0].storageId
        this.listSearch();
      });
    },
    listSearch() {
      this.loading = true;
      getTakeStockList(this.listQuery)
        .then(res => {
          this.total = Number(res.data.total);
          this.rows = res.data.list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 分页相关
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.listSearch();
    },
    // 分页相关
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.listSearch();
    },
    detailClick(stockId) {
      this.$refs.detailRef.init(stockId);
      // this.$router.push("/ckTakeStockDetail/" + stockId);
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
