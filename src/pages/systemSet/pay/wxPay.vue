<template>
  <div>
    <el-form  :model="form" size="mini" class="demo-form-inline" label-width="120px">
      <div class="book-info">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="18">
                <div class="bg-reserve">
                  <h5 class="info-title">微信参数设置</h5>
                  <el-form-item label="应用id">
                      <el-input size="mini" style="width:300px;" v-model="form.appId" type="text"/>
                  </el-form-item>
                  <el-form-item label="appSecret">
                      <el-input size="mini" style="width:300px;" v-model="form.appSecret" type="text"/>
                  </el-form-item>
                  <!-- <el-form-item label="标题">
                      <el-input size="mini" style="width:300px;" v-model="form.name" type="text"/>
                  </el-form-item> -->
                  <el-form-item label="商户id">
                      <el-input size="mini" style="width:300px;" v-model="form.mchId" type="text"/>
                  </el-form-item>
                  <el-form-item label="商户密匙">
                      <el-input size="mini" style="width:300px;" v-model="form.mchKey" type="text"/>
                  </el-form-item>
                  <el-form-item label="回调路径">
                      <el-input size="mini" style="width:300px;" v-model="form.notifyUrl" type="text"/>
                  </el-form-item>
                  <el-form-item label="keyStoreFilePath">
                      <KeyStoreFileUpload :avatar.sync="form.keyStoreFilePath" />
                      <span style="color:#606266;" v-if="form.keyStoreFilePath">{{form.keyStoreFilePath}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center">
                <el-button type="primary" size="mini" v-if="hasPerm('pms:wxPay:save')" @click="onSubmit">保存</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {saveOrUpdate, getConfig} from '@/api/pay/wxPayConfig'
  import KeyStoreFileUpload from '@/components/upload/KeyStoreFileUpload'
  
  export default {
    components:{KeyStoreFileUpload},
    data() {
      return {
        type:"0",
        form: {

        },
        queryPower:this.hasPerm('pms:alipay:view')
      }
    },
    mounted(){
    //   this.init()
    },
    methods: {
      init() {
        if(!this.queryPower){
          this.$message({
            message: '权限不足',
            type: 'warning'
          });
          return
        }
        getConfig({companyPk:localStorage.getItem("select_company_pk"),type:this.type}).then(res=>{
          this.form = res.data
          if(this.form == null){
              this.form  = {}
          }
          this.form.companyPk = localStorage.getItem("select_company_pk")
          if(this.form.notifyUrl == null || this.form.notifyUrl == ""){
              this.form.notifyUrl = "https://pay.housefeel.cn/api/wx/notify"
          }
        })
      },
      onSubmit() {
        saveOrUpdate(this.form).then(res=>{
          this.$message.success(res.sub_msg);
        })
      }
    }
  }
</script>

<style scoped>
.book-info{
  padding: 20px;
  background: #f7f7f7;
  border: 1px solid #ccc;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  padding: 5px;
  padding-top: 15px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 10px;
  background: #f7f7f7;
}
.el-select {
  width: 130px;
}
.el-input--mini{
  width: 100px;
}
.el-date-editor--time{
  width: 150px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom:5px;
}
.red{
  color:red;
}
</style>
