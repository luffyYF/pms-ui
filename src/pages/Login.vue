<template>
  <div class="login_background"> 
    <div class="login_houseimg">
      <div class="login_formBackground">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="right" label-width="0px"
                class="demo-ruleForm login-container">
          <h3 class="title">后台登录</h3>
          <el-form-item prop="userName">
            <el-input type="text" class="login_input_box" v-model="loginForm.userName" auto-complete="off" placeholder="请输入账号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="pwdType" class="login_input_box" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;margin-top: 10px;" @click.native.prevent="handleLogin" :loading="loading">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
      <p class="login_text">Copyright @ 2016 深圳市前海豪斯菲尔信息科技有限公司 ALL Rights Reserved <br>粤ICP备15099667号</p>      
  </div>
</template>

<script>
import "../../static/img/background.jpg";
// import {loginByUsername} from '@/api/login';
import {loginByUsername} from '@/api/upmsApi';
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        // userName: "super",
        // password: "123456"
        userName: "",
        password: "",
        systemId: '473891058107809792',//系统主键固定值
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, message: "账号不能小于5位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码不能小于6位", trigger: "blur" }
        ]
      },
      pwdType: "password",
      checked: true
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleReset() {
      this.$refs.loginForm.resetFields();
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          loginByUsername(this.loginForm).then(res=>{
            window.localStorage.setItem('token', res.token)
            this.$router.push({ path: "/classSelection" });
            this.loading = false;
          },error=>{
            this.loading = false;
          })
          // this.$store
          //   .dispatch("LoginByUsername", this.loginForm)
          //   .then(res => {
          //     console.log("-----------------");
          //     console.log(res);
          //     window.localStorage.setItem('token', res.data.token)
          //     this.$router.push({ path: "/classSelection" });
          //   })
          //   .finally(() => {
          //     this.loading = false;
          //   });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login_background {
  /*background: -webkit-linear-gradient(#ffbe41, #f9691d);*/ /* Safari 5.1 - 6.0 */
  /*background: -o-linear-gradient(#ffbe41,  #f9691d);*/ /* Opera 11.1 - 12.0 */
  /*background: -moz-linear-gradient(#ffbe41,  #f9691d);*/ /* Firefox 3.6 - 15 */
  /*background: linear-gradient(#ffbe41,  #f9691d);*/ /* 标准的语法（必须放在最后） */
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.login_houseimg {
  background: url(../../static/img/background.jpg) no-repeat center top;
  height: 545px;
  margin: 0 auto;
  padding-top: 170px;
  width: 100%;
}
.login_text {
  text-align: center;
  color: #666;
  padding-top: 2%;
  line-height: 22px;
  font-size: 12px;
}
.login_formBackground {
  background: url(../../static/img/back_top.png) no-repeat center top;
  height: 370px;
  margin: 0 auto;
  padding-top: 172px;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  border-radius: 0 0px 5px 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0px auto 0;
  width: 342px;
  padding: 33px 35px 25px 35px;
  background: #fff;
  -webkit-box-shadow: 2px 4px 11px rgba(214, 214, 214, 0.19);
}

.login-container .title {
  margin: 0px auto 20px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
  margin: 0px 0px 35px 0px;
}
.login_background .el-button--primary {
  color: #fff;
  background-color: #fd9126;
  border-color: #fd9126;
  border-radius: 36px;
}
.login_background .el-button--primary:focus,
.el-button--primary:hover {
  background: #ff8002;
  border-color: #ff8002;
  color: #fff;
}
.login_background .el-button--primary.is-active,
.el-button--primary:active {
  background: #ff8002;
  border-color: #ff8002;
  color: #fff;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  /*color: $dark_gray;*/
  cursor: pointer;
  user-select: none;
}
.login_input_box .el-input__inner {
  border: 1px solid #fff;
  border-bottom: 1px solid #dcdfe6;
  /* padding-left: 40px; */
  padding-bottom: 5px;
  border-radius: 0;
}
.el-form-item.is-success .login_input_box .el-input__inner {
  border-color: #fff;
  border-bottom-color: #e2e2e2;
  border-radius: 0;
}
.el-form-item.is-error .login_input_box .el-input__inner {
  border-color: #fff;
  border-bottom-color: #f56c6c;
}
.login_input_box .el-input__icon {
  font-size: 20px;
}
@media screen and (max-width: 1280px) {
  .login_houseimg {
    height: 450px;
    margin: 0 auto;
    padding-top: 2%;
  }
  .login_houseimg .el-form-item {
    margin-bottom: 10px;
  }
  .login_formBackground {
    background: url(../../static/img/back_top2.png) no-repeat center top;
    height: 385px;
    margin: 0 auto;
  }
  .login-container .title {
    margin: 0px auto 5px auto;
  }
  .login_text {
    padding-top: 1%;
  }
  .login-container {
    /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
    border-radius: 0 0px 5px 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0px auto 0;
    width: 260px;
    padding: 25px 25px 10px 25px;
    background: #fff;
    -webkit-box-shadow: 2px 4px 11px rgba(214, 214, 214, 0.19);
  }
}
/* 改变浏览器记住账号密码时默认输入框的背景颜色 */
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #606266 !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
</style>
