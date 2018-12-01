<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="消费项设置" name="consumptionItem" v-if="powerJudge('240901')">
        <consumption-item ref="consumptionItem"/>
      </el-tab-pane>
      <el-tab-pane label="结算项设置" name="settlementItem" v-if="powerJudge('240902')">
        <settlement-item ref="settlementItem"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ConsumptionItem from './ConsumptionItem'
  import SettlementItem from './SettlementItem'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      ConsumptionItem,
      SettlementItem
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
        if(this.activeName == 'consumptionItem'){
          var child = this.$refs.consumptionItem
          child.init()
        }else if(this.activeName == 'settlementItem'){
          var child = this.$refs.settlementItem
          child.init()
        }
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
.menu-content {
  overflow: auto;
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

