<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="12">
                <div class="bg-reserve">
                  <h5 class="info-title">会员卡号验证设置</h5>
                  <el-form-item label="是否限制号段：">
                    <el-radio v-model="radio" label="1">限制 </el-radio><el-radio v-model="radio" label="2">不限制</el-radio>
                  </el-form-item>
                  <el-form-item label="是否允许包含4：">
                    <el-radio v-model="radio" label="1">包含</el-radio><el-radio v-model="radio" label="2">不包含</el-radio>
                  </el-form-item>
                  <el-form-item label="是否允许包含7：">
                    <el-radio v-model="radio" label="1">包含</el-radio><el-radio v-model="radio" label="2">不包含</el-radio>
                  </el-form-item>
                  <el-form-item label="是否允许包含字母：">
                    <el-radio v-model="radio" label="1">允许</el-radio><el-radio v-model="radio" label="2">不允许</el-radio>
                  </el-form-item>
                  <el-form-item label="是否验证卡号位数：">
                    <el-radio v-model="radio" label="1">验证</el-radio><el-radio v-model="radio" label="2">不验证</el-radio>
                  </el-form-item>
                  <el-form-item label="会员卡号最大位数：">
                    <el-input size="mini"></el-input>位
                  </el-form-item>
                </div>
                 <div class="bg-reserve">
                  <h5 class="info-title">会员卡费现金默认收取哑房</h5>
                  <el-form-item label="组单号：">
                    <el-input size="mini" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="默认账户：">
                    <el-input size="mini"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">会员充值设置</h5>
                  <el-form-item label="是否启用：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item>
                  <el-form-item label="是否验证密码：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item>
                  <el-form-item label="是否启用持他卡付款：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item>
                  <el-form-item label="持他卡付款会员卡号是否允许手工输入：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">会员充值设置</h5>
                  <el-form-item label="持他卡是否积分">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不积分" value="close"></el-option>
                      <el-option label="积分" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="会员积分兑换验证密码">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不验证" value="close"></el-option>
                      <el-option label="验证" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="客人当天登记最大客房数：">
                  <el-input size="mini"></el-input>
                  <span class="red">&nbsp;&nbsp;&nbsp;&nbsp;注：0表示不限制登记的客房数</span>
                </el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-form-item label="会员卡费为0是否需要授权：">
                  <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="持他卡当天登记最大客房数：">
                  <el-input size="mini"></el-input>
                  <span class="red">&nbsp;&nbsp;&nbsp;&nbsp;注：0表示不限制登记的客房数</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                &nbsp;
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button type="primary">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>  
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value2: new Date(),
        username:'',
        radio:'',
        num7:1,
        qudao:'close',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      init() {
        this.list()
      },
      list(){},
      onSubmit() {
        console.log('submit!');
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
  width: 50px;
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