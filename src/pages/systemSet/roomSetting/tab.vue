<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <!-- <el-tab-pane label="房态类型管理" name="sysAtrialType" v-if="powerJudge('240401')">
        <sys-atrial-type ref="sysAtrialType"/>
      </el-tab-pane> -->
      <el-tab-pane label="楼层房间管理" name="floorRoom" v-if="hasPerm('pms:roomSetting:floorAndRoom')">
        <sys-floor-room ref="floorRoom"/>
      </el-tab-pane>
      <el-tab-pane label="房间类型管理" name="typeOfRoom" v-if="hasPerm('pms:roomSetting:roomType')">
        <sys-type-of-room ref="typeOfRoom"/>
      </el-tab-pane>
      <el-tab-pane label="虚拟房型管理" name="typeOfVirtualRoom" v-if="hasPerm('pms:roomSetting:virtualRoomType')">
        <sys-type-of-virtual-room ref="typeOfVirtualRoom"/>
      </el-tab-pane>
      <el-tab-pane label="租赁物品管理" name="leasehold" v-if="hasPerm('pms:roomSetting:leasehold')">
        <sys-leasehold ref="leasehold"/>
      </el-tab-pane>
      <el-tab-pane label="客房赔偿设置" name="sysRoomCompensation" v-if="hasPerm('pms:roomSetting:compensation')">
        <sys-room-compensation ref='sysRoomCompensation'/>
      </el-tab-pane>
      <el-tab-pane label="楼栋管理" name="sysBan" v-if="hasPerm('pms:roomSetting:buildingSetting')">
        <sys-ban ref="sysBan"/>
      </el-tab-pane>
      <el-tab-pane label="维修停用原因设置" name="sysRepairReason" v-if="hasPerm('pms:roomSetting:reasonSetting')">
        <sys-repair-reason ref="sysRepairReason"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SysAtrialType from './SysAtrialType'
  import SysFloorRoom from './SysFloorRoom'
  import SysTypeOfRoom from './SysTypeOfRoom'
  import SysLeasehold from './SysLeasehold'
  import SysRoomCompensation from './SysRoomCompensation'
  import SysBan from './SysBan'
  import SysRepairReason from './SysRepairReason'
  import SysTypeOfVirtualRoom from './SysTypeOfVirtualRoom'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      SysAtrialType,
      SysFloorRoom,
      SysTypeOfRoom,
      SysLeasehold,
      SysRoomCompensation,
      SysBan,
      SysRepairReason,
      SysTypeOfVirtualRoom
    },
    data () {
      return {
        activeName: ''
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
        if(this.activeName == 'typeOfRoom'){
          var child = this.$refs.typeOfRoom
          child.init()
        }else if(this.activeName == 'leasehold'){
          var child = this.$refs.leasehold
          child.init()
        }else if(this.activeName == 'floorRoom'){
          var child = this.$refs.floorRoom
          child.init()
        }else if(this.activeName == 'sysBan'){
          var child = this.$refs.sysBan
          child.init()
        }else if(this.activeName == 'sysRepairReason'){
          var child = this.$refs.sysRepairReason
          child.init()
        }else if(this.activeName == 'sysAtrialType'){
          var child = this.$refs.sysAtrialType
          child.init()
        }else if(this.activeName == 'sysRoomCompensation'){
          var child = this.$refs.sysRoomCompensation
          child.init()
        } else if(this.activeName == 'typeOfVirtualRoom') {
          var child = this.$refs.typeOfVirtualRoom
          child.listSearch()
        }
      },
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>
<style scoped>
.el-tabs--border-card{
  background: #fff;
  border: none !important;
  border-top: 1px solid #dcdfe6 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
<style>
.goodsmanage .el-tabs__content{
  position: absolute;
  overflow: auto;
  height: calc(100% - 120px);
}
</style>

