<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="mini" @change="reportBusinessIncome"></el-date-picker>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini"><a class="exportLink" :href="baseUrl+ziurl+'businessDate='+datepicker" target="_blank">导出EXCEL</a></el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
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
            <el-table-column prop="companyName" label="营业点"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                :header-cell-style="tableStyleObj"
                :cell-style="tableStyleObj"
                :data="subTableData[scope.row.companyPk]" border>
                  <el-table-column prop="channel0" label="飞猪"></el-table-column>
                  <el-table-column prop="channel1" label="二狗"></el-table-column>
                  <el-table-column prop="channel1" label="二狗"></el-table-column>
                  <el-table-column prop="channel1" label="二狗"></el-table-column>
                  <el-table-column prop="channel1" label="二狗"></el-table-column>
                  <el-table-column prop="channel1" label="二狗"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="totalTurnover" label="当日营业额"></el-table-column>
            <el-table-column prop="afterTaxes" label="当日税后收入"></el-table-column>
            <el-table-column prop="avgRoomPrice" label="当日平均房价"></el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	操作员：	{{userInfo.upmsUserName}}</span></p>
          <p class="note_p">注：当日税后收入 = 当日营业额/(1+6%)</p>
          <p class="note_p1">当日平均房价=当日营业额/当日入住房间数</p>
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
import {turnoverDaily} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
export default {
  data() {
    return {
      datepicker: moment().format("YYYY-MM-DD"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      value: '',
      tableData: [],
      subTableData:{},
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
      baseUrl:common.baseUrl,
      ziurl:"/pms/report/businessIncomeExcel?",
      userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
      
    }
  },
  created(){
    this.reportBusinessIncome();
  },
  methods: {
    reportBusinessIncome(){
      const datepicker = this.datepicker;
      console.log(datepicker)
      turnoverDaily({businessDate:datepicker}).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.subTableData = {}
        this.tableData.forEach(item=>{
          //初始化子table
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
      // this.subTableData[7]={'channel0':'niuniu','channel1':'哈哈哈'}
      // this.subTableData['3bae2b27-be6e-4e65-ae4d-67c240aa25ca']=[{'channel0':'哈哈哈大','channel1':'牛逼'}]
      this.$set(this.subTableData,'3bae2b27-be6e-4e65-ae4d-67c240aa25ca',[{'channel0':'哈哈哈大','channel1':'牛逼'}])      

      console.log(this.subTableData);
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
  padding:0px 15px !important;
}
</style>



