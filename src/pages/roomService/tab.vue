<template>
  <div class="height-programme-one">
    <el-menu 
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router="true"
      class="el-menu-vertical-demo">
      <el-menu-item index="/roomService/RoomPattern" v-if="hasPerm('pms:roomServePattern:list')">
        <span slot="title">房态</span>
      </el-menu-item>
      <!-- <el-menu-item index="/roomService/RoomManager" v-if="hasPerm('pms:roomManager:list')">
        <span slot="title">房间管理</span>
      </el-menu-item> -->
      <el-menu-item index="/roomService/RepairRecordList" v-if="hasPerm('pms:repairRecord:list')">
        <span slot="title">维修记录</span>
      </el-menu-item>
      <el-menu-item index="/roomService/RoomStatePrint" v-if="hasPerm('pms:roomStatePrint:list')">
        <span slot="title">房态打印</span>
      </el-menu-item>
      <el-menu-item index="/roomService/StateLogList" v-if="hasPerm('pms:stateLog:list')">
        <span slot="title">房态日志</span>
      </el-menu-item>
      <el-menu-item index="/roomService/RoomSweepingLogList" v-if="hasPerm('pms:roomSweepingLog:list')">
        <span slot="title">房扫查询</span>
      </el-menu-item>
      <el-menu-item index="/roomService/LostArticlesList" v-if="hasPerm('pms:lostArticles:list')">
        <span slot="title">客人物品管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="/stock/setting"  v-if="hasPerm('pms:stock:stockSetting')">
        <span slot="title">库存相关设置</span>
      </el-menu-item> -->
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
        activeMenu: ''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
    }
  };
</script>
<style scoped>
.menu-content {
  overflow: auto;
}
</style>