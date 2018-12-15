<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router="true"
      class="el-menu-vertical-demo">
      <el-menu-item index="/reserveManage/addReserve" v-if="hasPerm('pms:menu:addReserve')">
        <span slot="title">新增预定</span>
      </el-menu-item>
      <el-menu-item index="/reserveManage/groupReserve" v-if="hasPerm('pms:menu:groupReserve')">
        <span slot="title">团队预定</span>
      </el-menu-item>
      <el-menu-item index="/reserveManage/listReserve" v-if="hasPerm('pms:menu:listReserve')">
        <span slot="title">预定订单</span>
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
        activeMenu:''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      // console.log("当前路由",this.$route.path)
      // console.log("当前路由",this.$refs.reserveMenu)
      // this.activeMenu = this.$route.path;
      let routerPath = this.$refs.reserveMenu.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
    },
  }
</script>
<style scoped>
.menu-content{
  overflow: auto;
}
</style>
