//散客预定
<template>
  <div>
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row class="bg-reserve">
        <el-col :span="24" class="book-info">
          <h5 class="info-title">预定信息</h5>
          <el-row class="info-li">
            <el-col :span="4">
              <el-form-item label="名   称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预订卡号">
                <el-input v-model="form.reserveCardNo"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="4">
            <el-form-item label="预订人" required>
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="预订手机">
                <el-input type="number" v-model="form.userPhone"></el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="4">
              <el-form-item label="协议单位" >
                <el-input v-model="form.agreementName" :readonly="true">
                  <el-button slot="append" icon="el-icon-search" @click="openAgreement" title="查询协议单位"></el-button>
                </el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="4">
              <el-form-item label="是否团体">
                <el-select v-model="form.isTeam" :disabled="true">
                  <el-option label="否" value="N"></el-option>
                  <el-option label="是" value="Y"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-li">
            <el-col :span="4">
              <el-form-item label="担 保 方">
                <el-input v-model="form.guarantee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="担保类型">
                <el-select v-model="form.guaranteeType">
                  <el-option label="无担保" value=""></el-option>
                  <el-option label="担保到达" value="GUARANTEE_ARRIVAL"></el-option>
                  <el-option label="全程担保" value="GUARANTEE_ALL"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="支付方式">
                <el-select v-model="form.payment">
                  <el-option v-for="(value,index) in paymentMap" :key="index" :value="index" :label="value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="保留时效">
                <el-time-select class="reserve-time" v-model="form.keepTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"  placeholder="选择时间"></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="登记时间">
                <el-date-picker v-model="reserveTime" type="datetime" placeholder="选择日期时间" :disabled="true"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="info-li">
            <el-col :span="20">
              <el-form-item label="备   注" class="textarea-width">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="24" class="reserve-contert">
          <el-tabs type="border-card" class="card-tabs">
            <el-tab-pane label="客单">
              <visitor-tag ref="visitorRef" :parentForm="form"/>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <el-col :span="24" class="reserve-contert">
            <el-form-item class="addreserve-btn">
              <el-button type="primary" @click="onSubmit" v-if="hasPerm('pms:addReserve:saveReserve')" :disabled="submitLock">保存预订</el-button><!--v-loading.fullscreen.lock="fullscreenLoading"-->
              <el-button type="primary" @click="init">重置</el-button>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 协议单位 -->
    <Agreement ref="agreementRef" @sendData="agreementCallback($event)"></Agreement>
  </div>
</template>
<script>
  import { paymentMap } from '@/utils/orm'
  import VisitorTag from './addReserve/Visitor'
  import {validatePhone} from '@/utils/validate'
  import {formatDate, copyObj} from '@/utils/index'
  import {reserveOrder} from '@/api/order/pmsOrderController'
  import Agreement from "@/components/Agreement/Agreement";
  
  export default {
    components: {VisitorTag,Agreement},
    data() {
      return {
        submitLock:false,//提交表单锁
        paymentMap:paymentMap,
        form: {
          orderPk: null,
          name: '',
          guarantee: '',
          guaranteeType:'',
          payment: '0',
          isTeam: 'N',
          companyPk: '',
          keepTime: null,
          remark: '',
          reserveCardNo: '',
          rentCount: '',
          userName: '',
          userPhone: '',
          agreementName:'',
          agreementPk:''
        },
        reserveTime: new Date(),
        // fullscreenLoading:false,
      }
    },
    methods: {
      init(roomTypePk,date,roomNumber) {
        this.form = {
          orderPk: null,
          name: '散客预定',
          guarantee: '',
          guaranteeType:'',
          payment: '0',
          isTeam: 'N',
          companyPk: '',
          keepTime: null,
          remark: '',
          reserveCardNo: '',
          rentCount: '',
          userName: '',
          userPhone: '',
        }

        this.reserveTime = new Date()
        this.$refs.visitorRef.initEmpty(roomTypePk,date,roomNumber)
        this.submitLock=false;
      },
      onSubmit() {//保存预定
        let visitorForm = this.$refs.visitorRef.form;
         //校验
        if(!this.form.userName){
          this.$message({type:'warning', message: '请填写 预定人'})
          return;
        }

        // if(!this.form.userPhone){
        //   this.$message({type:'warning', message: '请填写 预定人手机号'})
        //   return
        // }else{
        //   if(!validatePhone(this.form.userPhone)){
        //     this.$message({type:'warning', message: '手机号不合法！'})
        //     return
        //   }
        // }
        
        if(this.form.userPhone){
          if(!validatePhone(this.form.userPhone)){
            this.$message({type:'warning', message: '手机号不合法！'})
            return
          }
        }
        
        if(!visitorForm.channelTypePk){
          this.$message({type:'warning', message:'客源渠道不能为空'})
          return
        }
        // if(!visitorForm.guestName){
        //   this.$message({type:'warning', message:'客人姓名不能为空'})
        //   return
        // }
        if(visitorForm.currPrice==null) {
          this.$message({type:'warning', message:'当前房租不能为空'})
          return
        }
        if(Number(visitorForm.currPrice)<0){
          this.$message({type:'warning', message:'当前房租不能小于0'})
          return
        }
        if(visitorForm.deposit==null){
          this.$message({type:'warning', message:'押金不能为空'})
          return
        }
        if(Number(visitorForm.deposit)<0){
          this.$message({type:'warning', message:'请输入正确的押金'})
          return
        }
        if(!visitorForm.beginDate){
          this.$message({type:'warning', message:'抵店日期不能为空'})
          return
        }
        if(!visitorForm.endDate){
          this.$message({type:'warning', message:'离店日期不能为空'})
          return
        }
        // if(!visitorForm.guestPhone){
        //   this.$message({type:'warning', message:'请填写手机号'})
        //   return
        // }
        if(visitorForm.guestPhone){
          if(!validatePhone(visitorForm.guestPhone)){
            this.$message({type:'warning', message:'手机号不合法'})
            return
          }
        }

        this.form.guaranteeType = this.form.guaranteeType ? this.form.guaranteeType : null
        this.form.keepTime = this.form.keepTime ? this.form.keepTime : null
        let data = {
          order: this.form,
          guestOrder: visitorForm
        }
        if(this.submitLock){
          return
        }else{
          this.submitLock=true;
        }
        reserveOrder(data).then(res=>{
          this.$message({type:'success', message: '预定成功'})
          this.init()
          this.submitLock=false;
        }).catch(()=>{
          this.submitLock=false;
        })
      },//打开选择协议单位
      openAgreement() {
        this.$refs.agreementRef.init();
      },//选择协议回调
      agreementCallback(data) {
        this.$set(this.form,"agreementPk",data.agreementPk)
        this.$set(this.form,"agreementName",data.unitName)
        // this.form.userPhone = data.contactPhone;
        // this.form.userName = data.contactName;
        // this.form.agreementPk = data.agreementPk;
        // this.form.agreementName = data.unitName;
      },
    },
    mounted() {
      this.init()
    }
  }
</script>
<style scoped>
.bg-reserve{
  background: #f7f7f7;
  border: 1px solid #ccc;
  padding: 15px;
}
.book-info{
  border: 1px solid #ccc;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-top: 5px;
}
.info-title{
  position: absolute;
  z-index: 11;
  top: 13px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
  padding: 0 5px;
}
.info-li{
  margin-bottom: 0 !important;
}
.reserve-time{
  width: 158px !important;
}
.textarea-width{
  width: 100%;
  margin-bottom: 0;
}
.reserve-contert{
  margin: 15px 0 3px;
}

.addreserve-btn{
  margin-bottom: 0 !important;
  text-align: center;
}
.el-form-item.el-form-item--mini{
  margin-bottom: 5px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner,.el-select{
  width: 100% !important;
}
</style>
<style>
.textarea-width .el-form-item__content{
  width:  calc(100% - 80px);
}
.reserve-contert>.card-tabs>.el-tabs__content{
  padding: 0 15px;
}
</style>

