// 结账弹窗
<template>
  <!-- 结账 -->
  <el-dialog class="pattern-dialog height280" title="结账" :visible.sync="dialogPartialCheckout" width="650px" :close-on-click-modal="false" :append-to-body="true">
    <div class="pattern-dialog-container" style="padding: 25px 4px;">
      <el-col :span="24">
        <el-col :span="12">
          <p class="partialcheckout-price">
            <span class="left">消费金额：</span>
            <span class="left price">{{countCheckoutDate.consumptionAmount}}</span>
          </p>
          <p class="partialcheckout-price">
            <span class="left">实收：</span>
            <span class="left price">{{countCheckoutDate.settlementAmount}}</span>
          </p>
          <p class="partialcheckout-price">
            <span class="left" style="color: red" v-if="countCheckoutDate.settlementAmount-countCheckoutDate.consumptionAmount>=0">找零：</span>
            <span class="left" style="color: red" v-if="countCheckoutDate.settlementAmount-countCheckoutDate.consumptionAmount<0">应收：</span>
            <span class="left price">{{this.backMoney}}</span>
          </p>
          <!--<p class="partialcheckout-price" v-if="billForm.onlineFlag">
            <span class="left" style="color: red">线上退款：</span>
            <span class="left price">{{billForm.onlineMoney}}</span>
          </p>-->
        </el-col>
        <el-col :span="12" style="border-left: 1px solid #ddd;">
          <el-form ref="billForm" :model="billForm" size="mini" label-width="90px">
            <div v-if="type==0 || type==2">
                <el-form-item label="结算项目：">
                  <el-select v-model="billForm.projectName" :disabled="true" placeholder="现金支出" style="width:100%">
                    <el-option label="现金" value="shanghai"></el-option>
                    <el-option label="银行卡" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支付方式" required>
                  <el-select v-model="billForm.payment" placeholder="请选择支付方式" style="width:100%">
                    <el-option v-for="(value, key) in paymentMap" :key="key" :label="value" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="客单：">
                  <el-select v-model="billForm.guestOrderPk" placeholder="请选择客单" style="width:100%">
                    <el-option v-for="(item,index) in guestOrderSelect" :key="index" :label="'房间号:'+item.roomNumber+' 客人姓名:'+item.memName" :value="item.guestOrderPk">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input type="textarea" rows="4" v-model="billForm.remark" style="width:100%"></el-input>
                </el-form-item>
            </div>
            <div v-if="type==1">
              提示:不结账退房后账务情况请在【入住管理】的【房退未结】里查询,可重新结账!
              <el-form-item v-if="onlineVisible">
                <el-checkbox v-model="billForm.onlineFlag" @change="onlineFlagChange">线上退款</el-checkbox>
              </el-form-item>
              <el-form-item label="客单：" v-if="billForm.onlineFlag">
                <el-select v-model="billForm.guestOrderPk" placeholder="请选择客单">
                  <el-option v-for="(item,index) in guestOrderSelect" :key="index" :label="'房间号:'+item.roomNumber+' 客人姓名:'+item.memName" :value="item.guestOrderPk">
                  </el-option>
                </el-select>
              </el-form-item>
              <span v-if="billForm.onlineFlag" style="color:red;padding-left:30px">线上押金：{{countCheckoutDate.cashPledge}}元</span> <!-- 总退款金额：{{tempBackMoney}}元，-->
              <el-form-item label="退款金额" v-if="billForm.onlineFlag" required>
                <el-input type="text" v-model="billForm.onlineMoney" ></el-input><!-- v-on:input="onlineMoneyChange"-->
              </el-form-item>
            </div>
          </el-form>
          <!-- <div v-else-if="type==3">
             提示:不结账退房后账务情况请在【入住管理】的【房退未结】里查询
            <el-form ref="hfBillForm" :model="hfBillForm" size="mini" label-width="130px">
              <el-form-item label="豪斯菲尔押金：">
                <span style="color:red">￥{{hfBillForm.hfCashPledge}}</span>
              </el-form-item>
              <el-form-item label="豪斯菲尔赔偿金额：">
                <el-input type="text" v-model="hfBillForm.consumptionAmount"></el-input>
              </el-form-item>
              <el-form-item label="损坏备注：">
                <el-input type="textarea" v-model="hfBillForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </div> -->
        </el-col>
      </el-col>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="confirm" :disabled="islock">确认</el-button>
      <el-button size="mini" @click="dialogPartialCheckout = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import bus from '@/utils/bus'
import { countCheckoutBill, checkoutauthBill, selectGuestOrderBill, checkoutNoPay, checkoutPart, hfCheckoutNoPay } from "@/api/bill";
import { paymentMap } from "@/utils/orm";
export default {
  data() {
    return {
      islock: false,
      orderPk: "",
      type: 0, //弹窗类型 0:结账  1:退房未结  2:部分结账 【废】3:豪斯菲尔退房未结
      dialogPartialCheckout: false,
      countCheckoutDate: {},
      guestOrderSelect: [],
      billPks: '',
      paymentMap: paymentMap,
      backMoney: 0,//找零、欠费金额
      // tempBackMoney: 0,
      onlineVisible:false,//是否可以线上退款
      billForm: {
        payment: "0",
        remark: null,
        guestOrderPk:'',
        onlineFlag:true,
        onlineMoney: 0,
      },
      hfBillForm: {
        orderPk:'',
        consumptionAmount:null,
        payment:'0',
        remark:'',
        hfCashPledge:''
      },
      isDubm:false,
      billStatus:'UN_SET',
      dumbPk:''
    };
  },
  methods: {
    /**
     * orderPk 订单主键
     * type 弹窗类型 0:结账  1:退房未结  2:部分结账
     * billPks 部分结账的账单主键，逗号拼接
     *  */
    init(orderPk, type, billPks,hfCashPledge,isDubm,billStatus,dumbPk) {
      this.isDubm = isDubm
      this.type = type;
      this.orderPk = orderPk;
      this.billPks = billPks;
      this.billForm.guestOrderPk = '';
      this.billForm.payment = "0";
      this.billForm.remark = null;
      this.onlineVisible = false;
      this.billForm.onlineFlag = false;
      this.billForm.onlineMoney = 0
      this.hfBillForm.hfCashPledge = hfCashPledge
      this.dialogPartialCheckout = true;
      this.islock = false;
      this.guestOrderSelect = []
      if(billStatus){
        this.billStatus = billStatus
      }
      this.dumbPk = ''
      if(dumbPk){
        this.dumbPk = dumbPk
      }
      
      // if(!isDubm){
      if(type==2){
        //部分结账
        countCheckoutBill({ billPk: billPks }).then(res => {
          this.countCheckoutDate = res.data;
          this.backMoney = Math.abs(this.countCheckoutDate.settlementAmount-this.countCheckoutDate.consumptionAmount) | 0;
        });
      }else if(type==1){
        // 退房未结
        countCheckoutBill({ orderPk: orderPk }).then(res => {
          this.countCheckoutDate = res.data;
          this.backMoney = Math.abs(this.countCheckoutDate.settlementAmount-this.countCheckoutDate.consumptionAmount);
          if(this.countCheckoutDate.payType==='Y' && this.countCheckoutDate.cashPledge>0){
            this.onlineVisible = true
            this.billForm.onlineFlag = true;
            this.billForm.onlineMoney=this.countCheckoutDate.cashPledge
          }
        });
      }else if(type==0){
        // 结账
        countCheckoutBill({ orderPk: orderPk }).then(res => {
          this.countCheckoutDate = res.data;
          this.backMoney = Math.abs(this.countCheckoutDate.settlementAmount-this.countCheckoutDate.consumptionAmount);
        });
      }
      selectGuestOrderBill({ orderPk: orderPk }).then(res => {
        res.data.forEach(item=>{
          if(item.orderStatus=="CHECKIN" || item.orderStatus=='LEAVENOPAY') {
            this.guestOrderSelect.push(item)
          }
        })
        if(this.guestOrderSelect.length>0){
          this.billForm.guestOrderPk = this.guestOrderSelect[0].guestOrderPk
        }
      });
      // }
    },
    onlineFlagChange(value) {
      if(value){
        this.billForm.onlineMoney= this.countCheckoutDate.cashPledge
      }
    },
    // onlineMoneyChange(value){
    //   this.backMoney = Number(this.tempBackMoney) - Number(value)
    // },
    confirm() {
      if(this.islock){
        return;
      }
      //确定
      if (this.type == 0) {
        let data = {
          orderPk: this.orderPk,
          guestOrderPk: this.billForm.guestOrderPk,
          payment: this.billForm.payment,
          remark: this.billForm.remark,
          billType: this.isDubm?'DUMB':'ROOM'
        };
        this.islock = true;
        checkoutauthBill(data).then(res => {
          this.dialogPartialCheckout = false;
          this.$message({type:'success', message:'操作成功'})
          this.islock = false;
          bus.$emit("dialogVisibleClose");
          bus.$emit("refresh-listReserve");
        }).catch(error=>{
          this.islock = false;
        })
      }else if(this.type==1){
        if(this.billForm.onlineFlag) {
          if(this.billForm.onlineMoney==null || this.billForm.onlineMoney==''){
            this.$message.warning('退款金额不能为空')
            return;
          }
          if(Number(this.billForm.onlineMoney)<0){
            this.$message.warning('退款金额不能小于0')
            return;
          }
          if(Number(this.billForm.onlineMoney) > Number(this.countCheckoutDate.cashPledge)){
            this.$message.warning('不能超出线上支付的押金')
            return;
          }
        }
        let data;
        if(this.onlineVisible && this.billForm.onlineFlag){//线上退款
           data = {
            orderPk: this.orderPk,
            guestOrderPk: this.billForm.guestOrderPk,
            onlineFlag: this.billForm.onlineFlag,
            onlineMoney: this.billForm.onlineMoney,
            billType: this.isDubm?'DUMB':'ROOM'
          };
        }else {
          data = {
            orderPk: this.orderPk,
            guestOrderPk: this.billForm.guestOrderPk,
          };
        }
        this.islock = true;
        checkoutNoPay(data).then(res=>{
          this.$message({type:'success', message:'操作成功'})
          this.dialogPartialCheckout = false;
          this.islock = false;
          bus.$emit("dialogVisibleClose");
          bus.$emit("refresh-listReserve");
        }).catch(error=>{
          this.islock = false;
        })
      }else if(this.type==2){
        let data = {
          billPk:this.billPks,
          payment:this.billForm.payment,
          remark: this.billForm.remark,
          guestOrderPk:this.billForm.guestOrderPk,
          billType: this.isDubm?'DUMB':'ROOM',
          billStatus:this.billStatus!=null?this.billStatus:'UN_SET',
          dumbPk:this.dumbPk
        }
        this.islock = true;
        checkoutPart(data).then(res=>{
          this.$message({type:'success', message:'操作成功'})
          this.dialogPartialCheckout = false;
          this.islock = false;
          bus.$emit("billload");
        }).catch(error=>{
          this.islock = false;
        })
      }else if(this.type==3){
        let data = {
          orderPk: this.orderPk,
          consumptionAmount:this.hfBillForm.consumptionAmount,
          remark: this.hfBillForm.remark
        }
        this.islock = true;
        hfCheckoutNoPay(data).then(res=>{
          this.$message({type:'success', message:'操作成功'})
          this.dialogPartialCheckout = false;
          this.islock = false;
          bus.$emit("dialogVisibleClose");
          bus.$emit("refresh-listReserve");
        }).catch(error=>{
          this.islock = false;
        })
      }
    },
  }
};
</script>

<style scoped>
.height280 .el-dialog__body {
  height: 280px;
}
.partialcheckout-price {
  padding: 0 15px;
  display: list-item;
}
.partialcheckout-price .left {
  font-size: 20px;
  width: 120px;
  text-align: right;
}
.left {
  float: left;
}
.price {
  color: red;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
}
</style>
