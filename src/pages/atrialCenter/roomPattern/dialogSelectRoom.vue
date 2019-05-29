<template>
  <div>
    <el-dialog class="son-dialog" title="选择房间" :visible.sync="dialogSelectRoom" width="30%" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 0px 4px;">
        <div class="select-title">可选房型：{{select_room_type_name}}</div>
        <el-table
          :data="selectRoomTableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="300"
          border
          size="mini">
          <el-table-column prop="roomNumber" label="房号" width="90" align="center">
          </el-table-column>
          <el-table-column prop="roomTypeName" label="类型" width="120" align="center">
          </el-table-column>
          <el-table-column prop="roomStatusName" label="房态" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="submitRowRoom(scope.row)">选择房间</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogSelectRoom = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {rowRoomList } from '@/api/order/pmsOrderController'
export default {
    data() {
        return {
            selectRoomTableData: [],
        }
    },
    methods: {
        clickForRowRoom(row) {//查找可排房的房间列表
            this.selectRoomTableData = []
            this.select_room_type_name = row.roomTypeName
            this.rowRoomSelectGuestPk = row.guestOrderPk
            let data = {
                roomTypePk:row.roomTypePk,
                beginDateTime:row.beginDate,
                endDateTime:row.endDate
            }
            rowRoomList(data).then(res=>{
                this.selectRoomTableData = res.data
                this.dialogSelectRoom = true
            })
        },
        submitRowRoom(room) {//提交排房
            let data = {
                guestOrderPk:this.rowRoomSelectGuestPk,
                roomPk: room.roomPk
            }
            rowRoom(data).then(res=>{
                this.rowRoomTableData.forEach(row=>{
                if(row.guestOrderPk==this.rowRoomSelectGuestPk){
                    row.roomPk = room.roomPk
                    row.roomNumber = room.roomNumber
                }
                })
                this.dialogSelectRoom = false
                this.$message({type:'success', message:'已排房'})
            })
        },
    }
}
</script>

<style scoped>

</style>

