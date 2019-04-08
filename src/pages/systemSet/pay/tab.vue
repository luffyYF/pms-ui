<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="支付宝参数" name="alipay" v-if="hasPerm('pms:pay:alipaySetting')">
        <alipay ref="alipay"/>
      </el-tab-pane>
      <el-tab-pane label="微信参数" name="wxPay" v-if="hasPerm('pms:pay:wxPaySetting')" >
        <wxPay ref="wxPay"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import alipay from './alipay'
  
  import wxPay from './wxPay'
  
  export default {
    components: {
      wxPay,
      alipay
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
        if(this.activeName == 'alipay'){
            var child = this.$refs.alipay
            child.init()
        }else if(this.activeName == 'wxPay'){
            var child = this.$refs.wxPay
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

