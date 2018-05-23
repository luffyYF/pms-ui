<template>
  <div class="content-body">
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="80px">
      <!-- input -->
      <div class="bg-reserve">
        <h5 class="info-title">货单信息</h5>
        <div class="info-li">
          <el-form-item label="单据编号">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="盘点日期">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="制单员">
            <el-input v-model="form.carNumber"></el-input>
          </el-form-item>
          <el-form-item label="仓管员">
            <el-select v-model="form.phone" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="盘点仓库">
            <el-select v-model="form.phone" placeholder="请选择" disabled>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- table -->
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="简拼">
        </el-table-column>
        <el-table-column
          prop="name"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="name"
          label="库存数量">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盘点数量">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈亏数量">
        </el-table-column>
        <el-table-column
          prop="name"
          label="成本价">
        </el-table-column>
        <el-table-column
          prop="name"
          label="盈亏金额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="有效期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="来源">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.address"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="24" style="margin-top:15px;">
        <el-col :span="8" :offset="16">
          <el-button size="mini" type="primary">盘点</el-button>
          <el-button size="mini" type="primary">取消盘点</el-button>
          <el-button size="mini" type="primary">导出</el-button>
          <el-button size="mini" type="primary">完成预审</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {  },
  data() {
    return {
      form: {},
      value1:'',
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
        }]
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 20px 20px;
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
.book-info{
  height: 537px;
}
.el-select {
  width: 178px;
}
.end-col {
  margin-left: 15px;
}
.info-li {
  margin-bottom: 0 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 178px;
}
</style>
