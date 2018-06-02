// 操作日志
<template>
  <div>
    <el-dialog class="pattern-dialog" title="操作日志" :visible.sync="dialogOperationLog" width="80%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column prop="createUserName" label="操作员"></el-table-column>
            <el-table-column prop="behavior" label="行为"></el-table-column>
            <el-table-column prop="details" label="详细" min-width="200">
              <template slot-scope="scope">
                <div v-for="y in toArr(scope.row.details)">{{y}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="runResult" label="结果">
              <template slot-scope="scope">
                <span>{{resultMap[scope.row.runResult]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {resultMap} from '@/utils/orm'
import {listLog }from '@/api/operators/pmsLogController'
export default {
  data() {
    return {
      resultMap:resultMap,
      dialogOperationLog: false,
      tableData: [],
    };
  },
  methods: {
    /**
     * 初始化
     * @augments orderPk 主订单主键 */
    init(orderPk) {
      this.dialogOperationLog = true;
      listLog({pk: orderPk}).then(res=>{
        this.tableData = res.data
      })
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
          
      //   })
      //   .catch(_ => {});
      this.dialogOperationLog = false
    },
    toArr(jsonStr) {
      if(jsonStr){
        return JSON.parse(jsonStr)
      }else{
        return []
      }
    }
  }
};
</script>
<style scoped>
.pattern-dialog-container{
  height: 600px;
  overflow: auto;
}

</style>

