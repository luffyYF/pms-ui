// 会员充值编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="修改密码" :visible.sync="dialogVisible" width="600px"
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm" label-width="120px">
        <el-col :span="24">
          <el-col :span="12">
            <div class="title-right font-style">
              <div class="block-inline">{{dataForm.cardNumber}}</div>
              <div class="block-inline">{{dataForm.memName}}</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="title-left font-style">
              <span style="font-size: 16px;color: #000">余额：</span>{{dataForm.balance}}
            </div>
          </el-col>
        </el-col>
				<el-form-item label="充值方式" prop="projectCode" size="mini">
          <el-radio-group v-model="dataForm.projectCode">
            <el-radio :label="234">现金</el-radio>
            <el-radio :label="211">银行卡</el-radio>
            <el-radio :label="235">支付宝</el-radio>
            <el-radio :label="237">微信</el-radio>
          </el-radio-group>
        </el-form-item>
				<el-form-item label="会员卡号" size="mini">
          <el-input v-model="dataForm.cardNumber" class="input-width" readonly></el-input>
        </el-form-item>
				<el-form-item label="充值金额" size="mini">
          <el-input-number v-model="dataForm.rechargeMoney" class="input-width number-style" :min="0" :precision="2" :controls="false" @blur="handleBlur" @change="handleChange"></el-input-number>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="赠送金额" size="mini">
              <el-input-number v-model="dataForm.donationMoney" class="number-style" :min="0" :precision="2" :controls="false" @blur="handleBlur" @change="handleChangeDonation"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="充值赠送合计" label-width="100px" size="mini">
              <el-input-number v-model="dataForm.totalMoney" class="number-style" :min="0" :precision="2" :controls="false" @blur="handleBlur" disabled></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
				<el-form-item label="赠送积分" size="mini">
          <el-input-number v-model="dataForm.donationIntegral" class="input-width number-style" :min="0" :precision="2" :controls="false" @blur="handleBlur" disabled></el-input-number>
        </el-form-item>
				<el-form-item label="优惠券" size="mini">
          <el-input v-model="dataForm.couponName" class="input-width" disabled></el-input>
        </el-form-item>
				<el-form-item label="礼品" size="mini">
          <el-input v-model="dataForm.giftName" class="input-width" disabled></el-input>
        </el-form-item>
				<el-form-item label="备注" size="mini">
          <el-input v-model="dataForm.remark" class="input-width" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="saveData" :loading="loading">{{dataForm.typePk == null ? '保存' : '修改'}}</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>  
import { giveRule, recharge } from '@/api/customerRelation/pmsMemberController'

  export default {
    data () {
      return {
        dialogVisible: false,
				loading: false,
        dataForm: {
          memPk: '',
          gradePk: '',
          memName: '',
          balance: 0,
          projectCode: 234,
          cardNumber: '', 
          couponName: '', 
          giftName:'',
          rechargeMoney: 0,
          donationMoney: 0,
          totalMoney: 0,
          donationIntegral: 0,
          remark: '',
          couponPos: [],
          giftPos: [],
          isCallback:true
        },
      }
    },
    methods: {
      showDialog (data,isCallback) {
        this.isCallback = isCallback
        console.log(data)
        this.dataForm = {
          memPk: data.memPk,
          gradePk: data.gradePk,
          memName: data.memName,
          balance: data.availableBalance.toFixed(2),
          projectCode: 234,
          cardNumber: data.cardNumber, 
          couponName: '', 
          giftName:'',
          rechargeMoney: 0,
          donationMoney: 0,
          totalMoney: 0,
          donationIntegral: 0,
          remark: '',
          couponPos: [],
          giftPos: [],
        }
        this.dialogVisible = true
      },
      saveData(){
        this.loading = true
        recharge(this.dataForm).then(result => {
          if(result.code == 1){
            this.$message({
              message: result.sub_msg,
              type: 'success'
            });
          }
          this.dialogVisible = false
          if(this.isCallback){
            this.$emit('callback')
          } 
        }).finally(() => {
          this.loading = false
        })
      },
      handleClose () {
        this.dialogVisible = false
        if(this.isCallback){
            this.$emit('callback')
        }
			},
			handleChange (val) {
        giveRule({gradePk: this.dataForm.gradePk, price: val}).then(res => {
          if (res.data.detailPo.type == 0) {
            this.dataForm.donationMoney = this.dataForm.rechargeMoney * (res.data.detailPo.giveCount/100)
          } else {
            this.dataForm.donationMoney = res.data.detailPo.giveCount
          }
          this.dataForm.totalMoney = this.dataForm.rechargeMoney + this.dataForm.donationMoney
          this.dataForm.donationIntegral = res.data.detailPo.giveIntegral
          this.dataForm.couponName = res.data.couponName
          this.dataForm.giftName = res.data.giftName
          this.dataForm.couponPos = res.data.couponPos
          this.dataForm.giftPos = res.data.giftPos
        })
      },
      handleChangeDonation (val) {
        this.dataForm.totalMoney = this.dataForm.rechargeMoney + val
      },
      handleBlur () {
        if (this.dataForm.rechargeMoney == undefined) {
          this.dataForm.rechargeMoney = 0
        }
        if (this.dataForm.donationMoney == undefined) {
          this.dataForm.donationMoney = 0
        }
        if (this.dataForm.totalMoney == undefined) {
          this.dataForm.totalMoney= 0
        }
        if (this.dataForm.donationIntegral == undefined) {
          this.dataForm.donationIntegral = 0
        }
      },
    }
  }
</script>

<style scoped>
.input-width {
  width: 80%;
}
.title-right {
  height: 50px;
  line-height: 50px;
  text-align: right;
}
.title-left {
  height: 50px;
  line-height: 50px;
  margin-left: 12px;
  text-align: left;
}
.font-style {
  font-size: 20px;
  font-weight: normal;
  color: #000;
}
.block-inline {
  display: inline-block;
  margin-left: 8px;
}
.title-left.font-style {
  color: #F00;
}
</style>

<style>
.number-style .el-input--mini .el-input__inner {
  text-align: left;
  padding: 0 5px;
}
</style>

