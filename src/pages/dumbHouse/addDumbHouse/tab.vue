<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="哑房单" name="one">
        <dumb-house-order/>
      </el-tab-pane>
      <!-- <el-tab-pane label="账单" name="two" :disabled="dumbHouse" style="cursor: no-drop">
        <dumb-house-bill/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  // import DumbHouseBill from './DumbHouseBill'
  import DumbHouseOrder from './DumbHouseOrder'
  
  export default {
    props: ['dumbHouse'],
    components: {
      DumbHouseOrder,
      // DumbHouseBill
    },
    data () {
      return {
        activeName: 'one'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
        
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
.cursorNo{
  cursor: no-drop
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

