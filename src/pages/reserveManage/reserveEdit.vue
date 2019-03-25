// 预订信息编辑
<template>
  <el-dialog class="add-reserve" title="编辑预订信息" :visible.sync="dialogVisible" width="660px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="100px" :inline="true">
      <div class="bg-reserve">
        <el-row>
          <el-col :span="24" class="book-info">
            <h5 class="info-title">预定信息</h5>
            <el-form-item label="名   称" required>
              <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="协议单位" required>
              <el-input v-model="dataForm.agreementName" :readonly="true" style="width: 180px;">
                <el-button slot="append" icon="el-icon-search" @click="openAgreement" title="查询协议单位"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="客源渠道" required>
              <channel-select ref="channelRef" v-model="dataForm.channelTypePk" style="width: 180px;" @callback="changeChannel($event)"></channel-select>
            </el-form-item>
            <el-form-item label="预订卡号">
              <el-input v-model="dataForm.reserveCardNo"></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="dataForm.payment" style="width: 180px;">
                <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保留时效">
              <el-time-select class="reserve-time" style="width: 180px;" v-model="dataForm.keepTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></el-time-select>
            </el-form-item>
            <el-form-item label="是否团体">
              <el-select v-model="dataForm.isTeam" :disabled="true" style="width: 180px;">
                <el-option label="否" value="N"></el-option>
                <el-option label="是" value="Y"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备   注">
              <el-input v-model="dataForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="抵店离店" required>
              <el-date-picker v-model="beginEndPicker" :default-time="['14:00:00', '12:00:00']" @change="changePicker" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="抵店日期" end-placeholder="离店日期" :clearable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">确 定</el-button>
    </span>

    <!-- 协议单位 -->
    <Agreement ref="agreementRef" @sendData="agreementCallback($event)"></Agreement>

    <el-dialog title="提示" :visible.sync="dialogVisibleBox" width="420px" top="30vh" :close-on-click-modal="false" :append-to-body="true" class="msg-box">
      <span>若已确定所填数据无误，请点击确定提交excel</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleBox = false" size="mini">取 消</el-button>
        <el-upload
          style="display: inline-block;margin-left: 10px"
          :data="{order: JSON.stringify([dataForm]), guest: JSON.stringify([form])}"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="handleBeforeUpload"
          :action="getUploadExcelAction()"
          :headers="headers"
          :show-file-list="false">
          <el-button size="mini" type="primary" @click="dialogVisibleBox = false">确 定</el-button>
        </el-upload>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import moment from "moment";
  import { paymentMap } from "@/utils/orm";
  import Agreement from "@/components/Agreement/Agreement";
  import { getUploadExcelAction } from "@/api/upload";

  export default {
    components: { Agreement },
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
          name: 'excel团队预订',
          agreementPk: null,
          agreementName: null,
          channelTypePk: null,
          reserveCardNo: null,
          payment: "-1",
          keepTime: null,
          isTeam: "Y",
          remark: null,
          beginDate: null,
          endDate: null,
          companyPk: null
        },
        form: {
          beginDate: null,
          channelTypePk: null,
          endDate: null,
        },
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
        },
        userInfo: JSON.parse(localStorage.getItem("upms_userinfo")),
        paymentMap: paymentMap,
        pickerOptions0: {
          //限制今天以前的日期不可选择
          disabledDate(time) {
            return time.getTime() < moment().subtract(1, "days") - 8.64e7;
          }
        },
        beginEndPicker: [],
        companyInfo: JSON.parse(localStorage.getItem("current_logon_company")),
        getUploadExcelAction: getUploadExcelAction,
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('pms_token'),
          'CompanyPk': localStorage.getItem('select_company_pk') == null ? '' : localStorage.getItem('select_company_pk'),
          'ShiftPk': localStorage.getItem('select_shift_pk') == null ? '' : localStorage.getItem('select_shift_pk')
        },
        dialogVisibleBox: false,
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        this.dataForm = {
          name: 'excel团队预订',
          agreementPk: null,
          agreementName: null,
          channelTypePk: null,
          reserveCardNo: null,
          payment: "-1",
          keepTime: null,
          isTeam: "Y",
          remark: null,
          beginDate: null,
          endDate: null,
          companyPk: null
        }
        this.form = {
          beginDate: null,
          channelTypePk: null,
          endDate: null,
        }
        this.beginEndPicker = []
        this.$nextTick(() => {
          this.$refs.channelRef.load(true);
        })
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        if(!this.validateForm()) {
          return;
        }

        this.dataForm.companyPk = this.companyInfo.companyPk
        this.dataForm.beginDate = this.beginEndPicker[0]
        this.dataForm.endDate = this.beginEndPicker[1]

        this.dialogVisibleBox = true
      },
      // 表单验证
      validateForm() {
        // 验证主单
        if(!this.dataForm.name) {
          this.$message.warning('团队名称不能为空');
          return false;
        }
        if(!this.dataForm.agreementPk || !this.dataForm.agreementName){
          this.$message.warning('协议单位不能为空');
          return false;
        }
        if(!this.dataForm.channelTypePk) {
          this.$message.warning('客源渠道不能为空');
          return false;
        }
        if(this.beginEndPicker.length!=2){
          this.$message.warning('抵店离店日期不能为空');
          return false;
        }
        
        return true;
      },
      // 打开选择协议单位
      openAgreement() {
        this.$refs.agreementRef.init();
      },
      // 选择协议回调
      agreementCallback(data) {
        this.dataForm.agreementPk = data.agreementPk;
        this.dataForm.agreementName = data.unitName;
      },
      // 日期改变
      changePicker(picker){
        if (picker == null) {
          this.form.beginDate = null
          this.form.endDate = null
        } else {
          if (picker[0] > picker[1]) {
            this.$message.warning("抵店日期不能大于离店日期")
            this.beginEndPicker = []
            return
          }
          this.form.beginDate = picker[0]
          this.form.endDate = picker[1]
        }
      },
      // 渠道改变
      changeChannel(channelPk){
        this.form.channelTypePk = channelPk
      },
      // 上传文件成功回调
      handleUploadSuccess (res, file) {
          this.loading = false
        if (res.code == 1) {
          this.dialogVisible = false
          this.$message.success("提交预订信息成功")
          this.$emit('freshback')
        } else {
          this.$message.error(res.sub_msg)
        }
      },
      // 文件上传前执行
      handleBeforeUpload (file) {
        const isXLS = file.name.toLowerCase().indexOf(".xls") != -1;
        if (!isXLS) {
          this.loading = false
          this.$message.error('上传的文件只能是 xls 格式!')
        } else {
          this.loading = true
        }
        return isXLS
      },
      // 文件上传失败
      handleUploadError (res) {
        this.loading = false
        this.$message.error('文件上传失败')
      },
    }
  }
</script>

<style scoped>
.bg-reserve {
  border: 1px solid #ccc;
  padding: 15px;
}
.book-info {
  border: 1px solid #ccc;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: 5px;
}
.add-reserve .info-title {
  position: absolute;
  z-index: 11;
  top:0px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
  padding: 0 5px;
}
</style>

<style>
.msg-box .el-dialog{
  height: 140px;
}
.msg-box .el-dialog .el-dialog__header {
  padding: 10px 20px 10px;
}
.msg-box .el-dialog .el-dialog__body {
  padding: 15px 20px;
}
.msg-box .el-dialog .el-dialog__footer {
  padding: 10px 20px 10px;
}
</style>

