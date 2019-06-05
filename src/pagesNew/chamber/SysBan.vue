<template>
  <div class="content-body">
    <!-- table -->
    <el-row>
      <el-col :span="8" style="padding-right:10px;">
          <!-- input -->
        <div class="bg-reserve">
          <h5 class="info-title">楼栋管理</h5>
          <div class="info-li">
            <el-form size="mini" style="padding-left:20px;">
              <el-form-item>
                <el-button type="primary" size="mini" class="add-pro" @click="addRoowClick">添加楼栋</el-button>
              </el-form-item>
            </el-form>
            <el-table size="mini"
              border 
              @row-click.self="storeyRowClick"
              :data="tableData"
              height="400">
              <el-table-column prop="buildingName" label="楼栋名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.buildingName" size="mini" placeholder="请输入楼栋名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="sortNum" label="排序" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sortNum" size="mini" placeholder="请输入排序"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
                  <el-button v-if="scope.row.buildingPk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
                  <el-button v-if="scope.row.buildingPk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="bg-reserve book-info">
        <h5 class="info-title">房间</h5>
        <el-col :span="9">
          <el-form size="mini" style="padding-left:20px;text-align: center;border-bottom:1px solid #EBEEF5;padding-left:0;">
            <el-form-item>
              房间列表
            </el-form-item>
          </el-form>
          <el-tree
            v-loading="banLoading"
            :data="listBan"
            show-checkbox
            node-key="id"
            ref="listBan"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-col>
        <el-col :span="6" class="sysbage">
          <div class="buttomst"><el-button :disabled="banLoading" type="primary" @click="allRigthData" size="mini">&gt;&gt;</el-button></div>
          <div class="buttomst"><el-button :disabled="banLoading" type="primary" @click="rigthData" size="mini">&gt;</el-button></div>
          <div class="buttomst"><el-button :disabled="banLoading" type="primary" @click="leftData" size="mini">&lt;</el-button></div>
          <div class="buttomst"><el-button :disabled="banLoading" type="primary" @click="allLeftData" size="mini">&lt;&lt;</el-button></div>
        </el-col>
        <el-col :span="9">
          <el-form size="mini" style="padding-left:20px;text-align: center;border-bottom:1px solid #EBEEF5;padding-left:0;">
            <el-form-item>
              未设置楼栋的房间
            </el-form-item>
          </el-form>
          <el-tree
            v-loading="banLoading"
            :data="listUnassignedBan"
            show-checkbox
            node-key="id"
            ref="listUnassignedBan"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {listBuilding,addBuilding,updateBuilding,delBuilding,listBuildingRoom,updateBuildingRoom} from '@/api/systemSet/roomSetting/buildingController'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      selectBan:{},
      listUnassignedBan: [],
      listBan: [],
      loading:false,
      banLoading:false,
      ban:{
        buildingPk:'',
        roomPks:[]
      },
      defaultProps: {
        children: 'child',
        label: 'name'
      }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.listBuilding()
    },
    listBuilding(){
      const self = this
      listBuilding().then(result => {
        self.tableData = result.data
      }).catch(() => {
        self.loading = false
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    deleteClick(rows) {
      const self = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(rows)
        delBuilding({buildingPk:rows.buildingPk}).then(result => {
          self.storeyName = '';
          self.$message({
            message: '删除成功',
            type: 'success'
          })
          self.listBuilding();
        });
      })
    },
    saveClick(row){
      const self = this
      if(row.buildingPk == ''){
        addBuilding(row).then(result => {
          if(result.code == 1){
            self.$message({
              message: '添加成功',
              type: 'success'
            });
          }
          self.listBuilding();
        })
      }else{
        delete row.createTime;
        delete row.updateTime;
        updateBuilding(row).then(result => {
          if(result.code == 1){
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          }
          self.listBuilding();
        })
      }
    },
    addRoowClick() {
      if(this.tableData.length == 0 || this.tableData[0].typePk != ''){
        this.tableData.unshift({
          buildingPk:'',
          buildingName: '',
          sortNum: ''
        })
      }
    },
    listBuildingRoom(){
      const self = this
      self.banLoading = true
      listBuildingRoom({buildingPk:this.selectBan.buildingPk}).then(result => {
        if(result.code == 1){
          console.log(result.data)
          self.listUnassignedBan = result.data.noBuildResult
          self.listBan = result.data.buildResult
        }
        self.banLoading = false
      })
    },
    storeyRowClick(row, event, column){
      this.selectBan = row
      this.banLoading = true
      this.listBuildingRoom()
    },
    updateBuildingRoom(){
      if(this.ban.roomPks.length == 0 ){
        this.$message({
          message: '请选择要移动的房间',
          type: 'warning'
        });
        return
      }
      const self = this
      self.banLoading = true
      updateBuildingRoom(this.ban).then(result => {
        if(result.code == 1){
          self.$message({
            message: '操作成功',
            type: 'success'
          });
          self.banLoading = false
        }
        self.listBuildingRoom();
      })
    },
    allLeftData(){
      console.log();
      this.ban.buildingPk = this.selectBan.buildingPk
      this.ban.roomPks = []
      for (let index = 0; index < this.listUnassignedBan.length; index++) {
        const element = this.listUnassignedBan[index];
        for (let k = 0; k < element.child.length; k++) {
          const childObj = element.child[k];
          this.ban.roomPks.push(childObj.id)
        }
      }
      this.updateBuildingRoom()
      console.log("全部左移")
    },
    leftData(){
      this.ban.buildingPk = this.selectBan.buildingPk
      this.ban.roomPks = []
      let arr = this.$refs.listUnassignedBan.getCheckedNodes()
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.type == 'ROOM'){
          this.ban.roomPks.push(element.id)
        }
      }
      this.updateBuildingRoom()
      console.log("左移")
    },
    allRigthData(){
      this.ban.buildingPk = ''
      this.ban.roomPks = []
      for (let index = 0; index < this.listBan.length; index++) {
        const element = this.listBan[index];
        for (let k = 0; k < element.child.length; k++) {
          const childObj = element.child[k];
          this.ban.roomPks.push(childObj.id)
        }
      } 
      this.updateBuildingRoom()
      console.log("全部右移");
    },
    rigthData(){
      console.log("右移");
      this.ban.buildingPk = ''
      this.ban.roomPks = []
      let arr = this.$refs.listBan.getCheckedNodes()
      console.log(arr)
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.type == 'ROOM'){
          this.ban.roomPks.push(element.id)
        }
      }
      this.updateBuildingRoom()
    },
  }
};
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.bg-reserve {
  position: relative;
  background: #fff;
  margin-top: 10px;
  border: 1px solid #ccc;
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
.buttomst{
  text-align: center;
  margin-bottom: 20px;
}
.buttomst button{
  width: 80px;
}
.book-info{
  height: 468px;
  margin-left: 5%;
}
.book-info .el-col{
  padding-top: 18px; 
}
.book-info .sysbage{
  height: 100%;
  background: #f7f7f7;
  padding-top: 100px;
}
.el-select {
  width: 178px;
}
.info-li {
  margin-bottom: 0 !important;
  padding-top: 18px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
.el-tree {
  height: 401px;
  overflow: auto;
}
</style>
