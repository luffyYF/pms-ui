<template>
  <el-row class="container">
    <!--头部1-->
    <el-col :span="24" class="header1">
      <div class="left" @click="toSelectClass" style="cursor: pointer;">{{activeCompany.companyName}}</div>
      <div class="right">
        <!-- [分销渠道] [系统消息] [互联网房价牌] [微订房] [中央管理系统] 深圳前海豪斯菲尔  -->
        <span @click="logout" >[退出系统]</span>
      </div>
    </el-col>
    <!--头部2-->
    <el-col :span="24" class="header2">
      <div class="left"><img src="../assets/image/home_logo.png" /></div>
      <!--<div class="right">-->
      <div class="right">
        <router-link to="/atrialCenter" v-power:id="'11'">
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
        <router-link to="/reserveManage" v-power:id="'13'">
          <div class="nav-li">
            <div class="nav-icon reserve-manage-icon"></div>
            <div class="nav-txt">预订管理</div>
          </div>
        </router-link>
        <router-link to="/checkInManage" v-power:id="'14'">
          <div class="nav-li">
            <div class="nav-icon check-manage-icon"></div>
            <div class="nav-txt">入住管理</div>
          </div>
        </router-link>
        <router-link to="/customerRelation" v-power:id="'15'">
          <div class="nav-li">
            <div class="nav-icon customer-relation-icon"></div>
            <div class="nav-txt">客户关系</div>
          </div>
        </router-link>
        <!-- <router-link to="/smsMarketing" v-power:id="'16'">
          <div class="nav-li">
            <div class="nav-icon sms-marketing-icon"></div>
            <div class="nav-txt">短信营销</div>
          </div>
        </router-link> -->
        <router-link to="/reportCenter" v-power:id="'17'">
          <div class="nav-li">
            <div class="nav-icon report-center-icon"></div>
            <div class="nav-txt">报表中心</div>
          </div>
        </router-link>
        <!-- <router-link to="/financialAudit" v-if="screenWidth > 1010" v-power:id="'18'">
          <div class="nav-li">
            <div class="nav-icon financial-audit-icon"></div>
            <div class="nav-txt">财务稽核</div>
          </div>
        </router-link> -->
        <router-link to="/dumbHouse" v-if="screenWidth > 1080" v-power:id="'19'">
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
        <!-- <router-link to="/stock" v-if="screenWidth > 1230" v-power:id="'21'">
          <div class="nav-li">
            <div class="nav-icon stock-icon"></div>
            <div class="nav-txt">库存</div>
          </div>
        </router-link> -->
        <router-link to="/conferenceRoom" v-if="screenWidth > 1320" v-power:id="'22'">
          <div class="nav-li">
            <div class="nav-icon conference-room-icon"></div>
            <div class="nav-txt">会议室</div>
          </div>
        </router-link>
        <!-- <router-link to="/operators" v-if="screenWidth > 1390" v-power:id="'23'"> -->
        <router-link to="/operators" v-power:id="'23'">
          <div class="nav-li">
            <div class="nav-icon operators-icon"></div>
            <div class="nav-txt">操作员管理</div>
          </div>
        </router-link>
        <!-- <router-link to="/systemSet" v-if="screenWidth > 1470" v-power:id="'24'"> -->
        <router-link to="/systemSet"  v-power:id="'24'">
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
          <router-link to="/financialAudit" v-if="screenWidth < 1010" v-power:id="'18'">
            <div class="nav-li">
              <div class="nav-icon financial-audit-icon"></div>
              <div class="nav-txt">财务稽核</div>
            </div>
          </router-link>
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
            <router-link to="/stock" v-if="screenWidth < 1230" v-power:id="'21'">
              <div class="nav-li">
                <div class="nav-icon stock-icon" ></div>
                <div class="nav-txt">库存</div>
              </div>
            </router-link>
            <router-link to="/conferenceRoom" v-if="screenWidth < 1320" v-power:id="'22'">
              <div class="nav-li">
                <div class="nav-icon conference-room-icon"></div>
                <div class="nav-txt">会议室</div>
              </div>
            </router-link>
            <router-link to="/operators" v-if="screenWidth < 1390" v-power:id="'23'">
              <div class="nav-li">
                <div class="nav-icon operators-icon"></div>
                <div class="nav-txt">操作员管理</div>
              </div>
            </router-link>
            <router-link to="/systemSet" v-if="screenWidth < 1470" v-power:id="'24'">
              <div class="nav-li">
                <div class="nav-icon system-set-icon"></div>
                <div class="nav-txt">系统设置</div>
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
    <el-col class="house-content" :span="24" >
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
      <audio id="audio" src="http://www.housefeel.cn/Control/File/mp3/yuyintishi.mp3"></audio>
    </el-col>
  </el-row>
</template>

<script>
import store from "@/store";
import "../../static/img/user.png";
import {timerCheckNew} from "@/api/hfApi/hfApiOrderController";
import {getToken, removeToken, removeRefreshToken} from '@/utils/auth'
import "@/utils/sockjs.min.js"
import "@/utils/stomp.min.js"
export default {
  created() {
    // this.newOrder();
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    console.log(this.activeCompany);
  },
  data() {
    return {
      contInterval:null,
      routes: store.getters.permission_routers,
      collapsed: false,
      screenWidth: document.body.clientWidth,
      activeCompany: {},
      stompClient: null
    };
  },
  methods: {
    click(id){alert(id)},
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {},
    newOrder(){
      var self = this;
      setInterval(()=>{
        if(getToken()){
          timerCheckNew().then((data)=>{
            if(data.data>0){
              if(self.contInterval != null){
                self.contInterval.close();
              }
              self.contInterval = self.$notify.success({
                title: '新订单',
                message: "豪斯菲尔来新订单了",
                duration: 0,
                onClick:(()=>{
                  this.$router.push("/reserveManage/listReserve");
                })
              });
              var audio = document.getElementById("audio");
              if(audio){
                audio.play();
              }
            }
          });
        }
        
      },5000);
    },
    // 退出登录
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          store
            .dispatch("LogOut")
            .then(res => {
              this.stompClient.disconnect();
              // 拉取user_info
              this.$router.push("/login");
              window.localStorage.setItem("current_logon_company", "");
            })
            .catch(() => {
              store.dispatch("FedLogOut").then(() => {
                this.$message.error("验证失败,请重新登录");
                this.$router.push("/login");
                window.localStorage.setItem("current_logon_company", "");
              });
            });
        })
        .catch(() => {});
    },
    // 折叠导航栏
    collapse() {
      this.collapsed = !this.collapsed;
    },
    toSelectClass() {
      this.$router.push("./classSelection");
    },
    connection() {
      var self = this;
      var socket = new SockJS('http://localhost:8098/gs-guide-websocket');
      self.stompClient = Stomp.over(socket);
      self.stompClient.connect({name: localStorage.getItem("userPk")}, function (frame) {
        console.log('Connected: ' + frame);
        console.log(JSON.parse(localStorage.sessionInfo).companyPk);
        self.stompClient.subscribe('/topic/message/'+JSON.parse(localStorage.sessionInfo).companyPk, function (greeting) {
          self.newOrders();
        });
        self.stompClient.subscribe('/topic/message', function (greeting) {
          if(JSON.parse(greeting.body).type == "notification") {
            self.notifiModel(JSON.parse(greeting.body));
          }
        });
      },function () {
        setTimeout(function(){
            connection();
        },2000);
      });
    },
    newOrders() {
      var self = this;
      var Notification = window.Notification || window.mozNotification || window.webkitNotification;
      if (Notification) {
          Notification.requestPermission(function (status) {
              if (status != "granted") {
                  return;
              } else {
                  var tag = "sds" + Math.random();
                  // Notification.body = msg;
                  //notifyObj属于Notification构造方法的实例对象
                  var notifyObj = new Notification(
                      '新订单(PMS)',
                      {
                          dir: 'auto',
                          lang: 'zh-CN',
                          tag: tag,//实例化的notification的id
                          icon: '../../static/img/logo(2).png',  //icon的值显示通知图片的URL
                          body: '豪斯菲尔来新订单了'
                      }
                  );
                  notifyObj.onclick = function () {
                      //如果通知消息被点击,通知窗口将被激活
                      window.focus();
                      self.$router.push("/reserveManage/listReserve");
                      notifyObj.close();
                      // alert(11);
                  };
                  notifyObj.onerror = function () {
                      console.log("桌面消息出错！！！请联系管理员");
                  };
                  notifyObj.onclose = function () {
                  };
              }
          });
      } else {
          console.log("您的浏览器不支持桌面消息!");
      }
      var audio = document.getElementById("audio");
      if(audio){
        audio.play();
      }
    },
    notifiModel(message) {
      var Notification = window.Notification || window.mozNotification || window.webkitNotification;
      if (Notification) {
          Notification.requestPermission(function (status) {
              if (status != "granted") {
                  return;
              } else {
                  var tag = "sds" + Math.random();
                  // Notification.body = msg;
                  //notifyObj属于Notification构造方法的实例对象
                  var notifyObj = new Notification(
                      message.title+"(PMS)",
                      {
                          dir: 'auto',
                          lang: 'zh-CN',
                          tag: tag,//实例化的notification的id
                          icon: '../../static/img/logo(2).png',  //icon的值显示通知图片的URL
                          body: message.content
                      }
                  );
                  notifyObj.onclick = function () {
                      //如果通知消息被点击,通知窗口将被激活
                      window.focus();
                      notifyObj.close();
                      // alert(11);
                  };
                  notifyObj.onerror = function () {
                      console.log("桌面消息出错！！！请联系管理员");
                  };
                  notifyObj.onclose = function () {
                  };
              }
          });
      } else {
          console.log("您的浏览器不支持桌面消息!");
      }
    }
  },
  mounted() {
    
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    this.connection();
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    }
  }
};
</script>

<style lang="scss" scoped rel="stylesheet/scss" type="text/css">
@import "../assets/scss/main.scss";
.right .router-link-exact-active.router-link-active {
  background:rgba(225,102,0,0.6)
}
.router_nav_popover a {
  display: inline-block;
}
.router_nav_popover .router-link-exact-active.router-link-active {
  background: #f60;
}

.el-submenu .el-menu-item {
  min-width: 150px;
}

.router_nav_popover .nav-li {
  color: #fff;
  float: left;
}
.nav-icon {
  background: url(../assets/image/pms-nav.png);
  width: 70px;
  height: 40px;
  margin: 7px 0 0 0;
}
.nav-txt {
  width: 70px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.home-icon {
  background-position: 0px -10px;
}
.atrial-center-icon {
  background-position: 0px -10px;
}
.wx-open-icon {
  background-position: -55px -10px;
}
.reserve-manage-icon {
  background-position: -115px -10px;
}
.check-manage-icon {
  background-position: -170px -10px;
}
.customer-relation-icon {
  background-position: -238px -10px;
}
.sms-marketing-icon {
  background-position: -853px -10px;
}
.report-center-icon {
  background-position: -307px -10px;
}
.financial-audit-icon {
  background-position: -366px -10px;
}
.dumb-house-icon {
  background-position: -427px -10px;
}
.commodity-dept-icon {
  background-position: -488px -10px;
}
.stock-icon {
  background-position: -546px -10px;
}
.conference-room-icon {
  background-position: -606px -10px;
}
.operators-icon {
  background-position: -665px -10px;
}
.system-set-icon {
  background-position: -722px -10px;
}
.linen-icon {
  background-position: -785px -10px;
}
</style>
<style>
/*.el-table-column .el-button--small, .el-button--small  {*/
/*padding-top: 0;*/
/*padding-bottom: 0;*/
/*}*/
.router_nav_popover {
  background: rgba(0, 0, 0, 0.8);
  border: none;
}
.router_nav_popover.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgba(0, 0, 0, 0.8);
}
.router_nav_popover.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(0, 0, 0, 0.8);
}

.el-table td {
  padding: 6px 0;
}
.house-content {
  height: calc(100% - 80px);
}
.el-tabs__nav-scroll {
  padding: 0 10px;
}
.el-tabs__item:hover {
  color: #f60;
}
.el-tabs__item.is-active {
  color: #f60;
}
.el-tabs__active-bar {
  background-color: #f60;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item:hover,
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #f60;
}

/*滚动条*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  overflow: visible;
}

::-webkit-scrollbar-track {
  background-clip: padding-box;
  border: solid transparent;
  border-width: 0 0 0 7px;
  border-radius: 8px;
}

::-webkit-scrollbar-track:hover {
  background-clip: padding-box;
  background-color: #dcdcdc;
  border: solid transparent;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  background-clip: padding-box;
  border: solid transparent;
  min-height: 28px;
  padding: 100px 0 0;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
  background-position: -10px center;
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(0, 0, 0, 0.4);
  background-position: -20px center;
}

.height-programme-one,
.height-programme-one .el-tabs,
.height-programme-one .el-tabs .el-tabs__content {
  height: 100%;
}
.height-programme-one .aLayerOfPage {
  height: calc(100% - 80px);
  overflow: auto;
}
.height-programme-one .twoLayerOfPage {
  height: 100%;
}
.height-programme-one
  .twoLayerOfPage
  .height-programme-one
  .el-tabs
  .el-tabs__content {
  height: calc(100% - 120px);
  overflow: auto;
}

.el-input__inner {
  padding: 0 5px;
}
.el-input__prefix {
  left: -2px;
}
.el-input--prefix .el-input__inner {
  padding-left: 19px;
}
.el-input--suffix .el-input__inner {
  padding-right: 13px;
}

.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.menu-content {
  height: calc(100% - 42px);
  padding: 18px;
}

.primary-tool{
  padding: 10px 0;
  background-color: #ffffff;
  border-bottom: 1px solid #eceaea;
}
</style>

