<template>
    <div>
    <div class="body-conten">
        <div class="bg-reserve height38">
          <h5 class="info-title">会员来源信息</h5>
          <el-col :span="8">销售员：{{membeInfo.referee}}</el-col>
          <el-col :span="16">领卡部门：珠海豪斯菲尔信息科技有限公司<!-- {{membeInfo.companyPk}} --></el-col>
        </div>
        <div class="bg-reserve height110">
          <h5 class="info-title">会员基本信息</h5>
          <el-col :span="24">
            <el-col :span="6">卡号：{{membeInfo.cardNumber}}	</el-col>
            <el-col :span="8">姓名：{{membeInfo.memName}}</el-col>
            <el-col :span="8">会员级别：{{membeInfo.gradeName}}</el-col>
          </el-col>
          <el-col :span="24">

            <el-col :span="6">性别：
              <span v-if="membeInfo.memSex == 'M'">男</span>
              <span v-if="membeInfo.memSex == 'W'">女</span>
              <span v-if="membeInfo.memSex == 'N'">未知</span>
            </el-col>
            <el-col :span="8">籍贯：{{membeInfo.nativePlace}}</el-col>
            <el-col :span="8">出生：{{membeInfo.birthday}}</el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="6">手机：{{membeInfo.memPhone}}</el-col>
            <el-col :span="8">证件：
              <span v-if="membeInfo.certificateType == 'TWO_IDENTITY'">二代身份证</span>
              <span v-if="membeInfo.certificateType == 'ONE_IDENTITY'">一代身份证</span>
              <span v-if="membeInfo.certificateType == 'ORDER'">其他</span>
              <span v-if="membeInfo.certificateType == 'DRIVER'">驾驶证</span>
              <span v-if="membeInfo.certificateType == 'PASSPORT'">护照</span>
              <span v-if="membeInfo.certificateType == 'OFFICERS'">军官证</span>
              <span v-if="membeInfo.certificateType == 'SOLDIER'">士兵证</span>
              <span v-if="membeInfo.certificateType == 'HK_MACAO_PASS'">港澳通行证</span>
              <span v-if="membeInfo.certificateType == 'RETURN_HOME'">回乡证</span>
              <span v-if="membeInfo.certificateType == 'TEMP_IDENTITY'">临时身份证</span>
              <span v-if="membeInfo.certificateType == 'BOOKLET'">户口簿</span>
              <span v-if="membeInfo.certificateType == 'POLICE_OFFICER'">警官证</span>
            </el-col>
            <el-col :span="8">证件号：{{membeInfo.certificateNo}}</el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="6">国家：{{membeInfo.country}}</el-col>
            <el-col :span="8">邮箱：{{membeInfo.email}}</el-col>
            <el-col :span="10">地址：{{membeInfo.address}}</el-col>
          </el-col>
        </div>
        <div class="bg-reserve height38">
          <h5 class="info-title">开通信息</h5>
          <el-col :span="16">开通时间：{{membeInfo.createTime}}</el-col>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
          <!-- v-on:asfcascas="delMemberList()" -->
        <MemberOperationManagement @callback="deleteCallback" v-bind:message="membeInfo"  />
      </div>
    </div>
</template>
<script>

import MemberOperationManagement from "./MemberOperationManagement";
export default {
    components: { MemberOperationManagement },
  data() {
    return {
      membeInfo: {}, //会员资料
      total: 0,
    };
  },
  mounted() {
  },
  methods: {
      init(row){
          this.membeInfo = row
      },
      deleteCallback(){
          this.$emit("callback")
      }

  }
}
</script>

<style scoped>
.body-conten {
  background: #f7f7f7;
  padding: 10px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.height38 {
  height: 38px;
  padding: 20px 10px 0 10px;
}
.height110 {
  height: 110px;
  padding: 20px 10px 0 10px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.dialog-footer {
    text-align: right;
}
</style>
