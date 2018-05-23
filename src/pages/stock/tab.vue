<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="库存功能" name="first" class="twoLayerOfPage" v-if="powerJudge('2101')">
        <stock-function/>
      </el-tab-pane>
      <el-tab-pane label="库存相关设置" name="second" class="twoLayerOfPage" v-if="powerJudge('2102')">
        <stock-set-up/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import StockFunction from './stockFunction/tab'
  import StockSetUp from './stockSetUp/tab'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      StockFunction,
      StockSetUp
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
