//快速预定
<template>
  <div class="bg-server">
    <el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
      <!-- <el-form-item label="协议单位">
          <el-input v-model="form.danwei"></el-input>
        </el-form-item> -->
      <el-form-item label="协议单位：">
        <el-input v-model="form.unitName" style="width:120px;float:left"></el-input>
        <!-- <el-input v-model="form.agreementPk"></el-input> -->
        <span class="iconSearch" @click="showAgreementFlag = true" title="查询协议单位"></span>
      </el-form-item>
      <el-form-item label="　　渠道">
        <!-- <el-select v-model="form.channelTypePk" placeholder="请选择渠道">
          <el-option v-for="item of channelArr" :key="item.typePk" :label="item.typeName" :value="item.typePk"></el-option>
        </el-select> -->
        <channel-select v-model="form.channelTypePk"></channel-select>
      </el-form-item>
      <el-form-item label="会员卡号">
        <el-input v-model="form.memberCarNo" disabled></el-input>
      </el-form-item>
      <el-form-item class="form-item-btn">
        <el-button @click="searchMemberBtn" type="primary">查询</el-button>
      </el-form-item>

      <!-- 协议单位 -->
      <el-dialog class="agreement-body" title="协议单位" :visible.sync="showAgreementFlag" width="800px" :append-to-body="true">
        <div class="body-conten">
          <agreement/>
        </div>
      </el-dialog>
      <!-- 添加客人 选择客历 -->
      <chooseGuest ref="chooseGuestRef" @sendGuest="loadGuest($event)"></chooseGuest>

      <el-row>
        <h4 class="fast-title">预订单信息</h4>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="　　房型">
            <el-select v-model="form.roomTypePk" placeholder="请选择房型" style="width:166px;">
              <el-option v-for="item of roomTypeArr" :key="item.typePk" :label="item.typeName" :value="item.typePk"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4"><span class="fast-txt">￥{{price}}</span></el-col> -->
        <el-col :span="8">
          <el-form-item label="　　数量">
            <!-- TODO 适应豪斯菲尔暂时固定1间 -->
            <el-select v-model="form.count" @change="changeCount" placeholder="请选择数量" style="width:166px;" :disabled="true">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
            </el-select>
            <!-- <span class="fast-txt">可预订数（{{emptyCount}}）</span> -->
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="　担保" required>
              <el-select v-model="form.guaranteeType" placeholder="请选择担保" style="width:166px;">
                <el-option label="全程担保" value="GUARANTEE_ALL"></el-option>
                <el-option label="担保到达" value="GUARANTEE_ARRIVAL"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="价格方案">
              <el-select v-model="form.priceSchemePk" placeholder="请选择价格方案" style="width:166px;">
                <el-option v-for="item of priceSchemeArr" :key="item.schemePk" :label="item.schemeName" :value="item.schemePk"></el-option>
              </el-select>
            </el-form-item>
            <span class="fast-txt">*</span> -->
          </el-col>
          <!-- <el-col :span="4"><span class="fast-txt">*</span></el-col> -->
      </el-row>
      <el-row>
        <el-col :span="16">
        <el-form-item label="入离时间">
          <el-date-picker style="width:433px;" v-model="form.orderDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" align="right" start-placeholder="抵店日期" end-placeholder="离店日期" :default-time="['12:00:00', '08:00:00']"> </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保留时效">
            <el-time-picker  style="width:166px;"
              value-format="HH:mm"
              v-model="form.keepTime"
              placeholder="选择时间">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预订人" required>
            <el-input v-model="form.userName" style="width:166px;"></el-input>
          </el-form-item>
          <!-- <span class="fast-txt">*</span> -->
        </el-col>
        <el-col :span="8">
          <el-form-item label="预订手机" required>
            <el-input v-model="form.userPhone" style="width:166px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="　　押金">
            <el-input v-model="form.deposit" style="width:166px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
         
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="　　备注" class="textarea-width">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <h4 class="fast-title">入住人信息</h4>
      </el-row>
      <el-row v-for="(item,index) of form.memberList" :key="index" class="top20">
          <el-col :span="8">
              <el-form-item label="姓名" required>
                <el-input style="width:166px;" v-model="item.memName" placeholder="新客人"></el-input>
              </el-form-item>
              <!-- <span class="fast-txt">*</span> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" required>
              <el-input v-model="item.memPhone" style="width:166px;"></el-input>
              <!-- <span class="fast-txt">*</span> -->
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-form-item class="fast-yuding-btn">
          <el-button type="primary" @click="reserve">预 定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import bus from "@/utils/bus";
import Agreement from "@/components/Agreement/Agreement";
import chooseGuest from "@/pages/reserveManage/addReserve/chooseGuest";
import { listType } from "@/api/systemSet/type/typeController";
import { selectPriceScheme } from "@/api/systemSet/priceScheme/priceSchemeController";
import Moment from "Moment";
import { deepClone, formatDate } from "@/utils/index";
import { quickReserve } from "@/api/order/pmsOrderController";
export default {
  components: { Agreement, chooseGuest },
  data() {
    return {
      form: {
        unitName: null,
        memberCarNo: null,
        channelTypePk: null,
        roomTypePk: null,
        priceSchemePk: null,
        beginDate: null,
        endDate: null,
        deposit: null,
        count: null,
        userName: null,
        userPhone: null,
        guaranteeType: null,
        keepTime: null,
        remark: null,
        keepTime: null,
        memberList: [{ memName: "", memPhone: "" }],
        orderDate: [
          formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
          formatDate(
            new Date(new Date().setDate(new Date().getDate() + 1)),
            "yyyy-MM-dd hh:mm:ss"
          )
        ]
      },
      emptyCount: 12,
      price: 265,
      showAgreementFlag: false,
      channelArr: [], //渠道集合
      roomTypeArr: [], //房型集合
      priceSchemeArr: [] //价格方案集合
    };
  },
  mounted() {
    this.init();
    bus.$on("agreementPo", res => {
      console.log(res);
      this.chooseAgreement(res);
    });
  },
  methods: {
    init() {
      this.getChannelList();
      this.getRoomTypeList();
      this.form.count = 1;
      this.changeCount(1);
    },
    //加载渠道类型
    getChannelList() {
      listType({ typeMaster: "CHANNEL" })
        .then(res => {
          this.channelArr = res.data;
        })
        .catch(error => {});
    },
    //加载房间类型
    getRoomTypeList() {
      listType({ typeMaster: "ROOM_TYPE" })
        .then(res => {
          this.roomTypeArr = res.data;
          console.log(this.roomTypeArr);
          this.form.roomTypePk = this.roomTypeArr[0].typePk;
          this.chooseRoomType(this.form.roomTypePk);
        })
        .catch(error => {});
    },
    //选中协议单位
    chooseAgreement(res) {
      this.form.agreementPk = res.agreementPk;
      this.form.unitName = res.unitName;
      this.showAgreementFlag = false;
    },
    //选中房型
    chooseRoomType(value) {
      //查询房型可预订数量
      selectPriceScheme()
        .then(res => {
          //this.emptyCount = res.data;
        })
        .catch(() => {});

      //查询房型使用的价格方案列表
      selectPriceScheme()
        .then(res => {
          this.priceSchemeArr = res.data;
          console.log(this.priceSchemeArr);
          this.form.priceSchemePk = this.priceSchemeArr[0].schemePk;
          this.price = this.priceSchemeArr[0].price;
        })
        .catch(() => {});
    },
    //打开会员列表弹框
    searchMemberBtn() {
      this.$refs.chooseGuestRef.init(
        this.form.orderDate[0],
        this.form.orderDate[1],
        null
      );
    },
    loadGuest(guest) {
      //回显客人
      // console.log('回来了')
      console.log(guest);
      this.form.userName = guest.memName;
      this.form.userPhone = guest.memPhone;
      this.form.memberList[0].memName = guest.memName;
      this.form.memberList[0].memPhone = guest.memPhone;
      // guest.memPk //会员主键
    },
    //改变预订数量
    changeCount(count) {
      this.form.memberList = [];
      for (var i = 0; i < count; i++) {
        var item = {
          memName: null,
          memPhone: null
        };
        this.form.memberList.push(item);
      }
    },
    reserve() {
      this.form.beginDate = this.form.orderDate[0];
      this.form.endDate = this.form.orderDate[1];
      console.log(this.form);
      if(this.verification()) {
        quickReserve(this.form).then(res => {
          if(res.code == 1) {
            this.$message.success('成功添加预订')
            this.form = {
              unitName: null,
              memberCarNo: null,
              channelTypePk: null,
              roomTypePk: null,
              priceSchemePk: null,
              beginDate: null,
              endDate: null,
              deposit: null,
              count: null,
              userName: null,
              userPhone: null,
              guaranteeType: null,
              keepTime: null,
              remark: null,
              keepTime: null,
              memberList: [{ memName: "", memPhone: "" }],
              orderDate: [
                formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
                formatDate(
                  new Date(new Date().setDate(new Date().getDate() + 1)),
                  "yyyy-MM-dd hh:mm:ss"
                )
              ]
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    verification(){
      var content = '';
      if(this.form.channelTypePk == null) {
        content = '请选择渠道';
      } else if(this.form.userName == null) {
        content = "请填写预订人"
      }
      for(var i = 0; i< this.form.memberList.length; i++) {
        if(this.form.memberList[i].memName == null) {
          content = '请填写入住人姓名'
        }
      }
      if( content != '') {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style scoped>
.bg-server {
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
  width: 800px;
}
.fast-title {
  padding-left: 10px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ddd;
}
.fast-txt {
  height: 28px;
  line-height: 28px;
  color: red;
}
.textarea-width {
  width: 100%;
}
.fast-yuding-btn {
  text-align: center;
}
.iconSearch {
  background: url("../../assets/image/room-status/room_status.png");
  background-repeat: no-repeat;
  background-position: -1226px -12px;
  width: 30px;
  height: 28px;
  display: table;
  cursor: pointer;
  float: left;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 5px 15px;
}
</style>
<style>
.form-item-btn .el-form-item__content {
  margin-left: 10px !important;
}
.textarea-width .el-form-item__content {
  width: calc(100% - 80px);
}
</style>

