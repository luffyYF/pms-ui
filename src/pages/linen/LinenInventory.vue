<template>
  <section>
    <div class="bg-purple-ds">批次号【NO20180228232】</div>
    <div class="bg-purple-dark">
      有效验收 = 送洗 -（送洗 - 送洗验收）-（本次返洗 - 返洗验收）= 送洗验收 - 本次返洗 + 返洗验收<br/>
      欠数 = 送洗 - 送洗验收 + 返洗 - 返洗验收<br/>
    </div>
    <div class="bg-purple-text">状态： 未创建
      <el-button style="float:right;" size="mini" type="primary" icon="el-icon-plus">创建盘点单</el-button>
    </div>
    <div class="table-box">
      <el-table v-loading="loading" :data="tableData" height='100%' border>
        <el-table-column label="编号" prop="userName" fixed align="center" width="160">
        </el-table-column>
        <el-table-column label="名称" prop="startTime" align="center" width="160">
        </el-table-column>
        <el-table-column label="新到" prop="description" align="center" width="120">
        </el-table-column>
        <el-table-column label="配置" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="脏布草" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="送洗" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="送洗验收" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="本次返洗" prop="ip" align="center" width="120">
        </el-table-column>
        <el-table-column label="返洗总数" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="返洗验收" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="有效验收" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="欠数" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="库存小计" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="店内小计" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="总数" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="历史损耗" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="新增损耗" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="历史盈亏" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="盈余" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="亏损" prop="ip" align="center" width="80">
        </el-table-column>
        <el-table-column label="有效期" prop="ip" align="center" width="240">
        </el-table-column>
        <el-table-column label="来源" prop="ip" align="center" width="120">
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
.bg-purple-text{
  padding: 10px;
  font-size: 17px;
  font-weight: bold;
  color: red;
}
.table-box {
  width: 100%;
  margin-top: 10px;
  height: calc(100% - 180px);
  overflow-y: auto;
}
</style>