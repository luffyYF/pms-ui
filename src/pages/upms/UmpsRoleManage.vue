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
              <el-button type="primary" icon="el-icon-refresh" @click="getRoleList"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
              <el-button type="primary" icon="el-icon-plus" @click="showDialogClick()"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" border>
      <el-table-column label="角色名称" prop="name">
      </el-table-column>
      <el-table-column label="角色标题" prop="title">
      </el-table-column>
      <el-table-column label="角色描述" prop="description">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDialogClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-model="pagination"/>
    <UmpsRoleForm ref="formRef"/>
  </section>
</template>

<script>
  import bus from '@/utils/bus'
  import {getRoleList, delRole} from '@/api/upmsRole'
  import {getBrowseImgUrl} from '@/api/upload'
  import UmpsRoleForm from './UmpsRoleForm'

  export default {
    components: {UmpsRoleForm},
    data () {
      return {
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {roleName: '', realName: ''},
        tableData: [],
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialogClick (row) {
        this.$refs.formRef.showDialog(row === undefined ? undefined : row.roleId)
      },
      // 删除
      deleteClick (row) {
        this.$confirm('此操作将永久删除《' + row.name + '》角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: row.roleId}
          delRole(para).then((res) => {
            this.$message({message: '删除成功', type: 'success'})
            this.getRoleList()
          })
        }).catch(() => {
        })
      },
      getRoleList () {
        this.loading = true
        getRoleList().then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
      bus.$on('upmsRoleChange', () => { this.getRoleList() })
      this.getRoleList()
    }
  }
</script>
