// 用户取消订单申请
<template>
  <section class="common-message-class">
    <el-dialog title="有用户取消预订单" 
      style="position: absolute;width:474px;left: calc(100% - 490px);top: auto;padding:0;"
      width="450px"
      :center="true"
      top="0" 
      :modal="false"
      custom-class="cancel-reserve-order-dialog"
      :modal-append-to-body="false" 
      :visible.sync="visibleDialog" 
      :append-to-body="false" 
      :close-on-click-modal="false"
      :before-close="handleClose">
      <el-table :data="orderList" height="200px" @row-click="toDialogVisible" >
        <el-table-column align="center" prop="orderNo" label="订单号" width="80"></el-table-column>
        <el-table-column align="center" prop="userName" label="预定人" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column align="center" prop="userPhone" label="手机号" width="100"></el-table-column>
        <el-table-column align="center" prop="createTime" label="下单时间" width="140"></el-table-column>
      </el-table>
    </el-dialog>

  </section>
</template>

<script>
import moment from 'moment'
import {PrefixInteger} from '@/utils/index'

export default {
  data() {
    return {
      moment:moment,
      visibleDialog:false,
      orderList:[],
      now: moment(),
    }
  },
  methods:{
    remind(data) {
      for(let obj of data) {
        this.orderList.push(obj)
      }
      this.visibleDialog = true
    },
    toDialogVisible(item) {
      console.log(item)
      this.$router.push("/reserveManage/miniappOrder")
    },
    handleClose() {
      this.visibleDialog = false
    }
  }
}
</script>

<style>

.cancel-reserve-order-dialog{
  bottom: 0;
  width:300px;
  border: 1px solid #F60;
  
}
.cancel-reserve-order-dialog .el-dialog__header{
    color: white;
    background-color: #F60;
    padding: 10px;
}
.cancel-reserve-order-dialog .el-dialog__body{
    padding: 0 0px;
}
.cancel-reserve-order-dialog .el-dialog__title{
    color: white;
    font-size: 15px;
    line-height: 15px;
}
.cancel-reserve-order-dialog .el-dialog__headerbtn .el-dialog__close{
  color: white;
}
.cancel-reserve-order-dialog .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
}
.cancel-reserve-order-dialog .el-table .cell{
  font-size: 12px;
  padding: 0;
}
</style>
