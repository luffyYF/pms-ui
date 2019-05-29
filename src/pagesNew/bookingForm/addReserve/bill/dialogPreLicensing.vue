<template>
  <div>
      <el-dialog class="pattern-dialog" title="预授权" :visible.sync="dialogPreLicensing" width="60%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-col :span="24">
          <el-col :span="11">
            <div class="licensing-title">
              <h4 class="margin0">预授权列表</h4>
              <div class="right"><el-button type="text" class="el-icon-plus icon-butn" @click="addAuthorization"></el-button></div>
            </div>
            <div class="licensing-content">
              <div class="licensing-li activesing" @click="seeAuthorization">
                <div class="licensing-li-top">
                  <div class="left">
                    <i class="el-icon-message"></i>信用卡
                  </div>
                  <div class="right">预授权</div>
                </div>
                <div class="licensing-li-in">
                  <span>卡号 <em>354321354</em></span>
                  <span>姓名 <em>陆少游</em></span>
                  <span>房号 <em>303</em></span>
                </div>
                <div class="licensing-li-bottom">
                  <span>预授权金额 <em>111.0</em></span>
                </div>
              </div>
              <div class="licensing-li">
                <div class="licensing-li-top">
                  <div class="left">
                    <i class="el-icon-message"></i>信用卡
                  </div>
                  <div class="right">预授权</div>
                </div>
                <div class="licensing-li-in">
                  <span>卡号 <em>354321354</em></span>
                  <span>姓名 <em>陆少游</em></span>
                  <span>房号 <em>303</em></span>
                </div>
                <div class="licensing-li-bottom">
                  <span>预授权金额 <em>111.0</em></span>
                </div>
              </div>
            </div>  
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="licensing-title">
              <h4 class="margin0">预授权详情</h4>
            </div>
            <div class="licensing-content" v-if="seeLicensing">
              <div class="licensing-text">
                <div class="licensing-li-text">
                  <span>
                    <span class="titltop">付款方式 </span>
                    <em>信用卡</em>
                  </span>
                  <span>
                    <span class="titltop">付款人</span>
                    <em>303房-导游 </em>
                  </span>
                  <span>
                    <span class="titltop">卡号 </span>
                    <em>43543543</em>
                  </span>
                  <span>
                    <span class="titltop">金额</span>
                    <em>111.0</em>
                  </span>
                  <span>
                    <span class="titltop">授权号 </span>
                    <em></em>
                  </span>
                  <span>
                    <span class="titltop">有效期 </span>
                    <em></em>
                  </span>
                  <span>
                    <span class="titltop">预授权人 </span>
                    <em>深圳前海豪斯菲尔</em>
                  </span>
                  <span>
                    <span class="titltop">预授权时间 </span>
                    <em>2018-03-06 17:19:29</em>
                  </span>
                  <span>
                    <span class="titltop">备注 </span>
                    <em></em>
                  </span>
                </div>
                <div class="licensing-text-bottom">
                  <span><span class="titltop">完成金额</span> <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em></span>
                  <span><span class="titltop">原始凭证号</span> <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em></span>
                </div>
              </div>
            </div>

            <div class="licensing-content" v-if="editLicensing">
              <div class="licensing-text">
                <div class="licensing-li-text">
                  <span>
                    <span class="titltop">付款方式 </span>
                    <em>
                      <el-radio v-model="radio" label="1" size="mini">信用卡</el-radio>  
                      <el-radio v-model="radio" label="2" size="mini">会员储值卡</el-radio>
                    </em>
                  </span>
                  <span>
                    <span class="titltop">付款人</span>
                    <em>
                      <el-select v-model="form.region" size="mini" placeholder="请选择付款人" style="width:150px">
                        <el-option label="301陆少游" value="shanghai"></el-option>
                        <el-option label="302杜少甫" value="beijing"></el-option>
                      </el-select>
                    </em>
                  </span>
                  <span>
                    <span class="titltop">卡号 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">金额</span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">授权号 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">有效期 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">预授权人 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">预授权时间 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                  <span>
                    <span class="titltop">备注 </span>
                    <em><el-input placeholder="编码" size="mini" style="width:150px"></el-input></em>
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">关闭</el-button>
      </span>
    </el-dialog> 
  </div>
</template>
