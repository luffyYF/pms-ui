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
				<el-form-item label="原密码:" size="mini">
          <el-input type="password" v-model="dataForm.oldPwd"></el-input>
          <el-checkbox size="mini" label="忘记密码" true-label="Y" false-label="N"></el-checkbox>
        </el-form-item>
				<el-form-item label="新密码:" size="mini">
           <el-input type="password" v-model="dataForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" size="mini">
           <el-input type="password" v-model="dataForm.confirmNewPwd"></el-input>
        </el-form-item>
        <el-form-item>
          	<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				    <el-button type="primary" size="mini" @click="submitModify">确认</el-button>
        </el-form-item>
			</el-form>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="submitModify">确认</el-button>
			</span> -->
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
          oldPwd:'',
          newPwd:'',
          confirmNewPwd:''
        },
         rules:{
          oldPwd:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPwd:[
            { required: true, message: '请输入新密码', trigger: 'blur,change' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur,change' }
          ],
          confirmNewPwd:[
            { required: true, message: '请确认密码', trigger: 'blur,change' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur,change' }
          ]
        }
      }
    },
    methods: {
       submitModify(){
        if(true) {
          console.log(this.dataForm)
          updateMemberPassword(this.dataForm).then(res=>{
            this.$message.success('修改密码成功');
            this.dataForm.newPwd = '';
            this.dataForm.confirmNewPwd = '';
            this.dataForm.oldPwd = '';
          })
        }
      },
      verification(){
        var content = '';
        if (this.dataForm.oldPwd == '') {
          content = '旧密码不能为空';
        } else if (this.dataForm.newPwd == '') {
          content = '新密码不能为空'
        } else if (this.dataForm.newPwd.length < 6 || this.dataForm.newPwd.length > 15) {
          content = '新密码不符合规则'
        } else if (this.dataForm.confirmNewPwd == '') {
          content = '请确认密码'
        } else if (this.dataForm.newPwd != this.dataForm.confirmNewPwd) {
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
        console.log(data)
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

