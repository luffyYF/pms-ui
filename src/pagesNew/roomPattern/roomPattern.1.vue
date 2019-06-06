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
          <el-input class="selectWidth" v-model="roomNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="screhbtn" @click="init">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container class="room-pattern-container">
      <el-main>
        <div id="rowRoom" class="rowRoom" >
          <div class="floorstorey" v-for="(ite, index) in roomList" :key="index">
            <div class="title" v-if='ite.buildingName || ite.storeyName'>{{ite.buildingName?ite.buildingName:''}}{{ite.storeyName?ite.storeyName+'层':''}}<span>（空净20间&nbsp;&nbsp;空脏20间&nbsp;&nbsp;住净20间&nbsp;&nbsp;住脏20间&nbsp;&nbsp;维修20间&nbsp;&nbsp;停用20间&nbsp;&nbsp;预抵20间&nbsp;&nbsp;预离20间&nbsp;&nbsp;生日20间&nbsp;&nbsp;团队20间&nbsp;&nbsp;钟点房20间&nbsp;&nbsp;接待房20间）</span></div>
            <!-- 房间item begin -->
            <div class="pattern-li"
              @contextmenu.prevent="rightClick(item,$event)"
              @click="roomClick(item)"
              @dblclick="toCheckin(item)"
              @click.ctrl="ctrlClick(item,index)"
              :style="styleRoomStatusObject(item)"
              v-for="(item, i) in ite.roomList"
              :key="i">
              <!-- 房间号 渠道 -->
              <div class="pattern-li-item">
                <label class="rm">{{item.roomNumber}}</label>
                <label class="ht">{{item.roomTypeName}}</label>
              </div>
              <!-- 用户信息 -->
              <div class="pattern-li-item username-channel">
                <div v-if="item.guestOrderPk">
                  <!-- 入住信息 -->
                  <label class="userinfo">{{item.guestName}}</label>
                  <label class="channelinfo">{{item.channelName}}</label>
                </div>
                <div v-else-if="item.arrivalGuestPk">
                  <!-- 预抵信息 -->
                  <label class="userinfo">{{item.arrivalGuestName}}</label>
                  <label class="channelinfo">{{item.arrivalChannelName}}</label>
                </div>
              </div>
              <!-- 状态图标 -->
              <div class="pattern-li-item button-status-icon">
                <!-- 入住关联类型 -->
                <el-popover ref="popover2" placement="bottom" :width="item.orderInfo && item.orderInfo.guestList.length>1 ? 420 : 236" trigger="hover"
                  @show="relationIconHover(index)">
                  <div v-if="item.orderInfo" style="max-height:400px; overflow-y: scroll;">
                    <span>入住类型：{{checkInTypeMap[item.orderInfo.guestPo.checkInType]}}</span>
                    <br>
                    <span>来源渠道：{{item.orderInfo.guestPo.channelTypeName}}</span>
                    <br>
                    <span>客人姓名：{{item.orderInfo.guestPo.guestName}}</span>
                    <br>
                    <span>客人手机：{{item.orderInfo.guestPo.guestPhone}}</span>
                    <br>
                    <span>抵店时间：{{item.orderInfo.guestPo.beginDate}}</span>
                    <br>
                    <span>离店时间：{{item.orderInfo.guestPo.endDate}}</span>
                    <br>
                    <span>房间价格：￥{{item.orderInfo.guestPo.currPrice}}</span>
                    <br>
                    <div v-if="item.roomRelationType>1 && item.orderInfo.guestList && item.orderInfo.guestList.length>0">
                      <hr>
                      <div class="manay-guest-panel" v-for="(g,guestIndex) in item.orderInfo.guestList" :key="guestIndex">
                        房号：{{g.roomNumber}}
                        <br>
                        房型：{{g.roomTypeName}}
                        <br>
                        状态：{{orderStatusMap[g.orderStatus]}}
                        <br>
                        抵店：{{g.beginDate}}
                        <br>
                        离店：{{g.endDate}}
                        <br>
                      </div>
                    </div>
                  </div>
                  <el-button
                    slot="reference"
                    size="mini"
                    :class="{'displayNone':item.roomRelationType !=1 }"
                    v-popover:item.guestOrderPk
                    class="detailsinfo reserve_single"
                    type="text"
                  ></el-button>
                  <el-button
                    slot="reference"
                    size="mini"
                    :class="{'displayNone':item.roomRelationType !=2 }"
                    v-popover:item.guestOrderPk
                    class="detailsinfo relation"
                    type="text"
                  ></el-button>
                  <el-button
                    slot="reference"
                    size="mini"
                    :class="{'displayNone':item.roomRelationType !=3}"
                    v-popover:item.guestOrderPk
                    class="detailsinfo room_team"
                    type="text"
                  ></el-button>
                </el-popover>

                <!-- 预抵关联类型 -->
                <template v-if="!item.guestOrderPk">
                  <label class="detailsinfo reserve_single" v-if="item.arrivalRelationType==1"></label>
                  <label class="detailsinfo relation" v-if="item.arrivalRelationType==2"></label>
                  <label class="detailsinfo room_team" v-if="item.arrivalRelationType==3"></label>
                </template>

                <!-- 生日-->
                <el-popover placement="bottom" width="200" trigger="hover" :content="'今天是'+item.guestName+'的生日'">
                  <label slot="reference" v-if="item.birthdayFlag==1" class="detailsinfo today_birthday"></label>
                </el-popover>

                <!-- 当天预抵 -->
                <el-popover placement="bottom" :width="item.arrivalInfo && item.arrivalInfo.guestList.length>1 ? 420 : 236" trigger="hover" @show="arrivalIconHover(index)">
                  <div v-if="item.arrivalInfo" style="max-height:400px; overflow-y: scroll;">
                    <span>入住类型：{{checkInTypeMap[item.arrivalInfo.guestPo.checkInType]}}</span>
                    <br>
                    <span>来源渠道：{{item.arrivalInfo.guestPo.channelTypeName}}</span>
                    <br>
                    <span>客人姓名：{{item.arrivalInfo.guestPo.guestName}}</span>
                    <br>
                    <span>客人手机：{{item.arrivalInfo.guestPo.guestPhone}}</span>
                    <br>
                    <span>抵店时间：{{item.arrivalInfo.guestPo.beginDate}}</span>
                    <br>
                    <span>离店时间：{{item.arrivalInfo.guestPo.endDate}}</span>
                    <br>
                    <span>房间价格：￥{{item.arrivalInfo.guestPo.currPrice}}</span>
                    <br>
                    <div v-if="item.arrivalInfo.guestList && item.arrivalInfo.guestList.length>0">
                      <hr>
                      <div class="manay-guest-panel" v-for="(g,gIndex) in item.arrivalInfo.guestList" :key="gIndex">
                        房号：{{g.roomNumber}}
                        <br>
                        房型：{{g.roomTypeName}}
                        <br>
                        状态：{{orderStatusMap[g.orderStatus]}}
                        <br>
                        抵店：{{g.beginDate}}
                        <br>
                        离店：{{g.endDate}}
                        <br>
                      </div>
                    </div>
                  </div>
                  <label
                    slot="reference"
                    class="detailsinfo reserve_today"
                    v-if="item.arrivalGuestPk"></label>
                </el-popover>

                <!-- 欠费-->
                <el-popover placement="bottom" width="200" trigger="hover" :content="'欠费金额：￥'+Math.abs(item.owePirce)">
                  <label slot="reference" class="detailsinfo arrears" v-if="item.owePirce"></label>
                </el-popover>
                <label class="detailsinfo clockroom" v-if="item.checkInType==1" title="钟点房"></label>
                <label class="detailsinfo special" v-if="item.checkInType==2" title="特殊房"></label>
                <label class="detailsinfo selfuse" v-if="item.checkInType==3" title="自用房"></label>
                <label class="detailsinfo freeroom" v-if="item.checkInType==4" title="接待房"></label>
                <!-- 预离 -->
                <el-popover
                  placement="bottom"
                  title
                  width="200"
                  trigger="hover"
                  :content="'预离日期：'+item.guestEndDate"
                >
                  <label slot="reference" class="detailsinfo reserve_leave" v-if="item.leaveFlag"></label>
                </el-popover>
              </div>
              <!-- 抵店离店日期 -->
              <div class="pattern-li-item checkin-date" v-if="item.guestOrderPk">
                <!--  class="userinfo" -->
                <label v-if="item.guestBeginDate">入住：{{moment(item.guestBeginDate).format('MM-DD')}}</label>
                <label v-if="item.guestEndDate">离开：{{moment(item.guestEndDate).format('MM-DD')}}</label>
              </div>
            </div>
          </div>
        </div>
        <!-- 房间item end -->
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
    <!-- 右键菜单 -->
    <roomMenu ref="roomMenu"></roomMenu>

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

import { realTimeRoomInfo,realTimeRoomStatus, updateRoomStatus, loadOrderInfo } from "@/api/roomStatus/pmsRoomStatusController";
import { listStorey } from "@/api/systemSet/roomSetting/floorRoom";
import { listBuilding } from "@/api/systemSet/roomSetting/buildingController";
import { listRoomForWordByRoomPk } from "@/api/atrialCenter/roomForwardStatus";
import { listType } from "@/api/utils/pmsTypeController";
import { find } from "@/api/systemSet/pmsParamConfigController";



// import DialogCheckinVisible from "@/pages/bookingForm/order/OrderDialog";
//=====================组件==========================
import RoomManager from "$pages/roomPattern/roomManager/RoomManager";
import DisableAndRepairDialog from '$pages/roomPattern/roomManager/DisableAndRepairDialog'
//右键菜单
import roomMenu from "$pages/roomPattern/roomMenu";
import { constants } from 'os';

export default {
  components: {
    "full-calendar": require("vue-fullcalendar"),
    DisableAndRepairDialog,
    // DialogCheckinVisible,
    RoomManager,
    roomMenu
  },
  data() {
    return {
      moment: moment,
      roomNumber: "",
      checkInTypeMap: checkInTypeMap,
      orderStatusMap: orderStatusMap,
      roomList: [], //房态数据
      roomListSelectData:realTimeRoomInfo,//筛选条件
      roomTypeStart: '',//房态标识
      roomTypeCount: {}, //房态标识房间统计
      roomConfig:{}, //房间配置
      roomType: [], //房间类型
      floorArr: [], //楼层数据
      buildingArr: [], //楼栋数据
      realTimeRoomStatusMap:{},//房态类型
      repairType: [],
      disableRoomType: [],
      channelArr: [], //渠道数据

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
        checkInType: null
      },

      //远期房态
      currentRoom: null,
      meetingEventList: [],
      currentDate: null,
      //快捷操作测试
      oDiv: null,
      mouseInfo: {
        down: { x: 0, y: 0 },
        move: { x: 0, y: 0 },
        up: { x: 0, y: 0 }
      }
    }
  },
  methods: {
    rightClick(item, ev) {
      console.log("鼠标右键点击房间",ev.target);
      this.$refs["roomMenu"].hide();
      // document.getElementsByTagName("pattern-dropdown-li")[0].click();
      // document.removeChild(document.getElementsByClassName("pattern-dropdown-li"))
      this.$refs["roomMenu"].show(item,ev.pageX,ev.pageY);
    },
    ctrlClick(item, index) {
      console.log("ctrl+鼠标点击房间");
      console.log(index, item);
    },
    rowRoomMouseup(e) {
      console.log("鼠标放开");
      console.log(e);
      var txt = "";
      if (document.selection) {
        txt = document.selection.createRange().text; // IE
      } else {
        txt = document.getSelection();
      }
      txt = txt.toString();
      console.log(document.getSelection(), txt);
    },
    leftClick(item, index) {
      console.log("鼠标leftClick");
    },
    mouse() {
      let that = this;
      that.oDiv = document.getElementById("rowRoom");
      console.log(that.oDiv);

      that.oDiv.onmousedown = function(ev) {
        var ev = ev || event;
        if (that.oDiv.setCapture) {
          that.oDiv.setCapture();
          that.mouseInfo = {
            down: { x: 0, y: 0 },
            move: { x: 0, y: 0 },
            up: { x: 0, y: 0 }
          };
        }
        var distanceX = ev.clientX - this.offsetLeft;
        var distanceY = ev.clientY - this.offsetTop;
        console.log("鼠标按下");
        that.mouseInfo.down.x = ev.clientX;
        that.mouseInfo.down.y = ev.clientY;
        document.onmousemove = function(ev) {
          console.log("鼠标移动");
          var ev = ev || event;
          that.mouseInfo.move.x = ev.clientX;
          that.mouseInfo.move.y = ev.clientY;
          that.oDiv.style.left = ev.clientX - distanceX + "px";
          that.oDiv.style.top = ev.clientY - distanceY + "px";
        };
        document.onmouseup = function(ev) {
          console.log("鼠标放开");
          that.mouseInfo.up.x = ev.clientX;
          that.mouseInfo.up.y = ev.clientY;
          document.onmousemove = document.onmouseup = null;
          if (that.oDiv.releaseCapture) {
            that.oDiv.releaseCapture();
          }
        };
      };
    },
    //点击房间
    roomClick(item) {
      console.log("鼠标点击房间");
      this.calendarRoomForwardStatus(item);
      this.roomList.forEach(room => {
        this.$set(room, "connectRoom", false);
        //标识虚线框 arrivalOrderPk
        if (item.orderPk) {
          if (
            item.orderPk == room.orderPk ||
            item.orderPk == room.arrivalOrderPk
          ) {
            this.$set(room, "connectRoom", true);
          }
        }
        if (item.arrivalOrderPk) {
          if (
            item.arrivalOrderPk == room.arrivalOrderPk ||
            item.arrivalOrderPk == room.orderPk
          ) {
            this.$set(room, "connectRoom", true);
          }
        }
      });
    },
    //双击房态
    toCheckin(room) {
      if (room.arrivalOrderPk) {
        //回显订单
        setTimeout(() => {
          this.$refs.checkinDialogRef.initOrderInfo(
            room.arrivalOrderPk,
            "visitor",
            room.arrivalGuestPk
          );
        }, 0);
      } else {
        //办理入住
        setTimeout(() => {
          this.$refs.checkinDialogRef.initEmpty(room);
        }, 0);
      }
    },
    /**
     * 初始化调用，查找房间数据
     * @augments */
    init(val) {
      this.realTimeRoomStatusMap = realTimeRoomStatusMap
      this.realTimeRoomStatus()
    },
    //查询实时房态
    realTimeRoomStatus(){
      let data = this.roomListSelectData;
      realTimeRoomStatus(data).then(res => {

        res.data.room.forEach(data=>{
          
          data.roomList.forEach(obj=>{
            // 空净
            if(obj.roomState == 1){
              if(data.hasOwnProperty('KJ')){
                data['KJ']++
              }else{
                data['KJ'] = 0
              }
            }
            // 空脏
            else if(obj.roomState == 2){
              if(data.hasOwnProperty('KZ')){
                data['KZ']++
              }else{
                data['KZ'] = 0
              }
            }
            // 住净
            else if(obj.roomState == 3){
              if(data.hasOwnProperty('ZJ')){
                data['ZJ']++
              }else{
                data['ZJ'] = 0
              }
            }
            // 住脏
            else if(obj.roomState == 4){
              if(data.hasOwnProperty('ZZ')){
                data['ZZ']++
              }else{
                data['ZZ'] = 0
              }
            }
            //维修
            else if(obj.roomState == 5){
              if(data.hasOwnProperty('WX')){
                data['WX']++
              }else{
                data['WX'] = 0
              }
            }
            //钟点房
            if(obj.checkInType == 1){
              if(data.hasOwnProperty('ZDF')){
                data['ZDF']++
              }else{
                data['ZDF'] = 0
              }
            }
            //特殊房
            else if(obj.checkInType == 2){
              if(data.hasOwnProperty('ZDF')){
                data['ZDF']++
              }else{
                data['ZDF'] = 0
              }
            }
            //免费房
            else if(obj.checkInType == 3){
              if(data.hasOwnProperty('ZDF')){
                data['ZDF']++
              }else{
                data['ZDF'] = 0
              }
            }
            //入住团房
            if(obj.roomRelationType == 3){
              if(data.hasOwnProperty('TD')){
                data['TD']++
              }else{
                data['TD'] = 0
              }
            }
            //预定团房
            else if(obj.arrivalRelationType == 3){
              if(data.hasOwnProperty('TD')){
                data['TD']++
              }else{
                data['TD'] = 0
              }
            }
            //预抵
            if(obj.arrivalFlag == 1){
              if(data.hasOwnProperty('YD')){
                data['YD']++
              }else{
                data['YD'] = 0
              }
            }
            //预离
            if(obj.dueoutFlag == 1){
              if(data.hasOwnProperty('YL')){
                data['YL']++
              }else{
                data['YL'] = 0
              }
            }
            //生日
            if(obj.birthdayFlag == 1){
              if(data.hasOwnProperty('SR')){
                data['SR']++
              }else{
                data['SR'] = 0
              }
            }
            //欠费
            if(obj.oweFlag == 1){
              if(data.hasOwnProperty('QF')){
                data['QF']++
              }else{
                data['QF'] = 0
              }
            }
          })
          this.roomList.push(data)
        })
        this.roomTypeCount = res.data.count
        this.roomList = res.data.room
        // this.$nextTick();
        // this.$forceUpdate();
      });
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
    this.mouse();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
 @import "../../assets/scss/roomPattern.scss";
</style>
