// 特殊房设置
<template>
  <div class="special-room-setting-class">
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
        <el-table-column prop="beginTime" label="允许入住时间开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="允许入住时间结束时间" align="center">
        </el-table-column>
        <el-table-column prop="bufferTime" label="缓冲时间（分钟）" align="center">
        </el-table-column>
        <el-table-column prop="remindTimeNum" label="特殊房提前提醒分钟数" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
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
import { specialRoomRuleList,specialRoomRuleDel,specialRoomRuleEnable } from "@/api/systemSet/pmsSpecialRoomController";
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
      specialRoomRuleList().then(res=>{
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
      this.$confirm('将删除该特殊房规则和价格方案，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        specialRoomRuleDel(row.rulePk).then(res=>{
          this.$message.success('删除成功')
          this.getRule()
        })
      })
    },
    enableOrDisable(row, flag) {
      specialRoomRuleEnable({rulePk:row.rulePk, enableFlag:flag}).then(res=>{
        this.$set(row, "enableFlag", flag)
      })
    }
  }
};
</script>

<style scoped>
.special-room-setting-class .opr {
  margin-bottom: 14px;
}
</style>
