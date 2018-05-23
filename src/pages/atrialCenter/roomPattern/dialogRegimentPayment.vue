<template>
  <div>
      <el-dialog class="pattern-dialog" title="团付账" :visible.sync="dialogRegimentPayment" width="700px" :append-to-body="true" :before-close="handleClose">
        <div class="commodity-dialog-container">
            <div class="regimentPayment-dialog-title">
            <span>团付账设置</span>
            <el-button type="primary" @click="batchModification = true"  size="mini">批量修改</el-button>
            </div>
            <div class="regimentPayment-dialog-content">
            <div class="regimentPayment-li">
                <span>房间号：302</span>
                <span>
                <el-select placeholder="系统默认模板" size="mini">
                    <el-option label="系统默认模板" value="shanghai"></el-option>
                </el-select>
                </span>
                <el-button type="primary" @click="onSubmit"  size="mini">保存</el-button>
                <el-button type="primary" @click="regimenttTree" size="mini">{{openCloseTree}}</el-button>
                <div class="regimentPayment-Tree" v-if="regimentPaymentTree">
                <el-tree :data="dataTree" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></el-tree>
                </div>
            </div>
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

