<template>
<div class="content-body">
  <el-button @click="selectList" type="primary" size="mini" icon="el-icon-refresh" >刷新</el-button>
  <el-button @click="batchSave()" size="mini" type="primary">保存</el-button>
   <el-table
    :data="tableData"
    border
    v-loading="loading"
    style="width:100%;margin-top:10px;">
    <el-table-column
      label="名称" 
      prop="projectName"
      align="center">
      <template slot-scope="scope">
        <p class="table-item-name">{{scope.row.projectName}}</p>
      </template>
    </el-table-column>
    <!-- <el-table-column
      label="快捷键" 
      prop="code"
      align="center">
      <template slot-scope="scope">
         <el-input v-model="scope.row.code" size="mini" clearable></el-input>
      </template>
    </el-table-column> -->
      
    <el-table-column
      label="排序" 
      prop="sortNum"
      align="center">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.sortNum" size="mini" :min="0" :step="1"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="客房显示" 
      prop="guestShow"
      align="center">
      <template slot-scope="scope">
        <el-checkbox true-label="Y" false-label="N" v-model="scope.row.guestRoomFlag" @change="limitCheckCount(scope.$index,$event)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      label="哑房显示" 
      prop="dumbShow"
      align="center">
      <template slot-scope="scope">
        <el-checkbox true-label="Y" false-label="N" v-model="scope.row.dumbRoomFlag" @change="limitCheckCount(scope.$index,$event)"></el-checkbox>
      </template>
    </el-table-column>
     <el-table-column
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="save(scope.row)" size="mini" type="text">保存</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="project-bottom">
    <el-button @click="batchSave()" size="mini" type="primary">保存</el-button>
  </div>

</div>
</template>

<script>
import { listConsumerOrSettlement, updateConsumerOrSettlement,batchUpdateConsOrSettl } from '@/api/systemSet/pmsProjectController'
export default {
  data() {
    return {
      //name：名称   quickKey：快捷键  sort：排序  guestShow：客房显示    dumbShow：哑房显示
      tableData: [],
      loading:false,
      value:true
    };
  },
  created(){
     this.selectList();
  },
  methods:{
    init(){
      this.selectList();
    },
    selectList() {
      this.loading = true;
      listConsumerOrSettlement({projectType:'CONSUMER'}).then(res => {
        this.tableData = res.data;
        // for(var i = 0; i< this.tableData.length; i++) {
        //   this.tableData[i].dumbShow = true;
        //   this.tableData[i].guestShow = true;
        //   this.tableData[i].dumbRoomFlag == 'Y'? this.tableData[i].dumbShow = true:this.tableData[i].dumbShow = false;
        //   this.tableData[i].guestRoomFlag == 'Y'? this.tableData[i].guestShow = true:this.tableData[i].guestShow = false;
        // }
      }).finally(()=>{
        this.loading = false;
      })
    },
    save(row){
      // row.guestShow?row.guestRoomFlag = 'Y':row.guestRoomFlag = 'N';
      // row.dumbShow?row.dumbRoomFlag = 'Y':row.dumbRoomFlag = 'N';
      // console.log(row)
      // if(!this.limitCheckCount()){
      //   return
      // }
      updateConsumerOrSettlement(row).then(res => {
        this.$message.success('保存成功')
        this.selectList();
      })
    },
    // changeStatus(index,row){
    //   this.$set(this.tableData,index,row)
    // },
    batchSave() {
      // if(!this.limitCheckCount()){
      //   return
      // }
      batchUpdateConsOrSettl(this.tableData).then(res=>{
        this.$message.success('保存成功');
        this.selectList();
      })
    },
    //限制勾选个数
    limitCheckCount(index, val){
      let guestRoomCount = 0
      let dumbRoomCount = 0
      this.tableData.forEach(item=>{
        if(item.guestRoomFlag=='Y'){
          guestRoomCount++
        }
        if(item.dumbRoomFlag=='Y') {
          dumbRoomCount++
        }
      })
      if(guestRoomCount>15) {
        this.$message.warning('你选择的客房显示数量已达到15个，请重新选择要显示的项目')
        this.tableData[index].guestRoomFlag = 'N'
        return false
      }
      if(dumbRoomCount>15) {
        this.$message.warning('你选择的哑房显示数量已达到15个，请重新选择要显示的项目')
        this.tableData[index].dumbRoomFlag = 'N'
        return false
      }
      return true
    },

  },
 
};
</script>

<style scoped>
.project-bottom{
  margin-top: 20px;
  text-align: center;
}
.content-body{
  background-color: #f7f7f7;
  padding: 10px 20px 20px 20px;
  height: 100%;
}
  .table-item-name { text-align: left;}
  .el-input__inner {
    text-align: center;
  }
</style>
