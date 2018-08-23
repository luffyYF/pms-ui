<template>
  <div class="content-body">
    <span class="title-span">添加操作员</span>
    <el-button @click="refreshSelect" type="primary" icon="el-icon-refresh" size="mini">清除/刷新</el-button>
    <hr>
    <el-form ref="form" :inline="true" :model="addOperaterObj" size="mini" label-width="80px">
      <el-form-item label="员工姓名" v-if="showModifyBtn">
        <el-input v-model="addOperaterObj.tempName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="选择员工" v-if="!showModifyBtn">
        <el-select clearable filterable :filter-method="operSelectFilter" :autocomplete="'off'" v-model="addOperaterObj.userPk" placeholder="请选择" :disabled="showModifyBtn" @change="empSelectChange">
          <el-option v-for="item in userList" :key="item.value" :label="item.userName" :value="item.userPk">
            <span style="float: left">{{ item.userName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userPhone }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-select v-model="addOperaterObj.upmsRoleIds" multiple>
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登录帐号">
        <el-input v-model="addOperaterObj.userAccount" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input type="password" v-model="addOperaterObj.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="addOperaterObj.userRePwd" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary" v-if="!showModifyBtn && powerJudge('401401')" @click="saveAddOperator">添加操作员</el-button>
        <el-button type="primary" v-if="showModifyBtn" @click="submitModify">修改</el-button>
        <el-button type="primary" v-if="showModifyBtn" @click="cancelModify">取消修改</el-button>
        <span style="color:red" v-if="showModifyBtn">登录密码不填，使用原密码</span>
      </el-form-item>
      <p style="margin:0 0 10px;padding:0 11px;color:red;">*注：密码请使用字母、数字和符号两种以上的组合，6-15个字符。</p>
    </el-form>
    <hr>
    <el-form :inline="true" size="mini" :model="selectUserForm" class="demo-form-inline">
      <el-form-item label="操作员列表">
        <el-select v-model="selectUserForm.locked" size="mini" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="有效" value="Y"></el-option>
          <el-option label="无效" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="selectUserForm.userName" placeholder="请输入员工姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录帐号">
        <el-input v-model="selectUserForm.userAccount" placeholder="登录帐号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectOperator">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="operaterList" border v-loading="loading" style="width: 100%">
      <el-table-column prop="userName" align="center" label="员工姓名">
      </el-table-column>
      <el-table-column prop="roleNames" align="center" label="角色">
      </el-table-column>
      <el-table-column prop="upmsUserAccount" align="center" label="登录帐号">
      </el-table-column>
      <!-- <el-table-column
        prop="name"
        label="微信扫码登录">
      </el-table-column> -->
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="changeStatus(scope.row)" type="text" size="small">{{scope.row.locked=='1'?'正常':'锁定'}}</el-button>
          <el-button type="text" size="small" @click="modifyOpetator(scope.row)" v-if="powerJudge('401405')">修改</el-button>
          <el-button @click="resetPassword(scope.row)" type="text" size="small" v-if="powerJudge('401406')">密码重置</el-button>
          <!-- <el-button @click="dialogVisible3 = true" type="text" size="small">微信绑定</el-button> -->
          <el-button @click="deleteOpetator(scope.row)" type="text" size="small" v-if="powerJudge('401403')">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="AddOperConfirmDialog"
      width="500px"
      :close-on-click-modal="false">
      <span>该账号已存在，将会绑定到已存在的账号上，请确认以下操作</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="useOld" :loading="loading" size="mini">使用原有的角色和密码</el-button>
        <el-button type="primary" @click="useCover" :loading="loading" size="mini">覆盖原有的角色和密码</el-button>
        <el-button @click="AddOperConfirmDialog = false"  size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  pmsUserList,
  pmsUserUpdate,
  pmsUserDelOperator,
  pmsUserListOperator,
  pmsUserResetOperPwd,
  pmsUserResetPwd,
  pmsOperListSelect,
  addOperater,
} from "../../api/operators/pmsUserController";
// import { listRole } from "../../api/operators/pmsRoleController";
import { powerJudge } from "@/utils/permissionsOperation.js";
import {listRoles,checkOnlyUser,updateOperater,updateStatus,resetPwd} from '@/api/upmsApi'

export default {
  components: {},
  created() {
    this.listOperater();
    this.refreshSelect();
  },
  data() {
    return {
      operaterList: [],
      userList: [],
      roleList: [],
      loading: false,
      selectUserForm: {
        locked: "",
        userName: "",
        userAccount: ""
      },
      addOperaterObj: {
        tempName: null,
        userPk: null,
        upmsRoleIds: [],
        upmsUserId:null,
        userAccount: null,
        password: null,
        userRePwd: null,
        type:null,
      },
      tempUpmsUserId:null,
      showModifyBtn: false,
      AddOperConfirmDialog:false,
      loading:false,
    };
  },
  methods: {
    clearAddOperaterObj(){
      this.showModifyBtn = false;

      this.addOperaterObj.tempName=null;
      this.addOperaterObj.userPk = null;
      this.addOperaterObj.upmsRoleIds=[];
      this.addOperaterObj.upmsUserId=null;
      this.addOperaterObj.userAccount=null;
      this.addOperaterObj.password=null;
      this.addOperaterObj.userRePwd=null;
      this.addOperaterObj.type=null;
    },
    listOperater() {
      // this.listSelectUser();
      this.loading = true;
      var param = {};
      if (arguments[0] != "query") {
        this.selectUserForm.locked = "";
        this.selectUserForm.userName = "";
        this.selectUserForm.userAccount = "";
      }
      param = this.selectUserForm;
      pmsUserListOperator(param)
        .then(res => {
          this.loading = false;
          if (res.code == 1) {
            this.operaterList = res.data;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    listSelectUser(name) {
      this.userList = [];
      pmsOperListSelect({name:name}).then(res=>{
        this.userList = res.data;
      })
    },
    listRoles() {
      listRoles().then(res => {
        this.roleList = res.data;
      });
    },
    refreshSelect(){
      this.listSelectUser();
      this.listRoles();
      this.clearAddOperaterObj();
    },
    //添加操作员
    saveAddOperator() {
      if (this.verification()) {
        checkOnlyUser(this.addOperaterObj.userAccount).then(res=>{
          if(res.data.status=='1'){
            this.tempUpmsUserId=res.data.userId;
            this.AddOperConfirmDialog = true;
          }else{
            //新增操作员
            this.addOperaterObj.upmsUserId = null;
            this.addOperaterObj.type=0
            this.addOper(this.addOperaterObj);
          }
        })

        // pmsUserUpdate(this.addOperaterObj).then(res => {
        //   if (res.code == 1) {
        //     this.$message.success("添加操作员成功");
        //     this.listOperater();
        //     this.addOperaterObj = {
        //       userPk: "",
        //       rolePk: "",
        //       userAccount: "",
        //       password: "",
        //       userRePwd: ""
        //     };
        //   }
        // });
      }
    },
    useOld(){
      // 使用原有的角色和密码
      this.addOperaterObj.upmsUserId = this.tempUpmsUserId;
      this.addOperaterObj.type=1
      this.addOper(this.addOperaterObj);
    },
    useCover(){
      this.addOperaterObj.upmsUserId = this.tempUpmsUserId;
      this.addOperaterObj.type=2
      this.addOper(this.addOperaterObj);
    },
    addOper(data){
      addOperater(data).then(res=>{
        this.listOperater();
        // this.refreshSelect();
        this.listSelectUser();
        // this.addOperaterObj.upmsRoleIds=[];
        // this.addOperaterObj={};
        this.clearAddOperaterObj();
        this.$message.success("添加操作员成功");
        this.AddOperConfirmDialog = false;
      })
    },
    verification() {
      var content = "";
      if (this.addOperaterObj.userPk==null || this.addOperaterObj.userPk == "") {
        content = "请选择员工";
      } else if (this.addOperaterObj.password==null || this.addOperaterObj.password == "") {
        content = "请填写登录密码";
      } else if (this.addOperaterObj.password.length < 6) {
        content = "密码不能少于6位";
      } else if (this.addOperaterObj.password.length > 15) {
        content = "密码不能超过15位";
      } else if (this.addOperaterObj.userRePwd==null || this.addOperaterObj.userRePwd == "") {
        content = "请确认密码";
      } else if (this.addOperaterObj.password != this.addOperaterObj.userRePwd) {
        content = "两次密码不一致";
      }
      if (content != "") {
        this.$message.warning(content);
        return false;
      }
      return true;
    },
    selectOperator() {
      this.listOperater("query");
    },
    changeStatus(rows) {
      this.$confirm(
        rows.locked == "1" ? "确认锁定？" : "确认解锁？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
          rows.locked == "1" ? (rows.locked = "0") : (rows.locked = "1");
          let data={
            upmsUserId:rows.upmsUserId,
            locked:rows.locked
          }
          updateStatus(data).then(res => {
            if (res.code == 1) {
              this.$message({ type: "success", message: rows.locked == "1" ? "已解锁" : "已锁定" });
              // this.listOperater();
            } else {
              this.$message.error(res.msg);
              rows.locked == "1" ? (rows.locked = "0") : (rows.locked = "1");
            }
          });
        });
    },
    modifyOpetator(row) {
      this.showModifyBtn = true;
      this.addOperaterObj.tempName = row.userName;
      this.addOperaterObj.userPk=row.userPk
      this.addOperaterObj.upmsRoleIds=row.roleIds?row.roleIds.split(','):[]
      this.addOperaterObj.upmsUserId = row.upmsUserId
      this.addOperaterObj.userAccount = row.upmsUserAccount
      this.addOperaterObj.password = null
      this.addOperaterObj.userRePwd = null
      this.addOperaterObj.type=null
    },
    submitModify() {
      if(!this.addOperaterObj.userAccount){
        this.$message.warning("登录账号不能为空");
        return;
      }
      if(this.addOperaterObj.password){
        if(this.addOperaterObj.password.length < 6){
          this.$message.warning("密码不能少于6位");
          return;
        }
        if(this.addOperaterObj.password != this.addOperaterObj.userRePwd){
          this.$message.warning("两次密码不一致");
          return;
        }
      }
      updateOperater(this.addOperaterObj).then(res=>{
        this.showModifyBtn = false;
        this.clearAddOperaterObj();
        this.listOperater();
        this.$message.success("修改操作员成功");

      })
      // pmsUserUpdate(this.addOperaterObj).then(res => {
      //   if (res.code == 1) {
      //     this.showModifyBtn = false;
      //     this.$message.success("修改操作员成功");
      //     this.listOperater();
      //     this.addOperaterObj = {
      //       userPk: "",
      //       rolePk: "",
      //       userAccount: "",
      //       password: "",
      //       userRePwd: ""
      //     };
      //   }
      // });
    },
    cancelModify() {
      this.showModifyBtn = false;
      this.clearAddOperaterObj();
    },
    resetPassword(row) {
      this.$confirm("重置密码？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // pmsUserResetOperPwd({ userPk: row.userPk }).then(res => {
          //   if (res.code == 1) {
          //     this.$message.success("密码已重置，新密码为原手机号码！");
          //     this.listOperater();
          //   } else {
          //     this.$message.error(res.msg);
          //   }
          // });
          resetPwd(row.upmsUserId).then(res=>{
            this.$message.success("密码已重置，新密码为123456！");
          })
        });
    },
    deleteOpetator(row) {
      this.$confirm("确认移除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pmsUserDelOperator({ userPk: row.userPk }).then(res => {
          if (res.code == 1) {
            this.$message.success("移除成功！");
            this.listOperater();
            this.listSelectUser();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    empSelectChange(value) {
      console.log(value)
      this.userList.forEach(user => {
        if (user.userPk == value) {
          this.addOperaterObj.userAccount = user.userPhone;
        }
      });
    },
    operSelectFilter(input) {
      this.listSelectUser(input);
    },
    
    powerJudge(id) {
      return powerJudge(id);
    }
  }
};
</script>

<style scoped>
.content-body {
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
  height: 100%;
  overflow-y: auto;
}
.title-span {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 10px 0;
  display: inline-block;
}
</style>


