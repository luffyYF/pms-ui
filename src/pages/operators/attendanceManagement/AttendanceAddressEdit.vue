// 考勤地址表编辑
// Created by Administrator on 2018-12-14T11:13:33.034.
<template>
  <el-dialog class="add-address" title="考勤地址" :visible.sync="dialogVisible" width="900px"
             :close-on-click-modal="false" :before-close="handleClose" center>
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="78px" class="form-style">
      <AmapLocalize ref="amapRef"></AmapLocalize>
      <el-form-item label="经度" label-width="52px" prop="longitude" class="width-30">
        <el-input size="small" v-model="dataForm.longitude" type="text" readonly/>
      </el-form-item>
      <el-form-item label="维度" label-width="52px" prop="latitude" class="width-30">
        <el-input size="small" v-model="dataForm.latitude" type="text" readonly/>
      </el-form-item>
      <el-form-item label="打卡范围" label-width="70px" prop="scope" class="width-30">
        <el-input size="small" v-model.number="dataForm.scope" type="number" :min="0">
          <template slot="append">米</template>
        </el-input>
      </el-form-item>
      <el-form-item label="地址简写" prop="shortAddress" class="width-100">
        <el-input size="small" v-model="dataForm.shortAddress" type="text"/>
      </el-form-item>
      <el-form-item label="详细地址" prop="address" class="width-100">
        <el-input size="small" v-model="dataForm.address" type="text"/>
      </el-form-item>
    </el-form>
    <span style="color: red">*注：点击即可获取经纬度, 范围为0则不限制范围</span>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="saveData(1)">保存继续添加</el-button>
      <el-button type="primary" size="small" @click="saveData(2)">保存</el-button>
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import bus from "@/utils/bus";
  import AmapLocalize from '@/components/AmapLocalize/index.vue'

  class AttendanceAddress {
    constructor () {
      this.addressId = null
      this.groupId = null
      this.shortAddress = null
      this.address = null
      this.longitude = null
      this.latitude = null
      this.scope = 0
      this.isDelete = null
      this.createTime = null
    }

    set attendanceAddress (attendanceAddress) {
      this.addressId = attendanceAddress.addressId
      this.groupId = attendanceAddress.groupId
      this.shortAddress = attendanceAddress.shortAddress
      this.address = attendanceAddress.address
      this.longitude = attendanceAddress.longitude
      this.latitude = attendanceAddress.latitude
      this.scope = attendanceAddress.scope
      this.isDelete = attendanceAddress.isDelete
      this.createTime = attendanceAddress.createTime
    }
  }

  export default {
    components: { AmapLocalize },
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new AttendanceAddress(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
          longitude: [{ required: true, message: '经度不能为空', trigger: 'blur' }],
          latitude: [{ required: true, message: '纬度不能为空', trigger: 'blur' }],
          shortAddress: [{ required: true, message: '请填写地址简写', trigger: 'blur' }],
          address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        },
        index: null,
      }
    },
    methods: {
      showDialog (item, index) {
        this.index = index
        this.dialogVisible = true
        if (item) {
          let temp = JSON.stringify(item)
          this.dataForm.attendanceAddress = JSON.parse(temp)
          this.$nextTick(() => {
            let map = this.transFromMap(this.dataForm.longitude,this.dataForm.latitude);
            this.$refs.amapRef.setAddressLocal(map.lng,map.lat,true);
            this.dataForm.longitude = map.lng;
            this.dataForm.latitude = map.lat;
          })
        } else {
          this.dataForm = new AttendanceAddress()
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData (val) {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            let map = this.transFromMapToBaiDu(this.dataForm.longitude,this.dataForm.latitude);
            let temp = JSON.stringify(this.dataForm);
            let tempData = JSON.parse(temp);
            tempData.latitude = map.bd_lat;
            tempData.longitude = map.bd_lng;
            if (val == 1) {
              this.$emit('callback',{dataForm: tempData, index: this.index})
              this.index = null
              this.dataForm = new AttendanceAddress()
            } else {
              this.$emit('callback',{dataForm: tempData, index: this.index})
              this.dialogVisible = false
            }
          }
        })
      },
      //百度坐标转高德（传入经度、纬度）
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
    mounted () {
      bus.$on("returnPosition",(msg) => {
        this.dataForm.address = msg.address;
        this.dataForm.longitude = msg.lng;
        this.dataForm.latitude = msg.lat;
        this.dataForm.shortAddress = msg.shortAddress;
      });
    }
  }
</script>

<style scoped>
.width-100 {
  width: 100%;
}
.dialog-footer {
  float: right;
}
.width-30 {
  display: inline-block;
  width: 33%;
}
.form-style .el-form-item {
  margin-right: 0;
}
</style>
<style>
.add-address .el-dialog .el-dialog__footer {
  overflow: hidden;
}
</style>
