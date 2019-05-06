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
        </el-table-column>
        <el-table-column prop="typeName" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="typeDescribe" label="简称" align="center">
        </el-table-column>
        <el-table-column prop="roomCount" label="房间总数" align="center">
        </el-table-column>
        <el-table-column label="全价" prop="price" align="center">
        </el-table-column>
        <el-table-column label="起步价" prop="beginPrice" align="center">
        </el-table-column>
        <el-table-column label="单位时间加收价" prop="unitPrice" align="center">
        </el-table-column>
        <el-table-column label="加收封顶额" prop="cappingPrice" align="center">
        </el-table-column>
        <el-table-column label="预收房费" prop="roomPrice" align="center">
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="mini">编辑</el-button>
            <el-button @click="syncClick(scope.row)" type="text" size="mini">同步</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <SysTypeOfRoomEdit ref="sysTypeOfRoomEditRef" @callback="listRoomType" />
    <SysTypeOfRoomSync ref="sysTypeOfRoomSyncRef" @callback="listRoomType" />
  </div>
</template>

<script>
  import {roomTypeList,delType,updateype,addType} from '@/api/utils/pmsTypeController'
  import SysTypeOfRoomEdit from './SysTypeOfRoomEdit.vue'
  import SysTypeOfRoomSync from './SysTypeOfRoomSync.vue'

  export default {
    components: {SysTypeOfRoomEdit, SysTypeOfRoomSync},
    data() {
      return {
        typeMaster: 'ROOM_TYPE',
        tableData: [],
        loading:false,
      }
    },
    methods: {
      init() {
        this.listRoomType()
      },
      editClick(row) {
        this.$refs.sysTypeOfRoomEditRef.showDialog(row.typePk);
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
      addProtocolClick() {
        this.$refs.sysTypeOfRoomEditRef.showDialog();
      },
      listRoomType(){
        const self = this
        this.loading = true;
        roomTypeList({typeMaster: this.typeMaster}).then(result => {
          result.data.data.forEach(element => {
            if (element.pricePk == null) {
              element.basePrice = 0
              element.price = 0
              element.beginPrice = 0
              element.unitPrice = 0
              element.cappingPrice = 0
              element.roomPrice = 0
            }
          });
          self.tableData = result.data.data
          self.loading = false
        }).catch(() => {
          self.loading = false
        })
      },
      syncClick (row) {
        this.$refs.sysTypeOfRoomSyncRef.showDialog(row)
      },
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
