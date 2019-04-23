<template>
    <div class="bg-reserve">
      <el-form ref="form" :label-position="'right'" :rules="rules" :inline="true" :model="companyObj" size="mini" label-width="100px">
        <el-form-item label="酒店编码：">
          <el-input v-model="companyObj.companyCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="营业状态">
          <el-input v-model="companyObj.businessStatusDesc" disabled></el-input>
        </el-form-item>
        <el-form-item label="酒店名称：" prop="companyName">
          <el-input v-model="companyObj.companyName"></el-input>
        </el-form-item>
        <el-form-item label="酒店地址：" prop="companyAddress">
          <el-input v-model="companyObj.companyAddress"></el-input>
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
        <el-form-item label="RFL酒店标识" prop="rflCoid">
          <el-input v-model="companyObj.rflCoid" placeholder="请输入7位数字的酒店标识"></el-input>
        </el-form-item>
        <el-form-item label="绑定应用：">
          <el-select v-model="companyObj.appid" placeholder="请选择要绑定的应用">
            <el-option v-for="item in miniapp" :key="item.applyPk" :label="item.name" :value="item.appid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经度：">
          <el-input v-model="companyObj.longitude" readonly></el-input>
        </el-form-item>
        <el-form-item label="维度：">
          <el-input v-model="companyObj.latitude" readonly></el-input>
        </el-form-item>
        <el-form-item label="   ">
            <el-button type="primary" @click="openMap">地图</el-button>
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
      <p style="color: #F56C6C">*请点击地图，选择经纬度</p>
      <a-map-dialog :dialogVisible="dialogVisible" ref="amapDialogRef" @input="returnMap" @update:dialogVisible="closeMap"></a-map-dialog>
    </div>
</template>

<script>
import {
  getCompanyInfot,
  updateCompany,
  getMiniApp
} from "@/api/systemSet/pmsCompanyController";
import AMapDialog from '@/components/AmapLocalize/AMapDialog.vue'

export default {
  components: {AMapDialog},
  data() {
    return {
      companyObj: {},
      rules: {
        companyName: [
          {
            required: true,
            message: "酒店名称不能为空",
            trigger: "blur,change"
          }
        ],
        companyAddress: [
          {
            required: true,
            message: "酒店地址不能为空",
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
      } else if (this.companyObj.companyAddress == "") {
        content = "酒店地址不能为空";
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
      getMiniApp().then(res => {
        this.miniapp = res.data
      })
    },
    openMap () {
      this.dialogVisible = true
      let value = this.transFromMap(this.companyObj.longitude, this.companyObj.latitude)
      this.$refs.amapDialogRef.setAddress(value.lng, value.lat)
    },
    returnMap (data) {
      console.log(data)
      let value = this.transFromMapToBaiDu(data.lng, data.lat)
      this.companyObj.longitude = value.bd_lng
      this.companyObj.latitude = value.bd_lat
      if (this.companyObj.companyAddress == null || this.companyObj.companyAddress == "") {
        this.companyObj.companyAddress = data.address
      }
    },
    closeMap (data) {
      this.dialogVisible = data
    },
    // 百度坐标转高德（传入经度、纬度）
    transFromMap (bd_lng, bd_lat) {
      var X_PI = Math.PI * 3000.0 / 180.0;
      var x = bd_lng - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);
      return {lng: gg_lng, lat: gg_lat}
    },
    // 高德坐标转百度（传入经度、纬度）
    transFromMapToBaiDu (gg_lng, gg_lat) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = gg_lng, y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return {
            bd_lat: bd_lat,
            bd_lng: bd_lng
        };
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