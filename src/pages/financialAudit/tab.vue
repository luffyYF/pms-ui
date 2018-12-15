<template>
  <div class="height-programme-one">
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
    <el-menu ref="financialMenu" :default-active="activeMenu" mode="horizontal" :router="true" class="el-menu-vertical-demo">
      <el-menu-item index="/financialAudit/billChecking" v-if="hasPerm('pms:finance:checking')">
        <span slot="title">订单对账</span>
      </el-menu-item>
      <el-menu-item index="/financialAudit/billCheckingLog" v-if="hasPerm('pms:finance:checkingLog')">
        <span slot="title">收账记录</span>
      </el-menu-item>
      <el-menu-item index="/financialAudit/billPostilLog" v-if="hasPerm('pms:finance:postilLog')">
        <span slot="title">账单批注记录</span>
      </el-menu-item>
      <el-menu-item index="/financialAudit/InvoiceList" v-if="hasPerm('pms:finance:invoiceManage')">
        <span slot="title">发票管理</span>
      </el-menu-item>
    </el-menu>
    <el-col class="menu-content" :span="24">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
      return {
        activeMenu:''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
    },
    mounted(){
      let routerPath = this.$refs.financialMenu.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
    },
};
</script>
