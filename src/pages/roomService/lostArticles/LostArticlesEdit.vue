// 遗失物品表编辑
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <el-dialog class="lost-articles" title="存放物品" :visible.sync="dialogVisible" width="890px"
             :close-on-click-modal="false" :before-close="handleClose">
    
    <el-form ref="dataForm" :model="dataForm" size="mini" label-width="85px" :rules="rules">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">物品信息</h5>
        <div class="info-li">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="dataForm.type" @change="typeChange">
              <el-radio :label="0">遗留物品</el-radio>
              <el-radio :label="1">贵重物品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="物品名称" required class="width-31">
            <el-input size="small" v-model="dataForm.name" type="text"/>
          </el-form-item>
          <el-form-item label="参考价值" class="width-31">
            <el-input size="small" v-model="dataForm.referenceValue" type="text"/>
          </el-form-item>
        </div>
      </div>
      <!-- el-row -->
      <el-row>
        <el-col :span="24" class="bg-reserve">
          <h5 class="info-title">存放人信息</h5>
            <el-form-item label="客人类型">
              <el-radio-group v-model="dataForm.userType"  @change="userTypeChange">
                <el-radio :label="0" :disabled="dataForm.type == 0">在住客人</el-radio>
                <el-radio :label="1">离店客人</el-radio>
                <el-radio :label="2">其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-button type="text" :disabled="dataForm.userType == 2" @click="addGuest">选择在住客人/选择离店客人</el-button>
            <el-form-item label="房间号" v-if="dataForm.userType != 2" required class="width-32">
              <el-input size="small" v-model="dataForm.roomNumber" type="text" readonly/>
            </el-form-item>
            <el-form-item label="房间号" v-if="dataForm.userType == 2" class="width-32">
              <el-input size="small" v-model="dataForm.roomNumber" type="text"/>
            </el-form-item>
            <el-form-item label="订单号" class="width-31">
              <el-input size="small" v-model="dataForm.orderNo" type="text" :readonly="dataForm.userType != 2"/>
            </el-form-item>
            <el-form-item label="客人姓名" required class="width-31">
              <el-input size="small" v-model="dataForm.userName" type="text" :readonly="dataForm.userType != 2"/>
            </el-form-item>
            <el-form-item label="电话号码" class="width-31">
              <el-input size="small" v-model="dataForm.userPhone" type="text"/>
            </el-form-item>
            <el-form-item label="备注" class="width-96">
              <el-input v-model="dataForm.remark" type="textarea" rows="4" />
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>

    <!--查询存放人信息组件-->
    <GuestDialog ref="guestDialogRef" @callback="saveGuest"/>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi } from '@/api/roomService/pmsLostArticlesApi'
  import GuestDialog from './GuestDialog'

  class PmsLostArticles {
    constructor () {
      this.lostArticlesPk = null
      this.orderNo = null
      this.roomPk = null
      this.roomNumber = null
      this.name = null
      this.type = 0
      this.referenceValue = null
      this.userId = null
      this.userName = null
      this.userPhone = null
      this.userType = 1
      this.remark = null
      this.depositUserId = null
      this.depositUserName = null
      this.receiveUserId = null
      this.receiveUserName = null
      this.status = null
      this.companyPk = null
      this.createTime = null
      this.updateTime = null
    }

    set pmsLostArticles (pmsLostArticles) {
      this.lostArticlesPk = pmsLostArticles.lostArticlesPk
      this.orderNo = pmsLostArticles.orderNo
      this.roomPk = pmsLostArticles.roomPk
      this.roomNumber = pmsLostArticles.roomNumber
      this.name = pmsLostArticles.name
      this.type = pmsLostArticles.type
      this.referenceValue = pmsLostArticles.referenceValue
      this.userId = pmsLostArticles.userId
      this.userName = pmsLostArticles.userName
      this.userPhone = pmsLostArticles.userPhone
      this.userType = pmsLostArticles.userType
      this.remark = pmsLostArticles.remark
      this.depositUserId = pmsLostArticles.depositUserId
      this.depositUserName = pmsLostArticles.depositUserName
      this.receiveUserId = pmsLostArticles.receiveUserId
      this.receiveUserName = pmsLostArticles.receiveUserName
      this.status = pmsLostArticles.status
      this.companyPk = pmsLostArticles.companyPk
      this.createTime = pmsLostArticles.createTime
      this.updateTime = pmsLostArticles.updateTime
    }
  }

  export default {
    components: { GuestDialog },
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new PmsLostArticles(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
        },
        userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
        company: JSON.parse(localStorage.getItem('current_logon_company')),
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id) {
          detailApi({ id: id }).then(res => {
            this.dataForm.pmsLostArticles = res.data
          })
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      typeChange (val) {
        console.log(val)
        if (val == 0) {
          this.dataForm.userType = 1
        } else {
          this.dataForm.userType = 0
        }
        this.dataForm.orderNo = null
        this.dataForm.roomPk = null
        this.dataForm.roomNumber = null
        this.dataForm.userId = null
        this.dataForm.userName = null
        this.dataForm.userPhone = null
      },
      userTypeChange (val) {
        this.dataForm.orderNo = null
        this.dataForm.roomPk = null
        this.dataForm.roomNumber = null
        this.dataForm.userId = null
        this.dataForm.userName = null
        this.dataForm.userPhone = null
      },
      addGuest () {
        this.$refs.guestDialogRef.showDialog(this.dataForm.userType)
      },
      saveGuest (guest) {
        this.dataForm.orderNo = guest.orderNo
        this.dataForm.roomPk = guest.roomPk
        this.dataForm.roomNumber = guest.roomNumber
        this.dataForm.userId = guest.userId
        this.dataForm.userName = guest.userName
        this.dataForm.userPhone = guest.userPhone
      },
      // 保存数据
      saveData () {
        if (this.dataForm.name == null || this.dataForm.name == '') {
          this.$message.warning("请填写物品名称")
          return
        }
        if (this.dataForm.userType != 2) {
          if (this.dataForm.roomNumber == null || this.dataForm.roomNumber == '') {
            this.$message.warning("房间号不能为空")
            return
          }
        }
        if (this.dataForm.userName == null || this.dataForm.userName == '') {
          this.$message.warning("客人姓名不能为空")
          return
        }

        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.dataForm.depositUserId = this.userInfo.userPk
            this.dataForm.depositUserName = this.userInfo.realName
            this.dataForm.companyPk = this.company.companyPk
            addApi(this.dataForm).then(res => {
              this.$message({ type: 'success', message: res.sub_msg })
              this.dialogVisible = false
              this.$emit('callback')
            }).finally(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.bg-reserve {
  position: relative;
  background: #ffffff;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #ffffff;
}
.el-select {
  width: 178px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 19px;
    margin-left: 10px;
}
.width-31 {
  width: 31%;
  display: inline-block;
}
.width-32 {
  width: 31%;
  display: block;
}
.width-96 {
  width: 96.4%;
}
.el-button--text {
  padding-top: 0;
  margin-left: 26px;
}
</style>
<style>
</style>
