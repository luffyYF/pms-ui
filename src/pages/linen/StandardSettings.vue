<template>
  <div class="p-10">
    <div class="inline_form">
      <el-form :inline="true" size="mini">
        <el-form-item label="房型">
          <el-select v-model="filterText" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布草">
          <el-input v-model="filterText" placeholder="请输入布草名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="刷新" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus">新增布草配置</el-button>
        </el-form-item>
      </el-form>`
    </div>
    <div class="table-box">
      <el-table v-loading="loading" :data="tableData" border width="100%" height="100%">
        <el-table-column label="房型" prop="userName" align="center" width="180">
        </el-table-column>
        <el-table-column label="布草编号" prop="startTime" align="center" width="240">
        </el-table-column>
        <el-table-column label="布草名称" prop="description" align="center" width="240">
        </el-table-column>
        <el-table-column label="数量" prop="ip" align="center" width="140">
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="showDialogClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <pagination v-model="pagination"/> -->
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        total: 0,
        filterDate: [],
        filterText: '',
        pagination: {size: 10, current: 1, total: 0},
        loading: false,
        filters: {systemName: '', realName: ''},
        filterTable: [],
        tableData: [
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
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
        this.loading = true
        // listUpmsLog(this.filterDate).then(res => {
        //   this.loading = false
        //   this.tableData = res.data
        // })  
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .p-10 {
    padding:0 10px;
  }
  .inline_form {
    height: 50px;
  }
  .table-box {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
</style>
