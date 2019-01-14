// 退房超时提醒
<template>
  <el-dialog class="pattern-dialog timeout-remind-dialog" title="提醒" :visible.sync="dialogVisable" width="600px" :before-close="handleClose" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 10px 4px;">
      <p>以下入住客单超过了退房时间，可能需要收取额外费用</p>
      <el-table
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column label="房间号"  prop="roomNumber"></el-table-column>
        <el-table-column label="客人姓名"  prop="guestName"></el-table-column>
        <el-table-column label="离店日期"  prop="endDate"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="continueSettleClick">不收取，继续退房</el-button>
      <el-button size="mini" type="primary" @click="toBillClick">收取</el-button>
      <el-button size="mini"  @click="dialogVisable = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {overtimeRemind} from '@/api/bill'
export default {
  data() {
    return {
      loading: false,
      dialogVisable:false,
      tableData:[],
      guestOrderPk:null,
    }
  },
  methods: {
    /**
     * @augments orderPk 必传
     * @augments guestOrderPk 可选
     */
    showDialog(orderPk, guestOrderPk) {
      this.guestOrderPk = guestOrderPk;
      //检测入住的客单是否超过退房时间，进行提醒
      overtimeRemind({orderPk: orderPk, guestOrderPk: guestOrderPk}).then(res=>{
        if(res.data.length>0) {
          this.dialogVisable = true
          this.tableData = res.data;
        }else{
          this.$emit('to-notcharge',this.guestOrderPk);
        }
      })
    },
    //点击不收取，继续退房
    continueSettleClick() {
      this.$emit('to-notcharge', this.guestOrderPk);
      this.dialogVisable = false
    },
    //点击收取，打开批量入账
    toBillClick() {
      let guestPks = []
      this.tableData.forEach(item=>{
        guestPks.push(item.guestOrderPk)
      })
      this.$emit('to-addbill', guestPks);
      this.dialogVisable = false;
    },
    handleClose() {
      this.dialogVisable = false;
    },
  }
}
</script>

<style>
.timeout-remind-dialog .el-dialog__body{
  height: 340px;
}
</style>
