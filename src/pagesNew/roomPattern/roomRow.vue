<template>
    <div id="rowRoom" class="rowRoom" >
        <div class="floorstorey" v-for="(ite, index) in roomList" :key="index">
            <div class="title" v-if='ite.buildingName || ite.storeyName'>
                {{ite.buildingName?ite.buildingName:''}}{{ite.storeyName?ite.storeyName+'层':''}}
                <span>
                    （
                    <span v-if="ite['KJ']">空净{{ite['KJ']}}间</span>
                    <span v-if="ite['KZ']">空脏{{ite['KZ']}}间</span>
                    <span v-if="ite['ZJ']">住净{{ite['ZJ']}}间</span>
                    <span v-if="ite['ZZ']">住脏{{ite['ZZ']}}间</span>
                    <span v-if="ite['WX']">维修{{ite['WX']}}间</span>
                    <span v-if="ite['YD']">预抵{{ite['YD']}}间</span>
                    <span v-if="ite['YL']">预离{{ite['YL']}}间</span>
                    <span v-if="ite['QF']">欠费{{ite['QF']}}间</span>
                    <span v-if="ite['SR']">生日{{ite['SR']}}间</span>
                    <span v-if="ite['TD']">团队{{ite['TD']}}间</span>
                    <span v-if="ite['ZDF']">钟点房{{ite['ZDF']}}间</span>
                    <span v-if="ite['MFF']">免费房{{ite['MFF']}}间</span>
                    <span v-if="ite['TSF']">特殊房{{ite['TSF']}}间</span>
                    ）
                </span>
            </div>
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
        <!-- 右键菜单 -->
        <roomMenu ref="roomMenu"></roomMenu>
    </div>
</template>
<script>
import moment from "moment";
import { roomStatusMap,realTimeRoomStatusMap,checkInTypeMap, orderStatusMap } from "@/utils/orm";
import { realTimeRoomInfo } from "@/dto/realTimeRoomInfo";
import { realTimeRoomStatus, loadOrderInfo } from "@/api/roomStatus/pmsRoomStatusController";
//=====================组件==========================
//右键菜单
import roomMenu from "$pages/roomPattern/roomMenu";

export default {
  components: {
    roomMenu
  },
  data() {
    return {
      moment: moment,
      roomNumber: "",
      checkInTypeMap: checkInTypeMap,
      orderStatusMap: orderStatusMap,
      roomList: [], //房态数据
      roomListSelectData: realTimeRoomInfo,//筛选条件

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
    //   this.calendarRoomForwardStatus(item);
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
      this.$emit("roomClick",item)
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
        this.roomListSelectData = val
        this.realTimeRoomStatus()
    },
    //查询实时房态
    realTimeRoomStatus(){
      realTimeRoomStatus(this.roomListSelectData).then(res => {
        this.$emit("roomTypeCount",res.data.count)
        this.roomList = this.statisticsRoomIdentify(res.data.room)
      });
    },
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
    /**
     * 统计每个状态标识的数量
     */
    statisticsRoomIdentify(list){
        list.forEach(data=>{
          data.roomList.forEach(obj=>{
            //获取房间状态标识
            let val = this.getIdentifying(obj)
            //汇总每个状态标识的数量
            if(data.hasOwnProperty(val)){
                data[val]++
            }else{
                data[val] = 0
            }
          })
        })
        return list
    },
   /**
    * 获取标识
    */
    getIdentifying(obj){
        let val = 'KJ'
        // 空净
        if(obj.roomState == 1){
            val = 'KJ'
        }
        // 空脏
        else if(obj.roomState == 2){
            val = 'KZ'
        }
        // 住净
        else if(obj.roomState == 3){
            val = 'ZJ'
        }
        // 住脏
        else if(obj.roomState == 4){
            val = 'ZZ'
        }
        //维修
        else if(obj.roomState == 5){
            val = 'WX'
        }
        //钟点房
        if(obj.checkInType == 1){
            val = 'ZDF'
        }
        //特殊房
        else if(obj.checkInType == 2){
            val = 'TSF'
        }
        //免费房
        else if(obj.checkInType == 3){
            val = 'MFF'
        }
        //入住团房 || 预定团房
        if(obj.roomRelationType == 3 || obj.arrivalRelationType == 3){
            val = 'TD'
        }
        //预抵
        if(obj.arrivalFlag == 1){
           val = 'YD'
        }
        //预离
        if(obj.dueoutFlag == 1){
           val = 'YL'
        }
        //生日
        if(obj.birthdayFlag == 1){
            val = 'SR'
        }
        //欠费
        if(obj.oweFlag == 1){
            val = 'QF'
        }
        return val
    },
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
    //联房
    joinRoom(item) {
      if (item.orderPk) {
        this.$refs.joinRoomDialogRef.showDialog(item.orderPk);
      } else if (item.arrivalOrderPk) {
        this.$refs.joinRoomDialogRef.showDialog(item.arrivalOrderPk);
      }
    },
    //房间管理弹窗 维修、停用
    clickRoomManager() {
      this.$refs.roomManagerRef.showDialog();
    },
  },
  mounted() {
    this.init();
    this.mouse();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
 @import "../../assets/scss/roomPattern.scss";
</style>
