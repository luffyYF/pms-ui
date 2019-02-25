// 渠道管理
<template>
  <div class="template-bg">
    <div class="conter-bg">
      <el-button type="primary" size="mini" @click="showChannelDialog">添加渠道</el-button>
      <el-button type="primary" size="mini" @click="init" icon="el-icon-search">查询</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData"
        height="500"
        v-loading="loading"
        style="margin:10px auto;">
        <!-- <el-table-column prop="icon" label="图标" align="center" width="100"></el-table-column> -->
        <el-table-column prop="typeName" label="渠道名称" align="center"></el-table-column>
        <el-table-column prop="channelCode" label="渠道编码" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.editCodeFlag==false">{{scope.row.channelCode}}</span>
            <el-button v-if="scope.row.editCodeFlag==false" type="text" class="el-icon-edit" @click="codeEditClick(scope.row)"></el-button>
            <el-input type="text" v-if="scope.row.editCodeFlag==true" size="mini" v-model="scope.row.channelCode" placeholder="渠道编码" clearable> </el-input>
            <el-button v-if="scope.row.editCodeFlag==true" type="primary" size="mini" @click="codeEditSaveClick(scope.row)">保存</el-button>
            <el-button v-if="scope.row.editCodeFlag==true" size="mini" @click="codeEditCancelClick(scope.row)">取消</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="commissionRate" label="佣金率%" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.editFlag==false">{{scope.row.commissionRate}}</span>
            <el-button v-if="scope.row.editFlag==false" type="text" class="el-icon-edit" @click="columEditClick(scope.row)"></el-button>
            <el-input-number v-if="scope.row.editFlag==true" v-model="scope.row.tempCommissionRate" :controls="false" :min="0" size="mini"></el-input-number>
            <el-button v-if="scope.row.editFlag==true" type="primary" size="mini" @click="raleEditSaveClick(scope.row)">保存</el-button>
            <el-button v-if="scope.row.editFlag==true" size="mini" @click="raleEditCancelClick(scope.row)">取消</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="usingFlag" label="启用/停用" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.usingFlag" active-value="Y" inactive-value="N" @change="statusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.editFlag2==false">{{scope.row.sortNum}}</span>
            <el-button v-if="scope.row.editFlag2==false" type="text" class="el-icon-edit" @click="columEditSort(scope.row)"></el-button>
            <el-input-number v-if="scope.row.editFlag2==true" v-model="scope.row.tempSortNum" :controls="false" :min="0" size="mini"></el-input-number>

            <el-button v-if="scope.row.editFlag2==true" type="primary" size="mini" @click="sortEditSaveClick(scope.row)">保存</el-button>
            <el-button v-if="scope.row.editFlag2==true" size="mini" @click="sortEditCancelClick(scope.row)">取消</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
     <el-dialog
      title="添加渠道"
      :visible.sync="dialogVisible"
      width="400px"
      center>
      <el-form ref="form" :model="form" label-width="100px" size="mini" class="form-channel">
        <el-form-item label="系统渠道" required>
          <el-select v-model="form.systemChannelId" placeholder="请选择系统渠道">
            <el-option :label="v.channelName" :value="v.channelId" v-for="(v,i) in systemChannels" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="佣金率%">
          <el-input-number v-model="form.commissionRate" :controls="false" :min="0"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addChannel" size="mini" :loading="loading2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  listChannelType,
  updateChannelType,
  addChannelype,
  updateChannelRate,
  updateChannelUsing,
  updateChannelSortNum,
  updateChannelCode
} from '../../api/systemSet/type/typeController'
import {listSysChannel} from '@/api/upmsApi'

export default {
  data() {
    return {
      showAddChannel: false,
      typeMaster: 'CHANNEL',
      formInline: {
        type: '',
        typeMaster: 'CHANNEL',
        typeName: ''
      },
      tableData:[],
      colorList: [
        { name: "秋菊色", activeBgColor: "rgb(255, 140, 15)" },
        { name: "蜡笔黄", activeBgColor: "rgb(250, 205, 137)" },
        { name: "黄绿色", activeBgColor: "rgb(179, 212, 101)" },
        { name: "翠绿色", activeBgColor: "rgb(75, 193, 107)" },
        { name: "薄荷蓝", activeBgColor: "rgb(22, 182, 204)" },
        { name: "古兰色", activeBgColor: "rgb(3, 102, 195)" },
        { name: "紫罗兰", activeBgColor: "rgb(176, 84, 159)" }
      ],
      loading:false,
      loading2:false,
      systemChannels:[],
      form:{
        systemChannelId:'',
        commissionRate: 0,
        typeName:'',
        icon:'',
      },
      dialogVisible:false,
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.listRoomType()
    },
    listRoomType(){
      listChannelType().then(result => {
        this.tableData = result.data
        this.tableData.forEach(row=>{
          /*
            定义初始化列表字段
          */
          this.$set(row,'editCodeFlag',false)
          this.$set(row,'editFlag',false)
          this.$set(row,'editFlag2',false)
          this.$set(row,'tempCommissionRate',0)
        })
      }).catch(() => {
        this.loading = false
      })
    },
    handleCommand(index, command) {
      console.log(index);
      console.log(command);
    },
    onSubmit() {},
    columEditClick(row){
      this.$set(row,'editFlag',true)
      this.$set(row,'tempCommissionRate',row.commissionRate)
    },
    raleEditCancelClick(row){
      this.$set(row,'editFlag',false)
    },
    raleEditSaveClick(row){
      this.$set(row,'commissionRate',row.tempCommissionRate)
      let data={
        typePk:row.typePk,
        commissionRate: row.commissionRate
      }
      updateChannelRate(data).then(res=>{
        this.$message.success('佣金已更改');
        this.$set(row,'editFlag', false)
      })
    },
    codeEditCancelClick(row){
      this.$set(row,'editCodeFlag',false)
    },
    codeEditClick(row){
      this.$set(row,'editCodeFlag',true)
      this.$set(row,'channelCode',row.channelCode)
    },
    codeEditSaveClick(row){
      this.$set(row,'channelCode',row.channelCode)
      let data={
        typePk:row.typePk,
        channelCode: row.channelCode
      }
      updateChannelCode(data).then(res=>{
        this.$message.success('编码已更改');
        this.$set(row,'editCodeFlag', false)
      })
    },
    columEditSort(row){
      this.$set(row,'editFlag2',true)
      this.$set(row,'tempSortNum',row.sortNum)
    },
    sortEditSaveClick(row){
      this.$set(row,'sortNum',row.tempSortNum)
      let data={
        typePk:row.typePk,
        sortNum: row.sortNum
      }
      updateChannelSortNum(data).then(res=>{
        this.$message.success('排序已更改');
        this.$set(row,'editFlag2', false)
      })
    },
    sortEditCancelClick(row){
      this.$set(row,'editFlag2',false)
    },
    
    statusChange(row){
      let data = {
        typePk:row.typePk,
        usingFlag: row.usingFlag
      }
      updateChannelUsing(data).then(res=>{
        this.$message.success('操作成功');
      })
    },
    showChannelDialog(){
      this.systemChannels = [];
      listSysChannel().then(res=>{
        this.systemChannels = res.data;
        this.form = {}
        this.dialogVisible = true;
      })
    },
    addChannel(){
      this.loading2 = true;
      let cid = this.form.systemChannelId
      this.systemChannels.forEach(channel=>{
        if(cid==channel.channelId){
          this.form.typeName = channel.channelName
          this.form.icon = channel.icon
        }
      })
      
      addChannelype(this.form).then(result => {
        this.$message({ message: '添加成功', type: 'success'});
        this.loading2 = false
        this.dialogVisible = false;
        this.listRoomType();
      })
      .catch(error=>{this.loading2 = false})
      .finally(()=>{this.loading2 = false});
    }
  }
};
</script>

<style scoped>
.template-bg {
  background-color: #f7f7f7;
  padding: 30px;
}
.conter-bg:after {
   clear:both;
   content:'.';
   display:block;
   width: 0;
   height: 0;
   visibility:hidden;
}
.conter-bg {
  background-color: #ffffff;
  padding: 10px 30px;
  zoom:1;
}
.channel-item {
  display: inline-flex;
  float: left;
  border: 1px solid #eee;
  width: 140px;
  border-radius: 40px;
  padding-right: 80px;
  padding-left: 40px;
  margin: 10px;
  position: relative;
  height: 70px;
  line-height: 70px;
}
.remove-channel {
  position: absolute;
  bottom: 0;
  right: 0;
  line-height: 0;
}
.channel-item .channel-item-colortip,
.channel-item .channel-item-icon,
.channel-item .channel-item-type {
  position: absolute;
  overflow: hidden;
}
.channel-item .channel-item-colortip {
  top: 25px;
  left: -25px;
}
.channel-item-colortip {
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 20px;
}
.dropdown-color {
  position: relative;
  top: 5px;
  left: 0;
}
.channel-item .channel-item-icon {
  right: 10px;
  top: 5px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  text-align: center;
  line-height: 60px;
  background: #eeeeee;
  color: #666;
}
.channel-item .channel-item-type {
  bottom: 0;
  left: 0;
  line-height: 20px;
  width: 80%;
  text-align: center;
}
.add-channel {
  text-align: center;
  width: 265px;
  border-color: #0074e4;
  padding-right: 10px;
  line-height: 0;
}
</style>

<style>
.form-channel .el-input__inner{
  width:166px;
}
</style>
