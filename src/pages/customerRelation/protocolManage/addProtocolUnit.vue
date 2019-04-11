<template>
    <!-- 添加修改协议单位 dialog -->
    <el-dialog :title="proDialogTitle" :visible.sync="dialogProtocolVisible" size="mini" class="addagreement" width="950px" top="10vh">
      <div class="body-conten">
        <el-form ref="form2" :model="form" :rules="rules" label-width="100px">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="名称" label-width="80px" prop="unitName" size="mini">
                <el-input v-model="form.unitName" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" label-width="80px" prop="contactName" size="mini">
                <el-input v-model="form.contactName" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px">
              <el-form-item label="电话" label-width="80px" prop="unitPhone" size="mini">
                <el-input v-model="form.unitPhone" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="手机号" label-width="80px" prop="contactPhone" size="mini">
                <el-input v-model="form.contactPhone" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="传真" label-width="80px" prop="fax" size="mini">
                <el-input v-model="form.fax" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px">
              <el-form-item label="邮箱" label-width="80px" prop="contactEmail" size="mini">
                <el-input v-model="form.contactEmail" style="width:224px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="地址" label-width="80px" prop="address" size="mini">
                <el-input v-model="form.address" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7.5">
              <el-form-item label="合同号" label-width="80px" prop="agreementCode" size="mini">
                <el-input v-model="form.agreementCode" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8.5">
              <el-form-item label="合同生效期" size="mini">
                   <!-- value-format="yyyy-MM-dd"  -->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.beginDate" value-format="yyyy-MM-dd" style="width:101px" :clearable="false"></el-date-picker>
                至
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" value-format="yyyy-MM-dd" style="width:101px" :clearable="false"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="挂账额度" label-width="80px" size="mini" style="margin-bottom: 0;" required>
                <el-input v-model="form.billPrice" type="number" :disabled="form.billFlag == 'N' ? true : false" style="width:194px">
                  <el-select v-model="form.billFlag" @change="billFlagChange" placeholder="请选择挂账" slot="prepend" style="width:66px">
                    <el-option label="可用" value="Y"></el-option>
                    <el-option label="不可用" value="N"></el-option>
                  </el-select>
                </el-input>
                <p style="color: #F56C6C;margin: 0;padding: 0;font-size: 12px;line-height: 16px">注:在可用的情况下0表示不限制额度</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号" label-width="80px" size="mini">
                <el-input v-model="form.bankAccount" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px">
              <el-form-item label="销售员" label-width="80px" size="mini">
                <el-select v-model="form.saleTypePk" placeholder="请选择销售员" style="width:224px">
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
                <el-input v-model="form.breakfastVoucherCount" type="number" style="width:194px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户等级" label-width="84px" size="mini">
                <el-select v-model="form.customerGrade" style="width:194px">
                  <el-option label="重大客户" :value="2"></el-option>
                  <el-option label="常规客户" :value="1"></el-option>
                  <el-option label="一般客户" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: -10px">
              <el-form-item label="审核状态" label-width="84px" size="mini">
                <el-select v-model="form.status" style="width:224px">
                  <el-option label="未审核" :value="0"></el-option>
                  <el-option label="已审核" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8" style="margin-left: -20px">
              <el-form-item label="是否房价保密" size="mini">
                <el-radio-group v-model="form.isPriceSecrecy">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="协议类别" size="mini">
                <el-select v-model="form.agreementTypePk" placeholder="请选择协议类别" style="width:194px">
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
              <el-input v-model="form.remark" style="width:822px" type="textarea" rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="24">
          ——————————————————————————————— 客户权益设置 ———————————————————————————
        </el-col>
        <el-col :span="24">
          <el-table
          :data="roomTypeOptions"
          stripe
          header-cell-class-name="header-row-style"
          style="width: 100%; margin-bottom: 10px"
          size="mini"
          class="price-table">
            <el-table-column label="房型" prop="typeName" width="150"></el-table-column>
            <el-table-column label="全价" prop="basePrice" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="起步价" prop="basePrice" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="单位时间加收价" prop="basePrice" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="加收封顶额" prop="basePrice" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="预收房费" prop="basePrice" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="basePrice" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.basePrice" type="number" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogProtocolVisible = false">取 消 </el-button>
        <el-button size="mini" type="primary" @click="preservationUnit('form',proDialogTitle)">保存协议单位</el-button>
      </div>
    </el-dialog>
</template>
<script>
import {listType} from '@/api/utils/pmsTypeController'
import {addProject,delProject,updateProject,listProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementController'
import {addPriceProject,delPriceProject,listPriceProject} from '@/api/customerRelation/ProtocolManage/pmsAgreementRoomPrice'
// import {powerJudge} from '@/utils/permissionsOperation.js'
import moment from "moment"
export default {
  data() {
    return {
      roomTypeOptions: [],
      agreementOptions: [],
      saleOptions: [],
      dialogProtocolVisible: false,
      loading: false,
      proDialogTitle: '',
      form: {//查询表单数据
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
        type:0
      },
      rules: {//表单验证
        agreementTypePk: [
          { required: true, message: '请选择协议分类', trigger: 'change' },
        ],
        unitName: [
          { required: true, message: '请请输入单位名称', trigger: 'blur' }
        ],
        saleTypePk: [
          { required: true, message: '请选择销售员', trigger: 'change' }
        ],
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
        // address: [
        //   { required: true, message: '详细地址', trigger: 'blur' }
        // ],
        // unitPhone: [
        //   { required: true, message: '单位电话', trigger: 'blur' }
        // ],
      },
      type:1
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
    },
    addProClick() {
      const self = this;
      this.dialogProtocolVisible = true
    //   self.form={};
      this.proDialogTitle = '添加协议单位'
    },
    editProClick(row) {
      const self = this;
      self.form = row;
      this.dialogProtocolVisible = true
      this.proDialogTitle = '修改协议单位'
    },
    preservationUnit(formName,proDialogTitle) {
      const self = this;
      this.$refs.form2.validate((valid) => {
        if (valid) {
          if(proDialogTitle == '添加协议单位'){
            self.form.agreementPk=null;
            self.form.type = self.type
            self.form.billPrice = Number(self.form.billPrice);
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
          }else{
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
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    listMastersType(i) {//查询分类类型
      const self = this;
      self.roomTypeOptions = [];
      self.agreementOptions = [];
      self.saleOptions = [];
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
          if(item.typeMaster == "ROOM_TYPE"){
            self.roomTypeOptions.push(item);
          }
          else if(item.typeMaster == "AGREEMENT"){
            self.agreementOptions.push(item);
          }
          else if(item.typeMaster == "SALE"){
            self.saleOptions.push(item);
          }
        })
        if(i){
          var now = new Date();
          now.setFullYear(now.getFullYear()+1);
            self.form =  {//查询表单数据
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
            }
        }

      // })
    },
    billFlagChange(val) {
      if (val == 'N') {
        this.form.billPrice = null;
      } else {
        this.form.billPrice = 0;
      }
    }
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
