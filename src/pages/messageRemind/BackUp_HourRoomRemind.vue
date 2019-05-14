// 钟点房提醒
<template>
  <section class="common-message-class">
    <el-dialog title="钟点房到点提示" 
      style="position: absolute;width:480px;left: calc(100% - 480px);top: auto;padding:0;"
      width="480"
      :center="true" 
      top="0" 
      :modal="false"
      custom-class="ylDialog"
      :modal-append-to-body="false" 
      :visible.sync="hourRoomVisible" 
      :append-to-body="false" 
      :close-on-click-modal="false"
      :before-close="handleClose">
      <el-table :data="hourRoomList" height="200px" @row-click="toDialogVisible" style="width:480px">
        <el-table-column align="center" prop="roomNumber" label="房号" width="80"></el-table-column>
        <el-table-column align="center" prop="endDate" label="离店时间" width="80">
          <template slot-scope="scope">
            {{moment(scope.row.endDate).format("HH:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="离店倒计时" width="80">
          <template slot-scope="scope">
            {{countDown(scope.row)}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 订单详情 -->
    <DialogCheckinVisible ref="checkinDialogRef" v-on:closecheckin="getCurrentRoomList()" />
  </section>
</template>

<script>
import moment from 'moment'
import {PrefixInteger} from '@/utils/index'
import {timeoutHourRoom} from '@/api/utils/pmsTimerController'
import DialogCheckinVisible from '@/pages/reserveManage/order/OrderDialog'

export default {
  components:{DialogCheckinVisible},
  data() {
    return {
      moment:moment,
      hourRoomVisible:false,
      hourRoomList:[],
      now: moment(),
    }
  },
  computed: {
    countDown(){
      return function(item) {
        let m1 = this.now
        let m2 = moment(item.endDate)
        var du = moment.duration(m2 - m1, 'ms'),
        hours = du.get('hours'),
        mins = du.get('minutes'),
        ss = du.get('seconds');
        if(hours<=0 && mins<=0 && ss<=0) {
          return "已超时"
        }else {
          return PrefixInteger(hours,2) + ':' + PrefixInteger(mins,2) + ':' + PrefixInteger(ss,2)
        }
      }
    }
  },
  methods:{
    startRemind() {
      this.loadHourRoomList()
      let count = 5;
      setInterval(()=>{
        if(count==0) {
          this.loadHourRoomList()
          count=5
        }else {
          let list = JSON.parse(localStorage.getItem("hourRoomList"));
          let tempList = []
          //标识为已查看
          for(let item of list) {
            if(item.displayed=='N') {
              tempList.push(item)
              this.$set(item, 'displayed', 'Y')
            }
          }
          if(tempList.length>0) {
            this.hourRoomList = tempList
            this.hourRoomVisible = true
          }
          localStorage.setItem("hourRoomList", JSON.stringify(list))
        }
        count--
      }, 5000);
      setInterval(()=>{
        this.now = moment()
      },1000)
    },
    
    toDialogVisible(item) {
      setTimeout(() => {
        this.$refs.checkinDialogRef.initOrderInfo(item.orderPk, 'visitor', item.guestOrderPk)
      },0)
    },
    loadHourRoomList() {
      timeoutHourRoom().then(res=>{
        let str = ""
        let strData = localStorage.getItem("hourRoomList")
        if(strData) {
          let historyList = JSON.parse(strData)
          historyList.forEach(item=>{
            if(item.displayed=='Y') {
              str += item.guestOrderPk+","
            }
          })
        }
        let validList = []
        for(let item of res.data) {
          this.$set(item, 'displayed', 'N')
          if(str.indexOf(item.guestOrderPk)!=-1) {
            this.$set(item, 'displayed', 'Y')
          }
          validList.push(item)
        }
        localStorage.setItem("hourRoomList", JSON.stringify(validList))

      })
    },
    handleClose() {
      this.hourRoomVisible = false
    }
  }
}
</script>

<style>

.hour-room-remind-class .ylDialog{
  bottom: 0;
  width:300px;
  border: 1px solid #F60;
}
.hour-room-remind-class .ylDialog .el-dialog__header{
    color: white;
    background-color: #F60;
    padding: 10px;
}
.hour-room-remind-class .ylDialog .el-dialog__body{
    padding: 0 0px;
}
.hour-room-remind-class .ylDialog .el-dialog__title{
    color: white;
    font-size: 15px;
    line-height: 15px;
}
.hour-room-remind-class .ylDialog .el-dialog__headerbtn .el-dialog__close{
  color: white;
}
.hour-room-remind-class .ylDialog .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
}
.hour-room-remind-class .ylDialog .el-table .cell{
  font-size: 12px;
  padding: 0;
}
</style>
