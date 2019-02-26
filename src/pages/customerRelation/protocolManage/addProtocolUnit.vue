<template>
    <!-- 添加修改协议单位 dialog -->
    <el-dialog :title="proDialogTitle" :visible.sync="dialogProtocolVisible" size="mini" class="addagreement">
      <div class="body-conten">
        <el-form ref="form2" :model="form" :rules="rules" label-width="100px">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="协议分类" prop="agreementTypePk">
                <el-select v-model="form.agreementTypePk" placeholder="请选择协议分类" style="width:178px" clearable>
                  <el-option
                    v-for="items in agreementOptions"
                    :key="items.typePk"
                    :label="items.typeName"
                    :value="items.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位名称" prop="unitName">
                <el-input v-model="form.unitName" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>  
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="行业分类" prop="industryTypePk">
                <el-select v-model="form.industryTypePk" placeholder="请选择行业分类" style="width:178px">
                  <el-option
                    v-for="item in industryOptions"
                    :key="item.typePk"
                    :label="item.typeName"
                    :value="item.typePk">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="销售员" prop="saleTypePk">
                <el-select v-model="form.saleTypePk" placeholder="请选择销售员" style="width:178px">
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
            <el-col :span="11"> 
              <el-form-item label="价格方案" prop="priceSchemePk">
                <el-select v-model="form.priceSchemePk" placeholder="请选择价格方案" style="width:178px">
                  <el-option label="方案一" value="fanganyi"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="协议号" prop="agreementCode"> 
                <el-input v-model="form.agreementCode" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col> 
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="生效日期" prop="beginDate">
                   <!-- value-format="yyyy-MM-dd"  -->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.beginDate" value-format="yyyy-MM-dd" style="width:178px"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="失效日期" prop="endDate">
                   <!-- value-format="yyyy-MM-dd" -->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" value-format="yyyy-MM-dd" style="width:178px"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="挂账" prop="billFlag">
                <el-select v-model="form.billFlag" @change="billFlagChange" placeholder="请选择挂账" style="width:178px">
                  <el-option label="可用" value="Y"></el-option>
                  <el-option label="不可用" value="N"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="挂账限额" prop="billPrice" style="margin-bottom: 0;">
                <el-input v-model="form.billPrice" :disabled="form.billFlag == 'N' ? true : false" style="width:178px"></el-input>
                <span style="color:red;">注:0标识不限制额度</span>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="单位传真" prop="fax">
                <el-input v-model="form.fax" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人" prop="contactName">
                <el-input v-model="form.contactName" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="联系人职务" prop="contactPost">
                <el-input v-model="form.contactPost" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系人手机" prop="contactPhone">
                <el-input v-model="form.contactPhone" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="单位电话" prop="unitPhone">
                <el-input v-model="form.unitPhone" style="width:178px"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
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
      industryOptions: [], 
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
        industryTypePk: '',
        priceSchemePk: '',
        saleTypePk: '',
        sortNum: 0,
        unitName: '',
        unitPhone: '',
      },
      rules: {//表单验证
        agreementTypePk: [
          { required: true, message: '请选择协议分类', trigger: 'change' },
        ],
        unitName: [
          { required: true, message: '请请输入单位名称', trigger: 'blur' }
        ],          
        industryTypePk: [
          { required: true, message: '请选择行业分类', trigger: 'change' }
        ],
        saleTypePk: [
          { required: true, message: '请选择销售员', trigger: 'change' }
        ],
        priceSchemePk: [
          { required: true, message: '请选择价格方案', trigger: 'change' }
        ],   
        // agreementCode: [
        //   { required: true, message: '请输入协议号', trigger: 'blur' }
        // ],
        beginDate: [
          {type: 'string',  required: true, message: '选择日期', trigger: 'change' }
        ],
        endDate: [
          {type: 'string',  required: true, message: '选择日期', trigger: 'change' }
        ],
        billFlag: [
          { required: true, message: '请选择挂账', trigger: 'change' }
        ],
        billPrice: [
          { required: true, message: '请输入挂账限额', trigger: 'blur' }
        ],                      
        // fax: [
        //   { required: true, message: '请输入单位传真', trigger: 'blur' }
        // ],
        // contactName: [
        //   { required: true, message: '请输入联系人', trigger: 'blur' }
        // ],
        // contactPost: [
        //   { required: true, message: '请输入联系人职务', trigger: 'blur' }
        // ],
        // contactPhone: [
        //   { required: true, message: '联系人手机', trigger: 'blur' }
        // ],
        // address: [
        //   { required: true, message: '详细地址', trigger: 'blur' }
        // ],
        // unitPhone: [
        //   { required: true, message: '单位电话', trigger: 'blur' }
        // ],
      },
    };
  },
  created () {
    this.listMastersType();
  },
  methods: {
    init() {
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
      self.industryOptions = [];
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
          else if(item.typeMaster == "INDUSTRY"){
            self.industryOptions.push(item);
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
                industryTypePk: self.industryOptions.length>0?self.industryOptions[0].typePk:null,
                priceSchemePk: 'fanganyi',
                saleTypePk: self.saleOptions.length>0?self.saleOptions[0].typePk:null,
                sortNum: 0,
                unitName: '',
                unitPhone: '',
            }
        }
        
      // })
    },
    billFlagChange(val) {
      if (val == 'N') {
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
</style>
