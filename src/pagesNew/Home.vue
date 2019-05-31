<template>
  <div class="container">
    <!--头部2-->
    <div class="header2">
      <div class="left">
        <img src="../assets/image/logo.png">
      </div>
      <!--<el-col class="right">-->
      <div class="right" ref="dirRef">
        <div v-for="(v,i) in router" :key="i" class="menuDiv">
          <router-link :class="routerActive(v.path)" :to="v.path" v-if="i>0&& v.hidden && hasPerm(v.prem)">
            <div class="nav-li">
              <img :src="v.icon" class="nav-img"/>
              <div class="nav-txt">{{v.name}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
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
    <!-- <DialogCheckinVisible ref="checkinDialogRef" v-on:closecheckin="getCurrentRoomList()"/> -->
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

    <!-- <MessageRemind></MessageRemind> -->
  </div>
</template>

<script>
import "../../static/img/user.png";
import "@/utils/sockjs.min.js";
import "@/utils/stomp.min.js";
import moment from "moment";
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
import { find } from "@/api/systemSet/pmsSysParamController";
import { getNewGuestOrder } from "@/api/utils/pmsTimerController";
import { allTypeList } from "@/api/utils/pmsTypeController";
import { Message } from "element-ui";
// import DialogCheckinVisible from "@/pages/bookingForm/order/OrderDialog";
// import MessageRemind from "@/pages/messageRemind/Tab";

import Home from "@/router/home/index";

export default {
  components: { },
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
      router: Home.children,
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
    routerActive(path){
      let matched = this.$route.matched
      let parent = matched[matched.length-1]
      if(parent.path == path){
        console.log(parent.path,path);
          return 'active'
      }
      return ''
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
    // console.log(this.$refs.dirRef.getElementsByTagName("a")[0]);
    // let herf = this.$refs.dirRef
    //   .getElementsByTagName("a")[0]
    //   .getAttribute("href");
    // this.$router.push(herf.substring(1));
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

<style lang="scss" scoped rel="stylesheet/scss" type="text/css">
@import "../assets/scss/main.scss";
</style>
<style lang="scss">
@import "../assets/scss/public.scss";
</style>

