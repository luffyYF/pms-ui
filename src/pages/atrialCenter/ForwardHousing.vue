<template>
  <div class="about_spacing">
    <el-row>
      <el-col :span="24">
        <div class="bg-purple-dark line_height_z margin_bottom_z">
          <p>*注：占用房 / 可售房</p>
          <p>占用房 = 今天预计不离店房 + 预订当天到</p>
          <p>可售房 = 总房 - 维修房 - 停用房 - 今天预计不离店房 - 预订当天到 - 可用预留房数</p>
          <p>占用房 + 可售房 = 总房数 - 维修房 - 停用房 - 可用预留房数</p>
        </div>
      </el-col>
    </el-row>
    <!--条件查询-->
    <div class="block">
      <el-form :inline="true" size="mini" class="demo-form-inline">
        <date-picker v-model="beginAndEnd"></date-picker>
        <el-form-item>
          <el-button type="primary"  size="mini" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <!--表格-->
    <div>
    <el-table
      size="mini"
      border
      show-summary
      v-loading="loading"
      ref="multipleTable"
      :data="houseList.table"
      :style="tableStyle"
      max-height="400"
      :summary-method="getSummaries"
      @cell-click="columnClick">
      <!-- <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <RoomOrderTable v-bind:houseTypePk="props.row.houseTypePk" v-bind:date="props.row.currColumnKey" />
        </template>
      </el-table-column> -->
      <el-table-column
        fixed
        label="房源类型"
        prop="roomTypeName"
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
          <span v-if="props.row[title.id] !=null && props.row.totalRoomNum != null"> {{props.row[title.id]}} / {{props.row.totalRoomNum - props.row[title.id]}}</span>
          <span v-if="props.row.totalRoomNum == null"> 0 / 0</span>
          <span v-if="props.row[title.id] ==null && props.row.totalRoomNum != null"> 0 / {{props.row.totalRoomNum}}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DateComponent/DatePicker';
// import DatePicker from "./../../components/DateComponent/DatePicker.vue"
import RoomOrderTable from "./RoomOrderTable.vue"
import { frowardRoomList, frowardRoomDetail } from "@/api/atrialCenter/roomForwardStatus";
import Moment from 'moment'
export default {
  components: { DatePicker, RoomOrderTable },
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
      }
    };
  },
  created(){
    this.search();
  },
  methods: {
    columnClick(row, column, cell, event) {
      console.log({row, column, cell, event})
      //点击单元格
      // if(column.columnKey){
      //   console.log(row);
      //   row.currColumnKey=column.columnKey
      //   if(this.tempColumnKey==column.columnKey){
      //     this.$refs.multipleTable.toggleRowExpansion(row)
      //   }else{
      //     this.tempColumnKey = column.columnKey
      //     this.$refs.multipleTable.toggleRowExpansion(row,false)
      //     this.$refs.multipleTable.toggleRowExpansion(row,true)
      //   }
      // }
    },
    getSummaries(param) {
      //总计：自定义计算规则
      const { columns, data } = param;
      var sums = [];
      columns.forEach((column, index) => { 
        var day = 0;
        var room = 0;
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        data.forEach(item =>{
          var dayNum = item[column.property] ==null?0:item[column.property];
          var RoomNum = item.totalRoomNum==null?0:item.totalRoomNum;
          day += dayNum;
          room += RoomNum;
        }); 
        sums[index] = day + ' / '+ (room-day);
      })
      return sums;
    },
    search(){
      // 点击查询按钮
      this.loading = true;
      frowardRoomList({begin:this.beginAndEnd.begin,end:this.beginAndEnd.end}).then(res =>{
        this.loading = false;
        if(res.code == 1) {
          this.houseList = res.data;
        }
      }).catch(()=>{
        this.loading = false;
      });
     
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

<style scoped>
.margin_bottom_z{
    margin-bottom: 10px;
    /* background:  #fdf7f7; */
    padding: 10px;
    color:red;
}
.margin_bottom_z p{
  padding-left: 32px;
  margin:5px;
}
.margin_bottom_z p:first-child{
  padding-left: 0px;
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
</style>