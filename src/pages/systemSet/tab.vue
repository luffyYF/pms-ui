 <template>
  <div class="height-programme-one">
    <!-- <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="系统参数设置" name="first" class="aLayerOfPage" v-if="powerJudge('2401')">
        <system-parameter/>
      </el-tab-pane>
      <el-tab-pane label="班次管理" name="classManagement" class="aLayerOfPage" v-if="powerJudge('2402')">
        <class-management ref="classManagement"/>
      </el-tab-pane>
      <el-tab-pane label="会员相关设置" name="third" class="twoLayerOfPage" v-if="powerJudge('2403')">
        <membership-related/>
      </el-tab-pane>
      <el-tab-pane label="客房设置" name="fourth" class="aLayerOfPage" v-if="powerJudge('2404')">
        <room-setting/>
      </el-tab-pane>
      <el-tab-pane label="钟点特殊房" name="fifth" class="aLayerOfPage" v-if="powerJudge('2405')">
        <bell-special-room/>
      </el-tab-pane>
      <el-tab-pane label="消费项目设置" name="consumerProjects" class="aLayerOfPage" v-if="powerJudge('2406')">
        <consumer-projects ref="consumerProjects"/>
      </el-tab-pane>
      <el-tab-pane label="渠道管理" name="channelManagement" class="aLayerOfPage" v-if="powerJudge('2408')">
        <channel-management ref="channelManagement"/>
      </el-tab-pane>
      <el-tab-pane label="入账项目显示设置" name="ninth" class="aLayerOfPage" v-if="powerJudge('2409')">
        <account-entry/>
      </el-tab-pane>
      <el-tab-pane label="价格设置" name="eleven" class="aLayerOfPage">
        <PriceSetting ref="priceSettingRef"/>
      </el-tab-pane>
    </el-tabs> -->
    
      <!-- <el-tab-pane label="价格方案设置" name="tenth" class="aLayerOfPage" v-if="powerJudge('2410')">
        <price-scheme/>
      </el-tab-pane> -->
         <!-- <el-tab-pane label="团付模板设置" name="seventh" class="aLayerOfPage" v-if="powerJudge('2407')">
        <regiment-payment-template/>
      </el-tab-pane> -->
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      ref="menuRef"
      :router=true
      class="el-menu-vertical-demo">
      <el-menu-item index="/systemSet/paramsSetting" v-if="hasPerm('pms:systemSet:paramsSetting')">
        <span slot="title">系统参数设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/userSetting" v-if="hasPerm('pms:systemSet:userSetting')">
        <span slot="title">会员相关设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/roomSetting" v-if="hasPerm('pms:systemSet:roomSetting')">
        <span slot="title">客房设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/clockSpecial" v-if="hasPerm('pms:systemSet:clockSpecial')">
        <span slot="title">钟点房设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/settleSetting" v-if="hasPerm('pms:systemSet:consItemSetting')">
        <span slot="title">消费项目设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/channelManage" v-if="hasPerm('pms:systemSet:channelManage')">
        <span slot="title">渠道管理</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/projectSetting" v-if="hasPerm('pms:systemSet:projectSetting')">
        <span slot="title">入账项目显示设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/priceSetting" v-if="hasPerm('pms:systemSet:priceSetting')">
        <span slot="title">价格设置</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/marketingSetting" v-if="hasPerm('pms:systemSet:marketing')">
        <span slot="title">营销</span>
      </el-menu-item>
      <!-- <el-menu-item index="/systemSet/zlRoomStatusSetting" >
        <span slot="title">直连房态</span>
      </el-menu-item>
      <el-menu-item index="/systemSet/zlPriceSetting" >
        <span slot="title">直连房价</span>
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

<style>
/* .height-programme-one,
.height-programme-one .el-tabs,
.height-programme-one .el-tabs .el-tabs__content{
  height: 100%;
}
.height-programme-one .aLayerOfPage{
  height: calc(100% - 80px);
  overflow: auto;
}
.height-programme-one .twoLayerOfPage{
  height: 100%;
}
.height-programme-one .twoLayerOfPage .height-programme-one .el-tabs .el-tabs__content{
  height: calc(100% - 120px);
  overflow: auto;
} */
</style>
