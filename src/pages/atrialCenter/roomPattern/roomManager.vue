// 房间管理
<template>
  <section>
    <el-dialog
      class="room-manager-dialog" 
      title="房间管理"
      :visible.sync="dialogVisible"
      width="1000px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <RoomManager ref="roomManageRef"></RoomManager>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose"  size="mini">关闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import RoomManager from '@/pages/roomService/roomManager/RoomManager'

export default {
  components:{RoomManager},
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.roomManageRef.init()
      })
    },
    handleClose(){
      this.dialogVisible = false;
      this.$emit('callback')
    },
  }
}
</script>

<style>
.room-manager-dialog .el-dialog__body{
  padding: 0px 20px;
}
</style>
