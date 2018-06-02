<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/reserveManage" v-if="powerJudge('1302')">
        <span slot="title">新增预定</span>
      </el-menu-item>
      <el-menu-item index="/reserveManage/groupReserve" v-if="powerJudge('1301')">
        <span slot="title">团队预定</span>
      </el-menu-item>
      <el-menu-item index="/reserveManage/listReserve" v-if="powerJudge('1305')">
        <span slot="title">订单列表</span>
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
  import {powerJudge} from '@/utils/permissionsOperation.js'
  export default {
    components: {},
    data () {
      return {
        activeMenu:''
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
       powerJudge(id){
        return powerJudge(id);
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      console.log("当前路由",this.$route.path)
      console.log("当前路由",this.$refs.reserveMenu)
      this.activeMenu = this.$route.path;
    },
  }
</script>
<style scoped>
.menu-content{
  overflow: auto;
}
</style>
