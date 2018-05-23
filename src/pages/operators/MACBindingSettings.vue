<template>
  <div class="content-body">
    <div style="color:red;">注：mac地址绑定功能无法正常使用，请点击
      <a href="https://www.mgtv.com/h/46134.html?cxid=95kqkw8n6" target="_blank">下载</a>
      安装,安装后请使用360的兼容模式或者IE浏览器重新登录即可!
    </div>
    <el-table
      :data="tableData"
      border=""
      style="width: 100%">
      <el-table-column
        prop="date"
        label="角色编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="address"
        label="MAC是否绑定">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true" type="text" size="small">绑定</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定启用MAC角色绑定?</span>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogVisible = false">取 消</el-button>
              <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-button type="text" @click="dialogVisible2 = true" size="small">不绑定</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible2"
            width="30%">
            <span>确定不启用MAC角色绑定?</span>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
              <el-button size="small" type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <hr>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <el-form-item label="MAC">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.names" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权人">
        <el-input disabled v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.name" style="width:465px;"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button type="primary">新增</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-table
      :data="tableData2"
      border=""
      style="width: 100%">
      <el-table-column
        prop="date"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="name"
        label="MAC地址">
      </el-table-column>
      <el-table-column
        prop="province"
        label="授权人">
      </el-table-column>
      <el-table-column
        prop="city"
        label="授权时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text"
          @click.native.prevent="deleteRow(scope.$index, tableData2)"
          size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        form:{},
        value1: '',
        options:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData2: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        dialogVisible:false,
        dialogVisible2:false,
      };
    },
    methods: {
      init(){
        
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 10px 20px 20px 20px;
  width: 900px;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
}
.input-width{
  width:194px;
}
.input-width-80{
  width:80px;
}
</style>


