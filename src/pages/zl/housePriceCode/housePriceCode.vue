<template>
  <div>
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
        </el-table-column>
        <el-table-column prop="typeDescribe" label="简称" align="center">
        </el-table-column>
		<el-table-column prop="basePrice" label="基础价" align="center">
        </el-table-column>
		<el-table-column prop="housePriceCode" label="房价代码" align="center">
            <template slot-scope="scope">
           <el-input v-model="scope.row.housePriceCode" style="width:100%;" size="mini" placeholder="请输入房价代码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="roomCount" label="房间总数" align="center">
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
            <el-button v-if="scope.row.typePk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
            <!-- <el-button v-if="scope.row.typePk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import {listType,updateTypeHousePriceCode,addType} from '@/api/utils/pmsTypeController'
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
    mounted () {
      this.init()
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
          updateTypeHousePriceCode(row).then(result => {
            if(result.code == 1){
              self.$message({
                message: '修改成功',
                type: 'success'
              });
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
