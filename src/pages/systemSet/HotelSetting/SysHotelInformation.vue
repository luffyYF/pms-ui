<template>
    <div class="bg-reserve">
      <el-form ref="form" :label-position="'right'" :rules="rules" :inline="true" :model="companyObj" size="mini" label-width="110px">
        <el-form-item label="酒店编码：">
          <el-input v-model="companyObj.companyCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="营业状态">
          <el-input v-model="companyObj.businessStatusDesc" disabled></el-input>
        </el-form-item>
        <el-form-item label="酒店名称：" prop="companyName">
          <el-input v-model="companyObj.companyName"></el-input>
        </el-form-item>
        <el-form-item label="酒店电话：" prop="telPhone">
          <el-input v-model="companyObj.telPhone"></el-input>
        </el-form-item>
        <el-form-item label="酒店传真：">
          <el-input v-model="companyObj.fax"></el-input>
        </el-form-item>
        <el-form-item label="酒店邮编：">
          <el-input v-model="companyObj.post"></el-input>
        </el-form-item>
        <el-form-item label="酒店邮箱：" prop="email">
          <el-input v-model="companyObj.email"></el-input>
        </el-form-item>
        <el-form-item label="酒店网址：">
          <el-input v-model="companyObj.url"></el-input>
        </el-form-item>
        <el-form-item label="酒店城市：" prop="cityName">
          <el-input v-model="companyObj.cityName"></el-input>
        </el-form-item>
        <el-form-item label="RFL酒店标识：" prop="rflCoid">
          <el-input v-model="companyObj.rflCoid" placeholder="请输入7位数字的酒店标识"></el-input>
        </el-form-item>
        <el-form-item label="绑定应用：">
          <el-select v-model="companyObj.appid" placeholder="请选择要绑定的应用">
            <el-option v-for="item in miniapp" :key="item.applyPk" :label="item.name" :value="item.appid"></el-option>
          </el-select>
        </el-form-item>
		    <el-form-item label="提供发票：">
          <el-checkbox label="普通发票（电子）" v-model="companyObj.usingInvoiceNormal" :true-label="1" :false-label="0"></el-checkbox>
          <el-checkbox label="专用发票（纸质）" v-model="companyObj.usingInvoiceSpecial" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="logo：">
          <upload-avatar :avatar.sync="companyObj.companyLogo"></upload-avatar>
        </el-form-item>
        <el-form-item label="门店图：" label-width="192px">
          <upload-avatar :avatar.sync="companyObj.companyImg"></upload-avatar>
        </el-form-item>
        <el-form-item label="酒店介绍：">
          <el-input type="textarea"
            autosizea
            placeholder="请输入内容"
            :autosize="{ minRows: 6, maxRows: 10}"
            v-model="companyObj.companyIntroduce">
          </el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveInfo">保存酒店信息</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import {
  getCompanyInfot,
  updateCompany,
  getMiniApp
} from "@/api/systemSet/pmsCompanyController";
import UploadAvatar from "@/components/UploadImage/UploadAvatar2";

export default {
  components: {UploadAvatar},
  data() {
    return {
      companyObj: {},
      rules: {
        companyName: [{
            required: true,
            message: "酒店名称不能为空",
            trigger: "blur,change"
          }
        ],
        telPhone: [
          {
            required: true,
            message: "酒店电话不能为空",
            trigger: "blur,change"
          }
        ],
        cityName: [
          {
            required: true,
            message: "酒店所在城市不能为空",
            trigger: "blur,change"
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ]
      },
      miniapp: [],
      dialogVisible: false,
    };
  },
  methods: {
    init(){
      this.findMiniApp()
      this.getCompany();
    },
    getCompany() {
      getCompanyInfot().then(res => {
        if (res.code == 1) {
          this.companyObj = res.data;
          if(this.companyObj.businessStatus==1){
            this.companyObj.businessStatusDesc = '营业中'
          }else if(this.companyObj.businessStatus==0){
            this.companyObj.businessStatusDesc = '已停业'
          }
        }
      });
    },
    saveInfo() {
      if (this.verification()) {
        updateCompany(this.companyObj).then(res => {
          if (res.code == 1) {
            this.$message.success("成功修改酒店信息，退出重新登入系统生效！");
            this.getCompany();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    verification() {
      var content = "";
      if (this.companyObj.companyName == "") {
        content = "酒店名称不能为空";
      } else if (this.companyObj.telPhone == "") {
        content = "酒店电话不能为空";
      } else if (this.companyObj.cityName == "") {
        content = "酒店所在城市不能为空";
      } else if(this.companyObj.rflCoid){
        if(isNaN(this.companyObj.rflCoid)){
          content = "只能输入数字";
        }
        if(this.companyObj.rflCoid.length>10){
          content = "不能超过10位";
        }
      }

      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
    },
    findMiniApp () {
      getMiniApp({status: 1}).then(res => {
        this.miniapp = res.data
      })
    },
  },
  mounted() {
    this.init()
  },
};
</script>
<style scoped>
.bg-reserve {
  width: 800px;
  background-color: #f7f7f7;
  position: relative;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
  padding-left: 5px;
  padding-bottom: 10px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 9px;
  background: #f7f7f7;
}
.el-select,
.el-input {
  width: 204px;
}
.el-textarea {
  width: 521px;
}
.el-textarea_inner {
  padding: 5px;
}
.member-level {
  width: 95px;
}
.card-no {
  width: 104px;
}
.address {
  width: 501px;
}
</style>