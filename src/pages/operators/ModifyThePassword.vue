<template>
  <div class="content-body">
    <div class="modify-box">
      <span class="title-span">修改密码</span>
      <hr>
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="80px">
        <!-- input -->
          <el-form-item label="帐号">
            <el-input v-model="form.upmsUserName" disabled></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="form.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="form.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmNewPwd">
            <el-input type="password" v-model="form.confirmNewPwd"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:10px;">
            <el-button type="primary" @click="submitModify">修改密码</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { pmsUserResetPwd } from '../../api/operators/pmsUserController'
import {modifyPwd} from '@/api/upmsApi'
  export default {
    // created(){
    //   this.loginObj = JSON.parse(window.localStorage.getItem('LOGIN_INFO'));
    //   this.form.upmsUserName = this.loginObj.loginName; 
    // },
    data() {
      return {
        loginObj:{},
        form: {
          upmsUserName:JSON.parse(window.localStorage.getItem('pms_userinfo')).upmsUserName,
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
      };
    },
    methods: {
      submitModify(){
        if(true) {//this.verification()
          console.log(this.form)
          modifyPwd(this.form).then(res=>{
            this.$message.success('修改密码成功');
            this.form.newPwd = '';
            this.form.confirmNewPwd = '';
            this.form.oldPwd = '';
          })
          // pmsUserResetPwd(this.form).then(res => {
          //   if(res.code == 1) {
          //     this.$message.success('修改密码成功');
          //     this.form.newPwd = '';
          //     this.form.confirmNewPwd = '';
          //     this.oldPwd = '';
          //   } else {
          //     this.$message.error(res.msg)
          //   }
          // });
        }
        
      },
      verification(){
        var content = '';
        if (this.form.oldPwd == '') {
          content = '旧密码不能为空';
        } else if (this.form.newPwd == '') {
          content = '新密码不能为空'
        } else if (this.form.newPwd.length < 6 || this.form.newPwd.length > 15) {
          content = '新密码不符合规则'
        } else if (this.form.confirmNewPwd == '') {
          content = '请确认密码'
        } else if (this.form.newPwd != this.form.confirmNewPwd) {
          content = '两次密码不一致'
        }
        if(content != '') {
          this.$message.error(content);
          return false;
        }
        return true;
      }
    }
  };
</script>

<style scoped>
.content-body{
  overflow-y: auto;
}
.modify-box {
  background-color: #f7f7f7;
  width: 400px;
  padding: 0 20px;
  height: 300px;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px;
    display: inline-block;
}
</style>