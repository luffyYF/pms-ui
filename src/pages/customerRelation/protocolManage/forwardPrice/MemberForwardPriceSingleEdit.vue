// 会员远期房价单个设置
<template>
  <el-dialog class="add-permission" :title="title" top="100px" :visible.sync="dialogVisible" width="500px"
             :close-on-click-modal="false" :before-close="handleClose">
    <el-form ref="dataForm" size="mini" :rules="rules" :model="dataForm" label-width="110px">
        <el-form-item label="单位名称" prop="gradeName">
            {{dataForm.unitName}}
        </el-form-item>
        <el-form-item label="房间类型" prop="roomTypeName">
            {{dataForm.roomTypeName}}
        </el-form-item>
        <el-form-item label="日期" prop="date">
            {{dataForm.date}}
        </el-form-item>
        <el-form-item label="房间价格" prop="price">
            <el-input-number size="mini" style="width:100%;" :precision="2" :step="1" :min="0" :controls="false" v-model="dataForm.price" ></el-input-number>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="saveData">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {singleSettingPrice} from '@/api/systemSet/member/pmsMemberForwardPrice'
  export default {
    data () {
      return {
        dialogVisible: false,
        loading: false,
        dataForm: {

        },
        rules: {
          price: [{ required: true, message: '请填写房价', trigger: 'blur' }],
        },
        title:"设置价格",
      }
    },
    methods: {
      showDialog (row) {
        this.dataForm = row
        this.dialogVisible = true
      },
      handleClose () {
        this.dialogVisible = false
      },
      // 保存数据
      saveData () {
        let refs = this.$refs
        refs.dataForm.validate(valid => {
          if (valid) {
            let api = singleSettingPrice(this.dataForm)
            api.then(res => {
                if(res.code == 1){
                    this.$message({ type: 'success', message: res.sub_msg })
                    this.dialogVisible = false
                    this.$emit('callback')
                }else{
                    this.$message({ type: 'warning', message: res.sub_msg })
                }
            }).finally(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>
