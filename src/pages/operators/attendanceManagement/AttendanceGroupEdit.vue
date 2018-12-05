// 考勤组(班次组)表编辑
// Created by Administrator on 2018-12-04T15:20:24.254.
<template>
  <el-dialog class="add-permission" title="编辑" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="80px">
    <el-form-item label="考勤组主键" prop="groupId">
      <el-input size="small" v-model="dataForm.groupId" type="text"/>
    </el-form-item>
    <el-form-item label="公司主键" prop="companyPk">
      <el-input size="small" v-model="dataForm.companyPk" type="text"/>
    </el-form-item>
    <el-form-item label="是否默认 0:否 1:是" prop="isDefault">
      <el-input size="small" v-model="dataForm.isDefault" type="text"/>
    </el-form-item>
    <el-form-item label="组名称" prop="groupName">
      <el-input size="small" v-model="dataForm.groupName" type="text"/>
    </el-form-item>
    <el-form-item label="考勤类型: FIXED为固定排班，TURN为轮班排班，NONE为无班次" prop="type">
      <el-input size="small" v-model="dataForm.type" type="text"/>
    </el-form-item>
    <el-form-item label="关联的部门（部门名称集合）" prop="deptNameList">
      <el-input size="small" v-model="dataForm.deptNameList" type="text"/>
    </el-form-item>
    <el-form-item label="排序" prop="orderNum">
      <el-input size="small" v-model="dataForm.orderNum" type="text"/>
    </el-form-item>
    <el-form-item label="0:否 1:是" prop="isDelete">
      <el-input size="small" v-model="dataForm.isDelete" type="text"/>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-date-picker size="small" v-model="dataForm.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间"/>
    </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // import { addGroupApi, detailGroupApi, updateGroupApi } from '@/api/oaApi'

  class AttendanceGroup {
    constructor () {
      this.groupId = null
      this.companyPk = null
      this.isDefault = null
      this.groupName = null
      this.type = null
      this.deptNameList = null
      this.orderNum = null
      this.isDelete = null
      this.createTime = null
    }

    set attendanceGroup (attendanceGroup) {
      this.groupId = attendanceGroup.groupId
      this.companyPk = attendanceGroup.companyPk
      this.isDefault = attendanceGroup.isDefault
      this.groupName = attendanceGroup.groupName
      this.type = attendanceGroup.type
      this.deptNameList = attendanceGroup.deptNameList
      this.orderNum = attendanceGroup.orderNum
      this.isDelete = attendanceGroup.isDelete
      this.createTime = attendanceGroup.createTime
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new AttendanceGroup(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
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
          detailApi({ id: id }).then(res => {
            this.dataForm.attendanceGroup = res.data
          })
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
            if (this.dataForm.id) {
              api = updateApi(this.dataForm)
            } else {
              api = addApi(this.dataForm)
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
