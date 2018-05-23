<template>
  <section>
    <el-col :span="24">
      <el-form :inline="true" :model="filters" size="medium">
        <el-form-item>
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button type="primary" icon="el-icon-refresh" @click="getPermissionList"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
              <el-button type="primary" icon="el-icon-plus" @click="showDialogClick()"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" border>
      <el-table-column label="所属系统" prop="systemId">
      </el-table-column>
      <el-table-column label="所属上级" prop="pid">
      </el-table-column>
      <el-table-column label="权限名称" prop="name">
      </el-table-column>
      <el-table-column label="类型" prop="type"><!--类型(1:目录,2:菜单,3:按钮)-->
      </el-table-column>
      <el-table-column label="权限值" prop="permissionValue">
      </el-table-column>
      <el-table-column label="路径" prop="uri">
      </el-table-column>
      <el-table-column label="图标" prop="icon">
      </el-table-column>
      <el-table-column label="状态" prop="status"><!--状态(0:禁止,1:正常)-->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDialogClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-model="pagination"/>
    <umps-permission-form ref="formRef"/>
  </section>
</template>

<script>
  import bus from '@/utils/bus'
  import {getPermissionList, delPermission} from '@/api/upmsPermission'
  import {getBrowseImgUrl} from '@/api/upload'
  import UmpsPermissionForm from './UmpsPermissionForm'

  export default {
    components: {UmpsPermissionForm},
    data () {
      return {
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {permissionName: '', realName: ''},
        tableData: [],
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialogClick (row) {
        this.$refs.formRef.showDialog(row === undefined ? undefined : row.permissionId)
      },
      // 删除
      deleteClick (index, row) {
        this.$confirm('此操作将永久删除《' + row.permissionName + '》用户, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: row.permissionId}
          delPermission(para).then((res) => {
            this.$message({message: '删除成功', type: 'success'})
            // this.tableData.splice(index, 1)
            this.getPermissionList()
          })
        }).catch(() => {
        })
      },
      getPermissionList () {
        this.loading = true
        getPermissionList().then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
      bus.$on('upmsPermissionChange', () => { this.getPermissionList() })
      this.getPermissionList()
    }
  }
</script>
