<template>
    <el-container>
        <el-main>
            
        </el-main>
    </el-container>
</template>
<script>
  import moment from 'moment'
  export default {
    components: {},
    data () {
      return {
          activeName:0
      }
    },
    created () {
      console.log(this);
    },
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
    .el-tabs{
        padding: 0 10px;
        .el-tabs__header .el-tabs__item.is-active{
            color: #21324E;
        }
    }
}
</style>
