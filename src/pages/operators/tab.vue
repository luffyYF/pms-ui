<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/operators" v-if="powerJudge('2301')">
        <span slot="title">操作员管理</span>
      </el-menu-item>
      <el-menu-item index="/operators/modifyThePassword" v-if="powerJudge('2302')">
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item index="/operators/logBrowsing" v-if="powerJudge('2303')">
        <span slot="title">日志浏览</span>
      </el-menu-item>
      <el-menu-item index="/operators/roleManagement" v-if="powerJudge('2304')">
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="/operators/employeeManagement" v-if="powerJudge('2305')">
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="/operators/nightTrialRecord" v-if="powerJudge('2307')">
        <span slot="title">夜审记录查询</span>
      </el-menu-item>
    </el-menu>
    <el-col class="menu-content" :span="24">
      <transition name="el-fade-in-linear">
        <router-view class="twoLayerOfPage"></router-view>
      </transition>
    </el-col>
  </div>
</template>

<script>
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {},
    data () {
      return {
        activeMenu: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeMenu = this.$route.path;
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
<style>
.menu-content{
  overflow: auto;
}
</style>
