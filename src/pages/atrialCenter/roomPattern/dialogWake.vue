<template>
  <div>
<el-dialog class="pattern-dialog" title="叫醒" :visible.sync="dialogWake" width="50%" :append-to-body="true" :before-close="handleClose">
      <div class="pattern-dialog-container">   
        <el-col :span="24" style="margin-bottom:10px;">
          房间号：<el-select placeholder="301" size="mini">
            <el-option label="301" value="shanghai"></el-option>
            <el-option label="302" value="shanghai"></el-option>
          </el-select>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="Wakenumber" label="房间号" width="120">
              <template slot-scope="scope">
                <el-input></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="Wakedate" label="叫醒时间">
              <template slot-scope="scope">
                <el-date-picker type="datetime" placeholder="选择日期时间"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="Wakecaozuo" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="primary" @click="onSubmit"  size="mini">叫醒</el-button>
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
export default {

}
</script>

<style scoped>

</style>
