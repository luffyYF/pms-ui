// pms虚拟房型表编辑
// Created by Administrator on 2019-05-28T10:43:54.507.
<template>
  <el-dialog class="add-permission virtual-dialog" :title="title" :visible.sync="dialogVisible" width="520px"
             :close-on-click-modal="false" :before-close="handleClose" top="18vh">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="130px">
      <el-form-item label="虚拟房型:" prop="name">
        <el-input size="small" v-model="dataForm.name" type="text" class="width-60"/>
      </el-form-item>
      <el-form-item label="实体房型:" prop="typePk">
        <el-select v-model="dataForm.typePk" placeholder="请选择实体房型" size="small" class="width-60">
          <el-option v-for="item in roomTypes" :key="item.typePk" :label="item.typeName" :value="item.typePk"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道:" prop="channelCode">
        <el-select v-model="dataForm.channelCode" placeholder="请选择渠道" size="small" class="width-60">
          <el-option label="微信订单" value="WXDD"></el-option>
          <el-option label="携程" value="XC"></el-option>
          <el-option label="美团" value="MT"></el-option>
          <el-option label="微信订房小程序" value="WXDFXCX"></el-option>
          <el-option label="赫程" value="HC"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input size="small" v-model="dataForm.remark" type="textarea" rows="4" class="width-60"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" :loading="loading" @click="saveData" :disabled="judgeDisabled()" v-if="hasPerm('pms:virtualRoomType:add') && dataForm.virtualPk == null">保存</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData" :disabled="judgeDisabled()" v-if="hasPerm('pms:virtualRoomType:update') && dataForm.virtualPk != null">修改</el-button>
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi } from '@/api/pmsVirtualRoomTypeApi'
  import { roomTypeList } from '@/api/utils/pmsTypeController'

  class PmsVirtualRoomType {
    constructor () {
      this.virtualPk = null
      this.typePk = null
      this.name = null
      this.channelCode = null
      this.status = 1
      this.remark = null
      this.isDelete = 0
      this.createTime = null
      this.updateTime = null
    }

    set pmsVirtualRoomType (pmsVirtualRoomType) {
      this.virtualPk = pmsVirtualRoomType.virtualPk
      this.typePk = pmsVirtualRoomType.typePk
      this.name = pmsVirtualRoomType.name
      this.channelCode = pmsVirtualRoomType.channelCode
      this.status = pmsVirtualRoomType.status
      this.remark = pmsVirtualRoomType.remark
      this.isDelete = pmsVirtualRoomType.isDelete
      this.createTime = pmsVirtualRoomType.createTime
      this.updateTime = pmsVirtualRoomType.updateTime
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new PmsVirtualRoomType(),
        rules: {
          systemId: [{ required: true, message: '请选择系统', trigger: 'blur' }],
          title: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
          type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          permissionValue: [
            { required: true, message: '请填写权限值', trigger: 'blur' }
          ],
          name: [{ required: true, message: '请填写虚拟房型名称', trigger: 'blur' }],
          typePk: [{ required: true, message: '请选择实体房型', trigger: 'change' }],
          channelCode: [{ required: true, message: '请选择渠道', trigger: 'change' }]
        },
        title: null,
        roomTypes: [],
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (this.$refs.dataForm) {
          this.$refs.dataForm.resetFields()
        }
        if (id) {
          this.title = "编辑虚拟房型"
          detailApi({ id: id }).then(res => {
            this.dataForm.pmsVirtualRoomType = res.data
          })
        } else {
          this.title = "新增虚拟房型"
          this.dataForm = new PmsVirtualRoomType()
        }
        this.listRoomType()
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
            if (this.dataForm.virtualPk) {
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
      },
      listRoomType () {
        roomTypeList({typeMaster: 'ROOM_TYPE'}).then(result => {
          this.roomTypes = result.data.data
        })
      },
      judgeDisabled () {
        if (this.dataForm.name != null && this.dataForm.name != '' && this.dataForm.typePk != null && this.dataForm.typePk != '' 
        && this.dataForm.channelCode != null && this.dataForm.channelCode != '') {
          return false
        } else {
          return true
        }
      },
    }
  }
</script>

<style scoped>
.width-60 {
  width: 70%;
}
</style>

<style>
.virtual-dialog .el-dialog .el-dialog__header {
  padding: 15px 20px;
  border-bottom: 1px solid #e9e9e9;
}
.virtual-dialog .el-dialog .el-dialog__body {
  padding: 20px 20px 2px !important;
}
.virtual-dialog .el-dialog .el-dialog__footer {
  padding: 15px 20px;
  border-top: 1px solid #e9e9e9;
}
</style>

