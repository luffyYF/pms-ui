// 房间管理
<template>
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
        <el-input type="text" v-model="searchForm.roomNumber" style="width: 100px;"></el-input>
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
        <el-button type="primary" size="mini">批量维修</el-button>
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
      <el-button @click="dialogVisible = false"  size="mini">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {roomStatusMap} from '@/utils/orm'
import { listRoom,updateStatusBatch } from '@/api/atrialCenter/roomManagerController'
import {listStorey} from '@/api/systemSet/roomSetting/floorRoom'
import {listBuilding} from '@/api/systemSet/roomSetting/buildingController'
export default {
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
      })
    },
    handleClose(){
      this.dialogVisible = false;
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
