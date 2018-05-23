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
              <el-button type="primary" icon="el-icon-refresh" @click="getSystemList"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
              <el-button type="primary" icon="el-icon-plus" @click="showDialogClick()"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" border>
      <el-table-column label="图标" prop="icon">
      </el-table-column>
      <el-table-column label="系统标题" prop="title">
      </el-table-column>
      <el-table-column label="系统名称" prop="name">
      </el-table-column>
      <el-table-column label="根目录" prop="basePath">
      </el-table-column>
      <el-table-column label="主题" prop="theme">
      </el-table-column>
      <el-table-column label="背景" prop="banner">
      </el-table-column>
      <el-table-column label="描述" prop="description">
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'primary'"
            close-transition>{{scope.row.status === 1 ? '正常' : '黑名单'}}</el-tag>
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
    <umps-system-form ref="formRef"/>
  </section>
</template>

<script>
  import bus from '@/utils/bus'
  import {getSystemList, delSystem} from '@/api/upmsSystem'
  import {getBrowseImgUrl} from '@/api/upload'
  import UmpsSystemForm from './UmpsSystemForm'

  export default {
    components: {UmpsSystemForm},
    data () {
      return {
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {systemName: '', realName: ''},
        tableData: [],
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialogClick (row) {
        this.$refs.formRef.showDialog(row === undefined ? undefined : row.systemId)
      },
      // 删除
      deleteClick (index, row) {
        this.$confirm('此操作将永久删除《' + row.title + '》系统, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: row.systemId}
          delSystem(para).then((res) => {
            this.$message({message: '删除成功', type: 'success'})
            // this.tableData.splice(index, 1)
            this.getSystemList()
          })
        }).catch(() => {
        })
      },
      getSystemList () {
        this.loading = true
        getSystemList().then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
      bus.$on('upmsSystemChange', () => { this.getSystemList() })
      this.getSystemList()
    }
  }
</script>
