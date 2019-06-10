<template>
  <div class="content-body" v-loading="loading">
    <el-row>
      <el-col :span="8" style="padding-right:10px;">
        <div class="bg-reserve">
          <h5 class="info-title">楼栋</h5>
          <div class="info-li">
            <el-table size="mini"
              border 
              @row-click.self="buildRowClick"
              :data="tableData"
              height="400">
                 <el-table-column prop="buildingName" label="名称" align="center">
                     <template slot-scope="scope">
                         <span>{{scope.row.buildingName}}</span>
                     </template>
                 </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="openAddBuildDialog" type="text" size="mini">添加</el-button>
                  <el-button @click="openUpdateBuildDialog(scope.row.buildingPk)" type="text" size="mini">修改</el-button>
                  <el-button v-if="scope.row.buildingPk == ''" @click="deleteRow(scope.$index, tableData)" type="text" size="mini">取消</el-button>
                  <el-button v-if="scope.row.buildingPk != ''" @click="deleteClick(scope.row)" type="text" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="16" style="padding-right:10px;">
        <div class="bg-reserve">
        <h5 class="info-title">楼层</h5>
        <div class="info-li">
        <el-table size="mini" 
          border 
          :data="storeyData"
          height="400">
          <el-table-column prop="storeyName" label="名称" align="center">
          </el-table-column>
            <el-table-column prop="sortNum" label="排序" align="center">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="openAddStorey" type="text" size="mini">添加</el-button>
              <el-button @click="delStorey(scope.row)" type="text" size="mini">删除</el-button>
              <el-button @click="openUpdateStorey(scope.row.storeyPk)" type="text" size="mini">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        </div>
      </el-col>
    </el-row>
    <!-- 添加楼栋 -->
    <el-dialog title="添加楼栋" :visible.sync="addBuildDialog" width="400px">
      <el-form :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼栋：">
          <el-input-number v-model="buildingName" placeholder="请输入楼栋号" class="block_input" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBuildDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveClick" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 修改楼栋 -->
    <el-dialog title="修改楼栋" :visible.sync="updateBuildDialog" width="400px">
      <el-form :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼栋：">
          <el-input-number v-model="buildingName" placeholder="请输入楼栋号" class="block_input" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBuildDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateClick" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 添加楼层并选择楼栋 -->
    <el-dialog title="添加楼层" :visible.sync="addStoreyDialog" width="820px">
      <el-form :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼栋：" required>
          <el-select v-model="buildingPk" prop="buildingPk" placeholder="请选择楼栋">
            <el-option 
              v-for="item in tableData"
              :key="item.buildingPk"
              :label="item.buildingName"
              :value="item.buildingPk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层号：" required>
          <el-input-number v-model="storeyName" placeholder="请输入楼层号" class="block_input" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStoreyDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addStorey()" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 修改楼层并选择楼栋 -->
    <el-dialog title="修改楼层" :visible.sync="updateStoreyDialog" width="820px">
      <el-form :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼栋：" required>
          <el-select v-model="buildingPk" prop="buildingPk" placeholder="请选择楼栋">
            <el-option 
              v-for="item in tableData"
              :key="item.buildingPk"
              :label="item.buildingName"
              :value="item.buildingPk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层号：" required>
          <el-input-number v-model="storeyName" placeholder="请输入楼层号" class="block_input" :controls="false"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateStoreyDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateStorey()" size="mini" :loading="commitLoading">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {listBuilding,addBuilding,updateBuilding,delBuilding,selectBuilding} from '@/api/systemSet/roomSetting/buildingController'
import {addStorey, listStorey, delStorey,updateStorey,selectStorey} from '@/api/systemSet/roomSetting/floorRoom'
export default {
  components: {},
  data() {
    return {
      commitLoading:false,
      addBuildDialog:false,
      updateBuildDialog:false,
      addStoreyDialog:false,
      updateStoreyDialog:false,
      formLabelWidth: '120px',
      buildingName:'',
      storeyName: undefined,
      storeyData: [],
      roomData: [],
      tableData: [],
     // buildingData:[],
      selectBan:{},
      loading:false,
      banLoading:false,
      buildingPk:'',
      storeyPk:'',
    };
  },
 created(){
     this.listBuilding(),
     this.listStorey()
  },
  methods: {
     listBuilding(){
      const self = this
      listBuilding().then(result => {
        self.tableData = result.data
      }).catch(() => {
        self.loading = false
      })
    },
     openAddBuildDialog(){
        this.addBuildDialog = true
      },
     openUpdateBuildDialog(buildingPk){
        const self = this
        selectBuilding({buildingPk:buildingPk}).then(result => {
          self.buildingName = result.data.buildingName
          self.buildingPk=result.data.buildingPk
        }).catch(() => {
            self.loading = false
        })
        this.updateBuildDialog=true
      },
      openAddStorey(){
          this.addStoreyDialog=true
      },
      openUpdateStorey(storeyPk){
          console.log("楼层主键："+storeyPk);
          const self = this
        selectStorey({storeyPk:storeyPk}).then(result => {
          self.storeyName = result.data.storeyName
          self.storeyPk=result.data.storeyPk,
          self.buildingPk=result.data.buildingPk
        }).catch(() => {
            self.loading = false
        })
          this.updateStoreyDialog=true
      },
     saveClick() {
      this.commitLoading = true;
      const self = this
      addBuilding({buildingName:self.buildingName}).then(result => {
        if(result.code == 1){
          self.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.listBuilding()
        self.addBuildDialog = false,
        self.buildingName=""
      }).finally(()=>{
        this.commitLoading = false;
      })
    },
    //修改楼栋
      updateClick() {
      this.commitLoading = true;
      const self = this
      updateBuilding({buildingName:self.buildingName,buildingPk:self.buildingPk}).then(result => {
        if(result.code == 1){
          self.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.listBuilding()
        self.updateBuildDialog = false,
        self.buildingName=""
      }).finally(()=>{
        this.commitLoading = false;
      })
    },
    //修改楼层
    updateStorey(){
      this.commitLoading = true;
      const self = this
      updateStorey({storeyName:self.storeyName,storeyPk:self.storeyPk}).then(result => {
        if(result.code == 1){
          self.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.listStorey()
        self.updateStoreyDialog = false,
        self.storeyName=""
      }).finally(()=>{
        this.commitLoading = false;
      }) 
    },
    buildRowClick(row, event, column){
        this.selectBan = row
        this.banLoading = true
        },
     deleteClick(rows) {
      const self = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    propChange(val,key){
      if(!val){
        this.propList[i].value = null
      }
    },
      numSort: function (a,b) {
      return a.count-b.count;
    },
      listStorey(){
      const self = this
      self.loading = true
      listStorey().then(result => {
        self.storeyData = result.data
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    },
     addStorey(){
      this.commitLoading = true;
      if(!this.storeyName){
        this.$message.warning("楼层号不能为空")
        return;
      }
      let data = {storeyName: this.storeyName,buildingPk:this.buildingPk}
      const self = this
      addStorey(data).then(result=>{
        if(result.code==1){
          self.$message({message:'添加成功！',type:'success'});
          self.addStoreyDialog=false;
          self.listStorey();
          this.storeyName=""
        }else{
          self.$message.sub_msg;
          self.addStoreyDialog=true;
          this.storeyName=""
        }
      }).finally(()=>{
         this.commitLoading = false;
      })
    },
     delStorey(obj){
      const self = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStorey({storeyPk: obj.storeyPk}).then(result => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          self.listStorey()
        })
      });
    },
   deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    },  
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
.book-info{
  height: 520px;
  padding-top: 18px;
}
.book-info .el-col{
  padding-top: 18px; 
}
.el-select {
  width: 178px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 178px;
}
.info-li {
  margin-bottom: 0 !important;
  padding-top: 18px;
}
.text-cs{
  width: 178px;
  display: block;
}
.red{
  color:red;
}
.roomsList{
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 1px solid #EBEEF5;
}
</style>
<style>
.init_floor .el-input-number .el-input__inner {
  text-align: left;
}
.text_position .el-input__inner{
  text-align: left;
}
</style>
