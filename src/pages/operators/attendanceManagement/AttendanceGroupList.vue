// 考勤组(班次组)表列表
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <div class="content-body">
    <el-form ref="listQuery" :inline="true" :model="listQuery" size="mini" label-width="120px">
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" @click="listSearch(1)" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="addClick" v-if="hasPerm('pms:attGroup:add')">添加班次组</el-button>
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
        <el-table-column prop="groupName" label="组名称" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="考勤类型" align="left"  show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{attendanceTypeMap[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isDefault" label="是否默认" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.isDefault=='1' ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deptNameList" label="关联的部门" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="orderNum" label="排序" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="left"  show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="left" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row.groupId)" v-if="hasPerm('pms:attGroup:modify')" size="mini">编辑</el-button>
            <el-button type="primary" @click="editSettingClick(scope.row.groupId)" v-if="hasPerm('pms:menu:planSetManage')" size="mini">设置参数</el-button>
            <el-button type="danger" @click="deleteClick(scope.row.groupId)" v-if="hasPerm('pms:attGroup:delete')" size="mini">删除</el-button>
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
  import {attendanceTypeMap} from '@/utils/orm'
  import Cookies from 'js-cookie'
  import { attendanceGroupList,attendanceGroupDelete } from '@/api/oaApi'
  import AttendanceGroupEdit from './AttendanceGroupEdit'

  export default {
    components: { AttendanceGroupEdit },
    data () {
      return {
        attendanceTypeMap:attendanceTypeMap,
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
        let data = {
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          companyPk:Cookies.get('select_company_pk')
        }
        attendanceGroupList(data).then(res => {
          this.total = Number(res.total)
          this.rows = res.list
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.attendanceGroupEditRef.showDialog()
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
          attendanceGroupDelete({ id: id }).then(res => {
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
      //编辑设置
      editSettingClick (id) {
        this.$router.push("/operators/attendanceSetting/" + id);
      },
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
