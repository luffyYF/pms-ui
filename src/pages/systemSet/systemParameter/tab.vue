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
      <el-tab-pane label="酒店信息" name="syshotelinformation">
        <sys-hotel-information ref="syshotelinformation"/>
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
      SysBaseParam
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
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
        }else if(this.activeName == 'syshotelinformation'){
          var child = this.$refs.syshotelinformation
          child.init()
        }else if(this.activeName == 'sysBaseParamRef') {
          this.$refs.syshotelinformation.init();
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

