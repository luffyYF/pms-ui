// 会员充值编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="积分增减" :visible.sync="dialogVisible" width="600px"
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm" label-width="120px">
				<el-form-item label="会员卡号" size="mini">
          <el-input v-model="dataForm.cardNumber" class="input-width" readonly></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" size="mini">
          <el-input v-model="dataForm.memName" class="input-width" readonly></el-input>
        </el-form-item>
        <el-form-item label="会员级别" size="mini">
          <el-input v-model="dataForm.gradeName" class="input-width" readonly></el-input>
        </el-form-item>
          <el-form-item label="剩余积分" size="mini">
          <el-input v-model="dataForm.availableIntegral" class="input-width" readonly></el-input>
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
          //gradePk: '',
          memName: '',
          balance: 0,
          projectCode: 234,
          cardNumber: '', 
          remark: '',
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
         // gradePk: data.gradePk,
          memName: data.memName,
          balance: data.availableBalance.toFixed(2),
          projectCode: 234,
          cardNumber: data.cardNumber, 
          remark: '',
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
        //giveRule({gradePk: this.dataForm.gradePk, price: val}).then(res => {
          // if (res.data.detailPo.type == 0) {
          //   this.dataForm.donationMoney = this.dataForm.rechargeMoney * (res.data.detailPo.giveCount/100)
          // } else {
          //   this.dataForm.donationMoney = res.data.detailPo.giveCount
          // }
          // this.dataForm.couponPos = res.data.couponPos
          // this.dataForm.giftPos = res.data.giftPos
      //  })
      },
      // handleChangeDonation (val) {
      //   this.dataForm.totalMoney = this.dataForm.rechargeMoney + val
      // },
      handleBlur () {
        // if (this.dataForm.rechargeMoney == undefined) {
        //   this.dataForm.rechargeMoney = 0
        // }
        // if (this.dataForm.donationMoney == undefined) {
        //   this.dataForm.donationMoney = 0
        // }
        // if (this.dataForm.totalMoney == undefined) {
        //   this.dataForm.totalMoney= 0
        // }
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

