// 班次列表
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <div class="content-body">
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="120px">
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="listSearch(1)" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="addClick" v-if="hasPerm('pms:attClass:add')">添加班次</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <div class="table-container">
      <el-table
        :data="rows"
        border
        fit
        size="small"
        highlight-current-row
        style="width: 100%;"
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="classCode" label="班次编号" align="left" width="120" show-overflow-tooltip/>
        <el-table-column prop="className" label="班次名称" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="groupName" label="班次组名称" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orderNum" label="排序" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="left" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row.classId)" v-if="hasPerm('pms:attClass:modify')" size="mini">编辑</el-button>
            <el-button type="danger" @click="deleteClick(scope.row.classId)" v-if="hasPerm('pms:attClass:delete')" size="mini">删除</el-button>
          </template>
        </el-table-column>
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
    <!--添加、修改组件-->
    <AttendanceClassEdit ref="attendanceClassEditRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import {attendanceTypeMap} from '@/utils/orm'
  import { attendanceClassList,attendanceClassDelete } from '@/api/oaApi'
  import AttendanceClassEdit from './AttendanceClassEdit'

  export default {
    components: { AttendanceClassEdit },
    data () {
      return {
        attendanceTypeMap:attendanceTypeMap,
        loading: false,
        rows: [],
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        total: 0
      }
    },
    mounted () {
      this.listSearch()
    },
    methods: {
      listSearch () {
        this.loading = true
        let data = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          companyPk:localStorage.getItem('select_company_pk')
        }
        attendanceClassList(data).then(res => {
          this.total = Number(res.data.total)
          this.rows = res.data.list
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.attendanceClassEditRef.showDialog(this.listQuery.systemId)
      },
      editClick (id) {
        this.$refs.attendanceClassEditRef.showDialog(id)
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          attendanceClassDelete({ id: id }).then(res => {
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
      }
    }
  }
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px -5px 20px;
  overflow-y: auto;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px 0;
  display: inline-block;
}
</style>
