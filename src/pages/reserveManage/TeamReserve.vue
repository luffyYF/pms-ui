//团队预定
<template>
  <div class="teamReserve">
    <el-form ref="form" :model="form" size="mini" label-width="80px" :inline="true">
      <div class="bg-reserve">
        <el-row>
          <el-col :span="24" class="book-info">
            <h5 class="info-title">预定信息</h5>
            <el-form-item label="名   称" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="预订人" required>
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="预订手机">
              <el-input v-model="form.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="协议单位" required>
              <el-input v-model="form.agreementName" :readonly="true">
                <el-button slot="append" icon="el-icon-search" @click="openAgreement" title="查询协议单位"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="客源渠道" required>
              <channel-select ref="channelRef" v-model="form.channelTypePk" @callback="changeChannel($event)"></channel-select>
            </el-form-item>
            <el-form-item label="抵店离店" required>
              <el-date-picker v-model="beginEndPicker" @change="changePicker" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="抵店日期" end-placeholder="离店日期" :clearable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预订卡号">
              <el-input v-model="form.reserveCardNo"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="form.payment">
                <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保留时效">
              <el-time-select class="reserve-time" v-model="form.keepTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></el-time-select>
            </el-form-item>
            <el-form-item label="是否团体">
              <el-select v-model="form.isTeam" :disabled="true">
                <el-option label="否" value="N"></el-option>
                <el-option label="是" value="Y"></el-option>
              </el-select>
            </el-form-item>
            <!-- <br> -->
            <el-form-item label="备   注">
              <el-input :rows="3" v-model="form.remark" type="textarea" resize="both"></el-input>
            </el-form-item>
            <!-- <el-form-item label="预订数量">
              <el-input v-model="form.rentCount"></el-input>
            </el-form-item> -->
            <!-- <el-col :span="4">
                <el-form-item label="登记时间">
                  <el-date-picker v-model="reserveTime" type="datetime" placeholder="选择日期时间" :disabled="true"></el-date-picker>
                </el-form-item>
              </el-col> -->
            <!-- <el-col :span="4">
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
              </el-col> -->
          </el-col>
        </el-row>
        <!-- 客单 begin -->
        <el-row>
          <el-col :span="20">
            <div class="visitor-tabs">
              <el-table :data="guestList" height="400px" border style="width: 100%;margin-top: 7px;">
                <el-table-column prop="roomTypePk" label="房型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.roomTypePk" @change="changeRoomType($event, scope.$index)" placeholder="请选择房间类型" size="mini">
                      <el-option :label="r.typeName" :value="r.typePk" v-for="r in scope.row.roomTypeArr" :key="r.typePk"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="beginDate" label="预抵"></el-table-column>
                <el-table-column prop="endDate" label="预离"></el-table-column> -->
                <el-table-column prop="currPrice" label="当天房租">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.currPrice"></el-input>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="deposit" label="押金">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.deposit"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column prop="roomCount" label="预定数量">
                  <template slot-scope="scope">
                    <!-- :max="scope.row.bookableCount" -->
                    <el-input-number size="mini" v-model="scope.row.roomCount" :min="0" ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="bookableCount" label="可预订数量">
                  <template slot-scope="scope">
                    <span style="color:red">{{scope.row.bookableCount}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" :fixed="'right'">
                  <template slot-scope="scope">
                    <el-button size="mini" type="text" @click.native.prevent="deleteItem(scope.$index, guestList)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="4" class="guest-opr">
            <el-tooltip class="buttonOprItem" v-if="hasPerm('pms:groupReserve:addDetail')"  effect="dark" content="添加预定" placement="right">
              <el-button type="primary" icon="el-icon-plus" @click="addItem" size="mini">添加</el-button>
            </el-tooltip>
            <br>
            <el-tooltip class="buttonOprItem" effect="dark" v-if="hasPerm('pms:groupReserve:remove')"  content="清空预定" placement="right">
              <el-button type="danger" icon="el-icon-delete" @click="clearItem" size="mini">清空</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <!-- 客单 end -->
        <el-row>
          <el-col :span="20" class="bottom-submit">
            <el-form-item>
              <el-button type="primary"  v-if="hasPerm('pms:groupReserve:saveReserve')" @click="onSubmit" :loading="submitLock">保存预订</el-button>
              <!-- <el-button type="primary" @click="init" :loading="submitLock">清空</el-button> -->
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <!-- 协议单位 -->
    <Agreement ref="agreementRef" @sendData="agreementCallback($event)"></Agreement>
  </div>
</template>
<script>
import moment from "moment";
import { paymentMap } from "@/utils/orm";
import { validatePhone } from "@/utils/validate";
import { teamReserve, calcMoney } from "@/api/order/pmsOrderController";
import { listType } from "@/api/utils/pmsTypeController";
import { getBookableCount } from "@/api/atrialCenter/roomForwardStatus";
import Agreement from "@/components/Agreement/Agreement";

export default {
  components: { Agreement },
  data() {
    return {
      submitLock: false, //提交表单锁
      paymentMap: paymentMap,
      beginEndPicker: [],
      form: {
        orderPk: null,
        name: null,
        guarantee: null,
        guaranteeType: null,
        payment: null,
        isTeam: null,
        keepTime: null,
        remark: null,
        reserveCardNo: null,
        userName: null,
        userPhone: null,
        beginDate: null,
        endDate: null,
        agreementName: null,
        agreementPk: null,
        channelTypePk:null,
      },
      guestList: [],
      roomTypeArr: [],
      reserveTime: new Date(),
      pickerOptions0: {
        //限制今天以前的日期不可选择
        disabledDate(time) {
          return time.getTime() < moment().subtract(1, "days") - 8.64e7;
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.submitLock = false;
      this.form.orderPk = null;
      this.form.name = "团队预定";
      this.form.guarantee = null;
      this.form.guaranteeType = null;
      this.form.payment = "-1";
      this.form.isTeam = "Y";
      this.form.keepTime = null;
      this.form.remark = null;
      this.form.reserveCardNo = null;
      this.form.userName = null;
      this.form.userPhone = null;
      this.form.beginDate = null;
      this.form.endDate = null;
      this.form.agreementName = null;
      this.form.agreementPk = null;
      this.form.channelTypePk = null;
      this.reserveTime = new Date();
      this.guestList = [];
      this.beginEndPicker = [];
      this.$refs.channelRef.load(true);
      // listType({ typeMaster: "ROOM_TYPE" }).then(res => {
      //   this.roomTypeArr = res.data.data;
      // });
      this.roomTypeArr = []
      var typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == "ROOM_TYPE"){
          this.roomTypeArr.push(item);
        }
      })
    },
    //打开选择协议单位
    openAgreement() {
      this.$refs.agreementRef.init();
    },
    //选择协议回调
    agreementCallback(data) {
      console.log(data)
      this.form.agreementPk = data.agreementPk;
      this.form.agreementName = data.unitName;
      this.form.userPhone = data.contactPhone;
      this.form.userName = data.contactName;
    },
    //添加条目
    addItem() {
      if(this.roomTypeArr.length<=0) {
        this.$message.warning('当前没有可以预定的房型');
        return;
      }
      if(this.guestList.length>=this.roomTypeArr.length){
        return;
      }
      if(this.beginEndPicker.length!=2){
        this.$message.warning('请选择抵店离店日期');
        return;
      }
      this.guestList.push({
        roomTypePk: null,
        roomTypeName: null,
        beginDate: this.beginEndPicker[0],
        endDate: this.beginEndPicker[1],
        channelTypePk: this.form.channelTypePk,
        currPrice:0,
        deposit:0,
        roomCount: 0,// 预定房间数量
        bookableCount: 0,//可预订数量
        roomTypeArr: this.roomTypeArr,
      });
    },
    //删除条目
    deleteItem(index, rows) {
      rows.splice(index, 1);
    },
    clearItem() {
      this.guestList = [];
    },
    //选择房型事件
    changeRoomType(typePk, index) {
      let currRoomType;
      this.roomTypeArr.forEach(item=>{
        if(item.typePk==typePk){
          currRoomType = item;
        }
      })
      this.guestList[index].roomTypeName = currRoomType.typeName
      this.guestList[index].roomTypePk = typePk
      this.localPrice(typePk, index);
      this.loadBookableCount(typePk, index);
    },
    localPrice(roomTypePk, index) {
      if(!roomTypePk){
        return;
        this.guestList[index].currPrice = 0
      }
      let data = {
        roomTypePk: roomTypePk,
        beginDate: this.beginEndPicker[0],
        endDate: moment(this.beginEndPicker[0]).add(1, "days").format("YYYY-MM-DD HH:mm:ss")
      };
      calcMoney(data).then(res => {
        this.guestList[index].currPrice =res.data;
      });
    },
    loadBookableCount(roomTypePk, index){
      if(!roomTypePk){
        return;
        this.guestList[index].bookableCount = 0
      }
      let data = {
        roomTypePk: roomTypePk,
        beginDate: moment(this.beginEndPicker[0]).format("YYYY-MM-DD"),
        endDate: moment(this.beginEndPicker[1]).format("YYYY-MM-DD")
      };
      getBookableCount(data).then(res => {
        this.guestList[index].bookableCount = res.data
      });
    },
    //渠道改变
    changeChannel(channelPk){
      this.guestList.forEach(item=>{
        item.channelTypePk = channelPk
      })
    },
    //日期改变
    changePicker(picker){
      this.guestList.forEach((item,index)=>{
        item.beginDate = picker[0]
        item.endDate = picker[1]
        this.localPrice(item.roomTypePk, index);
        this.loadBookableCount(item.roomTypePk, index);
      })
    },

    //提交
    onSubmit() {
      this.submitLock = true
      // console.log("form", this.form);
      // console.log("guestList", this.guestList);
      if(!this.validateForm()) {
        this.submitLock = false
        return;
      }

      let tempGuestLit = [];
      for(let g of this.guestList) {
        for (let i = 0;i<g.roomCount;i++){
          tempGuestLit.push(g)
        }
      }
      this.form.beginDate = this.beginEndPicker[0]
      this.form.endDate = this.beginEndPicker[1]
      console.log(this.form.beginDate)
      console.log(this.form.endDate)
      // return;
      // //提交
      let data = {
        order: this.form,
        guestList: tempGuestLit
      }
      teamReserve(data).then(res=>{
        this.init();
        this.$message.success('预定成功');
      }).finally(()=>{
        this.submitLock = false
      })

    },

    //表单验证
    validateForm() {
      // 验证主单
      if(!this.form.name) {
        this.$message.warning('团队名称不能为空');
        return false;
      }
      if(!this.form.userName){
        this.$message.warning('预订人不能为空');
        return false;
      }
      // if(!this.form.userPhone){
      //   this.$message.warning('预订手机不能为空');
      //   return false;
      // }
      if(this.form.userPhone) {
        if (!validatePhone(this.form.userPhone)) {
          this.$message.warning('预定手机号不合法');
          return false;
        }
      }
      if(!this.form.agreementPk || !this.form.agreementName){
        this.$message.warning('协议单位不能为空');
        return false;
      }
      if(!this.form.channelTypePk) {
        this.$message.warning('客源渠道不能为空');
        return false;
      }
      if(this.beginEndPicker.length!=2){
        this.$message.warning('抵店离店日期不能为空');
        return false;
      }
      
      //验证客单
      if(this.guestList.length<=0){
        this.$message.warning('至少添加一条预定');
        return false;
      }

      let tempStr = ""
      for(let g of this.guestList) {
        if(g.roomTypePk) {
          if(tempStr.indexOf(g.roomTypePk)==-1) {
            tempStr += g.roomTypePk
          }else{
            this.$message.warning('不能有重复的房型');
            return false;
          }
        }
      }

      for(let g of this.guestList) {
        if(!g.roomTypePk) {
          this.$message.warning('请选择房间类型');
          return false;
        }
        if(g.currPrice==null || g.currPrice=='' || isNaN(g.currPrice) || g.currPrice<0) {
          this.$message.warning(g.roomTypeName + ' 当天房租输入有误')
          return false;
        }
        if(g.roomCount<=0) {
          this.$message.warning(g.roomTypeName + ' 预订数量要大于0')
          return false;
        }
        if(g.roomCount>g.bookableCount) {
          this.$message.warning(g.roomTypeName + ' 可预订数量不足')
          return false;
        }
      }
      return true;
    },

  },
 
};
</script>
<style scoped>
.teamReserve .guest-opr{
  margin-top: 50px;
}
.teamReserve .guest-opr button{
  margin-left: 20px;
  display: block;
}
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
.teamReserve .info-title {
  position: absolute;
  z-index: 11;
  top:0px;
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
.bottom-submit {
  text-align: center;
  margin: 15px 0 3px;
}

.el-form-item.el-form-item--mini {
  margin-bottom: 5px;
}
.card-tabs > .el-tabs__content {
  padding: 0 15px;
}
.visitor-tabs,
.visitor-contract {
  border: 1px solid #cccccc;
  margin-bottom: 15px;
  margin-top: 15px;
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
.iconSearch,
.iconCarNoVip,
.iconCarNoAdd,
.iconCarNoCopy,
.iconCertificate {
  background: url("../../assets/image/room-status/room_status.png");
  background-repeat: no-repeat;
  background-position: -1225px -17px;
  width: 23px;
  height: 23px;
  display: table;
  cursor: pointer;
}
.iconCarNoVip {
  float: left;
  background-position: -1057px -15px;
}
.iconCarNoAdd {
  background-position: -1181px -17px;
}
.iconCertificate {
  background-position: -1100px -15px;
}
</style>
<style>
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
.teamReserve .book-info .el-input--mini .el-input__inner {
  width: 150px !important;
}

.teamReserve .book-info .el-date-editor.el-range-editor.el-input__inner {
  width: 394px !important;
}

.remark-class .el-input__inner {
  width: 500px !important;
}
</style>

