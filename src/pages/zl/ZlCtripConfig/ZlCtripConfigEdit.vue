// 携程直连配置编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <el-dialog class="add-permission" :title="title" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="small" :rules="rules" :model="dataForm" label-width="110px">
    <!-- <el-form-item label="携程直连配置主键" prop="zlCtropId">
      <el-input size="small" v-model="dataForm.zlCtropId" type="text"/>
    </el-form-item> -->
    <el-form-item label="携程酒店代码" prop="hotelGroupCode">
      <el-input size="small" v-model="dataForm.hotelGroupCode" type="text"/>
    </el-form-item>
    <!-- <el-form-item label="创建时间" prop="createTime">
      <el-date-picker size="small" v-model="dataForm.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间"/>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-date-picker size="small" v-model="dataForm.updateTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间"/>
    </el-form-item> -->
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { addApi, detailApi, updateApi } from '@/api/zl/zlCtripConfigApi'

  class ZlCtripConfig {
    constructor () {
      this.zlCtropId = null
      this.hotelGroupCode = null
      this.createTime = null
      this.updateTime = null
    }

    set zlCtripConfig (zlCtripConfig) {
      this.zlCtropId = zlCtripConfig.zlCtropId
      this.hotelGroupCode = zlCtripConfig.hotelGroupCode
      this.createTime = zlCtripConfig.createTime
      this.updateTime = zlCtripConfig.updateTime
    }
  }

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: new ZlCtripConfig(),
        rules: {
          hotelGroupCode: [{ required: true, message: '请填写携程酒店代码', trigger: 'blur' }],
        },
        title:"添加携程直连配置"
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        
        if (id) {
          this.title = "编辑携程直连配置"
          detailApi({ id: id }).then(res => {
            this.dataForm = res.data
          })
        }else{
          this.title = "添加携程直连配置"
          this.dataForm = new ZlCtripConfig()
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
            if (this.dataForm.zlCtropId) {
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
