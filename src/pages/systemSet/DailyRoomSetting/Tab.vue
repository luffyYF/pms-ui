// 全天房规则设置
<template>
  <div class="hour-room-setting-class">
      <div class="opr">
        <el-button type="primary" size="mini" @click="add">添加</el-button>
      </div>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" >
        <el-table-column prop="ruleName" label="规则名称" align="center" >
        </el-table-column>
        <el-table-column prop="beginNum" label="首日计半价时长" align="center">
        </el-table-column>
        <el-table-column prop="fullNum" label="首日计全价时长" align="center">
        </el-table-column>
        <el-table-column prop="nextDayCheckoutTime" label="退房时间" align="center">
        </el-table-column>
        <el-table-column prop="addedBufferNum" label="加收缓冲时间" align="center">
        </el-table-column>
        <el-table-column prop="addedType" label="加收方式" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.addedType=='HOUR'">每小时</span>
            <span v-if="scope.row.addedType=='HALF'">半日租</span>
          </template>
        </el-table-column>
        <el-table-column prop="addedDailyFixedTime" label="固定加收全日租" align="center">
        </el-table-column>
        <el-table-column prop="addedDailyOvertimeNum" label="加收全日租时长" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="300px">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">查看</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
            <el-button type="success" size="mini" v-if="scope.row.enableFlag==1" @click="enableOrDisable(scope.row, 0)">已启用</el-button>
            <el-button type="info" size="mini" v-if="scope.row.enableFlag==0" @click="enableOrDisable(scope.row, 1)">已禁用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <add-dialog ref="addDialogRef" @callback="getRule"></add-dialog>
    </div>
</template>

<script>
import { dailyRoomRuleList,dailyRoomRuleDel,dailyRoomRuleEnable } from "@/api/systemSet/pmsDailyRoomController";
import AddDialog from './AddDialog'
export default {
  components:{AddDialog},
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    this.getRule()
  },
  methods: {
    getRule() {
      dailyRoomRuleList().then(res=>{
        this.tableData = res.data
      })
    },
    add() {
      this.$refs.addDialogRef.showDialog()
    },
    edit(row){
      this.$refs.addDialogRef.showDialog(row.rulePk)
    },
    del(row){
      this.$confirm('将删除该规则，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dailyRoomRuleDel(row.rulePk).then(res=>{
          this.$message.success('删除成功')
          this.getRule()
        })
      })
    },
    enableOrDisable(row, flag) {
      dailyRoomRuleEnable({rulePk:row.rulePk, enableFlag:flag}).then(res=>{
        this.$set(row, "enableFlag", flag)
      })
    }
  }
};
</script>

<style scoped>
.hour-room-setting-class .opr {
  margin-bottom: 14px;
}
</style>
