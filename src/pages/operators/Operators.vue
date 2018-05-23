<template>
  <div class="content-body">
    <span class="title-span">添加操作员</span>
    <el-button @click="selsectOperaterList" type="primary"  icon="el-icon-refresh" size="mini">刷新</el-button>
    <hr>
    <el-form ref="form" :inline="true" :model="addOperaterObj" size="mini" label-width="80px">
      <el-form-item label="员工姓名" v-if="showModifyBtn">
        <el-input v-model="addOperaterObj.tempName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名" v-if="!showModifyBtn">
        <el-select v-model="addOperaterObj.userPk" placeholder="请选择" :disabled="showModifyBtn" @change="empSelectChange">
          <el-option v-for="item in userList" :key="item.value" :label="item.userName" :value="item.userPk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-select v-model="addOperaterObj.rolePk">
          <el-option v-for="item in roleList" :key="item.value" :label="item.roleName" :value="item.rolePk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录帐号">
        <el-input v-model="addOperaterObj.userPhone" clearable :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input type="password" v-model="addOperaterObj.userPwd" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="addOperaterObj.userRePwd" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" v-if="!showModifyBtn && powerJudge('401401')" @click="saveAddOperator">添加操作员</el-button>
        <el-button type="primary" v-if="showModifyBtn" @click="submitModify">修改</el-button>
        <el-button type="primary" v-if="showModifyBtn" @click="cancelModify">取消修改</el-button>
      </el-form-item>
      <p style="margin:0 0 10px;padding:0 20px;color:red;">密码请使用字母、数字和符号两种以上的组合，6-15个字符。</p>
    </el-form>
    <hr>
    <el-form :inline="true" size="mini" :model="selectUserForm" class="demo-form-inline">
      <el-form-item label="操作员列表">
        <el-select v-model="selectUserForm.loginFlag" size="mini" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="有效" value="Y"></el-option>
          <el-option label="无效" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="selectUserForm.userName" placeholder="请输入员工姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="操作员">
        <el-input v-model="selectUserForm.userAccount" placeholder="请输入操作员" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectOperator">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="operaterList"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="userName"
        align="center"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="roleName"
        align="center"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        align="center"
        label="操作员">
      </el-table-column>
      <!-- <el-table-column
        prop="name"
        label="微信扫码登录">
      </el-table-column> -->
      <el-table-column
        fixed="right"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="changeStatus(scope.row)" type="text" size="small">{{scope.row.loginFlag=='Y'?'停用':'启用'}}</el-button>
          <el-button type="text" size="small" @click="modifyOpetator(scope.row)" v-if="powerJudge('401405')">修改</el-button>
          <el-button @click="resetPassword(scope.row)" type="text" size="small" v-if="powerJudge('401406')">密码重置</el-button>
          <!-- <el-button @click="dialogVisible3 = true" type="text" size="small">微信绑定</el-button> -->
          <el-button @click="deleteOpetator(scope.row)" type="text" size="small" v-if="powerJudge('401403')">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pmsUserList, pmsUserUpdate, pmsUserDelOperator, pmsUserListOperator, pmsUserResetOperPwd, pmsUserResetPwd } from '../../api/operators/pmsUserController'
import { listRole } from '../../api/operators/pmsRoleController'
import {powerJudge} from '@/utils/permissionsOperation.js'

  export default {
    components: {},
    created(){
      this.selsectOperaterList();
      // this.selectUser();
      this.selectRole();
    },
    data() {
      return {
        operaterList:[],
        userList:[],
        roleList:[],
        loading:false,
        selectUserForm:{
          loginFlag:'',
          userName:'',
          userAccount:''
        },
        addOperaterObj:{
          tempName:'',
          userPk:'',
          rolePk:'',
          userAccount:'',
          userPwd:'',
          userRePwd:'',
        },
        showModifyBtn:false,
      };
    },
    methods: {
      selsectOperaterList(){
        this.selectUser();
        this.loading = true;
        var param = {};
        if(arguments[0] != 'query') {
          this.selectUserForm.loginFlag = '';
          this.selectUserForm.userName = '';
          this.selectUserForm.userAccount = '';
        }
        param = this.selectUserForm;
        pmsUserListOperator(param).then(res => {
          this.loading = false;
          if(res.code == 1) {
            this.operaterList = res.data;
          }
        }).catch(()=>{
          this.loading = false;
        })
      },
      selectUser(){
        pmsUserList({userAccountFlag:'N'}).then(res => {
          if(res.code == 1) {
            this.userList = res.data;
          }
        })
      },
      selectRole(){
        listRole().then(res => {
          if(res.code == 1) {
            this.roleList = res.data;
          }
        });
      },
      //添加操作员
      saveAddOperator(){
        if(this.verification()) {
          pmsUserUpdate(this.addOperaterObj).then(res => {
            if(res.code == 1) {
              this.$message.success('添加操作员成功');
              this.selsectOperaterList();
              this.addOperaterObj = {
                userPk:'',
                rolePk:'',
                userAccount:'',
                userPwd:'',
                userRePwd:'',
              }
            }
          })
        }

      },
      verification(){
        var content = '';
        if(this.addOperaterObj.userPk == "") {
          content = '请选择员工';
        } else if (this.addOperaterObj.userPwd == '') {
          content = '请填写登录密码';
        } else if (this.addOperaterObj.userPwd.length < 6) {
          content = '密码不能少于6位';
        } else if (this.addOperaterObj.userPwd.length > 15) {
          content = '密码不能超过15位';
        } else if (this.addOperaterObj.userRePwd == '') {
          content = '请确认密码';
        } else if (this.addOperaterObj.userPwd != this.addOperaterObj.userRePwd) {
          content = '两次密码不一致';
        }
        if(content != '') {
          this.$message.error(content);
          return false;
        }
        return true;
      },
      selectOperator(){
        this.selsectOperaterList('query');
      },
      changeStatus(rows){
        this.$confirm(rows.loginFlag == 'Y'?'确认停用？':'确认启用？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.loginFlag == 'Y'?rows.loginFlag = "N":rows.loginFlag = "Y";
          pmsUserUpdate(rows).then(res => {
            if(res.code == 1) {
              this.$message({
                type: 'success',
                message: rows.loginFlag=="Y"?'已启用':'已停用'
              });
              this.selsectOperaterList();
            } else {
              this.$message.error(res.msg);
              rows.loginFlag == 'Y'?rows.loginFlag = "N":rows.loginFlag = "Y";
            }
          });    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      modifyOpetator(row){
        this.showModifyBtn = true;
        this.addOperaterObj = row;
        this.addOperaterObj.tempName = row.userName
      },
      submitModify(){
        pmsUserUpdate(this.addOperaterObj).then(res => {
          if(res.code == 1) {
            this.showModifyBtn = false;
            this.$message.success('修改操作员成功');
            this.selsectOperaterList();
            this.addOperaterObj = {
              userPk:'',
              rolePk:'',
              userAccount:'',
              userPwd:'',
              userRePwd:'',
            }
          }
        })
      },
      cancelModify(){
        this.showModifyBtn = false;
        this.$message.info('已取消修改');
        this.addOperaterObj = {
          userPk:'',
          rolePk:'',
          userAccount:'',
          userPwd:'',
          userRePwd:'',
        }
      },
      resetPassword(row){
        this.$confirm('重置密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pmsUserResetOperPwd({userPk:row.userPk}).then(res => {
            if(res.code == 1) {
              this.$message.success('密码已重置，新密码为原手机号码！');
              this.selsectOperaterList();
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      deleteOpetator(row){
        this.$confirm('确认移除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          pmsUserDelOperator({userPk:row.userPk}).then(res => {
            if(res.code == 1) {
              this.$message.success('移除成功！');
              this.selsectOperaterList();
            } else {
              this.$message.error(res.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      empSelectChange(value){
        this.userList.forEach(user=>{
          if(user.userPk==value){
            this.addOperaterObj.userAccount = user.userPhone
          }
        })
      },
      powerJudge(id){
        return powerJudge(id);
      }
      
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
  height: 100%;
  overflow-y: auto;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
}
</style>


