<template>
  <el-dialog title="编辑" width="40%" :visible.sync="dialogVisible">
    <el-form :model="form" label-width="85px" ref="form" :rules="rules">
      <el-form-item label="图标" prop="icon">
        <el-input v-model="form.icon" clearable></el-input>
      </el-form-item>
      <el-form-item label="系统标题" prop="title">
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="系统名称">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="根目录" prop="basePath">
        <el-input v-model="form.basePath" clearable></el-input>
      </el-form-item>
      <el-form-item label="主题">
        <el-input v-model="form.theme" clearable></el-input>
      </el-form-item>
      <el-form-item label="背景">
        <el-input v-model="form.banner" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" active-value="1" active-text="正常"  inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="saveSystem()">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import bus from '@/utils/bus'
  import {getSystemById, addSystem, updateSystem} from '@/api/upmsSystem'
  import {uploadAvatar, getBrowseImgUrl} from '@/api/upload'

  /**
   * 实体类对象
   */
  class UpmsSystem {
    static rules = {
      title: [
        {required: true, message: '请填写系统标题', trigger: 'blur'},
        {min: 2, message: '账号最少 2 个字符', trigger: 'blur'}
      ],
      basePath: [
        {required: true, message: '请填写项目根路径', trigger: 'blur'}
      ],
      icon: [
        {required: true, message: '请选择图标', trigger: 'blur'}
      ]
    };

    constructor (obj) {
      if (obj === undefined) {
        this.systemId = ''
        this.icon = ''
        this.title = ''
        this.name = ''
        this.basePath = ''
        this.theme = ''
        this.banner = ''
        this.description = ''
        this.status = '1'
      } else {
        this.systemId = obj.systemId
        this.icon = obj.icon
        this.title = obj.title
        this.name = obj.name
        this.basePath = obj.basePath
        this.theme = obj.theme
        this.banner = obj.banner
        this.description = obj.description
        this.status = obj.status.toString()
      }
    }
  }

  export default {
    data () {
      return {
        uploadAvatar: uploadAvatar,
        dialogVisible: false,
        loading: false,
        // imageUrl: '',
        form: {},
        rules: UpmsSystem.rules,
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id === undefined) {
          this.form = new UpmsSystem()
          // this.imageUrl = ''
        } else {
          getSystemById(id).then(res => {
            this.form = new UpmsSystem(res.data)
            // this.imageUrl = getBrowseImgUrl(this.form.avatar)
          })
        }
      },
      saveSystem () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            let service = this.form.systemId === '' ? addSystem(this.form) : updateSystem(this.form)
            service.then(result => {
              let {msg, code} = result
              if (code !== 1) {
                this.$message({message: msg, type: 'error'})
              } else {
                bus.$emit('upmsSystemChange')
                this.dialogVisible = false
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      // 头像上传成功回调
      handleAvatarSuccess (res, file) {
        this.form.avatar = res.data
        // this.imageUrl = URL.createObjectURL(file.raw)
      },
      // 头像上传前执行
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    mounted () {
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
