// 会员消费明细编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="会员消费明细" :visible.sync="dialogVisible" width="800px"
							:close-on-click-modal="false" :before-close="handleClose">
      <el-table
        :data="rows"
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="memName" label="姓名"></el-table-column>
        <el-table-column prop="roomNumber" label="房号"></el-table-column>
        <el-table-column prop="createTime" label="消费时间" width="184"></el-table-column>
        <el-table-column prop="consumptionAmount" label="总消费"></el-table-column>
        <el-table-column prop="createUserName" label="操作员"></el-table-column>
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

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>
import { findMemberConsumptionBills } from '@/api/bill'

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
      showDialog (id) {
        this.queryParams.memPk = id
        this.dialogVisible = true
        this.listSearch()
      },
      listSearch () {
        this.loading = false
        findMemberConsumptionBills(this.queryParams).then(res => {
          this.rows = res.data.list
          this.total = res.data.total
        }).finally(() => {
          this.loading = false
        })
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
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