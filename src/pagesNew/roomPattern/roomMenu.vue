// 右键菜单
<template>
  <section>
    <el-dropdown
      ref="dropdown"
      trigger="click"
      class="room-dropdown"
      placement="bottom" :style="position">
      <div></div>
      <el-dropdown-menu slot="dropdown" id="pattern-dropdown-li" class="pattern-dropdown-li">
        <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='CLEAN_CHECKED' || item.roomStatus=='CLEAN_NOCHECK' || item.roomStatus=='DIRTY' ) && !item.guestOrderPk">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:saveCheckin')" @click="toCheckin(item)">办理入住</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.guestOrderPk">
          <el-button type="text" @click="toDialogVisible(item, 'info')" :disabled="!hasPerm('pms:roomPattern:saveContinue')">办理续住</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.guestOrderPk">
          <el-button type="text" @click="toDialogVisible(item, 'settle')" :disabled="!hasPerm('pms:roomPattern:settleLeave')">结账退房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='CLEAN_NOCHECK' || item.roomStatus=='CLEAN_CHECKED' || item.guestOrderPk || item.roomStatus=='SELF_USE' || item.roomStatus=='FREE_ROOM') && item.roomStatus!='DIRTY'">
          <el-button :disabled="!hasPerm('pms:roomPattern:toDirty')" type="text" @click="changeRoomStatus(item, 'DIRTY', index)">转为脏房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DIRTY' || item.roomStatus=='CLEAN_CHECKED' || item.roomStatus=='OCCUPY'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:cleanNocheck')" @click="changeRoomStatus(item, 'CLEAN_NOCHECK', index)">清洁未检查</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DIRTY' || item.roomStatus=='CLEAN_NOCHECK'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:cleanCheck')" @click="changeRoomStatus(item, 'CLEAN_CHECKED', index)" >清洁检查房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='DIRTY' || item.roomStatus=='CLEAN_NOCHECK' || item.roomStatus=='CLEAN_CHECKED' || item.roomStatus=='SELF_USE' || item.roomStatus=='FREE_ROOM') && !item.guestOrderPk">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:toRepair')" @click="showRepair(item)" >转维修房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="(item.roomStatus=='DIRTY' || item.roomStatus=='CLEAN_NOCHECK' || item.roomStatus=='CLEAN_CHECKED' || item.roomStatus=='SELF_USE' || item.roomStatus=='FREE_ROOM' ) && !item.guestOrderPk">
          <el-button :disabled="!hasPerm('pms:roomPattern:toDisable')" type="text" @click="showDisable(item)" >转停用房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='REPAIR_ROOM'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:showRepair')" @click="seeRoomReason(item, 'REPAIR')">查看维修房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DISABLE_ROOM'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:showDisable')" @click="seeRoomReason(item, 'DISABLE')" >查看停用房</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='REPAIR_ROOM'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:endRepair')" @click="finshRoomReason(item,'REPAIR')" >结束维修</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.roomStatus=='DISABLE_ROOM'">
          <el-button type="text" :disabled="!hasPerm('pms:roomPattern:endDisable')" @click="finshRoomReason(item,'DISABLE')">结束停用</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.orderPk">
          <el-button type="text" @click="toDialogVisible(item, 'info')" :disabled="!hasPerm('pms:roomPattern:showOrderInfo')" >查看订单信息</el-button>
        </el-dropdown-item>
        <el-dropdown-item class="el-dropdown-menu__item" v-if="item.orderPk || item.arrivalOrderPk">
          <el-button type="text" @click="joinRoom(item)">联房</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>

export default {
  components: {  },
  data() {
    return {
      dialogVisible: false,
      item:{
        roomStatus:""
      },
      position:{
        position: 'absolute',
        left: 0,
        top: 0
      }
    };
  },
  methods: {
    show(item,left,top) {   

      this.$set(this.position,"top",top+"px")
      if(this.position.left === 1){
        this.$set(this.position,"left",(left-57)+"px")
      }else{
        this.$set(this.position,"left",left+"px")
      }
      this.item = item
      // this.$nextTick(() => {
        this.$refs.dropdown.show();

        console.log("show",document.getElementsByClassName("pattern-dropdown-li")[0])
        document.getElementsByClassName("pattern-dropdown-li")[0].style.top = this.position.top
        document.getElementsByClassName("pattern-dropdown-li")[0].style.left = this.position.left
      // })
    },
    hide(){
      this.$refs.dropdown.handleClick();
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("callback");
    }
  }
};
</script>
<style lang="scss">
.pattern-dropdown-li.el-popper{
  box-shadow:none;
  .popper__arrow{
    display: none;
  }
}
</style>

<style scoped lang="scss">

</style>
