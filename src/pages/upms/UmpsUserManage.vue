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
              <el-button type="primary" icon="el-icon-refresh" @click="getUserList"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
              <el-button type="primary" icon="el-icon-plus" @click="showDialogClick()"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" border>
      <el-table-column label="账号" prop="userName">
      </el-table-column>
      <el-table-column label="姓名" prop="realName">
      </el-table-column>
      <el-table-column label="头像" prop="avatar">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.avatar" trigger="hover" placement="top">
            <img :src="getBrowseImgUrl(scope.row.avatar)" class="image">
            <div slot="reference" class="name-wrapper">
              <img :src="getBrowseImgUrl(scope.row.avatar)" class="image" width="20" height="20">
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDialogClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-model="pagination"/>
    <umps-user-form ref="formRef"/>
  </section>
</template>

<script>
  import bus from '@/utils/bus'
  import {getUserList, delUser} from '@/api/upmsUser'
  import {getBrowseImgUrl} from '@/api/upload'
  import UmpsUserForm from './UmpsUserForm'

  export default {
    components: {UmpsUserForm},
    data () {
      return {
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {userName: '', realName: ''},
        tableData: [],
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialogClick (row) {
        this.$refs.formRef.showDialog(row === undefined ? undefined : row.userId)
      },
      // 删除
      deleteClick (index, row) {
        this.$confirm('此操作将永久删除《' + row.userName + '》用户, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: row.userId}
          delUser(para).then((res) => {
            this.$message({message: '删除成功', type: 'success'})
            // this.tableData.splice(index, 1)
            this.getUserList()
          })
        }).catch(() => {
        })
      },
      getUserList () {
        this.loading = true
        getUserList().then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
      bus.$on('upmsUserChange', () => { this.getUserList() })
      this.getUserList()
    }
  }
</script>
