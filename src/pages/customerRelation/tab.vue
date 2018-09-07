<template>
  <div class="height-programme-one">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员管理" name="first" class="twoLayerOfPage">
        <member-manage/>
      </el-tab-pane>
      <el-tab-pane label="客人管理" name="second" class="twoLayerOfPage">
        <guest-manage/>
      </el-tab-pane>
      <el-tab-pane label="协议管理" name="third" class="twoLayerOfPage">
        <protocol-manage/>
      </el-tab-pane>
      <el-tab-pane label="虚拟账单" name="fourth" class="aLayerOfPage">
        <virtual-order/>
      </el-tab-pane>
      <el-tab-pane label="发票" name="fifth" class="twoLayerOfPage">
        <invoice/>
      </el-tab-pane>
      <el-tab-pane label="旅客信息上传" name="sixth" class="twoLayerOfPage">
        <passenger-information-uploading/>
      </el-tab-pane>
    </el-tabs> -->
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="customeMenu"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/customerRelation/memberManage" v-if="hasPerm('pms:menu:memberManage')">
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/customerRelation/guestManage" v-if="hasPerm('pms:menu:guestManage')">
        <span slot="title">客人管理</span>
      </el-menu-item>
      <el-menu-item index="/customerRelation/protocolManage" v-if="hasPerm('pms:menu:protocolManage')">
        <span slot="title">协议管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="/customerRelation/virtualOrder" v-if="powerJudge('1504')">
        <span slot="title">虚拟账单</span>
      </el-menu-item>
      <el-menu-item index="/customerRelation/invoice" v-if="powerJudge('1505')">
        <span slot="title">发票</span>
      </el-menu-item>
      <el-menu-item index="/customerRelation/passengerInformationUploading" v-if="powerJudge('1506')">
        <span slot="title">旅客信息上传</span>
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
  import MemberManage from './memberManage/tab'
  import GuestManage from './guestManage/tab'
  import ProtocolManage from './ProtocolManage/tab'
  import VirtualOrder from './VirtualOrder'

  import Invoice from './invoice/tab'
  import PassengerInformationUploading from './passengerInformationUploading/tab'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      MemberManage,
      GuestManage, 
      ProtocolManage,
      VirtualOrder,
      
      Invoice,
      PassengerInformationUploading
    },
    data () {
      return {
        activeMenu: ''
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
      // this.activeMenu = this.$refs.customeMenu.$children[0].index;
      // console.log(this.activeMenu)
      let routerPath = this.$refs.customeMenu.$children[0].$options.propsData.index;
      this.activeMenu = routerPath
      this.$router.push(routerPath);
    },
  }
</script>
<style lang="scss" scoped>
.customerRelation{
  height: 100%;
}
</style>

