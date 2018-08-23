<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">班次管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addRows">添加班次</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        v-loading="loading"
        :data="tableData" 
        style="width: 98%; margin:10px;">
        <el-table-column type="sortNum" label="班次号" align="center" width="120">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.sortNum"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="shiftName" label="班次名称" align="center">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.shiftName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间(HH:mm:ss)" align="center">
          <template slot-scope="scope">
            <el-time-picker
             size="mini"
              :value="scope.row.beginTime"
              v-model="scope.row.beginTime"
              value-format="HH:mm:ss"
              :picker-options="{
                format:'HH:mm:ss'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间(HH:mm:ss)" align="center">
          <template slot-scope="scope">
            <el-time-picker
              size="mini"
              :value="scope.row.endTime"
              v-model="scope.row.endTime"
              value-format="HH:mm:ss"
              :picker-options="{
                format:'HH:mm:ss'
              }"
              placeholder="任意时间点">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.shiftPk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <el-button v-if="scope.row.shiftPk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {listShift,addShift,updateShift,delShift} from '@/api/utils/pmsShiftController'
  export default {
    data() {
      return {
        loading:false,
        options:[],
        tableData: [],
      }
    },
    mounted(){
      this.init();
    },
    methods: {
      init() {
        this.list()
      },
      saveClick(row) {
        console.log(row)
        const self = this
        if(row.shiftPk == ''){
          addShift(row).then(result => {
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
          updateShift(row).then(result => {
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
        console.log(row)
        const self = this
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delShift({shiftPk:row.shiftPk}).then(result => {
            console.log({shiftPk:row.shiftPk})
            console.log(result)
            if(result.code == 1){
              self.$message({
                message: '删除成功',
                type: 'success'
              })
            }
            self.list()
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
        if(this.tableData.length == 0 || this.tableData[0].shiftPk != ''){
          this.tableData.unshift({
            "beginTime": '',
            "endTime": '',
            "shiftName": '',
            "shiftPk": '',
            "sortNum": 0
          })
        }
      },
      list(){
        const self = this
        this.loading = true;
        listShift().then(result => {
          self.tableData = result.data;
          self.loading = false;

        }).catch(() => {
          self.loading = false
        })
      }
    }
  }
</script> 

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  width: 98%;
  margin: 10px auto;
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
