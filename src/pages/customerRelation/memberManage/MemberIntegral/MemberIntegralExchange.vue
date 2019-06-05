// 会员充值编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="member-dialog">
		<el-dialog class="add-permission" title="积分增减" :visible.sync="dialogVisible" width="600px"
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
				<el-form-item label="会员卡号:" size="mini">
          <el-input v-model="dataForm.cardNumber" class="input-width" readonly></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="会员姓名:" size="mini">
          <el-input v-model="dataForm.memName" class="input-width" readonly></el-input>
        </el-form-item>
         </el-col>
         </el-row>
          <el-row>
          <el-col :span="12">
        <el-form-item label="会员级别:" size="mini">
          <el-input v-model="dataForm.gradeName" class="input-width" readonly></el-input>
        </el-form-item>
          </el-col>
            <el-col :span="12">
          <el-form-item label="剩余积分:" size="mini">
          <el-input v-model="dataForm.availableIntegral" class="input-width" readonly></el-input>
        </el-form-item>
            </el-col>
          </el-row>
        <el-row>
            <el-col :span="12">
            <el-form-item label="变化:" size="mini">
              <el-radio v-model="radio" label="increase">增加</el-radio>
              <el-radio v-model="radio" label="reduce">减少</el-radio>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="积分:" size="mini" prop="integral">
             <el-input v-model="integral" class="input-width" ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注:" size="mini" prop="remark">
          <el-input v-model="remark" class="input-width" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item> 
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="sureClick" :loading="loading">确定</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>  
import { integralExchange } from '@/api/customerRelation/pmsMemberLogController'

  export default {
    data () {
      return {
        dialogVisible: false,
				loading: false,
        dataForm: {
          memPk: '',
          memName: '',
          cardNumber: '', 
          gradeName:'',
          availableIntegral:0,
          isCallback:true,
        },
        radio: 'increase',
        remark: '',
        integral:'',
        rules:{
          integral:[
            { required: true, message: '请输入积分', trigger: 'blur,change' },
          ],
          remark:[
            { required: true, message: '请输入备注', trigger: 'blur,change' },
          ],
        }
      }
    },
    methods: {
      showDialog (data,isCallback) {
        this.isCallback = isCallback
        this.dataForm = {
          memPk: data.memPk,
          memName: data.memName,
          cardNumber: data.cardNumber, 
          gradeName:data.gradeName,
          availableIntegral:data.availableIntegral,
        }
        this.dialogVisible = true,
        this.integral="",
        this.remark=""
      },
      sureClick(){
        this.loading = true
        if(true){
          if(this.radio=="reduce"){
            if(this.integral<this.dataForm.availableIntegral){
              this.integral=-this.integral;
                integralExchange({integral:this.integral,remark:this.remark,memPk:this.dataForm.memPk}).then(result => {
                if(result.code == 1){
                  this.$message({
                    message: "积分减少成功！",
                    type: 'success'
                  });
                }
                this.dialogVisible = false
                if(this.isCallback){
                  this.$emit('callback')
                } 
            }).finally(() => {
              this.loading = false
            })
            }else{
              this.$message({
                    message: "可用积分不足以减少！",
                    type: 'warning'
                  });
            }  
          }else {
              integralExchange({integral:this.integral,remark:this.remark,memPk:this.dataForm.memPk}).then(result => {
              if(result.code == 1){
                this.$message({
                  message: "积分增加成功！",
                  type: 'success'
                });
              }
              this.dialogVisible = false
              if(this.isCallback){
                this.$emit('callback')
              } 
            }).finally(() => {
              this.loading = false
            })
          }
        }
      },
      handleClose () {
        this.dialogVisible = false
        if(this.isCallback){
            this.$emit('callback')
        }
			},
    }
  }
</script>

<style scoped>
.input-width {
  width: 80%;
}
.title-right {
  height: 50px;
  line-height: 50px;
  text-align: right;
}
.title-left {
  height: 50px;
  line-height: 50px;
  margin-left: 12px;
  text-align: left;
}
.font-style {
  font-size: 20px;
  font-weight: normal;
  color: #000;
}
.block-inline {
  display: inline-block;
  margin-left: 8px;
}
.title-left.font-style {
  color: #F00;
}
</style>

<style>
.number-style .el-input--mini .el-input__inner {
  text-align: left;
  padding: 0 5px;
}
</style>

