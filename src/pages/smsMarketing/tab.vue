<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="短息管理" name="first" class="aLayerOfPage">
        <sms-manage/>
      </el-tab-pane>
      <el-tab-pane label="短息设置" name="second" class="aLayerOfPage">
        <sms-set/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SmsManage from './SmsManage'
  import SmsSet from './SmsSet'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {SmsManage, SmsSet},
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
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>
