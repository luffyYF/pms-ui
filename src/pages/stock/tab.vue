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
    <el-menu :default-active="activeMenu" mode="horizontal" ref="reserveMenu" @select="handleSelect" :router=true class="el-menu-vertical-demo">
      <!-- <el-menu-item index="/stock/stockopr" v-if="hasPerm('pms:stock:stockOpr')">
        <span slot="title">库存功能</span>
      </el-menu-item>
      <el-menu-item index="/stock/setting"  v-if="hasPerm('pms:stock:stockSetting')">
        <span slot="title">库存相关设置</span>
      </el-menu-item> -->
      <el-menu-item index="/stock/applications" v-if="hasPerm('pms:application:add')">
        <span slot="title">物品申领</span>
      </el-menu-item>
      <el-menu-item index="/stock/applicationList" v-if="hasPerm('pms:application:list')">
        <span slot="title">申领记录</span>
      </el-menu-item>
      <el-menu-item index="/stock/inventoryIn" disabled>
        <span slot="title">入库</span>
      </el-menu-item>
      <el-menu-item index="/stock/stockList" v-if="hasPerm('pms:stockManage:list')">
        <span slot="title">库存</span>
      </el-menu-item>
      <el-menu-item index="/stock/inventoryConsumes" v-if="hasPerm('pms:consumeManage:add')">
        <span slot="title">消耗</span>
      </el-menu-item>
      <el-menu-item index="/stock/inventoryConsumeList" v-if="hasPerm('pms:consumeManage:list')">
        <span slot="title">消耗记录</span>
      </el-menu-item>
      <el-menu-item index="/stock/takeStocks" v-if="hasPerm('pms:takeStock:add')">
        <span slot="title">库存盘点</span>
      </el-menu-item>
      <el-menu-item index="/stock/takeStockList" v-if="hasPerm('pms:takeStock:list')">
        <span slot="title">盘点记录</span>
      </el-menu-item>
      <el-menu-item index="/stock/storageSetting" v-if="hasPerm('pms:stock:stockSetting')">
        <span slot="title">仓库设置</span>
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
import bus from "@/utils/bus";

export default {
  components: {},
  data() {
    return {
      activeMenu: ""
    };
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
      this.activeMenu = index;
    },
  },
  mounted() {
    //设置第一个不被隐藏的el-tab-pane为激活状态
    let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
    this.activeMenu = routerPath;
    this.$router.push(routerPath);
    
    bus.$on("operationIn", (data) => {
      this.activeMenu = '/stock/inventoryIn';
      this.$router.push('/stock/inventoryIn/O' + data.outId)
    })
  }
};
</script>
<style scoped>
.menu-content {
  overflow: auto;
}
</style>