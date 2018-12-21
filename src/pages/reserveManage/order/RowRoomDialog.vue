<template>
  <el-dialog class="son-dialog" title="预定排房" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :before-close="handleClose">
    <div class="pattern-dialog-container" style="padding: 0px 4px;">
      <el-table ref="rowRoomTable" :data="guestTable" tooltip-effect="dark" style="width: 100%" height="400" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="90" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click"
              v-model="scope.row.showFlag">
              <el-table :data="scope.row.tempRowRoomData" height="300" @row-dblclick="selectRoom($event, scope.$index)">
                <el-table-column property="roomNumber" label="房间号"></el-table-column>
                <el-table-column property="roomStatusName" label="状态"></el-table-column>
              </el-table>
              <el-input slot="reference" v-model="scope.row.roomNumber" readonly size="mini"></el-input>
            </el-popover>
            <!-- <span v-if="scope.row.roomPk">{{scope.row.roomNumber}}</span>
            <el-button size="mini" type="primary" @click="clickForRowRoom(scope.row)" v-else>排房</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="roomTypeName" label="类型"  align="center">
        </el-table-column>
        <el-table-column prop="beginDate" label="预抵日期" align="center">
        </el-table-column>
        <el-table-column prop="endDate" label="预离日期"  align="center">
        </el-table-column>
        <!-- <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.roomPk" style="color:blue">已排房</span>
            <span v-else style="color:red">未排房</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submitRowRoom" :loading="loading" :disabled="cpCount!=guestTable.length">排房</el-button>
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>

</template>

<script>
import moment from 'moment'
import {rowRoomList, rowRoomBatch} from '@/api/order/pmsOrderController'

export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,
      guestTable: [],
      cpCount: 0,
      orderPk: null,
      multipleSelection:[],
    };
  },
  methods: {
    showDialog(orderPk, guestList) {
      console.log(guestList);
      this.orderPk = orderPk;
      this.cpCount = 0;
      this.dialogVisible = true;
      this.guestTable = [];
      guestList.forEach(guest => {
        if ( guest.orderStatus == "RESERVE" && !guest.roomPk && guest.mainFlag == "Y") {
          this.guestTable.push({
            guestOrderPk: guest.guestOrderPk,
            roomTypeName: guest.roomTypeName,
            beginDate: guest.beginDate,
            endDate: guest.endDate,
            roomTypePk: guest.roomTypePk,
            roomNumber: '',
            roomPk:'',
            showFlag: false,
          });
        }
      });

      //处理自动排房
      this.guestTable.forEach((guest, index) => {
        let data = {
          roomTypePk: guest.roomTypePk,
          beginDateTime: guest.beginDate,
          endDateTime: guest.endDate
        }
        rowRoomList(data).then(res => {
          this.$set(guest, 'tempRowRoomData', res.data)
          if (res.data.length>0) {
            if (res.data[index]) {
              guest.roomNumber = res.data[index].roomNumber
              guest.roomPk = res.data[index].roomPk
            }else{
              guest.roomNumber = res.data[0].roomNumber
              guest.roomPk = res.data[0].roomPk
            }
          }
        }).finally(()=>{
          this.cpCount++;
        })
      })
    },
    //双击选择房间
    selectRoom(row, guestRowIndex) {
      // console.log("row", row);
      // console.log("guestRowIndex", guestRowIndex);
      this.guestTable[guestRowIndex].roomNumber = row.roomNumber
      this.guestTable[guestRowIndex].roomPk = row.roomPk
      this.guestTable[guestRowIndex].showFlag = false
    },
    //提交排房
    submitRowRoom() {
      if(this.multipleSelection.length<=0){
        this.$message.warning('至少选择一条')
        return;
      }
      let data = {
        orderPk: this.orderPk,
        data: this.multipleSelection
      }
      console.log(data);
      this.loading = true;
      rowRoomBatch(data).then(res=>{
        this.$message.success('操作成功')
        this.dialogVisible = false;
        this.$emit('refresh', this.orderPk, 'visitor');
      }).finally(()=>{
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose() {
      this.dialogVisible = false;
      // this.initOrderInfo(this.currOrderPk, 'visitor')
    }
  }
};
</script>

<style>
</style>
