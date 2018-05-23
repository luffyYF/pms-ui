<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="10">
            <div class="bg-reserve">
              <h5 class="info-title">支付超时</h5>
              <el-col :span="24">
                <el-form-item label="支付时间：">
                  <el-input-number size="mini" v-model="num7"></el-input-number>分钟
                </el-form-item>
              </el-col>
                注：支付超时，系统将自动取消订单，“0”为不自动取消。
            </div>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
          <el-col :span="13">
            <div class="bg-reserve">
              <h5 class="info-title">支付超时</h5>
              <el-col :span="24">
                <el-form-item label="自助结账：">
                  <el-radio v-model="radio1" label="1">是</el-radio><el-radio v-model="radio1" label="2">否</el-radio>
                </el-form-item>
              </el-col>
              &nbsp;
            </div>
          </el-col>
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
        radio1: '',
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
  background: #f7f7f7;
  border: 1px solid #ccc;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  padding: 5px;
  padding-top: 15px;
  border: 1px solid #ccc;
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