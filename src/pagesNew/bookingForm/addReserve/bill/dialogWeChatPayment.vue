<template>
    <div>
      <el-dialog class="pattern-dialog" title="微信支付" :visible.sync="dialogWeChatPayment" width="45%" :before-close="handleClose" :append-to-body=true>
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
        </el-form> 
        <div class="WeChat-content">
          <span class="WeChat-img">二维码</span><br/>
          <el-button type="text">打印二维码</el-button>
        </div>
        <p class="billPric-txt">注：您正在使用的是微信扫码支付试用模块，固定支付金额为1元，支付成功后住哲不负责退款结算，如需退款请使用冲减功能来实现。如需正式使用微信扫码支付功能请联系QQ客服申请 成功后，我们的销售代表在2个工作日内会联系您。</p>
        <span slot="footer" class="dialog-footer"> 
          <el-button size="mini" type="primary">确认</el-button>
          <el-button size="mini" type="primary">关闭</el-button>
        </span>
      </el-dialog>
    </div>
</template>