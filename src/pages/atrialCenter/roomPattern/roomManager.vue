// 房间管理
<template>
  <section>
    <el-dialog
      class="room-manager-dialog" 
      title="房间管理"
      :visible.sync="dialogVisible"
      width="1000px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <el-form ref="searchForm" size="mini" :model="searchForm" :inline="true" label-width="60px">
        <el-form-item prop="roomStatus" label="房态">
          <el-radio-group v-model="searchForm.roomStatus" size="mini">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="1" border>空净</el-radio>
            <el-radio label="2" border>空脏</el-radio>
            <el-radio label="3" border>住人净</el-radio>
            <el-radio label="4" border>住人脏</el-radio>
            <el-radio label="5" border>维修房</el-radio>
            <el-radio label="6" border>停用房</el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <el-form-item prop="roomNumber" label="房号">
          <el-input type="text" v-model="searchForm.roomNumber" :clearable="true" style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item prop="roomTypePk" label="房型">
          <el-select v-model="searchForm.roomTypePk" placeholder="请选择房型" style="width: 120px;">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in roomTypeArray"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="buildingPk" label="楼栋">
          <el-select v-model="searchForm.buildingPk" placeholder="请选择楼栋" style="width: 120px;">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in buildingArray"
              :key="item.buildingPk"
              :label="item.buildingName"
              :value="item.buildingPk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="storeyPk" label="楼层">
          <el-select v-model="searchForm.storeyPk" placeholder="请选择楼层" style="width: 120px;">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in storeyArray"
              :key="item.storeyPk"
              :label="item.storeyName"
              :value="item.storeyPk">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="getList()">查询</el-button>
        </el-form-item>
        <el-form-item label="操作">
          <el-button type="primary" size="mini" @click="clickBatch(1)">批量置净</el-button>
          <el-button type="primary" size="mini" @click="clickBatch(2)">批量置脏</el-button>
          <el-button type="primary" size="mini" @click="reasonBatch('REPAIR')">批量维修</el-button>
          <el-button type="primary" size="mini" @click="reasonBatch('DISABLE')">批量停用</el-button>
          <el-button type="primary" size="mini" @click="delReasonBatch()">批量解除维修、停用</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        height="410"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="roomNumber"
          label="房号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="buildingName"
          label="楼栋"
          width="80">
        </el-table-column>
        <el-table-column
          prop="storeyName"
          label="楼层"
          width="80">
        </el-table-column>
        <el-table-column
          prop="roomTypeName"
          label="房型"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="roomStatus"
          label="房态">
          <template slot-scope="scope">
            <span>{{roomStatusMap[scope.row.roomStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomSurvey"
          label="房间概况" 
          show-overflow-tooltip>
        </el-table-column>
        <!-- show-overflow-tooltip -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose"  size="mini">关闭</el-button>
      </span>
    </el-dialog>

    <DisableAndRepairDialog ref="disableAndRepairDialogRef" @callback="getList"></DisableAndRepairDialog>
  </section>
</template>

<script>
import {roomStatusMap} from '@/utils/orm'
import { listRoom,updateStatusBatch,delDisableAndRepairBatch } from '@/api/atrialCenter/roomManagerController'
import {listStorey} from '@/api/systemSet/roomSetting/floorRoom'
import {listBuilding} from '@/api/systemSet/roomSetting/buildingController'
import DisableAndRepairDialog from '@/pages/atrialCenter/roomPattern/DisableAndRepairDialog'

export default {
  components:{DisableAndRepairDialog},
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        roomStatus:'',
        roomTypePk:'',
        buildingPk:'',
        storeyPk: '',
      },
      roomStatusMap:roomStatusMap,
      roomTypeArray:[],
      buildingArray:[],
      storeyArray:[],
      currPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
      this.roomTypeArray = []
      let typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          this.roomTypeArray.push(item);
        }
      })
      listStorey().then(res=>{
        this.storeyArray = res.data
      })
      listBuilding().then(res=>{
        this.buildingArray = res.data
      })
      this.getList();
    },
    getList() {
      let data = {
        pageNum: this.currPage,
        pageSize:this.pageSize,
        roomNumber: this.searchForm.roomNumber,
        roomTypePk:this.searchForm.roomTypePk,
        buildingPk:this.searchForm.buildingPk,
        storeyPk: this.searchForm.storeyPk,
        roomStatus: this.searchForm.roomStatus,
      }
      listRoom(data).then(res=>{
        this.tableData = res.data.list;
        this.total = Number(res.data.total)
      })
    },
    // 批量置净、置脏
    clickBatch(status) {
      if(this.multipleSelection.length<=0){
        return;
      }

      let desc = status==1?'置净':'置脏'
      this.$confirm("是否"+desc+"选中的房间？", "提示", {
        type:'warning',
        beforeClose: (action, instance, done) =>{
          if (action === 'confirm')  {
            instance.confirmButtonLoading = true;
            //执行异步内容...
            let pks = []
            this.multipleSelection.forEach(item=>{
              pks.push(item.roomStatePk)
            });
            let data = {
              roomStatePks: pks,
              status: status
            }
            updateStatusBatch(data).then(res=>{
              this.$message.success("操作成功")
              this.getList();
            }).finally(()=>{
              //异步返回，调用停止loding，并关闭实体
              instance.confirmButtonLoading = false;
              done();
            })
            
          } else {
            if(instance.confirmButtonLoading==false) {
              done();
            }
          }
        }
      }).then(()=>{});
    },
    //批量维修、停用
    reasonBatch(type){
      this.$refs.disableAndRepairDialogRef.showDialog(type,this.multipleSelection);
    },
    delReasonBatch(){
      let tempPks = []
      this.multipleSelection.forEach(item=>{
        if(item.reasonPk){
          tempPks.push(item.reasonPk)
        }
      })
      if(tempPks.length==0) {
        return;
      }
      
      this.$confirm('此操作将解锁选中的停用或维修的房间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          reasonPks: tempPks,
        }
        delDisableAndRepairBatch(data).then(res=>{
          this.$message.success('操作成功')
          this.getList();
        })
      })
    },
    handleClose(){
      this.dialogVisible = false;
      this.$emit('callback')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.getList();
    },
    handleCurrentChange(currPage){
      this.currPage = currPage
      this.getList();
    },
    
  }
}
</script>

<style>
.room-manager-dialog .el-dialog__body{
  padding: 0px 20px;
}
</style>
