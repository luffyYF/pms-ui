// 维修记录编辑
// Created by Administrator on 2019-03-13T09:43:47.197.
<template>
  <el-dialog class="repair-record" :title="formTitle" :visible.sync="dialogVisible" width="460px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :model="dataForm" label-width="80px">
      <el-form-item label="维修结果">
        <el-input v-model="dataForm.repairResult" type="textarea" rows="5"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { guestListApi } from '@/api/order/pmsOrderController'
  import { delRepairRoomReason } from '@/api/atrialCenter/roomManagerController'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
          reasonPk: null,
          repairResult: null,
          status: null,
        },
        formTitle: null,
      }
    },
    methods: {
      showDialog (reasonPk, status) {
        if (reasonPk == null || status == null) {
          return
        }
        this.dataForm.reasonPk = reasonPk
        this.dataForm.status = status
        if (status == 1) {
          this.formTitle = '完成维修'
        } else {
          this.formTitle = '取消维修'
        }
        this.dialogVisible = true
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        this.loading = true
        delRepairRoomReason(this.dataForm).then(res => {
          if (this.dataForm.status == 1) {
            this.$message.success("完成维修成功")
          } else {
            this.$message.success("取消维修成功")
          }
          this.dialogVisible = false
          this.$emit('callback')
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style>
.repair-record .el-dialog .el-dialog__body {
  padding-bottom: 10px;
}
</style>
