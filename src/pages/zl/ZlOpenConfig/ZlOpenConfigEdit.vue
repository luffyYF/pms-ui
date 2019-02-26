// 直连配置编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="100px">
    <el-form-item label="第三方标识:" prop="threeId">
      <el-input size="small" v-model="dataForm.threeId" type="text"/>
    </el-form-item>
    <el-form-item label="携程状态:" prop="ctripStatus">
      <el-radio v-model="dataForm.ctripStatus" :label="-1">停用</el-radio>
      <el-radio v-model="dataForm.ctripStatus" :label="0">未启用</el-radio>
      <el-radio v-model="dataForm.ctripStatus" :label="1">启用</el-radio>
    </el-form-item>
    <el-form-item label="飞猪状态:" prop="fliggyStatus">
      <el-radio v-model="dataForm.fliggyStatus" :label="-1">停用</el-radio>
      <el-radio v-model="dataForm.fliggyStatus" :label="0">未启用</el-radio>
      <el-radio v-model="dataForm.fliggyStatus" :label="1">启用</el-radio>
    </el-form-item>
    <el-form-item label="美团状态:" prop="meituanStatus">
      <el-radio v-model="dataForm.meituanStatus" :label="-1">停用</el-radio>
      <el-radio v-model="dataForm.meituanStatus" :label="0">未启用</el-radio>
      <el-radio v-model="dataForm.meituanStatus" :label="1">启用</el-radio>
    </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi } from '@/api/zl/zlOpenConfigApi'

  class ZlOpenConfig {
    constructor () {
      this.zlOpenId = null
      this.threeId = null
      this.ctripStatus = 0
      this.fliggyStatus = 0
      this.meituanStatus = 0
      this.createTime = null
      this.updateTime = null
    }

    set zlOpenConfig (zlOpenConfig) {
      this.zlOpenId = zlOpenConfig.zlOpenId
      this.threeId = zlOpenConfig.threeId
      this.ctripStatus = zlOpenConfig.ctripStatus
      this.fliggyStatus = zlOpenConfig.fliggyStatus
      this.meituanStatus = zlOpenConfig.meituanStatus
      this.createTime = zlOpenConfig.createTime
      this.updateTime = zlOpenConfig.updateTime
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new ZlOpenConfig(),
        rules: {
          threeId: [{ required: true, message: '请选择第三方标识', trigger: 'blur' }],
          ctripStatus: [{ required: true, message: '请选择携程状态', trigger: 'change' }],
          fliggyStatus: [{ required: true, message: '请选择飞猪状态', trigger: 'change' }],
          meituanStatus: [{ required: true, message: '请选择美团状态', trigger: 'change' }],
        },
        title:"添加直连配置",
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id) {
          this.title = "编辑直连配置"
          detailApi({ id: id }).then(res => {
            this.dataForm.zlOpenConfig = res.data
          })
        } else {
          this.title = "添加直连配置"
          this.dataForm = new ZlOpenConfig()
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
            if (this.dataForm.zlOpenId) {
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
