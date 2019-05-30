<template>
  <el-dialog class="pattern-dialog2" :title="'转'+title+'房'" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false" :before-close="handleClose" append-to-body>
    <div class="pattern-dialog-container" style="padding: 25px 4px;">
      <el-form ref="reasonForm" :model="reasonForm" label-width="80px" size="mini">
        <el-form-item label="房号">
          <el-input v-model="reasonForm.roomNumbers" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="起始日期" v-model="reasonForm.beginDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" :disabled="true"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="结束日期" v-model="reasonForm.endDate" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-row class="no-bottom">
          <el-col :span="12">
            <el-form-item label="原因" required>
              <el-select v-model="reasonForm.reasonTypePk" placeholder="选择原因">
                <el-option v-for="t in reasonArrays" :key="t.typePk" :label="t.typeName" :value="t.typePk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="损坏级别">
              <el-select v-model="reasonForm.level" placeholder="选择损坏级别">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="是否提醒">
          <el-select v-model="reasonForm.remindFlag">
            <el-option label="不提醒" value="N"></el-option>
            <el-option label="提醒" value="Y"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" required>
          <el-input type="textarea" v-model="reasonForm.remark"></el-input>
        </el-form-item>

        <el-row class="no-bottom">
          <el-col :span="12">
            <el-form-item label="设置人">
              <el-input v-model="reasonForm.createUserName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="解除人">
                <el-input v-model="reasonForm.relieveName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submitRoomReason('REPAIR')" v-if="reasonForm.reasonPk==null" :loading="loading">确认</el-button>
      <el-button size="mini" @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {disableAndRepairBatch} from '@/api/atrialCenter/roomManagerController'

export default {
  data() {
    return {
      dialogVisible: false,
      loading:false,
      title:'',
      formType:'',
      reasonArrays:[], 
      reasonForm: {
        roomPks:[],
        roomNumbers:'',
        beginDate:null,
        endDate:null,
        reasonTypePk:null,
        level:null,
        remindFlag:null,
        createUserName:null,
        typeMaster:null,
        remark:null,
      },
      
    }
  },
  methods: {
    /**
     * type : REPAIR维修 DISABLE停用
     */
    showDialog(type, rooms){
      if(type=='REPAIR'){
        this.title = '维修'
      }else if(type=='DISABLE'){
        this.title = '停用'
      }else{
        return;
      }
      this.formType=type
      this.reasonArrays=[]
      let typeList = JSON.parse(localStorage.getItem("pms_type"))
      typeList.forEach(item=> {
        if(item.typeMaster == this.formType){
          this.reasonArrays.push(item);
        }
      })

      this.dialogVisible = true
      this.reasonForm.roomPks = [] //#endregion
      this.reasonForm.roomNumbers = ''
      this.reasonForm.beginDate =  moment().format("YYYY-MM-DD HH:mm:ss")
      this.reasonForm.endDate = null
      this.reasonForm.reasonTypePk = null;
      this.reasonForm.level = 0
      this.reasonForm.remindFlag = 'N'
      this.reasonForm.remark = null
      this.reasonForm.typeMaster = this.formType
      this.reasonForm.createUserName = JSON.parse(localStorage.getItem('pms_userinfo')).realName
      if(moment().hour()<6){
        this.reasonForm.beginDate = moment().subtract(1, 'days').format("YYYY-MM-DD HH:mm:ss");
      }
      let temparr = [];
      rooms.forEach(item=>{
        this.reasonForm.roomPks.push(item.roomPk)
        temparr.push(item.roomNumber)
      })
      this.reasonForm.roomNumbers = temparr.join(',')
    },

    //提交表单
    submitRoomReason() {
      this.loading = true;
      //校验
      if(!this.reasonForm.endDate){
        this.$message({type:'warning', message: '请选择结束日期'})
        this.loading = false
        return;
      }
      if(!this.reasonForm.reasonTypePk){
        this.$message({type:'warning', message: '请选择原因'})
        this.loading = false
        return;
      }
      if(!this.reasonForm.remark){
        this.$message({type:'warning', message: '请填写说明'})
        this.loading = false
        return;
      }
      disableAndRepairBatch(this.reasonForm).then(res=>{
        this.$message({type:'success', message: '操作成功'})
        this.handleClose()
        this.$emit('callback')
      }).finally(()=>{
        this.loading = false
      })
    },
    handleClose(){
      this.dialogVisible = false;
    },
  }
}
</script>

<style>
.el-input.is-disabled .el-input__inner{
  color: #737373 !important;
}
</style>
