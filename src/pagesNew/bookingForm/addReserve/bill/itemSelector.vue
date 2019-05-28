<template>
  <div>
      <el-dialog class="pattern-dialog" title="项目选择器" :visible.sync="itemSelector" width="30%" :before-close="handleClose" :append-to-body=true>
        <div class="pattern-dialog-container" style="padding: 25px 4px;">
            <el-col :span="24" style="margin-bottom:10px">
            <div class="demo-input-suffix">项目类别：
                <el-select v-model="form.region" size="mini" placeholder="所有消费类别">
                <el-option label="餐券" value="shanghai"></el-option>
                <el-option label="房费" value="beijing"></el-option>
                </el-select>
            </div>
            </el-col>
            <el-col :span="24">
            <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" height="400" style="width: 100%">
                <el-table-column prop="name" label="编码"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="name" label="单价"></el-table-column>
                <el-table-column prop="name" label="类别"></el-table-column>
            </el-table>
            </el-col>
        </div>
        <span slot="footer" class="dialog-footer"> 
        </span>
        </el-dialog> 
  </div>
</template>
