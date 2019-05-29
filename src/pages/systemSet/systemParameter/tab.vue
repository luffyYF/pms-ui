<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <!--
      <el-tab-pane label="房间" name="sysroom" v-if="powerJudge('240103')">
        <sys-room ref="sysroom"/>
      </el-tab-pane>
-->
      <el-tab-pane label="房间设置" name="FJ">
        <sys-base-param ref="FJRef"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="所有" name="all">
        <sys-base-param ref="allRef"/>
      </el-tab-pane> -->
      <el-tab-pane label="前台" name="QT" v-if="hasPerm('pms:paramsSetting:reception')">
        <sys-base-param ref="QTRef"/>
      </el-tab-pane>
      <el-tab-pane label="财务" name="CW" v-if="hasPerm('pms:paramsSetting:finance')">
        <sys-base-param ref="CWRef"/>
      </el-tab-pane>
      <el-tab-pane label="房务" name="FW" v-if="hasPerm('pms:paramsSetting:roomService')">
        <sys-base-param ref="FWRef"/>
      </el-tab-pane>
      <el-tab-pane label="打印" name="DY" v-if="hasPerm('pms:paramsSetting:print')">
        <sys-base-param ref="DYRef"/>
      </el-tab-pane>
      <el-tab-pane label="会员" name="HY" v-if="hasPerm('pms:paramsSetting:member')">
        <sys-base-param ref="HYRef"/>
      </el-tab-pane>
      <el-tab-pane label="仓库" name="CK" v-if="hasPerm('pms:paramsSetting:warehouse')">
        <sys-base-param ref="CKRef"/>
      </el-tab-pane>
      <el-tab-pane label="电话" name="DH" v-if="hasPerm('pms:paramsSetting:tel')">
        <sys-base-param ref="DHRef"/>
      </el-tab-pane>
      <el-tab-pane label="小程序预订单" name="sysReserveOrder" v-if="hasPerm('pms:paramsSetting:reserveOrder')">
        <sys-reserve-order ref="sysReserveOrderRef"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SysBaseParam from './SysBaseParam'
  import SysReserveOrder from './SysReserveOrder'

  export default {
    components: {
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
        // if(this.activeName == 'sysBaseParamRef') {
        //   this.$refs.sysBaseParamRef.init(this.activeName);
        // }else {
          
        // }
        this.$refs[this.activeName+"Ref"].init(this.activeName);
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

