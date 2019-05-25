<template>
  <div class="height-programme-one">
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="交班数据" name="advanceClass">
        <advanceClass ref="advanceClass"/>
      </el-tab-pane>
      <el-tab-pane label="交班账务查询" name="advanceClassView">
        <advanceClassView ref="advanceClassView"/>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/shiftData/advanceClass" >
        <span slot="title">交班数据</span>
      </el-menu-item>

      <el-menu-item index="/shiftData/advanceClassView" >
        <span slot="title">交班账务查询</span>
      </el-menu-item>
    </el-menu>
    <el-col class="menu-content" :span="24">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-col> -->
  </div>
</template>

<script>
  import advanceClass from './advanceClass'
  import advanceClassView from './advanceClassView'
  export default {
    components:{advanceClassView,advanceClass},
    data () {
      return {
        activeName:""
      }
    },
    mounted(){
      this.activeName = this.$refs.checkTabs.panes[0].name
        // let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
        // this.activeMenu = routerPath
        // this.$router.push(routerPath);
    },
    methods: {
      handleClick (tab, event) {
        this.$refs[this.activeName].init()
      },
      
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

