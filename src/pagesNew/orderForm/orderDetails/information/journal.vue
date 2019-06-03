<template>
  <el-container>
    <el-main>
      <el-form :inline="true" size="mini" label-width="80px"  class="demo-form-inline">
        <el-col :span="24">
          <el-form-item label="日志类型:">
            <el-radio-group v-model="formInline.checkInType">
              <el-radio :label="0">预订日志</el-radio>
              <el-radio :label="1">财务日志</el-radio>
              <el-radio :label="2">退房日志</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="height: 300px;">
          <el-steps direction="vertical" :space='78' :active="3">
            <el-step>
              <span slot="icon"></span>
              <span slot="description">这是一段很长很长很长的描述性文字</span>
            </el-step>
            <el-step>
              <span slot="icon"></span>
              <span slot="description">这是一段很长很长很长的描述性文字</span>
            </el-step>
            <el-step>
              <span slot="icon"></span>
              <span slot="description">这是一段很长很长很长的描述性文字</span>
            </el-step>
          </el-steps>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import moment from 'moment'
  export default {
    components: {},
    data () {
      return {
        formInline:{checkInType:0},
          activeName:0
      }
    },
    created () {},
    watch: {
      filterText: function (value) {}
    },
    methods: {},
    mounted () {}
  }
</script>
<style scoped lang='scss'>
.el-main{
  padding: 0px 10px;
  .title{
    padding: 10px;
    background-color: #f0f0f0;
    margin-bottom: 20px;
    span{
      padding-left: 10px;
      border-left: 5px solid #21324E;
      margin-left: 10px;
    }
  }
  
}
</style>
