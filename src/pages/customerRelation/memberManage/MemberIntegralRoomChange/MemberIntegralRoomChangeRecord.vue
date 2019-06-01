// 会员积分明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div>
      <el-table
        :data="rows"
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="createTime" label="兑换时间" width="180"></el-table-column>
        <el-table-column prop="ruleName" label="参与活动" show-overflow-tooltip=""></el-table-column>
        <el-table-column prop="integral" label="积分" width="60"></el-table-column>
        <el-table-column prop="roomTypeName" label="兑换房型" show-overflow-tooltip=""></el-table-column>
        <el-table-column prop="price" label="兑换房价" width="80"></el-table-column>
        <el-table-column prop="num" label="兑换间数" width="80"></el-table-column>
        <el-table-column prop="days" label="兑换天数" width="80"></el-table-column>
        <el-table-column prop="createUserName" label="操作员" ></el-table-column>=
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
  </div>
</template>

<script>
import { memberIntegralRoomChangeRecord } from '@/api/customerRelation/pmsMemberIntrgralRoomChangeRecord'

  export default {
    data () {
      return {
        loading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          memPk: null
        },
        rows: [],
        total: 0,
      }
    },
    methods: {
      init(id) {
        this.queryParams.memPk = id
        this.listSearch()
      },
      listSearch () {
        this.loading = true
        memberIntegralRoomChangeRecord(this.queryParams).then(res => {
            if(res.code == 1){
                this.rows = res.list
                this.total = parseInt(res.total)
            }
        }).finally(() => {
          this.loading = false
        })
      },
      // 分页相关
      handleSizeChange (val) {
        this.queryParams.pageSize = val
        this.listSearch()
      },
      // 分页相关
      handleCurrentChange (val) {
        this.queryParams.pageNum = val
        this.listSearch()
      },
    }
  }
</script>