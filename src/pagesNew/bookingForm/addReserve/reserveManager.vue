// 预定管理
<template>
  <div>
    <!-- 预定管理 -->
    <el-dialog class="son-dialog" title="预订管理" :visible.sync="dialogReservationManag" width="900px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-table ref="reservationManagTableRef" :data="reservationManagTable" border tooltip-effect="dark" height="450" style="width: 100%" @selection-change="changeCheck">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.roomNumber}} </span>
            <span v-if="scope.row.roomStatus">({{roomStatusMap[scope.row.roomStatus]}})</span>
          </template>
        </el-table-column>
        <el-table-column prop="guestName" label="客人姓名"></el-table-column>
        <el-table-column prop="roomTypeName" label="房间类型" width="150"></el-table-column>
        <el-table-column prop="beginDate" label="预抵日期" width="180"></el-table-column>
        <el-table-column prop="endDate" label="预离日期" width="180"></el-table-column>
        <el-table-column prop="orderStatus" label="状态">
          <template slot-scope="scope">
            <span>{{orderStatusMap[scope.row.orderStatus]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;">
        <el-date-picker
          v-model="datePicker"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions0"
          size="mini">
        </el-date-picker>
        <el-button size="mini" type="primary" @click="editDate" :loading="loading1" :disabled="loading">更改抵离日期</el-button>

        <el-select v-model="roomTypePk" placeholder="请选择房间类型" size="mini" style="margin-left:78px">
          <el-option :label="r.typeName" :value="r.typePk" v-for="r in roomTypeArray" :key="r.typePk"></el-option>
        </el-select>
        <el-button size="mini" type="primary" :loading="loading2" @click="editRoomType" :disabled="loading">更改房型</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="checkin" :loading="loading3" :disabled="loading">入住</el-button>
        <!--<el-button size="mini" type="primary" >全部入住</el-button>-->
        <el-button size="mini" type="primary" @click="cancelReserve" :loading="loading4" :disabled="loading">取消预订</el-button>
        <!--<el-button size="mini" type="primary" @click="batchCancelReserve">取消所有预订</el-button>-->
        <!--<el-button size="mini" type="primary">延时入住</el-button>-->
        <el-button size="mini" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import bus from "@/utils/bus";
import { orderStatusMap,roomStatusMap } from "@/utils/orm";
import {
  findReserveGuest,
  checkin,
  cancelGuestOrder,
  updateReserveDateBatch,
  updateReserveRoomTypeBatch
} from "@/api/order/pmsOrderController";
export default {
  //   components:{orm},
  data() {
    return {
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
      loading4:false,
      currOrderPk: "", //当前主订单主键
      orderStatusMap: orderStatusMap,
      roomStatusMap: roomStatusMap,
      dialogReservationManag: false,
      reservationManagTable: [],
      selectionRows: [], //已勾选的数据
      roomTypeArray:[],
      datePicker:[],
      pickerOptions0: {
        //限制今天以前的日期不可选择
        disabledDate(time) {
          return time.getTime() < moment().subtract(1, 'days') - 8.64e7;
        },
      },
      roomTypePk:'',
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
      this.currOrderPk = orderPk;
      this.dialogReservationManag = true;
      findReserveGuest({ orderPk: orderPk }).then(res => {
        this.reservationManagTable = res.data;
      });

      let typeList = JSON.parse(localStorage.getItem("pms_type"))
      this.roomTypeArray = []
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE") {
          this.roomTypeArray.push(item);
        }
      })
    },
    out() {
      //出口
      if (this.selectionRows.length <= 0) {
        return;
      }
      this.dialogReservationManag = false;
      this.$emit("callback"); //更新
    },
    changeCheck(val) {
      this.selectionRows = val;
    },
    checkin() {
      //入住
      if (this.selectionRows.length <= 0) {
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
      checkin({ orderPk: this.currOrderPk, guestOrderPks: guestOrderPks }).then(
        res => {
          this.$message({
            type: "success",
            message: "入住成功!"
          });
          //TODO 不关闭页面，只移除对应的数组
          this.out();
        }
      );
    },
    cancelReserve() {
      //取消预订
      if (this.selectionRows.length <= 0) {
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
      cancelGuestOrder({ guestOrderPks: guestOrderPks }).then(res => {
        this.$message({
          type: "success",
          message: "取消成功!"
        });
        this.out();
      });
    },
    batchCancelReserve() {
      //取消所有预定
      this.$confirm("是否取消所有 预订?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.selectionRows = this.reservationManagTable;
        this.cancelReserve();
      })

    },
    // 更改抵离日期
    editDate(){
      // this.loading = true
      // this.loading1 = true
      if(this.selectionRows.length<=0){
        // this.loading = false
        // this.loading1 = false
        return
      }
      if(!this.datePicker[0] || !this.datePicker[1]) {
        this.$message.warning('请选择预抵预离日期')
        // this.loading = false
        // this.loading1 = false
        return
      }

      this.$confirm("将更改抵离日期为 "+this.datePicker[0]+" 至 "+this.datePicker[1]+"，是否继续?", "提示", {
        type:'warning',
        beforeClose: (action, instance, done) =>{
          if (action === 'confirm')  {
            instance.confirmButtonLoading = true;

            let guestPks=[]
            this.selectionRows.forEach(item=>{
              guestPks.push(item.guestOrderPk)
            })
            let data = {
              orderPk:this.currOrderPk,
              guestPks:guestPks,
              beginDate: this.datePicker[0],
              endDate: this.datePicker[1],
            }
            updateReserveDateBatch(data).then(res=>{
              this.init(this.currOrderPk)
              this.$message.success("操作成功")
            }).finally(()=>{
              instance.confirmButtonLoading = false;
              done();
            })
          } else {
            if(instance.confirmButtonLoading==false) {
              done();
            }
          }
        }
      }).then(()=>{});

    },

    //更改房型
    editRoomType(){
      if(this.selectionRows.length<=0){
        return
      }
      if(!this.roomTypePk){
        this.$message.warning('请选择房型')
        return
      }

      let typeName = ''
      this.roomTypeArray.forEach(item=>{
        if(this.roomTypePk==item.typePk){
          typeName = item.typeName
        }
      })
      this.$confirm('将更改房型为 '+typeName+' ，是否继续?', "提示", {
        type:'warning',
        beforeClose: (action, instance, done) =>{
          if (action === 'confirm')  {
            instance.confirmButtonLoading = true;

            let guestPks=[]
            this.selectionRows.forEach(item=>{
              guestPks.push(item.guestOrderPk)
            })
            let data = {
              orderPk:this.currOrderPk,
              guestPks:guestPks,
              roomTypePk: this.roomTypePk
            }
            updateReserveRoomTypeBatch(data).then(res=>{
              this.init(this.currOrderPk)
              this.$message.success("操作成功")
            }).finally(()=>{
              instance.confirmButtonLoading = false;
              done();
            })
          } else {
            if(instance.confirmButtonLoading==false) {
              done();
            }
          }
        }
      }).then(()=>{});
      
    },
    handleClose(){
      this.$emit('callback')
      this.dialogReservationManag = false
    }
  }
};
</script>


