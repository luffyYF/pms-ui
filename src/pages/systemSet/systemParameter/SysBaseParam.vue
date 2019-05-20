<template>
  <div>
    <el-form  :model="form" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="18">
                <div class="bg-reserve" v-if="this.type == 'sysBaseParamRef' ">
                  <h5 class="info-title">房间设置</h5>
                  <el-form-item label="退房结束时间：">
                    <el-time-picker v-model="form.checkoutTime" value-format="HH:mm:ss" placeholder="请选择">
                    </el-time-picker>
                  </el-form-item>
                  <el-form-item label="退房结束时间前：">
                    <el-input type="text" v-model="form.checkoutReminderTime">
                    </el-input>
                    提醒有客人要退房
                  </el-form-item>
                  <el-form-item label="客单可恢复：">
                    <el-input type="text" v-model="form.checkoutRecoverMinute">
                    </el-input>
                    分钟内可恢复
                    <span style="color:red">（注：夜审过后不可恢复）</span>
                  </el-form-item>
                  <el-form-item label="开启NoShow：">
                    <el-switch
                      v-model="form.noShowFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启NoShow后对应的房间远期房态会被解除）</span>
                  </el-form-item>
                  <el-form-item label="自动续房:">
                    <el-switch
                      v-model="form.extendRoomFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启自动续房后夜审是会将预离订单自动续房）</span>
                  </el-form-item>
                  <el-form-item label="预离转脏房：">
                    <el-switch
                      v-model="form.dirtyRoomFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启预离转脏房后夜审是会将预离房自动转脏房）</span>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'reception' ">
                  <h5 class="info-title">前台设置</h5>
                  <el-form-item>
                    <el-checkbox size="mini" label="是否允许脏房直接入住" v-model="form.dirtyRoomCheckIn" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为脏房可直接办理入住</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="是否允许支付宝/微信退现金" v-model="form.aliPayWeChatRefund" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为允许微信/支付宝退现金</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="银行卡退现金" v-model="form.bankCardRefund" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为允许银行卡收款可直接进行现金退款</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="脏房入住提醒" v-model="form.dirtyRoomCheckInRemind" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为预定入住脏房时提醒</span>
                  </el-form-item>
                  <el-form-item >
                    <el-checkbox size="mini" label="退房必须清卡" v-model="form.checkOutMustClearCard" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为退房时必须清理该房间所有的房卡</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="客房预定自动取消" v-model="form.guestRoomAutoCancel" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为超时订单保留时间的预定订单自动取消(不含部分入住已预交定金的订单)</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="同一证件只能登记一间房" v-model="form.idCardSingleRoom" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中同一客人在同一时间段只允许入住一间客房</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="正式营业选项" v-model="form.formalBusiness" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中则在相关单据上不打印【试营业内容】</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="启用跨夜自动转住入脏功能" v-model="form.acrossNightAutoCheckIn" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：启用则房间跨夜自动转入住时间设置可用,反之则不用</span>
                  </el-form-item>
                  <el-form-item label="宾客须知字体大小">
                    <el-input-number style="width:300px;" size="mini" :precision="0" :step="1" :min="0" :controls="false" v-model="form.guestInstructionsFontSize" />
                    <span style="color:red">默认12,仅对A4 1/2,A4 1/3格式有效</span>
                  </el-form-item>
                  <el-form-item  label="宾客须知">
                    <el-input size="mini" style="width:300px;" v-model="form.guestInstructions" type="textarea"/>
                    <span style="color:red">注：启用则房间跨夜自动转入住时间设置可用,反之则不用</span>
                  </el-form-item>

                  <el-form-item label="催押提醒">
                    <el-input-number style="width:300px;" size="mini" :precision="0" :step="1" :min="0" :controls="false" v-model="form.advanceDepositRemind" />
                    <span style="color:red">房间结算收款-(房间房费+商品消费)小于设定值则房态盘出现催押提醒</span>
                  </el-form-item>

                  <el-form-item label="钟点房自动提醒">
                    <el-input-number style="width:300px;" size="mini" :precision="0" :step="1" :min="0" :controls="false" v-model="form.hourRoomRemind" />
                    <span style="color:red">如:设定为30,则钟点房退房时间点前30分钟时自动提醒前台工作人员;单位【分钟】</span>
                  </el-form-item>

                  <el-form-item label="房间跨夜自动转住入脏时间设置">
                    <el-time-picker
                      value-format="HH:mm:ss"
                      :clearable="false"
                      :editable="false"
                      placeholder="提醒时间"
                      v-model="form.roomAcrossNightDirtyTime">
                    </el-time-picker>
                    <span style="color:red">如:设定时间为00时20分,则凌晨00是20分自动将所有在住房间的房态置为入住</span>
                  </el-form-item>
                  <el-form-item label="定时备份数据湖">
                    <el-time-picker
                      value-format="HH:mm:ss"
                      :clearable="false"
                      :editable="false"
                      placeholder="提醒时间"
                      v-model="form.databaseBackupTime">
                    </el-time-picker>
                    <span style="color:red">如:设定为05时10分,则在凌晨05时10分进行完整数据备份</span>
                  </el-form-item>
                  <!-- <el-form-item label="钟点房自动提醒">
                    <el-input-number style="width:300px;" size="mini" :precision="0" :step="1" :min="0" :controls="false" v-model="form.guestInstructionsFontSize" />
                    <span style="color:red">如:设定为30,则钟点房退房时间</span>
                  </el-form-item> -->
                  <el-form-item label="全部">
                    <el-color-picker v-model="form.wholeRoomStatusColor" size="mini"></el-color-picker>
                    <span style="color:red">房态图背景颜色</span>
                  </el-form-item>
                  <el-form-item label="空房">
                    <el-color-picker v-model="form.nullRoomStatusColor" size="mini"></el-color-picker>
                    <span style="color:red">房态图空房背景颜色</span>
                  </el-form-item>
                  <el-form-item label="住人">
                    <el-color-picker v-model="form.liveRoomStatusColor" size="mini"></el-color-picker>
                    <span style="color:red">房态图住人背景颜色</span>
                  </el-form-item>
                  <el-form-item label="维修">
                    <el-color-picker v-model="form.repairRoomStatusColor" size="mini"></el-color-picker>
                    <span style="color:red">房态图维修房背景颜色</span>
                  </el-form-item>
                </div>

                <div class="bg-reserve" v-if="this.type == 'finance' ">
                  <h5 class="info-title">财务设置</h5>
                  <el-form-item label="财务断帐日">
                    <el-select size="mini" v-model="form.financialCloseDate" placeholder="断帐日" >
                      <el-option v-for="y in duanzhangriList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                    <span style="color:red">默认:无[每月:当月1日到下月1日(不含)]、其他,如果段帐日设置为25日[每月:上月26到当月26日(不含)]</span>
                  </el-form-item>
                  <el-form-item label="房价取值模式">
                    <el-select size="mini" v-model="form.roomPriceValueType" placeholder="房价取值模式" >
                      <el-option v-for="y in roomPriceValueTypeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                    <span style="color:red"></span>
                  </el-form-item>
                  <el-form-item label="优惠券核销">
                    <el-select size="mini" v-model="form.couponWriteOff" placeholder="优惠券核销" >
                      <el-option v-for="y in couponWriteOffList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                    <span style="color:red"></span>
                  </el-form-item>
                  <el-form-item label="营业日截止">
                    <el-select size="mini" v-model="form.businessDayEnd" placeholder="营业日截止" >
                      <el-option v-for="y in businessDayEndList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                    <el-time-picker
                      v-if="form.businessDayEnd == 1"
                      value-format="HH:mm:ss"
                      :clearable="false"
                      :editable="false"
                      placeholder="营业日截止时间"
                      v-model="form.businessDayEndTime">
                    </el-time-picker>
                    <span style="color:red"></span>
                  </el-form-item>
                  <el-form-item label="交班模式">
                    <el-select size="mini" v-model="form.shiftMode" placeholder="断帐日" >
                      <el-option v-for="y in shiftModeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                    <span v-if="form.shiftMode == 1">设置备用金额<el-input-number style="width:200px;" size="mini" :precision="2" :step="1" :min="0" :controls="false" v-model="form.reserveFund" /></span>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'roomService' ">
                  <h5 class="info-title">房务设置</h5>
                  <el-form-item>
                    <el-checkbox size="mini" label="启用房务中心查房业务流程" v-model="form.roomServiceCenterCheckRoom" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中则启用相关房务管理流程,含两个子业务项 </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" :disabled="form.roomServiceCenterCheckRoom != 'Y'" label="启用查房ok" v-model="form.checkRoomCheckOut" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为房间必须查房ok后才允许退房</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" :disabled="form.roomServiceCenterCheckRoom != 'Y'" label="房务入住提醒" v-model="form.roomServiceCheckInRemind" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为前台办理客人入住后提醒房务中心</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="开启消息铃声" v-model="form.messageRingTone" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为开启消息铃声</span>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'print' ">
                  <h5 class="info-title">打印设置</h5>
                  <el-form-item>
                    <el-checkbox size="mini" label="是否打印账单" v-model="form.printBillFlag" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为退房自动打印账单 </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="打印支付宝/微信收款单" v-model="form.printAliPayWeChatReceipt" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为打印支付宝/微信收款单</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="打印支付宝/微信退款款单" v-model="form.printAliPayWeChatRefund" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为打印支付宝/微信退款款单</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="打印换房单" v-model="form.printChangeRoom" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为打印换房单</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="打印预览" v-model="form.printPreview" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为所有单据打印室自动开启预览 </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="结账中打印冲调账务" v-model="form.settleAccountPrintBlank" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为结账中打印相关冲调账务</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini"  label="押金单不显示身份证和地址" v-model="form.depositNoDisplayIdCardAndAddress" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为押金单中不显示身份证和地址</span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="押金单不显示房价" v-model="form.depositNoDisplayRoomPrice" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为押金单不显示房价</span>
                  </el-form-item>

                  <el-form-item label="是否打印预订单">
                    <el-select size="mini" v-model="form.printReserveOrder" >
                      <el-option v-for="y in printReserveOrderList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="入住单打印方式">
                    <el-select size="mini" v-model="form.checkInOrderPrintType"  >
                      <el-option v-for="y in checkInOrderPrintTypeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  
                  <el-form-item label="押金单打印方式">
                    <el-select size="mini" v-model="form.depositPrintType" >
                      <el-option v-for="y in depositPrintTypeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="退房默认打印账单格式">
                    <el-select size="mini" v-model="form.checkOutPrintBillType" >
                      <el-option v-for="y in checkOutPrintBillTypeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客房吧入账打印">
                    <el-select size="mini" v-model="form.guestAccountEntryPrint" >
                      <el-option v-for="y in guestAccountEntryPrintList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="退房打印账单条目">
                    <el-select size="mini" v-model="form.checkOutPrintBillEntry" >
                      <el-option v-for="y in checkOutPrintBillEntryList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox size="mini" label="开启早餐券打印" v-model="form.breakfastCouponPrint" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中为开启纸质早餐券打印</span>
                  </el-form-item>
                  <el-form-item  label="说明">
                    <el-input size="mini" :disabled="form.breakfastCouponPrint != 'Y'" style="width:300px;" v-model="form.breakfastCouponPrintExplain" type="textarea"/>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'member' ">
                  <h5 class="info-title">会员设置</h5>
                  <el-form-item label="客房吧入账打印">
                    <el-select size="mini" style="width:200px;" v-model="form.memberCardCheckInController" >
                      <el-option v-for="y in memberCardCheckInControllerList" :label="y.label" :value="y.value" :key="y.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'warehouse' ">
                  <h5 class="info-title">仓库设置</h5>
                  <el-form-item>
                    <el-checkbox size="mini" label="允许非在住宾客(前厅销售)独立销售商品" v-model="form.noStayInGuestSaleGoods" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">注：选中则非在住可帐务点单时,可以独立设置非在住客(前厅销售)与客房分开设置商品销售体系</span>
                  </el-form-item>
                </div>
                <div class="bg-reserve" v-if="this.type == 'tel' ">
                  <h5 class="info-title">电话设置</h5>
                  <el-form-item>
                    <el-checkbox size="mini" label="客房呼出时自动将话费计入房间中" v-model="form.telBillCountInGuestRoom" true-label="Y" false-label="N"></el-checkbox>
                    <span style="color:red">房间必须在住</span>
                  </el-form-item>
                </div>
               
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center">
                <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {find, update} from '@/api/systemSet/pmsSysParamController'
  export default {
    data() {
      return {
        form: {},
        type:"",
        duanzhangriList:[
          {label:"无",value:null},
          {label:"20",value:20},
          {label:"21",value:21},
          {label:"22",value:22},
          {label:"23",value:23},
          {label:"24",value:24},
          {label:"25",value:25},
          {label:"26",value:26},
          {label:"27",value:27},
          {label:"28",value:28},
        ],
        couponWriteOffList:[
          {label:"同一订单不限制",value:1},
          {label:"同一订单仅限一张",value:2},
        ],
        roomPriceValueTypeList:[
          {label:"原值",value:0},
          {label:"四舍五入",value:1},
          {label:"向上取整",value:2},
          {label:"向下取整",value:3},
        ],
        businessDayEndList:[
          {label:"固定时间点",value:1},
          {label:"每日首次交班时间",value:0},
        ],
        shiftModeList:[
          {label:"现金交班模式",value:1},
          {label:"应收交班模式",value:2},
          {label:"实收交班模式",value:3}
        ],
        printReserveOrderList:[
          {label:"不打印",value:0},
          {label:"打印",value:1},
          {label:"提示",value:2},
        ],
        checkInOrderPrintTypeList:[
          {label:"不打印",value:0},
          {label:"直接打印",value:1},
          {label:"提示打印",value:2},
        ],
        checkOutPrintBillTypeList:[
          {label:"账单(汇总)",value:0},
          {label:"项目(汇总)",value:1},
          {label:"账单(明细)",value:2},
        ],
        depositPrintTypeList:[
          {label:"不打印",value:0},
          {label:"直接打印",value:1},
          {label:"提示打印",value:2},
        ],
        guestAccountEntryPrintList:[
          {label:"不打印",value:0},
          {label:"直接打印",value:1},
          {label:"提示打印",value:2},
        ],
        checkOutPrintBillEntryList:[
          {label:"全部账务",value:0},
          {label:"排除部分已结账务",value:1},
        ],
        memberCardCheckInControllerList:[
          {label:"既可刷卡也可以手动输入入住",value:0},
          {label:"只允许刷卡入住",value:1},
        ],

        

      }
    },
    methods: {
      init(type) {
        console.log(type)
        this.type = type
        find().then(res=>{
          this.form = res.data
        })
      },
      onSubmit() {
        var data = {
          params:this.form,
          type:this.type
        }
        update(data).then(res=>{
          this.$message.success('保存成功');
        })
      }
    }
  }
</script>

<style scoped>
.book-info{
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid #ccc;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  padding: 5px;
  padding-top: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 10px;
  background: #f7f7f7;
}
.el-select {
  width: 130px;
}
.el-input--mini{
  width: 100px;
}
.el-date-editor--time{
  width: 150px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom:5px;
}
.red{
  color:red;
}
</style>
