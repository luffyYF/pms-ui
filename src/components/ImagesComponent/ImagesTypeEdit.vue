
// 图片类型编辑
// Created by Administrator on 2019-02-21T16:46:19.175.
<template>
  <section class="room-iamges-type">
		<el-dialog class="add-permission" :title="title" :visible.sync="dialogVisible" width="400px" append-to-body
							:close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="90px">
				<el-form-item label="类型名称" prop="typeName" size="mini">
					<el-input v-model="dataForm.typeName" style="width: 90%"></el-input>
				</el-form-item>
				<el-form-item label="排序" size="mini">
					<el-input-number v-model="dataForm.sortNum" :min="0" :step="1"></el-input-number>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" size="mini" @click="saveData" :loading="loading">{{dataForm.imagesTypeId == null ? '保存' : '修改'}}</el-button>
			</span>
		</el-dialog>
  </section>
</template>

<script>
import { addApi, updateApi, detailApi } from '@/api/ModuleImagesTypeApi'

  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {
					imagesTypeId: null,
					typeName: null,
					thirdId: localStorage.getItem(""),
					groupId: null,
					sortNum: 0,
        },
        title:"",
        rules: {//表单验证
          typeName: [
            { required: true, message: '请填写类型名称', trigger: 'blur' },
          ],
				},
      }
    },
    methods: {
      showDialog (imagesTypeId, thirdId, groupId) {
        if (imagesTypeId) {
          this.title = '修改图片类型'
          this.findDetail(imagesTypeId)
        } else {
          this.title = '添加图片类型'
          this.resetForm(thirdId, groupId)
        }
        if (this.$refs.dataForm != undefined) {
          this.$refs.dataForm.clearValidate()
        }
        this.dialogVisible = true
      },
      resetForm (thirdId, groupId) {
        this.dataForm = {
					imagesTypeId: null,
					typeName: null,
					thirdId: thirdId,
					groupId: groupId,
					sortNum: 0,
        }
      },
      saveData(){ 
        const self = this;
        self.loading = true
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if(self.dataForm.imagesTypeId == null){
              addApi(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }else{
              updateApi(self.dataForm).then(result => {
                if(result.code == 1){
                  self.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
                self.dialogVisible = false
                this.$emit('callback')
              }).finally(() => {
                self.loading = false
              })
            }
          } else {
            self.loading = false
          }
        });
      },
      handleClose () {
        this.dialogVisible = false
        // this.$emit('callback')
      },
      findDetail (id) {
        detailApi({id: id}).then(res => {
          this.dataForm = res.data
        })
      },
    }
  }
</script>

<style>
.room-iamges-type .el-tabs__content {
  padding: 20px 20px !important;
}
.room-iamges-type .el-dialog__body{
  padding:20px 0 10px !important;
}
.room-iamges-type .el-transfer-panel{
  width:300px;
}
</style>