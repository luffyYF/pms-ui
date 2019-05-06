<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/shiftData/advanceClass" >
        <span slot="title">交班数据</span>
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
  export default {
    data () {
      return {
        activeMenu:""
      }
    },
    mounted(){
        let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
        this.activeMenu = routerPath
        this.$router.push(routerPath);
    },
    methods: {
      // handleClick (tab, event) {
      //   console.log(tab, event)
      // },
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

