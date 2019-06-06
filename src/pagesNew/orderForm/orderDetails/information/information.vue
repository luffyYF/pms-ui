<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-form :inline="true" size="mini"  class="demo-form-inline">
                        <el-form-item style="float:right;">
                            <el-button>修改订单</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-form :inline="true" size="mini" class="demo-form-inline">
                <el-col :span="24">
                    <el-form-item label="基本信息"></el-form-item>
                </el-col>
                <el-col :span="23" :offset='1'>
                    <el-form-item label="订单号：">465464687463</el-form-item>
                    <el-form-item label="订单来源：">步入</el-form-item>
                    <el-form-item label="入住类型：">正常</el-form-item>
                    <el-form-item label="入住时间：">2019-05-02 08:32:09</el-form-item>
                    <el-form-item label="预离时间：">2019-05-12 14:00:00</el-form-item>
                </el-col>
            </el-form>
            <el-form :inline="true" size="mini" class="demo-form-inline">
                <el-col :span="24">
                    <el-form-item label="入住信息"></el-form-item>
                </el-col>
                <el-col :span="23" :offset='1'>
                    <el-form-item label="入住中：">
                        1间
                    </el-form-item>
                    <el-form-item label="房型：">高级大床房(1间)（ 386  ）</el-form-item>
                </el-col>
            </el-form>
            <el-form :inline="true" size="mini" class="demo-form-inline">
                <el-col :span="24">
                    <el-form-item label="销售信息"></el-form-item>
                </el-col>
                <el-col :span="23" :offset='1'>
                    <el-form-item label="销售员：">无</el-form-item>
                </el-col>
            </el-form>
            <el-form :inline="true" size="mini" class="demo-form-inline">
                <el-col :span="24">
                    <el-form-item label="订单备注"></el-form-item>
                </el-col>
                <el-col :span="23" :offset='1'>
                    <el-form-item label="">安静</el-form-item>
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
          formInline:{

          },
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
    padding: 0px;
    .demo-form-inline{
        margin-bottom: 20px;
        .el-form-item--mini{
            .el-form-item__label{
                padding:0;
            }
        }
    }
    
}
</style>
