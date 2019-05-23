<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <!-- <el-tab-pane label="账单" name="sysbill" v-if="powerJudge('240101')">
        <sys-bill ref="sysbill"/>
      </el-tab-pane>
      <el-tab-pane label="自助入住" name="syscheckin" v-if="powerJudge('240102')">
        <sys-check-in ref="syscheckin"/>
      </el-tab-pane>
      <el-tab-pane label="房间" name="sysroom" v-if="powerJudge('240103')">
        <sys-room ref="sysroom"/>
      </el-tab-pane>
      <el-tab-pane label="预订入住" name="sysarrivals" v-if="powerJudge('240104')">
        <sys-arrivals ref="sysarrivals"/>
      </el-tab-pane>
      <el-tab-pane label="会员" name="sysmember" v-if="powerJudge('240105')">
        <sys-member ref="sysmember"/>
      </el-tab-pane>
      <el-tab-pane label="打印" name="sysprint" v-if="powerJudge('240106')">
        <sys-print ref="sysprint"/>
      </el-tab-pane>
      <el-tab-pane label="其它参数" name="sysotherparameters" v-if="powerJudge('240107')">
        <sys-other-parameters ref="sysotherparameters"/>
      </el-tab-pane> -->
      <el-tab-pane label="基本参数配置" name="sysBaseParamRef">
        <sys-base-param ref="sysBaseParamRef"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="酒店信息" name="syshotelinformation">
        <sys-hotel-information ref="syshotelinformation"/>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="所有" name="all">
        <sys-base-param ref="allRef"/>
      </el-tab-pane> -->
      <el-tab-pane label="前台" name="reception" v-if="hasPerm('pms:paramsSetting:reception')">
        <sys-base-param ref="receptionRef"/>
      </el-tab-pane>
      <el-tab-pane label="财务" name="finance" v-if="hasPerm('pms:paramsSetting:finance')">
        <sys-base-param ref="financeRef"/>
      </el-tab-pane>
      <el-tab-pane label="房务" name="roomService" v-if="hasPerm('pms:paramsSetting:roomService')">
        <sys-base-param ref="roomServiceRef"/>
      </el-tab-pane>
      <el-tab-pane label="打印" name="print" v-if="hasPerm('pms:paramsSetting:print')">
        <sys-base-param ref="printRef"/>
      </el-tab-pane>
      <el-tab-pane label="会员" name="member" v-if="hasPerm('pms:paramsSetting:member')">
        <sys-base-param ref="memberRef"/>
      </el-tab-pane>
      <el-tab-pane label="仓库" name="warehouse" v-if="hasPerm('pms:paramsSetting:warehouse')">
        <sys-base-param ref="warehouseRef"/>
      </el-tab-pane>
      <el-tab-pane label="电话" name="tel" v-if="hasPerm('pms:paramsSetting:tel')">
        <sys-base-param ref="telRef"/>
      </el-tab-pane>
      <el-tab-pane label="小程序预订单" name="sysReserveOrder" v-if="hasPerm('pms:paramsSetting:reserveOrder')">
        <sys-reserve-order ref="sysReserveOrderRef"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SysBill from './SysBill'
  import SysCheckIn from './SysCheckIn'
  import SysRoom from './SysRoom'
  import SysArrivals from './SysArrivals'
  import SysMember from './SysMember'
  import SysPrint from './SysPrint'
  import SysOtherParameters from './SysOtherParameters'
  import SysHotelInformation from './SysHotelInformation'
  import SysBaseParam from './SysBaseParam'
  import SysReserveOrder from './SysReserveOrder'

  export default {
    components: {
      SysBill,
      SysCheckIn,
      SysRoom,
      SysArrivals,
      SysMember,
      SysPrint,
      SysOtherParameters,
      SysHotelInformation,
      SysBaseParam,
      SysReserveOrder,
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
      this.handleClick();
    },
    methods: {
      handleClick (tab, event) {
        if(this.activeName == 'sysbill'){
          var child = this.$refs.sysbill
          child.init()
        }else if(this.activeName == 'syscheckin'){
          var child = this.$refs.syscheckin
          child.init()
        }else if(this.activeName == 'sysroom'){
          var child = this.$refs.sysroom
          child.init()
        }else if(this.activeName == 'sysarrivals'){
          var child = this.$refs.sysarrivals
          child.init()
        }else if(this.activeName == 'sysmember'){
          var child = this.$refs.sysmember
          child.init()
        }else if(this.activeName == 'sysprint'){
          var child = this.$refs.sysprint
          child.init()
        }else if(this.activeName == 'sysotherparameters'){
          var child = this.$refs.sysotherparameters
          child.init()
        }
        // else if(this.activeName == 'syshotelinformation'){
        //   var child = this.$refs.syshotelinformation
        //   child.init()
        // }
        else if(this.activeName == 'sysBaseParamRef') {
          this.$refs.sysBaseParamRef.init(this.activeName);
        }else {
           this.$refs[this.activeName+"Ref"].init(this.activeName);
        }
      },

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
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

