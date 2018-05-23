<template>
  <div class="short-message-body">
    <div class="titlp">管理员短信详细列表</div>
    <div class="short-message-content">
        <p style="color:red">注：开启生日短信后短信将会在每天早上8点自动发出.</p>
        <el-col :span="24">
            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="date" label="短信类型"></el-table-column>
                <el-table-column prop="date" label="短信内容"></el-table-column>
                <el-table-column prop="date" label="是否启用"></el-table-column>
                <el-table-column prop="date" label="入住次数"></el-table-column>
                <el-table-column prop="date" label="操作"></el-table-column>
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
