<template>
  <div>
    <el-dialog class="pattern-dialog" title="储值卡" :visible.sync="dialogStoredCard" width="50%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-form ref="form" :model="form" size="mini" label-width="100px">
          <el-form-item label="项目：">
            <el-col :span="10">
              <el-input v-model="form.name"></el-input>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-input v-model="form.name"></el-input>
            </el-col>
            <el-col :span="3">
              <el-button type="text" @click="projectSelectionAssistant = true">选择</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="客单：">
            <el-select v-model="form.region" placeholder="请选择客单">
              <el-option label="房间号：201 客人姓名：陆少游" value="shanghai"></el-option>
              <el-option label="房间号：201 客人姓名：陆少游" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号码：">
            <el-col :span="12">
              <el-input v-model="form.name"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="可用余额：">
            <span class="billPric-txt">￥111</span>
          </el-form-item>
          <el-form-item label="原始凭证号：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form> 
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">关闭</el-button>
      </span>
    </el-dialog> 
  </div>
</template>