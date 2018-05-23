<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="上缴管理" name="one" v-if="powerJudge('180601')">
        <turn-over-management/>
      </el-tab-pane>
      <el-tab-pane label="上缴历史查询" name="two" v-if="powerJudge('180602')">
        <turn-over-history/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TurnOverHistory from './turnOverHistory'
  import TurnOverManagement from './turnOverManagement'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
      TurnOverHistory,
      TurnOverManagement
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

