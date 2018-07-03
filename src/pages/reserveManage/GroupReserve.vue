//团队预定
<template>
  <div class="teamReserve">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row class="bg-reserve">
        <el-col :span="24" class="book-info">
          <h5 class="info-title">预定信息</h5>
          <el-row class="info-li">
            <el-col :span="4">
              <el-form-item label="名   称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预订卡号">
                <el-input v-model="form.reserveCardNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预订人" required>
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预订手机" required>
                <el-input v-model="form.userPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否团体">
                <el-select v-model="form.isTeam" :disabled="true">
                  <el-option label="否" value="N"></el-option>
                  <el-option label="是" value="Y"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-li">
            <el-col :span="4">
              <el-form-item label="担 保 方">
                <el-input v-model="form.guarantee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="担保类型">
                <el-select v-model="form.guaranteeType">
                  <el-option label="无担保" value=""></el-option>
                  <el-option label="担保到达" value="GUARANTEE_ARRIVAL"></el-option>
                  <el-option label="全程担保" value="GUARANTEE_ALL"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="支付方式">
                <el-select v-model="form.payment">
                  <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="保留时效">
                <el-time-select class="reserve-time" v-model="form.keepTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="登记时间">
                <el-date-picker v-model="reserveTime" type="datetime" placeholder="选择日期时间" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-li">
            <el-col :span="20">
              <el-form-item label="备   注" class="textarea-width">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="24" class="reserve-contert">
          <el-tabs type="border-card" class="card-tabs">
            <el-tab-pane label="客单">
              <!-- <visitor-tag ref="visitorRef" :parentForm="form"/> -->
              <!-- 客单 begin -->
              <el-row>
                <el-col :span="9">
                  <!-- <p class="visitor-title visitor-table">
                    <span>预订
                      <em class="font-normal">{{gsReserve}}</em>间</span>
                    <span>在住
                      <em class="font-normal">{{gsCheckin}}</em>间</span>
                    <span>离店
                      <em class="font-normal">{{gsLeave}}</em>间</span>
                  </p> -->
                  <div class="visitor-tabs">
                    <h5 class="info-title">客单</h5>
                    <!-- :row-class-name="tableRowClassName" -->
                    <el-table :data="guestList" height="433px" border style="width: 100%;margin-top: 7px;" @row-click="clickGuestTableEvent">
                      <el-table-column prop="roomTypeName" label="房类" width="100"></el-table-column>
                      <!-- <el-table-column prop="roomNumber" label="房号"></el-table-column>
                      <el-table-column prop="orderStatus" label="状态" width="60">
                        <template slot-scope="scope">
                          <span v-if="scope.row.pmsCancelFlag=='Y'" style="color:#999999">订单取消</span>
                          <span v-else-if="scope.row.orderStatus=='LEAVE' || scope.row.orderStatus=='LEAVENOPAY' || scope.row.orderStatus=='NOSHOW'" style="color:#999999">{{orderStatusMap[scope.row.orderStatus]}}</span>
                          <span v-else>{{orderStatusMap[scope.row.orderStatus]}}</span>
                        </template>
                      </el-table-column> -->
                      <el-table-column prop="beginDate" label="预抵" width="100"></el-table-column>
                      <el-table-column prop="endDate" label="预离" width="100"></el-table-column>
                      <el-table-column prop="guestName" label="姓名" min-width="100">
                        <template slot-scope="scope">
                          <img src="../../assets/image/main_guest.png" width="15" height="16" alt="主客人">
                          <span>{{scope.row.guestName}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="count" label="操作" :fixed="'right'">
                        <template slot-scope="scope">
                          <el-button size="mini" type="text" @click.native.prevent="clickDeleteGuestEvent(scope.$index, guestList)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="15" class="visitor-addReservations">
                  <p class="visitor-title visiitor-add">添加客单</p>
                  <el-form ref="form" :model="form" size="mini" label-width="100px">
                    <el-col :span="24">
                      <el-form-item label="入住类型：">
                        <el-radio-group v-model="visitorForm.checkInType" :disabled="true">
                          <el-radio label="0">普通</el-radio>
                          <el-radio label="1">钟点房</el-radio>
                          <el-radio label="2">特殊房</el-radio>
                          <el-radio label="3">自用房</el-radio>
                          <el-radio label="4">免费房</el-radio>
                          <el-radio label="5">公寓房</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="客源渠道：" required>
                            <channel-select v-model="visitorForm.channelTypePk" @selfirst="(id)=>{this.visitorForm.channelTypePk = id}"></channel-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="房间类型：" required>
                            <el-select v-model="visitorForm.roomTypePk" @change="selectRoomTypeEvent" placeholder="请选择房间类型">
                              <el-option :label="r.typeName" :value="r.typePk" v-for="r in roomTypeArr" :key="r.typePk"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="当前房租：" required>
                            <el-input-number v-model="visitorForm.currPrice" :controls="false"></el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="15">
                          <el-form-item label="房间数量：" required>
                            <el-input-number size="mini" :min="1" v-model="visitorForm.count"></el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          &nbsp;&nbsp;
                          <span style="color:red">可预订{{bookableCount}}间</span>
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="房间押金：" required>
                            <el-input-number v-model="visitorForm.deposit" :controls="false"></el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="房间号码：">
                            <el-input v-model="visitorForm.roomNumber" :disabled="true"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="抵店日期：" required>
                            <el-date-picker v-model="visitorForm.beginDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="selectBeginDateEvent" type="datetime" placeholder="选择日期时间" :clearable="false"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="离店日期：" required>
                            <el-date-picker v-model="visitorForm.endDate" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" @change="selectEndDateEvent" type="datetime" placeholder="选择日期时间" :clearable="false"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="入住天数：" required>
                            <!-- <el-input v-model="visitorForm.checkinDays" :disabled="true"></el-input> -->
                            <el-input-number v-model="visitorForm.checkinDays" :min="1" @change="clickCheckinDaysEvent"></el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="餐券数量：" style="margin-bottom: 0px !important;">
                          <el-form-item label="早" label-width="10px" style="width:47px;float:left;">
                            <el-input v-model="visitorForm.mealTicketMorn" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                          </el-form-item>
                          <el-form-item label="中" label-width="10px" style="width:47px;float:left;">
                            <el-input v-model="visitorForm.mealTicketNoon" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                          </el-form-item>
                          <el-form-item label="晚" label-width="10px" style="width:47px;float:left;">
                            <el-input v-model="visitorForm.mealTicketNight" style="width:28px;margin-left:5px;text-align: center;"></el-input>
                          </el-form-item>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="客人名称：">
                            <el-input v-model="visitorForm.guestName" :disabled="memberFlag" placeholder="请填写客人名称"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="1">
                          <span class="iconSearch" @click="clickChooseGuestEvent" title="根据客人姓名查询历史客人"></span>
                        </el-col>
                      </el-col>

                      <el-col :span="12">
                        <el-col :span="18">
                          <el-form-item label="协议单位：" required>
                            <el-input v-model="visitorForm.unitName" :readonly="true"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <span class="iconSearch" style="float: left;" @click="clickAgreementEvent" title="查询协议单位"></span>
                          <el-button type="text" size="mini" @click="clickClearAgreementEvent">清空</el-button>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="手机号码：">
                            <el-input v-model="visitorForm.guestPhone" :disabled="memberFlag" @change="inputPhoneEvent"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="12">
                        <el-col :span="18">
                          <el-form-item label="会员卡号：">
                            <el-input v-model="visitorForm.memberCarNo" :disabled="memberFlag"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <span class="iconCarNoVip" title="读会员卡"></span>
                          <!-- <span class="iconCarNoAdd" title="发展新会员" @click="registeredMember = true"></span> -->
                          <!-- <span class="iconCarNoCopy" title="发展新会员" @click="registeredMember = true"></span> -->
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="证件类型：">
                            <el-select v-model="visitorForm.certificateType" :disabled="memberFlag" clearable>
                              <el-option v-for="(value, key) in credentialsMap" :key="key" :label="value" :value="key"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">
                          <span class="iconCertificate" title="身份证扫描"></span>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="证件号码：">
                            <el-input v-model="visitorForm.certificateNo" :disabled="memberFlag"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2">
                          <span class="iconSearch" title="根据证件号查询历史客人"></span>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="客人性别：">
                            <el-select v-model="visitorForm.guestGender" :disabled="memberFlag">
                              <el-option label="男" value="M"></el-option>
                              <el-option label="女" value="W"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="出生日期：">
                            <el-date-picker v-model="visitorForm.bornDate" :disabled="memberFlag" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="客人国籍：">
                            <el-select v-model="visitorForm.nationality" :disabled="memberFlag" clearable>
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
                            <el-input v-model="visitorForm.nativePlace" :disabled="memberFlag"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="电子邮件：">
                            <el-input v-model="visitorForm.email" :disabled="memberFlag"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="兴趣爱好：">
                            <el-input v-model="visitorForm.hobbies" :disabled="memberFlag"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="21">
                        <el-form-item label="详细地址：">
                          <el-input v-model="visitorForm.detailAddress" :disabled="memberFlag"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="发票抬头：">
                            <el-input v-model="visitorForm.invoiceTitle"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="22">
                          <el-form-item label="是否保密：">
                            <el-radio-group v-model="visitorForm.isSecret">
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
                          <el-input type="textarea" v-model="visitorForm.remark"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="24">
                      <p style="text-align:center">
                        <el-button size="mini" type="primary" plain @click="clickAddGuestEvent">保存客单</el-button>
                      </p>
                    </el-col>
                  </el-form>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!-- 客单 end -->

        <el-col :span="24" class="reserve-contert">
          <el-form-item class="addreserve-btn">
            <el-button type="primary" @click="onSubmit" :disabled="submitLock">保存预订</el-button>
            <el-button type="primary" @click="init">重置</el-button>
            <!-- <el-button type="primary" size="mini" @click="clickAddGuestEvent">保存客单</el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 添加客人 选择客历 -->
    <chooseGuest ref="chooseGuestRef" @sendGuest="loadGuest($event)"></chooseGuest>

    <!-- 协议单位 -->
    <Agreement ref="agreementRef" @sendData="loadAgreement($event)"></Agreement>
  </div>
</template>
<script>
import moment from "moment";
import { paymentMap, credentialsMap, orderStatusMap} from "@/utils/orm";
import { validatePhone } from "@/utils/validate";
import { formatDate, deepClone,getBetweenDay } from "@/utils/index";
import { teamReserve } from "@/api/order/pmsOrderController";
import { listType } from '@/api/utils/pmsTypeController'
import {getBookableCount} from '@/api/atrialCenter/roomForwardStatus'
import Agreement from '@/components/Agreement/Agreement'
import chooseGuest from '@/pages/reserveManage/addReserve/chooseGuest'
// import VisitorTag from "./addReserve/Visitor";

export default {
  // components: { VisitorTag },
  components:{chooseGuest, Agreement},
  data() {
    return {
      submitLock:false,//提交表单锁
      paymentMap: paymentMap,
      credentialsMap:credentialsMap,
      orderStatusMap: orderStatusMap,
      form: {
        orderPk: null,
        name: null,
        guarantee: null,
        guaranteeType: null,
        payment: null,
        isTeam: null,
        companyPk: null,
        keepTime: null,
        remark: null,
        reserveCardNo: null,
        rentCount: null,
        userName: null,
        userPhone: null,
      },
      visitorForm: {
        memPk: null,
        guestOrderPk: null,
        agreementPk: null,
        channelTypeName:null,
        unitName: null,
        count: null,
        checkinDays: null,
        deposit: null,
        currPrice: null,
        roomNumber: null,
        roomTypePk: null,
        roomTypeName:null,
        roomPk: null,
        channelTypePk: null,
        checkInType: null,
        memberCarNo: null,
        isSecret: null,
        certificateType: null,
        certificateNo: null,
        nationality: null,
        guestName: null,
        guestPhone: null,
        guestGender: null,
        nativePlace: null,
        email: null,
        carNumber: null,
        hobbies: null,
        detailAddress: null,
        remark: null,
        mealTicketMorn: null,
        mealTicketNoon: null,
        mealTicketNight: null,
        bornDate: null,
        beginDate: null,
        endDate: null,
        pmsCancelFlag: null,
      },
      memberFlag: false, // 是否是会员标识 TODO
      guestList: [],
      roomTypeArr: [],
      bookableCount: 0,
      dialogAgreement:false,
      reserveTime: new Date(),
      pickerOptions0: {
        //限制今天以前的日期不可选择
        disabledDate(time) {
          return time.getTime() < moment().subtract(1, "days") - 8.64e7;
        }
      }
    };
  },
  methods: {
    init() {
      this.submitLock=false;
      this.form.orderPk=null
      this.form.name="团队预定 "
      this.form.guarantee=null
      this.form.guaranteeType=null
      this.form.payment='-1'
      this.form.isTeam='Y'
      this.form.companyPk=null
      this.form.keepTime=null
      this.form.remark=null
      this.form.reserveCardNo=null
      this.form.rentCount=null
      this.form.userName=null
      this.form.userPhone=null
      this.reserveTime = new Date();
      this.guestList = [];
      this.clickClearVisitorForm();
    },
    getBookableCount() {
      let data = {
        roomTypePk: this.visitorForm.roomTypePk,
        beginDate: moment(this.visitorForm.beginDate).format("YYYY-MM-DD"),
        endDate: moment(this.visitorForm.endDate).format("YYYY-MM-DD")
      };
      getBookableCount(data).then(res => {
        this.bookableCount = res.data;
      });
    },
    loadPrice() {
      //动态加载当前房租
      if (this.currFormType == "empty" || this.currFormType == "room-info") {
        if (!this.form.roomTypePk) {
          this.$message({ type: "warning", message: "请先选择房间类型！" });
          return;
        }
        if (!this.form.beginDate) {
          this.$message({ type: "warning", message: "请先选择抵店日期！" });
          return;
        }

        let data = {
          roomTypePk: this.form.roomTypePk,
          beginDate: this.form.beginDate,
          endDate: moment(this.form.beginDate)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss")
        };
        calcMoney(data).then(res => {
          this.form.currPrice = MyToFixed(res.data * this.form.count, 2);
        });
      }
    },
    clickGuestTableEvent(row, event, column) {
      //点击客单table
    },
    clickCheckinDaysEvent(days) {
      //改变入住天数
      this.visitorForm.endDate = moment(this.visitorForm.beginDate)
        .add(days, "days")
        .format("YYYY-MM-DD HH:mm:ss");
    },
    clickClearAgreementEvent() {//清空协议单位
      this.visitorForm.agreementPk = null
      this.visitorForm.unitName = null
    },
    //打开选择协议单位
    clickAgreementEvent() {
      this.$refs.agreementRef.init();
    },
    //添加客单
    clickAddGuestEvent(){
      if (!this.visitorForm.channelTypePk) {
        this.$message({ type: "warning", message: "客源渠道不能为空" });
        return;
      }
      if(this.visitorForm.guestPhone!=null && this.visitorForm.guestPhone !=''){
        if (!validatePhone(this.visitorForm.guestPhone)) {
          this.$message({ type: "warning", message: "手机号不合法" });
          return;
        }
      }
      if (this.visitorForm.currPrice == null) {
        this.$message({ type: "warning", message: "当前房租不能为空" });
        return;
      }
      if (Number(this.visitorForm.currPrice) < 0) {
        this.$message({ type: "warning", message: "当前房租不能小于0" });
        return;
      }
      if (this.visitorForm.deposit == null) {
        this.$message({ type: "warning", message: "押金不能为空" });
        return;
      }
      if (Number(this.visitorForm.deposit) < 0) {
        this.$message({ type: "warning", message: "请输入正确的押金" });
        return;
      }
      if (!this.visitorForm.beginDate) {
        this.$message({ type: "warning", message: "抵店日期不能为空" });
        return;
      }
      if (!this.visitorForm.endDate) {
        this.$message({ type: "warning", message: "离店日期不能为空" });
        return;
      }
      if (this.visitorForm.agreementPk == null || this.visitorForm.agreementPk == "") {
        this.$message({ type: "warning", message: "请选择协议单位" });
        return;
      }
      let count = this.visitorForm.count
      this.visitorForm.count = 1
      for(let i=0;i<count;i++){
        this.guestList.push(deepClone(this.visitorForm))
      }

      this.clickClearVisitorForm();
    },
    clickDeleteGuestEvent(index, rows){
      rows.splice(index, 1);
    },
    clickChooseGuestEvent() {
      //打开选择客人
      this.$refs.chooseGuestRef.init(this.visitorForm.guestName);
    },
    clickClearVisitorForm(){
      this.visitorForm.memPk = null
      this.visitorForm.guestOrderPk = null
      // this.visitorForm.agreementPk = null
      // this.visitorForm.unitName = null
      this.visitorForm.count = 1
      this.visitorForm.checkinDays = 1
      this.visitorForm.deposit = 200
      this.visitorForm.currPrice = 0
      this.visitorForm.roomNumber = null
      // this.visitorForm.roomTypePk = this.roomTypeArr[0].typePk
      this.visitorForm.roomPk = null,
      this.visitorForm.channelTypePk = null,
      this.visitorForm.channelTypeName = null,
      this.visitorForm.checkInType = '0'
      this.visitorForm.memberCarNo = null
      this.visitorForm.isSecret = 'N'
      this.visitorForm.certificateType = null//'TWO_IDENTITY'
      this.visitorForm.certificateNo = null
      this.visitorForm.nationality = 'DL'
      this.visitorForm.guestName = '新客人'
      this.visitorForm.guestPhone = null
      this.visitorForm.guestGender = 'M'
      this.visitorForm.nativePlace = null
      this.visitorForm.email = null
      this.visitorForm.carNumber = null
      this.visitorForm.hobbies = null
      this.visitorForm.detailAddress = null
      this.visitorForm.remark = null
      this.visitorForm.mealTicketMorn = 0
      this.visitorForm.mealTicketNoon = 0
      this.visitorForm.mealTicketNight = 0
      this.visitorForm.bornDate = null
      this.visitorForm.beginDate = moment().format("YYYY-MM-DD HH:mm:ss")
      this.visitorForm.endDate = moment().add(1, 'd').format("YYYY-MM-DD HH:mm:ss")
      this.visitorForm.pmsCancelFlag = 'N'
      this.memberFlag = false
      listType({ typeMaster: "ROOM_TYPE" }).then(res => {
        this.roomTypeArr = res.data.data;
        this.visitorForm.roomTypePk = this.roomTypeArr[0].typePk
        this.visitorForm.roomTypeName = this.roomTypeArr[0].typeName
        this.loadPrice();
        this.getBookableCount();
      });
    },
    selectRoomTypeEvent(val) {
      this.roomTypeArr.forEach(type=>{
        if(type.typePk==val){
          this.visitorForm.roomTypeName = type.typeName
        }
      })
      this.loadPrice();
      this.getBookableCount();
    },
    selectBeginDateEvent() {
      this.calcDays();
      this.loadPrice();
      this.getBookableCount();
    },
    selectEndDateEvent(endDate) {
      this.calcDays();
      this.getBookableCount();
    },
    inputPhoneEvent(val) {//手机号改变
      if(val){
        if(!validatePhone(val)){
          this.$message({type:'warning', message:'手机号不合法'})
          return
        }
        this.$refs.chooseGuestRef.initByPhone(this.visitorForm.guestPhone)
      }
    },
    loadAgreement(data){
      this.visitorForm.agreementPk=data.agreementPk
      this.visitorForm.unitName=data.unitName
      this.form.name=data.unitName
    },
    loadGuest(guest) {
      //回显客人
      this.visitorForm.memPk = guest.memPk;
      this.visitorForm.guestName = guest.memName;
      this.visitorForm.guestGender = guest.memSex;
      this.visitorForm.detailAddress = guest.address;
      this.visitorForm.memberCarNo = guest.cardNumber;
      this.visitorForm.certificateNo = guest.certificateNo;
      this.visitorForm.certificateType = guest.certificateType;
      this.visitorForm.hobbies = guest.hobby;
      this.visitorForm.guestPhone = guest.memPhone;
      this.visitorForm.bornDate = guest.birthday;
      this.visitorForm.email = guest.email;
      this.visitorForm.nationality = guest.nationality;
      this.visitorForm.nativePlace = guest.nativePlace;
      this.visitorForm.bornDate = guest.birthday;

      if (guest.memType == "MEMBER") {
        this.memberFlag = true;
      } else {
        this.memberFlag = false;
      }
    },
    //计算天数
    calcDays() {
      // let a = formatDate(new Date(this.visitorForm.beginDate), "yyyy-MM-dd");
      // let b = formatDate(new Date(this.visitorForm.endDate), "yyyy-MM-dd");
      let a = moment(this.visitorForm.beginDate)
      let b = moment(this.visitorForm.endDate)
      this.visitorForm.checkinDays = getBetweenDay(a, b).length - 1;
    },
    onSubmit() {
      //保存预定
      if (!this.form.userName) {
        this.$message({ type: "warning", message: "请填写 预定人" });
        return;
      }
      if (!this.form.userPhone) {
        this.$message({ type: "warning", message: "请填写 预定人手机号" });
        return;
      } else {
        if (!validatePhone(this.form.userPhone)) {
          this.$message({ type: "warning", message: "手机号不合法！" });
          return;
        }
      }
      if(this.guestList.length<=0) {
        this.$message({ type: "warning", message: "至少需要添加一条客单" });
        return;
      }
      this.form.guaranteeType = this.form.guaranteeType
        ? this.form.guaranteeType
        : null;
      this.form.keepTime = this.form.keepTime ? this.form.keepTime : null;
      let data = {
        order: this.form,
        guestList: this.guestList
      };

      if(this.submitLock){
        return
      }else{
        this.submitLock=true;
      }
      teamReserve(data).then(res => {
        this.$message({ type: "success", message: "预定成功" });
        this.init();
        this.submitLock=false;
      }).catch(()=>{
        this.submitLock=false;
      })
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.bg-reserve {
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
}
.book-info {
  border: 1px solid #ccc;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: 5px;
}
.info-title {
  position: absolute;
  z-index: 11;
  top: 13px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
  padding: 0 5px;
}
.info-li {
  margin-bottom: 0 !important;
}
.reserve-time {
  width: 158px !important;
}
.textarea-width {
  width: 100%;
  margin-bottom: 0;
}
.reserve-contert {
  margin: 15px 0 3px;
}

.addreserve-btn {
  margin-bottom: 0 !important;
  text-align: center;
}
.el-form-item.el-form-item--mini {
  margin-bottom: 5px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100% !important;
}

/* .reserve-contert {
  margin: 5px 0;
} */
.card-tabs > .el-tabs__content {
  padding: 0 15px;
}
.visitor-tabs,
.visitor-contract {
  border: 1px solid #cccccc;
  margin-bottom: 15px;
  margin-top: 15px;
}
.info-title {
  padding: 0 5px;
}
.visitor-addReservations .el-radio + .el-radio {
  margin-left: 0px;
}
.visitor-addReservations .el-radio {
  margin-right: 10px;
}
.visitor-addReservations .el-date-editor.el-input,
.visitor-addReservations .el-date-editor.el-input__inner,
.visitor-addReservations .el-select {
  width: 100%;
}
.visitor-title {
  color: red;
  margin: 5px 0;
}
.visiitor-add {
  text-align: center;
}
.info-title {
  padding: 0 5px;
}
.iconSearch,.iconCarNoVip,.iconCarNoAdd,.iconCarNoCopy,.iconCertificate{
  background: url('../../assets/image/room-status/room_status.png');
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
</style>
<style>
.teamReserve .textarea-width .el-form-item__content {
  width: calc(100% - 80px);
}
.teamReserve .reserve-contert > .card-tabs > .el-tabs__content {
  padding: 0 15px;
}

.teamReserve .agreement-body > .el-dialog > .el-dialog__header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.teamReserve .agreement-body > .el-dialog > .el-dialog__body {
  padding: 0 15px;
}
.teamReserve .el-input-number .el-input__inne {
  text-align: left !important;
}
.teamReserve .el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  line-height: 20px !important;
  font-size: 13px;
}
.teamReserve .el-input--mini .el-input__inner {
  height: 20px !important;
  line-height: 20px;
}
.teamReserve .el-input--mini .el-input__icon {
  line-height: 20px;
}
.teamReserve .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 4px;
}
.teamReserve .visitor-tabs,
.visitor-contract {
  margin-bottom: 5px;
  margin-top: 20px;
}
.teamReserve .visitor-tabs {
  margin-top: 16px;
}
.teamReserve.el-dialog {
  /* width: 1000px !important; */
}
/* .teamReserve  .iconSearch,
.iconCarNoVip,
.iconCarNoAdd,
.iconCarNoCopy,
.iconCertificate {
  width: 23px;
  height: 22px;
} */
.teamReserve .el-button--text {
  padding-top: 2px;
  padding-bottom: 2px;
}
.teamReserve .el-tabs--border-card > .el-tabs__content {
  padding: 10px 15px 10px;
}
.teamReserve .dialog-li[data-v-2ab0e762] {
  width: calc(100% / 4);
}
.teamReserve .patternDialog .el-dialog__body {
  padding: 0;
}
.teamReserve .input_width_style {
  width: calc(95.83333% - 9px) !important;
}
.teamReserve .el-dialog__header {
  padding: 10px 20px 10px;
}
.teamReserve .el-input__inner,
.el-textarea__inner {
  border-radius: 2px;
}

.teamReserve .el-table td,
.el-table th {
  padding: 2px 0;
  font-size: 13px;
}
.teamReserve .el-input-number--mini {
  width: 100%;
  line-height: 20px;
}
/* .teamReserve .el-input--mini .el-input__inner {
  height: 25px !important;
  line-height: 25px;
} */
</style>

