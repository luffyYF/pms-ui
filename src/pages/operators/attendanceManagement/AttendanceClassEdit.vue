//班次编辑、新增
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <el-dialog class="attendance-dialog" title="编辑" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="handleClose">
    
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="80px">
      <el-form-item label="班次编号" prop="classCode">
        <el-input size="small" v-model="dataForm.classCode" type="text"/>
      </el-form-item>
      <el-form-item label="班次名称" prop="className">
        <el-input size="small" v-model="dataForm.className" type="text"/>
      </el-form-item>
      <el-form-item label="考勤组" prop="groupId">
        <el-select v-model="dataForm.groupId" placeholder="请选择">
          <el-option v-for="(v,i) in groupList" :key="i" :label="v.groupName" :value="v.groupId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考勤时间" prop="timeGroup">
        <el-time-select
          :clearable="false"
          v-model="dataForm.beginTime"
          placeholder="开始时间"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:59'
          }"
          value-format="HH:mm">
        </el-time-select>
        <el-time-select
          :clearable="false"
          v-model="dataForm.endTime"
          placeholder="结束时间"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:59'
          }"
          value-format="HH:mm">
        </el-time-select>
      </el-form-item>
      <el-form-item label="提前打卡" prop="beginMin" class="min-input">
        <el-input size="small" v-model.number="dataForm.beginMin" type="number" :min="0">
          <template slot="append">分</template>
        </el-input>
        <span style="color: red">*允许上班打卡可提前的时间</span>
      </el-form-item>
      <el-form-item label="延后打卡" prop="endMin" class="min-input">
        <el-input size="small" v-model.number="dataForm.endMin" type="number" :min="0">
          <template slot="append">分</template>
        </el-input>
        <span style="color: red">*允许下班打卡可延后的时间</span>
      </el-form-item>
      <el-form-item label="客服班次" class="min-input">
        <el-switch
          style="display: block"
          size="small"
          v-model="dataForm.isCustomerService"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="排序" prop="orderNum">
        <el-input-number v-model="dataForm.orderNum" :min="0"></el-input-number>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {attendanceTypeMap} from '@/utils/orm'
  import { attendanceListSelect,attendanceClassAdd,attendanceClassDetail,attendanceClassUpdate } from '@/api/oaApi'

  class AttendanceGroup {
    constructor () {
      this.classId = null
      this.groupId = null
      this.classCode = null
      this.className = null
      this.beginTime = null
      this.endTime = null
      this.orderNum = null
      this.beginMin = 30
      this.endMin = 120
      this.isCustomerService = 0
    }

    set attendanceGroup (attendanceGroup) {
      this.classId = attendanceGroup.classId
      this.groupId = attendanceGroup.groupId
      this.classCode = attendanceGroup.classCode
      this.className = attendanceGroup.className
      this.beginTime = attendanceGroup.beginTime
      this.endTime = attendanceGroup.endTime
      this.orderNum = attendanceGroup.orderNum
      this.beginMin = attendanceGroup.beginMin
      this.endMin = attendanceGroup.endMin
      this.isCustomerService = attendanceGroup.isCustomerService
    }
  }

  export default {
    data () {
      var checkTime = (rule, value, callback) => {
        console.log(this.dataForm.beginTime)
        if(!this.dataForm.beginTime){
          callback(new Error('请输入开始时间'));
        }else if(!this.dataForm.endTime){
          callback(new Error('请输入结束时间'));
        }else {
          callback();
        }
      }
      return {
        attendanceTypeMap: attendanceTypeMap,
        dialogVisible: false,
        loading: false,
        dataForm: new AttendanceGroup(),
        groupList: [],
        rules: {
          className: [{ required: true, message: '请填写班次名称', trigger: 'blur' }],
          timeGroup:[{required: true, validator: checkTime, trigger: 'blur' }],
          groupId: [{required: true, message: '请选择考勤组' ,trigger: 'blur' }]
        }
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        this.groupList = []
        attendanceListSelect({companyPk:localStorage.getItem('select_company_pk')}).then(res=>{
          this.groupList = res.data;

          if (id) {
            attendanceClassDetail({ id: id }).then(res => {
              this.dataForm.attendanceGroup = res.data
              this.dataForm.beginTime = this.dataForm.beginTime.substring(0,(this.dataForm.beginTime.length - 3))
              this.dataForm.endTime = this.dataForm.endTime.substring(0,(this.dataForm.endTime.length - 3))
            })
          }else{
            this.dataForm = new AttendanceGroup();
          }
        })
        

      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            console.log(this.dataForm);
            let temp = JSON.stringify(this.dataForm)
            this.from = JSON.parse(temp)
            this.from.beginTime = this.dataForm.beginTime + ':00'
            this.from.endTime = this.dataForm.endTime + ':00'
            this.loading = true
            let api
            if (this.from.classId) {
              api = attendanceClassUpdate(this.from)
            } else {
              api = attendanceClassAdd(this.from)
            }
            api.then(res => {
              this.$message({ type: 'success', message: res.sub_msg })
              this.dialogVisible = false
              this.$emit('callback')
            }).finally(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
.attendance-dialog .el-date-editor.el-input{
  width:188px;
}
.min-input {
  margin-bottom: 0;
}
</style>

