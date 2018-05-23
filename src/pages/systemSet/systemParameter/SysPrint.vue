<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="20">
            <div class="bg-reserve">
              <h5 class="info-title">打印</h5>
              <el-form-item label="打印设备：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="web打印" value="close"></el-option>
                  <el-option label="java打印" value="open"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="打印纸张：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="A4" value="close"></el-option>
                  <el-option label="A4二等分" value="close"></el-option>
                  <el-option label="A4三等分" value="close"></el-option>
                  <el-option label="小票（74mm）" value="close"></el-option>
                  <el-option label="小票（58mm）" value="open"></el-option>
                </el-select>
                <span class="red">注：使用java打印需点击下载</span>
              </el-form-item><br/>
              <el-form-item>
                账单、RC单证件号后<el-input size="mini"></el-input>位用 <el-input size="mini"></el-input>显示
              </el-form-item><br/>
              <el-form-item>
                除了报表打印以外的单据打印在浏览器
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="原来窗口" value="close"></el-option>
                  <el-option label="新窗口" value="open"></el-option>
                </el-select>
                弹出打印页面
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">换房打印设置</h5>
              <el-form-item label="默认选择：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="不打印" value="close"></el-option>
                  <el-option label="打印" value="open"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">押金单打印设置</h5>
              <el-form-item label="是否重复打印：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="只能打印一次" value="close"></el-option>
                  <el-option label="允许重复打印" value="open"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="录入押金自动打印：">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否 </el-radio>
              </el-form-item><br/>
              <el-form-item label="押金单备注：">
                <el-input size="mini" class="changdian"></el-input>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">RC单打印设置</h5>
              <el-form-item label="是否合并打印入住人：">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否 </el-radio>
              </el-form-item><br/>
              <el-form-item label="RC单内容：">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </el-form-item><br/>
              <span class="red">注：退房时间=${edate}</span>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">账单打印设置</h5>
              <el-form-item label="结账打印：">
                <el-radio v-model="radio" label="1">打印</el-radio>
                <el-radio v-model="radio" label="2">不打印</el-radio>
                <el-radio v-model="radio" label="3">每次都提醒是否打印</el-radio>
              </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-form-item label="商品部挂账商品是否以明细方式打印：">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否 </el-radio>
              </el-form-item><br/>
              <el-form-item label="账单备注：">
                <el-input size="mini" class="changdian"></el-input>
                <span class="red">（注：最多可输入50个字符）</span>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">会员充值打印设置</h5>
              <el-form-item label="充值说明：">
                <el-input size="mini" class="changdian"></el-input>
                <span class="red">（注：最多可输入50个字符）</span>
              </el-form-item>
            </div>
            <div class="bg-reserve">
              <h5 class="info-title">哑房账单打印设置</h5>
              <el-form-item label="哑房账单打印方式：">
                <el-radio v-model="radio" label="1">系统默认排序打印</el-radio>
                <el-radio v-model="radio" label="2">按照当前排序打印</el-radio>
              </el-form-item>
            </div>
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
        textarea:'',
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
.changdian{
  width: 500px;
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
.el-textarea{
  width: 500px;
}
</style>