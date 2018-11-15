<template>
  <!-- <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="库存功能" name="first" class="twoLayerOfPage" v-if="powerJudge('2101')">
        <stock-function/>
      </el-tab-pane>
      <el-tab-pane label="库存相关设置" name="second" class="twoLayerOfPage" v-if="powerJudge('2102')">
        <stock-set-up/>
      </el-tab-pane>
    </el-tabs>
  </div> -->
  <div class="height-programme-one">
    <el-menu :default-active="activeMenu" mode="horizontal" ref="reserveMenu" :router=true class="el-menu-vertical-demo">
      <el-menu-item index="/stock/stockopr">
        <span slot="title">库存功能</span>
      </el-menu-item>
      <el-menu-item index="/stock/setting">
        <span slot="title">库存相关设置</span>
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
  components: {},
  data() {
    return {
      activeMenu: ""
    };
  },
  methods: {
    handleClick(tab, event) {
    },
  },
  mounted() {
    //设置第一个不被隐藏的el-tab-pane为激活状态
    let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
    this.activeMenu = routerPath;
    this.$router.push(routerPath);
  }
};
</script>
<style scoped>
.menu-content {
  overflow: auto;
}
</style>