// 考勤组(班次组)表编辑、新增
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <el-dialog class="add-permission" title="编辑" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="80px">
    <el-form-item label="是否默认" prop="isDefault">
      <el-switch v-model="dataForm.isDefault" active-text="是" active-value="1" inactive-text="否" inactive-value="0"> </el-switch>
    </el-form-item>
    <el-form-item label="组名称" prop="groupName">
      <el-input size="small" v-model="dataForm.groupName" type="text"/>
    </el-form-item>
    <el-form-item label="考勤类型" prop="type">
      <!-- <el-input size="small" v-model="dataForm.type" type="text"/> -->
    <el-select v-model="dataForm.type" placeholder="请选择">
      <el-option v-for="(v,k) in attendanceTypeMap" :key="k" :label="v" :value="k"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="部门名称集合" prop="deptNameList">
      <el-input size="small" v-model="dataForm.deptNameList" type="text"/>
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
  import { attendanceGroupAdd,attendanceGroupUpdate,attendanceGroupDetail } from '@/api/oaApi'

  class AttendanceGroup {
    constructor () {
      this.groupId = null
      this.isDefault = null
      this.groupName = null
      this.type = null
      this.deptNameList = null
      this.orderNum = null
      this.companyPk = localStorage.getItem('select_company_pk')
    }

    set attendanceGroup (attendanceGroup) {
      this.groupId = attendanceGroup.groupId
      this.isDefault = attendanceGroup.isDefault
      this.groupName = attendanceGroup.groupName
      this.type = attendanceGroup.type
      this.deptNameList = attendanceGroup.deptNameList
      this.orderNum = attendanceGroup.orderNum
      this.companyPk = attendanceGroup.companyPk
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
          groupName: [{ required: true, message: '请填写组名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择考勤类型', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id) {
          attendanceGroupDetail({ id: id }).then(res => {
            this.dataForm.attendanceGroup = res.data
          })
        }else{
          this.dataForm = new AttendanceGroup();
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
            console.log(this.dataForm);
            this.loading = true
            let api
            if (this.dataForm.groupId) {
              api = attendanceGroupUpdate(this.dataForm)
            } else {
              api = attendanceGroupAdd(this.dataForm)
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
