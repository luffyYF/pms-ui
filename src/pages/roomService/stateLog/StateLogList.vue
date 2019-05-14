// 房态日志表列表
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <div class="app-container">
    <!--搜索条件-->
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form :model="listQuery" label-width="70px" size="mini" :inline="true">
          <el-form-item label="房间号">
            <el-input placeholder="请输入房间号" v-model="listQuery.roomNumber" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="变更时间">
            <el-date-picker
              v-model="listQuery.beginDate"
              type="date"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" label-width="26px">
            <el-date-picker
              v-model="listQuery.endDate"
              type="date"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="listSearch">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="6" class="btn-right">
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
        max-height="451" style="width: 100%; margin-top: 5px" 
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="createTime" label="变更时间" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="roomNumber" label="房间号" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="oldStatus" label="原状态" align="left" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.oldStatus == 0">空房</span>
            <span v-else-if="scope.row.oldStatus == 1">空脏房</span>
            <span v-else-if="scope.row.oldStatus == 2">在住干净房</span>
            <span v-else-if="scope.row.oldStatus == 3">在住脏房</span>
            <span v-else-if="scope.row.oldStatus == 4">维修房</span>
            <span v-else>停用房</span>
          </template>
        </el-table-column>
        <el-table-column prop="newStatus" label="新状态" align="left" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.newStatus == 0">空房</span>
            <span v-else-if="scope.row.newStatus == 1">空脏房</span>
            <span v-else-if="scope.row.newStatus == 2">在住干净房</span>
            <span v-else-if="scope.row.newStatus == 3">在住脏房</span>
            <span v-else-if="scope.row.newStatus == 4">维修房</span>
            <span v-else>停用房</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="createUserName" label="操作人" align="left" min-width="150" show-overflow-tooltip/>
      </el-table>
      <!--分页-->
      <el-pagination
        style="margin: 10px 20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { listApi } from '@/api/roomService/pmsRoomServiceLogApi'

  export default {
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
          systemId: null,
          title: null,
          permType: null,
          pageNum: 1,
          pageSize: 10,
          roomNumber: null,
          beginDate: null,
          endDate: null,
          companyPk: JSON.parse(localStorage.getItem('current_logon_company')).companyPk,
        },
        total: 0,
        userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
      }
    },
    mounted () {
      this.listSearch()
    },
    methods: {
      listSearch () {
        this.loading = true
        listApi(this.listQuery).then(res => {
          this.total = Number(res.total)
          this.rows = res.list
          res.list.forEach(element => {
            element.createTime = element.createTime.substring(0,element.createTime.length-3)
          });
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
    }
  }
</script>

<style scoped>
.btn-right {
  text-align: right;
}
.el-form-item--mini.el-form-item__label {
  line-height: 28px;
}
.el-radio.is-bordered+.el-radio.is-bordered,.el-radio--mini.is-bordered {
  margin-right: 10px;
}
</style>
