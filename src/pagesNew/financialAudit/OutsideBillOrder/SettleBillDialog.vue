// 结算账单弹出
<template>
  <el-dialog class="settle-bill-dialog" title="账务未平，结账后自动入账" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" :append-to-body="true">
    <el-col :span="24">
      <el-col :span="12">
        <p class="partialcheckout-price">
          <span class="left">消费金额：</span>
          <span class="left price">{{totalConsum}}</span>
        </p>
        <p class="partialcheckout-price">
          <span class="left">结算金额：</span>
          <span class="left price">{{totalSettle}}</span>
        </p>
        <p class="partialcheckout-price">
          <span v-if="diff<0" style="color: red" class="left">找零：{{Math.abs(diff)}}</span>
          <span v-if="diff>=0" style="color: red" class="left">应收：{{diff}}</span>
        </p>
      </el-col>
      <el-col :span="12" style="border-left: 1px solid #ddd;">
        <el-form ref="billForm" :model="billForm" size="mini" label-width="100px">
          <el-form-item label="结算项目：" required>
            <el-select v-model="billForm.projectCode"  placeholder="请选择结算项目" style="width:100%">
              <el-option
              v-for="item in projectList"
              :key="item.projectPk"
              :label="item.projectName"
              :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" rows="4" v-model="billForm.remark" style="width:100%"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>

    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="confirm" :loading="loading">结账</el-button>
      <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listByProjectType } from '@/api/systemSet/pmsProjectController'
import { settle } from "@/api/financial/OutsideBillOrderController"

export default {
  data() {
    return {
      loading:false,
      dialogVisible:false,
      projectList:[],
      totalConsum:0,
      totalSettle:0,
      diff:0,
      billForm: {
        outsideBillOrderPk:null,
        projectCode: null,
        remark: null,
      }
    }
  },
  methods: {
    showDialog(outsideBillOrderPk, totalConsum, totalSettle) {
      this.dialogVisible=true
      this.totalConsum = totalConsum
      this.totalSettle = totalSettle
      this.diff = this.totalConsum - this.totalSettle
      this.billForm.outsideBillOrderPk = outsideBillOrderPk
      this.projectList=[]

      let tempFlag = this.diff > 0 ? true : false
      listByProjectType({projectType: 'SETTLEMENT'}).then(res => {
        //过滤出是负的还是正的
        res.data.forEach(item => {
          if(item.inoutFlag==tempFlag) {
            this.projectList.push(item)
          }
        });
      })
    },
    confirm(){
      this.loading = true
      if(!this.billForm.projectCode) {
        this.$message.warning("请选择结算项目")
        this.loading = false
        return
      }
      settle(this.billForm).then(res=>{
        this.dialogVisible = false
        this.$message.success('结算成功')
        this.$emit('callback')
      }).finally(()=>{
        this.loading = false
      })
    },

  }
}
</script>

<style scope>
.settle-bill-dialog {

}
.settle-bill-dialog .partialcheckout-price {
  padding: 0 15px;
}
.settle-bill-dialog .partialcheckout-price .left {
  font-size: 20px;
  width: 120px;
  text-align: right;
}
</style>
