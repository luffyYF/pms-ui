// 会员充值编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="会员换卡" :visible.sync="dialogVisible" width="600px"
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
				<el-form-item label="新卡号" size="mini">
          <el-input v-model="dataForm.cardNumber" class="input-width"></el-input>
        </el-form-item>
				<el-form-item label="备注" size="mini">
          <el-input v-model="dataForm.remark" class="input-width" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item> 
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveData" :loading="loading">保存</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>  
import {updateMemberCard } from '@/api/customerRelation/pmsMemberController'

  export default {
    data () {
      return {
        dialogVisible: false,
				loading: false,
        dataForm: {
          memPk: '',
          memName: '',
          balance: 0,
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
          memName: data.memName,
          balance: data.availableBalance.toFixed(2),
          cardNumber: data.cardNumber, 
          remark: '',
        }
        this.dialogVisible = true
      },
      saveData(){
        this.loading = true
        updateMemberCard(this.dataForm).then(result => {
          if(result.code==1){
          this.$message({message:'换卡成功！',type:'success'});
          this.dialogVisible=false;
        }else{
          this.$message.sub_msg;
          this.dialogVisible=true;
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

