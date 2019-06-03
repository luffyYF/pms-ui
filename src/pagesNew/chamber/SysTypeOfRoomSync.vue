 // 同步数据编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" title="同步房型价格" top="100px" :visible.sync="dialogVisible" width="990px"
             :close-on-click-modal="false" :before-close="handleClose">
    <div class="body-conten">
      <el-row>
        <el-col :span="24">
          <el-table
          :data="dataForm.typePricePos"
          stripe
          header-cell-class-name="header-row-style"
          style="width: 100%; margin-bottom: 10px"
          size="mini"
          class="price-table">
            <el-table-column label="房型" prop="typeName" width="126"></el-table-column>
            <el-table-column label="全价" prop="price" width="110">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.price" controls-position="right" size="mini" :min="0" :step="1" :precision="2" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="起步价" prop="beginPrice" width="110">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.beginPrice" controls-position="right" size="mini" :min="0" :step="1" :precision="2" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="单位时间加收价" prop="unitPrice" width="118">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.unitPrice" controls-position="right" size="mini" :min="0" :step="1" :precision="2" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="加收封顶额" prop="cappingPrice" width="110">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.cappingPrice" controls-position="right" size="mini" :min="0" :step="1" :precision="2" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="预收房费" prop="roomPrice" width="110">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.roomPrice" controls-position="right" size="mini" :min="0" :step="1" :precision="2" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="早餐券数量" prop="numberOfBreakfast" width="110">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.numberOfBreakfast" controls-position="right" size="mini" :min="0" :step="1" class="number-style"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" min-width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" type="text" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin: 30px 0 15px">
        ————————————————————————————— 选择要同步的会员等级 ———————————————————————————
      </el-row>
      <el-row>
        <el-checkbox :indeterminate="gradeFlag" v-model="checkGrade" @change="handleCheckGradeChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="dataForm.gradePos" @change="handleCheckedGradeChange">
          <el-checkbox style="margin: 10px 20px;" v-for="gradePo in gradeData" :label="gradePo.gradePk" :key="gradePo.gradePk">{{gradePo.gradeName}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row style="margin: 30px 0 15px">
        ————————————————————————————— 选择要同步的协议单位 ———————————————————————————
      </el-row>
      <el-row>
        <el-checkbox :indeterminate="agreementFlag" v-model="checkAgreement" @change="handleCheckAgreementChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="dataForm.agreementPos" @change="handleCheckedAgreementChange">
          <el-checkbox style="margin: 10px 20px;" v-for="agreementPo in agreementData" :label="agreementPo.agreementPk" :key="agreementPo.agreementPk">{{agreementPo.unitName}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row style="margin: 30px 0 15px">
        —————————————————————————————— 选择要同步的中介 ————————————————————————————
      </el-row>
      <el-row>
        <el-checkbox :indeterminate="intermediaryFlag" v-model="checkIntermediary" @change="handleCheckIntermediaryChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="dataForm.intermediaryPos" @change="handleCheckedIntermediaryChange">
          <el-checkbox style="margin: 10px 20px;" v-for="intermediaryPo in intermediaryData" :label="intermediaryPo.agreementPk" :key="intermediaryPo.agreementPk">{{intermediaryPo.unitName}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="saveData" :loading="loading">同 步</el-button>
    </span>
  </el-dialog>
</template>

<script>  
import { syncRoomTypePrice } from '@/api/utils/pmsTypeController'
import { listGrade } from '@/api/systemSet/member/pmsMemberGradeController'
import { allAgreement } from '@/api/customerRelation/ProtocolManage/pmsAgreementController'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
          typePricePos: [],
          gradePos: [],
          agreementPos: [],
          intermediaryPos: [],
        },
        gradeFlag: false,
        checkGrade: false,
        gradeData: [],
        agreementFlag: false,
        checkAgreement: false,
        agreementData: [],
        intermediaryFlag: false,
        checkIntermediary: false,
        intermediaryData: [],
      }
    },
    methods: {
      showDialog (data) {
        this.dataForm.typePricePos = []
        this.dataForm.typePricePos.push({
          typePk: data.typePk,
          typeName: data.typeName,
          price: data.price,
          beginPrice: data.beginPrice,
          unitPrice: data.unitPrice,
          cappingPrice: data.cappingPrice,
          roomPrice: data.roomPrice,
          numberOfBreakfast: data.numberOfBreakfast,
          remark: data.remark,
        })
        this.agreementData = []
        this.intermediaryData = []
        this.listGrade()
        this.agreementList()
        this.dialogVisible = true
      },
      listGrade(){
        listGrade().then(result => {
          this.gradeData = result.data
        })
      },
      handleCheckGradeChange (val) {
        if (val == true) {
          this.gradeData.forEach(item => {
            this.dataForm.gradePos.push(item.gradePk)
          })
        } else {
          this.dataForm.gradePos = []
        }
        this.gradeFlag = false
      },
      handleCheckedGradeChange(value) {
        let checkedCount = value.length;
        this.checkGrade = checkedCount === this.gradeData.length;
        this.gradeFlag = checkedCount > 0 && checkedCount < this.gradeData.length;
      },
      agreementList() {//查询列表
        allAgreement().then(res => {
          res.data.forEach(item => {
            if (item.type == 1) {
              this.agreementData.push(item)
            } else {
              this.intermediaryData.push(item)
            }
          })
        })
      },
      handleCheckAgreementChange (val) {
        if (val == true) {
          this.agreementData.forEach(item => {
            this.dataForm.agreementPos.push(item.agreementPk)
          })
        } else {
          this.dataForm.agreementPos = []
        }
        this.agreementFlag = false
      },
      handleCheckedAgreementChange (value) {
        let checkedCount = value.length;
        this.checkAgreement = checkedCount === this.agreementData.length;
        this.agreementFlag = checkedCount > 0 && checkedCount < this.agreementData.length;
      },
      handleCheckIntermediaryChange (val) {
        if (val == true) {
          this.intermediaryData.forEach(item => {
            this.dataForm.intermediaryPos.push(item.agreementPk)
          })
        } else {
          this.dataForm.intermediaryPos = []
        }
        this.intermediaryFlag = false
      },
      handleCheckedIntermediaryChange (value) {
        let checkedCount = value.length;
        this.checkIntermediary = checkedCount === this.intermediaryData.length;
        this.intermediaryFlag = checkedCount > 0 && checkedCount < this.intermediaryData.length;
      },
      saveData(){
        this.loading = true
        syncRoomTypePrice(this.dataForm).then(result => {
          if(result.code == 1){
            this.$message({
              message: result.sub_msg,
              type: 'success'
            });
          }
          this.dialogVisible = false
          this.$emit('callback')
        }).finally(() => {
          this.loading = false
        })
      },
      handleClose () {
        this.dialogVisible = false
        this.$emit('callback')
      },
    }
  }
</script>

<style scoped>
.body-conten{
  position: relative;
  width: 100%;
  height: 600px;
  overflow: auto;
  background: #ffffff;
}
.number-style {
  width: 100px;
}
</style>
<style>
.price-table .header-row-style {
  background: #f5f7fa;
  color: #909399;
}
.number-style.is-controls-right .el-input__inner {
  padding: 0 5px;
  text-align: left;
}
</style>