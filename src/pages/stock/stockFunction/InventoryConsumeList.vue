<template>
  <section class="inventory-list">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form class="seach-form" ref="listQuery" :inline="true" :model="listQuery" label-width="70px" size="small" label-position="left">
          <el-form-item label="操作人">
            <el-input placeholder="请输入操作人" v-model="listQuery.name" class="input-with-select" size="small" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="listQuery.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="listSearch()">查询</el-button>
          </el-form-item>
        </el-form>

      </el-col>
      <el-col :span="6" class="btn-right">
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <div class="dropdown-list">
      </div>
      <el-table :data="rows" border height="400" class="tables-list">
        <el-table-column prop="inventoryNo" label="消耗单号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="消耗公司" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userName" label="操作人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300" min-width="250">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-tickets" @click="openDetailClick(scope.row)" v-if="hasPerm('pms:consumeManage:detail')">详细</el-button>
            <!-- <el-button type="text" icon="el-icon-delete" @click="deleteClick(scope.row.inventoryId)" v-if="hasPerm('upms:invenManage:delete')">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin: 10px 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-row>
  </section>
</template>

<script>
import { consumeListApi } from '@/api/upmsStorage'

export default {
  data() {
    return {
      loading: false,
      rows: [],
      listQuery: {
        systemId: null,
        title: null,
        permType: null,
        pageNum: 1,
        pageSize: 10,
        name: null,
        companyPk: null,
        date: null,
        outType: 1,
      },
      total: 0,
      company: JSON.parse(localStorage.getItem('current_logon_company')),
    };
  },
  mounted () {
    this.listQuery.companyPk = this.company.companyPk
    this.init()
  },
  methods: {
    init() {
      this.listSearch();
    },
    listSearch () {
      this.loading = true
      consumeListApi(this.listQuery).then(res => {
        this.total = Number(res.total)
        this.rows = res.list
        res.list.forEach(element => {
          this.$set(element, 'companyName', this.company.companyName)
        });
      }).finally(() => {
        this.loading = false
      })
    },
    openDetailClick (row) {
      this.$router.push("/stock/InventoryConsumeRecord/O" + row.outId);
    },
    // 分页相关
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.listSearch()
    },
    // 分页相关
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.listSearch()
    }
  }
};
</script>

<style>
.inventory-list .seach-form .el-form-item{
  margin-bottom: 0px !important;
}
</style>
<style scoped>
.btn-right {
  text-align: right;
}
.tables-list {
  width: calc(100% - 24px);
  /* min-height: 250px; */
  margin: 0 12px;
}
.tables-list {
  border: 1px solid #ddd;
}
.dropdown-list {
  margin: 20px 12px 0 12px;
}
</style>

