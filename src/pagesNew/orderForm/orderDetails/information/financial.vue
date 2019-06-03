<template>
  <el-container>
    <el-main>
      <el-table :data="tableData" border size='mini' style="width: 100%">
        <el-table-column prop="date" label="消费时间"></el-table-column>
        <el-table-column prop="name" label="财务-项目"></el-table-column>
        <el-table-column prop="name" label="付款"></el-table-column>
        <el-table-column prop="name" label="消费"></el-table-column>
        <el-table-column prop="name" label="营业日期"></el-table-column>
        <el-table-column prop="name" label="业务说明"></el-table-column>
        <el-table-column prop="name" label="操作人"></el-table-column>
        <el-table-column prop="name" label="班次"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
  import moment from 'moment'
  export default {
    components: {},
    data () {
      return {
        tableData:[],
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
  .el-tabs{
    padding: 0 10px;
    .el-tabs__header .el-tabs__item.is-active{
      color: #21324E;
    }
  }
}
</style>
