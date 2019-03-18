// 存放人信息编辑
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <el-dialog class="lost-articles" title="存放人信息" :visible.sync="dialogVisible" width="641px"
             :close-on-click-modal="false" :before-close="handleClose" append-to-body top="18vh">
    <!--搜索条件-->
    <el-row :gutter="24">
      <el-col :span="24">
        <span style="line-height: 28px">在住客人/离店客人</span>
        <el-form :model="listQuery" label-width="80px" size="mini" style="display: inline-block;float: right;margin-bottom: 5px">
          <el-input placeholder="请输入客人姓名/房间号/订单号" v-model="listQuery.param" style="width: 200px;" @keyup.enter.native="listSearch" size="mini" clearable/>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="listSearch">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
    <!--表格-->
    <div class="table-container">
      <el-table
        :data="rows"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        max-height="300"
        v-loading="loading"
        @row-click="handleRowClick">
        <!-- 需要映射的表 -->
        <el-table-column prop="orderGuestNo" label="订单号" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="roomNumber" label="房间号" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="guestName" label="客人姓名" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="guestPhone" label="手机号" align="left" width="150" show-overflow-tooltip/>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { guestListApi } from '@/api/order/pmsOrderController'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        rows: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          param: null,
          type: 0,
        },
        returnData: {
          orderNo: null,
          roomPk: null,
          roomNumber: null,
          userId: null,
          userName: null,
          userPhone: null,
        },
        total: 0
      }
    },
    methods: {
      showDialog (id) {
        this.listQuery.type = id
        this.dialogVisible = true
        this.listSearch()
      },
      listSearch () {
        this.loading = true
        guestListApi(this.listQuery).then(res => {
          this.total = Number(res.data.total)
          this.rows = res.data.list
        }).finally(() => {
          this.loading = false
        })
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
      },
      handleClose () {
        this.dialogVisible = false
      },
      handleRowClick (row) {
        this.returnData = {
          orderNo: row.orderGuestNo,
          roomPk: row.roomPk,
          roomNumber: row.roomNumber,
          userId: row.memPk,
          userName: row.guestName,
          userPhone: row.guestPhone
        }
      },
      // 保存数据
      saveData () {
        this.$emit('callback', this.returnData)
        this.dialogVisible = false
      }
    }
  }
</script>
