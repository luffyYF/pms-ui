<template>
  <div class="registeredmember-main">
    <!-- 会员来源信息 -->
    <div class="bg-reserve">
      <h5 class="info-title">会员来源信息（不可修改）</h5>
      销售员： {{userInfo.upmsUserName}} &nbsp;&nbsp;&nbsp; 领卡部门： 深圳市前海豪斯菲尔信息科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span style="color:#F56C6C">会员卡号不能大于8位</span>
    </div>

    <!-- 会员基本资料 -->
    <div class="bg-reserve">
      <h5 class="info-title">会员基本资料</h5>
      <el-form ref="form" :label-position="'right'" :rules="rules" :inline="true" :model="form" size="mini" label-width="100px">
        <el-form-item label="证件类型">
          <el-select v-model="form.certificateType" placeholder="请选证件类型">
            <el-option
              v-for="item in certificateType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="certificateNo" required>
          <el-input v-model="form.certificateNo" @blur="idcard"></el-input>
        </el-form-item>
        <IDCardScan @callback="setCardInfo" class="vilcen"></IDCardScan>
        <el-form-item label="姓名" prop="memName" required>
          <el-input v-model="form.memName"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="gradePk" required>
          <!-- <el-select class="member-level" v-model="form.memberGrade" @visible-change="memberLevelChange" placeholder="请选会员级别">
            <el-option
              v-for="item in memberLevel"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          <!-- <member-grade v-model="form.gradePk" style="width:100px;float: left;"/> -->
          <el-input class="card-no" v-model="form.cardNumber" required :maxlength="8">
            <el-select v-model="form.gradePk" slot="prepend" style="width: 86px" @visible-change="memberLevelChange" placeholder="会员级别">
              <el-option
                v-for="item in memberLevel"
                :key="item.gradePk"
                :label="item.gradeName"
                :value="item.gradePk">
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="卡费" porp="cardFee">
          <el-input v-model="form.cardFee" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input :disabled="true" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.memSex">
            <el-option label="未设置" value="N"></el-option>
            <el-option label="男" value="M"></el-option>
            <el-option label="女" value="W"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="nativePlace">
          <el-input v-model="form.nativePlace"></el-input>
        </el-form-item>
        <el-form-item label="出生" prop="birthday" required>
          <el-date-picker v-model="form.birthday" style="width: 204px" type="date" value-format="yyyy-MM-dd" placeholder="出生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="form.country"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="memPhone" required>
          <el-input v-model="form.memPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input class="address" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="客房喜好" prop="roomLike">
          <el-input v-model="form.roomLike"></el-input>
        </el-form-item>
        <el-form-item label="餐饮喜好" prop="foodLike">
          <el-input v-model="form.foodLike"></el-input>
        </el-form-item>
        <el-form-item label="特殊要求" prop="specialRequirements">
          <el-input v-model="form.specialRequirements"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="hobby">
          <el-input v-model="form.hobby"></el-input>
        </el-form-item>
        <el-form-item label="推荐卡号" prop="recommendCard">
          <el-input v-model="form.recommendCard"></el-input>
        </el-form-item>
        <el-form-item label="推荐人" prop="referee">
          <el-input v-model="form.referee"></el-input>
        </el-form-item>
        <el-form-item label="卡有效期" prop="invalidDateCard">
          <el-date-picker v-model="form.invalidDateCard" style="width: 204px" type="date" value-format="yyyy-MM-dd" placeholder="卡有效期"></el-date-picker>
        </el-form-item>
        <el-form-item label="协议单位：">
          <el-input v-model="form.unitName"></el-input>
          <!-- <el-input v-model="form.agreementPk"></el-input> -->
          <span class="el-icon-search" @click="openAgreement()" style="cursor:pointer;" title="查询协议单位"></span>
        </el-form-item>
        <el-form-item label="收取方式" ref="chargeTypePkRef" :prop="form.cardFee == '0' ? '' : 'chargeTypePk'">
          <el-select v-model="form.chargeTypePk" @visible-change="chargeTypeChange" placeholder="请选收取方式" :disabled="form.cardFee <= 0">
            <el-option
              v-for="item in chargeType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费账户" prop="accountNumber">
          <el-input disabled v-model="form.accountNumber"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="注：">
            <span style="color:#F56C6C">*</span> 为必填项！请用户仔细填写！
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" :disabled="loading" @click="saveClick">保存注册信息</el-button>
          <el-button type="primary" @click="empty">清空</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 协议单位 -->
    <!-- <el-dialog class="agreement-body" title="协议单位" :visible.sync="showAgreementFlag" width="50%" :append-to-body="true">
      <div class="body-conten"> -->
        <!-- 协议单位 -->
      <Agreement ref="agreementRef" @sendData="agreementCallback($event)"></Agreement>
      <!-- </div>
    </el-dialog> -->

    <el-dialog
      title="选择组单"
      :visible.sync="groupDialog"
      :fit="false"
      width="90%">
        <div class="bg-reserve">
          <div class="bg-reserve">    
            <h5 class="info-title">查询</h5>
            <el-form :inline="true" size="mini" :model="selectGroupObj" class="demo-form-inline">
              <el-form-item label="房号：">
                <el-input v-model="selectGroupObj.roomNum"></el-input>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="selectGroupObj.name"></el-input>
              </el-form-item>
              <el-form-item label="手机：">
                <el-input v-model="selectGroupObj.phone"></el-input>
              </el-form-item>
              <el-form-item label="组单号：">
                <el-input v-model="selectGroupObj.groupNum"></el-input>
              </el-form-item>
              <el-form-item label="单据类别：">
                <el-select v-model="selectGroupObj.groupType">
                  <el-option label="客单" value="kedan"></el-option>
                  <el-option label="哑房单" value="yafangdan"></el-option>
                  <el-option label="退房不结" value="tuifangbujie"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="groupList"
              border
              style="width: 100%">
              <el-table-column
                label="操作"
                width="60"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">选中</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="groupNum"
                label="组单号"
                align="center"
                width="180">
              </el-table-column>
              <el-table-column
                prop="customerNum"
                align="center"
                label="客单号">
              </el-table-column>
              <el-table-column
                prop="roomNum"
                align="center"
                label="房间号码">
              </el-table-column>
              <el-table-column
                prop="costomerName"
                align="center"
                width="80"
                label="客户姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                align="center"
                label="电话号码">
              </el-table-column>
              <el-table-column
                prop="consumption"
                align="center"
                label="消费总额">
              </el-table-column>
              <el-table-column
                prop="settlement"
                align="center"
                label="结算总额">
              </el-table-column>
              <el-table-column
                prop="balance"
                align="center"
                label="余额">
              </el-table-column>
              <el-table-column
                prop="memberNum"
                align="center"
                label="客人会员卡号">
              </el-table-column>
              <el-table-column
                prop="sex"
                width="60"
                align="center"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="certificates"
                align="center"
                label="证件类型">
              </el-table-column>
            </el-table>
          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import Agreement from '@/components/Agreement/Agreement'
import MemberGrade from '@/components/MemberGrade/MemberGrade'
import {addMember,memberCertificateType} from '@/api/customerRelation/pmsMemberController'
import {listGrade} from '@/api/customerRelation/pmsMemberGradeController'
import {idcard} from '@/api/utils/pmsCommonController'
import IDCardScan from '@/components/Idcard/IDCardScan'

// import {powerJudge} from '@/utils/permissionsOperation.js'
export default {
  components:{MemberGrade,Agreement,IDCardScan},
  data() {
    var validateMemberGrade = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择会员类型'));
      } else if (this.form.cardNumber === '') {
        callback(new Error('请输入会员号'));
      } else {
        callback();
      }
    }
    return {
      loading:false,
      groupDialog: false,
      showAgreementFlag:false,
      userInfo:{},
      chargeType:[
        {id:'',name:'请选择付款方式',accountNumber:''},
        {id:'234',name:'现金',accountNumber:'会员缴费'},
        {id:'237',name:'微信',accountNumber:'会员缴费'},
        {id:'235',name:'支付宝',accountNumber:'会员缴费'},
        {id:'211',name:'银联',accountNumber:'会员缴费'},
        // {id:'挂账',name:'挂账'}
      ],
      certificateType:[],
      memberLevel:[
        {
          id:'',
          name:'选择会员级别',
          cardFee: '',
          invalidDateCard: ''
        },
        {
          id:'FIT',
          name:'散客',
          cardFee:20,
          invalidDateCard: '2038-09-09'
        },
        {
          id:'ORDINARY',
          name:'普通会员',
          cardFee:20,
          invalidDateCard: '2038-09-09'
        },
        {
          id:'SENIOR',
          name:'高级会员',
          cardFee:30,
          invalidDateCard: '2038-09-09'
        },
        {
          id:'VIP',
          name:'VIP会员',
          cardFee:40,
          invalidDateCard: '2038-09-09'
        },
        {
          id:'PLATINUM',
          name:'铂金会员',
          cardFee:50,
          invalidDateCard: '2038-09-09'
        },
        {
          id:'HONORABLE',
          name:'尊贵会员',
          cardFee:60,
          invalidDateCard: '2038-09-09'
        }
      ],
      form1: {
          "address": '',
          "birthday": '',
          "cardFee": '',
          "cardNumber": '',
          "certificateNo": '',
          "certificateType": '',
          "companyPk": '',
          "country": '',
          "email": '',
          "foodLike": '',
          "hobby": '',
          "invalidDateCard": '',
          "memName": '',
          "memPhone": '',
          "memPk": '',
          "memSex": 'N',
          "memberGrade":'',
          "nativePlace": '',
          "recommendCard": '',
          "referee": '',
          "remark": '',
          "roomLike": '',
          "specialRequirements": '',
          "chargeTypePk":'',
          'agreementUnitPk':'',
          'accountNumber':'',
          'nationality':'DL',
      },
      form: {
          "address": '',
          "birthday": '',
          "cardFee": '',
          "cardNumber": '',
          "certificateNo": '',
          "certificateType": '',
          "companyPk": '',
          "country": '',
          "email": '',
          "foodLike": '',
          "hobby": '',
          "invalidDateCard": '',
          "memName": '',
          "memPhone": '',
          "memPk": '',
          "memSex": 'N',
          "gradePk":'',
          "nativePlace": '',
          "recommendCard": '',
          "referee": '',
          "remark": '',
          "roomLike": '',
          "specialRequirements": '',
          "chargeTypePk":'',
          'agreementUnitPk':'',
          'accountNumber':'',
          'nationality':'DL',
      },
      rules: {
        certificateNo: [{ required: true, message: "证件类型不能为空" }],
        gradePk: [{ validator: validateMemberGrade}],
        memName: [{ required: true, message: "姓名不能为空" }],
        nativePlace: [{ required: true, message: "籍贯不能为空" }],
        birthday: [{ required: true, message: "出生日期不能为空" }],
        memPhone: [{ required: true, message: "手机号码不能为空" }],
        chargeTypePk: [{ required: true, message: "请选择收取方式", trigger: 'change' }],
      },
      selectGroupObj:{},
      groupList:[]
    }
  },
  mounted(){
    this.memberCertificateType();
    this.getMemberGradeList();
    // bus.$on('memberGrade', (res) => { this.memberLevelChange(res) });
    bus.$on('agreementPo', (res) => { this.agreementCallback(res) });
  },
  methods: {
    // powerJudge(id){
    //   return powerJudge(id);
    // },
    init(){
      this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
      this.memberCertificateType()
      this.getMemberGradeList();
    },
    agreementCallback(data) {
      // this.form.agreementUnitPk = data.agreementPk;
      // this.form.unitName = data.unitName;
      //实时绑定失败  重新渲染
      this.$set(this.form,"agreementUnitPk", data.agreementPk)
      this.$set(this.form,"unitName", data.unitName)
      console.log(this.form.unitName)
    },
    //打开选择协议单位
    openAgreement() {
      this.$refs.agreementRef.init();
    },
    // //选中协议单位
    // chooseAgreement(res){
    //   this.form.agreementUnitPk = res.agreementPk;
    //   this.form.unitName = res.unitName;
    //   this.showAgreementFlag = false;
    // },
    // memberLevelChange(res){
    //   this.form.gradePk = res.form.memberGrade
    //   this.form.cardFee=res.form.cardFee;
    //   this.form.invalidDateCard=res.form.invalidDateCard;
    // },
    idcard(val){
      idcard({idcard:this.form.certificateNo}).then(result => {
        if(result.data != null){
          var obj = result.data
          if (val == 1) {
            this.form.nativePlace = obj.province
            this.form.country = '中国'
          } else {
            this.form.birthday = obj.birthday
            this.form.nativePlace = obj.province 
            this.form.memSex = obj.gender == '男'?'M':'W'
            this.form.country = '中国'
            if (obj.region == null) {
              if (obj.city == null) {
                this.form.address = obj.province
              }else{
                this.form.address = obj.province + obj.city
              }
            }else{
              this.form.address = obj.province + obj.city + obj.region
            }
          }
        }
      })
    },
    memberCertificateType(){
      memberCertificateType().then(result => {
        this.certificateType = result.data
      })
    },
    agreementUnit(){
    },
    //获取会员等级集合
    getMemberGradeList(){
      //初始化会员等级
      listGrade().then(result => {
        var item = {
          gradePk:'',
          gradeName:'会员等级',
          cardFee:'',
          invalidDateCard:'',
        };
        var arr = [];
        arr.push(item);
        for (let index = 0; index < result.data.length; index++) {
          const element = result.data[index];
          arr.push(element);
        }
        this.memberLevel = arr;
      })
    },
    memberLevelChange(o){
      if(!o){
        console.log(this.form.gradePk)
        for (let index = 0; index < this.memberLevel.length; index++) {
          const element = this.memberLevel[index];
          if(this.form.gradePk == element.gradePk){
            if (element.cardFee <= '0') {
              if (this.$refs.chargeTypePkRef != undefined) {
                this.$refs.chargeTypePkRef.clearValidate()
              }
              this.form.chargeTypePk = ''
            }
            this.form.cardFee = element.cardFee
            this.form.invalidDateCard = element.invalidDateCard
          }
        }
      }
    },
    chargeTypeChange(o){
      if(!o){
        for (let index = 0; index < this.chargeType.length; index++) {
          const element = this.chargeType[index];
          if(this.form.chargeTypePk == element.id){
            console.log(element.accountNumber)
            this.form.accountNumber = element.accountNumber
          }
        }
      }
    },
    saveClick() {
      const self = this
      this.$refs["form"].validate((valid) => {
        if (valid) {
          self.loading = true
          this.form.cardFee = this.form.cardFee + ''
          addMember(this.form).then(result => {
            if(result.code == 1){
              self.$message({
                message: '操作成功',
                type: 'success'
              });
              self.loading = false
              self.empty()
            }
            self.loading = false
          }).finally(() => {
            self.$refs.form.clearValidate()
            self.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    empty() {
      this.form = this.form1
    },
    setCardInfo (data) {
      this.form.memName = data.peopleName
      this.form.certificateNo = data.peopleIdCode
      this.form.birthday = data.peopleBirthday
      this.form.address = data.peopleAddress
      this.form.memSex = data.peopleSex
      this.form.nationality = data.certType
      this.form.certificateType = 'TWO_IDENTITY'
      this.idcard(1)
    },
  }
}
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
.member-level {
  width: 95px;
}
.card-no {
  width: 204px;
}
.address {
  width: 501px;
}
.vilcen {
  height: 24px;
  padding-top: 5px;
  margin-left: -12px;
}
</style>
<style>
.menu-content {
    overflow: auto;
}
</style>