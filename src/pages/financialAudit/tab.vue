<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="历史换房报表" name="first" class="aLayerOfPage" v-if="powerJudge('1801')">
        <history-exchange-houses/>
      </el-tab-pane>
      <el-tab-pane label="冲减明细报表" name="second" class="aLayerOfPage" v-if="powerJudge('1802')">
        <punching-subtraction/>
      </el-tab-pane>
      <el-tab-pane label="房租合约报表" name="third" class="aLayerOfPage" v-if="powerJudge('1803')">
        <rent-contract-report/>
      </el-tab-pane>
      <el-tab-pane label="日租钟点取消报表" name="fourth" class="aLayerOfPage" v-if="powerJudge('1804')">
        <daily-rental-hour-room/>
      </el-tab-pane>
      <el-tab-pane label="历史离店报表" name="fifth" class="aLayerOfPage" v-if="powerJudge('1805')">
        <historical-departure/>
      </el-tab-pane>
      <el-tab-pane label="营业收入上缴" name="sixth" class="aLayerOfPage" v-if="powerJudge('1806')">
        <business-income-paid/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import HistoryExchangeHouses from './HistoryExchangeHouses'
  import PunchingSubtraction from './PunchingSubtraction'
  import RentContractReport from './RentContractReport'
  import DailyRentalHourRoom from './DailyRentalHourRoom'
  import HistoricalDeparture from './HistoricalDeparture'
  import BusinessIncomePaid from './BusinessIncomePaid/tab'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
     components: {
       HistoryExchangeHouses,
       PunchingSubtraction,
       RentContractReport,
       DailyRentalHourRoom,
       HistoricalDeparture,
       BusinessIncomePaid
     },
    data () {
      return {
        activeMenu: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      powerJudge(id){
        return powerJudge(id);
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      // this.activeName = this.$refs.checkTabs.panes[0].name
    },
  }
</script>
