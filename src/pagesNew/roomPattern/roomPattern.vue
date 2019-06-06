<template>
  <el-container class="room-pattern-class">
    <el-header height="50px" class="room-pattern-header">
      <el-form :inline="true" size="mini" class="">
        <el-form-item label="楼栋：">
          <el-select
            class="selectWidth"
            v-model="selectForm.building"
            placeholder="请选择"
            clearable
            @change="init">
            <el-option
              v-for="y in buildingArr"
              :key="y.buildingPk"
              :label="y.buildingName"
              :value="y.buildingPk"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层：">
          <el-select
            class="selectWidth"
            v-model="selectForm.floor"
            placeholder="请选择" clearable @change="init">
            <el-option
              v-for="y in floorArr"
              :key="y.storeyPk"
              :label="y.storeyName"
              :value="y.storeyPk"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房型：">
          <el-select
            class="selectWidth"
            v-model="selectForm.roomType"
            placeholder="请选择"
            clearable
            @change="init"
          >
            <el-option v-for="y in roomType" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道：">
          <channel-select
            placeholder="请选择"
            ref="channelRef"
            class="selectWidth"
            @callback="init"
            v-model="selectForm.channel"/>
        </el-form-item>
        <el-form-item label="房号：">
          <el-input class="selectWidth" v-model="selectForm.roomNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="screhbtn" @click="init">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container class="room-pattern-container">
      <el-main>
        <RoomRow ref="RoomRow" @roomTypeCount='roomTypeCountMonitor'></RoomRow>
      </el-main>
      <el-aside width="300px">
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
      </el-aside>
    </el-container>
    <el-footer height="50px" class="room-pattern-footer">
      <div>
        <el-radio-group v-model="roomTypeStart" size="mini" @change="roomTypeChange">
          <el-radio-button label="">全部(20)</el-radio-button>
          <el-radio-button :label="i" v-for="(item,i) in realTimeRoomStatusMap" :key='i'><span v-if="item.icon" class="Ident" ></span><span :style='roomTypeColor(i,item.icon)'>{{item.name}}({{roomTypeCount[i] || 0}})</span></el-radio-button>
        </el-radio-group>
      </div>
    </el-footer>
    

    <!-- <DisableAndRepairDialog ref="disableAndRepairDialogRef" @callback="init"></DisableAndRepairDialog> -->
    <!-- 订单详细弹窗 -->
    <!-- <DialogCheckinVisible ref="checkinDialogRef" @closecheckin="closeOrderDialog($event)"/> -->
    <!-- 房间管理弹窗 维修、停用 -->
    <!-- <RoomManager ref="roomManagerRef" @callback="init"></RoomManager> -->
    <!-- 联房 -->
    <!-- <join-room-dialog ref="joinRoomDialogRef" @callback="init"></join-room-dialog> -->
  </el-container>
</template>
<script>
import moment from "moment";
import { roomStatusMap,realTimeRoomStatusMap,realTimeRoomStatusColor,checkInTypeMap, orderStatusMap, nightTrialTime } from "@/utils/orm";

import { realTimeRoomStatus, updateRoomStatus, loadOrderInfo } from "@/api/roomStatus/pmsRoomStatusController";
import { listStorey } from "@/api/systemSet/roomSetting/floorRoom";
import { listBuilding } from "@/api/systemSet/roomSetting/buildingController";
import { listRoomForWordByRoomPk } from "@/api/atrialCenter/roomForwardStatus";

// import DialogCheckinVisible from "@/pages/bookingForm/order/OrderDialog";
//=====================组件==========================
import RoomManager from "$pages/roomPattern/roomManager/RoomManager";
import DisableAndRepairDialog from '$pages/roomPattern/roomManager/DisableAndRepairDialog'

//房间
import RoomRow from "$pages/roomPattern/roomRow";

export default {
  components: {
    "full-calendar": require("vue-fullcalendar"),
    DisableAndRepairDialog,
    // DialogCheckinVisible,
    RoomManager,
    RoomRow
  },
  data() {
    return {
      moment: moment,
      
      checkInTypeMap: checkInTypeMap,
      orderStatusMap: orderStatusMap,
      roomList: [], //房态数据
      roomListSelectData:{},//筛选条件
      roomType: [], //房间类型
      floorArr: [], //楼层数据
      buildingArr: [], //楼栋数据
      realTimeRoomStatusMap:{},//房态类型
      channelArr: [], //渠道数据

      roomTypeStart: '',//房态标识
      roomTypeCount: {}, //房态标识房间统计

      aside:{
        //右边
        activeName: "1",
        //表格的参数
        tableMaxHeight: "200px",
        //联房
        tableData:[],
      },
      
      checkList: [],
      //搜索表单
      selectForm: {
        roomType: null,
        floor: null,
        building: null,
        channel: null,
        checkInType: null,
        roomNumber: "",
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
     * @augments */
    init(val) {
      this.realTimeRoomStatusMap = realTimeRoomStatusMap
    },
    roomTypeCountMonitor(map){
      this.roomTypeCount = map
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
    //右边 tabs点击事件
    handleClick(tab, event) {},
    //房间样式
    styleRoomStatusObject(item){
      let classInfo = {
        "width"        : '174px',
        "height"       : "100px",
        "border-radius": "5px"
      }
      roomStatusMap[item.roomStatus]
      let bgInfo = this.setBackground('#fff','#fff')
      return Object.assign(classInfo, bgInfo)
    },
    //设置房态背景色
    setBackground(color1,color2){
      return {
        "background": "linear-gradient("+color1+", "+color2+")"
      }
    },
    //底部 样式
    roomTypeColor(key){
      let colorInfo = {
        color: '#000'
      }
      colorInfo.color = realTimeRoomStatusColor[key].color1
      return colorInfo
    },
    //订单详细弹窗 关闭回调事件
    closeOrderDialog() {
      this.init();
    },
    /**
     * 底部
     * 房态选择
     */
    roomTypeChange(){
      console.log(this.roomTypeStart);
      this.roomListSelectData.filterStatus = this.roomTypeStart
      this.realTimeRoomStatus()
    },
    /**
     * 获取房间配置
     */
    getRoomConfig(){},
    //关联图标信息
    relationIconHover(index) {
      if (!this.roomList[index].orderInfo) {
        console.log(index);
        loadOrderInfo({ guestOrderPk: this.roomList[index].guestOrderPk }).then(
          res => {
            this.$set(this.roomList[index], "orderInfo", res.data);
          }
        )
      }
    },
    //预抵信息
    arrivalIconHover(index) {
      if (!this.roomList[index].arrivalInfo) {
        loadOrderInfo({
          guestOrderPk: this.roomList[index].arrivalGuestPk
        }).then(res => {
          console.log(index);
          this.$set(this.roomList[index], "arrivalInfo", res.data);
        });
      }
    },
    //房间管理弹窗 维修、停用
    clickRoomManager() {
      this.$refs.roomManagerRef.showDialog();
    },
    //联房
    joinRoom(item) {
      if (item.orderPk) {
        this.$refs.joinRoomDialogRef.showDialog(item.orderPk);
      } else if (item.arrivalOrderPk) {
        this.$refs.joinRoomDialogRef.showDialog(item.arrivalOrderPk);
      }
    }
  },
  mounted() {
    this.channelArr = [];
    //获取渠道类型
    var typeList = JSON.parse(localStorage.getItem("pms_type"));
    typeList.forEach(item => {
      //渠道
      if (item.typeMaster == "CHANNEL") {
        this.channelArr.push(item);
      }
    });
    //楼层
    listStorey().then(res => {
      this.floorArr = res.data;
    });
    //楼栋
    listBuilding().then(res => {
      this.buildingArr = res.data;
    });
    this.init();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
 @import "../../assets/scss/roomPattern.scss";
</style>
