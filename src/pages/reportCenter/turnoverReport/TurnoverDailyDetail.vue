<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="reportBusinessIncome"></el-date-picker>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" :disabled="true">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
      <div class="tip">
        <p>注：数据统计截止到昨天</p>
        <p>应收金额 = 总营业额 - 佣金 - 优惠、促销价</p>
        <p>实际收入 = 应收金额 / ( 1 + 0.06 )</p>
        <p>平均房价 = 实际收入 / 已租房数量</p>
      </div>
    </el-col>
    <el-col :span="24" id="print-turnoverofbusinessincome">
      <div class="tabs">
        <div class="tavs-title">
          <h3>各营业点收入日报表</h3>
        </div>
        <div class="tabs-contetn">
          <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            :show-summary="true"
            :summary-method="getSummaries"
            @expand-change="expandChange"
            border
            style="width: 100%; margin-top: 5px">
            <el-table-column prop="companyName" label="营业点" width="300"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                :header-cell-style="tableStyleObj"
                :cell-style="tableStyleObj"
                :data="subTableData[scope.row.companyPk]" border>
                  <!-- <el-table-column prop="channel0" label="飞猪"></el-table-column> -->
                  <el-table-column width="120" v-for="(v,i) in subHeads[scope.row.companyPk]" :prop="v.code" :label="v.desc" :key="i"></el-table-column>
                  
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="totalTurnover" label="营业额" ></el-table-column>
            <el-table-column prop="totalCommission" label="佣金"></el-table-column>
            <el-table-column prop="totalPromotion" label="优惠/促销价"></el-table-column>
            <el-table-column prop="receivablePrice" label="应收金额"></el-table-column>
            <el-table-column prop="afterTaxes" label="实际收入"></el-table-column>
            <el-table-column prop="avgRoomPrice" label="平均房价"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
          <p class="note_p2"></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {turnoverDaily,turnoverDailyDetail} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
export default {
  data() {
    return {
      datepicker: moment().subtract(1,'days').format("YYYY-MM-DD"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      value: '',
      tableData: [],
      subTableData:{},
      subHeads:{},
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
    }
  },
  created(){
    this.reportBusinessIncome();
  },
  methods: {
    reportBusinessIncome(){
      const datepicker = this.datepicker;
      turnoverDaily({businessDate:datepicker}).then(res => {
        this.tableData = res.data
        this.subTableData = {}
        this.subHeads = {}
        this.tableData.forEach(item=>{
          //初始化子table的表头
          this.subHeads[item.companyPk]=[];
          //初始化子table 数据
          this.subTableData[item.companyPk]=[]
        })
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return  prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += ' 元';
          sums[index] = sums[index].toFixed(2)
        } else {
          sums[index] = '-';
        }
      });
      return sums;
    },
    expandChange(row, expandedRows){
      let data= {
        businessDate:this.datepicker,
        companyPk:row.companyPk
      }
      turnoverDailyDetail(data).then(res=>{
        // this.$set(this.subTableData,'43497ebc-ec16-4b82-89c5-a95e6a52d519',[{'channel0':'哈哈哈大','channel1':'牛逼'}])
        // this.$set(this.subHeads,row.companyPk,res.data.headers)
        this.subHeads[row.companyPk]=res.data.headers
        this.subHeads = Object.assign({}, this.subHeads);
        this.$set(this.subTableData,row.companyPk,res.data.tableData)
      })
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-turnoverofbusinessincome").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
  }
}
</script>
<style scoped>
.tip{
  color: red;
  margin-top: 10px;
}
.tip p{
  margin:0px;
}
.tip :nth-child(n+2){
  padding-left:28px;
}
.exportLink{
  color: white;
  text-decoration: none;
}
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
.note_p,
.note_p1,
.note_p2{
  color:red;
  margin:5px;
}
.note_p1{
  padding-left:28px;
}
.note_p2{
  padding-left:28px;
  margin-bottom:65px
}
</style>
<style>
.el-table__expanded-cell{
  padding: 19px 26px !important;
}
</style>



