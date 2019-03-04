<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="menuRef"
      :router=true
      class="el-menu-vertical-demo">
      
      <el-menu-item index="/zl/zlRoomStatusSetting" v-if="hasPerm('pms:zl:zmRoomStatus')">
        <span slot="title">直连房态</span>
      </el-menu-item>
      <el-menu-item index="/zl/zlPriceSetting" v-if="hasPerm('pms:zl:zlPrice')">
        <span slot="title">直连房价</span>
      </el-menu-item>
      <el-menu-item index="/zl/zlOpenConfig" v-if="hasPerm('pms:zl:zlOpenConfig')">
        <span slot="title">直连配置</span>
      </el-menu-item>
      <el-menu-item index="/zl/zlCtripConfig" v-if="hasPerm('pms:zl:zlCtripConfig')">
        <span slot="title">携程直连</span>
      </el-menu-item>
      <el-menu-item index="/zl/zlFliggyConfig" v-if="hasPerm('pms:zl:zlFliggyConfig')">
        <span slot="title">飞猪直连</span>
      </el-menu-item>
      <el-menu-item index="/zl/housePriceCode" v-if="hasPerm('pms:zl:zlHousePriceCode')">
        <span slot="title">房价代码</span>
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
        activeMenu:'',
        // activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      // this.activeMenu = this.$route.path;
      let routerPath = this.$refs.menuRef.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
      // this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
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

