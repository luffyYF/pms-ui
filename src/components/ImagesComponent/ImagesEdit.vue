
// 图片编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="images-contain">
		<el-form label-width="70px">
			<el-form-item label="图片" size="mini">
				<el-upload
					class="upload-demo"
					:action="getUploadImageAction()"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:headers="headers"
					:file-list="imagesById(imagePos)"
					list-type="picture-card"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
		</el-form>

		<el-dialog title="设置排序" :visible.sync="dialogFormVisible" width="400px" append-to-body>
			<el-form size="small">
				<el-form-item label="排序" label-width="100px" style="margin: 10px 0">
					<el-input-number v-model="num" :min="0" :step="1" ></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="returnNum" size="mini">确 定</el-button>
			</div>
		</el-dialog>
  </section>
</template>

<script>
import UploadAvatar from "@/components/UploadImage/UploadAvatar2"
import { getUploadImageAction, sourceImgUrl } from "@/api/upload"

  export default {
    props: ['imagePos', 'id'],
  	components: {UploadAvatar},
    data () {
      return {
				dialogVisible: false,
				// imagePos: [],
        getUploadImageAction: getUploadImageAction,
				headers: {'Authorization': 'Bearer '+localStorage.getItem('token') },
				dialogFormVisible: false,
				num: 0,
				url: null,
      }
		},
    methods: {
      // showDialog (id) {
			// 	this.imagesTypeId = id
			// 	console.log(this.imagesTypeId)
      // },
      // 头像上传成功回调
      handleAvatarSuccess (res, file) {
        if (res.code != 1) {
					this.$message({type: 'error', message: res.sub_msg})
					this.imagePos.splice(0,1)
          return
				}
				
				let url
				// 图片包含http 或 https
				if (res.data[0].path.indexOf('http://') > -1 || res.data[0].path.indexOf('https://') > -1) {
					url = res.data[0].path
				} else {
					// 拼接上项目前缀http或https
					url = sourceImgUrl + res.data[0].path
				}
				this.imagePos.push({imageName: file.name, imageUrl: res.data[0].path, url: url, sortNum: 0, imagesTypeId: this.id})
				this.$emit('update:imagePos', this.imagePos)
        // this.$emit('update:avatar', res.data)
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
			},
			handleRemove(file, fileList) {
				for (let i = 0; i < this.imagePos.length; i++) {
					if (this.imagePos[i].imageUrl == file.imageUrl) {
						this.imagePos.splice(i, 1)
					}
				}
        console.log(this.imagePos);
				this.$emit('update:imagePos', this.imagePos)
      },
      handlePreview(file) {
				console.log(file);
				this.num = file.sortNum
				this.url = file.imageUrl
				this.dialogFormVisible = true
			},
			returnNum () {
				this.imagePos.forEach(item => {
					if (item.imageUrl == this.url) {
						item.sortNum = this.num
					}
				})
				this.$emit('update:imagePos', this.imagePos)
				this.dialogFormVisible = false
			},
			imagesById (list) {
				let images = []
				if (list.length > 0) {
					list.forEach(item => {
						// console.log(this.imagesTypeId)
						if (item.imagesTypeId == this.id) {
							images.push(item)
						}
					})
					return images
				} else {
					return list
				}
			},
		}
  }
</script>

<style scoped>
.text-style {
	display: inline-block;
	height: 40px;
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
}
</style>
<style>
.upload-demo .el-icon-zoom-in:before {
	content: "\e6ca";
}
.images-contain .el-tabs__content {
  padding: 20px 20px !important;
}
.images-contain .el-dialog__body{
  padding:20px 0 10px !important;
}
.images-contain .el-transfer-panel{
  width:300px;
}
</style>