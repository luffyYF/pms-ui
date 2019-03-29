// 会员积分换房规则编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="规则名称" prop="ruleName">
            <el-input size="mini" style="width:100%;" v-model="dataForm.ruleName" type="text"/>
        </el-form-item>

        <el-form-item label="是否启用" prop="enable">
            <el-switch
            style="display: block"
            v-model="dataForm.enableFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            active-value="Y"
            inactive-value="N">
            </el-switch>
            <!-- <el-checkbox size="mini" v-model="dataForm.enable"></el-checkbox> -->
        </el-form-item>

        <el-form-item label="活动对象" prop="type">
            <el-radio v-model="dataForm.type" size="mini" :label="0">全部会员</el-radio>
            <el-radio v-model="dataForm.type" size="mini" :label="1">指定会员</el-radio>
        </el-form-item>

        <el-form-item label="会员选择" v-if="dataForm.type == 1" prop="gradePks">
            <el-checkbox-group :min="1" v-model="dataForm.gradePks">
                <el-checkbox v-for="obj in gradeList" :label="obj.gradePk" :key="obj.gradePk">{{obj.gradeName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="兑换房型:" prop="roomTypePk">
            <el-select size="mini" style="width:100%;" v-model="dataForm.roomTypePk" placeholder="房型" clearable >
                <el-option v-for="y in roomTypeList" :label="y.typeName" :value="y.typePk" :key="y.typePk"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="所需积分" prop="integral">
            <el-input-number size="mini" style="width:100%;" :precision="0" :step="1" :controls="false" v-model="dataForm.integral" ></el-input-number>
        </el-form-item>

        <el-form-item label="活动时间" prop="datepicker">
            <el-date-picker style="width:100%;" v-model="dataForm.datepicker" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="有效星期:" prop="week">
            <el-checkbox-group v-model="dataForm.week" :min="1">
                <el-checkbox v-for="obj in weekList" :label="obj.value" :key="obj.value">{{obj.label}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Moment from 'moment'
  import {listGrade,addRule,updateRule} from '@/api/systemSet/member/pmsMemberIntegralRoomChangeRule'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
            enableFlag:"Y",
            type:0,
            integral:0,
            gradePks:[],
            datepicker:[]
        },
        rules: {
          ruleName: [{ required: true, message: '请填写规则名称', trigger: 'blur' }],
          type: [{ required: true, message: '请填写类型', trigger: 'change' }],
          gradePks: [{ required: true, message: '请选择会员卡类型', trigger: 'change' }],
          datepicker:  [{ required: true, message: '请选择活动日期', trigger: 'change' }],
          roomTypePk:  [{ required: true, message: '请选择兑换房型', trigger: 'change' }],
          week: [{ required: true, message: '请选择有效日期', trigger: 'change' }],
        },
        title:"添加规则",
        gradeList:[],
        roomTypeList:[],
        weekList:[
            {label:"周一",value:"1"},
            {label:"周二",value:"2"},
            {label:"周三",value:"3"},
            {label:"周四",value:"4"},
            {label:"周五",value:"5"},
            {label:"周六",value:"6"},
            {label:"周日",value:"7"},
        ]
      }
    },
    methods: {
        changTest(){
            console.log(this.dataForm.gradePks);
        },
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
        listRoomType(){
            var typeList = JSON.parse(localStorage.getItem("pms_type"))
            this.roomTypeList = []
            typeList.forEach(item=> {
                if(item.typeMaster == "ROOM_TYPE"){
                this.roomTypeList.push(item);
                }
            })
        },
      showDialog (row) {
        this.dialogVisible = true
        this.listGrade(row)
        this.listRoomType()
        if (row) {
            row.datepicker = []
            row.datepicker[0] = row.beginDate,
            row.datepicker[1] = row.endDate
            this.title = "修改规则"
            if(row.type == 0){
                row.gradePks = []
            }
            this.dataForm = row
            console.log(JSON.stringify(this.dataForm))
        }else{
          this.title = "添加规则"
          this.dataForm = {
            enableFlag:"Y",
            type:0,
            integral:0,
            gradePks:[],
            week:[]
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
            if(this.dataForm == 1 && this.dataForm.gradePks.length == 0){
                this.$message({ type: 'warning', message: "指定会员时会员选择不能为空" })
                return
            }
            if(this.dataForm.week.length == 0){
                this.$message({ type: 'warning', message: "请选择有效星期" })
                return
            }
            this.dataForm.beginDate = this.dataForm.datepicker[0]
            this.dataForm.endDate = this.dataForm.datepicker[1]
            this.dataForm.effectiveWeek = ""
            for(var i = 0;i<this.dataForm.week.length;i++){
                this.dataForm.effectiveWeek += this.dataForm.week[i]+","
            }
            this.dataForm.effectiveWeek = this.dataForm.effectiveWeek.substring(0,this.dataForm.effectiveWeek.length-1)
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
