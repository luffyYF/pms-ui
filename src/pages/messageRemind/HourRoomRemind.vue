// 钟点房提醒
<template>
  <section class="common-message-class">
    <el-dialog title="钟点房到点提示" 
      style="position: absolute;width:598px;left: calc(100% - 490px);top: auto;padding:0;"
      width="310px"
      :center="true" 
      top="0" 
      :modal="false"
      custom-class="hourRoomDialog"
      :modal-append-to-body="false" 
      :visible.sync="hourRoomVisible" 
      :append-to-body="false"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <el-table :data="hourRoomList" height="200px" @row-click="toDialogVisible" >
        <el-table-column align="center" prop="roomNumber" label="房号" width="80"></el-table-column>
        <el-table-column align="center" prop="endDate" label="离店时间" width="80">
          <template slot-scope="scope">
            {{moment(scope.row.endDate).format("HH:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="离店倒计时" width="100">
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
  mounted() {
    setInterval(()=>{
      this.now = moment()
    },1000)
  },
  computed: {
    test() {
      return function (val) {
        setInterval(()=>{
          return moment().format('HH:mm:ss')
        }, 1000)
      }
    },
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
    remind(data) {
      for(let obj of data) {
        this.hourRoomList.push(obj)
      }
      this.hourRoomVisible = true
    },
    toDialogVisible(item) {
      setTimeout(() => {
        this.$refs.checkinDialogRef.initOrderInfo(item.orderPk, 'visitor', item.guestOrderPk)
      },0)
    },
    handleClose() {
      this.hourRoomVisible = false
    }
  }
}
</script>

<style>

.hourRoomDialog{
  bottom: 0;
  width:300px;
  border: 1px solid #F60;
  
}
.hourRoomDialog .el-dialog__header{
    color: white;
    background-color: #F60;
    padding: 10px;
}
.hourRoomDialog .el-dialog__body{
    padding: 0 0px;
}
.hourRoomDialog .el-dialog__title{
    color: white;
    font-size: 15px;
    line-height: 15px;
}
.hourRoomDialog .el-dialog__headerbtn .el-dialog__close{
  color: white;
}
.hourRoomDialog .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
}
.hourRoomDialog .el-table .cell{
  font-size: 12px;
  padding: 0;
}
</style>
