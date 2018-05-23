<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="会议室" name="first" class="aLayerOfPage" v-if="powerJudge('2201')">
        <conference-room ref='room'/>
      </el-tab-pane>
      <el-tab-pane label="会议室管理" name="second" class="aLayerOfPage" v-if="powerJudge('2202')">
        <conference-room-manage ref="roomMange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ConferenceRoom from './ConferenceRoom'
  import ConferenceRoomManage from './ConferenceRoomManage'
  import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      ConferenceRoom,
      ConferenceRoomManage
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
        if(tab.name=='first'){//点击会议室
          this.$refs.room.initDate();
        }else{//点击会议室管理
          this.$refs.roomMange.getList();
        }
      },
      powerJudge(id){
        return powerJudge(id);
      }
      
    }
  }
</script>

