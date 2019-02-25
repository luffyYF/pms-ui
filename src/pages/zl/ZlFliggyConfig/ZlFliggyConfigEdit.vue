// 飞猪直连配置编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="80px">
    <el-form-item label="appkey" prop="appkey">
      <el-input size="small" v-model="dataForm.appkey" type="text"/>
    </el-form-item>
    <el-form-item label="appsecret" prop="appsecret">
      <el-input size="small" v-model="dataForm.appsecret" type="text"/>
    </el-form-item>
    <el-form-item label="sessionkey" prop="sessionkey">
      <el-input size="small" v-model="dataForm.sessionkey" type="text"/>
    </el-form-item>
    <el-form-item label="请求地址" prop="url">
      <el-input size="small" v-model="dataForm.url" type="text"/>
    </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi } from '@/api/zl/zlFliggyConfigApi'

  class ZlFliggyConfig {
    constructor () {
      this.zlFliggyId = null
      this.appkey = null
      this.appsecret = null
      this.sessionkey = null
      this.url = null
      this.createTime = null
      this.updateTime = null
    }

    set zlFliggyConfig (zlFliggyConfig) {
      this.zlFliggyId = zlFliggyConfig.zlFliggyId
      this.appkey = zlFliggyConfig.appkey
      this.appsecret = zlFliggyConfig.appsecret
      this.sessionkey = zlFliggyConfig.sessionkey
      this.url = zlFliggyConfig.url
      this.createTime = zlFliggyConfig.createTime
      this.updateTime = zlFliggyConfig.updateTime
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new ZlFliggyConfig(),
        rules: {
          appkey: [{ required: true, message: '请填写appkey', trigger: 'blur' }],
          appsecret: [{ required: true, message: '请填写appsecret', trigger: 'blur' }],
          sessionkey: [{ required: true, message: '请填写sessionkey', trigger: 'blur' }],
          url: [
            { required: true, message: '请填写请求地址', trigger: 'blur' }
          ]
        },
        title:"添加飞猪直连配置"
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        
        if (id) {
          this.title = "编辑飞猪直连配置"
          detailApi({ id: id }).then(res => {
            this.dataForm.zlFliggyConfig = res.data
          })
        }else {
          this.dataForm = new ZlFliggyConfig()
          this.title = "添加飞猪直连配置"
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
            if (this.dataForm.zlFliggyId) {
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
