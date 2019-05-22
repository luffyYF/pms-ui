<template>
    <div class="bg-reserve">
      <el-form ref="form" :label-position="'right'" :rules="rules" :inline="true" :model="companyObj" size="mini" label-width="100px">
        <amap-localize :value.sync="value" ref="amapLocalizeRefs" @callback="getAddressLocal"></amap-localize>
        <el-form-item label="经度：">
          <el-input v-model="companyObj.longitude" readonly></el-input>
        </el-form-item>
        <el-form-item label="维度：">
          <el-input v-model="companyObj.latitude" readonly></el-input>
        </el-form-item>
        <el-form-item label="酒店地址：" prop="companyAddress">
          <el-input v-model="companyObj.companyAddress" style="width: 522px"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="saveInfo">保存地址信息</el-button>
        </el-form-item>
      </el-form>
      <p style="color: #F56C6C">*请点击地图，选择经纬度</p>
    </div>
</template>

<script>
import {
  getCompanyInfot,
  updateCompany
} from "@/api/systemSet/pmsCompanyController";
import AmapLocalize from '@/components/AmapLocalize/index'
import UploadAvatar from "@/components/UploadImage/UploadAvatar2";

export default {
  components: {AmapLocalize, UploadAvatar},
  data() {
    return {
      companyObj: {},
      value: {
        lat: null,
        lng: null
      },
      rules: {
        companyAddress: [
          {
            required: true,
            message: "酒店地址不能为空",
            trigger: "blur,change"
          }
        ],
      },
      dialogVisible: false,
    };
  },
  methods: {
    init(){
      this.getCompany();
    },
    getCompany() {
      getCompanyInfot().then(res => {
        if (res.code == 1) {
          this.companyObj = res.data
          this.value = this.transFromMap(this.companyObj.longitude, this.companyObj.latitude)
        }
      });
    },
    getAddressLocal (val) {
      let value = this.transFromMapToBaiDu(val.lng, val.lat)
      this.companyObj.longitude = value.bd_lng
      this.companyObj.latitude = value.bd_lat
      if (this.companyObj.companyAddress == null || this.companyObj.companyAddress == "") {
        this.companyObj.companyAddress = val.address
      }
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
      if (this.companyObj.companyAddress == "") {
        content = "酒店地址不能为空";
      }

      if (content != "") {
        this.$message.error(content);
        return false;
      }
      return true;
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
