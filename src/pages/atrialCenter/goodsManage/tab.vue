<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" class="goodsmanage-tabs">
      <el-tab-pane label="外借" name="first" v-if="powerJudge('110501')">
        <lend-out/>
      </el-tab-pane>
      <el-tab-pane label="留言" name="second" v-if="powerJudge('110502')">
        <leaving-msg/>
      </el-tab-pane>
      <el-tab-pane label="寄存" name="third" v-if="powerJudge('110503')">
        <deposit/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import LendOut from './LendOut'
  import LeavingMsg from './LeavingMsg'
  import Deposit from './Deposit'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {LendOut, LeavingMsg, Deposit},
    data () {
      return {
        activeName: 'first'
      }
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
.el-row {
  margin-bottom: 10px;
}
</style>

