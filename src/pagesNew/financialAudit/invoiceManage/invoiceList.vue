// 发票管理
<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form :model="searchForm" label-width="80px" size="mini" :inline="true">
          <el-form-item label="发票类型">
            <el-select v-model="searchForm.invoiceType" placeholder="请选择发票类型" clearable>
              <el-option :value="0" label="个人普通发票"></el-option>
              <el-option :value="1" label="个人电子发票"></el-option>
              <el-option :value="2" label="公司增值税普通发票"></el-option>
              <el-option :value="3" label="公司增值税专用发票"></el-option>
              <el-option :value="4" label="公司电子发票"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票抬头">
            <el-input type="text" v-model="searchForm.invoiceTitle" clearable></el-input>
          </el-form-item>
          <el-form-item label="税号">
            <el-input type="text" v-model="searchForm.taxpayerIdNo" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input type="text" v-model="searchForm.orderNo" clearable></el-input>
          </el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="6" class="btn-right">
        <el-button type="primary" size="mini" @click="addClick">添加发票</el-button>
      </el-col>
    </el-row>
    <el-col :span="24">
      <div class="tabs">
        <div class="tabs-contetn">
          <el-table 
          :data="rows" 
          v-loading="loading"
          height="400"
          border style="width: 100%; margin-top: 5px" 
          size="mini">
            <el-table-column prop="invoiceType" label="发票类型">
              <template slot-scope="scope">
                <span v-if="scope.row.invoiceType == 0">个人普通发票</span>
                <span v-else-if="scope.row.invoiceType == 1">个人电子发票</span>
                <span v-else-if="scope.row.invoiceType == 2">公司增值税普通发票</span>
                <span v-else-if="scope.row.invoiceType == 3">公司增值税专用发票</span>
                <span v-else>公司电子发票</span>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceTitle" label="发票抬头"></el-table-column>
            <el-table-column prop="taxpayerIdNo" label="税号"></el-table-column>
            <el-table-column prop="orderNo" label="订单编号"></el-table-column>
            <el-table-column prop="addresseeName" label="收件人"></el-table-column>
            <el-table-column prop="addresseePhone" label="收件人电话"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">草稿</span>
                <span v-else-if="scope.row.status == 1">提交财务</span>
                <span v-else-if="scope.row.status == 2">审核通过</span>
                <span v-else-if="scope.row.status == 5">已开票</span>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="createTime" label="创建日期"></el-table-column>
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editClick(scope.row.invoiceId)" v-if="scope.row.status == 0">编辑</el-button>
                <el-button type="primary" size="mini" @click="editClick(scope.row.invoiceId)" v-if="scope.row.status != 0">详细</el-button>
                <el-button type="success" size="mini" @click="showDetail(scope.row.invoiceId)">查看</el-button>
                <el-button type="danger" size="mini" @click="deleteClick(scope.row.invoiceId)" v-if="scope.row.status == 0">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin: 10px 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>


    <invoice-edit ref="invoiceEditRef"  @callback="search"></invoice-edit>
    <invoice-status-flow-list ref="invoiceStatusFlowListRef"  @callback="search"></invoice-status-flow-list>
  </div>
</template>
<script>
import moment from "moment";
import { formatDate, copyObj } from "@/utils/index";
import { historyRoomExchange } from "@/api/reportCenter";
import { deleteApi, listApi } from '@/api/upmsInvoiceInfo';
import invoiceEdit from './invoiceEdit'
import invoiceStatusFlowList from './invoiceStatusFlowList'

export default {
  components:{invoiceEdit, invoiceStatusFlowList},
  data() {
    return {
      searchForm: {
        companyId: JSON.parse(localStorage.getItem("current_logon_company")).companyPk,
        pageNum: 1,
        pageSize: 10,
        invoiceType: null,
        invoiceTitle: null,
        taxpayerIdNo: null,
        orderNo: null,
      },
      total: 0,
      rows: [],
      loading: false,
      moment: moment,
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      this.loading = true;
      listApi(this.searchForm).then(res => {
        this.total = Number(res.total);
        this.rows = res.list;
      }).finally(()=>{
        this.loading = false;
      });
    },
    // 分页相关
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.search();
    },
    // 分页相关
    handleCurrentChange(val) {
      this.searchForm.pageNum = val;
      this.search();
    },
    addClick () {
      this.$refs.invoiceEditRef.showDialog(null);
    },
    editClick(id){
      this.$refs.invoiceEditRef.showDialog(id);
    },
    deleteClick (id) {
      this.$confirm('确定删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApi({ id: id }).then(res => {
          this.$message({ type: 'success', message: res.sub_msg })
          this.search()
        })
      })
    },
    showDetail (id) {
      this.$refs.invoiceStatusFlowListRef.showDialog(id);
    },
  }
};
</script>
<style scoped>
.title {
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title {
  text-align: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
.tabsAdd {
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
.sum-opr{
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  margin-top: 0px;
  padding: 0 14px;
  background: #f7f7f7;
}
.sum-opr .sum-opr-item{
  float: left;
  font-size: 16px;
  margin-right: 35px;
}
.sum-opr .sum-opr-item span{
  color: #e41700;
  /* font-size: 18px; */
  font-weight: bold;
}
.sum-opr .r-sum-opr-item{
  float: right;
}
.btn-right {
  text-align: right;
}
</style>
<style>
.finan-search-form .el-input--mini {
  width: 200px;
}
</style>


