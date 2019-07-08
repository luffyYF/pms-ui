// 会员卡支付明细
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div>
      <el-table
        :data="rows"
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="companyName" label="来源" min-width="200px"></el-table-column>
        <el-table-column prop="createTime" label="消费时间" min-width="200px"></el-table-column>
        <el-table-column prop="totalMoney" label="刷卡金额" min-width="100px"></el-table-column>
        <el-table-column prop="cardPayPk" label="订单号" min-width="150px"></el-table-column>
        <el-table-column prop="memName" label="客人姓名"  min-width="150px"></el-table-column>
        <el-table-column prop="roomNumber" label="房号/桌台编号"  min-width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注"  min-width="150px"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center"  min-width="100px">
          <template slot-scope="scope">
             <el-button type="danger" @click="deleteClick(scope.row)" 
                    size="mini"  v-if="hasPerm('pms:memberCardPay:del')">删除
             </el-button>
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
  </div>
</template>

<script>
import { listMemberCardPayDetail,delMemberCardPayDetail } from '@/api/customerRelation/pmsMemberController'

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
    methods: {
      init(id, type) {
        this.queryParams.memPk = id
        this.listSearch()
      },
      listSearch () {
        this.loading = false
        listMemberCardPayDetail(this.queryParams).then(res => {
          this.rows = res.data.list
          this.total = parseInt(res.data.total)
        }).finally(() => {
          this.loading = false
        })
      },
       deleteClick (row) {
           console.log(row);
        this.$confirm('确定删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delMemberCardPayDetail({cardPayPk:row.cardPayPk}).then(res => {
              if(res.code == 1){
                  this.$message({ type: 'success', message: "删除成功！" })
                  this.listSearch()
              }else{
                 this.$message({ type: 'warning', message: "删除失败！" })
              }
          })
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