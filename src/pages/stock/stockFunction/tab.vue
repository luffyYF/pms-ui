<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="物品申领" name="one">
        <application ref="applicationRef"/>
      </el-tab-pane>
      <el-tab-pane label="申领记录" name="two">
        <application-list ref="applicationListRef" v-on:to-inventory-in="toInventoryIn"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="直拨" name="two" v-if="powerJudge('210102')">
        <direct-dial/>
      </el-tab-pane> -->
      <el-tab-pane label="入库" name="three" :disabled="true">
        <inventory-in ref="inventoryInRef"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="出库" name="four" v-if="powerJudge('210104')">
        <the-library/>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="部门退货" name="five" v-if="powerJudge('210105')">
        <department-return/>
      </el-tab-pane>
      <el-tab-pane label="退库" name="six" v-if="powerJudge('210106')">
        <refund/>
      </el-tab-pane> -->
      <el-tab-pane label="库存" name="seven">
        <stock-list ref="stockListRef"/>
      </el-tab-pane>
      <el-tab-pane label="库存盘点" name="eight" >
        <take-stock ref="takeStokeRef"/>
      </el-tab-pane>
      <el-tab-pane label="盘点记录" name="night" >
        <take-stock-list ref="takeStokeListRef"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="部门库存盘点" name="nine" v-if="powerJudge('210109')">
        <department-inventory-inventory/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import Application from './Application'
  import DirectDial from './DirectDial'
  import InventoryIn from './InventoryIn'
  import TheLibrary from './TheLibrary'
  import DepartmentReturn from './DepartmentReturn'
  import Refund from './Refund'
  import StockList from './StockList'
  import InventoryInventory from './InventoryInventory'
  import DepartmentInventoryInventory from './DepartmentInventoryInventory'
  import ApplicationList from './ApplicationList'
  import TakeStock from './TakeStock'
  import TakeStockList from './TakeStockList'
  
  export default {
    components: {
      Application,
      DirectDial,
      InventoryIn,
      TheLibrary,
      DepartmentReturn,
      Refund,
      StockList,
      InventoryInventory,
      DepartmentInventoryInventory,
      ApplicationList,
      TakeStock,
      TakeStockList
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
      this.$refs.applicationRef.init();
    },
    methods: {
      handleClick (tab, event) {
        if(tab.name=='one'){
          this.$refs.applicationRef.init();
        }else if(tab.name=='two'){
          this.$refs.applicationListRef.init();
        }else if(tab.name=='three'){
          this.$refs.inventoryInRef.init();
        }else if(tab.name=='seven'){
          this.$refs.stockListRef.init();
        }else if(tab.name=='eight'){
          this.$refs.takeStokeRef.init();
        }else if(tab.name=='night'){
          this.$refs.takeStokeListRef.init();
        }
      },
      //跳转入库TAB
      toInventoryIn(outId){
        this.$refs.inventoryInRef.init(outId);
        this.activeName = 'three';
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

