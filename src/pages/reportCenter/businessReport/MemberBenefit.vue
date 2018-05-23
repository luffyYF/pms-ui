<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        注册日期：<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        消费日期：<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
        <div style="margin-top:10px;">
          <el-button size="mini">网页预览</el-button>
          <el-button size="mini">PDF预览</el-button>
          <el-button size="mini">导出EXCEL</el-button>
          <el-button size="mini">添加到收藏夹</el-button>
          <el-button size="mini">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>会员发展效益表</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">	打印时间：<span>2018-03-09</span></p>
          <p>注册日期：<span>2018-03-10至2018-03-10</span>&nbsp;&nbsp;&nbsp;&nbsp;消费日期：<span>2018-03-10至2018-03-10</span></p>
          <el-table :data="tableData" border show-summary :summary-method="getSummaries" style="width: 100%" empty-text="酒店编号:223995			酒店名称:	呼叫中心">    
            <el-table-column prop="id" label="销售员(员工编号)" width="150"></el-table-column>
            <el-table-column prop="name" label="会员数量" width="100"></el-table-column>
            <el-table-column prop="amount1" label="有消费的会员数量" width="150"></el-table-column>
            <el-table-column prop="amount2" label="有消费的会员比率(%)" width="180"></el-table-column>
            <el-table-column prop="amount3" label="消费次数"></el-table-column>
            <el-table-column prop="name" label="房晚数"></el-table-column>
            <el-table-column label="消费">
              <el-table-column prop="amount1" label="房费"></el-table-column>
              <el-table-column prop="amount2" label="其它"></el-table-column>
            </el-table-column>
            <el-table-column label="消费类别比例(%)">
              <el-table-column prop="amount1" label="房费(%)"></el-table-column>
              <el-table-column prop="amount3" label="其它(%)"></el-table-column>
            </el-table-column>
          </el-table>
          <el-table :data="tableData6" border :show-header="false" show-summary :summary-method="getSummaries" style="width: 100%">    
            <el-table-column prop="id" label="销售员(员工编号)" width="150"></el-table-column>
            <el-table-column prop="name" label="会员数量" width="100"></el-table-column>
            <el-table-column prop="amount1" label="有消费的会员数量" width="150"></el-table-column>
            <el-table-column prop="amount2" label="有消费的会员比率(%)" width="180"></el-table-column>
            <el-table-column prop="amount3" label="消费次数"></el-table-column>
            <el-table-column prop="name" label="房晚数"></el-table-column>
            <el-table-column label="消费">
              <el-table-column prop="amount1" label="房费"></el-table-column>
              <el-table-column prop="amount2" label="其它"></el-table-column>
            </el-table-column>
            <el-table-column label="消费类别比例(%)">
              <el-table-column prop="amount1" label="房费(%)"></el-table-column>
              <el-table-column prop="amount3" label="其它(%)"></el-table-column>
            </el-table-column>
          </el-table>
          <p class="item-type">酒店编号:	223995		酒店名称:	深圳市前海豪斯菲尔信息科技有限公司</p>
          <el-table :data="tableData6" border :show-header="false" show-summary :summary-method="getSummaries" style="width: 100%">    
            <el-table-column prop="id" label="销售员(员工编号)" width="150"></el-table-column>
            <el-table-column prop="name" label="会员数量" width="100"></el-table-column>
            <el-table-column prop="amount1" label="有消费的会员数量" width="150"></el-table-column>
            <el-table-column prop="amount2" label="有消费的会员比率(%)" width="180"></el-table-column>
            <el-table-column prop="amount3" label="消费次数"></el-table-column>
            <el-table-column prop="name" label="房晚数"></el-table-column>
            <el-table-column label="消费">
              <el-table-column prop="amount1" label="房费"></el-table-column>
              <el-table-column prop="amount2" label="其它"></el-table-column>
            </el-table-column>
            <el-table-column label="消费类别比例(%)">
              <el-table-column prop="amount1" label="房费(%)"></el-table-column>
              <el-table-column prop="amount3" label="其它(%)"></el-table-column>
            </el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：2018-03-09 17:52:15</span><span class="right">	操作员：	深圳前海豪菲尔</span></p>
          <p style="height:20px;color:red;margin-bottom:50px;">	注：此报表统计本店所有指定会员在时间段内的所有分店的积分明细信息.</p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      tableData6: [{
        id: '12987122', 
        name: '2523',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '234532',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '35',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '33',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '543',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
            return [1, 2];
          }
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        console.log(column)
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => parseInt(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' ';
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

  }
}
</script>
<style scoped>
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  text-align: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.tabsAdd{
  border: 1px solid #ddd;
  margin: 0;
  border-top: 0;
  padding: 5px 10px;
}
.item-type {
  border-left:1px solid #ebeef5;
  border-right:1px solid #ebeef5;
  margin: 0;
  line-height: 60px;
  font-size: 14px;
  color: #909399;
  text-align: center;
}
</style>


