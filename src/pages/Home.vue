<template>
  <div class="container">
     <!-- el-col :span="24" -->
    <!--头部1-->
    <el-col :span="24" class="header1">
      <div class="left" @click="toSelectClass" style="cursor: pointer;">{{activeCompany.companyName}}</div>
      <div class="right">
        <!-- [分销渠道] [系统消息] [互联网房价牌] [微订房] [中央管理系统] 深圳前海豪斯菲尔  -->
        <!-- <span style="cursor:pointer;" @click="getAllTypeList()">[刷新类型]</span>&nbsp;&nbsp;&nbsp;&nbsp; -->
        <span><a @click="manualNight" style="color:#fff;text-decoration:none;">[手动夜审]</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span><a href="https://www.housefeel.cn/file/HFPlugin.rar" style="color:#fff;text-decoration:none;">[插件下载]</a>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span @click="logout">[退出系统]</span>
        <!-- <span @click="dialogVisible = true;ydDialogVisible = true">[预离显示]</span> -->
        <!-- <span @click="logout">[退出系统]</span> -->
      </div>
    </el-col>
    <!--头部2-->
    <el-col :span="24" class="header2">
      <div class="left"><img src="../assets/image/logo.png" /></div>
      <!--<el-col class="right">-->
      <div class="right" ref="dirRef">
        <!-- getRPath('/atrialCenter',1) -->
        
        <router-link to="/atrialCenter" v-if="hasPerm('pms:dir:roomCenter')">
          <div class="nav-li">
            <div class="nav-icon atrial-center-icon"></div>
            <div class="nav-txt">房态中心</div>
          </div>
        </router-link>
        <!-- <router-link to="/wxOpen" v-power:id="'12'">
          <div class="nav-li">
            <div class="nav-icon wx-open-icon"></div>
            <div class="nav-txt">微信开门</div>
          </div>
        </router-link> -->

        <!-- getRPath控制路由  hasPerm控制显示 -->
        <!-- getRPath('/reserveManage', 1) -->
        
        <router-link to="/reserveManage" v-if="hasPerm('pms:dir:reserveManage')">
          <div class="nav-li">
            <div class="nav-icon reserve-manage-icon"></div>
            <div class="nav-txt">预订管理</div>
          </div>
        </router-link>
        <router-link to="/checkInManage" v-if="hasPerm('pms:dir:checkinManage')">
          <div class="nav-li">
            <div class="nav-icon check-manage-icon"></div>
            <div class="nav-txt">入住管理</div>
          </div>
        </router-link>
        <router-link to="/shiftData" v-if="hasPerm('pms:dir:handoverDuty')">
          <div class="nav-li">
            <div class="nav-icon check-manage-icon"></div>
            <div class="nav-txt">交班</div>
          </div>
        </router-link>
        <router-link to="/customerRelation" v-if="hasPerm('pms:dir:customerRelationship')">
          <div class="nav-li">
            <div class="nav-icon customer-relation-icon"></div>
            <div class="nav-txt">客户关系</div>
          </div>
        </router-link>
        <router-link to="/zl" v-if="hasPerm('pms:zl:zlManage')">
          <div class="nav-li">
            <div class="nav-icon customer-relation-icon"></div>
            <div class="nav-txt">直连</div>
          </div>
        </router-link>
        <!-- <router-link to="/smsMarketing" v-power:id="'16'">
          <div class="nav-li">
            <div class="nav-icon sms-marketing-icon"></div>
            <div class="nav-txt">短信营销</div>
          </div>
        </router-link> -->
        <router-link to="/reportCenter" v-if="hasPerm('pms:dir:reportCenter')">
          <div class="nav-li">
            <div class="nav-icon report-center-icon"></div>
            <div class="nav-txt">报表中心</div>
          </div>
        </router-link>
        <router-link to="/financialAudit" v-if="screenWidth > 1010 && hasPerm('pms:dir:finance')" >
          <div class="nav-li">
            <div class="nav-icon financial-audit-icon"></div>
            <div class="nav-txt">财务稽核</div>
          </div>
        </router-link>
        <router-link to="/dumbHouse" v-if="screenWidth > 1080 && hasPerm('pms:dir:dumbRoomAccount')" >
          <div class="nav-li">
            <div class="nav-icon dumb-house-icon"></div>
            <div class="nav-txt">哑房账</div>
          </div>
        </router-link>
        <!-- <router-link to="/commodityDept" v-if="screenWidth > 1160" v-power:id="'20'">
          <div class="nav-li">
            <div class="nav-icon commodity-dept-icon"></div>
            <div class="nav-txt">商品部</div>
          </div>
        </router-link> -->
        <router-link to="/stock" v-if="screenWidth > 1230 && hasPerm('pms:dir:stock')">
          <div class="nav-li">
            <div class="nav-icon stock-icon"></div>
            <div class="nav-txt">库存</div>
          </div>
        </router-link>
        <router-link to="/conferenceRoom" v-if="screenWidth > 1320 && hasPerm('pms:dir:meetingRoom')" >
          <div class="nav-li">
            <div class="nav-icon conference-room-icon"></div>
            <div class="nav-txt">会议室</div>
          </div>
        </router-link>
        <router-link to="/roomService" v-if="screenWidth > 1390 && hasPerm('pms:dir:roomService')">
          <div class="nav-li">
            <div class="nav-icon linen-icon"></div>
            <div class="nav-txt">房务管理</div>
          </div>
        </router-link>
        <!-- <router-link to="/operators" v-if="screenWidth > 1390" v-power:id="'23'"> -->
        <router-link to="/operators" v-if="hasPerm('pms:dir:operatorManage')">
          <div class="nav-li">
            <div class="nav-icon operators-icon"></div>
            <div class="nav-txt">操作员管理</div>
          </div>
        </router-link>
        <!-- <router-link to="/systemSet" v-if="screenWidth > 1470" v-power:id="'24'"> -->
        <router-link to="/systemSet" v-if="hasPerm('pms:dir:systemSet')">
          <div class="nav-li">
            <div class="nav-icon system-set-icon"></div>
            <div class="nav-txt">系统设置</div>
          </div>
        </router-link>
        
        <!-- <router-link to="/linen" v-if="screenWidth > 1500" v-power:id="'25'">
          <div class="nav-li">
            <div class="nav-icon linen-icon"></div>
            <div class="nav-txt">布草</div>
          </div>
        </router-link> -->
        <!-- <router-link to="" style="background:#f60;" v-show="screenWidth < 1500">
          <el-popover ref="popover1" 
          popper-class='router_nav_popover' 
          placement="bottom-start" 
          width="140" 
          trigger="hover">
          <router-link to="/dumbHouse" v-if="screenWidth < 1080 " v-power:id="'19'">
            <div class="nav-li">
              <div class="nav-icon dumb-house-icon"></div>
              <div class="nav-txt">哑房账</div>
            </div>
          </router-link>
            <router-link to="/commodityDept" v-if="screenWidth < 1160" v-power:id="'20'">
              <div class="nav-li">
                <div class="nav-icon commodity-dept-icon"></div>
                <div class="nav-txt">商品部</div>
              </div>
            </router-link>
            <router-link to="/conferenceRoom" v-if="screenWidth < 1320" v-power:id="'22'">
              <div class="nav-li">
                <div class="nav-icon conference-room-icon"></div>
                <div class="nav-txt">会议室</div>
              </div>
            </router-link>
            <router-link to="/linen" v-if="screenWidth < 1500" v-power:id="'25'">
              <div class="nav-li">
                <div class="nav-icon linen-icon"></div>
                <div class="nav-txt">布草</div>
              </div>
            </router-link>
          </el-popover> 
          <div class="nav-li" v-popover:popover1>
            <div class="nav-icon more-icon"></div>
            <div class="nav-txt">更多</div>
          </div>
        </router-link> -->
      </div>
    </el-col>
    <!-- tab标签切换页面显示 -->
    <el-col :span="24" class="house-content">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
      <audio id="audio" src="http://www.housefeel.cn/Control/File/mp3/yuyintishi.mp3"></audio>
    </el-col>
    <el-col :span="24" class="line-footer">
      <!-- 酒店编码：{{footerData.companyCode}} &nbsp;&nbsp;&nbsp; -->
      {{activeCompany.companyName}}
      
      <span
        style="float:right"
      >操作员：{{footerData.realName}}</span>
      <span
        style="float:right"
      >夜审</span>
      <span
        style="float:right"
      >营业日期：{{footerData.bussinessDate}}</span>
    </el-col>

    <div class="asd">
      <el-dialog
        title="预定提醒"
        :center="true"
        style="position: absolute;width:480px;left: calc(100% - 480px);top: auto;padding:0;"
        top="0"
        :modal="false"
        custom-class="ylDialog"
        :modal-append-to-body="false"
        :visible.sync="ydDialogVisible"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="480px"
      >
        <el-table :data="ydList" height="200px" @row-click="showOrderInfo">
          <el-table-column align="center" prop="channelTypeName" label="渠道" width="80"></el-table-column>
          <el-table-column align="center" prop="guestName" label="客人" width="60"></el-table-column>
          <el-table-column align="center" label="预定时间">
            <template slot-scope="scope">{{scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm')}}</template>
          </el-table-column>
          <el-table-column align="center" prop="roomTypeName" label="房型"></el-table-column>
          <el-table-column align="center" prop="currPrice" label="价格" width="60"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="离店提醒"
        :center="true"
        style="position: absolute;width:488px;left: calc(100% - 488px);top: auto;padding:0;"
        top="0"
        :modal="false"
        custom-class="ylDialog"
        :modal-append-to-body="false"
        :visible.sync="dialogVisible"
        :append-to-body="false"
        :close-on-click-modal="false"
        width="488px"
      >
        <el-table :data="ylList" height="200px" @row-click="toDialogVisible">
          <el-table-column align="center" prop="channelName" label="渠道" width="80"></el-table-column>
          <el-table-column align="center" prop="guestName" label="客人" width="80"></el-table-column>
          <el-table-column align="center" prop="roomNumber" label="房号" width="80"></el-table-column>
          <el-table-column align="center" prop="roomTypeName" label="房型" width="80"></el-table-column>
          <el-table-column align="center" label="预离时间" width="114">
            <template slot-scope="scope">{{scope.row.guestEndDate | dateFormat('YYYY-MM-DD HH:mm')}}</template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <DialogCheckinVisible ref="checkinDialogRef" v-on:closecheckin="getCurrentRoomList()"/>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      :close-on-press-escape="false"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <span>系统正在夜审...</span>
    </el-dialog>

    <MessageRemind></MessageRemind>
  </div>
</template>

<script>
import "../../static/img/user.png";
import "@/utils/sockjs.min.js";
import "@/utils/stomp.min.js";
import moment from "moment";
import {manualNight} from '@/api/atrialCenter/roomStatusController'
import { nightTrialTime } from "@/utils/orm";
import { timerCheckNew } from "@/api/hfApi/hfApiOrderController";
import { logout, refreshTokenUpms, validateToken } from "@/api/upmsApi";
import {
  currentRoomList,
  updateRoomStatus,
  addRoomReason,
  delRoomReason,
  findRoomReason,
  loadOrderInfo
} from "@/api/roomStatus/pmsRoomStatusController";
import { find } from "@/api/systemSet/pmsParamConfigController";
import { getNewGuestOrder } from "@/api/utils/pmsTimerController";
import { allTypeList } from "@/api/utils/pmsTypeController";
import { Message } from "element-ui";
import DialogCheckinVisible from "@/pages/reserveManage/order/OrderDialog";
import MessageRemind from "@/pages/messageRemind/Tab";

export default {
  components: { DialogCheckinVisible, MessageRemind },
  created() {
    var test = window.localStorage.getItem("current_logon_company");
    if (test) {
      this.activeCompany = JSON.parse(test);
    }
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userinfo = JSON.parse(localStorage.getItem("pms_userinfo"));
    this.footerData.companyCode = this.activeCompany.companyCode;
    this.footerData.realName = this.userinfo.realName;
    this.footerData.currTime = moment().format("dddd MM月DD日 HH:mm");
    this.footerData.bussinessDate =
      moment().hour() >= nightTrialTime
        ? moment().format("YYYY-MM-DD")
        : moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD");
    setInterval(() => {
      this.footerData.currTime = moment().format("dddd MM月DD日 HH:mm");
    }, 2000);
    setInterval(() => {
      this.footerData.bussinessDate =
        moment().hour() >= nightTrialTime
          ? moment().format("YYYY-MM-DD")
          : moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD");
    }, 30 * 60 * 1000);
    // this.validateToken()
    this.nightTrialTask();
  },
  data() {
    return {
      moment: moment,
      contInterval: null,
      collapsed: false,
      screenWidth: document.body.clientWidth,
      activeCompany: {},
      stompClient: null,
      bussinessDate: null,
      userinfo: null,
      footerData: {
        companyCode: null,
        bussinessDate: null,
        realName: null,
        currTime: null
      },
      timer: null,
      timer2: null,
      timer3: null,
      ylList: [],
      ydList: [],
      dialogVisible: false,
      ydDialogVisible: false,
      nightTrialTimer: null,
      nightTrialTimer2: null,
      nightTrialFlag: false,
      centerDialogVisible: false,
      msg: null
    };
  },
  methods: {
    manualNight() {
      this.$confirm('是否执行夜审，已夜审过的数据不会重复执行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        manualNight({companyPk:this.activeCompany.companyPk}).then(res=>{
          this.$message.success("夜审执行完毕")
        })
      });
      
    },
    nightTrialTask() {
      this.nightTrialTimer2 = setInterval(() => {
        var date2 = new Date();
        if (date2.getHours() == 5 || date2.getHours() == 6) {
          this.nightTrialTimer = setInterval(() => {
            var date = new Date();
            // console.log(date.getHours()+"  "+date.getMinutes()+"  "+date.getSeconds())
            if (
              date.getHours() == 6 &&
              date.getMinutes() <= 0 &&
              date.getSeconds() < 20
            ) {
              if (!this.nightTrialFlag) {
                this.centerDialogVisible = true;
                this.nightTrialFlag = true;
              }
            } else {
              if (
                date.getHours() >= 6 &&
                date.getMinutes() >= 0 &&
                date.getSeconds() > 20
              ) {
                clearInterval(this.nightTrialTimer);
              }
              this.centerDialogVisible = false;
              this.nightTrialFlag = false;
            }
          }, 1000);
        }
      }, 1000 * 60 * 30);

      var date2 = new Date();
      if (date2.getHours() == 5 || date2.getHours() == 6) {
        this.nightTrialTimer = setInterval(() => {
          var date = new Date();
          // console.log(date.getHours()+"  "+date.getMinutes()+"  "+date.getSeconds())
          if (
            date.getHours() == 6 &&
            date.getMinutes() <= 0 &&
            date.getSeconds() < 20
          ) {
            if (!this.nightTrialFlag) {
              this.centerDialogVisible = true;
              this.nightTrialFlag = true;
            }
          } else {
            if (
              date.getHours() >= 6 &&
              date.getMinutes() >= 0 &&
              date.getSeconds() > 20
            ) {
              clearInterval(this.nightTrialTimer);
            }
            // console.log(false)
            this.centerDialogVisible = false;
            this.nightTrialFlag = false;
          }
        }, 1000);
      }
    },
    click(id) {
      alert(id);
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {},
    newOrder() {
      var self = this;
      setInterval(() => {
        console.log("123");
        if (window.localStorage.getItem("token")) {
          timerCheckNew().then(data => {
            if (data.data > 0) {
              if (self.contInterval != null) {
                self.contInterval.close();
              }
              self.contInterval = self.$notify.success({
                title: "新订单",
                message: "豪斯菲尔来新订单了",
                duration: 0,
                onClick: () => {
                  this.$router.push("/reserveManage/listReserve");
                }
              });
              var audio = document.getElementById("audio");
              if (audio) {
                audio.play();
              }
            }
          });
        }
      }, 5000);
    },
    // 退出登录
    getAllTypeList() {
      this.refreshType();
    },
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          logout()
            .then(res => {})
            .finally(() => {
              localStorage.setItem("select_company_pk", "");
              localStorage.setItem("select_shift_pk", "");
              localStorage.setItem("current_logon_company", "");
              localStorage.setItem("pms_userinfo", "");
              localStorage.setItem("token", "");
              sessionStorage.removeItem("orderIsNew");
              sessionStorage.removeItem("isTime");
              this.$router.push("/login");
            });
        })
        .catch(() => {});
    },
    // 折叠导航栏
    collapse() {
      this.collapsed = !this.collapsed;
    },
    toSelectClass() {
      this.$router.push("/classSelection");
    },
    connection() {
      var self = this;
      var socket = new SockJS(
        "https://www.housefeel.cn:8888/gs-guide-websocket"
      );
      self.stompClient = Stomp.over(socket);
      self.stompClient.connect(
        { name: localStorage.getItem("userPk") },
        function(frame) {
          console.log("Connected: " + frame);
          console.log(
            JSON.parse(localStorage.getItem("pms_userinfo")).companyPk
          );
          self.stompClient.subscribe(
            "/topic/message/" +
              JSON.parse(localStorage.getItem("pms_userinfo")).companyPk,
            function(greeting) {
              self.newOrders();
            }
          );
          self.stompClient.subscribe("/topic/message", function(greeting) {
            if (JSON.parse(greeting.body).type == "notification") {
              self.notifiModel(JSON.parse(greeting.body));
            }
          });
        },
        function() {
          setTimeout(function() {
            connection();
          }, 2000);
        }
      );
    },
    newOrders() {
      var self = this;
      var Notification =
        window.Notification ||
        window.mozNotification ||
        window.webkitNotification;
      if (Notification) {
        Notification.requestPermission(function(status) {
          if (status != "granted") {
            return;
          } else {
            var tag = "sds" + Math.random();
            // Notification.body = msg;
            //notifyObj属于Notification构造方法的实例对象
            var notifyObj = new Notification("新订单(PMS)", {
              dir: "auto",
              lang: "zh-CN",
              tag: tag, //实例化的notification的id
              icon: "../../static/img/logo(2).png", //icon的值显示通知图片的URL
              body: "豪斯菲尔来新订单了"
            });
            notifyObj.onclick = function() {
              //如果通知消息被点击,通知窗口将被激活
              window.focus();
              self.$router.push("/reserveManage/listReserve");
              notifyObj.close();
              // alert(11);
            };
            notifyObj.onerror = function() {
              console.log("桌面消息出错！！！请联系管理员");
            };
            notifyObj.onclose = function() {};
          }
        });
      } else {
        console.log("您的浏览器不支持桌面消息!");
      }
      var audio = document.getElementById("audio");
      if (audio) {
        audio.play();
      }
    },
    notifiModel(message) {
      var Notification =
        window.Notification ||
        window.mozNotification ||
        window.webkitNotification;
      if (Notification) {
        Notification.requestPermission(function(status) {
          if (status != "granted") {
            return;
          } else {
            var tag = "sds" + Math.random();
            // Notification.body = msg;
            //notifyObj属于Notification构造方法的实例对象
            var notifyObj = new Notification(message.title + "(PMS)", {
              dir: "auto",
              lang: "zh-CN",
              tag: tag, //实例化的notification的id
              icon: "../../static/img/logo(2).png", //icon的值显示通知图片的URL
              body: message.content
            });
            notifyObj.onclick = function() {
              //如果通知消息被点击,通知窗口将被激活
              window.focus();
              notifyObj.close();
              // alert(11);
            };
            notifyObj.onerror = function() {
              console.log("桌面消息出错！！！请联系管理员");
            };
            notifyObj.onclose = function() {};
          }
        });
      } else {
        console.log("您的浏览器不支持桌面消息!");
      }
    },
    //预离查询等
    sysParmInit() {
      var tempSysParm = JSON.parse(localStorage.getItem("sysParm"));
      //每天只获取一次
      if (
        tempSysParm == null ||
        tempSysParm.queryTime != moment().format("YYYY-MM-DD")
      ) {
        find().then(res => {
          var sysParm = res.data;
          sysParm.queryTime = moment().format("YYYY-MM-DD");
          localStorage.setItem("sysParm", JSON.stringify(sysParm));
          this.getCurrentRoomList();
        });
      }
    },
    initAlert() {
      //预离提示
      this.timer = setInterval(() => {
        this.alertMessage();
        this.sysParmInit();
      }, 1000 * 10);
      //房态信息
      this.timer2 = setInterval(() => {
        this.getCurrentRoomList();
        this.getNewGuestOrder();
      }, 1000 * 20);
    },
    ydAlert() {
      console.log("预抵提醒");
      var roomList = JSON.parse(localStorage.getItem("roomList"));
      if (roomList == null) {
        this.getCurrentRoomList();
        return;
      }
      var ydList2 = [];
      //备份当前数据
      var tempYdList = JSON.parse(JSON.stringify(this.ydList));
      this.ydList = [];
      roomList.forEach(item => {
        //预抵且没显示过
        if (item.arrivalOrderPk && item.arrivalGuestPk && !item.showFlag) {
          this.ydList.push(item);
        }
        // //预抵且显示过
        if (item.arrivalOrderPk && item.arrivalGuestPk && item.showFlag) {
          ydList2.push(item);
        }
        this.$set(item, "showFlag", "N");
      });
      localStorage.setItem("roomList", JSON.stringify(roomList));
      // this.ydDialogVisible = false
      if (!this.ydDialogVisible) {
        this.ydDialogVisible = this.ydList.length > 0 ? true : false;
      }
      //有新的预抵订单，显示全部
      if (this.ydList.length > 0) {
        this.ydList = this.ydList.concat(ydList2);
        this.ydDialogVisible = true;
      } else {
        this.ydList = ydList2;
      }
    },
    alertMessage() {
      var sysParm = JSON.parse(localStorage.getItem("sysParm"));
      //提醒时间
      var statisticsData = localStorage.getItem("statisticsData");
      if (sysParm) {
        //今天已提醒
        if (
          statisticsData != null &&
          statisticsData == moment().format("YYYY-MM-DD")
        ) {
          console.log("今天已提醒");
          return;
        }
        //系统设置退房结束时间
        var tempDate =
          moment().format("YYYY-MM-DD") + " " + sysParm.checkoutTime;
        //当前时间
        var checkoutTime = new Date(tempDate);
        var now = new Date();
        //系统设置退房时间-当前时间
        if (now < checkoutTime) {
          if (
            parseInt(checkoutTime - now) / 1000 / 60 <
            sysParm.checkoutReminderTime
          ) {
            var roomList = JSON.parse(localStorage.getItem("roomList"));
            if (roomList == null) {
              this.getCurrentRoomList();
              return;
            }
            var i = 0;
            this.ylList = [];
            roomList.forEach(item => {
              if (item.leaveFlag) {
                this.ylList.push(item);
                // i++;
                // setTimeout(() => {
                //   this.$notify({
                //     title: '预离提醒',
                //     message: item.roomNumber+'号房客人:'+item.guestName+'即将离店',
                //     position: 'bottom-right',
                //     duration:0
                //   });
                // },1000 * i)
              }
            });
            this.dialogVisible = false;
            if (this.ylList.length > 0) {
              this.dialogVisible = true;
            }
            var data = moment().format("YYYY-MM-DD");
            console.log(moment().format("YYYY-MM-DD") + "提醒客人退房");
            localStorage.setItem("statisticsData", data);
          }
        }
      }
    },
    getNewGuestOrder() {
      var now = moment().format("YYYY-MM-DD HH:mm:ss");
      var data = {
        queryTime: now
      };
      if (localStorage.getItem("orderQueryTime")) {
        data.queryTime = localStorage.getItem("orderQueryTime");
      }
      if (sessionStorage.getItem("orderIsNew") == null) {
        data.isNew = "Y";
      }
      getNewGuestOrder(data).then(res => {
        this.ydList = res.data.data;
        this.ydDialogVisible = false;
        if (res.data.isNew == "Y" && this.ydList.length > 0) {
          this.ydDialogVisible = true;
        }
        sessionStorage.setItem("orderIsNew", "N");
        localStorage.setItem("orderQueryTime", now);
      });
    },
    getCurrentRoomList() {
      let data = {};
      if (
        localStorage.getItem("queryTime") &&
        localStorage.getItem("roomList") &&
        sessionStorage.getItem("isTime")
      ) {
        data.queryTime = localStorage.getItem("queryTime");
      }
      sessionStorage.setItem("isTime", true);
      //根据最后访问时间  查询最后查询之后修改过的数据
      currentRoomList(data).then(res => {
        res.data.forEach(item => {
          //标识预离
          let now =
            moment().hour() >= nightTrialTime
              ? moment()
              : moment().subtract(1, "days");
          if (
            item.guestEndDate &&
            moment(item.guestEndDate).format("YYYY-MM-DD") <=
              now.format("YYYY-MM-DD")
          ) {
            this.$set(item, "leaveFlag", true);
          } else {
            this.$set(item, "leaveFlag", null);
          }
        });
        //后续访问
        if (localStorage.getItem("roomList")) {
          var roomList = JSON.parse(localStorage.getItem("roomList"));
          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < roomList.length; j++) {
              if (res.data[i].roomStatePk == roomList[j].roomStatePk) {
                roomList[j] = JSON.parse(JSON.stringify(res.data[i]));
                break;
              }
            }
          }
          localStorage.setItem("roomList", JSON.stringify(roomList));
          //第一次访问
        } else {
          localStorage.setItem("roomList", JSON.stringify(res.data));
        }
        //设置最后查询时间
        localStorage.setItem(
          "queryTime",
          moment().format("YYYY-MM-DD HH:mm:ss")
        );
      });
    },
    showOrderInfo(room) {
      //回显订单
      setTimeout(() => {
        this.$refs.checkinDialogRef.initOrderInfo(
          room.orderPk,
          "visitor",
          room.guestOrderPk
        );
      }, 0);
    },
    toDialogVisible(item) {
      setTimeout(() => {
        this.$refs.checkinDialogRef.initOrderInfo(
          item.orderPk,
          "visitor",
          item.guestOrderPk
        );
      }, 0);
    }
  },
  mounted() {
    this.getAllTypeList();
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    //scoket 刷新
    // this.connection();
    //定时检测新订单
    // this.newOrder();
    //定时5分钟刷新一次token
    // this.refreshToken(300000);

    //选中第一个显示的目录
    console.log(this.$refs.dirRef.getElementsByTagName("a")[0]);
    let herf = this.$refs.dirRef
      .getElementsByTagName("a")[0]
      .getAttribute("href");
    this.$router.push(herf.substring(1));
    this.initAlert();
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    }
  },
  filters: {
    dateFormat(val, parm) {
      return moment(new Date(val)).format(parm);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
  }
};
</script>

<style lang="scss">
$color-primary: #21324E; //#18c79c #20a0ff
$background-color: #1F3D6B;
.ylDialog {
  bottom: 0;
  width: 300px;
  border: 1px solid $color-primary;
  .el-dialog__header {
    color: white;
    background-color: $background-color;
    padding: 10px;
  }
  .el-dialog__body {
    padding: 0 0px;
  }
  .el-dialog__title {
    color: white;
    font-size: 15px;
    line-height: 15px;
  }
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    .el-dialog__close {
      color: white;
    }
  }
  .el-table {
    .cell {
      font-size: 12px;
      padding: 0;
    }
  }
}
</style>


<style lang="scss" scoped rel="stylesheet/scss" type="text/css">
@import "../assets/scss/main.scss";
</style>
<style lang="scss">
@import "../assets/scss/scroll.scss";
.router_nav_popover {
  background: rgba(0, 0, 0, 0.8);
  border: none;
  &.el-popper[x-placement^="bottom"] {
    .popper__arrow {
      border-bottom-color: rgba(0, 0, 0, 0.8);
      &::after {
        border-bottom-color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
.el-table {
  td {
    padding: 6px 0;
  }
}
.el-button:focus, .el-button:hover{
  color: #fff;
  border-color: #21324E;
  background-color: #1F3D6B;
}
.el-tabs__nav-scroll {
  padding: 0 10px;
}
.el-tabs__item {
  &:hover {
    color: #21324E;
  }
  &.is-active {
    color: #21324E;
  }
}
.el-tabs__active-bar {
  background-color: #21324E;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item:hover,
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #21324E;
}



.height-programme-one,
.height-programme-one .el-tabs,
.height-programme-one .el-tabs .el-tabs__content {
  height: 100%;
}
.height-programme-one{
  .aLayerOfPage {
    height: calc(100% - 80px);
    overflow: auto;
  }
  .twoLayerOfPage {
    height: 100%;
    .height-programme-one{
      .el-tabs{
        .el-tabs__content {
          height: calc(100% - 120px);
          overflow: auto;
        }
      }
    }
  }
}
.el-input__prefix {
  left: -2px;
  .el-input__inner {
    padding: 0 5px;
    padding-left: 19px;
  }
}
.el-input--suffix {
  .el-input__inner {
    padding-right: 13px;
  }
}
.el-menu--horizontal {
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
.menu-content {
  overflow-y: scroll;
  height: calc(100% - 42px);
  padding: 10px;
}
.primary-tool {
  padding: 10px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #eceaea;
}
</style>

