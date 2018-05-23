<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs'>
      <el-tab-pane label="布草标配设置" name="first" class="aLayerOfPage" v-if="powerJudge('2501')">
        <standard-settings class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="布草实配录入" name="second" class="aLayerOfPage" v-if="powerJudge('2502')">
        <real-entry class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="脏布草录入" name="third" class="aLayerOfPage" v-if="powerJudge('2503')">
        <dirty-linen class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="布草送洗" name="fourth" class="aLayerOfPage" v-if="powerJudge('2504')">
        <laundry-linen class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="送洗验收" name="fifth" class="aLayerOfPage" v-if="powerJudge('2505')">
        <acceptance-check-give class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="布草返洗" name="sixth" class="aLayerOfPage" v-if="powerJudge('2506')">
        <backwashing-linen class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="返洗验收" name="seventh" class="aLayerOfPage" v-if="powerJudge('2507')">
        <acceptance-check-return class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="布草报损" name="eighth" class="aLayerOfPage" v-if="powerJudge('2508')">
        <linen-loss class="twoLayerOfPage"/>
      </el-tab-pane>
      <el-tab-pane label="布草盘点" name="ninth" class="aLayerOfPage" v-if="powerJudge('2509')">
        <linen-inventory class="twoLayerOfPage"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import AcceptanceCheckGive from './AcceptanceCheckGive'
  import AcceptanceCheckReturn from './AcceptanceCheckReturn'
  import BackwashingLinen from './BackwashingLinen'
  import DirtyLinen from './DirtyLinen'
  import LaundryLinen from './LaundryLinen'
  import LinenInventory from './LinenInventory'
  import LinenLoss from './LinenLoss'
  import RealEntry from './RealEntry'
  import StandardSettings from './StandardSettings'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      AcceptanceCheckGive,
      AcceptanceCheckReturn,
      BackwashingLinen,
      DirtyLinen,
      LaundryLinen,
      LinenInventory,
      LinenInventory,
      LinenLoss,
      RealEntry,
      StandardSettings
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
      powerJudge(id){
        return powerJudge(id);
      }
    }
  }
</script>
