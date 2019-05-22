// 预订单配置
<template>
    <div class="bg-reserve">
        <el-form ref="form" :model="sysForm" :label-position="'right'" size="mini" >
            <el-form-item label="是否自动接单">
                <el-checkbox size="mini" v-model="sysForm.ydd_auto_take_order_flag" true-label="Y" false-label="N"></el-checkbox>
            </el-form-item>
            <el-form-item label="支付缓冲时间（单位：分钟）">
                <el-input-number v-model="sysForm.ydd_payment_buffer_time" :min="1" :step="1" :precision="0"></el-input-number>
                <span data-v-9c878b78="" style="color: red;">（注：超过缓冲时间后将自动取消订单）</span>
            </el-form-item>
            <el-form-item label="手动接单缓冲时间（单位：分钟）">
                <el-input-number v-model="sysForm.ydd_take_order_buffer_time" :min="1" :step="1" :precision="0"></el-input-number>
                <span data-v-9c878b78="" style="color: red;">（注：超过缓冲时间后将自动取消订单）</span>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="save">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {find, update} from '@/api/systemSet/pmsParamConfigController'

export default {
  data() {
    return {
      sysForm: {}
    };
  },
//   mounted() {
//     this.init()
//   },

  methods: {
    init(){
        find({paramType:'YDD'}).then(res=>{
            this.sysForm = res.data
        })
    },
    
    save() {
      if (this.verification()) {
        update(this.sysForm).then(res=>{
            this.$message.success('已更新')
        })
      }
    },
    verification() {
      var content = "";
      if (!this.sysForm.ydd_payment_buffer_time) {
        content = "支付缓冲时间不能为空";
      }else if(!this.sysForm.ydd_take_order_buffer_time) {
        content = "手动接单缓冲时间不能为空";
      }

      if (content != "") {
        this.$message.warning(content);
        return false;
      }
      return true;
    },
    
  },
 
};
</script>
<style scoped>
.el-form-item{
    margin-bottom: 5px;
}
.bg-reserve {
  width: 800px;
  background-color: #f7f7f7;
  position: relative;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
  padding-left: 5px;
  padding-bottom: 10px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 9px;
  background: #f7f7f7;
}
.el-select,
.el-input {
  width: 204px;
}
.el-textarea {
  width: 521px;
}
.el-textarea_inner {
  padding: 5px;
}
.member-level {
  width: 95px;
}
.card-no {
  width: 104px;
}
.address {
  width: 501px;
}
</style>