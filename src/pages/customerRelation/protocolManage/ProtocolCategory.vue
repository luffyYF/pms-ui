<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">协议类别管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加协议类别</el-button>
      <el-table
        size="mini" 
        border 
        :data="tableData" 
        style="width: 98%; margin:10px;">
        <el-table-column prop="typeCode" label="代码" align="center" width="120">
          <template slot-scope="scope">
            <el-input v-if="scope.row.typePk == ''" v-model="scope.row.typeCode" size="mini" placeholder="请输入代码"></el-input>
            {{scope.row.typePk != ''?scope.row.typeCode:''}}
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="名称" align="center" width="250">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.typeName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sortNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.typePk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <el-button v-if="scope.row.typePk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="positions" @size-change="getSizeChange" @current-change="list" :current-page="queryParams.pageNum" :page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
// import {powerJudge} from '@/utils/permissionsOperation.js'
import {listType,delType,updateype,addType} from '@/api/utils/pmsTypeController'
  export default {
    data() {
      return {
        typeMaster: 'AGREEMENT',
        options:[],
        tableData: [],
        queryParams: {
          typeMaster: 'AGREEMENT',
          pageSize: 10,
          pageNum: 1
        },
        total: 0,
      }
    },
    methods: {
      init() {
        this.list(1)
      },
      saveClick(row) {
        console.log(row)
        const self = this
        if(row.typePk == ''){
          addType(row).then(result => {
            if(result.code == 1){
              self.storeyName = '';
              self.$message({
                message: '添加成功',
                type: 'success'
              });
              this.refreshType();
            }
            self.list(self.queryParams.pageNum);
          })
        }else{
          delete row.createTime;
          delete row.updateTime;
          updateype(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
              this.refreshType();
            }
            self.list(self.queryParams.pageNum);
          })
        }
      },
      deleteClick(row) {
        const self = this
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delType({typePk:row.typePk}).then(result => {
            if(result.code == 1){
              self.storeyName = '';
              self.$message({
                message: '删除成功',
                type: 'success'
              })
              this.refreshType();
            }
            self.list(self.queryParams.pageNum);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });         
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addRows() {
        if(this.tableData.length == 0 || this.tableData[0].typePk != ''){
          this.tableData.unshift({
            typePk: '',
            typeCode: '',
            typeMaster: this.typeMaster, 
            typeName: '', 
            integralFlag:'N',
            monthlyRent:'',
            sortNum:'',
            usingFlag:'N'
          })
        }
      },
      list(val){
        const self = this
        self.queryParams.pageNum = val;
        listType(self.queryParams).then(result => {
          self.tableData = result.data.data;
          self.total = result.data.pageSize;
        }).catch(() => {
          self.loading = false
        })
      },
      getSizeChange(val) {
        const self = this
        self.queryParams.pageSize = val;
        if (val > self.total) {
          self.queryParams.pageNum = 1;
        }
        listType(self.queryParams).then(result => {
          self.tableData = result.data.data;
          self.total = result.data.pageSize;
        }).catch(() => {
          self.loading = false
        })
      },
      // powerJudge(id){
      //   return powerJudge(id);
      // },
    }
  }
</script> 

<style scoped>
.bg-reserve {
  width: 865px;
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.positions {
  float: right;
}
</style>

