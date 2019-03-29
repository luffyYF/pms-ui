// 维修记录表编辑
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <el-dialog class="pattern-dialog2" title="转维修房" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="handleClose">
    <div class="pattern-dialog-container" style="padding: 25px 4px;">
      <el-form ref="dataForm" :model="dataForm" label-width="80px" size="mini">
        <el-form-item label="房号">
          <el-input v-model="dataForm.roomNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="起始日期" v-model="dataForm.beginDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" :disabled="true"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="结束日期" v-model="dataForm.endDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-row class="no-bottom">
          <el-col :span="12">
            <el-form-item label="原因" required>
              <el-select v-model="dataForm.reasonTypePk" placeholder="选择原因">
                <el-option v-for="t in reasonArrays" :key="t.typePk" :label="t.typeName" :value="t.typePk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="损坏级别">
              <el-select v-model="dataForm.level" placeholder="选择损坏级别">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否提醒">
          <el-select v-model="dataForm.remindFlag">
            <el-option label="不提醒" value="N"></el-option>
            <el-option label="提醒" value="Y"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" required>
          <el-input type="textarea" v-model="dataForm.remark"></el-input>
        </el-form-item>

        <el-row class="no-bottom">
          <el-col :span="12">
            <el-form-item label="设置人">
              <el-input v-model="dataForm.createUserName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="解除人">
                <el-input v-model="dataForm.relieveName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" type="primary" size="mini">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { findRoomReason } from '@/api/roomStatus/pmsRoomStatusController'

  class PmsRepairRecord {
    constructor () {
      this.reasonPk = null
      this.roomPk = null
      this.roomNumber = null
      this.roomTypePk = null
      this.roomTypeName = null
      this.beginDate = null
      this.endDate = null
      this.level = null
      this.remindFlag = null
      this.createUserName = null
      this.relieveName = null
      this.reasonTypePk = null
      this.remark = null
    }

    set pmsRepairRecord (pmsRepairRecord) {
      this.reasonPk = pmsRepairRecord.reasonPk
      this.roomPk = pmsRepairRecord.roomPk
      this.roomNumber = pmsRepairRecord.roomNumber
      this.roomTypePk = pmsRepairRecord.roomTypePk
      this.roomTypeName = pmsRepairRecord.roomTypeName
      this.beginDate = pmsRepairRecord.beginDate
      this.endDate = pmsRepairRecord.endDate
      this.level = pmsRepairRecord.level
      this.remindFlag = pmsRepairRecord.remindFlag
      this.createUserName = pmsRepairRecord.createUserName
      this.relieveName = pmsRepairRecord.relieveName
      this.reasonTypePk = pmsRepairRecord.reasonTypePk
      this.remark = pmsRepairRecord.remark
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        dataForm: new PmsRepairRecord(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
        },
        reasonArrays:[], 
      }
    },
    methods: {
      showDialog (id) {
        this.reasonArrays=[]
        let typeList = JSON.parse(localStorage.getItem("pms_type"))
        typeList.forEach(item=> {
          if(item.typeMaster == 'REPAIR'){
            this.reasonArrays.push(item);
          }
        })

        this.dialogVisible = true
        if (id) {
          findRoomReason({reasonPk: id}).then(res=>{
            this.dataForm.pmsRepairRecord = res.data
          })
        }
      },
      handleClose () {
        this.dialogVisible = false
      },
    }
  }
</script>

<style scoped>
.el-input.is-disabled .el-input__inner{
  color: #737373 !important;
}
</style>