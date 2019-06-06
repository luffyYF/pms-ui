
<template>
  <div>
      <el-table
        :data="rows"
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="createTime" label="兑换时间"></el-table-column>
        <el-table-column prop="userIntegral" label="使用积分"></el-table-column>
        <el-table-column prop="giftName" label="兑换礼品/优惠卷" width="184"></el-table-column>
        <el-table-column prop="integralNumber" label="数量"></el-table-column>
        <el-table-column prop="integralNumber" label="价值"></el-table-column>
        <el-table-column prop="createUserId" label="操作员"></el-table-column>
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
import {listIntegralExchangeForGoods} from '@/api/atrialCenter/roomForwardStatus'

  export default {
    data () {
      return {
        loading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          memPk: null,
        },
        rows: [],
        total: 0,
      }
    },
    created(){
      this.listSearch();
    },
    methods: {
      init(id) {
        this.listSearch();
        this.queryParams.memPk = id

      },
      listSearch () {
        this.loading = true
        listIntegralExchangeForGoods(this.queryParams).then(res => {
          this.rows = res.data.list
          this.total = parseInt(res.data.total)
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
