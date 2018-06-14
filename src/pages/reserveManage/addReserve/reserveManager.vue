// 预定管理
<template>
    <div>
        <!-- 预定管理 -->
        <el-dialog class="son-dialog" title="预订管理" :visible.sync="dialogReservationManag" width="60%" :append-to-body="true">
            <div class="pattern-dialog-container" style="padding: 0px 4px; display: table; width:100%">
                <el-table ref="reservationManagTableRef" :data="reservationManagTable" border tooltip-effect="dark" height="450" style="width: 100%" @selection-change="changeCheck">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="roomNumber" label="房号"></el-table-column>
                    <!-- <el-table-column prop="address" label="黑名单"></el-table-column> -->
                    <el-table-column prop="roomTypeName" label="房间类型"></el-table-column>
                    <el-table-column prop="beginDate" label="预抵日期"></el-table-column>
                    <el-table-column prop="endDate" label="预离日期"></el-table-column>
                    <el-table-column prop="orderStatus" label="状态">
                        <template slot-scope="scope">
                            <span>{{orderStatusMap[scope.row.orderStatus]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="checkin">入住</el-button>
                <el-button size="mini" type="primary">批量入住</el-button>
                <el-button size="mini" type="primary" @click="cancelReserve">取消预订</el-button>
                <el-button size="mini" type="primary" @click="batchCancelReserve">取消所有预订</el-button>
                <el-button size="mini" type="primary">延时入住</el-button>
                <el-button size="mini" @click="dialogReservationManag = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import bus from "@/utils/bus";
import { orderStatusMap } from "@/utils/orm";
import { findReserveGuest, checkin, cancelGuestOrder } from "@/api/order/pmsOrderController";
export default {
  //   components:{orm},
  data() {
    return {
      currOrderPk: '',//当前主订单主键
      orderStatusMap: orderStatusMap,
      dialogReservationManag: false,
      reservationManagTable: [],
      selectionRows: [] //已勾选的数据
    };
  },
  methods: {
    /**
     * 初始化加载客单列表
     * @augments orderPk 主订单主键*/
    init(orderPk) {
      if (!orderPk) {
        return;
      }
      this.currOrderPk = orderPk
      this.dialogReservationManag = true
      findReserveGuest({ orderPk: orderPk }).then(res => {
        this.reservationManagTable = res.data;
      });
    },
    out() {//出口
      if (this.selectionRows.length <= 0) {
        return;
      }
      this.dialogReservationManag = false;
      bus.$emit("refreshOrderInfo", this.currOrderPk); //更新
    },
    changeCheck(val) {
      this.selectionRows = val;
    },
    checkin() { //入住
      if(this.selectionRows.length<=0){
        this.$message({
          type: "warning",
          message: "请先选择一条订单!"
        });
        return;
      }
      let guestOrderPks = [];
      this.selectionRows.forEach(guest => {
        guestOrderPks.push(guest.guestOrderPk);
      });
      checkin({ guestOrderPks: guestOrderPks }).then(res => {
        this.$message({
          type: "success",
          message: "入住成功!"
        });
        //TODO 不关闭页面，只移除对应的数组
        this.out()
      });
    },
    cancelReserve() {//取消预订
      if(this.selectionRows.length<=0){
        this.$message({
          type: "warning",
          message: "请先选择一条订单!"
        });
        return;
      }
      let guestOrderPks = [];
      this.selectionRows.forEach(guest => {
        guestOrderPks.push(guest.guestOrderPk);
      });
      cancelGuestOrder({guestOrderPks: guestOrderPks}).then(res=>{
        this.$message({
          type: "success",
          message: "取消成功!"
        });
        this.out()
      })
    },
    batchCancelReserve() {//取消所有预定
      this.$confirm('是否取消所有 预订?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectionRows = this.reservationManagTable
        this.cancelReserve()
      })
    }
  }
};
</script>


