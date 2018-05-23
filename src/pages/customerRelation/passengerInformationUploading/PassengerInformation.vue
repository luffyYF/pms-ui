<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row>
        <span class="title-span">旅客列表</span>
        <el-button  type="primary" size="mini">上传至公安</el-button>
      </el-row>
      <hr>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          label="旅客编号"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="旅客类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="name"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="name"
          label="民族">
        </el-table-column>
        <el-table-column
          prop="name"
          label="行政区划">
        </el-table-column>
        <el-table-column
          prop="name"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="name"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="name"
          label="证件类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="证件号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="入住时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="房间号"
          show-overflow-tooltip="">
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        form: {},
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
            idType: '二代身份证',
            idCard:'440883199802081912',
            carNumber:'粤B2-20080314',
            address: '上海市普陀区金沙江路 1516 弄',
            phone:'13246520683',
            roomNumber:'12005',
            beginAndEnd: '2018-03-01 16:03    2018-03-02 12:00'
          }],
        multipleSelection: []
      };
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>

<style scope>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px;
    display: inline-block;
}
</style>


