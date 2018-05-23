<template>
  <div class="short-message-body">
    <div class="titlp">管理员短信详细列表</div>
    <div class="short-message-content">
        <el-col :span="24">
            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="date" label="剩余总条数"></el-table-column>
                <el-table-column prop="date" label="剩余赠送条数"></el-table-column>
                <el-table-column prop="date" label="剩余充值条数"></el-table-column>
                <el-table-column prop="date" label="是否启用"></el-table-column>
            </el-table>
        </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          form: {
            name: '', 
            date1: '',
            region: ''
          },
          tableData: []
      }
  },
  methods: {

  }
}
</script>

<style scoped>
.short-message-body{
    width: 950px;
    border: 1px solid #ccc;
    background: #f7f7f7;
    padding: 15px;
    display: table;
}
.titlp{
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
    border-bottom: 1px solid #aaa;
    margin-bottom: 8px;
    color: #333;
}
</style>
