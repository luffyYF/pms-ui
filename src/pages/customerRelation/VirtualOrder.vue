<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-row>
        <span class="title-span">虚拟账单查询</span>
      </el-row>
      <hr>
      <el-row class="el-row-heard2">
          <el-col :span="4">
            <el-form-item  label="组单号" prop="userPk">
              <el-input v-model="userPk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item  label="房间号" prop="userPk">
              <el-input v-model="userPk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item  label="姓名" prop="userPk">
              <el-input v-model="userPk"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <div class="block">
        <el-row class="el-row-heard2">
          <el-form-item  label="入离时间" prop="orderDate">
            <el-date-picker
              v-model="orderDate"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              @change="orderDateChange"
              align="right">
            </el-date-picker>
            <el-button @click="search" class="btn-margin" type="primary" size="mini">搜索</el-button>
          </el-form-item>
        </el-row>
      </div>
      <el-table
        :data="tableData4"
        border
        fit
        max-height="600"
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="账单序号">
        </el-table-column>
        <el-table-column
          fixed
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogTableVisible = true">查看</el-button>
            <el-dialog title="虚拟账单明细" 
              width="60%"
              :append-to-body="true"
              :visible.sync="dialogTableVisible">
              <div class="bg-reserve">
                <h5 class="info-title">虚拟账单明细</h5>
                <div class="info-li">
                  组单号：147875 房间号：0000 ,104 ,105 ,109 ,112 ,303 ,304 ,312 ,320 姓名：新客人 ,新客人 ,新客人 ,新客人 ,新客人 ,新客人 ,新客人 ,新客人 ,新客人 人数：9 房价：0.0,0.0,0.0,0.0,0.0,0.0,0.0,500.0,500.0 日期：2018-01-31 10:39:50.0
                </div>
              </div>
              <el-table 
                :data="gridData"
                border
                fit
                height="300"
                style="width: 100%; margin-top:10px;">
                <el-table-column property="date" label="项目"></el-table-column>
                <el-table-column property="name" label="消费金额"></el-table-column>
                <el-table-column property="name" label="结算金额"></el-table-column>
                <el-table-column property="name" label="数量"></el-table-column>
                <el-table-column property="name" label="房号"></el-table-column>
                <el-table-column property="name" label="客单号"></el-table-column>
                <el-table-column property="name" label="发生日期"></el-table-column>
                <el-table-column property="name" label="操作员"></el-table-column>
                <el-table-column property="name" label="备注"></el-table-column>
                <el-table-column property="address" label="营业日期" show-overflow-tooltip></el-table-column>
              </el-table>
              <el-row class="el-row-heard2">
                <el-col :span="6">
                  <el-form-item  label="消费" prop="consumption">
                    <el-input v-model="consumption" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  label="实收" prop="netReceipts">
                    <el-input v-model="netReceipts" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  label="应收" prop="receivable">
                    <el-input v-model="receivable" readonly></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            </el-dialog>
            <el-button type="text" @click="dialogVisible = true">删除</el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :append-to-body="true"
              :before-close="handleClose">
              <span>确认删除此账单</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>
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
        radioType:'one',
        pickerOptions1: {
          // disabledDate(time) {
          //   return time.getTime() < Date.now() - 3600 * 1000 * 24;
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        date: '',
        userPk:'',
        tableData4: [{
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
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
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
        //时间控件
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() < Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '后三天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        orderDate:'',
        dialogVisible:false,
        dialogTableVisible:false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        consumption:1000,
        netReceipts:1200,
        receivable:1000,
      };
    },
    methods: {
      search(){
        
      },
      orderDateChange(value){

      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
        // this.dialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>

<style scoped>
.content-body{
  background-color: #f7f7f7;
  padding: 5px 20px 30px 20px;
  height: 100%;
  overflow: auto;
}
.btn-margin{
  margin:1px 0 0 10px !important;
}
.el-col-6 {
    width: 25%;
    height: 30px;
}
.el-row-heard {
    margin: 10px 0 0 0;
}
.el-row-heard2 {
    margin: 10px 0 5px 0;
}
.title-span{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 0;
    display: inline-block;
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
  top: -12px;
  display: inline-block;
  margin: 0;
  margin-left: 14px;
}
.info-li {
  margin-bottom: 0 !important;
  padding: 0 10px 10px;
}
.el-dialog__body {
    padding: 0px 20px 40px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.el-table{
  margin-top: 10px;
}
</style>


