// 新增预定-账单
<template>
  <div class="bill_style">
    <el-row>
      <el-col :span="15">
        <el-col :span="24">
          <el-form ref="serachForm" :model="serachForm" size="mini" label-width="80px">
            <el-col :span="24">
              <el-form-item label-width="0">
                <el-radio-group v-model="serachForm.state" @change="listBill">
                  <el-radio v-for="(value, key) in billStatusMap" :key="key" :label="key">{{value}}</el-radio>
                  <el-radio >全部账</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房间号" label-width="55px">
                <el-select v-model="serachForm.roomPk" placeholder="请选择房间号" @change="listBill">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="y in filterRoom(guestOrderSelect)" :key="y.roomPk" :label="y.roomNumber" :value="y.roomPk"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客人姓名">
                <el-select v-model="serachForm.guestOrderPk" placeholder="请选择客人姓名" @change="listBill">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="y in guestOrderSelect" :key="y.guestOrderPk" :label="y.memName" :value="y.guestOrderPk"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="营业日期">
                <el-date-picker type="date" @change="listBill" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="serachForm.currentData" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form>  
        </el-col>
        <el-col :span="22">
          <!-- 账单列表 -->
          <el-table ref="multipleTable" size="mini" :data="billsList" @selection-change="handleSelectionChange" tooltip-effect="dark" border height="240" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="projectName" label="项目" width="100"></el-table-column>
            <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
            <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
            <el-table-column prop="payment" label="支付方式">
              <template slot-scope="scope">
                <span>{{paymentMap[scope.row.payment]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量"></el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="billStatus" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.billStatus == 'UN_SET'">未结账</span>
                <span v-if="scope.row.billStatus == 'FINISH'">已结算</span>
                <span v-if="scope.row.billStatus == 'OFFSET'">冲减</span>
                <span v-if="scope.row.billStatus == 'FORWARD'">转账</span>
              </template>
            </el-table-column>
            <el-table-column prop="businessDate" label="营业日期" min-width="110"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="createTime" label="发生日期"  min-width="180"></el-table-column>
            <el-table-column prop="remark" label="备注"  min-width="180"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="marginTop10 bill-el-button">
          财务处理：
          <el-button size="mini" @click="splitBillOperation" :disabled="currOrderInfo.order.orderStatus=='LEAVE'">拆账</el-button>
          <el-button size="mini" @click="offsetBillOperation" :disabled="currOrderInfo.order.orderStatus=='LEAVE'">冲减</el-button>
          <!-- <el-button size="mini" @click="dialogTransferAccounts = true" v-if="powerJudge('402004')">转账</el-button> -->
          <el-button size="mini" @click="dialogAccountedFor = true" :disabled="currOrderInfo.order.orderStatus=='LEAVE'">入账</el-button>
          <!-- <el-button size="mini" @click="dialogBatchEntry = true">批量入账</el-button> -->
          <!-- <el-button size="mini" @click="dialogPreLicensing = true">预授权<span>0</span>笔</el-button> -->
          <!-- <el-button size="mini" @click="dialogVirtualBill = true">虚拟账单</el-button> -->
        </el-col>
        <el-col :span="24" class="bill-el-button">
          结账处理：
          <el-button size="mini" @click="settlement(0)" v-if="currOrderInfo.order.orderStatus=='CHECKIN' || currOrderInfo.order.orderStatus=='LEAVENOPAY'" :disabled="currOrderInfo.order.hfFlag=='Y' && currOrderInfo.order.orderStatus=='CHECKIN'">结账</el-button>
          <!-- (currOrderInfo.order.hfFlag=='Y' && currOrderInfo.order.orderStatus=='CHECKIN') -->
          <!-- <el-button size="mini">部分结账回复</el-button> -->
          <!-- <el-button size="mini" @click="dialogSingleRoom = true">单房结账</el-button> --> 
          <!-- <el-button size="mini">取消入住</el-button> -->
          <el-button size="mini" @click="settlement(1)" :disabled="currOrderInfo.order.orderStatus!='CHECKIN'">退房未结</el-button>
          <el-button size="mini" @click="settlement(2)" :disabled="currOrderInfo.order.orderStatus=='LEAVE'">部分结账</el-button>
          <!-- <el-button size="mini" @click="dialogPartialCheckout = true">个人结账</el-button> -->
        </el-col>
        <el-col :span="24" class="bill-el-button">
          打印处理：
          <el-button size="mini" @click="clickPrint">打印</el-button>
          <!-- <el-button size="mini" @click="dialogDepositPrint = true">押金打印</el-button> -->
        </el-col>
      </el-col>
      <el-col :span="9" class="bill-el-button">
        <el-col :span="24" class="marginTop10">
          <el-button v-for="item in conProjectList" :key="item.projectPk" type="success" plain size="mini" @click="openAddBill(item)" class="buttonsRight">{{item.projectName}}</el-button>
        </el-col>
        <el-col :span="24">
          <el-button v-for="item in roomProjectList" :key="item.projectPk" type="primary" plain size="mini" @click="openAddBill(item)" class="buttonsRight">{{item.projectName}}</el-button>
        </el-col>
      </el-col>
    </el-row>

    <el-dialog class="pattern-dialog height240" title="拆账" :visible.sync="dialogTollAllocation" width="25%" :before-close="handleClose" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="splitForm" :model="splitForm" size="mini" label-width="100px" class="batchOccupancy-content">
          <el-form-item label="原始金额：">
            <el-input v-model="splitForm.consumptionAmount"></el-input>
          </el-form-item>
          <el-form-item label="拆账金额：">
            <el-input v-model="splitForm.price"></el-input>
          </el-form-item>
          <el-form-item label="拆账原因：">
            <el-input v-model="splitForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary" @click="confirmSplit(splitForm)">确认</el-button>
        <el-button size="mini" type="primary" @click="dialogTollAllocation=false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="pattern-dialog height240" title="冲减" :visible.sync="dialogOffset" width="30%" :before-close="handleClose" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
       <el-form ref="splitForm" :model="splitForm" size="mini" label-width="100px" class="batchOccupancy-content">
          <el-form-item label="授权员：">
            <el-input value="深圳市前海豪斯菲尔信息科技有效公司" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原始金额：">
            <el-input v-model="splitForm.consumptionAmount"></el-input>
          </el-form-item>
          <el-form-item label="冲减金额：">
            <el-input v-model="splitForm.price"></el-input>
          </el-form-item>
          <el-form-item label="冲减原因：">
            <el-input v-model="splitForm.remark"></el-input>
          </el-form-item>
        </el-form>  
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary" @click="confirmOffset(splitForm)">确认</el-button>
        <el-button size="mini" type="primary" @click="dialogOffset = false">取消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="pattern-dialog height280" title="入账" :visible.sync="dialogAccountedFor" width="30%" :close-on-click-modal="false" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="formAddBill" :model="formAddBill" size="mini" label-width="80px">
          <el-form-item label="项目" required>
            <!-- <el-col :span="10">
              <el-input v-model="formAddBill.name" placeholder="项目编号"></el-input>
            </el-col> -->
            <el-col :span="24">
              <el-select v-model="formAddBill.projectPk" placeholder="请选择项目" style="width:100%">
                <el-option
                  v-for="item in conProjectList"
                  :key="item.projectPk"
                  :label="item.projectName"
                  :value="item.projectPk">
                </el-option>
                <el-option
                  v-for="item in roomProjectList"
                  :key="item.projectPk"
                  :label="item.projectName"
                  :value="item.projectPk">
                </el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="3">
              <el-button type="text" @click="projectSelectionAssistant = true">选择</el-button>
            </el-col> -->
          </el-form-item>
          <el-form-item label="客单" required>
            <el-select v-model="formAddBill.guestOrderPk" placeholder="请选择客单" style="width:100%">
              <el-option
                v-for="(item,index) in guestOrderSelect"
                :key="index"
                :label="'房间号:'+ifRoomNumber(item.roomNumber)+' 客人姓名:'+item.memName"
                :value="item.guestOrderPk">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式" required>
            <el-select v-model="formAddBill.payment" placeholder="请选择支付方式" style="width:100%">
              <el-option
                v-for="(value, key) in paymentMap"
                :key="key"
                :label="value"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="渠道类型" required v-if="formAddBill.payment=='5'">
            <channel-select ref="channelRef" v-model="formAddBill.channelTypePk" style="width:100%"></channel-select>
          </el-form-item> -->
          <el-form-item label="金额" required>
            <el-input v-model="formAddBill.consumptionAmount"></el-input>
          </el-form-item>
          <!-- <el-form-item label="原始凭证号">
            <el-input v-model="formAddBill.name"></el-input>
          </el-form-item> -->
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formAddBill.remark"></el-input>
          </el-form-item>
        </el-form> 
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary" @click="addBillList(formAddBill)">确认</el-button>
        <el-button size="mini" type="primary" @click="dialogAccountedFor = false">关闭</el-button>
      </span>
    </el-dialog> 

    <!-- 外借 -->
    <dialogBorrow ref="dialogBorrowRef" ></dialogBorrow>

    <!-- 打印组件 -->
    <commentPrint ref="commentPrintRef"></commentPrint>

    <!-- 结算弹出 -->
    <billSettlement ref="billSettlementRef"></billSettlement>
  </div>
</template>

<script src="./billJs.js">
</script>
<style scoped lang="scss">
@import './billCss.scss';
</style>
<style>
.bill-tabs-card .el-tabs__nav-scroll{
  margin-top: 10px;
  padding-left: 0;
} 
.bill-tabs-card>.el-tabs__header{
  margin-bottom: 0
}
.bill-tabs-card>.el-tabs__content{
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.height310 .el-dialog__body{
  height: 310px;
}
.height280 .el-dialog__body{
  height: 280px;
}
.height240 .el-dialog__body{
  height: 240px;
}
.height160 .el-dialog__body{
  height: 160px;
}
.checkout-color input{
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.message-box-content{
  width: 250px;
}
.bill_style .el-table td {
    padding: 4px 0;
    font-size: 13px;
}
.bill_style .marginTop10[data-v-5db2883f] {
    margin: 10px 0 0;
}
.bill_style .bill-el-button .el-button[data-v-5db2883f] {
    margin-right: 0;
    margin-bottom: 6px;
}
.bill_style .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 15px;
}
.bill_style .bill-el-button .el-button[data-v-5db2883f]{
  padding: 5px 11px;
}
.el-tabs__nav-scroll .el-button--mini, .el-button--mini.is-round {
    padding: 5px 13px;
}
.el-tabs__nav .el-tabs__item{
  line-height: 35px;
  height: 35px;
}
.info-title[data-v-2ab0e762]{
  padding: 0 5px;
}
</style>

