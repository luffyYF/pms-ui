<template>
    <div>
        <div class="buttonOr">
          <el-button size="mini">预定</el-button>
          <el-button size="mini">办理入住</el-button>
          <el-button size="mini">转脏房</el-button>
          <el-button size="mini">转维修</el-button>
          <el-button size="mini" @click="clickRoomManager">批量转脏</el-button>
          <el-button size="mini">批量转维修</el-button>
          <el-button size="mini">房态统计</el-button>
        </div>
        <div class="roomMesTitle">房间信息</div>
        <div class="roomMes"><span>房间号：303</span><span><span class="Ident"></span><span>空净</span></span></div>
        <el-tabs v-model="aside.activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="信息" name="1">
            <div class="row-mes"><span>楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;栋：</span><span>17栋5楼</span></div>
            <div class="row-mes"><span>当日房价：</span><span>￥158<span>￥158</span></span></div>
            <div class="row-mes"><span>入住类型：</span><span>普通</span></div>
            <div class="row-mes"><span>客户姓名：</span><span>张三丰</span></div>
            <div class="row-mes"><span>客人手机：</span><span>17878787778</span></div>
            <div class="row-mes"><span>抵店时间：</span><span>2019-05-26 14:16</span></div>
            <div class="row-mes"><span>离店时间：</span><span>2019-05-26 14:16</span></div>
            <div class="row-mes"><span>备注：</span></div>
            <div class="row-mes beizhu">接吹机·接吹机</div>
          </el-tab-pane>
          <el-tab-pane label="同房" name="2">
            <el-table :data="aside.tableData" :max-height="aside.tableMaxHeight" size="mini">
              <el-table-column prop="date" label="姓名"></el-table-column>
              <el-table-column prop="address" label="手机号"></el-table-column>
              <el-table-column prop="date" label="性别"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="联房" name="3">
            <el-table :data="aside.tableData" :max-height="aside.tableMaxHeight" size="mini">
              <el-table-column prop="name" label="房号"></el-table-column>
              <el-table-column prop="date" label="姓名"></el-table-column>
              <el-table-column prop="address" label="手机号"> </el-table-column>
              <el-table-column prop="date" label="性别" width="50"> </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="房态" name="4" class="room-status-calendar-box">
            <full-calendar ref="calendar" v-if="aside.activeName == 4" :events="meetingEventList" lang="zh" @changeMonth="changeMonth">
            </full-calendar>
          </el-tab-pane>
          <el-tab-pane label="日志" name="5">
            <el-table :data="aside.tableData" :max-height="aside.tableMaxHeight" size="mini">
              <el-table-column prop="date" label="操作人"></el-table-column>
              <el-table-column prop="address" label="操作时间"></el-table-column>
              <el-table-column prop="name" label="操作类型"></el-table-column>
              <el-table-column prop="date" label="描述"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import moment from "moment";
//=====================组件==========================

export default {
  components: {},
  data() {
    return {
      moment: moment,
      aside:{
        //右边
        activeName: "1",
        //表格的参数
        tableMaxHeight: "200px",
        //联房
        tableData:[],
      },
      //远期房态
      currentRoom: null,
      meetingEventList: [],
      currentDate: null,
    }
  },
  methods: {
    /**
     * 初始化调用，查找房间数据
     * @augments 
     */
    init(val) {},
    setRoomInfo(obj){
        console.log(obj);
    },
    calendarRoomForwardStatus(row) {
      this.currentRoom = row;
      if (!this.currentDate) {
        this.currentDate = moment().format("YYYY-MM-DD");
      }
      let data = {
        roomPk: this.currentRoom.roomPk,
        month: this.currentDate
      };

      listRoomForWordByRoomPk(data).then(res => {
        this.meetingEventList = res.data;
      });
    },
    //日历月份点击事件 （页面打开自动调用）
    changeMonth(start, end, current) {
      this.currentDate = current;
      let data = {
        roomPk: this.currentRoom.roomPk,
        month: this.currentDate
      };
      listRoomForWordByRoomPk(data).then(res => {
        this.meetingEventList = res.data;
        this.activeName = ["4"];
      });
      // this.calendarPrice(current);
      // this.currDate = current
    },
    //批量转脏
    clickRoomManager(){

    },
    handleClick(){

    },
    //设置房态背景色
    setBackground(color1,color2){
      return {
        "background": "linear-gradient("+color1+", "+color2+")"
      }
    },
    
  },
  mounted() {
   
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
 @import "../../assets/scss/roomPattern.scss";
</style>
