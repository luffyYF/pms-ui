// 直连配置列表
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="plan-list">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form class="seach-form" ref="listQuery" :inline="true" :model="listQuery" label-width="90px" size="mini" label-position="right">
            <el-form-item label="第三方标识:">
              <el-input placeholder="请输入第三方标识" v-model="listQuery.threeId" style="width: 150px;" @keyup.enter.native="listSearch"
                size="mini" clearable/>
            </el-form-item>
            <el-form-item label="携程状态:">
              <el-select size="mini" style="width: 150px;" v-model="listQuery.ctripStatus" placeholder="请选择房型" clearable >
                <el-option v-for="y in zlStatus" :label="y.name" :value="y.value" :key="y.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="飞猪状态:">
              <el-select size="mini" style="width: 150px;" v-model="listQuery.fliggyStatus" placeholder="请选择房型" clearable >
                <el-option v-for="y in zlStatus" :label="y.name" :value="y.value" :key="y.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="美团状态:">
              <el-select size="mini" style="width: 150px;" v-model="listQuery.meituanStatus" placeholder="请选择房型" clearable >
                <el-option v-for="y in zlStatus" :label="y.name" :value="y.value" :key="y.value"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="listSearch" size="mini">查询</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="addClick" v-if="hasPerm('pms:zlOpenConfig:add')"
                      style="margin-left:0;" size="mini">添加
            </el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <div class="dropdown-list">
      </div>
      <el-table
        :data="rows"
        border
        fit
        size="small"
        highlight-current-row
        class="tables-list"
        max-height="600"
        v-loading="loading">
        <!-- 需要映射的表 -->
        <el-table-column prop="threeId" label="第三方标识" align="left" show-overflow-tooltip/>
        <el-table-column prop="ctripStatus" label="携程直连状态" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.ctripStatus == 1">启用</span>
            <span v-if="scope.row.ctripStatus == 0">未启用</span>
            <span v-if="scope.row.ctripStatus == -1">停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="fliggyStatus" label="飞猪直连状态" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.fliggyStatus == 1">启用</span>
            <span v-if="scope.row.fliggyStatus == 0">未启用</span>
            <span v-if="scope.row.fliggyStatus == -1">停用</span>
          </template>
        </el-table-column>/>
        <el-table-column prop="meituanStatus" label="美团直连状态" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.meituanStatus == 1">启用</span>
            <span v-if="scope.row.meituanStatus == 0">未启用</span>
            <span v-if="scope.row.meituanStatus == -1">停用</span>
          </template>
        </el-table-column>/>
        <el-table-column label="操作" align="left" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClick(scope.row.zlOpenId)" v-if="hasPerm('pms:zlOpenConfig:update')"
                       size="mini">编辑
            </el-button>
            <el-button type="danger" @click="deleteClick(scope.row.zlOpenId)"
                       v-if="hasPerm('pms:zlOpenConfig:delete')" size="mini">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div  class="checkPagination">
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
    </el-row>
    <!--添加、修改组件-->
    <ZlOpenConfigEdit ref="zlOpenConfigEditRef" @callback="listSearch"/>
  </section>
</template>
<script>
  import { deleteApi, listApi } from '@/api/zl/zlOpenConfigApi'
  import ZlOpenConfigEdit from './ZlOpenConfigEdit'

  export default {
    components: { ZlOpenConfigEdit },
    data () {
      return {
        loading: false,
        rows: [],
        listQuery: {
          threeId: null,
          ctripStatus: null,
          fliggyStatus: null,
          meituanStatus: null,
          pageNum: 1,
          pageSize: 10
        },
        total: 0,
        zlStatus:[
          {name:"全部",value:null},
          {name:"启用",value:1},
          {name:"未启用",value:0},
          {name:"停用",value:-1},
        ],
        queryPower:null
      }
    },
    mounted () {
      this.queryPower = this.hasPerm('pms:zlOpenConfig:list')
      this.listSearch()
    },
    methods: {
      listSearch () {
        if(!this.queryPower){
            this.$message({ type: 'warning', message: "权限不足，请联系管理员" })
            return
        }
        this.loading = true
        listApi(this.listQuery).then(res => {
          this.total = Number(res.total)
          this.rows = res.list
        }).finally(() => {
          this.loading = false
        })
      },
      addClick () {
        this.$refs.zlOpenConfigEditRef.showDialog()
      },
      editClick (id) {
        this.$refs.zlOpenConfigEditRef.showDialog(id)
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
      }
    }
  }
</script>
<style>
.checkPagination{
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.plan-list .seach-form .el-form-item{
  margin-bottom: 0px !important;
}
.white{
    background-color: white !important;
}
.gray{
    background-color:#ebeef5 !important;
}
</style>
<style scoped>

.cursor{
    cursor: pointer;
}

.noChange{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}

.plan-list {
  padding: 20px 20px 0 20px;
}
.btn-right {
  text-align: right;
}
.tables-list {
  width: calc(100% - 24px);
  /* min-height: 250px; */
  margin: 0 12px;
}
.tables-list {
  border: 1px solid #ddd;
}
.dropdown-list {
  margin: 20px 12px 0 12px;
  height: 40px;
  line-height: 40px;
  background: #f4f6f9;
  border: 1px solid #dddddd;
  border-bottom: 0;
}
</style>


