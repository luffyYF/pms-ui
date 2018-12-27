// 交班报表
<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="收银员收款报表" name="one" class="aLayerOfPage">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script> 
  import CloseReport from './closeReport'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
      CloseReport
    },
    data () {
      return {
        activeName: 'one'
      }
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

