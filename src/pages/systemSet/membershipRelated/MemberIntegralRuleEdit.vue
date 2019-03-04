// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" :visible.sync="dialogVisible" width="400px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="规则名称" prop="ruleName">
            <el-input size="mini" style="width:100%;" v-model="dataForm.ruleName" type="text"/>
        </el-form-item>
        <el-form-item label="会员卡类型:" prop="gradePk">
            <el-select size="mini" style="width:100%;" v-model="dataForm.gradePk" placeholder="会员卡类型" clearable >
                <el-option v-for="y in gradeList" :label="y.gradeName" :value="y.gradePk" :key="y.gradePk"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="类型:" prop="type">
            <el-select size="mini" style="width:100%;" v-model="dataForm.type" placeholder="类型" clearable >
            <el-option v-for="y in typeList" :label="y.label" :value="y.value" :key="y.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="天数/金额" prop="count">
            <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="dataForm.count" ></el-input-number>
        </el-form-item>
        <el-form-item label="积多少分:" prop="integral">
            <el-input-number size="mini" style="width:100%;" :precision="0" :step="1" :min="0" :controls="false" v-model="dataForm.integral" ></el-input-number>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
            <el-input size="mini" v-model="dataForm.remark" type="textarea"/>
        </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {listGrade,addRule,updateRule} from '@/api/systemSet/member/pmsMemberIntegralRule'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          type: [{ required: true, message: '请填写类型', trigger: 'change' }],
          gradePk: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
        },
        title:"添加规则",
        gradeList:[],
        typeList:[
            {label:"按房费",value:0},
            {label:"按房夜数",value:1},
            {label:"按总消费",value:2},
        ]
      }
    },
    methods: {
      listGrade(row){
        const self = this
        self.gradeList = [];
        listGrade().then(result => {
            if(row){
                self.gradeList.push({
                    gradePk:row.gradePk,
                    gradeName:row.gradeName
                })
            }
            self.gradeList = self.gradeList.concat(result.data)
            console.log(JSON.stringify(self.gradeList))
        }).catch(() => {

        }).finally(()=>{
        })
      },
      showDialog (row) {
        this.dialogVisible = true
        this.listGrade(row)
        if (row) {
            this.title = "修改规则"
            this.dataForm = row
        }else{
          this.title = "添加规则"
          this.dataForm = {
          }
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            this.loading = true
            let api
            if (this.dataForm.rulePk) {
              api = updateRule(this.dataForm)
            } else {
              api = addRule(this.dataForm)
            }
            api.then(res => {
                if(res.code == 1){
                    this.$message({ type: 'success', message: res.sub_msg })
                    this.dialogVisible = false
                    this.$emit('callback')
                }else{
                    this.$message({ type: 'warning', message: res.sub_msg })
                }
            }).finally(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>
