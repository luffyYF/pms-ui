<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="15">
            <el-row>
              <el-col :span="12">
                <div class="bg-reserve">
                  <h5 class="info-title">入住未核查空净房</h5>
                  <el-form-item>
                    <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">入住空脏房</h5>
                  <el-form-item>
                    <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="bg-reserve">
                  <h5 class="info-title">修改预订信息</h5>
                  <el-form-item label="是否允许修改预订信息：">
                    <el-radio v-model="radio" label="1">允许</el-radio><el-radio v-model="radio" label="2">不允许</el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">夜审后置为脏房</h5>
                  <el-form-item>
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="bg-reserve">
                  <h5 class="info-title">入住维修房</h5>
                  <el-form-item label="是否允许修改预订信息：">
                      <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">NoShow</h5>
                  <el-form-item label="NoShow是否扣积分">
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                  </el-form-item>
                  <br/>
                  <el-form-item label="NoShow扣积分">
                    <el-input></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="bg-reserve">
                  <h5 class="info-title">客人来源</h5>
                  <el-form-item label="允许选择客人来源：">
                      <el-radio v-model="radio" label="1">选择</el-radio><el-radio v-model="radio" label="2">不选择</el-radio>
                  </el-form-item>
                  <el-form-item label="默认客人来源：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="步入散客" value="close"></el-option>
                      <el-option label="直接预订" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="bg-reserve">
                  <h5 class="info-title">允许修改房间价格</h5>
                  <el-form-item label="">
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                    <span class="red">注：修改预订或入住时的房间价格。</span>
                  </el-form-item>
                  <el-form-item label="是否需要授权：">
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="bg-reserve">
                  <h5 class="info-title">预离房设置</h5>
                  <el-form-item label="是否参加排房：">
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="11" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">房价体系设置</h5>
                   <el-form-item label="是否使用新房价体系：">
                    <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">预订设置</h5>
              <el-form-item>
              使用积分担保的预订，超过保留时效扣除<el-input size="mini"></el-input> 积分。<br/>
              </el-form-item>
              <el-form-item>
              全程担保自动入住并占房&nbsp;&nbsp;&nbsp;&nbsp;<el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>;
              </el-form-item>
              <el-form-item label="默认预订预抵时间">
                <el-time-picker
                  v-model="value2"
                  :picker-options="{
                    selectableRange: '111:30 - 20:30'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
              </el-form-item>
              <el-form-item>
                明日预订房是否显示图标
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="不显示" value="close"></el-option>
                  <el-option label="显示" value="open"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">预订单是否可以制门卡</h5>
              <el-form-item>
                <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">押金设置</h5>
              <el-form-item label="押金收取提醒：">
                <el-radio v-model="radio" label="1">开启</el-radio><el-radio v-model="radio" label="2">关闭</el-radio>
              </el-form-item>
              <el-form-item label="押金收取方式：">
                <el-radio v-model="radio" label="1">自动填充提醒金额手动收取</el-radio><br/>
                <el-radio v-model="radio" label="2">按照提醒金额强制自动收取</el-radio><br/>
                <el-radio v-model="radio" label="2">手动输入金额手动收取</el-radio>
              </el-form-item>
              <el-form-item label="押金计算公式：">
                押金 = 总房费 + <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="取整百舍入临界值：">
                <el-input size="mini"></el-input>
              </el-form-item>
              <el-form-item label="押金余额报警：">
                当余额小于<el-input size="mini"></el-input>时报警
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">组单名称是否可以修改</h5>
              <el-form-item>
                <el-radio v-model="radio" label="1">可以</el-radio><el-radio v-model="radio" label="2">不可以</el-radio>
              </el-form-item>
            </div>
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