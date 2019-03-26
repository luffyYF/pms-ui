// 维修记录表列表
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <div class="app-container">
    <!--搜索条件-->
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form :model="listQuery" label-width="70px" size="mini" :inline="true">
          <el-form-item label="维修状态" style="display: block">
            <el-radio-group v-model="listQuery.status" size="mini">
              <el-radio :label="null" border>全部</el-radio>
              <el-radio :label="2" border>已取消</el-radio>
              <el-radio :label="1" border>已完成</el-radio>
              <el-radio :label="0" border>正在进行</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input placeholder="请输入房间号" v-model="listQuery.roomNumber" @keyup.enter.native="listSearch" size="mini" clearable/>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="listQuery.beginDate"
              type="date"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="listQuery.endDate"
              type="date"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
              style="width: 166px">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="listSearch">查询</el-button>
        </el-form>
      </el-col>
      <el-col :span="6" class="btn-right">
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
        max-height="451" style="width: 100%; margin-top: 5px" 
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="roomNumber" label="房间号" align="left" min-width="100" show-overflow-tooltip/>
        <el-table-column prop="beginDate" label="开始时间" align="left" min-width="186" show-overflow-tooltip/>
        <el-table-column prop="endDate" label="结束时间" align="left" min-width="186" show-overflow-tooltip/>
        <el-table-column prop="status" label="维修状态" align="left" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">正在进行</span>
            <span v-else-if="scope.row.status == 1">已完成</span>
            <span v-else>已取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="维修原因" align="left" min-width="270" show-overflow-tooltip/>
        <el-table-column prop="repairResult" label="维修结果" align="left" min-width="270" show-overflow-tooltip/>
        <el-table-column prop="remark" label="备注" align="left" min-width="270" show-overflow-tooltip/>
    
        <el-table-column label="操作" align="left" fixed="right" min-width="254">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row, null)" v-if="hasPerm('pms:repairRecord:detail')" size="mini" >查看维修</el-button>
            <el-button type="primary" @click="editClick(scope.row, 1)" v-if="hasPerm('pms:repairRecord:update')" size="mini" :disabled="scope.row.status != 0">完成维修</el-button>
            <el-button type="primary" @click="editClick(scope.row, 2)" v-if="hasPerm('pms:repairRecord:update')" size="mini" :disabled="scope.row.status != 0">取消维修</el-button>
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
    <RepairRecordEdit ref="repairRecordEditRef" @callback="listSearch"/>
    <RepairRecordDialog ref="repairRecordDialogRef" @callback="listSearch"/>
  </div>
</template>
<script>
  import { deleteApi, listApi, updateApi } from '@/api/roomService/pmsRepairRecordApi'
  import RepairRecordEdit from './RepairRecordEdit'
  import RepairRecordDialog from './RepairRecordDialog'

  export default {
    components: { RepairRecordEdit, RepairRecordDialog },
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
          status: null,
          roomNumber: null,
          beginDate: null,
          endDate: null,
          companyPk: JSON.parse(localStorage.getItem('current_logon_company')).companyPk,
        },
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
      editClick (row, status) {
        if (status == null) {
          this.$refs.repairRecordEditRef.showDialog(row.reasonPk)
        } else {
          this.$refs.repairRecordDialogRef.showDialog(row.reasonPk, status)
        }
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
.el-radio.is-bordered+.el-radio.is-bordered,.el-radio--mini.is-bordered {
  margin-right: 10px;
}
</style>
