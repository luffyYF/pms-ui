<template>
  <div class="height-programme-one">
    <el-tabs v-model="activeName" ref='checkTabs' @tab-click="handleClick">
      <el-tab-pane label="会议室" name="first" :disabled="firstDisabled" class="aLayerOfPage" >
        <conference-room ref='room'/>
      </el-tab-pane>
      <el-tab-pane label="会议室管理" name="second" class="aLayerOfPage" >
        <conference-room-manage ref="roomMange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import bus from '@/utils/bus'
  import ConferenceRoom from './ConferenceRoom'
  import ConferenceRoomManage from './ConferenceRoomManage'
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  
  export default {
    components: {
      ConferenceRoom,
      ConferenceRoomManage
    },
    data () {
      return {
        activeName: '',
        firstDisabled:false
      }
    },
    mounted(){
      //设置第一个不被隐藏的el-tab-pane为激活状态
      this.activeName = this.$refs.checkTabs.panes[0].name;
      bus.$on('conferenceRoomChange', () => {this.setActiveName() })
      bus.$on('conferenceRoomChangefalse', () => {this.firsrDisableFalse() })
    },
    methods: {
      handleClick (tab, event) {
        if(tab.name=='first'){//点击会议室
            this.$refs.room.initDate();
        }else{//点击会议室管理
          this.$refs.roomMange.getList();
        }
      },
      setActiveName(){
        this.activeName = 'second';
        this.firstDisabled = true;
      },
      firsrDisableFalse(){
        this.firstDisabled = false;
      }
      ,
      // powerJudge(id){
      //   return powerJudge(id);
      // }
    }
  }
</script>

