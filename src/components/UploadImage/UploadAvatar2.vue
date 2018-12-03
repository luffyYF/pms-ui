
// 上传带身份验证
<template>
  <el-upload
    :avatar.sync="avatar"
    class="avatar-uploader"
    :action="getUploadImageAction()"
    :headers="headers"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="avatar" :src="avatar|sourceImgUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import { getUploadImageAction } from "@/api/upload"

  export default {
    props: ['avatar'],
    data: function () {
      return {
        //上传请求特殊，需要加上请求头，用于身份验证
        headers: {'Authorization': 'Bearer '+localStorage.getItem('pms_token') },
        getUploadImageAction: getUploadImageAction
      }
    },
    methods: {
      // 头像上传成功回调
      handleAvatarSuccess (res, file) {
        this.$emit('update:avatar', res.data)
        // this.$emit('update:avatar', res.filePaths[0])
        // this.avatar = res.data
        // this.imageUrl = URL.createObjectURL(file.raw)
      },
      // 头像上传前执行
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>


<style scope>
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
