<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <el-row class="bg-reserve">
        <el-col :span="24" class="book-info">
          <el-row>
            <el-col :span="11">
              <el-form-item label="早上日租时间" label-width="200px">
                <el-time-picker
                  v-model="value2"
                  :picker-options="{
                    selectableRange: '111:30:00 - 20:30:00'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="协议单位中午日租时间	">
                <el-time-picker
                  v-model="value2"
                  :picker-options="{
                    selectableRange: '111:30:00 - 20:30:00'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="下午日租时间" label-width="200px">
                <el-time-picker
                  v-model="value2"
                  :picker-options="{
                    selectableRange: '111:30:00 - 20:30:00'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="银行卡入账：">
                <el-form-item label="填银行卡号">
                  <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="选择银行">
                  <el-radio v-model="radio1" label="1">是</el-radio><el-radio v-model="radio1" label="2">否</el-radio>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="入住" label-width="200px">
                <el-input-number size="mini" v-model="num7"></el-input-number>分钟内取消日租不需授权
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="凌晨收取日租房费">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="房退不结退房恢复" label-width="200px">
                <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="预授权未完成是否能做退房不结账">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="当天来当天走收取一天房费" label-width="200px">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="退房未结组单结账是否授权">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="冲减" label-width="200px">
                <el-radio v-model="radio" label="1">可以部分冲减</el-radio><el-radio v-model="radio" label="2">必须全部冲减</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="微信支付、微信付款、支付宝当面付冲减">
                <el-radio v-model="radio" label="1">可以部分冲减</el-radio><el-radio v-model="radio" label="2">必须全部冲减</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="两套账（是否和发票相关）" label-width="200px">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="房费调整是否需要授权">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="22">
            &nbsp;
          </el-col>
          <el-col :span="22">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value2: new Date(),
        radio:'',
        radio1:'',
        num7:1,
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
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 11px;
  border: 1px solid #ccc;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 13px;
  background: #f7f7f7;
}
.el-select {
  width: 1711px;
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
</style>