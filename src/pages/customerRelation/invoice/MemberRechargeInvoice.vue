<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row class="el-row-heard">
          <el-col :span="6">
            <el-form-item  label="会员ID" prop="userPk">
              <el-input v-model="deposit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button @click="search" class="btn-margin" type="primary" size="mini">搜索</el-button>
          </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%">
        <el-table-column
          label="会员ID">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="会员名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="会员充值未开发票金额"
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
        deposit:"",
        tableData: [{
            userPk:1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            userPk:2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            userPk:3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            userPk:4,
            date: '2016-05-03',
            name: '王小虎',
            idType: '二代身份证',
            idCard:'440883199802081912',
            carNumber:'粤B2-20080314',
            address: '上海市普陀区金沙江路 1516 弄',
            phone:'13246520683',
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
      },
      search(){
        
      }
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 30px 20px;
}
.btn-margin{
  margin:1px 0 0 10px;
}
.el-col-6 {
    width: 25%;
    height: 30px;
}
.el-row-heard {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 15px 0;
}
</style>


