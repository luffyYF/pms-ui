<template>
  <div class="height-programme-one">
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="reserveMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/atrialCenter/RoomPattern" v-if="hasPerm('pms:menu:roomPattern')">
        <span slot="title">房态图</span>
      </el-menu-item>
      <el-menu-item index="/atrialCenter/RoomTable" v-if="hasPerm('pms:menu:roomStatusTable')">
        <span slot="title">房态表</span>
      </el-menu-item>
      <el-menu-item index="/atrialCenter/ForwardHousing" v-if="hasPerm('pms:menu:roomForwordStatus')">
        <span slot="title">远期房态</span>
      </el-menu-item>
      <el-menu-item index="/atrialCenter/HousekeepingList" v-if="hasPerm('pms:menu:reasonRoom')">
        <span slot="title">问题房态列表</span>
      </el-menu-item>
      <el-menu-item index="/atrialCenter/GoodsManageTag" v-if="hasPerm('pms:menu:goodsManage')">
        <span slot="title">物品管理</span>
      </el-menu-item>
      <el-menu-item index="/atrialCenter/AccountStatement" v-if="hasPerm('pms:menu:accountStatement')">
        <span slot="title">催账报表</span>
      </el-menu-item>
      <!-- <el-menu-item index="/atrialCenter/JointRealManage" v-if="powerJudge('1107')">
        <span slot="title">联房管理</span>
      </el-menu-item> -->
      <el-menu-item index="/reportCenter/ShiftReport" v-if="hasPerm('pms:menu:shiftReport')">
        <span slot="title">交班报表</span>
      </el-menu-item>
      <el-menu-item index="/reportCenter/EmergencyReport" v-if="hasPerm('pms:menu:emergencyReport')">
        <span slot="title">应急报表</span>
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
        activeMenu:""
      }
    },
    mounted(){
      this.activeMenu = this.$route.path;
    },
    methods: {
      handleClick () {
        //  console.log(this.$refs.atrialTabs)
        // if(this.activeName=='fourth'){
        //   this.$refs.housekeepingRef.listData()
        // }
      },
      powerJudge(id){
        return powerJudge(id);
      }
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






