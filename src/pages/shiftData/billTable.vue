<template>
    <el-table v-loading="loading" 
        size="mini" 
        border 
        :data="tableData" 
        max-height="500"
        style="width: 98.5%; margin:10px;">
            <el-table-column prop="createTime" label="消费时间" align="center" width="190">
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" align="center" width="150">
            </el-table-column>
            <el-table-column prop="projectName" label="营业项目" align="center" width="150">
            </el-table-column>
            <el-table-column prop="remark" label="业务详情" align="center" min-width="200" >
            </el-table-column>
            <el-table-column prop="number" label="数量" align="center" width="60">
            </el-table-column>
            <el-table-column  label="金额" align="center" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.settlementAmount == 0">{{scope.row.consumptionAmount}}</span>
                    <span v-else>{{scope.row.settlementAmount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="shiftNo" label="班次" align="center" width="150">
            </el-table-column>
            <el-table-column prop="memName" label="姓名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="roomNumber" label="房号" align="center" width="80">
            </el-table-column>
            <el-table-column prop="userName" label="操作员" align="center" width="120">
            </el-table-column>   
    </el-table>
</template>

<script>
  import Moment from 'moment'
  export default {
    data () {
      return {
        tableData: [],
        loading:false,
      }
    },
    methods: {
      init(data) {
          this.tableData = data
      }
    }
  }
</script>

<style scoped>

</style>

