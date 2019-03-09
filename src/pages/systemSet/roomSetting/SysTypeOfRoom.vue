<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">房间类型管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">添加房型</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="typeCode" label="代码" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.typePk == ''" v-model="scope.row.typeCode" size="mini" placeholder="请输入代码"></el-input>
            {{scope.row.typePk != ''?scope.row.typeCode:''}}
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.typeName" class="el-Name" size="mini" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="typeDescribe" label="简称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.typeDescribe" class="el-Name" size="mini" placeholder="请输入简称"></el-input>
          </template>
        </el-table-column>
		<el-table-column prop="basePrice" label="基础价" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.basePrice" class="el-Name" size="mini" placeholder="请输入基础价"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="roomCount" label="房间总数" align="center">
        </el-table-column>
        <el-table-column prop="usingFlag" label="超时退房小时计费" align="center" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.usingFlag" size="mini" placeholder="请选择状态">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-if="scope.row.usingFlag == 'Y'" v-model="scope.row.overtimeBilling" size="mini" placeholder="请输入计费"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center">
          <template slot-scope="scope">
           <el-input v-model="scope.row.sortNum" size="mini" placeholder="请输入排序"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="excessNumber" label="超额数" align="center" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.excessNumber" size="mini" placeholder="请输入超额数"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="integralFlag" label="参加积分" align="center">
          <template slot-scope="scope">
           <el-checkbox size="mini" v-model="scope.row.integralFlag" true-label="Y"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="monthlyRent" label="月房租" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.monthlyRent" class="el-Name" size="mini" placeholder="请输入月房租"></el-input>
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
        submitLock:false,
        checked:'',
        typeMaster: 'ROOM_TYPE',
        value2: new Date(),
        tableData: [],
        loading:false,
        options1: [{
          value: 'Y',
          label: '启动'
        }, {
          value: 'N',
          label: '关闭'
        }]
      }
    },
    methods: {
      init() {
        this.submitLock = false
        this.listRoomType()
      },
      saveClick(row) {
        const self = this
        if(row.typePk == ''){

          if(this.submitLock){
            return;
          }else{
            this.submitLock = true
          }
          addType(row).then(result => {
            if(result.code == 1){
              self.storeyName = '';
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            self.listRoomType();
            this.refreshType();
            this.submitLock = false
          }).catch(()=>{
            this.submitLock = false
          })
        }else{
          delete row.createTime;
          delete row.updateTime;
          
          if(this.submitLock){
            return;
          }else{
            this.submitLock = true
          }
          updateype(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
              this.refreshType();
            }
            self.listRoomType();
            this.submitLock = false
          }).catch(()=>{
            this.submitLock = false
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
            self.listRoomType();
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
      listRoomType(){
        const self = this
        this.loading = true;
        listType({typeMaster: this.typeMaster}).then(result => {
          self.tableData = result.data.data
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
        // var typeList = JSON.parse(localStorage.getItem("pms_type"))
        // self.tableData = []
        // typeList.forEach(item=> {
        //   if(item.typeMaster == self.typeMaster){
        //     self.tableData.push(item);
        //   }
        // })
        // self.loading = false
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
  width: 80px;
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
