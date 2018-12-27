<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" ref="wxTabs">
      <el-tab-pane label="微信开门授权" name="first" >
        <wx-open/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import WxOpen from './WxOpen'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {WxOpen},
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.wxTabs.panes[0].name
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
