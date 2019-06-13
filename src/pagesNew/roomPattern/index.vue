<template>
  <el-container class="room-pattern-class">
    <el-header height="50px" class="room-pattern-header">
      <el-form :inline="true" size="mini" class="">
        <el-form-item label="楼栋：">
          <el-select
            class="selectWidth"
            v-model="selectForm.buildingPk"
            placeholder="请选择"
            clearable
            @change="init">
            <el-option
              v-for="y in buildingArr"
              :key="y.buildingPk"
              :label="y.buildingName"
              :value="y.buildingPk"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层：">
          <el-select
            class="selectWidth"
            v-model="selectForm.storeyPk"
            placeholder="请选择" clearable @change="init">
            <el-option
              v-for="y in floorArr"
              :key="y.storeyPk"
              :label="y.storeyName"
              :value="y.storeyPk"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房型：">
          <el-select
            class="selectWidth"
            v-model="selectForm.roomTypePk"
            placeholder="请选择"
            clearable
            @change="init"
          >
            <el-option v-for="y in roomType" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道：">
          <channel-select
            placeholder="请选择"
            ref="channelRef"
            class="selectWidth"
            @callback="init"
            v-model="selectForm.channelPk"/>
        </el-form-item>
        <el-form-item label="房号：">
          <el-input class="selectWidth" v-model="selectForm.roomNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="screhbtn" @click="init">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-container class="room-pattern-container">
      <el-main>
        <RoomRow ref="RoomRow" @roomTypeCount='roomTypeCountMonitor' @roomClick='roomClick'></RoomRow>
      </el-main>
      <el-aside width="300px">
        <Aside ref="Aside"></Aside>
      </el-aside>
    </el-container>
    <el-footer height="50px" class="room-pattern-footer">
      <div>
        <el-radio-group v-model="selectForm.filterStatus" size="mini" @change="roomTypeChange">
          <el-radio-button label="">全部(20)</el-radio-button>
          <el-radio-button :label="i" v-for="(item,i) in realTimeRoomStatusMap" :key='i'><span v-if="item.icon" class="Ident" ></span><span :style='roomTypeColor(i,item.icon)'>{{item.name}}({{roomTypeCount[i] || 0}})</span></el-radio-button>
        </el-radio-group>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import { roomStatusMap,realTimeRoomStatusMap,realTimeRoomStatusColor } from "@/utils/orm";

import { realTimeRoomStatus, loadOrderInfo } from "@/api/roomStatus/pmsRoomStatusController";
import { listStorey } from "@/api/systemSet/roomSetting/floorRoom";
import { listBuilding } from "@/api/systemSet/roomSetting/buildingController";

//=====================组件==========================
//房间
import RoomRow from "$pages/roomPattern/roomRow";
//右边菜单
import Aside from "$pages/roomPattern/aside";

export default {
  components: {
    RoomRow,
    Aside
  },
  data() {
    return {
      roomList: [], //房态数据
      roomType: [], //房间类型
      floorArr: [], //楼层数据
      buildingArr: [], //楼栋数据
      realTimeRoomStatusMap:{},//房态类型
      channelArr: [], //渠道数据
      roomTypeCount: {}, //房态标识房间统计
      //搜索表单
      selectForm: {
        roomTypePk: '',//房型
        storeyPk: '',//楼层
        buildingPk: '',//楼栋
        channelPk: '',//渠道
        filterStatus: '',//房态标识
        roomNumber: "",//房间号
      }
    }
  },
  methods: {
    /**
     * 初始化调用，查找房间数据
     * @augments */
    init(val) {
      this.realTimeRoomStatusMap = realTimeRoomStatusMap
    },
    //监听点击房态实事件
    roomClick(obj){
      
      this.$refs.Aside.setRoomInfo(obj)
    },
    //房态标识房间统计
    roomTypeCountMonitor(map){
      this.roomTypeCount = map
    },
    //底部 样式
    roomTypeColor(key){
      let colorInfo = {
        color: '#000'
      }
      colorInfo.color = realTimeRoomStatusColor[key].color1
      return colorInfo
    },
    //订单详细弹窗 关闭回调事件
    closeOrderDialog() {
      this.init();
    },
    /**
     * 底部
     * 房态选择
     */
    roomTypeChange(){
      console.log(this.selectForm);
      this.$refs.RoomRow.init(this.selectForm)
    }
  },
  mounted() {
    this.channelArr = [];
    //获取渠道类型
    var typeList = JSON.parse(localStorage.getItem("pms_type"));
    typeList.forEach(item => {
      //渠道
      if (item.typeMaster == "CHANNEL") {
        this.channelArr.push(item);
      }
    });
    //楼层
    listStorey().then(res => {
      this.floorArr = res.data;
    });
    //楼栋
    listBuilding().then(res => {
      this.buildingArr = res.data;
    });
    this.init();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
 @import "../../assets/scss/roomPattern.scss";
</style>
