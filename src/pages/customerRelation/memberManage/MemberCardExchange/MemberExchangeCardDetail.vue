// 会员换卡明细
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <div>
      <el-table
        :data="rows"
        border
        v-loading="loading"
        style="width: 100%"
        max-height="410px">
        <el-table-column prop="createTime" label="换卡时间" min-width="200px"></el-table-column>
        <el-table-column prop="originalCardNumber" label="原卡号" min-width="150px"></el-table-column>
        <el-table-column prop="newCardNumber" label="新卡号" min-width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createUserName" label="操作员"  min-width="150px"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center"  min-width="150px">
          <template slot-scope="scope">
             <el-button type="danger" @click="deleteClick(scope.row)"
                    size="mini" v-if="hasPerm('pms:memberCard:del')">删除
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
import { listMemberCardExchange,delMemberCardDetail } from '@/api/customerRelation/pmsMemberCardExchangeController'

  export default {
    data () {
      return {
        loading: false,
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          memPk: null,
          type: null,
        },
        rows: [],
        total: 0,
      }
    },
    methods: {
      init(id, type) {
        this.queryParams.memPk = id
        this.queryParams.type = type
        this.listSearch()
      },
      listSearch () {
        this.loading = false
        listMemberCardExchange(this.queryParams).then(res => {
          this.rows = res.data.list
          this.total = parseInt(res.data.total)
        }).finally(() => {
          this.loading = false
        })
      },
       deleteClick (row) {
        this.$confirm('确定删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delMemberCardDetail({cardExchangeId:row.cardExchangeId}).then(res => {
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