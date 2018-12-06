//班次编辑、新增
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <el-dialog class="attendance-dialog" title="编辑" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="handleClose">
    
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="80px">
      <el-form-item label="班次名称" prop="className">
        <el-input size="small" v-model="dataForm.className" type="text"/>
      </el-form-item>
      <el-form-item label="考勤组" prop="groupId">
        <el-select v-model="dataForm.groupId" placeholder="请选择">
          <el-option v-for="(v,i) in groupList" :key="i" :label="v.groupName" :value="v.groupId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考勤时间" prop="timeGroup">
        <el-time-picker
          :clearable="false"
          v-model="dataForm.beginTime"
          value-format="HH:mm:ss"
          placeholder="开始时间">
        </el-time-picker>
        <el-time-picker
          :clearable="false"
          v-model="dataForm.endTime"
          value-format="HH:mm:ss"
          placeholder="结束时间">
        </el-time-picker>
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
  import Cookies from 'js-cookie'
  import {attendanceTypeMap} from '@/utils/orm'
  import { attendanceListSelect,attendanceClassAdd,attendanceClassDetail,attendanceClassUpdate } from '@/api/oaApi'

  class AttendanceGroup {
    constructor () {
      this.classId = null
      this.groupId = null
      this.className = null
      this.beginTime = null
      this.endTime = null
      this.orderNum = null
    }

    set attendanceGroup (attendanceGroup) {
      this.classId = attendanceGroup.classId
      this.groupId = attendanceGroup.groupId
      this.className = attendanceGroup.className
      this.beginTime = attendanceGroup.beginTime
      this.endTime = attendanceGroup.endTime
      this.orderNum = attendanceGroup.orderNum
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
        attendanceListSelect({companyPk:Cookies.get('select_company_pk')}).then(res=>{
          this.groupList = res.data;

          if (id) {
            attendanceClassDetail({ id: id }).then(res => {
              this.dataForm.attendanceGroup = res.data
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
            this.loading = true
            let api
            if (this.dataForm.classId) {
              api = attendanceClassUpdate(this.dataForm)
            } else {
              api = attendanceClassAdd(this.dataForm)
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
</style>

