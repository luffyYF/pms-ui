<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="采购申请" name="one" v-if="powerJudge('210101')">
        <application/>
      </el-tab-pane>
      <el-tab-pane label="申请记录" name="two">
        <application-list/>
      </el-tab-pane>
      <!-- <el-tab-pane label="直拨" name="two" v-if="powerJudge('210102')">
        <direct-dial/>
      </el-tab-pane> -->
      <el-tab-pane label="入库" name="three" v-if="powerJudge('210103')">
        <be-laid-up/>
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
      <el-tab-pane label="库存" name="seven" v-if="powerJudge('210107')">
        <stock-list ref="stockListRef"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="库存盘点" name="eight" v-if="powerJudge('210108')">
        <inventory-inventory/>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="部门库存盘点" name="nine" v-if="powerJudge('210109')">
        <department-inventory-inventory/>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
  import Application from './Application'
  import DirectDial from './DirectDial'
  import BeLaidUp from './BeLaidUp'
  import TheLibrary from './TheLibrary'
  import DepartmentReturn from './DepartmentReturn'
  import Refund from './Refund'
  import StockList from './StockList'
  import InventoryInventory from './InventoryInventory'
  import DepartmentInventoryInventory from './DepartmentInventoryInventory'
  import ApplicationList from './ApplicationList'
  
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      Application,
      DirectDial,
      BeLaidUp,
      TheLibrary,
      DepartmentReturn,
      Refund,
      StockList,
      InventoryInventory,
      DepartmentInventoryInventory,
      ApplicationList
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
        if(tab.name=='seven'){
          this.$refs.stockListRef.init();
        }
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

