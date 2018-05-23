<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">租赁物品管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">添加租赁物品</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="itemsCode" label="编码" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.itemsPk != ''">{{scope.row.itemsCode}}</span>
            <el-input v-if="scope.row.itemsPk == ''" v-model="scope.row.itemsCode" size="mini" placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="itemsName" label="名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemsName" class="el-Name" size="mini" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="itemsPrice" label="租赁价格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemsPrice" class="el-Name" size="mini" placeholder="请输入租赁价格"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="itemsCompensate" label="赔偿价格" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemsCompensate" class="el-Name" size="mini" placeholder="请输入赔偿价格"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sortNum" class="el-Name" size="mini" placeholder="请输入排序"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.itemsPk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <el-button v-if="scope.row.itemsPk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {listRentalItems,addRentalItems,updateRentalItems,delRentalItems} from '@/api/systemSet/roomSetting/pmsRentalItemsController'
  export default {
    data() {
      return {
        rowObj:{
          "itemsCode": '',
          "itemsCompensate": '',
          "itemsName": '',
          "itemsPk": '',
          "itemsPrice": '',
          "sortNum": 0
        },
        tableData: [],
        loading:false
      }
    },
    methods: {
      init() {
        this.list()
      },
      saveClick(row) {
        console.log(row)
        const self = this
        if(row.itemsPk == ''){
          addRentalItems(row).then(result => {
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
          updateRentalItems(row).then(result => {
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
          delRentalItems({itemsPk:row.itemsPk}).then(result => {
            if(result.code == 1){
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
        if(this.tableData.length == 0 || this.tableData[0].itemsPk != ''){
          this.tableData.unshift(this.rowObj)
        }
      },
      list(){
        const self = this
        this.loading = true;
        listRentalItems().then(result => {
          self.tableData = result.data
          self.loading = false;
        }).catch(() => {
          self.loading = false
        })
      }
    }
  }
</script> 

<style scoped>
.el-input{
  width: 80px;
}
.el-Name{
  width: 120px;
}
.el-select{
  width: 70px;
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
