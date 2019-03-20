<template>
  <!-- 添加账单 -->
    <el-dialog class="add-bill-dialog" title="添加账单" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :append-to-body="true">
      <el-form ref="formAddBill" :model="formAddBill" size="mini" label-width="80px">
        <el-form-item label="项目" required>
          <el-col :span="24">
            <el-select v-model="formAddBill.projectPk" placeholder="请选择项目" style="width:100%">
              <el-option
                v-for="item in projectList"
                :key="item.projectPk"
                :label="item.projectName"
                :value="item.projectPk">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="金额" required>
          <el-input v-model="formAddBill.amount"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formAddBill.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="confirm">确认</el-button>
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { listByProjectType } from '@/api/systemSet/pmsProjectController'
export default {
  data() {
    return {
      dialogVisible:false,
      projectList:[],
      formAddBill:{
        projectPk:'',
        amount: '',
        remark: '',
      },
      projectType:''
    }
  },
  methods: {
    /**
     * projectType： CONSUMER, SETTLEMENT
     */
    showDialog(projectType) {
      this.formAddBill.projectPk = null
      this.formAddBill.amount=null
      this.formAddBill.remark=null
      this.projectType = projectType
      this.projectList = []
      this.dialogVisible = true
      listByProjectType({projectType: projectType}).then(res => {
        this.projectList = res.data
      })
    },
    confirm(){
      let project;
      this.projectList.forEach(item=>{
        if(item.projectPk==this.formAddBill.projectPk){
          project=item
        }
      })
      if(this.formAddBill.amount==null || this.formAddBill.amount==undefined || this.formAddBill.amount=='') {
        return
      }
      if(project) {
        let consumptionAmount=0
        let settlementAmount=0
        if(this.projectType=='CONSUMER') {
          consumptionAmount=this.formAddBill.amount
        }else if(this.projectType=='SETTLEMENT'){
          settlementAmount=this.formAddBill.amount
        }

        if(project.inoutFlag) {
          consumptionAmount = Math.abs(Number(consumptionAmount))
          settlementAmount = Math.abs(Number(settlementAmount))
        }else{
          consumptionAmount = -(Math.abs(Number(consumptionAmount)))
          settlementAmount = -(Math.abs(Number(settlementAmount)))
        }

        let data = {
          projectPk: this.formAddBill.projectPk,
          consumptionAmount: consumptionAmount,
          settlementAmount: settlementAmount,
          remark: this.formAddBill.remark,
          projectName: project.projectName,
          projectCode: project.code,
        }
        this.$emit('callback', data)
        this.dialogVisible = false
      }
      
    },
  }
}
</script>

<style>

</style>
