// 新增预定-账单
<template>
  <div class="bill_style">
    <el-row>
      <el-col :span="16">
        <el-col :span="24">
          <el-form ref="serachForm" :inline="true" :model="serachForm" size="mini" label-width="80px">
            <el-col :span="24">
              <el-form-item label-width="0">
                <el-radio-group v-model="serachForm.state" @change="listBill">
                  <el-radio v-for="(value, key) in billStatusMap" :key="key" :label="key">{{value}}</el-radio>
                  <el-radio>全部账</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <div v-if="!isDubm">
              <el-form-item label="房间号" label-width="55px">
                <el-select v-model="serachForm.roomPk" placeholder="请选择房间号" @change="listBill" style="width: 140px;">
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="y in filterRoom(guestOrderSelect)"
                    :key="y.roomPk"
                    :label="y.roomNumber"
                    :value="y.roomPk"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客人姓名">
                <el-select v-model="serachForm.guestOrderPk" placeholder="请选择客人姓名" @change="listBill" style="width: 140px;">
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    v-for="y in guestOrderSelect"
                    :key="y.guestOrderPk"
                    :label="y.memName+' ('+ifRoomNumber(y.roomNumber)+')'"
                    :value="y.guestOrderPk"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业日期">
                <el-date-picker type="date" @change="listBill" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="serachForm.currentData" style="width: 152px;"></el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
        <el-col :span="23">
          <!-- 账单列表 -->
          <el-table ref="multipleTable" size="mini" :data="billsList" @selection-change="handleSelectionChange" tooltip-effect="dark" border height="240" style="width: 100%">
            <!-- :selectable="billSelectable" -->
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column prop="projectName" label="项目" width="100"></el-table-column>
            <el-table-column prop="consumptionAmount" label="消费金额"></el-table-column>
            <el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
            <!-- <el-table-column prop="payment" label="支付方式">
              <template slot-scope="scope">
                <span>{{paymentMap[scope.row.payment]}}</span>
              </template>
            </el-table-column> -->
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
        <el-col :span="24"> <br> </el-col>
        <el-col :span="24" class="bill-opr">
          财务处理：
          <el-button size="mini" @click="splitBillOperation" v-if="hasPerm('pms:billAss:splitBill')" :disabled="currOrderInfo.order.orderStatus=='LEAVE' || (dumbData.checkoutFlag == 'Y' && isDubm) ">拆账</el-button>
          <el-button size="mini" @click="offsetBillOperation" v-if="hasPerm('pms:billAss:offsetBill')" :disabled="currOrderInfo.order.orderStatus=='LEAVE' || (dumbData.checkoutFlag == 'Y' && isDubm) ">冲减</el-button>
          <el-button size="mini" @click="transferAccountsClick()" v-if="hasPerm('pms:billAss:transBill')" >转账</el-button>
          <!-- v-if="powerJudge('402004')" -->
          <el-button size="mini" @click="openAddBill()" :disabled="currOrderInfo.order.orderStatus=='LEAVE' || (dumbData.checkoutFlag == 'Y' && isDubm) ">入账</el-button>
          <el-button size="mini" @click="dialogBatchEntryClick()"  :disabled="currOrderInfo.order.orderStatus=='LEAVE' || (dumbData.checkoutFlag == 'Y' && isDubm) ">批量入账</el-button>
          <!-- <el-button size="mini" @click="dialogPreLicensing = true">预授权<span>0</span>笔</el-button> -->
          <el-button size="mini" v-if="!isDubm" @click="virtualBillClick()">虚拟账单</el-button>
        </el-col>
        <el-col :span="24" class="bill-opr">
          结账处理：
          <el-button size="mini" @click="settlement(0)" v-if="(currOrderInfo.order.orderStatus=='CHECKIN' || currOrderInfo.order.orderStatus=='LEAVENOPAY' || isDubm) && hasPerm('pms:billAss:billSettle')" :disabled="(currOrderInfo.order.hfFlag=='Y' && currOrderInfo.order.orderStatus=='CHECKIN') || (dumbData.checkoutFlag == 'Y' && isDubm)  ">结账</el-button>
          <el-button size="mini" @click="settlement(1)" v-if="hasPerm('pms:billAss:checkOut')" :disabled="currOrderInfo.order.orderStatus!='CHECKIN' || (dumbData.checkoutFlag == 'Y' && isDubm) ">退房未结</el-button>
          <el-button size="mini" @click="settlement(2)" v-if="hasPerm('pms:billAss:partialCheckout')" :disabled="currOrderInfo.order.orderStatus=='LEAVE' || (dumbData.checkoutFlag == 'Y' && isDubm) ">部分结账</el-button>
          <el-button size="mini" @click="toDialogRecoverBill" v-if="hasPerm('pms:billAss:partialCheckoutRec')" :disabled="currOrderInfo.order.orderStatus=='LEAVE'">部分结账恢复</el-button>
          <el-button size="mini" @click="toSingleSettle" v-if="hasPerm('pms:billAss:singleCheckOut')" :disabled="currOrderInfo.order.orderStatus!='CHECKIN' || currOrderInfo.order.hfFlag=='Y'">单房结账</el-button>

          <!-- <el-button size="mini" @click="dialogPartialCheckout = true">个人结账</el-button> -->
        </el-col>
        <el-col :span="24" class="bill-opr">
          打印处理：
          <el-button size="mini" v-if="hasPerm('pms:billAss:printBill')" @click="clickPrint">打印</el-button>
          <el-button size="mini" v-if="hasPerm('pms:billAss:depositPrint')" @click="clickDepositPrint">押金打印</el-button>
          <el-button size="mini" v-if="hasPerm('pms:billAss:exportBill')" @click="exportClick">导出账单</el-button>
        </el-col>
      </el-col>
      <el-col :span="8" class="bill-el-button">
        <!-- 消费项目列表 -->
        <el-col :span="24" class="marginTop10">
          <el-button
          v-for="item in conProjectList"
          v-if="(item.guestRoomFlag=='Y' && !isDubm) || (item.dumbRoomFlag=='Y' && isDubm)"
          :key="item.projectPk"
          type="success"
          plain
          size="mini"
          @click="openAddBill(item)"
          class="buttonsRight">{{item.projectName}}</el-button>
        </el-col>
        <!-- 结算项目列表 -->
        <el-col :span="24">
          <el-button
          v-for="item in roomProjectList"
          v-if="(item.guestRoomFlag=='Y' && !isDubm) || (item.dumbRoomFlag=='Y' && isDubm)"
          :key="item.projectPk"
          type="primary"
          plain
          size="mini"
          @click="openAddBill(item)"
          class="buttonsRight">{{item.projectName}}</el-button>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="24">
          <el-tabs v-model="summary" >
            <el-tab-pane label="财务信息" name="first" style="max-height:144px;overflow:auto;">
                <el-col class="colGreen bgBlue" :span="8">所选消费</el-col>
                <el-col class="colBlue bgBlue" :span="8">所选结算</el-col>
                <el-col class="colRed bgBlue" :span="8">所选余额</el-col>
                <el-col class="colGreen" :span="8">{{multipleSelection | changeconsumptionAmount}}</el-col>
                <el-col class="colBlue" :span="8">{{multipleSelection | changeSettlementAmount}}</el-col>
                <el-col class="colRed" :span="8">{{multipleSelection | changeYE}}</el-col>
                <el-col class="colGreen bgBlue" :span="8">消费</el-col>
                <el-col class="colBlue bgBlue" :span="8">结算</el-col>
                <el-col class="colRed bgBlue" :span="8">余额</el-col>
                <el-col class="colGreen" :span="8">{{billsList | changeconsumptionAmount}}</el-col>
                <el-col class="colBlue" :span="8">{{billsList | changeSettlementAmount}}</el-col>
                <el-col class="colRed" :span="8">{{billsList | changeYE}}</el-col>
                <!-- <el-col class="colGreen bgBlue" :span="8">个付</el-col>
                <el-col class="colBlue bgBlue" :span="8">结算</el-col>
                <el-col class="colRed bgBlue" :span="8">余额</el-col>
                <el-col class="colGreen" :span="8">0</el-col>
                <el-col class="colBlue" :span="8">0</el-col>
                <el-col class="colRed" :span="8">0</el-col>
                <el-col class="colGreen bgBlue" :span="8">团付</el-col>
                <el-col class="colBlue bgBlue" :span="8">结算</el-col>
                <el-col class="colRed bgBlue" :span="8">余额</el-col>
                <el-col class="colGreen" :span="8">0</el-col>
                <el-col class="colBlue" :span="8">0</el-col>
                <el-col class="colRed" :span="8">0</el-col> -->
            </el-tab-pane>
            <el-tab-pane label="消费汇总" name="tow"  style="max-height:144px;overflow:auto;">
              <el-col class="colWhite bgGreen" :span="12">项目名称</el-col>
              <el-col class="colWhite bgGreen" :span="12">金额</el-col>
              <el-row :gutter="24" v-for="obj in consumptionSummary(billsList)" :key="obj.billPk">
                <el-col style="border-bottom:1px dashed #666666;" :span="12">{{obj.projectName}}</el-col>
                <el-col style="border-bottom:1px dashed #666666;" :span="12">{{obj.consumptionAmount}}</el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="结算汇总" name="last"  style="max-height:144px;overflow:auto;">
              <el-col class="colWhite bgBlue" :span="12">项目名称</el-col>
              <el-col class="colWhite bgBlue" :span="12">金额</el-col>
              <el-row :gutter="24" v-for="obj in settlementAmountSummary(billsList)" :key="obj.billPk">
                <el-col style="border-bottom:1px dashed #666666;" :span="12">{{obj.projectName}}</el-col>
                <el-col style="border-bottom:1px dashed #666666;" :span="12">{{obj.settlementAmount}}</el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>

    </el-row>

    <!-- 拆账 -->
    <el-dialog class="pattern-dialog height240" title="拆账" :visible.sync="dialogTollAllocation" width="25%" :before-close="handleClose" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="splitForm" :model="splitForm" size="mini" label-width="100px" class="batchOccupancy-content">
          <el-form-item label="原始金额：">
            <el-input v-model="splitForm.consumptionAmount" :disabled="true"></el-input>
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

    <!-- 冲减 -->
    <el-dialog class="pattern-dialog height240" title="冲减" :visible.sync="dialogOffset" width="30%" :before-close="handleClose" :append-to-body="true">
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
       <el-form ref="splitForm" :model="splitForm" size="mini" label-width="100px" class="batchOccupancy-content">
          <!-- <el-form-item label="授权员：">
            <el-input value="深圳市前海豪斯菲尔信息科技有效公司" :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item label="原始金额：">
            <el-input v-model="splitForm.consumptionAmount" :disabled="true"></el-input>
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

    <!-- 入账 -->
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
          <el-form-item label="客单" required v-if="!isDubm" >
            <el-select v-model="formAddBill.guestOrderPk" placeholder="请选择客单" style="width:100%">
              <el-option
                v-for="(item,index) in getAddBillFilter(guestOrderSelect)"
                :key="index"
                :label="'房间号:'+ifRoomNumber(item.roomNumber)+' 客人姓名:'+item.memName"
                :value="item.guestOrderPk">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="支付方式" required>
            <el-select v-model="formAddBill.payment" placeholder="请选择支付方式" style="width:100%">
              <el-option
                v-for="(value, key) in paymentMap"
                :key="key"
                :label="value"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item> -->
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

    <!-- 项目选择 -->
    <el-dialog class="pattern-dialog height600" title="项目选择" :visible.sync="projectSelectDialog" width="550px" :close-on-click-modal="false" :append-to-body="true">
            <el-form ref="serachForm" :inline="true" :model="serachForm" size="mini" label-width="70px">
              <el-col :span="24">
                  <el-form-item label="项目类别:">
                    <el-select style="width:100%;" size="mini" @change="projectTypeChange()" v-model="virProjectType" placeholder="项目类别">
                        <el-option v-for="obj in projectTypeList" :key="obj.value" :label="obj.label" :value="obj.value"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-form>
           <el-table
              ref="singleTable"
              :data="allProjectList"
              highlight-current-row
              height="600"
              @current-change="handleProjectChange"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                property="code"
                label="编码"
                >
              </el-table-column>
              <el-table-column
                property="projectName"
                label="项目名"
                >
              </el-table-column>
              <el-table-column
                property="projectPrice"
                label="单价">
              </el-table-column>
              <!-- <el-table-column
                property="projectType"
                label="单价">
              </el-table-column> -->
            </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="primary" @click="projectSelectDialog = false">关闭</el-button>
        </span>
    </el-dialog>
    <!-- 虚拟账单 -->
    <el-dialog class="pattern-dialog height600" title="虚拟账单" :visible.sync="virDialog" width="1000px" :close-on-click-modal="false" :append-to-body="true">

        <el-form ref="serachForm" :inline="true" :model="serachForm" size="mini" label-width="70px">
            <el-col :span="24">
                <!-- <el-form-item label="请选择结账客单">
                  <el-select  style="width: 150px;" placeholder="请选择类型" clearable>
                      <el-option v-for="obj in currOrderInfo.guestList" :key="obj.guestOrderPk" :label="'房间号:'+ifRoomNumber(obj.roomNumber)+'客人姓名'+obj.guestName" :value="obj.guestOrderPk"></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <br> -->
                <el-form-item label="客人姓名:">
                  <el-input type="text" v-model="virtualBill.memNames" placeholder="客人姓名" style="width:150px;" size="mini"> </el-input>
                </el-form-item>
                <el-form-item label="房号:">
                  <el-input type="text" v-model="virtualBill.roomNumbers" placeholder="房号" style="width:150px;" size="mini"> </el-input>
                </el-form-item>
                <el-form-item label="房价">
                 <el-input type="text" v-model="virtualBill.currPrice" placeholder="房价"  size="mini"> </el-input>
                </el-form-item>
                <br>
                <el-form-item label="抵店日期:">
                  <el-date-picker type="datetime" style="width:150px;" v-model="virtualBill.beginDate" placeholder="抵店日期" value-format="yyyy-MM-dd HH:mm" size="mini"> </el-date-picker>
                </el-form-item>
                <el-form-item label="离店日期:">
                  <el-date-picker type="datetime" style="width:150px;" v-model="virtualBill.endDate" placeholder="离店日期" value-format="yyyy-MM-dd HH:mm"  size="mini"> </el-date-picker>
                </el-form-item>
            </el-col>
          </el-form>

        <el-table ref="multipleTable" size="mini" :data="virtualBillDatailList" tooltip-effect="dark" border height="490" style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column prop="projectName" label="项目" width="120" style="text-align:right;">
              <template slot-scope="scope">
                <el-input type="text" readonly="readonly" style="width:76px;" v-model="scope.row.projectName" placeholder="项目"  size="mini"> </el-input>
                  <!-- {{scope.row.projectName}}  -->
                  <el-button style="text-align:right;font-size:16px;" @click="projectChangeClick(scope.$index)" class="el-icon-more" size="mini" type="text"></el-button>
              </template>
            </el-table-column>
            <el-table-column width="80" prop="consumptionAmount" label="消费金额">
              <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.consumptionAmount" placeholder="结算金额" @change="virMomeyChange()" size="mini"> </el-input>
              </template>
            </el-table-column>
            <el-table-column width="80" label="结算金额">
                <template slot-scope="scope">
                    <el-input type="text" :disabled="!scope.row.isZf" @change="virMomeyChange()" v-model="scope.row.settlementAmount" placeholder="结算金额"  size="mini"> </el-input>
                </template>
            </el-table-column>
            <el-table-column width="80" label="数量">
                <template slot-scope="scope">
                    <el-input type="text" :disabled="true"  v-model="scope.row.number" placeholder="房号"  size="mini"> </el-input>
                </template>
            </el-table-column>
            <el-table-column width="80" label="房号">
              <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.roomNumber" placeholder="房号"  size="mini"> </el-input>
              </template>
            </el-table-column>
            <el-table-column label="客单号" width="130">
              <template slot-scope="scope">
                <el-select style="width:100%;" size="mini" v-model="scope.row.guestOrderPk" placeholder="客单号">
                    <el-option v-for="obj in virGuestList" :key="obj.guestOrderPk" :label="obj.orderNo" :value="obj.guestOrderPk"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发生日期"  width="175">
              <template slot-scope="scope">
                  <el-date-picker size="mini" style="width:100%;" v-model="scope.row.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="营业日期"/>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" width="95" label="操作员"></el-table-column>
            <el-table-column label="备注" width="100">
              <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.remark" placeholder="结算金额"  size="mini"> </el-input>
              </template>
            </el-table-column>
            <el-table-column label="营业日期" width="120">
              <template slot-scope="scope">
                  <el-date-picker size="mini" style="width:100%;" v-model="scope.row.businessDate" type="date" value-format="yyyy-MM-dd" placeholder="营业日期"/>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="90">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="addVirDetailListClick()">添加</el-button>
                <el-button size="mini" type="text" v-if="virtualBillDatailList.length>1" @click="delVirDetailListClick(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:5px;">
            消费:{{consumptionAmount}}&nbsp;&nbsp;&nbsp;&nbsp;实收:{{settlementAmount}}&nbsp;&nbsp;&nbsp;应收:{{consumptionAmount-settlementAmount}}
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="addVirtualClick()">保存</el-button>
            <el-button size="mini" type="primary" @click="virPringClick()" v-if="virPk != null">打印</el-button>
            <el-button size="mini" type="primary" @click="virDialog = false">关闭</el-button>
          </span>
    </el-dialog>

    <transferAccounts ref="transferAccountsRef" @callback="transferAccounts"></transferAccounts>
    <!-- 外借 -->
    <dialog-borrow ref="dialogBorrowRef" ></dialog-borrow>
    <!-- 打印组件 -->
    <comment-print ref="commentPrintRef"></comment-print>
    <!-- 结账 -->
    <bill-settlement ref="billSettlementRef" @callback="printCallback"></bill-settlement>
    <!-- 部分结账恢复 -->
    <dialog-recover-bill ref="dialogRecoverBillRef" @callback="listBill"></dialog-recover-bill>
    <!-- 退房超时提醒 -->
    <dialog-timeout-remind ref="dialogTimeoutRemindRef" @to-notcharge="toCheckoutRemind" @to-addbill="timeoutRemindToAddBill"></dialog-timeout-remind>
    <!-- 提前退房收费提示 -->
    <dialogAdvanceCheckoutRemind ref="dialogAdvanceCheckoutRemindRef" @to-notcharge="toSettle" @to-addbill="advanceCheckoutToAddBill"></dialogAdvanceCheckoutRemind>
    <!-- 批量入账 -->
    <dialog-batch-addBill ref="dialogBatchAddBillRef" @to-settle="addBillToSettle" @callback="listBill" ></dialog-batch-addBill>
    <!-- 单房结账 -->
    <dialog-singleSettl ref="dialogSingleSettlRef" @callback="listBill" @to-settle="toSettle"></dialog-singleSettl>
    <!-- 押金打印 -->
    <dialog-deposit-print ref="dialogDepositPrintRef"></dialog-deposit-print>
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
.height500 .el-dialog__body{
  height: 500px;
  /* padding: 20px; */
}
.height600 .el-dialog__body{
  height: 600px;
  padding: 10px;
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
.bgBlue{
  background-color: rgb(153, 204, 255);
}
.bgGreen{
  background-color: green;
}
.colGreen{
  color:green;
}
.colBlue{
  color:blue;
}
.colWhite{
  color:white;
}
.colRed{
  color:red;
}
</style>

