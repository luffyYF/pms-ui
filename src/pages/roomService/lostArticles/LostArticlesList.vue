// 遗失物品表列表
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <div class="app-container">
    <!--搜索条件-->
    <el-row :gutter="24">
      <el-col :span="20">
        <el-form :model="listQuery" label-width="70px" size="mini" :inline="true">
          <el-form-item label="物品名称">
            <el-input placeholder="请输入物品名称" v-model="listQuery.name" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="客人姓名">
            <el-input placeholder="请输入客人姓名" v-model="listQuery.userName" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input placeholder="请输入房间号" v-model="listQuery.roomNumber" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="listQuery.type" placeholder="请选择类型" size="mini">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="遗留物品" :value="0"></el-option>
              <el-option label="贵重物品" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存放日期">
            <el-date-picker
              v-model="dateTimeRange"
              @change="handleDateTimeChange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              style="width: 329px">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="listSearch">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="4" class="btn-right">
        <el-button type="primary" size="mini" @click="addClick" v-if="hasPerm('pms:lostArticles:add')">存放物品</el-button>
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
        height="451" style="width: 100%; margin-top: 5px" 
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="createTime" label="存放时间" align="left" min-width="156" show-overflow-tooltip/>
        <el-table-column prop="type" label="类型" align="left" min-width="130" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.type == 0">遗留物品</span>
            <span v-else>贵重物品</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="left" min-width="130" show-overflow-tooltip/>
        <el-table-column prop="userName" label="客人姓名" align="left" min-width="130" show-overflow-tooltip/>
        <el-table-column prop="userPhone" label="电话" align="left" min-width="140" show-overflow-tooltip/>
        <el-table-column prop="roomNumber" label="房间号" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="orderNo" label="订单号" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="referenceValue" label="参考价值" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="remark" label="备注" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="depositUserName" label="存放操作员" align="left" min-width="150" show-overflow-tooltip/>
        <el-table-column prop="updateTime" label="领取时间" align="left" min-width="156" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">{{scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="receiveUserName" label="领取操作员" align="left" min-width="150" show-overflow-tooltip/>
    
        <el-table-column label="操作" align="left" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row)" v-if="hasPerm('pms:lostArticles:update')" size="mini" :disabled="scope.row.status == 1">领取</el-button>
          </template>
        </el-table-column>
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
    <!--添加、修改组件-->
    <LostArticlesEdit ref="lostArticlesEditRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import { deleteApi, listApi, updateApi } from '@/api/roomService/pmsLostArticlesApi'
  import LostArticlesEdit from './LostArticlesEdit'

  export default {
    components: { LostArticlesEdit },
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
          name: null,
          userName: null,
          roomNumber: null,
          type: null,
          beginDate: null,
          endDate: null,
          companyPk: JSON.parse(localStorage.getItem('current_logon_company')).companyPk,
        },
        dateTimeRange: [],
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
            element.updateTime = element.updateTime.substring(0,element.updateTime.length-3)
          });
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.lostArticlesEditRef.showDialog(this.listQuery.systemId)
      },
      editClick (row) {
        this.$confirm('是否领取该物品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            lostArticlesPk: row.lostArticlesPk,
            status: 1,
            receiveUserId: this.userInfo.userPk,
            receiveUserName: this.userInfo.upmsRealName
          }

          updateApi(data).then(res => {
            this.$message({ type: 'success', message: "领取成功" })
            this.listSearch()
          })
        }).catch(() => {         
        });
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteApi({ id: id }).then(res => {
            this.$message({ type: 'success', message: res.sub_msg })
            this.listSearch()
          })
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
      handleDateTimeChange (val) {
        if (val == null) {
          this.listQuery.beginDate = null
          this.listQuery.endDate = null
        } else {
          this.listQuery.beginDate = val[0]
          this.listQuery.endDate = val[1]
        }
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
</style>
