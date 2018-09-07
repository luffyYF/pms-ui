<template>
  <div class="height-programme-one">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" ref='checkTabs'>
      <el-tab-pane label="入住查询" name="first" class="aLayerOfPage" v-if="powerJudge('1401')">
        <check-in-search/>
      </el-tab-pane>
      <el-tab-pane label="团队查询" name="second" class="aLayerOfPage" v-if="powerJudge('1402')">
        <team-search/>
      </el-tab-pane>
    </el-tabs> -->
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/checkInManage/checkInSearch" v-if="hasPerm('pms:menu:checkInSearch')">
        <span slot="title">入住查询</span>
      </el-menu-item>
      <el-menu-item index="/checkInManage/teamSearch" v-if="hasPerm('pms:menu:teamSearch')">
        <span slot="title">团队查询</span>
      </el-menu-item>
    </el-menu>
    <el-col class="menu-content" :span="24">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>
</template>

<script>
  // import TeamSearch from './TeamSearch'
  // import CheckInSearch from './CheckInSearch'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    // components: {CheckInSearch, TeamSearch},
    data () {
      return {
        activeMenu:""
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      // this.activeMenu = this.$route.path;
      let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
      // this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      // handleClick (tab, event) {
      //   console.log(tab, event)
      // },
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>

<style scoped>
  .menu-content {
      padding: 10px;
  }
 .theirs .content,.content, .content_tabs{
    height: 100%;
  }
  .el-tabs__nav-scroll{
    padding-left: 10px;
  }
</style>

