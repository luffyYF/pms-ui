<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="menuRef"
      :router=true
      class="el-menu-vertical-demo">
      <!-- <el-menu-item index="/operators/operManager" v-if="hasPerm('pms:menu:operManager')">
        <span slot="title">操作员管理</span>
      </el-menu-item> -->
      <el-menu-item index="/operators/modifyThePassword" v-if="hasPerm('pms:menu:modifyPassword')">
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item index="/operators/logBrowsing" v-if="hasPerm('pms:menu:logBrowser')">
        <span slot="title">日志浏览</span>
      </el-menu-item>
      <el-menu-item index="/operators/logRflRecord">
        <span slot="title">制卡日志</span>
      </el-menu-item>
      <!-- <el-menu-item index="/operators/roleManagement" v-if="hasPerm('pms:menu:roleManager')">
        <span slot="title">角色管理</span>
      </el-menu-item> -->
      <el-menu-item index="/operators/employeeManagement" v-if="hasPerm('pms:menu:workManager')">
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="/operators/nightTrialRecord" v-if="hasPerm('pms:menu:nightAuditRecord')">
        <span slot="title">夜审记录查询</span>
      </el-menu-item>
      <el-menu-item index="/operators/attendanceClass">
        <span slot="title">班次管理</span>
      </el-menu-item>
      <el-menu-item index="/operators/attendanceGroupList">
        <span slot="title">班次组管理</span>
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
  export default {
    components: {},
    data () {
      return {
        activeMenu: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      let routerPath = this.$refs.menuRef.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
    }
  }
</script>
<style>
.menu-content{
  overflow: auto;
}
</style>
