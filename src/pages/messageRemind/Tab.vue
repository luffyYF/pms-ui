// 页面消息统一调度
<template>
  <section>
    <!-- 钟点房提醒 -->
    <hour-room-remind ref="hourRoomRemindRef"></hour-room-remind>
    <!-- 钟点房提醒 -->
    <new-reserve-order-remind ref="newReserveOrderRemindRef"></new-reserve-order-remind>
    <!-- 钟点房提醒 -->
    <cancel-reserve-order-remind ref="cancelReserveOrderRemindRef"></cancel-reserve-order-remind>

  </section>
</template>

<script>
import HourRoomRemind from './HourRoomRemind'
import NewReserveOrderRemind from './NewReserveOrderRemind'
import CancelReserveOrderRemind from './CancelReserveOrderRemind'

export default {
  components:{HourRoomRemind, NewReserveOrderRemind,CancelReserveOrderRemind},
  data() {
    return {}
  },
  mounted() {
    this.toWebSocket();

    //测试。。。
    // this.$refs.newReserveOrderRemindRef.remind([
    //   {"orderNo":"8023377920","orderPk":"8e30740e-780e-4f94-9d0d-2dcbc09a55ae","createTime":"2019-05-07 10:29:53","userPhone":"15770634606","userName":"测试"}]);
    // this.$refs.hourRoomRemindRef.remind([]);
  },
  methods:{
    //发现消息进入，开始处理前端触发逻辑
    
    toWebSocket() {
      console.log('连接websocket')
      let socket;
      if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      }else{
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接  
        //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
        let uuid = this.createUUID()
        let url = "http://localhost:8084/websocket/"+uuid;
        socket = new WebSocket(url.replace("http","ws"));  
        //打开事件
        socket.onopen = function() {
          console.log("Socket 已打开");
          heartCheck.reset().start();   // 成功建立连接后，重置心跳检测
          //socket.send("这是来自客户端的消息" + location.href + new Date());  
        };

        //获得消息事件  
        let _this = this
        socket.onmessage = function(msg) {
          let data = msg.data
          console.log("发现消息进入")
          // heartCheck.reset().start(); // 如果获取到消息，说明连接是正常的，重置心跳检测

          console.log(data);
          if(data) {
            if(data.indexOf('new_order_remind_')!=-1) {
              //new_order_remind_:[{"orderNo":"8023377920","orderPk":"8e30740e-780e-4f94-9d0d-2dcbc09a55ae","createTime":"2019-05-07 10:29:53","userPhone":"15770634606","userName":"安静男孩"},{"orderNo":"8023378366","orderPk":"f0fe0d58-e818-44e4-bbd4-5a62e7759254","createTime":"2019-05-07 10:30:36","userPhone":"15770634606","userName":"安静男孩"}]
              let jsonStr = data.split("new_order_remind_:")[1]
              let array = JSON.parse(jsonStr)
              _this.$refs.newReserveOrderRemindRef.remind(array);
              console.log("有新的预订单")
            }else if(data.indexOf('hour_room_remind_')!=-1) {
              // hour_room_remind_:[{"roomNumber":"3809","orderPk":"8cadae96-f8fb-451d-a84f-7c939867db0d","guestOrderPk":"33f7e51f-fff3-4f23-809f-b0a8479f2ece","endDate":"2019-05-06 16:50:56","remindTimeNum":1}]
              let jsonStr = data.split("hour_room_remind_:")[1]
              let array = JSON.parse(jsonStr)
              _this.$refs.hourRoomRemindRef.remind(array);
            }else if(data.indexOf('cancel_order_remind_')!=-1) {
              let jsonStr = data.split("cancel_order_remind_:")[1]
              let array = JSON.parse(jsonStr)
              _this.$refs.cancelReserveOrderRemindRef.remind(array);
            }
          }
        }
        //关闭事件  
        socket.onclose = function() {  
          console.log("Socket已关闭");  
        };  
        //发生了错误事件  
        socket.onerror = function() {  
          console.error("Socket发生了错误");  
          //此时可以尝试刷新页面
        }
        //离开页面时，关闭socket
        //jquery1.8中已经被废弃，3.0中已经移除
        // $(window).unload(function(){  
        //     socket.close();  
        //});  
      }
      const _this = this
      var heartCheck = {
        timeout: 50000,        // 50秒发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
        serverTimeoutObj: null,
        reset: function(){
          // clearTimeout(this.timeoutObj);
          clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function(){
          var self = this;
          this.serverTimeoutObj = setInterval(function(){
            if(socket.readyState == 1){
              console.log("连接状态，发送消息保持连接");
              socket.send("ping");
              heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
            }else{
              console.log("断开状态，尝试重连");
              heartCheck.reset()
              _this.toWebSocket();
            }
          }, this.timeout)
        }
      }
    },
    createUUID() {  
      var s = [];
      var hexDigits = "0123456789abcdef";  
      for (var i = 0; i < 36; i++) {  
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);  
      }  
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010  
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01  
      s[8] = s[13] = s[18] = s[23] = "-";  
      var uuid = s.join("");  
      return uuid;  
    },

  }
}
</script>

<style>
</style>
