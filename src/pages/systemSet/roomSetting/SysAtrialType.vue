<template>
  <div>
    <div class="bg-reserve">
      <h5 class="info-title">房态管理</h5>
      <el-button type="primary" size="mini" class="add-pro" @click="addProtocolClick">恢复原始配色</el-button>
      <el-table
        size="mini" 
        border 
        highlight-current-row
        :data="tableData" 
        v-loading="loading"
        style="width: 98%; margin:10px;">
        <el-table-column prop="code" label="房态颜色" align="center">
          <template slot-scope="scope">
            <el-color-picker v-model="scope.row.code" size="mini"></el-color-picker>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="房态描述" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.code" size="mini" disabled></el-input>
            {{scope.row.text}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button @click="saveClick(scope.row)" type="text" size="mini">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      saveClick(row) {
        console.log(row)
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
        },1000)
      },
      deleteClick(row) {
        console.log(row)
      },
      addProtocolClick() {
        //添加协议类别
        // this.tableData.unshift({code:'', name: '', order: '', isNew: true})
        this.loading = true;
        setTimeout(()=>{
          this.loading = false;
        },1000)
        this.tableData = this.tableData1;
      },
    },
    data() {
      return {
        color1:'',
        loading:false,
        tableData: [{
          code: '#6699FF',
          text: '（在住）脏房'
        },{
          code: '#FFCCFF',
          text: '（在住）干净房'
        },{
          code: '#009900',
          text: '维修房'
        },{
          code: '#FF0000',
          text: '停用房'
        },{
          code: '#CC99FF',
          text: '(在住)清洁未检查'
        },{
          code: '#666666',
          text: '（空）脏房'
        },{
          code: '#6699FF',
          text: '（空）干净房'
        },{
          code: '#CC66FF',
          text: '(空)清洁未检查'
        }],
        tableData1: [{
          code: '#6699FF',
          text: '（在住）脏房'
        },{
          code: '#FFCCFF',
          text: '（在住）干净房'
        },{
          code: '#009900',
          text: '维修房'
        },{
          code: '#FF0000',
          text: '停用房'
        },{
          code: '#CC99FF',
          text: '(在住)清洁未检查'
        },{
          code: '#666666',
          text: '（空）脏房'
        },{
          code: '#6699FF',
          text: '（空）干净房'
        },{
          code: '#CC66FF',
          text: '(空)清洁未检查'
        }],
        options1: [{
          value: '启动',
          label: '启动'
        }, {
          value: '关闭',
          label: '关闭'
        }],
        options: [{
          value: '普通物品',
          label: '普通物品'
        }, {
          value: '现金',
          label: '现金'
        }, {
          value: '客房',
          label: '客房'
        }],
      }
    }
  }
</script> 

<style scoped>
.el-input{
  width: 80px;
}
.el-Name{
  width: 120px;
}
.bg-reserve {
  position: relative;
  background: #f7f7f7;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding-top: 18px;
}
.info-title {
  position: absolute;
  z-index: 1;
  top: -6px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
  background: #f7f7f7;
}
.add-pro{
  float:left;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
