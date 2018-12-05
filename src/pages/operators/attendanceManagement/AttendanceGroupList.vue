// 考勤组(班次组)表列表
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <div class="content-body">
    <span class="title-span">排班表</span>
    <el-button type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
    <hr>
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="120px">
      <!-- <el-form-item label="操作员">
        <el-input v-model="listQuery.createUserName"></el-input>
      </el-form-item>
      <el-form-item label="客单号">
        <el-input v-model="listQuery.orderGuestNo"></el-input>
      </el-form-item>
      <el-form-item label="房间号">
        <el-input v-model="listQuery.roomNumber"></el-input>
      </el-form-item>
      <el-form-item label="客人姓名">
        <el-input v-model="listQuery.guestName"></el-input>
      </el-form-item> -->
      <!-- <el-form-item  label="起始时间" prop="daterange">
        <el-date-picker
          v-model="orderDate"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="listSearch(1)">搜索日志</el-button>
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
        <el-table-column prop="groupId" label="考勤组主键" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="companyPk" label="公司主键" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="isDefault" label="是否默认 0:否 1:是" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="groupName" label="组名称" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="type" label="考勤类型: FIXED为固定排班，TURN为轮班排班，NONE为无班次" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="deptNameList" label="关联的部门（部门名称集合）" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="orderNum" label="排序" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="isDelete" label="0:否 1:是" align="left" width="150" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="创建时间" align="left" width="150" show-overflow-tooltip/>
    
        <el-table-column label="操作" align="left" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row.GroupId)" v-if="hasPerm('upms:permManage:editPerm')"
                       size="mini">编辑
            </el-button>
            <el-button type="danger" @click="deleteClick(scope.row.GroupId)"
                       v-if="hasPerm('upms:permManage:delPerm')" size="mini">删除
            </el-button>
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
    <AttendanceGroupEdit ref="attendanceGroupEditRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import { listGroupApi } from '@/api/oaApi'
  import AttendanceGroupEdit from './AttendanceGroupEdit'

  export default {
    components: { AttendanceGroupEdit },
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
          systemId: null,
          title: null,
          permType: null,
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
        listGroupApi({date: '2018-12-06'}).then(res => {
          this.total = Number(res.total)
          this.rows = res.list
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.attendanceGroupEditRef.showDialog(this.listQuery.systemId)
      },
      editClick (id) {
        this.$refs.attendanceGroupEditRef.showDialog(id)
      },
      deleteClick (id) {
        this.$confirm('确定删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGroupApi({ id: id }).then(res => {
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
