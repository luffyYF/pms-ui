<template>
  <div>
    <el-form  :model="form" size="mini" class="demo-form-inline">
      <div class="book-info">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="10">
                <div class="bg-reserve">
                  <h5 class="info-title">房间设置</h5>
                  <el-form-item label="退房结束时间：">
                    <el-time-picker v-model="form.checkoutTime" value-format="HH:mm:ss" placeholder="请选择">
                    </el-time-picker>
                  </el-form-item>
                  <el-form-item label="退房结束时间前：">
                    <el-input type="text" v-model="form.checkoutReminderTime">
                    </el-input>
                    提醒有客人要退房
                  </el-form-item>
                  <el-form-item label="客单可恢复：">
                    <el-input type="text" v-model="form.checkoutRecoverMinute">
                    </el-input>
                    分钟内可恢复
                    <span style="color:red">（注：夜审过后不可恢复）</span>
                  </el-form-item>
                  <el-form-item label="开启NoShow：">
                    <el-switch
                      v-model="form.noShowFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启NoShow后对应的房间远期房态会被解除）</span>
                  </el-form-item>
                  <el-form-item label="自动续房:">
                    <el-switch
                      v-model="form.extendRoomFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启自动续房后夜审是会将预离订单自动续房）</span>
                  </el-form-item>
                  <el-form-item label="预离转脏房：">
                    <el-switch
                      v-model="form.dirtyRoomFlag"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                      active-value="Y"
                      inactive-value="N">
                    </el-switch>
                    <span style="color:red">（注：开启预离转脏房后夜审是会将预离房自动转脏房）</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="1">

              </el-col>
              <el-col :span="7" :offset="1">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center">
                <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {find, update} from '@/api/systemSet/pmsSysParamController'
  export default {
    data() {
      return {
        form: {}
      }
    },
    methods: {
      init() {
        find().then(res=>{
          this.form = res.data
        })
      },
      onSubmit() {
        update(this.form).then(res=>{
          this.$message.success('保存成功');
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
