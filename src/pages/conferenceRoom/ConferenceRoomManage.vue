<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row>
        <span class="title-span">会议室管理－会议室设置</span>
        <el-button @click="addRow(tableData)" type="primary" size="mini">添加会议室</el-button>
      </el-row>
      <hr>
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading" 
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="roomCode"
          label="编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomCode" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomName" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomSpec"
          label="规格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomSpec" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomArea"
          label="面积">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomArea" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomCapacity"
          label="容纳人数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomCapacity" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="administrators"
          label="管理员">
          <template slot-scope="scope">
            <el-input v-model="scope.row.administrators" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template slot-scope="scope">
            <el-input v-model="scope.row.address" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="equipment"
          label="设备">
          <template slot-scope="scope">
            <el-input v-model="scope.row.equipment" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomDesc"
          label="描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.roomDesc" size="mini" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="saveRoom(scope.$index, tableData)"
              type="text"
              size="small">
              保存
            </el-button>
            <el-button
              @click="deleteBtn(scope.$index)"
              type="text"
              size="small">
              移除
            </el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              append-to-body
              width="20%">
              <span>确定删除？</span>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="deleteRoom(tableData)">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  import bus from '@/utils/bus'
  import {listMtgRoom,addMtgRoom,updateMtgRoom,delMtgRoom} from '@/api/conferenceRoom/mtgRoomController'
  export default {
    components: {},
    data() {
      return {
        loading:false,
        form: {},
        currIndex:{},//当前选择的行下标
        tableData: [],
        dialogVisible:false,
      };
    },
    mounted(){
      this.getList();
    },
    methods: {
      getList(){//获取会议室列表
        this.loading = true
        listMtgRoom().then(res => {
          this.loading = false
          this.tableData = res.data;
          if(this.tableData[0] != null){
              bus.$emit('conferenceRoomChangefalse');
              // alert("2")
          }else{
              // alert("3")
              bus.$emit('conferenceRoomChange');
          }
        }).catch(error=>{
          // this.$message({type:'danger', message: error})
        })
      },
      addRow(rows){//添加会议室按钮
        var item = {
          roomPk:null,
          roomCode:null,
          roomName:null,
          roomSpec:null,
          roomArea:null,
          roomCapacity:null,
          administrators:null,
          address:null,
          equipment:null,
          roomDesc:null
        };
        rows.push(item);
      },
      validate(room){//添加会议室数据校验
        if(room.roomCode==null || room.roomCode==''){
          this.$message({type:'danger', message: '请填写编号'});
          return false;
        }
        if(room.roomName==null || room.roomName==''){
          this.$message({type:'danger', message: '请填写名称'});
          return false;
        }
        if(room.roomSpec==null || room.roomSpec==''){
          this.$message({type:'danger', message: '请填写规格'});
          return false;
        }
        if(room.roomArea==null || room.roomArea==''){
          this.$message({type:'danger', message: '请填写面积'});
          return false;
        }
        if(room.roomCapacity==null || room.roomCapacity==''){
          this.$message({type:'danger', message: '请填写容纳人数'});
          return false;
        }
        if(room.administrators==null || room.administrators==''){
          this.$message({type:'danger', message: '请填写管理员'});
          return false;
        }
        if(room.address==null || room.address==''){
          this.$message({type:'danger', message: '请填写地址'});
          return false;
        }
        if(room.equipment==null || room.equipment==''){
          this.$message({type:'danger', message: '请填写设备'});
          return false;
        }
        if(room.roomDesc==null || room.roomDesc==''){
          this.$message({type:'danger', message: '请填写描述'});
          return false;
        }
        return true;
      },
      saveRoom(index,rows){//保存会议
        let nowItem = rows[index];
        if(this.validate(nowItem)){
          if(nowItem.roomPk==null || nowItem.roomPk==''){//新增
            addMtgRoom(rows[index]).then(res => {
              this.$message({type:'success', message: '保存成功'})
              this.getList();
            }).catch(error=>{
              this.$message({type:'danger', message: error})
            })
          }else{//修改
            updateMtgRoom(rows[index]).then(res => {
              this.$message({type:'success', message: '保存成功'})
              this.getList();
            }).catch(error=>{
              this.$message({type:'danger', message: error})
            })
          }
        }else{
          return false;
        }
      },
      deleteBtn(index){
       this.currIndex = index;
       this.dialogVisible = true;
      },
      deleteRoom(rows){//删除会议室
        let nowItem = rows[this.currIndex];
        if(nowItem.roomPk==null || nowItem.roomPk==''){
          rows.splice(this.currIndex, 1);
          this.dialogVisible = false;
        }else{
          delMtgRoom(nowItem).then(res => {
            this.$message({type:'success', message: '删除成功'})
            this.getList();
            this.dialogVisible = false;
          }).catch(error=>{
            this.dialogVisible = false;
            this.$message({type:'danger', message: error})
          })
        }
      },
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px;
    display: inline-block;
}
</style>


