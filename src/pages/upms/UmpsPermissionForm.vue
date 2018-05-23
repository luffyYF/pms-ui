<template>
  <el-dialog title="编辑" width="40%" :visible.sync="dialogVisible">
    <el-form :model="form" label-width="85px" ref="form" :rules="rules">
      <el-form-item label="账号" prop="permissionName">
        <el-input v-model="form.permissionName" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="form.permissionId==''">
        <el-input v-model="form.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realName" clearable></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="getBrowseImgUrl(form.avatar)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="锁定" prop="locked">
        <el-switch v-model="form.locked" active-value="Y" inactive-value="N">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="savePermission()">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import bus from '@/utils/bus'
  import {getPermissionById, addPermission, updatePermission} from '@/api/upmsPermission'
  import {uploadAvatar, getBrowseImgUrl} from '@/api/upload'

  /**
   * 实体类对象
   */
  class UpmsPermission {
    static rules = {
      permissionName: [
        {required: true, message: '请填写账号', trigger: 'blur'},
        {min: 6, message: '账号最少 6 个字符', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请填写密码', trigger: 'blur'},
        {min: 6, message: '长度最少 6 个字符', trigger: 'blur'}
      ]
    };

    constructor (obj) {
      if (obj === undefined) {
        this.permissionId = ''
        this.permissionName = ''
        this.realName = ''
        this.avatar = ''
        this.permissionType = ''
        this.locked = 'N'
      } else {
        this.permissionId = obj.permissionId
        this.permissionName = obj.permissionName
        this.realName = obj.realName
        this.avatar = obj.avatar
        this.permissionType = obj.permissionType
        this.locked = obj.locked
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
        rules: UpmsPermission.rules,
        getBrowseImgUrl: getBrowseImgUrl
      }
    },
    methods: {
      showDialog (id) {
        this.dialogVisible = true
        if (id === undefined) {
          this.form = new UpmsPermission()
          // this.imageUrl = ''
        } else {
          getPermissionById(id).then(res => {
            this.form = new UpmsPermission(res.data)
            // this.imageUrl = getBrowseImgUrl(this.form.avatar)
          })
        }
      },
      savePermission () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            let service = this.form.permissionId === '' ? addPermission(this.form) : updatePermission(this.form)
            service.then(result => {
              let {msg, code} = result
              if (code !== 1) {
                this.$message({message: msg, type: 'error'})
              } else {
                bus.$emit('upmsPermissionChange')
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
