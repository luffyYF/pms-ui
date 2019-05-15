// 发票信息编辑
// Created by Administrator on 2018-11-29T16:33:05.207.
<template>
  <el-dialog class="add-permission" title="编辑" :visible.sync="dialogVisible" width="1000px"
             :close-on-click-modal="false" :before-close="handleClose">
    <!-- el-row -->
    <el-row>
      <el-col :span="24" class="bg-reserve">
        <h5 class="info-title">订单信息</h5>
          <el-form ref="orderForm" :inline="true" :model="orderForm" size="mini" label-width="100px" :rules="orderRules">
            <el-form-item label="订单编号" prop="orderNo" class="width-46">
              <!-- :readonly="dataForm.status != 0" -->
              <el-input size="small" v-model="orderForm.orderNo" type="text" class="width-180" @change="handelOrderChange" />
            </el-form-item>
            <el-form-item label="订单状态" prop="orderStatus" class="width-46">
              <el-input size="small" v-model="orderForm.orderStatus" type="text" class="width-180" readonly/>
            </el-form-item>
            <el-form-item label="预订人" prop="userName" class="width-46">
              <el-input size="small" v-model="orderForm.userName" type="text" class="width-180" readonly/>
            </el-form-item>
            <el-form-item label="预订手机" prop="userPhone" class="width-46">
              <el-input size="small" v-model="orderForm.userPhone" type="text" class="width-180" readonly/>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
    <el-form ref="dataForm" :inline="true" :model="dataForm" size="mini" label-width="106px" :rules="rules">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">发票信息</h5>
        <div class="info-li">
          <el-form-item label="发票抬头" class="width-46" required>
            <el-select size="small" v-model="invoiceTitleId" filterable allow-create remote placeholder="请输入发票抬头" :remote-method="findInvoiceTitle" :loading="loading" @change="handelChange" class="width-172" :disabled="dataForm.status != 0">
              <el-option
                v-for="item in invoiceTitleData"
                :key="item.invoiceTitleId"
                :label="item.invoiceTitle"
                :value="item.invoiceTitleId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="纳税人识别号" prop="taxpayerIdNo" class="width-46">
            <el-input size="small" v-model="dataForm.taxpayerIdNo" type="text" class="width-180" :readonly="invoiceTitleStatus == 1"/>
          </el-form-item>
          <el-form-item label="单位电话" prop="unitPhone" class="width-46">
            <el-input size="small" v-model="dataForm.unitPhone" type="text" class="width-180" :readonly="invoiceTitleStatus == 1"/>
          </el-form-item>
          <el-form-item label="单位地址" prop="unitAddress" class="width-46">
            <el-input size="small" v-model="dataForm.unitAddress" type="text" class="width-180" :readonly="invoiceTitleStatus == 1"/>
          </el-form-item>
          <el-form-item label="开户行" prop="openingBank" class="width-46">
            <el-input size="small" v-model="dataForm.openingBank" type="text" class="width-180" :readonly="invoiceTitleStatus == 1"/>
          </el-form-item>
          <el-form-item label="开户账号" prop="openingAccount" class="width-46">
            <el-input size="small" v-model="dataForm.openingAccount" type="text" class="width-180" :readonly="invoiceTitleStatus == 1"/>
          </el-form-item>
          <el-form-item label="发票类型" prop="invoiceType" class="width-46">
            <el-select v-model="dataForm.invoiceType" placeholder="请选择发票类型" size="small" class="width-172" :disabled="dataForm.status != 0">
              <el-option
                v-for="item in invoiceTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票金额" prop="invoiceAmount" class="width-46">
            <el-input size="small" v-model="dataForm.invoiceAmount" type="number" class="width-138" :readonly="dataForm.status != 0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- el-row -->
      <el-row>
        <el-col :span="24" class="bg-reserve">
          <h5 class="info-title">收件信息</h5>
            <el-form-item label="收货方式" prop="receivingType" class="width-46">
                <el-select v-model="dataForm.receivingType" placeholder="请选择收货方式" size="small" class="width-172" :disabled="dataForm.status != 0">
                <el-option label="快递到付" :value="0"></el-option>
                <el-option label="电子邮箱" :value="1"></el-option>
                <el-option label="自取" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收件人姓名" prop="addresseeName" class="width-46">
              <el-input size="small" v-model="dataForm.addresseeName" type="text" class="width-180" :readonly="dataForm.status != 0"/>
            </el-form-item>
            <el-form-item label="收件人电话" prop="addresseePhone" class="width-46">
              <el-input size="small" v-model="dataForm.addresseePhone" type="text" class="width-180" :readonly="dataForm.status != 0"/>
            </el-form-item>
            <el-form-item label="收件人邮箱" prop="addresseeEmail" class="width-46" v-if="dataForm.receivingType == 1">
              <el-input size="small" v-model="dataForm.addresseeEmail" type="text" class="width-180" :readonly="dataForm.status != 0"/>
            </el-form-item>
            <el-form-item label="收件人地址" prop="addresseeAddress" class="width-46" v-if="dataForm.receivingType == 0">
              <el-input size="small" v-model="dataForm.addresseeAddress" type="text" class="width-180" :readonly="dataForm.status != 0"/>
            </el-form-item>
        </el-col>
      </el-row>
      <!-- el-row -->
      <el-row v-if="dataForm.invoiceId != null">
        <el-col :span="24" class="bg-reserve">
          <h5 class="info-title">操作信息</h5>
            <el-form-item label="操作人" prop="createUserName" class="width-46">
              <el-input size="small" v-model="dataForm.createUserName" type="text" class="width-180" readonly/>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime" class="width-46">
              <el-input size="small" v-model="dataForm.createTime" type="text" class="width-180" readonly/>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :loading="loading" @click="saveData" v-if="dataForm.invoiceId == null && dataForm.status == 0">保 存 草 稿   </el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData" v-if="dataForm.invoiceId != null && dataForm.status == 0">修 改</el-button>
      <el-button type="success" size="small" :loading="loading" @click="submitData" v-if="dataForm.status == 0">提 交 审 核</el-button>
      <el-button @click="dialogVisible = false" size="small" v-else>关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi, getInvoiceTitleApi,detailByOrderPk } from '@/api/upmsInvoiceInfo'
  import { getPmsOrderByNo, findOrder } from '@/api/order/pmsOrderController'

  class InvoiceInfo {
    constructor () {
      this.invoiceId = null
      this.companyId = null
      this.orderId = null
      this.orderNo = null
      this.distributorsId = null
      this.distributorsName = null
      this.invoiceTitle = null
      this.taxpayerIdNo = null
      this.unitPhone = null
      this.unitAddress = null
      this.openingBank = null
      this.openingAccount = null
      this.status = 0
      this.invoiceType = 0
      this.invoiceAmount = null
      this.addresseeName = null
      this.addresseePhone = null
      this.addresseeEmail = null
      this.addresseeAddress = null
      this.createUserId = null
      this.createUserName = null
      this.createTime = null
      this.updateTime = null
      this.receivingType = 0
    }

    set invoiceInfo (invoiceInfo) {
      this.invoiceId = invoiceInfo.invoiceId
      this.companyId = invoiceInfo.companyId
      this.orderId = invoiceInfo.orderId
      this.orderNo = invoiceInfo.orderNo
      this.distributorsId = invoiceInfo.distributorsId
      this.distributorsName = invoiceInfo.distributorsName
      this.invoiceTitle = invoiceInfo.invoiceTitle
      this.taxpayerIdNo = invoiceInfo.taxpayerIdNo
      this.unitPhone = invoiceInfo.unitPhone
      this.unitAddress = invoiceInfo.unitAddress
      this.openingBank = invoiceInfo.openingBank
      this.openingAccount = invoiceInfo.openingAccount
      this.status = invoiceInfo.status
      this.invoiceType = invoiceInfo.invoiceType
      this.invoiceAmount = invoiceInfo.invoiceAmount
      this.addresseeName = invoiceInfo.addresseeName
      this.addresseePhone = invoiceInfo.addresseePhone
      this.addresseeEmail = invoiceInfo.addresseeEmail
      this.addresseeAddress = invoiceInfo.addresseeAddress
      this.createUserId = invoiceInfo.createUserId
      this.createUserName = invoiceInfo.createUserName
      this.createTime = invoiceInfo.createTime
      this.updateTime = invoiceInfo.updateTime
      this.receivingType = invoiceInfo.receivingType
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new InvoiceInfo(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
          taxpayerIdNo: [{ required: true, message: '请填写纳税人识别号', trigger: 'blur' }],
          invoiceType: [{ required: true, message: '请选择发票类型', trigger: 'blur' }],
          invoiceAmount: [{ required: true, message: '请填写发票金额', trigger: 'blur' }],
          receivingType: [{ required: true, message: '请选择收货方式', trigger: 'blur' }],
          addresseeName: [{ required: true, message: '请填写收件人姓名', trigger: 'blur' }],
          addresseePhone: [{ required: true, message: '请填写收件人电话', trigger: 'blur' }],
          addresseeEmail: [{ required: true, message: '请填写收件人邮箱', trigger: 'blur' }],
          addresseeAddress: [{ required: true, message: '请填写收件人地址', trigger: 'blur' }],
        },
        orderRules: {
          orderNo: [{ required: true, message: '请填写订单编号', trigger: 'blur' }],
        },
        invoiceTitleData: [],   
        invoiceTypeData: [
          {
            value: 0,
            label: '个人普通发票'
          },
          {
            value: 1,
            label: '个人电子发票'
          },
          {
            value: 2,
            label: '公司增值税普通发票'
          },
          {
            value: 3,
            label: '公司增值税专用发票'
          },
          {
            value: 4,
            label: '公司电子发票'
          }
        ],
        invoiceTitleId: null,
        invoiceTitleStatus: 0,
        companyInfo: JSON.parse(localStorage.getItem("current_logon_company")),
        userInfo: JSON.parse(localStorage.getItem("pms_userinfo")),
        orderForm: {
          orderPk: null,
          orderStatus: null,
          orderNo: null,
          userName: null,
          userPhone: null,
        },
        isOrderPage:false
      }
    },
    methods: {
      showDialog (id,orderNo) {
        this.dialogVisible = true
        if (id) {
          detailApi({ id: id }).then(res => {
            this.dataForm.invoiceInfo = res.data
            this.invoiceTitleId = res.data.invoiceTitle
            this.invoiceTitleStatus = 1
            findOrder({orderPk: res.data.orderId}).then(res => {
              this.orderForm = res.data.order
              this.orderForm.orderStatus= (res.data.order.orderStatus == 'LEAVENOPAY' ? '退房未结' : '结账离店');
            })
          })
        }else {
          this.dataForm = new InvoiceInfo()
          if(orderNo) {
            this.isOrderPage = true;
            this.orderForm.orderNo = orderNo
            this.handelOrderChange(orderNo);
          }else{
            this.orderForm = {
              orderPk: null,
              orderStatus: null,
              orderNo: null,
              userName: null,
              userPhone: null,
            }
          }
          this.invoiceTitleId = null
          this.invoiceTitleStatus = 0
        }
      },
      showDialogRo(data) {
        this.dialogVisible = true
        this.dataForm = new InvoiceInfo()
        this.isOrderPage = true
        this.dataForm.orderId = data.orderPk
        this.orderForm.orderNo = data.orderNo
        // this.orderForm.orderStatus = (res.data[0].orderStatus == 'LEAVENOPAY' ? '退房未结' : '结账离店');
        this.invoiceTitleId = data.invoiceTitle
        this.invoiceTitleStatus = 0
        this.dataForm.status = 0;
        this.dataForm.receivingType = "0";
        this.dataForm.invoiceId = null;
        this.dataForm.addresseeName = data.receiveName;
        this.dataForm.addresseePhone = data.receivePhone;
        this.dataForm.addresseeEmail = data.recipientEmail;
        this.dataForm.addresseeAddress = data.receiveAddress;
        this.dataForm.invoiceAmount = data.paymentPrice;
        this.dataForm.invoiceTitleId = data.invoiceTitle;
        this.dataForm.taxpayerIdNo = data.companyTaxNo;
        this.dataForm.unitPhone = data.invoiceCompanyPhone;
        this.dataForm.unitAddress = data.invoiceCompanyAddress;
        this.dataForm.openingBank = data.openingBank;
        this.dataForm.openingAccount = data.openingAccount;
      },
      handleClose () {
        this.dialogVisible = false
      },
      findInvoiceTitle (query) {
        this.loading = true
        getInvoiceTitleApi({params: query}).then(res => {
          this.invoiceTitleData = res.data
        }).finally(() => {
          this.loading = false
        });
      },
      handelChange (val) {
        let tempData;
        this.invoiceTitleData.forEach(item => {
          if(item.invoiceTitleId == val) {
            tempData = item;
          }
        });
        if (tempData) {
          this.dataForm.invoiceTitle= tempData.invoiceTitle;
          this.dataForm.taxpayerIdNo= tempData.taxpayerIdNo;
          this.dataForm.unitPhone= tempData.unitPhone;
          this.dataForm.unitAddress= tempData.unitAddress;
          this.dataForm.openingBank= tempData.openingBank;
          this.dataForm.openingAccount= tempData.openingAccount;
          this.invoiceTitleStatus = 1;
        } else {
          this.dataForm.invoiceTitle= val;
          this.dataForm.taxpayerIdNo= null;
          this.dataForm.unitPhone= null;
          this.dataForm.unitAddress= null;
          this.dataForm.openingBank= null;
          this.dataForm.openingAccount= null;
          this.invoiceTitleStatus = 0;
        }
      },
      handelOrderChange (val) {
        getPmsOrderByNo({orderNo: val}).then(res => {
          if (res.data.length > 0) {
            this.orderForm = res.data[0]
            this.orderForm.orderStatus = (res.data[0].orderStatus == 'LEAVENOPAY' ? '退房未结' : '结账离店');
            this.dataForm.orderId = res.data[0].orderPk;
            this.dataForm.orderNo = res.data[0].orderNo;
            detailByOrderPk({ orderPk: this.orderForm.orderPk }).then(res => {
              if(res.data){
                this.dataForm.invoiceInfo = res.data
                this.invoiceTitleId = res.data.invoiceTitle
                this.invoiceTitleStatus = 1
              }else{
                this.dataForm.status = 0;
                this.dataForm.receivingType = "0";
                this.dataForm.invoiceId = null;
                this.dataForm.addresseeName = null;
                this.dataForm.addresseePhone = null;
                this.dataForm.addresseeEmail = null;
                this.dataForm.addresseeAddress = null;
                this.dataForm.invoiceAmount = null;
                this.invoiceTitleStatus = 0;
                this.dataForm.invoiceTitleId = null;
                this.dataForm.taxpayerIdNo = null;
                this.dataForm.unitPhone = null;
                this.dataForm.unitAddress = null;
                this.dataForm.openingBank = null;
                this.dataForm.openingAccount = null;
              }
            })
          } else {
            this.$message.warning("订单编号为" + val + "的订单不存在，请重新输入新的订单编号");
            this.orderForm = {
              orderNo:val
            };
            this.dataForm = new InvoiceInfo();
            this.dataForm.orderId = null;
            this.dataForm.orderNo = null;
          }
        })
      },
      // 保存数据
      saveData () {
        if (this.dataForm.orderId == null) {
          this.$message.warning("订单编号不能为空");
          return;
        }
        if (this.dataForm.invoiceTitle == null) {
          this.$message.warning("发票抬头不能为空");
          return;
        }

        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            this.loading = true
            let api
            if (this.dataForm.invoiceId) {
              api = updateApi(this.dataForm)
            } else {
              this.dataForm.companyId = this.companyInfo.companyPk
              this.dataForm.createUserId = this.userInfo.upmsUserId
              this.dataForm.createUserName = this.userInfo.realName
              api = addApi(this.dataForm)
            }
            api.then(res => {
              this.$message({ type: 'success', message: res.sub_msg })
              this.dialogVisible = false
              this.$emit('callback')
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },
      submitData () {
        if (!this.dataForm.invoiceId) {
          if (this.dataForm.orderId == null) {
            this.$message.warning("订单编号不能为空");
            return;
          }
          if (this.dataForm.invoiceTitle == null) {
            this.$message.warning("发票抬头不能为空");
            return;
          }

          this.dataForm.companyId = this.companyInfo.companyPk
          this.dataForm.createUserId = this.userInfo.upmsUserId
          this.dataForm.createUserName = this.userInfo.realName
        }

        this.$confirm('是否继续将此发票提交至财务审核，一旦提交发票信息将不可修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dataForm.status = 1
          updateApi(this.dataForm).then(res => {
            if(res.code == 1){
              this.$message({ type: 'success', message: res.sub_msg })
              this.dialogVisible = false
              this.$emit('callback')
            }else{
              this.$message({ type: 'warning', message:  res.sub_msg})
            }
          });
        }).catch(() => { 
          
        });
      },
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
.end-col {
  margin-left: 15px;
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
.width-46 {
  width: 46%;
}
.width-138 {
  width: 138.5%;
}
.width-180 {
  width: 180%;
}
.width-172 {
  width: 172%;
}
</style>
