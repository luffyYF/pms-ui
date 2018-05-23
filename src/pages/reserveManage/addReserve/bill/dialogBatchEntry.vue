<template>
  <div>
      <el-dialog class="pattern-dialog height240" title="批量入账" :visible.sync="dialogBatchEntry" width="80%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-col :span="24" style="margin-bottom: 10px;">
          <el-button size="mini" type="success">添加</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </el-col>
        <el-col :span="24">
          <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="项目" width="280">
              <template slot-scope="scope">
                <el-input placeholder="编码" size="mini" style="width:70px"></el-input>
                <el-input placeholder="名称" size="mini" style="width:120px"></el-input>
                <el-button type="primary" size="mini" class="el-icon-more" style="width:50px" @click="projectSelectionAssistant = true"></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="客单">
              <template slot-scope="scope">
                <el-select v-model="form.region" size="mini" placeholder="房间号：201 客人姓名：陆少游">
                    <el-option label="房间号：201 客人姓名：陆少游" value="shanghai"></el-option>
                    <el-option label="房间号：201 客人姓名：陆少游" value="beijing"></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="金额相关">
              <template slot-scope="scope">
                金额:<el-input placeholder="金额" size="mini" style="width:70px"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="原始凭证号">
              <template slot-scope="scope">
                <el-input placeholder="原始凭证号" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="备注">
              <template slot-scope="scope">
                <el-input placeholder="备注" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <div class="left">
          <span class="consumptions">消费总计:￥<em class="price">0.00</em></span> 
          <span class="settlements">结算总计:￥<em class="price">0.00 </em></span>
        </div>
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">关闭</el-button>
      </span>
    </el-dialog> 
    <el-dialog class="pattern-dialog" title="项目选择助手" :visible.sync="projectSelectionAssistant" width="30%" :before-close="handleClose" :append-to-body=true>
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
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button type="text">选中</el-button>
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
