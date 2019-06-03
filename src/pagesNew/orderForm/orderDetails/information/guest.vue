<template>
  <el-container>
    <el-main>
      <el-table :data="tableData" border size='mini' style="width: 100%">
        <el-table-column prop="date" label="房号"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="name" label="房型"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="name" label="性别"></el-table-column>
        <el-table-column prop="name" label="证件类型"></el-table-column>
        <el-table-column prop="name" label="证件号码"></el-table-column>
        <el-table-column prop="name" label="地址"></el-table-column>
        <el-table-column prop="name" label="同来宾客"></el-table-column>
        <el-table-column prop="name" label="手机号"></el-table-column>
        <el-table-column prop="name" label="备注"></el-table-column>
        <el-table-column prop="name" label="操作"></el-table-column>
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
