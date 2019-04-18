// 联房弹出
<template>
  <section>
    <el-dialog title="联房" :visible.sync="dialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <div class="joinRoom-line">
        <span>退出联房</span>
      </div>
      <div class="settle-left"> 
        现有联房房间数：<span style="color:#ffb303">{{totalLinkCount}}</span>&nbsp;&nbsp;
        选中退出联房房间数：<span style="color:green">{{selectLinkCount}}</span>
      </div>

      <el-table :data="guestTable" size="mini" height="250" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="100"></el-table-column>
        <el-table-column prop="roomTypeName" label="房型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="guestName" label="姓名" ></el-table-column>
        <el-table-column prop="checkinDate" label="入住时间" width="180"></el-table-column>
        <el-table-column prop="orderStatus" label="状态">
          <template slot-scope="scope">
            <span>{{orderStatusMap[scope.row.orderStatus]}}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="center-button">
        <div class="settle-left"> 
          <span style="color:red">温馨提示：已离店房间不能退出联房</span>
        </div>
        <div class="settle-right">
          <el-button type="primary" size="mini" @click="outJoin" style="width:80px" :loading="loading1">退出联房</el-button>
          <el-button type="primary" size="mini" @click="outJoinDissolve" style="width:80px" :loading="loading2">解散联房</el-button>
        </div>
      </div>

      <div class="joinRoom-line">
        <span>加入联房</span>
      </div>
      
      <div class="center-button">
        <div class="settle-left">
          可加入联房房间数：<span style="color:#ffb303">{{totalAddCount}}</span>&nbsp;&nbsp;
          选中联房房间数：<span style="color:green">{{selectAddCount}}</span>
        </div>
        <div class="settle-right">
          <el-button type="primary" size="mini" @click="choiceLinkRoom" style="width:80px">选联房</el-button>
          <el-button type="primary" size="mini" @click="choiceRoom" style="width:80px">选房</el-button>
        </div>
      </div>
      <el-table ref="addTableTab" :data="addTable" @selection-change="handleAddSelectionChange" size="mini" height="200" border style="width: 100%">
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="100"></el-table-column>
        <el-table-column prop="roomTypeName" label="房型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="guestName" label="姓名"></el-table-column>
        <el-table-column prop="checkinDate" label="入住时间" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="remove(scope.$index)" style="color:red">移除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <div class="settle-left"> 
          <!-- <span style="color:red">温馨提示：已联房房间或团队房间不能加入联房</span> -->
        </div>
        <el-button type="primary" size="mini" @click="join" :loading="loading3" style="width:80px">加入联房</el-button>
        <!-- <el-button type="primary" size="mini" @click="addBill('SETTLEMENT')" >取消</el-button> -->
        <el-button @click="handleClose" size="mini" style="width:80px">取消</el-button>
      </span>
    </el-dialog>
    <select-room-dialog ref="selectRoomDialogRef"></select-room-dialog>
    <select-link-room-dialog ref="selectLinkRoomDialogRef" @callback="takeGuest"></select-link-room-dialog>
  </section>
</template>

<script>
import {orderStatusMap} from '@/utils/orm'
import { add,listBill,settle } from "@/api/financial/OutsideBillOrderController"
import {linkListGuest,linkJoin, outJoin} from '@/api/order/pmsOrderController'
import SelectRoomDialog from './SelectRoomDialog'
import SelectLinkRoomDialog from './SelectLinkRoomDialog'

export default {
  components: {SelectRoomDialog,SelectLinkRoomDialog},
  data() {
    return {
      loading1:false,
      loading2:false,
      loading3:false,
      dialogVisible: false,
      orderStatusMap:orderStatusMap,
      guestTable:[],
      addTable:[],
      orderPk:null,
      multipleSelection:[],
      multipleSelectionAdd:[]
    }
  },
  computed: {
    totalLinkCount: function() {
      return this.guestTable.length;
    },
    selectLinkCount: function() {
      return this.multipleSelection.length;
    },

    totalAddCount: function() {
      return this.addTable.length;
    },
    selectAddCount: function() {
      return this.multipleSelectionAdd.length;
    },
  },
  methods: {
    showDialog(orderPk){
      if(!orderPk) {
        return
      }
      this.orderPk = orderPk
      this.dialogVisible = true
      this.guestTable = []
      this.addTable = []
      this.listGuest()
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit('callback')
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleAddSelectionChange(val){
      this.multipleSelectionAdd = val;
    },
    choiceRoom() {
      this.$refs.selectRoomDialogRef.showDialog();
    },
    choiceLinkRoom() {
      this.$refs.selectLinkRoomDialogRef.showDialog(this.orderPk)
    },
    listGuest() {
      linkListGuest({orderPk:this.orderPk}).then(res=>{
        this.guestTable = res.data
      })
    },

    /**
     * 返回客单数据
     */
    takeGuest(guestList) {
      console.log(guestList)
      if(guestList) {
        let guestPks = ""
        for(let obj of this.addTable) {
          guestPks += obj.guestOrderPk + ","
        }
        guestList.forEach(item=>{
          if(guestPks.indexOf(item.guestOrderPk)==-1) {
            this.addTable.push(item)
            this.$refs.addTableTab.toggleRowSelection(item);
          }
        })
      }
    },
    //移除
    remove(index) {
      this.addTable.splice(index,1)
    },
    //加入联房
    join() {
      if(this.multipleSelectionAdd.length<=0) {
        return
      }
      this.loading3 = true
      let guestPks = []
      this.multipleSelectionAdd.forEach(item=>{
        guestPks.push(item.guestOrderPk)
      })
      let data = {
        orderPk: this.orderPk,
        guestPks: guestPks
      }
      linkJoin(data).then(res=>{
        this.addTable = this.addTable.filter(item=>{return !guestPks.includes(item.guestOrderPk)})
        this.listGuest();
        this.$message.success('加入联房成功')
      }).finally(()=>{
        this.loading3 = false
      })
    },
    //退出联房
    outJoin(){
      this.loading1 = true
      for(let obj of this.multipleSelection) {
        if(obj.orderStatus!='RESERVE' && obj.orderStatus!='CHECKIN') {
          this.$message.warning('请选择预定或入住的客单')
          this.loading1 = false
          return
        }
      }

      if(this.multipleSelection.length<=0) {
        this.$message.warning('请选择要退出的客单')
        this.loading1 = false
        return
      }
      let guestPks = []
      this.multipleSelection.forEach(item=>{
        guestPks.push(item.guestOrderPk)
      })

      let data = {
        orderPk: this.orderPk,
        guestPks:guestPks
      }
      outJoin(data).then(res=>{
        this.$message.success('操作成功')
        this.listGuest()
      }).finally(()=>{
        this.loading1 = false
      })
    },
    //解散联房
    outJoinDissolve() {
      let guestPks = []
      this.guestTable.forEach(item=>{
        if(item.orderStatus=='RESERVE' || item.orderStatus=='CHECKIN'){
          guestPks.push(item.guestOrderPk)
        }
      })
      if(guestPks.length<=0) {
        this.$message.warning('不可再解散联房')
        return
      }
      let data = {
        orderPk: this.orderPk,
        guestPks:guestPks
      }

      this.$confirm("是否解散联房", "提示", {
        type:'warning',
        beforeClose: (action, instance, done) =>{
          if (action === 'confirm')  {
          instance.confirmButtonLoading = true;
          //执行异步内容...

          outJoin(data).then(res=>{
            this.$message.success('操作成功')
            this.listGuest()
          }).finally(()=>{
            done();
            instance.confirmButtonLoading = false;
          })

          } else {
            if(instance.confirmButtonLoading==false) {
              done();
            }
          }
        }
      }).then(()=>{});

    },




    /**
     * 废
     */
    listBill() {
      listBill(this.orderPk).then(res=>{
        this.guestTable = res.data
      })
    },
    //添加账单
    addBill(projectType) {
      this.$refs.addBillDialogRef.showDialog(projectType);
    },
    addBillCallback(data) {
      this.addTable.push(data)
    },
    //保存账务
    saveBillOrder() {
      if(this.addTable.length<=0) {
        return
      }
      this.loading1 = true
      let bills = []
      this.addTable.forEach(item=>{
        bills.push({
          projectCode: item.projectCode,
          remark: item.remark,
          amount: item.consumptionAmount+item.settlementAmount
        })
      })
      // loading1
      let data = {
        orderPk: this.orderPk,
        bills:bills
      }
      add(data).then(res=>{
        this.orderPk = res.data
        this.listBill()
        this.addTable = []
      }).finally(()=>{
        this.loading1 = false
      })
    },
    //结账
    settle(){
      this.loading2 = true
      if(!this.orderPk) {
        this.loading2 = false
        this.$message.warning("请先添加账务")
        return
      }
      if(this.diff!=0) {
        this.loading2 = false
        this.$refs.settleBillDialogRef.showDialog(this.orderPk, this.totalConsum, this.totalSettle)
        return
      }
      this.$confirm('是否确认结账?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          orderPk: this.orderPk,
        }
        settle(data).then(res=>{
          this.$message.success('结算成功')
          this.listBill()
        }).finally(()=>{
          this.loading2 = false
        })
      }).catch(() => {
        this.loading2 = false
      });
    },
    //冲减
    offset(){
      if(this.multipleSelection.length<=0){
        this.$message.warning('请至少选择一条账单')
        return 
      }
      let amount = this.multipleSelection[0].consumptionAmount + this.multipleSelection[0].settlementAmount
      this.$refs.offsetBillDialogRef.showDialog(this.multipleSelection[0].billPk, amount)
    },


  }
}
</script>

<style scope>
.el-dialog__body {
  padding: 0px 20px !important;
}
.joinRoom-line{
  height: 5px;
  text-align: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #bdbdbd;
}
.joinRoom-line span{
  position: relative;
  top: -3px;
  background: #Fff;
  padding: 0 4px;
}
.center-button {
  /* text-align: right; */
  margin: 6px 0px;
}
.settle-left{
  float:left;
  height: 30px;
  
}
.settle-left span{
  margin-right: 12px;
}
.settle-right{
  text-align: right;
}
</style>
