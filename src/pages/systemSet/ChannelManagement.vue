<template>
  <div class="template-bg">
    <div class="conter-bg">
      <div class="channel-item" v-for="item in tableData" :key="item.id">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link channel-item-colortip" :style="{'background-color':item.activeBgColor}"></span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="cTtem in colorList" :key="cTtem.id">
              <span class="channel-item-colortip dropdown-color" :style="{'background-color':cTtem.activeBgColor}"></span>
              {{cTtem.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          {{item.typeName}}
        <div class="channel-item-icon">
          {{item.typeName}}
        </div>
        
        <span v-if="item.defaultFlag != 'Y'" class="remove-channel" @click="deleteClick(item)"><i class="el-icon-remove" style="color:red;font-size:22px;"></i></span>
      </div>
      <div class="channel-item" style="border-color:#0074E4;" @click="addChannel">
        添加渠道
        <div class="channel-item-icon" style="background:white;">
          <i class="el-icon-circle-plus" style="color:red;font-size:22px;"></i>
        </div>
      </div>
      <div class="channel-item add-channel" v-show="showAddChannel">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top:20px;" size="mini">
          <el-form-item>
            <el-input v-model="formInline.typeName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveClick">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {listChannelType,delChannelType,updateChannelType,addChannelype} from '../../api/systemSet/type/typeController'

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
      ]
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      this.listRoomType()
    },
    saveClick() {
      const self = this
      addChannelype(self.formInline).then(result => {
        if(result.code == 1){
          self.formInline.typeName = ''
          self.$message({
            message: '添加成功',
            type: 'success'
          });
        }
        this.showAddChannel = false
        self.listRoomType()
      })
    },
    deleteClick(row) {
      const self = this
      this.$confirm('此操作将永久删除该渠道是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delChannelType({typePk:row.typePk}).then(result => {
          if(result.code == 1){
            self.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          self.listRoomType();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    },
    listRoomType(){
      const self = this
      listChannelType({typeMaster: this.typeMaster}).then(result => {
        self.tableData = result.data
        console.log(self.tableData)
      }).catch(() => {
        self.loading = false
      })
    },
    handleCommand(index, command) {
      console.log(index);
      console.log(command);
    },
    onSubmit() {},
    addChannel() {
      this.showAddChannel = !this.showAddChannel;
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

