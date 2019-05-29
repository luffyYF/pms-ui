<template>
  <div>
    <el-dialog class="pattern-dialog" title="单房结账" :visible.sync="dialogSingleRoom" width="50%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-col :span="24">
          <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="房间号"></el-table-column>
            <el-table-column prop="date" label="消费金额"></el-table-column>
            <el-table-column prop="date" label="结算金额"></el-table-column>
            <el-table-column prop="date" label="加收日租"></el-table-column>
            <el-table-column prop="date" label="转账日租"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" style="margin-top:10px;">
          <div class="demo-input-suffix">
            消费金额：<el-input v-model="form.name" size="mini" class="checkout-inpt checkout-color"></el-input>
            实收：<el-input v-model="form.name" size="mini" class="checkout-inpt checkout-color"></el-input>
            应收：<el-input v-model="form.name" size="mini" class="checkout-inpt checkout-color"></el-input>
          </div>
          <div class="demo-input-suffix">
            结算项目：<el-input v-model="form.name" size="mini" class="checkout-inpt"></el-input>
                     <el-input v-model="form.name" size="mini" class="checkout-inpt" placeholder="现金支出"></el-input>
          </div>
          <div class="demo-input-suffix">
            客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单：
                      <el-select v-model="form.region" size="mini" style="width:80%">
                        <el-option label="房间号：302 客人姓名：陆少游" value="shanghai"></el-option>
                        <el-option label="房间号：303 客人姓名：陆少游" value="beijing"></el-option>
                      </el-select>
          </div>
          <div class="demo-input-suffix">
            是否开发票：<el-radio-group v-model="form.region">
                      <el-radio label=" 开发票"></el-radio>
                      <el-radio label="不开发票"></el-radio>
                     </el-radio-group>  
          </div>
          <div class="demo-input-suffix">
            发票抬头：<el-input v-model="form.name" size="mini" style="width:80%"></el-input>
          </div>
          <div class="demo-input-suffix">
            开票金额：<el-input v-model="form.name" size="mini" style="width:80%"></el-input>
          </div>
          <div class="demo-input-suffix">
              备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：
              <el-input v-model="form.name" size="mini" style="width:80%"></el-input>
          </div>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">取消</el-button>
      </span>
    </el-dialog> 
  </div>
</template>
