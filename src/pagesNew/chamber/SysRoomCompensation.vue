<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">客房赔偿设置</h5>
      <el-form size="mini" :inline="true" class="demo-form-inline">
        <el-form-item label="房间类型">
          <el-select v-model="selectRoomType" @change="selectRoomTypes" placeholder="请选择房型">
            <el-option
              v-for="item in options"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加客房赔偿</el-button>
        </el-form-item>
      </el-form>
      <el-table
        size="mini" 
        border
        highlight-current-row
        v-loading='loading'
        :data="tableData | globalFilter(selectRoomType)" 
        style="width: 98%; margin:10px;">
        <el-table-column prop="code" label="代码" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.code" size="mini" placeholder="请输入代码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.projectName" class="el-Name" size="mini" placeholder="请输入项目名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="projectPrice" label="价格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.projectPrice" class="el-Name" size="mini" placeholder="请输入价格"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.projectPk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <el-button v-if="scope.row.projectPk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
 import {listType} from '@/api/utils/pmsTypeController'
 import {listProject,delProject,updateProject,addProject} from '@/api/systemSet/pmsProjectController'
  export default {
    data() {
      return {
        typeMaster: 'ROOM_PC',
        options:[],
        tableData: [],
        selectRoomType: '',
        loading:false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init() {
        this.list()
        this.listRoomType()
      },
      selectRoomTypes(v){
        console.info(v)
        if(this.tableData.length != 0 && this.tableData[0].projectPk == ''){
          this.deleteRow(0, this.tableData)
        }
      },
      saveClick(row) {
        console.log(row)
        const self = this
        if(row.projectPk == ''){
          addProject(row).then(result => {
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
          updateProject(row).then(result => {
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
          delProject({projectPk:row.projectPk}).then(result => {
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
        if(this.tableData.length == 0 || this.tableData[0].projectPk != ''){
          this.tableData.unshift({
            "code": '',
            "projectName": '',
            "projectPk": '',
            "projectPrice": '',
            "sortNum": 0,
            "typeCode": 'ROOM_PC',
            "typeMaster": this.typeMaster,
            "typePk": this.selectRoomType
          })
        }
      },
      list(){
        const self = this
        self.loading = true
        listProject({projectMaster: this.typeMaster}).then(result => {
          self.tableData = result.data
          console.log(self.tableData)
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      },
      listRoomType(){
        const self = this
        var typeList = JSON.parse(localStorage.getItem("pms_type"))
        self.options = []
        typeList.forEach(item=> {
          if(item.typeMaster == "ROOM_TYPE"){
            self.options.push(item);
          }
        })
        self.options.unshift({
          typePk: '',
          typeName: '所有房间'
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
  width: 80px;
}
.el-Name{
  width: 120px;
}

.bg-reserve {
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
</style>
