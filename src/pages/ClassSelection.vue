<template>
  <section class="class-container">
      
      <div class="box">
        <el-button class="backBtn" @click="goBack">返回</el-button>
        <h2 class="box-title">当前选择分店：
            <span class="sub-title">{{activeCompany.companyName}}</span>
        </h2>
        <div class="box-list clearfix" v-for="(company,index) in companyShift" :key="index">
            <h3 class="fl">{{company.cityName}}</h3>
            <div class="fl company-list" v-for="(com,index) in company.arr" :key="index">
                <span @click="selectCompany(com)"  class="companySpan" v-bind:class="{ activeCompany: com.companyPk == activeCompany.companyPk }">{{com.companyName}}</span>
            </div>
        </div>
        <div class="box-select clearfix">
            <h3  class="fl">班次选择：</h3>
            <div class="class-list fl">
                <span v-if="activeCompany.companyPk == ''">请先选择店面</span>
                <span v-if="shiftList.length == 0 && activeCompany.companyPk != ''" style="text-decoration: underline;" @click="toHome">暂未设置班次，进入系统</span>
                <span @click="toHome(shift)" v-for="(shift,index) of shiftList" :key="index">{{shift.shiftName}}（{{shift.beginTime}} - {{shift.endTime}}）</span>
            </div>
        </div>
      </div>
  </section>
</template>

<script>
import { getCompanyShift, selectCompanyShift, getUserInfo } from "@/api/login";
import { logout } from '@/api/upmsApi'
import Cookies from 'js-cookie'
import store from "@/store";
import Moment from "moment";
export default {
  created() {
    // this.selectShift();
    this.getCompanyShiftList();
  },
  data() {
    return {
      shiftList: [],
      companyShift: [],
      activeCompany: "",
      activeShift: ""
    };
  },
  mounted(){
    this.clearLocalInfo();
  },
  methods: {
    //清除用户缓存
    clearLocalInfo(){
      Cookies.set('select_company_pk','')
      Cookies.set('select_shift_pk','')
      localStorage.setItem('current_logon_company','');
      localStorage.setItem('pms_userinfo', '')
    },
    goBack() {
      // store
      //   .dispatch("LogOut")
      //   .then(res => {
      //     // 拉取user_info
      //     this.$router.push("/login");
      //      window.localStorage.setItem('current_logon_company','');
      //   })
      //   .catch(() => {
      //     store.dispatch("FedLogOut").then(() => {
      //       this.$router.push("/login");
      //       window.localStorage.setItem('current_logon_company','');            
      //     });
      //   });
      logout().then(res=>{}).finally(()=>{
        this.clearLocalInfo();
        localStorage.setItem('token','');
        this.$router.push("/login");
      })
    },
    //设置公司主键和班次到cookies跳转首页
    toHome(shift) {
      getUserInfo().then(res => {
        // let userInfo = res.data;
        // getUpmsUserInfo().then(res2=>{
        //   let upmsUserInfo = res2.data
        //   let temp = {
        //     userName:userInfo.userName,
        //     userPk:userInfo.userPk,
        //     companyPk:userInfo.companyPk,
        //     upmsUserName:upmsUserInfo.upmsUserName,//权限用户登录账号
        //     permissionValues:upmsUserInfo.permissionValues
        //   }
          
        // })
        // console.log(res.data)
        this.activeShift = shift.shiftPk;
        Cookies.set('select_company_pk',this.activeCompany.companyPk)
        Cookies.set('select_shift_pk',this.activeShift)
        localStorage.setItem('current_logon_company',JSON.stringify(this.activeCompany));
        localStorage.setItem('pms_userinfo', JSON.stringify(res.data))
        // this.$router.push({ path: this.getRPath("/",0) });
        this.$router.push('/')
      })

      // var params = {
      //   companyPk: this.activeCompany.companyPk,
      //   shiftPk: this.activeShift
      // };
      // selectCompanyShift(params).then(res => {
      //   if (res.code == 1) {
      //     window.localStorage.setItem('current_logon_company',JSON.stringify(this.activeCompany));
      //     this.$router.push({ path: "/atrialCenter" });
      //   }
      // });
    },
    getCompanyShiftList() {
      this.companyShift = [];
      getCompanyShift().then(res => {
        if (res.code == 1) {
          for (var i = 0; i < res.data.length; i++) {
            var obj = this.deep_in_array(res.data[i].cityName, this.companyShift);
            if (obj.flag) {
              var item = {};
              item.cityName = obj.cityName;
              item.arr = [];
              this.companyShift.push(item);
            }
          }
          for(var i = 0; i<this.companyShift.length; i++) {
            for(var j = 0; j < res.data.length; j++) {
              if(this.companyShift[i].cityName == res.data[j].cityName) {
                this.companyShift[i].arr.push(res.data[j])  
              }
            }
          }
          var spm = window.localStorage.getItem('current_logon_company');
          // console.log(spm)
          if(spm == '' || spm==null || spm=='undefiend') {
            if(this.companyShift.length > 0) {
                this.activeCompany = this.companyShift[0].arr[0];
                window.localStorage.setItem('current_logon_company',JSON.stringify(this.activeCompany));
                this.shiftList = this.activeCompany.shiftPos;
            }
          } else {
            this.activeCompany = JSON.parse(spm);
            this.shiftList = this.activeCompany.shiftPos;
          }
          
        }
      });
    },
    deep_in_array(value, array) {
      var arr_obj = { flag: true, cityName: value };
      if (array.length == 0) {
        arr_obj.cityName = value;
        arr_obj.flag = true;
        return arr_obj;
      }
      array.forEach(element => {
        if (value == element.cityName) {
          arr_obj.cityName = '';
          arr_obj.flag = false;
        } 
      });
      return arr_obj;
    },
    selectCompany(company) {
      this.shiftList = company.shiftPos;
      this.activeCompany = company;
    }
  }
};
</script>

<style scoped>
.companySpan{
  display: inline-block;

}
.activeCompany {
  background: #f60;
  color: #fff !important;
}
.backBtn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0;
  background: #f60;
  color: #fff;
}
.class-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.class-container .box {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 1000px;
  margin: 0 0 0 -500px;
  border: 1px #d4d4d4 solid;
  box-shadow: 0 0 1px #d4edf4;
  background: #fff;
}
h3,
p {
  margin: 0;
}
.box-title {
  background: #f3f3f3 repeat-x;
  margin: 0;
  padding: 15px 0 15px 10px;
}
.box-title .sub-title {
  color: #f60;
}
.box-list {
  padding: 15px 10px;
}
.box-select {
  padding-left: 10px;
  line-height: 40px;
  color: #fff;
  background: rgba(255, 102, 0, 1);
}
.company-list {
  margin-left: 15px;
}
.company-list span {
  cursor: pointer;
  margin-bottom: 5px;
  color: #f60;
  padding: 3px 6px;
  border-radius: 3px;
  font-weight: 600;
}
.class-list span {
  cursor: pointer;
  padding: 0 15px;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  content: ".";
}
.fl {
  float: left;
  display: block;
}
.fr {
  float: right;
  display: block;
}
</style>
