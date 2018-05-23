<template>
  <div>
    <el-form :inline="true"  :model="formInline" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="5">
            <div class="bg-reserve">
              <h5 class="info-title">查房设置</h5>
              <el-form-item label="是否查房">
                <el-radio v-model="radio1" label="1">是</el-radio><el-radio v-model="radio1" label="2">否</el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">公寓房设置</h5>
              <el-form-item label="房费收取：">
                押&nbsp;&nbsp;<el-input></el-input>&nbsp;&nbsp;&nbsp;&nbsp;付&nbsp;&nbsp;<el-input></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">打扫房间设置</h5>
              <el-form-item label="是否开启客房打扫统计功能：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="关闭" value="close"></el-option>
                  <el-option label="开启" value="open"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="bg-reserve">
              <h5 class="info-title">房租合约设置</h5>
              <el-form-item label="延期(预订、在住)房租合约按：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="系统房价" value="close"></el-option>
                  <el-option label="当前房租合约" value="open"></el-option>
                </el-select>
                设置
              </el-form-item>
              <el-form-item label="预订转入住（提前到店）房租合约按：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="系统房价" value="close"></el-option>
                  <el-option label="当前房租合约" value="open"></el-option>
                </el-select>
                设置
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">退房恢复设置</h5>
              <el-input size="mini"></el-input>分钟内可以恢复<span class="red">（注：夜审后不允许恢复）</span><br/>
              离店日期自动推后1天
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="bg-reserve">
              <h5 class="info-title">房赔偿设置</h5>
              <el-form-item label="是否启用客房赔偿（每种房型都有自己的赔偿标配）：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="不启用" value="close"></el-option>
                  <el-option label="启用" value="open"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">房租小数处理设置</h5>
              <el-form-item label="处理方法：">
                <el-select v-model="qudao" placeholder="请选择">
                  <el-option label="保留小数位（到分）" value="close"></el-option>
                  <el-option label="舍去整数" value="open"></el-option>
                  <el-option label="四舍五入取整" value="open1"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="bg-reserve">
              <h5 class="info-title">钟点房/特殊房/半日房房晚设置</h5>
              <el-form-item label="处理方法：">
                <el-select v-model="qudao" placeholder="类别">
                  <el-option label="0.5个房晚" value="close"></el-option>
                  <el-option label="1.0个房晚" value="open"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="bg-reserve">
              <h5 class="info-title">房租小数处理设置</h5>
              <el-form-item label="早餐￥">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="中餐￥">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="晚餐￥">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="餐费是否独立核算：">
                 <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
              <br/>
              <span class="red">注：如果独立核算，过夜审的时候会从房费里分出一笔或多笔相应的费用。</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="bg-reserve">
              <h5 class="info-title">房租小数处理设置</h5>
              <el-form-item label="维修房的最高级别：">
                <el-select v-model="qudao" placeholder="类别">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="维修房最高可入住级别：">
                <el-select v-model="qudao" placeholder="类别">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否通知全部维修员：">
                <el-radio v-model="radio" label="1">是</el-radio><el-radio v-model="radio" label="2">否</el-radio>
              </el-form-item>
              <el-form-item label="设置清洁未检查房态：">
                <el-select v-model="qudao" placeholder="类别">
                  <el-option label="有清洁未检查" value="close"></el-option>
                  <el-option label="无清洁未检查" value="open"></el-option>
                </el-select>
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
        radio1: '',
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