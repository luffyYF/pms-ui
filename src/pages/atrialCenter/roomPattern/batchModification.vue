<template>
  <div>
      <el-dialog class="pattern-dialog" title="批量修改" :visible.sync="batchModification" width="45%" :append-to-body="true" :before-close="handleClose">
      <div class="commodity-dialog-container">
        <div class="batchModification-title">
          <el-col :span="24">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city" style="padding-right: 5px;">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="24">
            <el-select placeholder="系统默认模板" size="mini">
              <el-option label="选择团付模板" value="shanghai"></el-option>
              <el-option label="系统默认模板" value="shanghai"></el-option>
            </el-select>
          </el-col>
          <el-col :span="24">
            <el-tree :data="dataTree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></el-tree>
          </el-col>
          <el-col :span="24" style="text-align: right;margin-top: 10px;">
            <el-button type="primary" @click="onSubmit"  size="mini">保存</el-button>
            <el-button type="primary" @click="onSubmit"  size="mini">取消</el-button>
          </el-col>
        </div>
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

<style lang="less" scoped>

</style>

