
<template>
  <section class="member-dialog">
        <el-table
            :data="rows"
            border
            v-loading="loading"
            style="width: 100%"
            max-height="410px">
            <el-table-column prop="createTime" label="升级时间" width="184"></el-table-column>
            <el-table-column prop="oldGradeName" label="原卡类型"></el-table-column>
            <el-table-column prop="gradeName" label="新卡类型"></el-table-column>
            <el-table-column prop="integral" label="升级积分"></el-table-column>
            <el-table-column prop="price" label="升级卡费"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="createUserName" label="操作人"></el-table-column>
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
  </section>
</template>

<script>
import { memberUpgradeRecord } from '@/api/customerRelation/pmsMemberUpgradeRecord'

  export default {
    data () {
      return {
        dialogVisible: false,
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
    methods: {
      init (id, type) {
        this.queryParams.memPk = id
        this.dialogVisible = true
        this.listSearch()
      },
      listSearch () {
        this.loading = false
        memberUpgradeRecord(this.queryParams).then(res => {
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
    },
    filters: {
      
    }
  }
</script>