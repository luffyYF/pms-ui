<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="钟点房设置" name="hourRoom" v-if="powerJudge('240501')">
        <hour-room ref="hourRoom"/>
      </el-tab-pane>
      <el-tab-pane label="特殊房设置" name="specialRoom" v-if="powerJudge('240502')">
        <special-room ref="specialRoom"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import HourRoom from './HourRoom'
  import SpecialRoom from './SpecialRoom'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      HourRoom,
      SpecialRoom
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
        if(this.activeName == 'hourRoom'){
          var child = this.$refs.hourRoom
          child.init()
        }else if(this.activeName == 'specialRoom'){
          var child = this.$refs.specialRoom
          child.init()
        }
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

