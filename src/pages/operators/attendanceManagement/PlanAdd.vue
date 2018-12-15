// 新增考勤日程
<template>
  <el-dialog title="排班" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="88px" class="plan-form">
      <el-form-item label="选择员工" prop="selectUsers">
        <el-select v-model="dataForm.selectUsers" multiple placeholder="请选择">
          <el-option
            v-for="item in users"
            :key="item.userPk"
            :label="item.userName"
            :value="item.userPk">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择班次" prop="selectedOptions">
        <el-cascader
          :options="cascaderArr"
          v-model="dataForm.selectedOptions"
          @change="handleChange">
        </el-cascader>
        
        <!-- <el-select v-model="dataForm.classId" placeholder="请选择">
          <el-option v-for="(item,index) in cascaderArr" :key="index" :label="item.className" :value="item.classId">
            <span style="float: left">{{ item.className }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.beginTime }} - {{item.endTime}}</span>
          </el-option>
        </el-select> -->


      </el-form-item>
      <el-form-item label="日期" prop="days">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="dataForm.days"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
  import { attendancePlanAdd,attendanceClassCascaderList } from '@/api/oaApi'

  class AttendanceGroup {
    constructor () {
      this.selectUsers = []
      this.classId = null
      this.days = []
      this.selectedOptions = []
    }

    set attendanceGroup (attendanceGroup) {
      this.selectUsers = attendanceGroup.selectUsers
      this.classId = attendanceGroup.classId
      this.days = attendanceGroup.days
      this.selectedOptions = attendanceGroup.selectedOptions
    }
  }

  export default {
    data () {
      return {
        attendanceTypeMap: attendanceTypeMap,
        dialogVisible: false,
        loading: false,
        dataForm: new AttendanceGroup(),
        rules: {
          selectUsers: [{ required: true, message: '请选择员工', trigger: 'blur' }],
          selectedOptions: [{ required: true, message: '请选择班次', trigger: 'blur' }],
          days: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        },
        users:[],
        cascaderArr: [],
      }
    },
    methods: {
      showDialog (users, classId, groupId, days) {
        this.dialogVisible = true
        this.$nextTick(()=>{
          this.$refs.dataForm.clearValidate();
        })

        this.dataForm = new AttendanceGroup();
        this.users = users
        this.users.forEach(item=>{
          this.dataForm.selectUsers.push(item.userPk)
        })

        this.dataForm.classId = classId;
        this.dataForm.days = days

        //查找级联列表 组-班次
        attendanceClassCascaderList().then(res=>{
          this.cascaderArr = res.data
          if(groupId && classId){
            this.dataForm.selectedOptions=[groupId,classId]
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
            this.loading = true
            let api
            if (this.dataForm.groupId) {
              api = attendanceGroupUpdate(this.dataForm)
            } else {
              
              let selectUsers = [];
              let tempStr = this.dataForm.selectUsers.join(",");
              this.users.forEach(item=>{
                if(tempStr.indexOf(item.userPk)!=-1){
                  selectUsers.push(item)
                }
              })

              let data = {
                classId: this.dataForm.selectedOptions[1],
                days: this.dataForm.days,
                selectUsers: selectUsers
              }
              api = attendancePlanAdd(data)
            }
            api.then(res => {
              this.$message({ type: 'success', message: '排班成功' })
              this.dialogVisible = false
              this.$emit('callback')
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },
      handleChange(){

      },
      

    }
  }
</script>
<style>
.plan-form .el-select{
  width: 350px
}
</style>
