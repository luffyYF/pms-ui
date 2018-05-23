<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="仓库设置" name="one" v-if="powerJudge('210201')">
        <warehouse-setting/>
      </el-tab-pane>
      <el-tab-pane label="商品类型设置" name="two" v-if="powerJudge('210202')">
        <commodity-type-setting/>
      </el-tab-pane>
      <el-tab-pane label="商品设置" name="three" v-if="powerJudge('210203')">
        <commodity-setting/>
      </el-tab-pane>
      <el-tab-pane label="供应商设置" name="four" v-if="powerJudge('210204')">
        <vendor-setting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import WarehouseSetting from './WarehouseSetting'
  import CommodityTypeSetting from './CommodityTypeSetting'
  import CommoditySetting from './CommoditySetting'
  import VendorSetting from './VendorSetting'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      WarehouseSetting,
      CommodityTypeSetting,
      CommoditySetting,
      VendorSetting
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

