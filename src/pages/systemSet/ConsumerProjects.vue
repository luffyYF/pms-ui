<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">消费项目设置</h5>
      <el-row><el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">添加消费项目</el-button></el-row>
      <div class="bg-purple-dark">
        <p>* 注意： </p>
        <p>1、请不要随意删除消费项目，以免影响统计。</p>
        <p>2、价格为0的入账时系统默认为手动输入费用金额。</p>
      </div>
      <el-row style="padding:10px;">
        <el-form size="mini">
          <el-form-item label="消费类别: ">
            <el-select v-model="selectType" size="mini" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData | globalFilter(selectType)" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column type="code" label="代码" align="center" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.code"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" align="center">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.projectName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="typeCodeName" label="类别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectPk != ''">{{scope.row.typeCodeName}}</span>
            <el-select v-if="scope.row.projectPk == ''" v-model="scope.row.typeCode" size="mini" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="projectPrice" label="本店价" align="center">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.projectPrice"></el-input>
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
import {listProject,delProject,updateProject,addProject} from '@/api/systemSet/pmsProjectController'
  export default {
    data() {
      return {
        tableData: [],
        typeMaster: 'CONSUMER',
        loading:false,
        options1: [{
          value: 'CJ',
          label: '餐券'
        }, {
          value: 'PC',
          label: '赔偿'
        }, {
          value: 'FF',
          label: '房费'
        }, {
          value: 'SYS',
          label: '系统'
        }, {
          value: 'WFP',
          label: '消费品'
        }],
        options: [{
          value: '',
          label: '所有消费类别'
        }, {
          value: 'CJ',
          label: '餐券'
        }, {
          value: 'PC',
          label: '赔偿'
        }, {
          value: 'FF',
          label: '房费'
        }, {
          value: 'SYS',
          label: '系统'
        }, {
          value: 'WFP',
          label: '消费品'
        }],
        selectType: ''
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init() {
        this.list()
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
          console.log(row)
          console.log(this.selectType)
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
      addProtocolClick() {
        if(this.tableData.length == 0 || this.tableData[0].projectPk != ''){
          this.tableData.unshift({
            "code": '',
            "projectName": '',
            "projectPk": '',
            "projectPrice": 0,
            "sortNum": 0,
            "typeCode": 'CJ',
            "typePk": this.selectType
          })
        }
      },
      list(){
        const self = this
        self.loading = true
        listProject({projectMaster: this.typeMaster}).then(result => {
          self.tableData = result.data
          self.loading = false
          console.log(self.tableData)
        }).catch(() => {
          self.loading = false
        })
      },
    }
  }
</script> 

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding-top: 18px;
  width: 98%;
  margin: 10px auto;
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
.bg-purple-dark {
  /* background-color: #fdf7f7;
  border-color: #eed3d7; */
  padding: 10px;
  color:red;
}
.bg-purple-dark p{
  margin:5px;
}
</style>
