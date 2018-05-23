<template>
  <div class="content-body">
    <el-form ref="form" :model="form" size="mini" label-width="80px">
      <el-radio-group v-model="radioType" class="el-row-heard">
        <el-radio label="one">个人</el-radio>
        <el-radio label="team">团队</el-radio>
      </el-radio-group>
      <el-row class="el-row-heard2">
          <el-col :span="6">
            <el-form-item  label="ID / 姓名" prop="userPk">
              <el-input v-model="userPk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  label="开始日期" prop="date">
              <div class="block">
                <el-date-picker
                  v-model="date"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button @click="search" class="btn-margin" type="primary" size="mini">搜索</el-button>
          </el-col>
      </el-row>
      <el-table
        :data="tableData6"
        border
        :summary-method="getSummaries"
        show-summary
        style="width: 100%">
        <el-table-column
          prop="id"
          label="客单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="amount1"
          label="房间号">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="amount3"
          sortable
          label="未开发票金额"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <span style="color:red;">
        PS：*双击单行单独开发票，双击“合计”开合计发票<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        *所有结账消费的发票金额不包括会员卡充值金额
      </span>
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
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    methods: {
      search(){
        
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(index === 4){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          }
        });
        return sums;
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
  margin:1px 0 0 30px;
}
.el-col-6 {
    width: 25%;
    height: 30px;
}
.el-row-heard {
    margin: 10px 0 0 0;
}
.el-row-heard2 {
    margin: 10px 0 10px 0;
}
</style>


