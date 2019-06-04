// 会员充值编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="修改密码" :visible.sync="dialogVisible" width="600px"
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm" label-width="120px" :rules="rules">
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
				<el-form-item label="原密码:" size="mini" prop="originalPassword">
          <el-input type="password" v-model="dataForm.originalPassword" :disabled="dataForm.type=='Y'"></el-input>
          <el-checkbox size="mini" label="忘记密码" v-model="dataForm.type" true-label="Y" false-label="N"></el-checkbox>
        </el-form-item>
				<el-form-item label="新密码:" size="mini" prop="newPassword">
           <el-input type="password" v-model="dataForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" size="mini" prop="confirmNewPwd">
           <el-input type="password" v-model="dataForm.confirmNewPwd"></el-input>
        </el-form-item>
        <el-form-item>
          	<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				    <el-button type="primary" size="mini" @click="submitModify">确认</el-button>
        </el-form-item>
			</el-form>
		</el-dialog>
  </section>
</template>

<script>  
import {updateMemberPassword} from '@/api/customerRelation/pmsMemberController'

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
          isCallback:true,
          originalPassword:'',
          newPassword:'',
          confirmNewPwd:'',
          type:'N'
        },
      rules:{
          originalPassword:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword:[
            { required: true, message: '请输入新密码', trigger: 'blur,change' },
            //{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur,change' }
          ],
          confirmNewPwd:[
            { required: true, message: '请确认密码', trigger: 'blur,change' },
           // { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur,change' }
          ]
        }
      }
    },
    methods: {
       submitModify(){
        if(true) {
          updateMemberPassword(this.dataForm).then(res=>{
          if(res.code==1){
            this.$message({message:'修改密码成功！',type:'success'});
            this.dialogVisible=false;
          }else{
            this.$message.sub_msg;
            this.dialogVisible=true;
          }
          })
        }
      },
      verification(){
        var content = '';
        if (this.dataForm.originalPassword == '') {
          content = '旧密码不能为空';
        } else if (this.dataForm.newPassword == '') {
          content = '新密码不能为空'
        } else if (this.dataForm.newPassword.length < 6 || this.dataForm.newPassword.length > 15) {
          content = '新密码不符合规则'
        } else if (this.dataForm.confirmNewPwd == '') {
          content = '请确认密码'
        } else if (this.dataForm.newPassword != this.dataForm.confirmNewPwd) {
          content = '两次密码不一致'
        }
        if(content != '') {
          this.$message.error(content);
          return false;
        }
        return true;
      },
      showDialog (data,isCallback) {
        this.isCallback = isCallback
        this.dataForm = {
          memPk: data.memPk,
          memName: data.memName,
          balance: data.availableBalance.toFixed(2),
          cardNumber: data.cardNumber, 
        }
        this.dialogVisible = true
      },
      // saveData(){
      //   this.loading = true
      //   recharge(this.dataForm).then(result => {
      //     if(result.code == 1){
      //       this.$message({
      //         message: result.sub_msg,
      //         type: 'success'
      //       });
      //     }
      //     this.dialogVisible = false
      //     if(this.isCallback){
      //       this.$emit('callback')
      //     } 
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // },
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

