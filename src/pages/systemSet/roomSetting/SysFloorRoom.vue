<template>
  <div class="content-body" v-loading="loading">
    <!-- table -->
    <el-row>
      <el-col :span="5">
        <div class="bg-reserve book-info">
        <h5 class="info-title">楼层</h5>
        <el-form label-width="80px" size="mini"  label-position="top" style="padding-left:10px">
          <el-form-item label="楼层名">
            <el-input v-model="storeyName" class="block_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addStorey" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
        <el-table size="mini" 
          border 
          :data="storeyData"
          @row-click.self="storeyRowClick"
          height="388">
          <el-table-column prop="storeyName" label="楼层" align="center">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="delStorey(scope.row)" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-col>
      <el-col :span="18" :offset="1">
        <div class="bg-reserve book-info">
          <h5 class="info-title">【{{selectStorey.storeyName}}】房间属性</h5>
          <el-form label-width="20px" :inline="true" size="mini">
            <el-form-item label=" ">
              <el-button @click="openAddRoomDialog" type="primary">添加房间</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="batchAddRoomDialog = true" type="primary">批量生成房间</el-button>
            </el-form-item>
          </el-form>
          <el-table size="mini" 
            border 
            :data="roomData"
            height="473">
            <el-table-column prop="roomNumber" label="房号" align="center">
            </el-table-column>
            <el-table-column prop="roomTypePk" label="房型" align="center">
              <template slot-scope="scope">
                <!-- <el-select v-model="scope.row.roomTypePk" disabled size="mini" class="colic" placeholder="请选择状态">
                  <el-option 
                    v-for="item in listTypeData"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk"></el-option>
                </el-select> -->
                <span>{{listTypeDataView[scope.row.roomTypePk].typeName}}</span>
                <el-input v-if="scope.row.usingFlag == 'Y'" v-model="scope.row.overtimeBilling" size="mini" placeholder="请输入计费"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="intelligentFlag" label="艾美信智能锁" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.intelligentFlag=='Y'">已安装</span>
                <span v-else="scope.row.intelligentFlag=='N'">未安装</span>
              </template>
            </el-table-column>
            <el-table-column prop="intelligentBanNo" label="艾美信 楼栋编号" align="center">
            </el-table-column>
            <el-table-column prop="intelligentFloorNo" label="艾美信 楼层编号" align="center">
            </el-table-column>
            <el-table-column prop="intelligentRoomNo" label="艾美信 房间编号" align="center">
            </el-table-column>
            <el-table-column prop="rflLockNo" label="RFL 锁号" align="center">
            </el-table-column>
            <!-- <el-table-column prop="telPhone" label="电话分机" align="center">
            </el-table-column>
            <el-table-column prop="telPhoneLine" label="电话外线" align="center">
            </el-table-column> -->
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="updateClick(scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="delRoom(scope.row)" type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <!-- 添加房间 -->
    <el-dialog title="添加房间" :visible.sync="addRoomDialog" width="820px">
      <el-form :model="addFrom" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：">
          <span class="text-cs">{{selectStorey.storeyName}}</span>
        </el-form-item>
        <el-form-item label="房号：" required>
          <el-input v-model="addFrom.roomNumber" placeholder="请输入房号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间类型：" required>
          <el-select v-model="addFrom.roomTypePk" placeholder="请选择房间类型">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="房间朝向：">
          <el-input v-model="addFrom.roomOrientation" placeholder="请输入房间朝向" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话分机：">
          <el-input v-model="addFrom.telPhone" placeholder="请输入电话分机" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话外线：">
          <el-input v-model="addFrom.telPhoneLine" placeholder="请输入电话外线" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="房间锁号：">
          <el-input v-model="addFrom.roomLockNumber" auto-complete="off" placeholder="请输入房间锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：房间锁号 请根据门锁软件中的对应房号进行配置</span>
        </el-form-item> -->
        <el-form-item label="概况：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入概况"
            v-model="addFrom.roomSurvey"
            style="width:300px;">
          </el-input>
        </el-form-item>
        <el-form-item style="display:block;margin-left:32px;">
            <el-checkbox label="艾美信" v-model="addFrom.intelligentFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="楼栋编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentBanNo" placeholder="请输入楼栋编号：" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentFloorNo" placeholder="请输入楼层编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间编号：" v-if="addFrom.intelligentFlag=='Y'" required>
          <el-input v-model="addFrom.intelligentRoomNo" placeholder="请输入房间编号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="RFL门卡" v-model="addFrom.rflFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="RFL锁号：" v-if="addFrom.rflFlag=='Y'">
          <el-input v-model="addFrom.rflLockNo"  auto-complete="off" placeholder="请输入RFL锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：8位数字</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRoom" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改房间 -->
    <el-dialog title="修改房间" :visible.sync="updateRoomDialog" width="820px">
      <el-form :model="selectRoom" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：">
          <span class="text-cs">{{selectStorey.storeyName}}</span>
        </el-form-item>
        <el-form-item label="房号：">
          <span class="text-cs">{{selectRoom.roomNumber}}</span>
        </el-form-item>
        <el-form-item label="房间类型：">
          <el-select v-model="selectRoom.roomTypePk" placeholder="请选择房间类型">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间朝向：">
          <el-input v-model="selectRoom.roomOrientation" placeholder="请输入房间朝向" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话分机：">
          <el-input v-model="selectRoom.telPhone" placeholder="请输入电话分机" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话外线：">
          <el-input v-model="selectRoom.telPhoneLine" placeholder="请输入电话外线" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="房间锁号：">
          <el-input v-model="selectRoom.roomLockNumber" auto-complete="off" placeholder="请选择房间锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：房间锁号 请根据门锁软件中的对应房号进行配置</span>
        </el-form-item> -->
        <el-form-item label="概况：">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入概况"
            v-model="selectRoom.roomSurvey"
            style="width:300px;">
          </el-input>
        </el-form-item>
        <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="艾美信" v-model="selectRoom.intelligentFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="楼栋编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentBanNo" placeholder="请输入楼栋编号：" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼层编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentFloorNo" placeholder="请输入楼层编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间编号：" v-if="selectRoom.intelligentFlag=='Y'" required>
          <el-input v-model="selectRoom.intelligentRoomNo" placeholder="请输入房间编号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item style="display:block;margin-left:32px;">
          <el-checkbox label="RFL门卡" v-model="selectRoom.rflFlag" true-label="Y" false-label="N" border></el-checkbox>
        </el-form-item>
        <el-form-item label="RFL锁号：" v-if="selectRoom.rflFlag=='Y'">
          <el-input v-model="selectRoom.rflLockNo"  auto-complete="off" placeholder="请输入RFL锁号" style="width:300px;"></el-input>
          <span style="color:red">*注：8位数字</span>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateRoom" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量添加房间 -->
    <el-dialog title="批量添加房间" :visible.sync="batchAddRoomDialog" width="820px">
      <el-form :model="previewData" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" size="mini">
        <el-form-item label="楼层：" required>
          <el-select v-model="previewData.storeyPk" prop="storeyPk" placeholder="请选择房间类型" @change="enters">
            <el-option 
              v-for="item in storeyData"
              :key="item.storeyPk"
              :label="item.storeyName"
              :value="item.storeyPk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型：" required>
          <el-select v-model="previewData.roomTypePk" prop="roomTypePk" placeholder="请选择房间类型" @change="enters">
            <el-option 
              v-for="item in listTypeData"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号前缀：">
          <el-input v-model="previewData.prefix" prop="prefix" @keyup.enter.native="enters" @blur="enters" placeholder="请输入房号前缀"></el-input>
        </el-form-item>
        <el-form-item label="房间数量：" required>
          <el-input class="text-cs" v-model="previewData.roomNum" prop="roomNum" @keyup.enter.native="enters" @blur="enters" placeholder="请输入房间数量"></el-input>
          <span class="red">单次添加房间数量不能大于20</span>
        </el-form-item>
        <el-form-item label="过滤尾数：">
          <el-checkbox v-model="previewData.checked4" @change="enters">4</el-checkbox>
          <el-checkbox v-model="previewData.checked7" @change="enters">7</el-checkbox>
        </el-form-item>
        <el-form-item style="padding:0 20px;">
          说明：房间批量生成的房号由房间数量和房号前缀生成，如输入房间数量：“12”，房号前缀“A”，那么生成的房号为：A01、A02……A11、A812，如果前缀为空则生成的房间号为：楼层+01。 
        </el-form-item>
        <h4>房间预览</h4>
        <div class="roomsList">
          <el-form-item v-for="(itemP, index) in previewRoomes" :label="itemP.roomNumber" :key="itemP.roomNumber"  label-width="60px" style="padding:10px;margin-bottom: 0px;">
            <el-select v-model="itemP.roomTypePk" style="width:130px;" placeholder="请选择房间类型">
              <el-option 
                v-for="item in listTypeData"
                :key="item.typePk"
                :label="item.typeName"
                :value="item.typePk"></el-option>
            </el-select>
            <el-button type="danger" icon="el-icon-delete" @click="deleteRow(index,previewRoomes)"></el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchAddRoomDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRooms()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addStorey, listStorey, delStorey, listRoom, addRoom, addRooms, updateRoom, delRoom, previewRooms} from '@/api/systemSet/roomSetting/floorRoom'
import {listType} from '@/api/utils/pmsTypeController'
export default {
  components: {  },
  data() {
    return {
      formLabelWidth: '120px',
      addRoomDialog: false,
      updateRoomDialog: false,
      batchAddRoomDialog: false,
      loading:false,
      storeyName: '',
      storeyData: [],
      selectStorey:{storeyName:'未选择'},
      selectRoom: {},
      roomData: [],
      previewData:{},
      previewRoomes:[],
      listTypeData: [],
      listTypeDataView: {},
      rules: {
        storeyPk: [{ required: true, message: ''}],
        roomTypePk: [{ required: true, message: ''}],
        roomNum:[{ type: 'number', message: '必须为数字值'}]
      },
      addFroms:{
        "doorLockKey": "",
        "remark": "",
        "roomCharacteristic": "",
        "roomImg": "",
        // "roomLockNumber": "",
        "roomName": "",
        "roomNumber": "",
        "roomOrientation": "",
        "roomPk": "",
        "roomSurvey": "",
        "roomTypePk": "",
        "storeyName": "",
        "storeyPk": "",
        "telPhone": "",
        "telPhoneLine": "",
      },
      addFrom: {
        "doorLockKey": "",
        "remark": "",
        "roomCharacteristic": "",
        "roomImg": "",
        // "roomLockNumber": "",
        "roomName": "",
        "roomNumber": "",
        "roomOrientation": "",
        "roomPk": "",
        "roomSurvey": "",
        "roomTypePk": "",
        "storeyName": "",
        "storeyPk": "",
        "telPhone": "",
        "telPhoneLine": "",
        "intelligentFlag": "N",
        "rflFlag": "N",
        "intelligentBanNo":null,
        "intelligentFloorNo":null,
        "intelligentRoomNo":null,
        "rflLockNo":null
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.listStorey()
      this.listType()
    },
    numSort: function (a,b) {
      return a.count-b.count;
    },
    listType(){
      const self = this
      self.listTypeDataView = {}
      listType({typeMaster: 'ROOM_TYPE'}).then(result => {
        self.listTypeData = result.data.data
        self.listTypeData.forEach((value,key)=>{
          self.listTypeDataView[value.typePk] = value;
        })
      })
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
      let data = {storeyName: this.storeyName}
      const self = this
      addStorey(data).then(function(result){
        if(result.code == 1){
          self.storeyName = '';
          self.$message({
            message: '添加成功',
            type: 'success'
          });
        }
        self.listStorey();
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
          if(result.code == 1){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          self.listStorey()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    storeyRowClick(row, event, column){
      this.selectStorey = row
      this.loading = true
      this.listRoom(this.selectStorey.storeyPk)
    },
    listRoom(storeyPk) {
      const self = this;
      listRoom({storeyPk: self.selectStorey.storeyPk}).then(result => {
        self.roomData = result.data
        self.loading = false
      }).catch(() => {
        self.loading = false
      })
    },
    openAddRoomDialog(){
      if(this.selectStorey.storeyName == '未选择'){
        this.$message({
          message: '请选择楼层',
          type: 'warning'
        });
      }else{
        
        this.addFrom={intelligentFlag:'N',rflFlag:'N'}
        this.addRoomDialog = true
      }
    },
    addRoom() {
      const self = this
      self.addFrom.storeyPk = this.selectStorey.storeyPk
      addRoom(self.addFrom).then(result => {
        if(result.code == 1){
          self.addFrom = self.addFroms
          self.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.listRoom(this.selectStorey.storeyPk)
        self.addRoomDialog = false 
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addRooms(){
      const self = this
      self.addFrom.storeyPk = this.selectStorey.storeyPk
      addRooms(self.previewRoomes).then(result => {
        if(result.code == 1){
          self.addFrom = self.addFroms
          self.$message({
            message: '批量添加成功',
            type: 'success'
          })
        }
        this.listRoom(this.selectStorey.storeyPk)
        self.batchAddRoomDialog = false 
      })
    },
    previewRoom(){
      const self = this
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          self.previewRoomes = [];
          if(self.previewData.roomNum > 20){
            return;
          }
          previewRooms(self.previewData).then(result => {
            if(result.code == 1){
              for (let index = 0; index < result.data.length; index++) {
                const element = result.data[index];
                self.previewRoomes.push({
                  roomNumber:element,
                  roomTypePk:self.previewData.roomTypePk,
                  storeyPk:self.previewData.storeyPk
                })
              }
            }
          })
        } else {
          return false;
        }
      });
      
    },
    updateClick(row){
      let str = JSON.stringify(row)
      this.selectRoom = JSON.parse(str)
      this.updateRoomDialog = true
    },
    updateRoom(){
      const self = this
      delete this.selectRoom.createTime;
      delete this.selectRoom.updateTime;
      if(this.selectRoom.rflFlag=='N'){
        this.selectRoom.rflLockNo = ''
      }
      updateRoom(this.selectRoom).then(result => {
        if(result.code == 1){
          self.$message({
            message: '修改成功',
            type: 'success'
          });
        }
        self.listRoom();
        self.updateRoomDialog = false
      })
    },
    delRoom(obj){
      const self = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoom({roomPk: obj.roomPk}).then(result => {
          if(result.code == 1){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.storeyRowClick(this.selectStorey);
          }
          self.listRoom()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    enters(){
      this.previewData.filterTail = []
      if(this.previewData.checked4){
        this.previewData.filterTail.push("4")
      }

      if(this.previewData.checked7){
        this.previewData.filterTail.push("7")
      }
      this.previewRoom()
    }
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
  height: 520px;
  padding-top: 18px;
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
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
  padding-top: 18px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 178px;
}
.text-cs{
  width: 178px;
  display: block;
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
.colic{
  width: 120px;
}
.block_input{
  width:96%;
}
</style>
