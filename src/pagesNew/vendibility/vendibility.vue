<template>
  <div class="container-nev vendibility">
    <div class="block margin_bottom_z">
      <p>*注：占用房 / 可售房</p>
      <p>占用房 = 今天预计不离店房 + 预订当天到</p>
      <p>可售房 = 总房 - 维修房 - 停用房 - 今天预计不离店房 - 预订当天到 - 可用预留房数</p>
      <p>占用房 + 可售房 = 总房数 - 维修房 - 停用房 - 可用预留房数</p>
    </div>
    <!--条件查询-->
    <div class="block">
      <el-form :inline="true" size="mini" class="demo-form-inline">
        <date-picker v-model="beginAndEnd"></date-picker>
         
        <el-form-item label="查看方式：">
          <el-radio-group v-model="type">
            <el-radio-button :label="1">按房型</el-radio-button>
            <el-radio-button :label="0">按房间</el-radio-button>
          </el-radio-group>
          <!-- <el-select v-model="type" placeholder="请选择房间类型" >
            <el-option label="按房型" :value="1"  key="1"></el-option>
            <el-option label="按房间" :value="0"  key="0"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="房间类型：">
          <el-select v-model="roomTypePk" placeholder="请选择房间类型" >
            <el-option :label="r.typeName" :value="r.typePk" v-for="r in roomTypeArr" :key="r.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  size="mini" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <div class="block">
      <el-table
      size="mini"
      border
      v-loading="loading"
      ref="multipleTable"
      :data="houseList.table"
      :style="tableStyle"
      class="testTable"
      :cell-style="tableCellClassName"
      :row-class-name="tableRowClassName"
      :summary-method="getSummaries"
      :span-method="objectSpanMethod">
      <el-table-column
        fixed
        label="房源类型"
        align="center"
        prop="roomTypeName"
        width="150">
      </el-table-column>
      <el-table-column
        v-if="currentType == 1"
        fixed
        label="类型"
        align="center"
        prop="desc"
        width="150">
      </el-table-column>
      <el-table-column
        v-else
        fixed
        label="房号"
        align="center"
        prop="roomNumber"
        width="150">
      </el-table-column>
      
      <el-table-column
        v-for="title in houseList.title" :key="title.id"
        :prop="title.id"
        :column-key="title.date"
        :label="title.date"
        align="center"
        class-name="pointer1"
        label-class-name="mylabel"
        width="90">
        <template slot-scope="props">
          <!-- <span v-if="props.row[title.id] !=null && props.row.totalRoomNum != null"> {{props.row[title.id]}} / {{props.row.totalRoomNum - props.row[title.id]}}</span>
          <span v-if="props.row.totalRoomNum == null"> 0 / 0</span>
          <span v-if="props.row[title.id] ==null && props.row.totalRoomNum != null"> 0 / {{props.row.totalRoomNum}}</span> -->
          <!-- //类型 == 1 为可售房间数量 0位已预订数量 -->
          <div v-if="props.$index > fixedRow &&currentType == 1">
            
            <span v-if="props.row.type == 1 && props.row[title.id] !=null">{{props.row.totalRoomNum - props.row[title.id]}}</span>
            <span v-else-if="props.row.type == 1 && props.row.totalRoomNum != null">{{props.row.totalRoomNum}}</span>
            <span v-else-if="props.row.type == 1">0</span>
            <span v-else-if="props.row.type == 0 && props.row[title.id] !=null">{{props.row[title.id]}}</span>
            <span v-else-if="props.row.type == 0">0</span>
          </div>
          <div v-else-if="props.$index > fixedRow && currentType == 0">
              <span v-if="houseList.roomStatusMap[props.row.roomPk+title.id]">{{houseList.roomStatusMap[props.row.roomPk+title.id]}}</span>
          </div>
          <div v-else>
            <span v-if="props.$index == 0">{{houseList.weekMap[title.id]}}</span>
            <span v-else-if="props.$index == 1">{{houseList.totalRoomNum}}</span>
            <span v-else-if="props.$index == 3 && houseList.roomNumMap[title.id]">{{houseList.roomNumMap[title.id]}}</span>
            <span v-else-if="props.$index == 3">0</span>
            <span v-else-if="props.$index == 2 && houseList.roomNumMap[title.id]">{{houseList.totalRoomNum - houseList.roomNumMap[title.id]}}</span>
            <span v-else-if="props.$index == 2">{{houseList.totalRoomNum}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DateComponent/DatePicker';
import { frowardRoomList, frowardRoomDetail } from "@/api/atrialCenter/roomForwardStatus";
import Moment from 'moment'
export default {
  components: { DatePicker },
  data() {
    return {
      houseList:[],
      tempColumnKey:'',
      screenWidth: document.body.clientWidth,
      tableStyle: "width:" + (document.body.clientWidth - 20) + "px",
      tableColumn: [],
      tableData:[],
      loading:false,
      beginAndEnd:{
        begin:null,
        end:null
      },
      roomTypePk:"",
      roomTypeArr:[],
      fixedRow:3,
      currentType:1,
      type:1
    };
  },
  created(){
    this.search();
    this.getRoomType()
  },
  methods: {
    getRoomType(){
      this.roomTypeArr = [{
        typePk:"",
        typeName:"全部"
      }]
      var typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          this.roomTypeArr.push(item);
        }
      })
    },
    getSummaries(param) {
      //总计：自定义计算规则
      const { columns, data } = param;
      var sums = [];
      columns.forEach((column, index) => { 
        var day = 0;
        var room = 0;
        if (index === 0 ) {
          sums[index] = '总计';
          return;
        }
        if(index == 1){
          sums[index] = '';
          return;
        }
        data.forEach(item =>{
          var dayNum = item[column.property] ==null?0:item[column.property];
          var RoomNum = item.totalRoomNum==null?0:item.totalRoomNum;
          day += dayNum;
          room += RoomNum;
        }); 
        sums[index] = day/2 + ' / '+ (room-day)/2;
      })
      return sums;
    },
    search(){
      // 点击查询按钮
      this.loading = true;
      frowardRoomList({begin:this.beginAndEnd.begin,end:this.beginAndEnd.end,roomTypePk:this.roomTypePk,type:this.type}).then(res =>{
        this.loading = false;
        if(res.code == 1) {
          this.currentType = this.type
          this.houseList = res.data;
        }
      }).catch(()=>{
        this.loading = false;
      });
    },objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex ==1) {
          if(rowIndex <= this.fixedRow){
            if(columnIndex == 0){
              return {
                rowspan: 1,
                colspan: 2
              };
            }else if(columnIndex == 1){
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }else if (rowIndex > this.fixedRow && this.currentType == 1) {
            if(columnIndex == 0 && rowIndex % 2 == 0 ){
              return {
                rowspan: 2,
                colspan: 1
              };
            }else if(columnIndex == 0 && rowIndex % 2 != 0 ) {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex > this.fixedRow && this.currentType == 1) {
          if(rowIndex % 2 == 0){
            return 'warningRow';
          }
        }
        return '';
      },
      tableCellClassName({row, column, rowIndex, columnIndex}){
          // {{houseList.roomStatusMap[props.row.roomPk+title.id]}}
          if(this.currentType == 1){
            if(columnIndex <=1){
              return {
                "background":"#fff"
              };
            } 
          }else{
              if(this.houseList.roomStatusMap[row.roomPk+column.property]){
                 return {
                    "background":"#ccc"
                  }
                 ;
              }
          }
      }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    // this.search()
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
      this.tableStyle = "width:" + (this.screenWidth - 20) + "px";
    },
  }
};
</script>

<style lang='scss' scoped>
.vendibility{
  .margin_bottom_z{
    color:red;
    p{
      padding-left: 32px;
      margin:5px;
      &:first-child{
        padding-left: 0px;
      }
    }
  }
}
</style>
<style>
.pointer1 .cell {
  cursor: pointer !important;
  /*color:red !important;*/
}
.mylabel .cell {
  cursor: auto !important;
  color: #909399 !important;
}
.el-table .warningRow{
    background: #ccc;
}
.el-table .defaultCell{
  background: white;
}
</style>