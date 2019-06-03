<template>
    <el-container>
        <el-main>
            <div class="title"><span>订单信息</span></div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="0">
                    <information v-if="activeName == '0'"></information>
                </el-tab-pane>
                <el-tab-pane label="客人信息" name="1">
                    <guest v-if="activeName == '1'"></guest>
                </el-tab-pane>
                <el-tab-pane label="财务明细" name="2">
                    <financial v-if="activeName == '2'"></financial>
                </el-tab-pane>
                <el-tab-pane label="订单日志" name="3">
                    <journal v-if="activeName == '3'"></journal>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>
<script>
  import moment from 'moment'
  import information from './information'
  import guest from './guest'
  import financial from './financial'
  import journal from './journal'
  export default {
    components: {information,guest,financial,journal},
    data () {
      return {
          activeName:0
      }
    },
    created () {},
    watch: {
      filterText: function (value) {}
    },
    methods: {
        handleClick(){}
    },
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
    .el-tabs{
        padding: 0 10px;
        .el-tabs__header .el-tabs__item.is-active{
            
        }
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        color: #21324E;
    }
}
</style>
