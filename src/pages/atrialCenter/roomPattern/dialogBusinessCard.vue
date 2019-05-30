<template>
  <div>
      <el-dialog class="pattern-dialog" title="制门卡" :visible.sync="dialogBusinessCard" width="50%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">
        <el-table :data="tableData" height="450" border style="width: 100%">	
          <el-table-column type="selection" width="55"></el-table-column>	
          <el-table-column prop="date" label="房号"></el-table-column>
          <el-table-column prop="date" label="抵店日期"></el-table-column>
          <el-table-column prop="date" label="离店日期"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmit">制卡</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">批量制卡</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">读卡</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">销卡</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
