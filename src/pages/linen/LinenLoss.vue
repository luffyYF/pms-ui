<template>
  <section>
    <div class="bg-purple-ds">批次号【NO20180228232】</div>
    <div class="bg-purple-dark">
      可报损数 = 配置 - 欠数 - 历史损耗 - 新增损耗 + 盈余 - 亏损<br/>
    </div>
    <div class="table-box">
      <el-table v-loading="loading" :data="tableData" height="100%" border>
        <el-table-column label="编号" prop="userName" fixed align="center" width="160">
        </el-table-column>
        <el-table-column label="名称" prop="startTime" align="center" width="160">
        </el-table-column>
        <el-table-column label="简拼" prop="description" align="center" width="120">
        </el-table-column>
        <el-table-column label="类型" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="单位" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="可报损数" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="报损数" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="报损原因" prop="ip" align="center" width="180">
        </el-table-column>
        <el-table-column label="有效期" prop="ip" align="center" width="240">
        </el-table-column>
        <el-table-column label="来源" prop="ip" align="center" width="160">
        </el-table-column>
        <el-table-column label="备注" prop="ip" align="center">
        </el-table-column>
      </el-table>
    </div>
  </section>
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
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
          {userName:'浪漫',startTime:'123123',description:'床褥',ip:6},
        ]
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
    mounted () {}
  }
</script>
<style scoped>
.bg-purple-ds{
  padding: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
.bg-purple-dark {
  background-color: #fdf7f7;
  border-color: #eed3d7;
  padding: 10px;
  margin-bottom: 10px;
}
.keeping-content{
  padding: 10px;
}
.table-box {
  width: 100%;
  height: calc(100% - 110px);
  overflow-y: auto;
}
</style>