<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">停用房、维修房原因设置</h5>
      <el-form ref="form" :model="form" size="mini" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加原因</el-button>
          <span class="red">&nbsp;&nbsp;*注：原因必填，不能超过45个汉字</span>
        </el-form-item>
      </el-form>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        v-loading="loading"
        :data="tableData" 
        style="width: 98%; margin:0px auto;">
        <el-table-column prop="typeName" label="原因" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.typeName" size="mini" placeholder="请输入原因"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="typeMaster" label="类型" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.typeMaster" size="mini" placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
    </div>
  </div>
</template>

<script>
import {listType,delType,updateype,addType} from '@/api/utils/pmsTypeController'
  export default {
    data() {
      return {
        typeMaster: 'REPAIR,DISABLE',
        loading:false,
        options:[{
          label:'停用',
          value:'DISABLE'
        },{
          label:'维修',
          value:'REPAIR'
        }],
        tableData: [],
        form:{}
      }
    },
    methods: {
      init() {
        this.list()
      },
      saveClick(row) {
        console.log(row)
        const self = this
        if(row.typePk == ''){
          addType(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            self.list();
          })
        }else{
          delete row.createTime;
          delete row.updateTime;
          console.log(row)
          updateype(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
            }
            self.list();
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
            }
            self.list();
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
            typeMaster: 'REPAIR', 
            typeName: '', 
            integralFlag:'N',
            monthlyRent:'',
            sortNum:'',
            usingFlag:'N'
          })
        }
      },
      list(){
        const self = this
        this.loading = true;
        listType({typeMasters: this.typeMaster}).then(result => {
          self.tableData = result.data.data
          console.log(self.tableData);
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      }
    }
  }
</script> 

<style scoped>
.demo-form-inline{
  padding-left: 20px;
}
.el-input{
  width: 350px;
}
.el-Name{
  width: 120px;
}
.red{
  color: red;
  margin-top: 5px;
  display: inline-block;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 20px 0px 15px;
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
  margin-left: -5px;
}
</style>
