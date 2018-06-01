<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="customeMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/financialAudit" v-if="powerJudge('500403')">
        <span slot="title">冲减明细报表</span>
      </el-menu-item>
    </el-menu>
    <el-col class="menu-content" :span="24">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-col>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
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
    </el-tabs> -->
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
        activeName: ''
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
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
  }
</script>
