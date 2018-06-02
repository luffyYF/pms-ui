// 结账弹窗
<template>
  <!-- 结账 -->
  <el-dialog class="pattern-dialog height280" title="结账" :visible.sync="dialogPartialCheckout" width="45%" :close-on-click-modal="false" :append-to-body="true">
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
            <span class="left price">{{Math.abs(countCheckoutDate.settlementAmount-countCheckoutDate.consumptionAmount)}}</span>
          </p>
        </el-col>
        <el-col :span="12" style="border-left: 1px solid #ddd;">
          <div v-if="type==1">
            提示:不结账退房后账务情况请在【入住管理】的【房退未结】里查询,可重新结账!
            
          </div>
          <div v-else-if="type==3">
             提示:不结账退房后账务情况请在【入住管理】的【房退未结】里查询
            <el-form ref="hfBillForm" :model="hfBillForm" size="mini" label-width="130px">
              <el-form-item label="豪斯菲尔押金：">
                <span style="color:red">￥{{hfBillForm.hfCashPledge}}</span>
                <!-- <el-input type="text" v-model="hfBillForm.hfCashPledge" ></el-input> -->
              </el-form-item>
              <el-form-item label="豪斯菲尔赔偿金额：">
                <el-input type="text" v-model="hfBillForm.consumptionAmount"></el-input>
              </el-form-item>
              <el-form-item label="损坏备注：">
                <el-input type="textarea" v-model="hfBillForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <el-form ref="billForm" :model="billForm" size="mini" label-width="90px">
              <el-form-item label="结算项目：">
                <el-select v-model="billForm.projectName" :disabled="true" placeholder="现金支出">
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
                <el-select v-model="billForm.guestOrderPk" placeholder="请选择客单">
                  <el-option v-for="(item,index) in guestOrderSelect" :key="index" :label="'房间号:'+item.roomNumber+' 客人姓名:'+item.memName" :value="item.guestOrderPk">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="发票设置：">
                <el-radio-group v-model="form.region">
                  <el-radio label="不开发票"></el-radio>
                  <el-radio label="开发票"></el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="billForm.remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-col>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="confirm" :disabled="islock">确认</el-button>
      <el-button size="mini" type="primary" @click="dialogPartialCheckout = false">关闭</el-button>
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
      type: 0, //弹窗类型 0:结账  1:退房未结  2:部分结账 3:豪斯菲尔退房未结
      dialogPartialCheckout: false,
      countCheckoutDate: [],
      guestOrderSelect: [],
      billPks: '',
      paymentMap: paymentMap,
      billForm: {
        payment: "0",
        remark: null,
        guestOrderPk:'',
      },
      hfBillForm: {
        orderPk:'',
        consumptionAmount:null,
        payment:'0',
        remark:'',
        hfCashPledge:''
      }
    };
  },
  methods: {
    /**
     * orderPk 订单主键
     * type 弹窗类型 0:结账  1:退房未结  2:部分结账  3.豪斯菲尔退房未结
     * billPks 部分结账的账单主键，逗号拼接
     *  */
    init(orderPk, type, billPks,hfCashPledge) {
      this.type = type;
      this.orderPk = orderPk;
      this.billPks = billPks;
      this.billForm.payment = "0";
      this.billForm.remark = null;
      this.hfBillForm.hfCashPledge = hfCashPledge
      this.dialogPartialCheckout = true;
      this.islock = false;
      if(type==2){
        countCheckoutBill({ billPk: billPks }).then(res => {
          this.countCheckoutDate = res.data;
        });
      }else{
        countCheckoutBill({ orderPk: orderPk }).then(res => {
          this.countCheckoutDate = res.data;
        });
      }
      selectGuestOrderBill({ orderPk: orderPk }).then(res => {
        this.guestOrderSelect = res.data;
        if(res.data.length>0){
          this.billForm.guestOrderPk = res.data[0].guestOrderPk
        }
      });
    },
    confirm() {
      if(this.islock){
        return;
      }
      this.islock = true;
      //确定
      if (this.type == 0) {
        let data = {
          orderPk: this.orderPk,
          payment: this.billForm.payment,
          remark: this.billForm.remark
        };
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
        checkoutNoPay({orderPk: this.orderPk}).then(res=>{
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
          remark: this.billForm.remark
        }
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
    }
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
