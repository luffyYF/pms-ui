<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">销售员管理</h5>
      <h4>调控范围</h4>
      <el-form
        :inline="true" 
        :model="form" 
        :label-position="'left'"
        size="mini"
        label-width="100px">
        <el-form-item label="按协议类别">
          <el-select v-model="form.protocolType" placeholder="请选择协议类别">
            <el-option label="所有协议类别" value="v11"></el-option>
            <el-option label="公司协议" value="v22"></el-option>
            <el-option label="旅行团" value="v33"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text">1.如何设置协议类价格方案？</el-button>
        </el-form-item>
        <br>
        <el-form-item label="按价格方案">
          <el-select v-model="form.toPriceScheme" placeholder="请选择价格方案">
            <el-option label="所有使用了价格方案的" value="v44"></el-option>
            <el-option label="没有使用价格方案的" value="v66"></el-option>
            <el-option label="价格方案" value="v55"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text">2.协议单位如何引用价格方案？</el-button>
        </el-form-item>
        <br>
        <h4>应用规则</h4>
        <el-form-item label="价格方案">
          <el-select v-model="form.priceScheme" placeholder="请选择价格方案">
             <el-option label="xxx" value="xxx"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text">3.如何协议单位如何批量修改价格方案?</el-button>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" size="mini">全局更新</el-button>
          <el-button type="primary" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {} from '@/api/'
export default {
  data() {
    return {
    };
  },
  created () {
  },
  methods: {
    init(){
      
    }
  }
};
</script>

<style scoped>
.bg-reserve {
  width: 865px;
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
  padding-left: 5px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
</style>

<script>
  export default {
    data() {
      return {
        form: {}
      }
    }
  }
</script>