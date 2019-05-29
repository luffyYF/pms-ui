<template>
  <div>
      <el-dialog class="pattern-dialog" title="组单选择器" :visible.sync="dialogTransferAccounts" width="60%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 10px;">
        <div class="groupSelections-title">
            <h4 class="groupSelections-title-txt">查询</h4>
            <el-form :inline="true" :model="form" size="mini" class="demo-form-inline">
              <el-col :span="24">
                <el-form-item label="房号">
                  <el-input v-model="form.region" placeholder="房号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="form.region" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-model="form.region" placeholder="手机"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="组单号">
                  <el-input v-model="form.region" placeholder="组单号"></el-input>
                </el-form-item>
                <el-form-item label="单据类别">
                  <el-select v-model="form.region" placeholder="单据类别">
                    <el-option label="客单" value="shanghai"></el-option>
                    <el-option label="哑房单" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div>
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" height="300" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="组单号2"></el-table-column>
              <el-table-column prop="name" label="客单号"></el-table-column>
              <el-table-column prop="name" label="房间号码"></el-table-column>
              <el-table-column prop="name" label="客户姓名"></el-table-column>
              <el-table-column prop="name" label="电话号码"></el-table-column>
              <el-table-column prop="name" label="消费总额"></el-table-column>
              <el-table-column prop="name" label="结算总额"></el-table-column>
              <el-table-column prop="name" label="余额"></el-table-column>
              <el-table-column prop="name" label="客人会员卡号" width="120"></el-table-column>
              <el-table-column prop="name" label="性别"></el-table-column>
              <el-table-column prop="name" label="证件类型"></el-table-column>
            </el-table>
          </div>
      </div>
      <span slot="footer" class="dialog-footer"> 
      </span>
    </el-dialog>
  </div>
</template>
