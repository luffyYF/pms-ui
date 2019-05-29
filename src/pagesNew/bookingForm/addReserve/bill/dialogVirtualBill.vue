<template>
  <div>
      <el-dialog class="pattern-dialog height240" title="虚拟账单" :visible.sync="dialogVirtualBill" width="80%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-col :span="24">
          <div class="demo-input-suffix">
            请选择结账客单：<el-select v-model="form.region" placeholder="请选择活动区域" size="mini" style="width: 180px;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
            属性方式：<el-date-picker type="date" placeholder="选择日期" v-model="form.region" size="mini" style="width: 180px;"></el-date-picker>
            属性方式：<el-date-picker type="date" placeholder="选择日期" v-model="form.region" size="mini" style="width: 180px;"></el-date-picker>
                     <el-button type="primary" size="mini">添加</el-button>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 10px;">										
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="项目" width="180">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:100px"></el-input>
                <el-button class="el-icon-more" size="mini"  @click="itemSelector = true"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="消费金额" width="120">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:80px"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="结算金额" width="120">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:80px" disabled="true"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="数量" width="120">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:80px" disabled="true"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="房号" width="150">
              <template slot-scope="scope">
                <el-select v-model="form.region" size="mini" style="width:120px">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="客单号" width="150">
              <template slot-scope="scope">
                <el-select v-model="form.region" size="mini" style="width:120px">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="发生日期" width="180">
              <template slot-scope="scope">
                <el-date-picker v-model="datepicker" type="datetime" size="mini" placeholder="选择日期时间" style="width:150px"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作员" width="150">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:100px"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="备注" width="150">
              <template slot-scope="scope">
                <el-input v-model="channel" size="mini" style="width:100px"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="营业日期" width="180">
              <template slot-scope="scope">
                <el-date-picker v-model="datepicker" type="date" size="mini" placeholder="选择日期" style="width:150px"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作" width="150">
              <template slot-scope="scope">  
                <el-button type="text" size="mini">添加</el-button>
                <el-button type="text" size="mini">删除</el-button>
              </template>  
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">关闭</el-button>
      </span>
    </el-dialog> 
  </div>
</template>
