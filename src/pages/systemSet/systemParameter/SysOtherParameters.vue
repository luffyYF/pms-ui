<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="7">
                <div class="bg-reserve">
                  <h5 class="info-title">查询设置</h5>
                  <el-form-item label="会员查询类别：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="列表方式" value="close"></el-option>
                      <el-option label="唯一方式" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="组单查询类别：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="普通方式" value="close"></el-option>
                      <el-option label="复杂方式" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">短信设置</h5>
                  <el-form-item label="发送方式：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="列表方式" value="close"></el-option>
                      <el-option label="唯一方式" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="内容允许字数：<=">
                    <el-input size="mini"></el-input>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">修改客人资料设置</h5>
                  <el-form-item label="入住后禁止修改客人资料：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不启用" value="close"></el-option>
                      <el-option label="启用" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">排房排序方式</h5>
                  <el-form-item>
                   <el-radio v-model="radio" label="1">按房间号码</el-radio>
                    <el-radio v-model="radio" label="2">按房间出租率</el-radio>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">房态图设置</h5>
                  <el-form-item label="房间大小">
                    宽<el-input size="mini"></el-input>px × 高<el-input size="mini"></el-input>px
                  </el-form-item><br/>
                  <el-form-item label="房间图标">
                    宽<el-input size="mini"></el-input>px × 高<el-input size="mini"></el-input>px
                  </el-form-item><br/>
                  <el-form-item label="每行显示房间数：">
                    <el-input size="mini"></el-input>
                  </el-form-item><br/>
                  <el-form-item label="按楼层换行显示：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item><br/>
                  <el-form-item label="房态图刷新间隔：">
                    <el-input disabled size="mini"></el-input>秒(0表示不自动刷新) 
                  </el-form-item><br/>
                  <el-form-item label="是否按房间实际位置显示：">
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否 </el-radio>
                  </el-form-item><br/>
                  <el-form-item label="是否显示客人姓名：">
                    <el-radio v-model="radio" label="1">显示</el-radio>
                    <el-radio v-model="radio" label="2">隐藏</el-radio>
                  </el-form-item><br/>
                  <el-form-item label="提前：">
                    <el-input disabled size="mini"></el-input>分钟叫醒
                  </el-form-item><br/>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">商品部是否关联库存模块</h5>
                  <el-form-item label="是否关联：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不关联" value="close"></el-option>
                      <el-option label="关联" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">
                <div class="bg-reserve">
                  <h5 class="info-title">协议单位相关设置</h5>
                  <el-form-item label="是否共享协议单位：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不共享" value="close"></el-option>
                      <el-option label="共享" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="会员入住是否积分：">
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="不积分" value="close"></el-option>
                      <el-option label="积分" value="open"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">夜审时间设置</h5>
                  <el-form-item>
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="01:00" value="1"></el-option>
                      <el-option label="02:00" value="2"></el-option>
                      <el-option label="03:00" value="3"></el-option>
                      <el-option label="04:00" value="4"></el-option>
                      <el-option label="05:00" value="5"></el-option>
                      <el-option label="06:00" value="6"></el-option>
                    </el-select>
                  </el-form-item><br/>
                  <span class="red">注：0 ~ 7点之间此设置不允许修改。</span>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">发送短信设置</h5>
                  <el-form-item>
                    <el-select v-model="qudao" placeholder="请选择">
                      <el-option label="有微信的发微信，没有的发短信" value="1"></el-option>
                      <el-option label="微信短信都发" value="2"></el-option>
                      <el-option label="只发微信" value="3"></el-option>
                      <el-option label="只发短信" value="4"></el-option>
                      <el-option label="微信短信都不发" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="bg-reserve">
                  <h5 class="info-title">商品部现金消费、银行卡消费默认哑房</h5>
                  <el-form-item label="组单号：">
                    <el-input size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="默认账户：">
                    <el-input size="mini"></el-input>
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
        num7:1,
        radio:'',
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