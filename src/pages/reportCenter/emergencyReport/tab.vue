<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="在店宾客余额及押金报表" name="ShopGuestDeposi" style="height:100%;">
          <shop-guest-deposi  style="height:100%;" ref="ShopGuestDeposi"/>
      </el-tab-pane>
      <el-tab-pane label="在住客人账务明细报表" name="LiveGuestFinance"  style="height:100%;">
          <live-guest-finance  style="height:100%;" ref="LiveGuestFinance"/>
      </el-tab-pane>
      <el-tab-pane label="实时房态报表" name="RealTimeRoomStatus" style="height:100%;">
          <real-time-room-status style="height:100%;" ref="RealTimeRoomStatus"/>
      </el-tab-pane>
      <el-tab-pane label="房态报表" name="RoomStatus"  style="height:100%;">
          <room-status  style="height:100%;" ref="RoomStatus"/>
      </el-tab-pane>
      <el-tab-pane label="今日预抵已排房预订报表" name="TodayRowHousesBook" style="height:100%;">
          <today-row-houses-book  style="height:100%;" ref="TodayRowHousesBook"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ShopGuestDeposi from './shopGuestDeposi'
  import LiveGuestFinance from './liveGuestFinance'
  import RealTimeRoomStatus from './realTimeRoomStatus'
  import RoomStatus from './roomStatus'
  import TodayRowHousesBook from './todayRowHousesBook'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
        ShopGuestDeposi,
        LiveGuestFinance,
        RealTimeRoomStatus,
        RoomStatus,
        TodayRowHousesBook
    },
    data () {
      return {
        activeName: 'ShopGuestDeposi'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
        console.log(this.$refs)
        this.$refs[this.activeName].init()
      },
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>
<style scoped>
.el-tabs--border-card{
  background: #fff;
  border: none !important;
  border-top: 1px solid #dcdfe6 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
<style>
/* .goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
} */
</style>

