// 发票信息编辑
// Created by Administrator on 2018-11-30T11:55:04.809.
<template>
  <el-dialog title="发票流程" :visible.sync="dialogVisible" width="800px">
    <el-table :data="rows" height="250" border style="width: 100%">
      <el-table-column prop="ip" label="ip">
      </el-table-column>
      <el-table-column prop="createUserName" label="操作人">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">草稿</span>
          <span v-else-if="scope.row.status == 1">提交财务</span>
          <span v-else-if="scope.row.status == 2">审核通过</span>
          <span v-else-if="scope.row.status == 5">已开票</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="操作时间">
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button> -->
      <el-button @click="dialogVisible = false" size="small">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import moment from "moment";
  import { getInvoiceStatusFlowApi } from '@/api/upmsInvoiceInfo'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        rows: [],
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id) {
          getInvoiceStatusFlowApi({ invoiceId: id }).then(res => {
            this.rows = res.list
          })
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped>
.forminfo{
  line-height: 26px;
  margin-bottom: 16px;
}
.bg-reserve {
  position: relative;
  background: #ffffff;
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
  background: #ffffff;
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
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 19px;
    margin-left: 10px;
}
.width-46 {
  width: 46%;
}
.width-138 {
  width: 100.5%;
}
.width-180 {
  width: 130%;
}
.width-172 {
  width: 124.5%;
}
</style>
