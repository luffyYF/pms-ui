<template>
  <div>
<el-dialog class="pattern-dialog" title="商品部" :visible.sync="dialogCommodity" width="60%" :append-to-body="true" :before-close="handleClose">
      <div class="commodity-dialog-container">
        <el-tabs v-model="activeCommodity" type="card" @tab-click="handleClick">
          <el-tab-pane label="华发前台商品" name="frontGoods">
            <el-col :span="13">
              <div class="commodity-dialog-title">
                <el-col :span="24">
                  <el-col :span="10">
                    <el-input v-model="form.region" size="mini"></el-input>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-button type="primary" @click="onSubmit"  size="mini">立即创建</el-button>
                  </el-col>  
                </el-col>
                <el-col :span="24">
                  <span>商品</span>
                  <el-button type="text">全部</el-button>
                  <el-button type="text">饮料</el-button>  
                </el-col>  
              </div>
              <el-col :span="24">
                <el-table :data="tableData" style="width: 100%" @cell-mouse-enter="commodityTabsEnter" @cell-mouse-leave="commodityTabsLeave">
                  <el-table-column prop="name" label="商品编号"></el-table-column>
                  <el-table-column prop="name" label="数量"></el-table-column>
                  <el-table-column prop="name" label="商品名称" width="150"></el-table-column>
                  <el-table-column>   
                    <template slot-scope="scope" v-if="commodityAddTo">
                      <i class="el-icon-circle-plus font-size18"></i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="单价"></el-table-column>
                </el-table>
              </el-col>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-col :span="24">
                <span class="left">消费明细</span>
                <span class="right delClose"><i class="el-icon-delete"></i>清空</span>
              </el-col>
              <el-col :span="24">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="name" label="商品编号"></el-table-column>
                  <el-table-column prop="name" label="单价"></el-table-column>
                  <el-table-column label="数量" width="140">   
                    <template slot-scope="scope">
                      <el-input-number size="mini" :min="1"></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="金额"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24"><span class="right">总计：<em class="price">￥321354</em></span></el-col>
              <el-col :span="24">
                <el-form size="mini">
                  <el-form-item label="付款方式">
                    <el-radio-group v-model="form.region">
                      <el-radio label="客房消费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="房号">
                    <el-select v-model="form.region" placeholder="请选择房号">
                      <el-option label="302" value="shanghai"></el-option>
                      <el-option label="303" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客单">
                    <el-select v-model="form.region" placeholder="请选择客单">
                      <el-option label="道友(在住)可单号：4434" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="24" style="text-align: center;">
                <el-button type="primary" @click="onSubmit"  size="mini">保存</el-button>
              </el-col>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="退单管理" name="second">
            <div class="commodity-dialog-title">
              <el-col :span="24">
                <el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
                  <el-form-item label="房号">
                    <el-select v-model="form.region" placeholder="房号">
                      <el-option label="301" value="shanghai"></el-option>
                      <el-option label="302" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客单">
                    <el-select v-model="form.region" placeholder="客单">
                      <el-option label="客单号：4434(道友)" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="营业日期">
                    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="	状态">
                    <el-select v-model="form.region" placeholder="状态">
                      <el-option label="全部" value="shanghai"></el-option>
                      <el-option label="已结账" value="shanghai"></el-option>
                      <el-option label="未结账" value="shanghai"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="24">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="name" label="消费单号"></el-table-column>
                  <el-table-column prop="name" label="消费类别"></el-table-column>
                  <el-table-column prop="name" label="营业时间"></el-table-column>
                  <el-table-column prop="name" label="金额"></el-table-column>
                  <el-table-column prop="name" label="记账人"></el-table-column>
                  <el-table-column prop="name" label="记录数"></el-table-column>
                  <el-table-column prop="name" label="详细"></el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-tab-pane>
        </el-tabs>
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

