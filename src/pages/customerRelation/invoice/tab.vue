<template>
  <div>
    <el-tabs type="border-card" ref='checkTabs' v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员充值发票" name="one" v-if="powerJudge('150501')">
        <member-recharge-invoice/>
      </el-tab-pane>
      <el-tab-pane label="组单发票" name="two" v-if="powerJudge('150502')">
        <single-invoice/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import MemberRechargeInvoice from './MemberRechargeInvoice'
  import SingleInvoice from './SingleInvoice'
  import {powerJudge} from '@/utils/permissionsOperation.js' 
  export default {
    components: {
      MemberRechargeInvoice,
      SingleInvoice
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
      },
      powerJudge(id){
        return powerJudge(id);
      }
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

