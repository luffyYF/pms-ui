<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="入住查询" name="first" class="aLayerOfPage" v-if="powerJudge('1401')">
        <check-in-search/>
      </el-tab-pane>
      <el-tab-pane label="团队查询" name="second" class="aLayerOfPage" v-if="powerJudge('1402')">
        <team-search/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import TeamSearch from './TeamSearch'
  import CheckInSearch from './CheckInSearch'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {CheckInSearch, TeamSearch},
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

</style>

