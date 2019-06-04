// 会员注销
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="会员卡注销" :visible.sync="dialogVisible" width="600px"
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
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="logoutClick" :loading="loading">确定</el-button>
		</span>
		</el-dialog>
  </section>
</template>

<script>  
import {updateMemberCard,delMember } from '@/api/customerRelation/pmsMemberController'

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
        }
        this.dialogVisible = true
      },
      logoutClick () {
        this.$confirm('确定要注销该会员卡?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delMember({memPk:this.dataForm.memPk}).then(res => {
              if(res.code == 1){
                  this.$message({ type: 'success', message: "注销成功！" })
                  this.dialogVisible=false;
              }else{
                 this.$message({ type: 'warning', message: "注销失败！" })
              }
          })
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

