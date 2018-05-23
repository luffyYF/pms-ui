<template>
  <section>
    <el-col :span="24">
      <el-form :inline="true" :model="filters" size="medium">
        <el-form-item>
          <date-time-picker v-model="filterDate"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="getList"></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table v-loading="loading" :data="tableData | globalFilter(filterText) | pagingFilter(pagination)" filter-change="handlerFilterChange" border>
      <el-table-column label="操作用户" prop="userName" width="120" filters="">
      </el-table-column>
      <el-table-column label="操作时间" prop="startTime" width="150" sortable>
      </el-table-column>
      <el-table-column label="描述" prop="description" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="ip" prop="ip" width="120">
      </el-table-column>
      <el-table-column label="用户标识" prop="userAgent" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="根目录" prop="basePath" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="参数" prop="parameter" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="结果" prop="result" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <pagination v-model="pagination"/>
  </section>
</template>

<script>
  import DateTimePicker from '../../components/DateComponent/DateTimePicker'
  import {listUpmsLog} from '../../api/upmsSystem'

  export default {
    components: {DateTimePicker},
    data () {
      return {
        total: 0,
        filterDate: [],
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {systemName: '', realName: ''},
        filterTable: [],
        tableData: []
      }
    },
    watch: {
      filterText: function (value) {
      }
    },
    methods: {
      handlerFilterChange (value) {
        this.total = value.length
        // var offset = (index - 1) * size
        // return items.slice(offset, offset + size)
      },
      getList () {
        if (!this.filterDate || !this.filterDate.begin) {
          this.$message.error('请选择时间')
          return
        }
        this.loading = true
        listUpmsLog(this.filterDate).then(res => {
          this.loading = false
          this.tableData = res.data
        })
      }
    },
    mounted () {
    }
  }
</script>
