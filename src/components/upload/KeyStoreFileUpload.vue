
<template>
<el-upload
  :avatar.sync="avatar"
  class="upload-demo"
  :action="uploadKeyStoreFile"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <el-button size="mini" type="primary">点击上传</el-button>
</el-upload>
</template>


<script>
import {uploadKeyStoreFile} from '@/api/upload'
  export default {
    props: ['avatar'],
    data() {
      return {
        uploadKeyStoreFile:"",
        fileList: [
        ]
      };
    },
    mounted(){
      this.uploadKeyStoreFile = uploadKeyStoreFile
    },
    methods: {
       // 头像上传成功回调
      handleAvatarSuccess (res, file) {
        this.$emit('update:avatar', res.data)
        // this.avatar = res.data
        // this.imageUrl = URL.createObjectURL(file.raw)
      },
      // 头像上传前执行
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
        // }
        return true
      }
    }
  }
</script>

<style>

</style>
