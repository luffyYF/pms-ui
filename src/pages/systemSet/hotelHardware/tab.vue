<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="硬件信息" name="hotelHardware" v-if="hasPerm('pms:hardware:hardwareInfo')">
        <hotelHardware ref="hotelHardware"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import hotelHardware from './hotelHardware'
  export default {
    components: {
      hotelHardware,
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
        if(this.activeName == 'hotelHardware'){
          var child = this.$refs.hotelHardware
          child.init()
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

