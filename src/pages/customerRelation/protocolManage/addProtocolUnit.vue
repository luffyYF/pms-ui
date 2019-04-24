<template>
    <!-- 添加修改协议单位 dialog -->
    <el-dialog :title="proDialogTitle" :visible.sync="dialogProtocolVisible" size="mini" class="addagreement" width="950px" top="10vh">
      <div class="body-conten">
        <el-form ref="form2" :model="form.agreementPo" :rules="rules" label-width="100px">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="名称" label-width="80px" prop="unitName" size="mini">
                <el-input v-model="form.agreementPo.unitName" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="type == 0">
              <el-form-item label="所属类别" label-width="80px" size="mini" prop="agreementTypePk">
                <el-select v-model="form.agreementPo.agreementTypePk" placeholder="请选择所属类别" style="width:194px">
                  <el-option label="网络中介" value="0"></el-option>
                  <el-option label="旅行社" value="1"></el-option>
                  <el-option label="本地中介" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-if="type == 0">
              <el-form-item label="联系人" label-width="80px" prop="contactName" size="mini">
                <el-input v-model="form.agreementPo.contactName" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
              <el-form-item label="联系人" label-width="80px" prop="contactName" size="mini">
                <el-input v-model="form.agreementPo.contactName" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-if="type == 1">
              <el-form-item label="电话" label-width="80px" prop="unitPhone" size="mini">
                <el-input v-model="form.agreementPo.unitPhone" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" v-if="type == 0">
              <el-form-item label="电话" label-width="80px" prop="unitPhone" size="mini">
                <el-input v-model="form.agreementPo.unitPhone" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" label-width="80px" prop="contactPhone" size="mini">
                <el-input v-model="form.agreementPo.contactPhone" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="type == 1">
              <el-form-item label="传真" label-width="80px" prop="fax" size="mini">
                <el-input v-model="form.agreementPo.fax" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-else>
              <el-form-item label="传真" label-width="80px" prop="fax" size="mini">
                <el-input v-model="form.agreementPo.fax" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-if="type == 1">
              <el-form-item label="邮箱" label-width="80px" prop="contactEmail" size="mini">
                <el-input v-model="form.agreementPo.contactEmail" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" v-if="type == 0">
              <el-form-item label="邮箱" label-width="80px" prop="contactEmail" size="mini">
                <el-input v-model="form.agreementPo.contactEmail" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" label-width="80px" prop="address" size="mini" v-if="type == 1">
                <el-input v-model="form.agreementPo.address" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7.5">
              <el-form-item label="合同号" label-width="80px" prop="agreementCode" size="mini">
                <el-input v-model="form.agreementPo.agreementCode" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8.5">
              <el-form-item label="合同生效期" size="mini">
                <!-- value-format="yyyy-MM-dd"  -->
                <el-date-picker
                  v-model="selectDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  style="width:224px"
                  :clearable="type == 0"
                  :picker-options="pickerOptions"
                  @change="handleChange">
                </el-date-picker>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.agreementPo.beginDate" value-format="yyyy-MM-dd" style="width:101px" :clearable="false"></el-date-picker>
                至
                <el-date-picker type="date" placeholder="选择日期" v-model="form.agreementPo.endDate" value-format="yyyy-MM-dd" style="width:101px" :clearable="false"></el-date-picker> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="挂账额度" label-width="80px" size="mini" style="margin-bottom: 0;" required>
                <el-input v-model="form.agreementPo.billPrice" type="number" :disabled="form.agreementPo.billFlag == 'N' ? true : false" style="width:194px">
                  <el-select v-model="form.agreementPo.billFlag" @change="billFlagChange" placeholder="请选择挂账" slot="prepend" style="width:66px">
                    <el-option label="可用" value="Y"></el-option>
                    <el-option label="不可用" value="N"></el-option>
                  </el-select>
                </el-input>
                <p style="color: #F56C6C;margin: 0;padding: 0;font-size: 12px;line-height: 16px">注:在可用的情况下0表示不限制额度</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号" label-width="80px" size="mini">
                <el-input v-model="form.agreementPo.bankAccount" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px">
              <el-form-item label="销售员" label-width="80px" size="mini">
                <el-select v-model="form.agreementPo.saleTypePk" placeholder="请选择销售员" style="width:224px">
                  <el-option
                    v-for="item in saleOptions"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" style="margin-left: -4px">
              <el-form-item label="早餐券数量" label-width="84px" size="mini">
                <el-input v-model="form.agreementPo.breakfastVoucherCount" type="number" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-if="type == 0">
              <el-form-item label="是否房价保密" size="mini">
                <el-radio-group v-model="form.agreementPo.isPriceSecrecy">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="type == 1">
              <el-form-item label="客户等级" label-width="84px" size="mini">
                <el-select v-model="form.agreementPo.customerGrade" style="width:194px">
                  <el-option label="重大客户" :value="2"></el-option>
                  <el-option label="常规客户" :value="1"></el-option>
                  <el-option label="一般客户" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px" v-if="type == 1">
              <el-form-item label="审核状态" label-width="84px" size="mini">
                <el-select v-model="form.agreementPo.status" style="width:224px">
                  <el-option label="未审核" :value="0"></el-option>
                  <el-option label="已审核" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" style="margin-left: -20px" v-if="type == 1">
              <el-form-item label="是否房价保密" size="mini">
                <el-radio-group v-model="form.agreementPo.isPriceSecrecy">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="type == 1">
              <el-form-item label="协议类别" size="mini">
                <el-select v-model="form.agreementPo.agreementTypePk" placeholder="请选择协议类别" style="width:194px">
                  <el-option
                    v-for="items in agreementOptions"
                    :key="items.typePk"
                    :label="items.typeName"
                    :value="items.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" label-width="80px">
              <el-input v-model="form.agreementPo.remark" style="width:822px" type="textarea" rows="3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="type == 0">
            ——————————————————————————————— 返佣设置 —————————————————————————————
          </el-col>
          <el-col :span="24" v-if="type == 0">
            <el-col :span="8">
              <el-form-item label="返佣模式" label-width="80px" size="mini">
                <el-select v-model="form.agreementPo.returnMode" placeholder="请选择返佣模式" @change="handleChangeMode" style="width:194px">
                  <el-option label="无" :value="0"></el-option>
                  <el-option label="按房费" :value="1"></el-option>
                  <el-option label="按间夜" :value="2"></el-option>
                  <el-option label="固定额" :value="3"></el-option>
                  <el-option label="协议方式" :value="4"></el-option>
                  <el-option label="按消费" :value="5"></el-option>
                  <el-option label="按挂账额度" :value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="20px" size="mini">
                <el-input v-model="form.agreementPo.price" type="number" size="mini" min="0" step="1" style="width:64px" v-if="form.agreementPo.returnMode != 0 && form.agreementPo.returnMode != 3 && form.agreementPo.returnMode != 4"/>
                返
                <el-input v-model="form.agreementPo.rebatePrice" type="number" size="mini" min="0" step="1" style="width:64px" :disabled="form.agreementPo.returnMode == 0"/>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            —————————————————————————————— 客户权益设置 ————————————————————————————
          </el-col>
          <el-col :span="24" style="margin-top: 10px">
            <el-form-item label="入住标准" label-width="82px" prop="rulePk" size="mini">
              <el-select v-model="form.agreementPo.rulePk" placeholder="请选择入住标准" style="width:194px">
                <el-option v-for="item in ruleData" :key="item.rulePk" :label="item.ruleName" :value="item.rulePk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="24">
          <el-table
          :data="form.roomTypePricePos"
          stripe
          header-cell-class-name="header-row-style"
          style="width: 100%; margin-bottom: 10px"
          size="mini"
          class="price-table">
            <el-table-column label="房型" prop="typeName" width="150"></el-table-column>
            <el-table-column label="全价" prop="price" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" type="number" size="mini" min="0" step="0.1"/>
              </template>
            </el-table-column>
            <el-table-column label="起步价" prop="beginPrice" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.beginPrice" type="number" size="mini" min="0" step="0.1"/>
              </template>
            </el-table-column>
            <el-table-column label="单位时间加收价" prop="unitPrice" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.unitPrice" type="number" size="mini" min="0" step="0.1"/>
              </template>
            </el-table-column>
            <el-table-column label="加收封顶额" prop="cappingPrice" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cappingPrice" type="number" size="mini" min="0" step="0.1"/>
              </template>
            </el-table-column>
            <el-table-column label="预收房费" prop="roomPrice" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.roomPrice" type="number" size="mini" min="0" step="0.1"/>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" type="text" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogProtocolVisible = false">取 消 </el-button>
        <el-button size="mini" type="primary" @click="preservationUnit('form',proDialogTitle)">{{btnName}}</el-button>
      </div>
    </el-dialog>
</template>
<script>
import {listType, roomTypeList} from '@/api/utils/pmsTypeController'
import {addProject,delProject,updateProject,listProject, detailProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import {addPriceProject,delPriceProject,listPriceProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementRoomPrice'
import { dailyRoomRuleList } from "@/api/systemSet/pmsDailyRoomController";
// import {powerJudge} from '@/utils/permissionsOperation.js'
import moment from "moment"

export default {
  data() {
    return {
      agreementOptions: [],
      saleOptions: [],
      dialogProtocolVisible: false,
      loading: false,
      proDialogTitle: '',
      btnName: '',
      form: {
        agreementPo: {//查询表单数据
          address: '',
          agreementCode: '',
          agreementPk: '',
          agreementTypePk: '',
          beginDate: moment().format("YYYY-MM-DD") ,
          billFlag: 'Y',
          billPrice: 0,
          companyPk: '',
          contactName: '',
          contactPhone: '',
          contactPost: '',
          endDate:  moment().format("YYYY-MM-DD"),
          fax: '',
          saleTypePk: '',
          sortNum: 0,
          unitName: '',
          unitPhone: '',
          contactEmail: '',
          bankAccount: '',
          breakfastVoucherCount: 0,
          customerGrade: 0,
          status: 0,
          isPriceSecrecy: 0,
          remark: '',
          type:0,
          returnMode: 0,
          price: 0,
          rebatePrice: 0,
          rulePk: null,
        },
        roomTypePricePos: []
      },
      rules: {//表单验证
        agreementTypePk: [
          { required: true, message: '请选择所属类别', trigger: 'change' },
        ],
        unitName: [
          { required: true, message: '请请输入单位名称', trigger: 'blur' }
        ],
        // saleTypePk: [
        //   { required: true, message: '请选择销售员', trigger: 'change' }
        // ],
        // agreementCode: [
        //   { required: true, message: '请输入协议号', trigger: 'blur' }
        // ],
        billFlag: [
          { required: true, message: '请选择挂账', trigger: 'change' }
        ],
        billPrice: [
          { required: true, message: '请输入挂账限额', trigger: 'blur' }
        ],
        // fax: [
        //   { required: true, message: '请输入单位传真', trigger: 'blur' }
        // ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        // contactPost: [
        //   { required: true, message: '请输入联系人职务', trigger: 'blur' }
        // ],
        contactPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        rulePk: [
          { required: true, message: '请选择入住标准', trigger: 'change' },
        ],
        // address: [
        //   { required: true, message: '详细地址', trigger: 'blur' }
        // ],
        // unitPhone: [
        //   { required: true, message: '单位电话', trigger: 'blur' }
        // ],
      },
      type:1,
      selectDate: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      ruleData: [],
    };
  },
  created () {
    this.listMastersType();
  },
  methods: {
    init(type) {
      this.type = type
      if (this.$refs.form2 != undefined) {
        this.$refs.form2.clearValidate()
      }
      this.listMastersType(1)
      this.addProClick()
      this.getRule()
    },
    addProClick() {
      const self = this;
      this.dialogProtocolVisible = true
    //   self.form={};
      if (self.type == 1) {
        this.proDialogTitle = '添加协议单位'
        this.btnName = '保存协议单位'
      } else {
        this.proDialogTitle = '添加中介'
        this.btnName = '保存中介'
      }
    },
    editProClick(row, type) {
      const self = this;
      self.type = type
      this.dialogProtocolVisible = true
      if (self.type == 1) {
        this.proDialogTitle = '修改协议单位'
        this.btnName = '修改协议单位'
      } else {
        this.proDialogTitle = '修改中介'
        this.btnName = '修改中介'
      }
      this.getRule()
      detailProject({agreementPk: row.agreementPk}).then(res => {
        if (res.data.roomTypePricePos.length == 0) {
            this.roomTypeList();
        }
        res.data.roomTypePricePos.forEach(item=> {
          if (item.pricePk == null) {
            item.basePrice = 0
            item.price = 0
            item.beginPrice = 0
            item.unitPrice = 0
            item.cappingPrice = 0
            item.roomPrice = 0
            item.remark = ''
          }
        })
        self.form = res.data
      })
    },
    preservationUnit(formName,proDialogTitle) {
      const self = this;
      this.$refs.form2.validate((valid) => {
        if (valid) {
          if(self.form.agreementPo.agreementPk){
            updateProject(self.form).then(result => {
              if(result.code == 1){
                self.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.dialogProtocolVisible = false;
                this.$emit('callback',1)
              }
            })
          }else{
            self.form.agreementPo.agreementPk=null;
            self.form.agreementPo.type = self.type
            self.form.agreementPo.billPrice = Number(self.form.agreementPo.billPrice);
            addProject(self.form).then(result => {
              if(result.code == 1){
                self.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogProtocolVisible = false;
                this.$emit('callback',1)
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    listMastersType(i) {//查询分类类型
      const self = this;
      self.form.roomTypePricePos = [];
      self.agreementOptions = [];
      self.saleOptions = [];
      this.roomTypeList();
      // listType({typeMasters: 'ROOM_TYPE,AGREEMENT,INDUSTRY,SALE'}).then(result => {
        // const listTypeData = result.data.data;
        // for (let index = 0; index < listTypeData.length; index++) {
        //   const element = listTypeData[index].typeMaster;
        //   if(element == 'ROOM_TYPE'){
        //     self.roomTypeOptions.push(listTypeData[index])
        //   }else if(element == 'AGREEMENT'){
        //     self.agreementOptions.push(listTypeData[index]);
        //   }else if(element == 'INDUSTRY'){
        //     self.industryOptions.push(listTypeData[index]);
        //   }else{
        //     self.saleOptions.push(listTypeData[index]);
        //   }
        // }
        var typeList = JSON.parse(localStorage.getItem("pms_type"))
        typeList.forEach(item=> {
          if(item.typeMaster == "AGREEMENT"){
            self.agreementOptions.push(item);
          }
          else if(item.typeMaster == "SALE"){
            self.saleOptions.push(item);
          }
        })
        if(i){
          var now = new Date();
          now.setFullYear(now.getFullYear()+1);
            self.form.agreementPo =  {//查询表单数据
                address: '',
                agreementCode: '',
                agreementPk: '',
                agreementTypePk: self.agreementOptions.length>0?self.agreementOptions[0].typePk:null,
                beginDate: moment().format("YYYY-MM-DD") ,
                billFlag: 'Y',
                billPrice: 0,
                companyPk: '',
                contactName: '',
                contactPhone: '',
                contactPost: '',
                endDate:  moment(now).format("YYYY-MM-DD"),
                fax: '',
                saleTypePk: null,
                sortNum: 0,
                unitName: '',
                unitPhone: '',
                contactEmail: '',
                bankAccount: '',
                breakfastVoucherCount: 0,
                customerGrade: 0,
                status: 0,
                isPriceSecrecy: 0,
                remark: '',
                type:0,
                returnMode: 0,
                price: 0,
                rebatePrice: 0,
                rulePk: null,
            }
            if (this.type == 1) {
              this.selectDate.push(self.form.agreementPo.beginDate)
              this.selectDate.push(self.form.agreementPo.endDate)
            } else {
              self.form.agreementPo.beginDate = null
              self.form.agreementPo.endDate = null
              self.form.agreementPo.agreementTypePk = ''
            }
        }

      // })
    },
    billFlagChange(val) {
      if (val == 'N') {
        this.form.agreementPo.billPrice = null;
      } else {
        this.form.agreementPo.billPrice = 0;
      }
    },
    handleChange (val) {
      if (val == null) {
        this.form.agreementPo.beginDate = ''
        this.form.agreementPo.endDate = ''
      } else {
        this.form.agreementPo.beginDate = val[0]
        this.form.agreementPo.endDate = val[1]
      }
    },
    handleChangeMode (val) {
      if (val == 0) {
        this.form.agreementPo.price = 0
        this.form.agreementPo.rebatePrice = 0
      }
    },
    roomTypeList () {
      roomTypeList({typeMaster: 'ROOM_TYPE'}).then(result => {
        result.data.data.forEach(element => {
          if (element.pricePk == null) {
            element.basePrice = 0
            element.price = 0
            element.beginPrice = 0
            element.unitPrice = 0
            element.cappingPrice = 0
            element.roomPrice = 0
          }
          element.remark = ''
        });
        this.form.roomTypePricePos = result.data.data
      })
    },
    getRule() {
      dailyRoomRuleList().then(res=>{
        this.ruleData = res.data
      })
    },
  }
};
</script>

<style scoped>
.bg-reserve {
  position: relative;
  background: #f7f7f7;
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
  background: #f7f7f7;
}
.el-select {
  width: 178px;
}
.el-date-editor.el-input {
  width: 178px;
}
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
.body-conten{
  position: relative;
  width: 100%;
  background: #f7f7f7;
}
.protocolPrice-tabs{
  box-shadow: none;
}
.addPriceBtn{
  position: absolute;
  z-index: 999;
  top: 6px;
  margin-left: 300px;
}
.fontColor{
  color: red;
  font-style: normal;
}
.distance{
  margin: 0;
}
.width-ipt{
  width: 60px;
}
.price-li{
  width: 60px;
  display: inline-block;
  text-align: center;
}
.positions {
  float: right;
}
</style>
<style>
.protocolPrice-contenter .el-dialog .el-dialog__body {
    padding: 0;
}
.el-dialog{
  width:680px;
}
.price-table .header-row-style {
  background: #f5f7fa;
  color: #909399;
}
</style>
