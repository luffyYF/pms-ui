// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="960px"
             :close-on-click-modal="false" :before-close="handleClose">
    <div class="body-conten">
      <el-form ref="dataForm" :model="dataForm.gradePo" :rules="rules" label-width="106px">
        <el-col :span="24">
          —————————————————————————————— 会员信息设置 —————————————————————————————
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-col :span="8">
            <el-form-item label="名称" label-width="70px" prop="gradeName" size="mini">
              <el-input v-model="dataForm.gradePo.gradeName" style="width:194px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="等级" label-width="70px" size="mini" prop="gradeLevel">
              <el-input v-model="dataForm.gradePo.gradeLevel" type="number" min="0" step="1" style="width:194px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡费" label-width="70px" size="mini">
              <el-input v-model="dataForm.gradePo.cardFee" type="number" min="0" step="1" style="width:194px" @blur="handleBlur(dataForm.gradePo.cardFee, 1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="赠送积分" label-width="70px" size="mini">
              <el-input v-model="dataForm.gradePo.registerIntegral" type="number" min="0" step="1" style="width:194px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" label-width="70px" size="mini">
              <el-checkbox v-model="dataForm.gradePo.rechargeFlag" true-label="Y" false-label="N">是否可充值</el-checkbox>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" label-width="70px">
            <el-input v-model="dataForm.gradePo.remark" style="width:807px" type="textarea" rows="3"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          —————————————————————————————— 升级规则设置 —————————————————————————————
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-col :span="8">
            <el-form-item label="升级后级别" prop="upgradeMemPk" size="mini">
              <el-select v-model="dataForm.gradePo.upgradeMemPk" placeholder="请选择升级后级别" @change="handleChange" style="width:194px">
                <el-option v-for="item in options" :key="item.gradePk" :label="item.gradeName" :value="item.gradePk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="累计积分要求" size="mini" :prop="dataForm.gradePo.upgradeMemPk == '0' ? '' : 'accumulatedPoints'">
              <el-input v-model="dataForm.gradePo.accumulatedPoints" type="number" min="0" step="1" style="width:194px" :disabled="dataForm.gradePo.upgradeMemPk == '0'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="累计储值要求" size="mini">
              <el-input v-model="dataForm.gradePo.accumulatedValue" type="number" min="0" step="1" style="width:194px" :disabled="dataForm.gradePo.upgradeMemPk == '0'"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="升级积分扣除" size="mini">
              <el-input v-model="dataForm.gradePo.upgradePointsDeduction" type="number" min="0" step="1" style="width:194px" :disabled="dataForm.gradePo.upgradeMemPk == '0'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="升级卡费扣除" size="mini">
              <el-input v-model="dataForm.gradePo.upgradeCardFeeDeduction" type="number" min="0" step="1" style="width:194px" :disabled="dataForm.gradePo.upgradeMemPk == '0'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" size="mini">
              <el-checkbox v-model="dataForm.gradePo.autoUpgradeFlag" true-label="Y" false-label="N" v-if="dataForm.gradePo.upgradeMemPk != '0'">是否自动升级</el-checkbox>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          —————————————————————————————— 客户权益设置 —————————————————————————————
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-col :span="12">
            <el-form-item label="入住标准" label-width="82px" prop="rulePk" size="mini">
              <el-select v-model="dataForm.gradePo.rulePk" placeholder="请选择升级后级别" style="width:194px">
                <el-option v-for="item in ruleData" :key="item.rulePk" :label="item.ruleName" :value="item.rulePk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总房费折扣" label-width="90px" size="mini" style="float: right">
              <el-input v-model="dataForm.gradePo.discount" type="number" min="0" max="10" step="1" style="width:194px" @blur="handleBlur(dataForm.gradePo.discount, 2)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <el-col :span="24">
        <el-table
        :data="dataForm.memberRoomTypePricePos"
        stripe
        header-cell-class-name="header-row-style"
        style="width: 100%; margin-bottom: 10px"
        size="mini"
        class="price-table">
          <el-table-column label="房型" prop="typeName" width="130"></el-table-column>
          <el-table-column label="全价" prop="price" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" type="number" size="mini" min="0" step="0.1"/>
            </template>
          </el-table-column>
          <el-table-column label="起步价" prop="beginPrice" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beginPrice" type="number" size="mini" min="0" step="0.1"/>
            </template>
          </el-table-column>
          <el-table-column label="单位时间加收价" prop="unitPrice" width="110">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unitPrice" type="number" size="mini" min="0" step="0.1"/>
            </template>
          </el-table-column>
          <el-table-column label="加收封顶额" prop="cappingPrice" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cappingPrice" type="number" size="mini" min="0" step="0.1"/>
            </template>
          </el-table-column>
          <el-table-column label="预收房费" prop="roomPrice" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.roomPrice" type="number" size="mini" min="0" step="0.1"/>
            </template>
          </el-table-column>
          <el-table-column label="早餐券数量" prop="numberOfBreakfast" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.numberOfBreakfast" type="number" size="mini" min="0" step="1"/>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="saveData" :loading="loading">{{dataForm.gradePo.gradePk == null ? '保存' : '修改'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>  
import {peiceList,priceSetting,findGrade,addGrade,updateGrade} from '@/api/systemSet/member/pmsMemberGradeController'
import {roomTypeList} from '@/api/utils/pmsTypeController'
import { dailyRoomRuleList } from "@/api/systemSet/pmsDailyRoomController";

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
          gradePo: {
            gradePk: null,
            gradeName: null,
            gradeLevel: null,
            autoUpgradeFlag: 'N',
            upgradeMemPk: null,
            accumulatedPoints: null,
            accumulatedValue: null,
            upgradePointsDeduction: null,
            upgradeCardFeeDeduction: null,
            registerIntegral: 0,
            cardFee: null,
            rechargeFlag: 'N',
            overdrawFlag: 'N',
            status: 1,
            remark: null,
            rulePk: null,
            discount: 10.00
          },
          memberRoomTypePricePos: []
        },
        title:"",
        rules: {//表单验证
          gradeName: [
            { required: true, message: '请填写名称', trigger: 'blur' },
          ],
          gradeLevel: [
            { required: true, message: '请填写等级', trigger: 'blur' }
          ],
          upgradeMemPk: [
            { required: true, message: '请选择升级后级别', trigger: 'change' },
          ],
          accumulatedPoints: [
            { required: true, message: '请填写累计积分要求', trigger: 'blur' }
          ],
          rulePk: [
            { required: true, message: '请选择入住标准', trigger: 'change' }
          ],
        },
        options: [],
        ruleData: [],
      }
    },
    methods: {
      showDialog (id, option) {
        if (id) {
          this.title = '修改会员级别'
          for (let i = 0; i < option.length; i++) {
            if (option[i].gradePk == id) {
              option.splice(i, 1)
            }
          }
          this.findGrade(id)
          this.peiceList(id)
        } else {
          this.title = '添加会员级别'
          this.resetForm()
          this.roomTypeList()
        }
        if (this.$refs.dataForm != undefined) {
          this.$refs.dataForm.clearValidate()
        }
        this.getRule()
        this.options = option
        this.dialogVisible = true
      },
      resetForm () {
        this.dataForm.gradePo = {
          gradePk: null,
          gradeName: null,
          gradeLevel: null,
          autoUpgradeFlag: 'N',
          upgradeMemPk: null,
          accumulatedPoints: null,
          accumulatedValue: null,
          upgradePointsDeduction: null,
          upgradeCardFeeDeduction: null,
          registerIntegral: 0,
          cardFee: null,
          rechargeFlag: 'N',
          overdrawFlag: 'N',
          status: 1,
          remark: null,
          rulePk: null,
          discount: 10.00
        }
      },
      findGrade (gradePk) {
        findGrade({gradePk: gradePk}).then(res => {
          this.dataForm.gradePo = res.data
        })
      },
      peiceList(gradePk){
        const self = this
        self.dataForm.memberRoomTypePricePos = []
        peiceList({gradePk: gradePk}).then(result => {
          result.data.forEach(item => {
            if (item.pricePk == null) {
              item.basePrice = 0
              item.price = 0
              item.beginPrice = 0
              item.unitPrice = 0
              item.cappingPrice = 0
              item.roomPrice = 0
              item.remark = ''
            }
          });
          self.dataForm.memberRoomTypePricePos = result.data
        })
      },
      saveData(){ 
        const self = this;
        self.loading = true
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if(self.dataForm.gradePo.gradePk == null){
              addGrade(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }else{
              updateGrade(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }
          } else {
            self.loading = false
          }
        });
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
      },
      roomTypeList () {
        this.dataForm.memberRoomTypePricePos = []
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
            element.numberOfBreakfast = 0
            element.remark = ''
          });
          this.dataForm.memberRoomTypePricePos = result.data.data
        })
      },
      getRule() {
        dailyRoomRuleList().then(res=>{
          this.ruleData = res.data
        })
      },
      handleBlur (val, index) {
        console.log(val)
        if (index == 1) {
          if (val == '') {
            this.dataForm.gradePo.cardFee = 0
          }
        } else {
          if (val > 10) {
            this.dataForm.gradePo.discount = 10
          }
          if (val == '') {
            this.dataForm.gradePo.discount = 1
          }
        }
      },
      handleChange (val) {
        if (val == '0') {
          this.dataForm.gradePo.autoUpgradeFlag = 'N'
          this.dataForm.gradePo.accumulatedPoints = null
          this.dataForm.gradePo.accumulatedValue = null
          this.dataForm.gradePo.upgradePointsDeduction = null
          this.dataForm.gradePo.upgradeCardFeeDeduction = null
        }
      },
    }
  }
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
.price-table .header-row-style {
  background: #f5f7fa;
  color: #909399;
}
</style>