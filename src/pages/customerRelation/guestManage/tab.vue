<template>
  <div class="height-programme-one">
    <el-tabs type="border-card"  ref='checkTabs' v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="aLayerOfPage" label="在住客人" name="one">
        <live-in-guest/>
      </el-tab-pane>
      <el-tab-pane class="aLayerOfPage" label="历史客人" name="two">
        <history-guest/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LiveInGuest from './LiveInGuest'
  import HistoryGuest from './HistoryGuest'
  // import {powerJudge} from '@/utils/permissionsOperation.js'  
  export default {
    components: {
      LiveInGuest,
      HistoryGuest
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
      // powerJudge(id){
      //   return powerJudge(id);
      // }
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

