// 会员规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="650px"
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
            <el-radio v-model="dataForm.type" :label="0">常规赠送</el-radio>
            <el-radio v-model="dataForm.type" :label="1">活动赠送</el-radio>
        </el-form-item>
        <el-form-item label="活动日期" prop="datepicker" v-if="dataForm.type == 1">
            <el-date-picker style="width:100%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
        </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="addDetailClick()" 
                size="mini">新增赠送规则
        </el-button>
        <span style="color:red;">&nbsp;&nbsp;&nbsp;&nbsp;温馨提示:优惠卷不足时，充值将不会赠送</span>
        <div style="margin-top:20px;padding:10px 10px;border: 1px solid;" v-if="detailDtos.length > 0">
            <div v-for="(obj,index) in detailDtos" :key="index">
                单次储值额度满<el-input-number size="mini" style="width:80px;" :precision="2" :step="1" :min="0" :controls="false" v-model="obj.price" ></el-input-number>
                <el-radio v-model="obj.type" size="mini" :label="0">按比例赠送</el-radio>
                <el-radio v-model="obj.type" size="mini" :label="1">固定额赠送</el-radio>
                <span v-if="obj.type == 0">赠送比例<el-input-number size="mini" style="width:80px;" :precision="2" :step="1" :min="0" :controls="false" v-model="obj.giveCount" ></el-input-number>%</span>
                <span v-if="obj.type == 1">赠送金额<el-input-number size="mini" style="width:80px;" :precision="2" :step="1" :min="0" :controls="false" v-model="obj.giveCount" ></el-input-number>元</span>
                <br>
                <div style="margin-top:5px;padding-left:56px;margin-bottom:5px;">送积分<el-input-number size="mini" style="width:80px;" :precision="2" :step="1" :min="0" :controls="false" v-model="obj.giveIntegral" ></el-input-number>分&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="info" size="mini" plain>
                    优惠卷
                </el-button>
                <el-button type="info" size="mini" plain>
                    礼品
                </el-button>
                <el-button type="info" @click="delDetailClicl(index)" size="mini" plain>
                    移除
                </el-button>
                </div>
            </div>

        </div>
    </el-form>


    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {listGrade,addRule,updateRule,detailList} from '@/api/systemSet/member/pmsMemberRechargeGiveRule'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        detailDtos:[
            {
                detailPk:"",
                rulePk:"",
                price:0,
                type:0,
                giveCount:0,
                giveIntegral:0
            }
        ],
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          type: [{ required: true, message: '请填写类型', trigger: 'change' }],
          gradePk: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
          datepicker:  [{ required: true, message: '请选择活动日期', trigger: 'change' }],
        },
        title:"添加规则",
        gradeList:[],
      }
    },
    methods: {
      listGrade(row){
        const self = this
        self.gradeList = [];
        listGrade().then(result => {
            // if(row){
            //     self.gradeList.push({
            //         gradePk:row.gradePk,
            //         gradeName:row.gradeName
            //     })
            // }
            self.gradeList = self.gradeList.concat(result.data)
        }).catch(() => {

        }).finally(()=>{
        })
      },
      listDetail(rulePk){
        detailList({rulePk:rulePk}).then(result => {
            this.detailDtos = result.data
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
            if(row.type == 1){
                this.dataForm.datepicker = [
                    row.beginDate,
                    row.endDate
                ]
            }
            this.listDetail(row.rulePk)
        }else{
          this.title = "添加规则"
          this.dataForm = {
          }
          this.detailDtos = [
                {
                    detailPk:"",
                    rulePk:"",
                    price:0,
                    type:0,
                    giveCount:0,
                    giveIntegral:""
                }
            ]
        }
      },
      addDetailClick(){
            this.detailDtos.push({
                detailPk:"",
                rulePk:"",
                price:0,
                type:0,
                giveCount:0,
                giveIntegral:""
            })
      },
      delDetailClicl(index){
          this.detailDtos.splice(index,1)
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
            if(this.dataForm.type == 1){
                this.dataForm.beginDate = this.dataForm.datepicker[0]
                this.dataForm.endDate = this.dataForm.datepicker[1]
            }
            var data = {
                rulePo:this.dataForm,
                detailDtos:this.detailDtos
            }
            if (this.dataForm.rulePk) {
              api = updateRule(data)
            } else {
              api = addRule(data)
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
