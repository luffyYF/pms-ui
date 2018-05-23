<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="哑房账列表" name="first" class="aLayerOfPage" v-if="powerJudge('1901')">
        <dumb-house :dumbHouse="disableds"/>
      </el-tab-pane>
      <el-tab-pane label="新增哑房账" name="second" class="twoLayerOfPage" v-if="powerJudge('1902')">
        <add-dumb-house :dumbHouse="disableds"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DumbHouse from './DumbHouse'
  import AddDumbHouse from './addDumbHouse/tab'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {
      DumbHouse,
      AddDumbHouse 
    },
    data () {
      return {
        activeName: '',
        disableds: false
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab)
        if(this.activeName == 'first'){
          this.disableds = false
          console.log(this.disableds)
        }else{
          this.disableds = true
          console.log(this.disableds)        }
      },
      powerJudge(id){
        return powerJudge(id);
      }
    }
  }
</script>
