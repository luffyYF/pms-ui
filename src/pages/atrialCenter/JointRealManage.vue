//联房管理
<template>
  <div class="jointreal-manage">
    <el-form :inline="true" size="mini" class="demo-form-inline">
      <el-row>
        <el-col :span="24"><div class="bg-purple-dark">注：底色为灰色的房间为已联房房间！</div></el-col>
      </el-row> 
      <el-row class="joint-manage-contenter">
        <el-col :span="11">
          <div class="target-room">
            <h4>选择目标房号</h4>
            <div class="target-content">
              <el-form-item>
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">备选项</el-radio>
                  <el-radio :label="6" class="bg-joint">备选项</el-radio>
                  <el-radio :label="9" class="bg-joint">备选项</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-col> 
        <el-col :span="2">
          <div class="joint-icon">
            <div>
              <span class="el-icon-d-arrow-left"></span>
              <span class="el-icon-d-arrow-right"></span>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="joint-room">
            <h4>选择联房房号</h4>
            <div class="joint-content">
              <el-form-item>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
        </el-col>   
      </el-row> 
      <el-row class="joint-button">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存结果</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>  
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio2: '',
        checkList: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
.jointreal-manage{
  position: absolute;
  overflow: auto;
  width: 100%;
  height: calc(100% - 160px);
}
.bg-purple-dark {
  background-color: #fdf7f7;
  border-color: #eed3d7;
  padding: 10px;
}
.keeping-content{
  padding: 10px;
}
.joint-manage-contenter{
  margin: 0 10px;
}
.target-content, .joint-content{
  border: 1px solid #dddddd;
  height: 500px;
  padding: 15px;
  overflow-y: auto;
}
.el-radio+.el-radio{
  margin-left: 0 !important;
}
.el-radio{
  padding: 10px;
}
.bg-joint{
  background: #dddddd;
}
.joint-icon{
  height: 555px;
  line-height: 555px;
  border: none;
  text-align: center;
}
.joint-button{
  margin-top: 20px;
  padding-right: 20px;
  text-align: right;
}

</style>