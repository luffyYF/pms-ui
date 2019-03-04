//客单
<template>
  <div class="visitorGuestOrder">
    <el-row>
      <el-col :span="9">
        <p class="visitor-title visitor-table">
          <span>预订<em class="font-normal">{{gsReserve}}</em>间</span>
          <span>在住<em class="font-normal">{{gsCheckin}}</em>间</span>
          <span>离店<em class="font-normal">{{gsLeave}}</em>间</span>
        </p>
        <div class="visitor-tabs">
          <h5 class="info-title">客单</h5>
          <el-table :data="currGuestList" height="176" border style="width: 100%;margin-top: 7px;" @row-click="guestTableClick" :row-class-name="tableRowClassName">
            <el-table-column prop="roomTypeName" label="房类" width="100"></el-table-column>
            <el-table-column prop="roomNumber" label="房号" width="80"></el-table-column>
            <el-table-column prop="orderStatus" label="状态" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.pmsCancelFlag=='Y'" style="color:#999999">订单取消</span>
                <span v-else-if="scope.row.orderStatus=='LEAVE' || scope.row.orderStatus=='LEAVENOPAY' || scope.row.orderStatus=='NOSHOW'" style="color:#999999">{{orderStatusMap[scope.row.orderStatus]}}</span>
                <span v-else>{{orderStatusMap[scope.row.orderStatus]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="guestName" label="姓名" min-width="100">
              <template slot-scope="scope">
                <img v-if="scope.row.mainFlag=='Y'" src="../../../assets/image/main_guest.png" width="15" height="16" alt="主客人">
                <span>{{scope.row.guestName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="操作" :fixed="'right'">
              <template slot-scope="scope">
                <p class="guest-orp-item" v-if="scope.row.mainFlag=='Y' && scope.row.pmsCancelFlag!='Y' && scope.row.roomPk && scope.row.orderStatus=='RESERVE'">
                  <el-button size="mini" type="text" @click="guestCheckin(scope.row)">入住</el-button>
                </p>
                <p class="guest-orp-item" v-if="scope.row.mainFlag=='Y' && scope.row.pmsCancelFlag!='Y' && scope.row.orderStatus=='CHECKIN'">
                  <el-button size="mini" type="text" @click="toCheckout(scope.row.guestOrderPk)">退房</el-button>
                </p>
                <p class="guest-orp-item" v-if="scope.row.roomNumber && scope.row.rflLockNo">
                  <el-button size="mini" type="text" @click="makeCard(scope.row)">门卡</el-button> 
                </p>
                <p class="guest-orp-item" v-if="scope.row.orderStatus=='CHECKIN' && scope.row.intelligentFlag=='Y'">
                  <el-button size="mini" type="text" @click="dialogQRCodeSettingOpen(scope.row)">二维码开门</el-button>  
                </p>
                <!-- <template v-if="scope.row.mainFlag=='Y' && scope.row.pmsCancelFlag!='Y'">
                  <el-button size="mini" type="text" v-if="scope.row.roomPk && scope.row.orderStatus=='RESERVE'" @click="guestCheckin(scope.row)">入住<br></el-button>
                  <el-button size="mini" type="text" v-if="scope.row.orderStatus=='CHECKIN' && gsCheckin>1" @click="toCheckout(scope.row.guestOrderPk)">退房<br></el-button>
                </template> 
                <el-button size="mini" type="text" v-if="scope.row.roomNumber && scope.row.rflLockNo" @click="makeCard(scope.row)">门卡<br></el-button> 
                <el-button size="mini" type="text" v-if="scope.row.orderStatus=='CHECKIN' && scope.row.intelligentFlag=='Y'" @click="dialogQRCodeSettingOpen(scope.row)">二维码开门</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="visitor-contract">
          <h5 class="info-title">房租合约</h5>
          <el-table :data="contractTableData" height="176" border style="width: 100%;margin-top: 7px;">
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="personCount" label="人数" width="50"></el-table-column>
            <el-table-column prop="rentPrice" label="房租"></el-table-column>
            <el-table-column prop="promotionPrice" label="促销价"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                 <span>{{contractMap[scope.row.status]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="说明"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="15" class="visitor-addReservations">
        <p class="visitor-title visiitor-add">{{form.currTitle}}</p>
        <el-form ref="form" :model="form" size="mini" label-width="100px">
          <el-col :span="24">
            <el-form-item label="入住类型：">
              <!-- :disabled="currFormType!='add-checkin'" -->
              <el-radio-group v-model="form.checkInType" :disabled="currFormType!='add-checkin'">
                <el-radio label="0">普通</el-radio>
                <el-radio label="1">钟点房</el-radio>
                <!-- <el-radio label="2">特殊房</el-radio> -->
                <!-- <el-radio label="3">自用房</el-radio> -->
                <!-- :disabled="true" -->
                <el-radio label="4">接待房</el-radio>
                <!-- <el-radio label="5">公寓房</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客源渠道：" required>
                  <!-- <channel-select v-model="form.channelTypePk" @selfirst="(id)=>{this.form.channelTypePk = id}" :disabled="form.guestOrderPk!==undefined"></channel-select> -->
                  <channel-select ref="channelRef" v-model="form.channelTypePk" ></channel-select>
                </el-form-item>
              </el-col>
            </el-col>
             <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间类型：" required>
                  <el-select v-model="form.roomTypePk" @change="roomTypeChange" placeholder="请选择房间类型" :disabled="currFormType=='guest-info' || currFormType=='add-checkin' || currFormType=='add-guest'">
                    <el-option :label="r.typeName" :value="r.typePk" v-for="r in roomTypeArr" :key="r.typePk"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="当天房租：" required>
                  <el-input-number v-model="form.currPrice" :controls="false" :disabled="form.guestOrderPk!=undefined"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="15">
                <el-form-item label="房间数量：" required>
                  <!-- @change="loadPrice" -->
                  <el-input-number size="mini" :min="1" v-model="form.count" :disabled="currFormType=='guest-info' || currFormType=='add-checkin'|| currFormType=='add-guest' || currFormType=='add-checkin-guest'"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="7" v-if="currFormType=='add-reserve' || currFormType=='add-checkin' || currFormType=='add-checkin-guest' ">
                &nbsp;&nbsp;<span style="color:red">剩余{{bookableCount}}间</span>
              </el-col>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="当天促销：" required>
                  <el-input-number v-model="form.currPromotionPrice" :controls="false" :disabled="form.guestOrderPk!=undefined"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-form-item label="餐券数量：" style="margin-bottom: 0px !important;">
                  <el-form-item label="早" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketMorn" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
                  <el-form-item label="中" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketNoon" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
                  <el-form-item label="晚" label-width="10px" style="width:47px;float:left;">
                    <el-input v-model="form.mealTicketNight" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                  </el-form-item>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间押金：" required>
                  <el-input-number v-model="form.deposit" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="房间号码：" :required="currFormType=='add-checkin-guest'">
                  <!-- <el-input v-model="form.roomNumber" :disabled="currFormType!='add-checkin-guest'"></el-input> -->
                  <el-autocomplete
                    v-model="form.roomNumber"
                    @select="handleRoomSelect"
                    :fetch-suggestions="queryCheckinRoomAsync"
                    placeholder="请输入房间号"
                    :disabled="currFormType!='add-checkin-guest'">
                  </el-autocomplete>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="入住日期：" required v-if="form.orderStatus=='CHECKIN' || form.orderStatus=='LEAVE' || form.orderStatus=='LEAVENOPAY'">
                  <el-date-picker style="color:black" v-model="form.checkinDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="endDateChange" type="datetime" placeholder="选择日期时间" :disabled="currFormType=='add-checkin' || currFormType=='guest-info' || currFormType=='add-guest'" :clearable="false"></el-date-picker>
                </el-form-item>
                <el-form-item label="抵店日期：" required v-else>
                  <el-date-picker style="color:black" v-model="form.beginDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="beginDateChange" type="datetime" placeholder="选择日期时间" :disabled="currFormType=='add-checkin' || currFormType=='guest-info' || currFormType=='add-guest'" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="离店日期：" required v-if="form.orderStatus=='LEAVE' || form.orderStatus=='LEAVENOPAY'">
                  <!-- 实际离店日期 -->
                  <el-date-picker v-model="form.checkoutDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="endDateChange" type="datetime" placeholder="选择日期时间" :disabled="currFormType=='add-guest' || this.form.orderStatus=='LEAVE' || this.form.orderStatus=='NOSHOW' || this.form.pmsCancelFlag=='Y' || this.form.mainFlag=='N'" :clearable="false"></el-date-picker>
                </el-form-item>
                <el-form-item label="离店日期：" required v-else>
                  <el-date-picker v-model="form.endDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="endDateChange" type="datetime" placeholder="选择日期时间" :disabled="currFormType=='add-guest' || this.form.orderStatus=='LEAVE' || this.form.orderStatus=='NOSHOW' || this.form.pmsCancelFlag=='Y' || this.form.mainFlag=='N'" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="入住天数：" required>
                  <!-- <el-input v-model="form.checkinDays" :disabled="true"></el-input> -->
                  <el-input-number v-model="form.checkinDays" :min="1" @change="checkInDaysChange" :disabled="this.currFormType=='guest-info' || this.currFormType=='add-guest'"></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="会员卡号：">
                  <el-input v-model="form.memberCarNo" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <span class="iconSearch" @click="chooseEmptyGuest" title="根据客人姓名查询历史客人"></span>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人名称：" required>
                  <el-input v-model="form.guestName" :disabled="memberFlag" placeholder="请填写客人名称" @keyup.enter.native="chooseEmptyGuest(form.guestName)"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="18">
                <!--  :required="currFormType=='add-checkin' || currFormType=='add-checkin-guest'" -->
                <el-form-item label="手机号码：">
                  <!-- :disabled="memberFlag" -->
                  <el-input v-model="form.guestPhone" @change="phoneChange" @keyup.enter.native="phoneChange(form.guestPhone)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <span class="iconCarNoVip" title="读会员卡"></span>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="证件类型：">
                  <el-select v-model="form.certificateType" :disabled="memberFlag">
                    <el-option v-for="(value, key) in credentialsMap" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <!-- <el-button type="text" class="iconCertificate" @click="readIDCard" title="身份证扫描" :loading="idcLoading"></el-button> -->
                <IDCardScan @callback="getIDCardInfo"></IDCardScan>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="证件号码：">
                  <el-input v-model="form.certificateNo" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span class="iconSearch" @click="seeCompany" title="根据证件号查询历史客人"></span>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人性别：">
                  <el-select v-model="form.guestGender" :disabled="memberFlag">
                    <el-option label="男" value="M"></el-option>
                    <el-option label="女" value="W"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="出生日期：">
                  <el-date-picker v-model="form.bornDate" :disabled="memberFlag" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人国籍：">
                  <el-select v-model="form.nationality" :disabled="memberFlag" clearable>
                    <el-option label="大陆" value="DL"></el-option>
                    <el-option label="港澳台" value="GAT"></el-option>
                    <el-option label="国外" value="GW"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="客人籍贯：">
                  <el-input v-model="form.nativePlace" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="电子邮件：">
                  <el-input v-model="form.email" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="兴趣爱好：">
                  <el-input v-model="form.hobbies" :disabled="memberFlag"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="21">
              <el-form-item label="详细地址：">
                  <el-input v-model="form.detailAddress" :disabled="memberFlag"></el-input>
                </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="发票抬头：">
                  <el-input v-model="form.invoiceTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="10">
              <el-col :span="22">
                <el-form-item label="是否保密：">
                  <el-radio-group v-model="form.isSecret">
                    <el-radio label="N">不保密</el-radio>
                    <el-radio label="Y">保密</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="21">
              <el-form-item label="备注信息：">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <!-- 续房 -->
    <el-dialog class="agreement-body" title="是否确认续房" :visible.sync="dialogExtend" width="30%" :append-to-body="true" :before-close="extendClose">
      <div class="body-conten">
        <p>离店日期改为：{{this.form.endDate}}</p>
        <!-- <p>付款方式：
          <el-select v-model="extendForm.payment" size="mini">
            <el-option v-for="(value,key) in paymentMap" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </p> -->
        <p>
          结算项目：
          <el-select v-model="extendForm.settleProjectCode" placeholder="请选择结算项目" size="mini">
           <el-option
              v-for="item in settlProjectList"
              :key="item.projectPk"
              :label="item.code+' - '+item.projectName"
              :value="item.code">
            </el-option>
          </el-select>
        </p>


        <p>押&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：
          <el-input size="mini" type="text" v-model="extendForm.settlementAmount" style="width:166px"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="extendClose">取 消</el-button>
        <el-button size="mini" @click="extendConfirm" type="primary" :loading="submitLock">确 认</el-button>
      </span>
    </el-dialog>

    <!--设置二维码开门手机号-->
    <el-dialog class="agreement-body" title="设置二维码开门手机号" :visible.sync="dialogQRCodeSetting" width="30%" :append-to-body="true" :before-close="dialogQRCodeSettingClose">
      <div class="body-conten">
        <p>客人姓名：{{qrcodeForm.guestName}}</p>
        <p>手机号：
          <el-input size="mini" type="text" v-model="qrcodeForm.qrCodePhone" style="width:166px"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogQRCodeSetting = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="QRCodeSettingSubmit">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 添加客人 选择客历 -->
    <chooseGuest ref="chooseGuestRef" @sendGuest="loadGuest($event)"></chooseGuest>
    <!-- 预定管理 -->
    <reserveManager ref="reserveManagerRef" @callback="reserveManagerCallback"></reserveManager>
    <!-- 制卡窗口 -->
    <dialog-make-card ref="dialogMakeCardRef"></dialog-make-card>
     <!-- 退房超时收费提示 -->
    <dialog-timeout-remind ref="dialogTimeoutRemindRef" @to-notcharge="toCheckAdvance" @to-addbill="timeoutRemindToAddBill"></dialog-timeout-remind>
    <!-- 提前退房收费提示 -->
    <dialogAdvanceCheckoutRemind ref="dialogAdvanceCheckoutRemindRef" @to-notcharge="checkout" @to-addbill="advanceCheckoutToAddBill"></dialogAdvanceCheckoutRemind>
    <!-- 批量入账 -->
    <dialog-batch-addBill ref="dialogBatchAddBillRef" @to-settle="checkout" ></dialog-batch-addBill>
  </div>
</template>

<script>
    import bus from '@/utils/bus'
    import moment from 'moment'
    import {orderStatusMap,contractMap, paymentMap, credentialsMap} from '@/utils/orm'
    import {deepClone, formatDate, getBetweenDay, phoneReg, addDate} from '@/utils/index'
    import {isInteger,validatePhone} from '@/utils/validate'
    import {MyToFixed} from '@/utils/number'
    import {listContract} from "@/api/order/pmsContractControll"
    import {findPriceSchemeDetailPrice} from '@/api/systemSet/priceScheme/priceSchemeController'
    import {
      checkin,
      addGuest,
      calcMoney,
      changeRoom,
      rowRoomList,
      reserveOrder,
      continuedRoom,
      editOrderMember,
      addReserveGuest,
      qrCodePhoneSetting,
      addCheckin,
      getCheckinAbleRoom
    } from '@/api/order/pmsOrderController'
    import {listType, listPriceScheme} from '@/api/utils/pmsTypeController'
    import {listProject, findUnitName} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
    import {getBookableCount} from '@/api/atrialCenter/roomForwardStatus'
    import {overtimeRemind,checkoutGuest} from '@/api/bill'
    import { listByProjectType } from '@/api/systemSet/pmsProjectController'

    import reserveManager from '@/pages/reserveManage/addReserve/reserveManager'
    import chooseGuest from '@/pages/reserveManage/addReserve/chooseGuest'
    import DialogMakeCard from './dialogMakeCard'
    import dialogTimeoutRemind from '@/pages/reserveManage/addReserve/bill/dialogTimeoutRemind'
    import dialogAdvanceCheckoutRemind from '@/pages/reserveManage/addReserve/bill/dialogAdvanceCheckoutRemind'
    import dialogBatchAddBill from './bill/dialogBatchAddBill'
    import IDCardScan from '@/components/Idcard/IDCardScan'
    export default {
      props: ['parentForm'],
      components:{chooseGuest, reserveManager, DialogMakeCard, dialogTimeoutRemind,dialogAdvanceCheckoutRemind, dialogBatchAddBill,IDCardScan},
      data() {
        return {
          /**
           * 当前表单状态： 
           * add-reserve（添加预定） 
           * guest-info（客单信息） 
           * add-checkin（房态图办理入住） 
           * add-guest（添加客人）
           * add-checkin-guest （添加入住）
           */
          currFormType:'',
          submitLock:false,
          gsReserve:0,
          gsCheckin:0,
          gsLeave:0,
          memberFlag: false,//是否是会员标识
          currGuestList: [],//当前所有客单信息
          settlProjectList:[],//结算项目下拉列表
          credentialsMap: credentialsMap,
          orderStatusMap: orderStatusMap,
          contractMap: contractMap,
          paymentMap: paymentMap,
          bookableCount:0,//可预订数量
          roomTypeArr:[],
          priceSchemeArr: [],
          registForm:{},
          proForm: {},
          dialogQRCodeSetting:false,
          dialogAgreement:false,
          hobbySetting: false,
          haveRoomFlag: false,
          dialogExtend: false,
          form: {//客单表单数据
            currTitle: '客单信息',
            memPk: undefined,
            guestOrderPk: undefined,
            agreementPk: undefined,
            count: 1,
            checkinDays:1,
            deposit: 0,
            currPrice:100,
            currPromotionPrice:0,
            roomNumber: '',
            roomTypePk: '',
            roomPk: undefined,
            channelTypePk: '',
            priceSchemePk: '',
            checkInType: '0',
            isSecret: 'N',
            certificateType: 'TWO_IDENTITY',
            certificateNo:null,
            nationality: 'DL',
            guestName: '新客人',
            guestGender: 'M',
            nativePlace: '',
            email: '',
            carNumber: '',
            hobbies:'',
            detailAddress:'',
            remark:'',
            mealTicketMorn: 0,
            mealTicketNoon: 0,
            mealTicketNight: 0,
            bornDate: null,
            guestPhone:null,
            beginDate: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            endDate: formatDate(new Date(new Date().setDate(new Date().getDate()+1)), 'yyyy-MM-dd hh:mm:ss'),
            pmsCancelFlag: null,
            checkinDate:null,
            checkoutDate:null,
            diyPriceFlag: 'N'
          },
          qrcodeForm:{
            guestOrderPk:'',
            guestName:'',
            qrCodePhone:'',
          },
          roomObj: {
            roomType: '',
            roomNumber: '',
            state: '',
            username: '',
            number: ''
          },
          extendForm:{
            settlementAmount: null,
            settleProjectCode:null,
            // payment : null,
          },
          datepicker3: [],
          seeCompany: false,
          roomTable:[],
          tempEndDate:null,
          currTableIndex: '',
          listProjectDate: [],
          contractTableData: [], //合约列表
          pickerOptions0: {
            //限制今天以前的日期不可选择
            disabledDate(time) {
              return time.getTime() < moment().subtract(1, 'days') - 8.64e7;
            },
          },
          regisType: '',
          // idcLoading:false,
          // idcTime:null,
          // timer:null,
        }
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if(this.currTableIndex==row.guestOrderPk){
            return 'success-row';
          }
          return '';
        },
       
        /**
         * 初始化空表单（外部调用）
         */
        initEmpty() {
          this.loadRoomType(_=>{
            this.formReset()
            this.form.currTitle = '添加预定'
            this.currFormType='add-reserve'
            this.roomTable=[]
            this.currGuestList = []
            this.contractTableData = []
            this.loadPrice()
            this.getBookableCount()
            this.$refs.channelRef.load(true);
          })
        },

        /**
         * （房态图办理入住）（外部调用）
         * @augments room 当前选择的房间*/
        initRoomData(room) {
          this.loadRoomType(_=>{
            this.formReset()
            this.currFormType='add-checkin'
            this.form.currTitle = '办理入住'
            this.form.roomPk = room.roomPk
            this.form.roomNumber = room.roomNumber
            this.form.roomTypePk = room.roomTypePk
            // if(moment().hour()<6){
            //   this.form.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
            // }
            this.roomTable=[]
            this.currGuestList = []
            this.contractTableData = []
            this.loadPrice()
            this.getBookableCount()
            this.$refs.channelRef.load(true);
          })
        },

        /**
         * 初始化回显客单数据（外部调用）
         * @augments guestList 客单列表
         * @augments loderIndex 装填下标 */
        initGuestData(guestList, loderIndex) {//TODO 初始化加载客单数据
          this.loadRoomType(_=>{
            this.currFormType='guest-info'
            this.currGuestList = guestList
            this.formFillGuestInfo(guestList[loderIndex])
            this.currTableIndex = this.form.guestOrderPk
            this.form.currTitle = this.orderStatusMap[this.form.orderStatus]+'客人，客单号：'+this.form.orderGuestNo
            this.tempEndDate = this.form.endDate
            this.loadContract()
            this.calcDays()
            this.calcGuest()
            this.$refs.channelRef.load(false)
          });
        },
        //添加入住初始化
        parentClearAddCheckinGuest(type) {
          if(type=='copy') {
            this.currFormType='add-checkin-guest'
            this.form.currTitle = '复制入住'
            this.form.roomPk = null
            this.form.roomNumber = null
            if(moment().hour()<6){
              this.form.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
            }else{
              this.form.beginDate = moment().format("YYYY-MM-DD HH:mm:ss");
            }
            this.form.endDate = moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
            this.loadPrice()
            this.getBookableCount()
            this.$refs.channelRef.load(true)
          }else {
            this.loadRoomType(_=>{
              this.formReset()
              this.currFormType='add-checkin-guest'
              this.form.currTitle = '添加入住'
              this.loadPrice()
              this.getBookableCount()
              this.$refs.channelRef.load(true)
            })
          }
        },
        //添加客人初始化（外部调用）
        parentClearGuest() {
          if(!this.form.guestOrderPk){
            this.$message({type:'warning', message:'请先选择客单'})
            return;
          }
          if(this.form.mainFlag!='Y') {
             this.$message({type:'warning', message:'请选中主客单后进行录入'})
             return;
          }
          // if(this.form.orderStatus!='CHECKIN'){
          //   this.$message({type:'warning', message:'客单入住后才能添加客人'})
          //   return;
          // }
          this.memberFlag = false
          this.currFormType = 'add-guest'
          this.form.memPk = undefined
          this.form.currTitle = '添加客人'
          this.form.memberCarNo = ''
          this.form.guestName = ''
          this.form.guestPhone = ''
          this.form.guestGender = 'M'
          this.form.certificateType = 'TWO_IDENTITY'
          this.form.certificateNo = ''
          this.form.bornDate = null
          this.form.email = ''
          this.form.carNumber = ''
          this.form.hobbies = ''
          this.form.nationality = 'DL'
          this.form.nativePlace = ''
          this.form.detailAddress = ''
        },
        //添加客人初始化（外部调用）
        parentAddGuest() {
          if(this.form.currTitle != '添加客人'){
            return;
          }
          let data = {
            guestOrderPk: this.form.guestOrderPk,
            memberPo: {
              memPk: this.form.memPk,
              memName: this.form.guestName,
              memPhone: this.form.guestPhone,
              memSex: this.form.guestGender,
              certificateType: this.form.certificateType,
              certificateNo: this.form.certificateNo,
              birthday: this.form.bornDate ? this.form.bornDate : null,
              email: this.form.email,
              carNumber: this.form.carNumber,
              hobby: this.form.hobbies,
              nationality: this.form.nationality,
              nativePlace: this.form.nativePlace,
              address: this.form.detailAddress
            }
          }
          addGuest(data).then(res=>{
            this.$message({type:'success', message:'添加客人成功'})
          }).finally(()=>{
            // bus.$emit('refreshOrderInfo', this.form.orderPk)
            this.$emit('callback')
          })
        },
        //添加预定初始化（外部调用）
        cleanAddReserveGuest() {
          this.formReset();
          this.form.currTitle = '添加预定'
          this.currFormType = 'add-reserve'
          this.getBookableCount()
          this.loadPrice();
        },
        //提交添加预定（外部调用）
        addReserveGuest() {
          addReserveGuest(this.form).then(res=>{
            this.$message({type:'success', message:'添加预定成功'})
            this.$emit('callback')
          }).finally(()=>{
            this.$emit('unlock')
            // bus.$emit('refreshOrderInfo', this.form.orderPk)
          })
        },
        //提交修改客人信息（外部调用）
        editGuestInfo() {
          if(this.form.pmsCancelFlag=='Y'){
            return;
          }
          editOrderMember(this.form).then(res=>{
            this.$message({type:'success', message: '客人信息修改成功'})
            this.$emit('callback')
          }).finally(()=>{
            this.$emit('unlock')
            // bus.$emit('refreshOrderInfo', this.form.orderPk)
          })
        },
        //添加入住（外部调用）
        addCheckin(orderPk){
          if(!orderPk) {
            this.$message.warning('没有主订单')
            this.$emit('unlock')
            return
          }
          if(!this.form.roomPk) {
            this.$message.warning('请输入房间号')
            this.$emit('unlock')
            return
          }
          // if(!this.form.guestPhone) {
          //   this.$message.warning('请输入手机号')
          //   this.$emit('unlock')
          //   return
          // }
          let data = {
            order: {orderPk: orderPk},
            guestOrder: this.form
          }
          addCheckin(data).then(res=>{
            this.$message.success('添加入住成功')
            this.$emit('callback')
          }).finally(()=>{
            this.$emit('unlock')
          })
        },
        //重置表单
        formReset() {
          this.form.currTitle = ''
          this.form.memPk = null
          this.form.guestOrderPk = null
          this.form.count = 1
          this.form.checkinDays = 1
          this.form.deposit = 0
          this.form.currPrice = 0
          this.form.currPromotionPrice = 0
          this.form.roomNumber = null
          this.form.roomTypePk = this.roomTypeArr[0].typePk
          this.form.roomPk = null
          this.form.checkInType = '0'
          this.form.memberCarNo = null
          this.form.isSecret = 'N'
          this.form.certificateType = 'TWO_IDENTITY'
          this.form.nationality = 'DL'
          this.form.guestName = '新客人'
          this.form.guestPhone = null
          this.form.guestGender = 'M'
          this.form.certificateNo = null
          this.form.nativePlace = null
          this.form.email = null
          this.form.carNumber = null
          this.form.hobbies = null
          this.form.detailAddress = null
          this.form.remark = null
          this.form.mealTicketMorn = 0
          this.form.mealTicketNoon = 0
          this.form.mealTicketNight = 0
          this.form.bornDate = null
          this.form.orderStatus=null
          if(moment().hour()<6){
            this.form.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
          }else{
            this.form.beginDate = moment().format("YYYY-MM-DD HH:mm:ss");
          }
          this.form.endDate = moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss");
          this.form.pmsCancelFlag = 'N'
          this.memberFlag = false
        },
        formFillGuestInfo(guest) {//填充客单信息
          this.form.beginDate = guest.beginDate
          this.form.bornDate = guest.bornDate
          this.form.pmsCancelFlag = guest.pmsCancelFlag
          this.form.carNumber = guest.carNumber
          this.form.certificateNo = guest.certificateNo
          this.form.certificateType = guest.certificateType
          this.form.channelTypeName = guest.channelTypeName
          this.form.channelTypePk = guest.channelTypePk
          this.form.checkInType = guest.checkInType
          this.form.count = guest.count
          this.form.country = guest.country
          this.form.deposit = guest.deposit
          this.form.detailAddress = guest.detailAddress
          this.form.email = guest.email
          this.form.endDate = guest.endDate
          this.form.guestGender = guest.guestGender
          this.form.guestName = guest.guestName
          this.form.guestOrderPk = guest.guestOrderPk
          this.form.guestPhone = guest.guestPhone
          this.form.hobbies = guest.hobbies
          this.form.invoiceTitle = guest.invoiceTitle
          this.form.isSecret = guest.isSecret
          this.form.leaderFlag = guest.leaderFlag
          this.form.mainFlag = guest.mainFlag
          this.form.memPk = guest.memPk
          this.form.memType = guest.memType
          this.form.memberCarNo = guest.memberCarNo
          this.form.nationality = guest.nationality
          this.form.nativePlace = guest.nativePlace
          this.form.orderGuestNo = guest.orderGuestNo
          this.form.orderPk = guest.orderPk
          this.form.orderStatus = guest.orderStatus
          this.form.currPrice = guest.currPrice
          this.form.currPromotionPrice = guest.currPromotionPrice
          this.form.remark = guest.remark
          this.form.roomNumber = guest.roomNumber
          this.form.roomPk = guest.roomPk
          this.form.roomTypeName = guest.roomTypeName
          this.form.roomTypePk = guest.roomTypePk
          this.form.mealTicketMorn = guest.mealTicketMorn
          this.form.mealTicketNoon = guest.mealTicketNoon
          this.form.mealTicketNight = guest.mealTicketNight
          this.form.checkinDate = guest.checkinDate
          this.form.checkoutDate = guest.checkoutDate

          if(guest.memType=='MEMBER'){//是会员
            this.memberFlag = true
          }else{
            this.memberFlag = false
          }
        },
        registeredMemberClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //加载房型数据
        loadRoomType(callback) {
          // 获取房型
          // listType({typeMaster:'ROOM_TYPE'}).then(res=>{
          //   this.roomTypeArr = res.data;
          var typeList = JSON.parse(localStorage.getItem("pms_type"))
          this.roomTypeArr = []
          typeList.forEach(item=> {
            if(item.typeMaster == "ROOM_TYPE"){
              this.roomTypeArr.push(item);
            }
          })
            //获取价格方案
            listPriceScheme().then(res=>{
              this.priceSchemeArr = res.data
              callback()
            })
          // })
        },
        //动态加载当前房租 
        loadPrice() {
          // if(this.currFormType == 'add-reserve' || this.currFormType == 'add-checkin'){
            if(!this.form.roomTypePk){
              this.$message({type:'warning', message:'请先选择房间类型！'})
              return
            }
            if(!this.form.beginDate){
              this.$message({type:'warning', message:'请先选择抵店日期！'})
              return
            }
            
            let data = {
              roomTypePk: this.form.roomTypePk,
              beginDate: this.form.beginDate,
              endDate: moment(this.form.beginDate).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
            calcMoney(data).then(res=>{
              this.form.currPrice = MyToFixed(res.data*this.form.count, 2)
            })
          // }
        },
        //加载合约
        loadContract(){
          listContract({ orderPk: this.form.orderPk }).then(res=>{//加载合约列表
            this.contractTableData = res.data
          })
        },
        //统计客单状态数量
        calcGuest() {
          this.gsReserve = 0
          this.gsCheckin = 0
          this.gsLeave = 0
          this.currGuestList.forEach(obj=>{
            if(obj.mainFlag=='Y' && obj.pmsCancelFlag=='N'){
              if(obj.orderStatus=='RESERVE'){
                this.gsReserve++;
              }else if(obj.orderStatus=='CHECKIN'){
                this.gsCheckin++;
              }else if(obj.orderStatus=='LEAVE' || obj.orderStatus=='LEAVENOPAY'){
                this.gsLeave++;
              }
            }
          })
        },
        //房型改变
        roomTypeChange(){
          this.loadPrice()
          this.getBookableCount()
        },
        //开始日期改变
        beginDateChange(){
          let f = 'YYYY-MM-DD'
          if(moment(this.form.beginDate).format(f) >= moment(this.form.endDate).format(f)){
            this.form.endDate = moment(this.form.beginDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss') 
          }
          this.calcDays()
          this.loadPrice()
          this.getBookableCount()
        },
        //结束日期改变 续房
        endDateChange(endDate) {
          if(this.currFormType=='guest-info'){
            // this.extendForm.payment='0'
            this.extendForm.settleProjectCode=null
            this.extendForm.settlementAmount=0
            this.dialogExtend = true
            this.submitLock = false;
            this.settlProjectList = []
            listByProjectType({projectType:'SETTLEMENT'}).then(res => {
              res.data.forEach(item=>{
                if(true==item.inoutFlag) {
                  this.settlProjectList.push(item)
                }
              })
            });
          }
          this.calcDays()
          this.getBookableCount()
        },
        //取消续房
        extendClose() {
          this.dialogExtend = false
          this.form.endDate = this.tempEndDate
          this.calcDays()
        },
        //确认续房
        extendConfirm() {
          // if(!this.extendForm.payment){
          //   this.$message({type:'warning', message:'请选择付款方式'})
          //   return
          // }
          if(Number(this.extendForm.settlementAmount)<0){
            this.$message({type:'warning', message:'请输入正确的押金'})
            return
          }
          if(this.extendForm.settlementAmount>0 && !this.extendForm.settleProjectCode) {
            this.$message({type:'warning', message:'请选择结算项目'})
            return 
          }
          if(this.submitLock){
            return 
          }else{
            this.submitLock = true;
          }
          let data={
            guestOrderPk: this.form.guestOrderPk,
            endDate: this.form.endDate,
            settlementAmount: this.extendForm.settlementAmount,
            settleProjectCode: this.extendForm.settleProjectCode,
          }
          continuedRoom(data).then(res=>{
            this.$message({type: 'success', message: '续住成功!'})
            this.$emit('callback')
            this.dialogExtend = false
            this.submitLock = false;
          }).catch(()=>{
            this.submitLock = false;
          })
        },
        calcDays() {//计算天数
          let a = formatDate(new Date(this.form.beginDate), 'yyyy-MM-dd');
          let b = formatDate(new Date(this.form.endDate), 'yyyy-MM-dd');
          this.form.checkinDays = getBetweenDay(a, b).length-1
        },
        checkInDaysChange(days) {//改变入住天数
          this.form.endDate = moment(this.form.beginDate).add(days, 'days').format("YYYY-MM-DD HH:mm:ss")
          // this.loadPrice()
        },
        guestCheckin(row) {//客单入住
          this.$confirm('是否确认入住?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            checkin({orderPk:row.orderPk, guestOrderPks:[row.guestOrderPk]}).then(res=>{
              row.orderStatus='CHECKIN'
              this.$message({type: 'success',message: '入住成功!'});
              this.calcGuest()
              this.loadContract()
            })
          })
        },
        toCheckout(guestOrderPk) {
          if(this.gsCheckin>1) {
            //检测入住的客单是否超过退房时间，进行提醒
            this.$refs.dialogTimeoutRemindRef.showDialog(this.form.orderPk, guestOrderPk)
          }else {
            //检测是否有提前退房，进行提醒
  
            //跳转账单页面
            bus.$emit('toCheckout')
          }
        },

        toCheckAdvance(guestOrderPk) {
          this.$refs.dialogAdvanceCheckoutRemindRef.showDialog(this.form.orderPk, guestOrderPk)
        },

        //单房退房，提交
        checkout(guestOrderPk) {
          this.$confirm("确认退房吗？", "提示", {
            type:'warning',
            beforeClose: (action, instance, done) =>{
              if (action === 'confirm')  {
                instance.confirmButtonLoading = true;
                checkoutGuest(guestOrderPk).then(res=> {
                  this.$emit('callback')
                  // bus.$emit('refreshOrderInfo', this.form.orderPk)
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
        //弹出批量入账转入账
        timeoutRemindToAddBill(guestPks) {
          let billItems = []
          guestPks.forEach(guestPk=>{
            billItems.push({
              projectCode:112,
              guestOrderPk:guestPk,
              price:null
            })
          })
          this.$refs.dialogBatchAddBillRef.showDialog(this.form.orderPk, false, guestPks)
        },
        
        advanceCheckoutToAddBill(billItems) {
          this.$refs.dialogBatchAddBillRef.showDialog(this.form.orderPk, false, billItems)
        },

        guestTableClick(row, event, column) {//点击客单table
          this.currGuestList.forEach((guest,index)=>{
            if(row.guestOrderPk==guest.guestOrderPk){
              this.currFormType = 'guest-info'
              this.formFillGuestInfo(guest)
              this.currTableIndex = row.guestOrderPk
              this.form.currTitle = this.orderStatusMap[guest.orderStatus]+'客人，客单号：'+guest.orderGuestNo
              this.tempEndDate = this.form.endDate
              this.calcDays();
              this.$emit('changeCurrGuest', guest, index);
            }
          });
        },
        chooseEmptyGuest() {//打开选择客人
          this.$refs.chooseGuestRef.init(this.form.guestName)
        },
        phoneChange(val) {//手机号改变
          if(val){
            if(!validatePhone(val)){
              this.$message({type:'warning', message:'手机号不合法'})
              return
            }
            this.$refs.chooseGuestRef.initByPhone(this.form.guestPhone)
          }
        },
        loadGuest(guest) {//回显客人
          this.form.memPk = guest.memPk
          this.form.guestName = guest.memName
          this.form.guestGender = guest.memSex
          this.form.detailAddress = guest.address
          this.form.memberCarNo = guest.cardNumber
          this.form.certificateNo = guest.certificateNo
          this.form.certificateType = guest.certificateType
          this.form.hobbies = guest.hobby
          this.form.guestPhone = guest.memPhone
          this.form.bornDate = guest.birthday
          this.form.email = guest.email
          this.form.nationality = guest.nationality
          this.form.nativePlace = guest.nativePlace
          this.form.bornDate = guest.birthday

          if(guest.memType=='MEMBER'){
            this.memberFlag = true              
          }else{
            this.memberFlag = false              
          }
        },
        //打开预定管理
        reserveManager() {
          this.$refs.reserveManagerRef.init(this.form.orderPk)
        },
        //预定回调
        reserveManagerCallback() {
          this.$emit("callback")
        },
        //打开选择协议单位
        toDialogAgreement(buttonType) {
          if(buttonType == 'registMember'){
            this.regisType = buttonType
          }
          // this.dialogAgreement =true
          // setTimeout(()=>{
          //   this.$refs.agreementRef.init()
          // },0)
          this.$refs.agreementRef.init()
        },
        
        tableRowClassName({row, rowIndex}) {
          if(this.currTableIndex==row.guestOrderPk){
            return 'success-row';
          }
          return '';
        },

        /*
          加载静态数据
        */
        getBookableCount(){
          let data={
            roomTypePk: this.form.roomTypePk,
            beginDate: moment(this.form.beginDate).format("YYYY-MM-DD"),
            endDate: moment(this.form.endDate).format("YYYY-MM-DD")
          }
          getBookableCount(data).then(res=>{
             this.bookableCount = res.data
           })
        },
        loadRoomType(callback) {
          // 获取房型
          this.roomTypeArr = []
          var typeList = JSON.parse(localStorage.getItem("pms_type"))
          typeList.forEach(item=> {
            if(item.typeMaster == "ROOM_TYPE"){
              this.roomTypeArr.push(item);
            }
          })
          // listType({typeMaster:'ROOM_TYPE'}).then(res=>{
          //   this.roomTypeArr = res.data.data;
            callback()
          // })
        },
        //设置二维码开门手机号
        dialogQRCodeSettingOpen(row){
          this.qrcodeForm.guestOrderPk = row.guestOrderPk
          this.qrcodeForm.guestName = row.guestName
          this.qrcodeForm.qrCodePhone = row.qrCodePhone
          this.dialogQRCodeSetting = true;
        },
        dialogQRCodeSettingClose(){
          this.dialogQRCodeSetting = false;
          bus.$emit('refreshOrderInfo', this.form.orderPk)
        },
        QRCodeSettingSubmit(){
          if(this.qrcodeForm.qrCodePhone){
            if(!validatePhone(this.qrcodeForm.qrCodePhone)){
              this.$message({type:'warning', message:'手机号不合法'})
              return false
            }
          }
          qrCodePhoneSetting(this.qrcodeForm).then(res=>{
            this.dialogQRCodeSettingClose()
            this.$message.success('设置成功')
          })
        },
        // 查找可入住的房间
        queryCheckinRoomAsync(queryString, cb){
          let data = {
            roomTypePk: this.form.roomTypePk,
            roomNumber: queryString,
            beginDate: moment(this.form.beginDate).format("YYYY-MM-DD"),
            endDate: moment(this.form.endDate).format("YYYY-MM-DD"),
          }
          getCheckinAbleRoom(data).then(res=>{
            let temp = []
            res.data.forEach(ele=>{
              ele.value = ele.roomNumber + '   ' + ele.roomStatusName
              temp.push(ele)
            })
            cb(temp);
            if(res.data.length<=0){
              this.$message.warning('该房型没有可入住的房间')
            }
          })
        },
        handleRoomSelect(item) {
          this.form.roomPk = item.roomPk
          this.form.roomNumber = item.roomNumber
        },

        //制卡
        makeCard(room){
          this.$refs.dialogMakeCardRef.showDialog(room.roomPk,room.endDate,room.orderGuestNo,room.roomNumber,room.guestName);
        },
        //获取身份证信息
        getIDCardInfo(data){
          this.form.guestName = data.guestName
          this.form.certificateNo = data.certificateNo
          this.form.bornDate = data.bornDate
          this.form.detailAddress = data.detailAddress
          this.form.guestGender = data.guestGender
          this.form.nationality = data.nationality
          this.form.certificateType = 'TWO_IDENTITY'
        }
      },
      mounted() {
        // bus.$on('agreementPo', (po) => { this.backDialogAgreement(po) })
      }

    }
</script>

<style scoped>
.reserve-contert{
  margin: 5px 0;
}
.visitor-title{
  color: red;
  margin: 5px 0;
}
.card-tabs>.el-tabs__content{
  padding: 0 15px;
}
.visitor-table span{
  margin-right: 15px;
}
.visitor-table .font-normal{
  font-style: normal;
}
.visiitor-add{
  text-align: center;
}
.visitor-tabs, .visitor-contract{
  border: 1px solid #cccccc;
  margin-bottom: 15px;
  margin-top: 15px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 3px;
}

.required-icon{
  color: red;
}
.icon-distance{
  height: 28px;
  line-height: 28px;
  margin-left: 5px;
}
.member-title{
  margin-top: 20px;
  border: 1px solid #dddddd;
}
.member-title h4{
  display: table;
  position: relative;
  top: -12px;
  margin: 0;
  margin-left: 10px;
  background: #fff;
  padding: 0 5px;
}
.member-title p {
  margin: -13px 10px 10px;
}
.member-content{
  display: inline-flex;
}
.paddingLeft{
  padding-left: 20px;
}
.alignRight{
  float: right;
  color: #409EFF;
  cursor: pointer;
}
.visitor-addReservations .el-radio+.el-radio {
    margin-left: 0px;
}
.visitor-addReservations .el-radio {
    margin-right: 10px;
}
.visitor-addReservations .el-date-editor.el-input,
.visitor-addReservations .el-date-editor.el-input__inner, 
.visitor-addReservations .el-select{
    width: 100%;
}
.info-title{
  position: absolute;
  margin-top: -9px;
  margin-left: 8px;
  background-color: #ffffff
}
.iconSearch,.iconCarNoVip,.iconCarNoAdd,.iconCarNoCopy,.iconCertificate{
  background: url('../../../assets/image/room-status/room_status.png');
  background-repeat: no-repeat;
  background-position: -1225px -17px;
  width: 23px;
  height: 23px;
  display: table;
  cursor: pointer;
}
.iconCarNoVip{
  float: left;
  background-position: -1057px -15px;
}
.iconCarNoAdd{
  /* float: right; */
  background-position: -1181px -17px;
}
.iconCertificate{
  background-position: -1100px -15px;
}
.guest-orp-item{
  margin:0px;
  padding:0px;
}
</style>
<style>
.visitorGuestOrder .el-table .success-row {
    background:  #f0f9eb;
}
.visitorGuestOrder .el-input-number span{
  width:17px !important
}
.visitorGuestOrder .el-input-number .el-input__inner{
  padding-left: 2px !important;
  padding-right: 2px !important;
}
.visitorGuestOrder .agreement-body>.el-dialog> .el-dialog__header{
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.visitorGuestOrder .agreement-body>.el-dialog>.el-dialog__body{
  padding: 0 15px;
}
.visitorGuestOrder .el-input-number .el-input__inne{
  text-align:left !important;
}
.visitorGuestOrder .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label{
  line-height: 20px !important;
  font-size: 13px;
}
.visitorGuestOrder .el-input--mini .el-input__inner {
    height: 20px !important;
    line-height: 20px;
}
.visitorGuestOrder .el-input--mini .el-input__icon {
    line-height: 20px;
}
.visitorGuestOrder .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
  margin-bottom: 4px;
}
.visitorGuestOrder .visitor-tabs, .visitor-contract{
  margin-bottom: 5px;
  margin-top: 20px;
}
.visitorGuestOrder .visitor-tabs{
  margin-top: 16px;
}
#app .el-dialog{
  /* width: 1000px !important; */
}
#app .el-dialog .iconSearch, .iconCarNoVip, .iconCarNoAdd, .iconCarNoCopy, .iconCertificate{
  width: 23px;
  height: 22px;
}
#app .el-button--text{
  padding-top: 2px;
  padding-bottom: 2px;
}
#app .el-tabs--border-card>.el-tabs__content {
  padding: 10px 15px 10px;
}
#app .dialog-li[data-v-2ab0e762] {
  width: calc(100% / 4);
}
#app .patternDialog .el-dialog__body{
  padding: 0;
}
.visitorGuestOrder .input_width_style{
  width: calc(95.83333% - 9px) !important;
}
.visitorGuestOrder .el-dialog__header {
    padding: 10px 20px 10px;
}
.visitorGuestOrder .el-input__inner,.el-textarea__inner{
  border-radius: 2px;
}
.visitorGuestOrder .info-title{
  padding: 0 5px;
}
.visitorGuestOrder .el-table td, .el-table th{
  padding: 2px 0;
  font-size: 13px;
}
.visitorGuestOrder .el-input-number--mini {
    width: 100%;
    line-height: 20px;
}
.visitorGuestOrder .el-input--mini .el-input__inner {
    /* height: 25px !important; */
    line-height: 25px;
}
.el-input.is-disabled .el-input__inner{
  color: #737373 !important;
}
</style>

