<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
          <el-form :inline="true" size="mini">
        <!-- 营业日期： <date-picker v-model="begenAndEnd"></date-picker> -->
         <el-form-item label="开始日期">
        <el-date-picker
          v-model="queryObj.begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="queryObj.end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
     
        <!-- <el-date-picker v-model="begenAndEnd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker> -->
        <el-button type="primary" size="mini" @click="init">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <el-button type="primary" size="mini">导出EXCEL</el-button>
        <el-button type="primary" size="mini">添加到收藏夹</el-button>
        <el-button type="primary" size="mini"  @click="print">打印预览</el-button>
         </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div id="print-salesGuests">
        <div class="tavs-title">
           <div style="margin-left: 7px;text-align: left;margin-top:20px;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3 style="text-align:center;">深圳市前海豪斯菲尔信息科技有限公司</h3> -->
          <h3 style="text-align:center;">销售分析报表 - 渠道</h3>
        </div>
          <!-- <p style="margin: 0px;text-align:center;">营业日期：<span>自 {{printDate.beginDate}} 至 {{printDate.endDate}}</span></p> -->
        </div>
          <!-- show-summary :summary-method="getSummaries" -->
          <!-- <el-table :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj" :data="tableData" v-loading="loading" border height="450"  style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="channelName" label="渠道"></el-table-column>
            <el-table-column prop="rentalRoomNum" label="房晚数" width="70"></el-table-column>
            <el-table-column label="房晚数%" width="90">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,1)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="peopleNightRoomNum" label="人晚数" width="70"></el-table-column>
            <el-table-column label="人晚数%" width="90">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,2)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="houseFeeIncome" label="房租收入"></el-table-column>
            <el-table-column label="房租收入%">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,3)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cateringFeeIncome" label="餐饮收入"></el-table-column>
            <el-table-column prop="orderFeeIncome" label="其他收入"></el-table-column>
            <el-table-column prop="consumptionAmount" label="消费合计"></el-table-column>
            <el-table-column label="消费合计%">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,4)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="平均房价">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,5)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="房均消费">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,6)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="人均消费">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,7)}}</span>
              </template>
            </el-table-column>
          </el-table> -->
          <div id="print-salesGuestsTable">
          <table width="100%"  border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 12px;margin:0 auto;color:black;text-align: center;" cellpadding="0" cellspacing="0">
             <thead>
            <tr>
              <td colspan="7" style="text-align: left;font-size: 14px;">公司:深圳市前海豪斯菲尔信息科技有限公司</td>
              <td colspan="10" style="text-align:right;font-size:14px;">营业日期：<span>自 {{printDate.beginDate}} 至 {{printDate.endDate}}</span></td>
            </tr>
             <tr>
              <th style="border: 1px solid #000;">渠道</th>
              <th style="border: 1px solid #000;">房晚数</th>
              <th style="border: 1px solid #000;">房晚数%</th>
              <th style="border: 1px solid #000;">人晚数</th>
              <th style="border: 1px solid #000;">人晚数%</th>
              <th style="border: 1px solid #000;">房租收入</th>
              <th style="border: 1px solid #000;">房租收入%</th>
              <th style="border: 1px solid #000;">餐饮收入</th>
              <th style="border: 1px solid #000;">其他收入</th>
              <th style="border: 1px solid #000;">消费合计</th>
              <th style="border: 1px solid #000;">消费合计%</th>
              <th style="border: 1px solid #000;">平均房价</th>
              <th style="border: 1px solid #000;">房均消费</th>
              <th style="border: 1px solid #000;">人均消费</th>
            </tr>
          </thead>
            <!-- <tr>
              <th style="border: 1px solid #000;">渠道</th>
              <th style="border: 1px solid #000;">房晚数</th>
              <th style="border: 1px solid #000;">房晚数%</th>
              <th style="border: 1px solid #000;">人晚数</th>
              <th style="border: 1px solid #000;">人晚数%</th>
              <th style="border: 1px solid #000;">房租收入</th>
              <th style="border: 1px solid #000;">房租收入%</th>
              <th style="border: 1px solid #000;">餐饮收入</th>
              <th style="border: 1px solid #000;">其他收入</th>
              <th style="border: 1px solid #000;">消费合计</th>
              <th style="border: 1px solid #000;">消费合计%</th>
              <th style="border: 1px solid #000;">平均房价</th>
              <th style="border: 1px solid #000;">房均消费</th>
              <th style="border: 1px solid #000;">人均消费</th>
            </tr> -->
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.channelName}}</td>
              <td style="border: 1px solid #000;">{{item.rentalRoomNum}}</td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,1)}}</span></td>
              <td style="border: 1px solid #000;">{{item.peopleNightRoomNum}}</td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,2)}}</span></td>
              <td style="border: 1px solid #000;">{{item.houseFeeIncome}}</td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,3)}}</span></td>
              <td style="border: 1px solid #000;">{{item.cateringFeeIncome}}</td>
              <td style="border: 1px solid #000;">{{item.orderFeeIncome}}</td>
              <td style="border: 1px solid #000;">{{item.consumptionAmount}}</td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,4)}}</span></td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,5)}}</span></td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,6)}}</span></td>
              <td style="border: 1px solid #000;"><span v-if="tableData.length-1 != scope.$index">{{item | moneyFilter(sumObj,7)}}</span></td>
            </tr>
            <!-- 合计 -->
            <tr>
              <td style="border: 1px solid #000;">合计</td>
              <td style="border: 1px solid #000;">{{heji.a}}</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">{{heji.b}}</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">{{heji.c}}</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">{{heji.d}}</td>
              <td style="border: 1px solid #000;">{{heji.e}}</td>
              <td style="border: 1px solid #000;">{{heji.f}}</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="7" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="7" style="text-align: right;font-size: 14px;">打印日期：<span>{{printDate.now}}</span></td>
            </tr>
          </tfoot>
          </table>
          <!-- <p style="height:20px;"><span class="left">打印日期：{{printDate.now}}</span><span class="right">	操作员：	{{userInfo.realName}}</span></p> -->
          <p style="height:20px;color:red">	注：此报表为夜审报表，数据统计截止到昨天。。</p>
          </div>
        </div>
    </el-col>
  </div>
</template>
<script>
import DatePicker from '@/components/DateComponent/DatePicker';
import {channelSaleAnalysis} from '@/api/reportCenter/pmsReportFormController'
import moment from 'moment'
import { getLodop } from '@/utils/lodop'
export default {
  components:{moment,DatePicker},
  data() {
    return {
      heji:{
        a:0,
        b:0,
        c:0,
        d:0,
        e:0,
        f:0
      },
      // begenAndEnd:{
      //   begin:moment().subtract(2, "days").format("YYYY-MM-DD"),
      //   end:moment().subtract(1, "days").format("YYYY-MM-DD")
      // },
      tableData: [],
      loading:false,
       LODOP: null,
      queryObj:{
        begin:moment().subtract(2, "days").format("YYYY-MM-DD"),
        end:moment().subtract(1, "days").format("YYYY-MM-DD")
      },
        tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
       'border-color':'black'
      },
      sumObj:{
        
      },
      printDate:{
        beginDate:moment().subtract(2, "days").format("YYYY-MM-DD"),
        endDate:moment().subtract(1, "days").format("YYYY-MM-DD"),
        now:moment().format("YYYY-MM-DD hh:mm:ss"),
      },
      userInfo:JSON.parse(localStorage.getItem("pms_userinfo"))
    }
  },
  watch:{
    begenAndEnd: function () {
      if (this.begenAndEnd) {
        this.queryObj.begin =this.begenAndEnd.begin;
        this.queryObj.end = this.begenAndEnd.end;
      }
      //  if (this.queryObj.begin!=null&&this.queryObj.end!=null) {
      //   this.queryObj.begin =this.queryObj.begin;
      //   this.queryObj.end = this.queryObj.end;
      // }
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        console.log(column)
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(column.property === 'roomNightNumber' || column.property === 'lateNumberOfPeople'  || column.property === 'rentIncome' || column.property === 'restaurantIncome' || column.property === 'otherIncome' || column.property === 'totalConsumption') {
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
        }
      });
      return sums;
    },
    init(){
      if(this.queryObj.begin == null || this.queryObj.begin == "" || this.queryObj.end == null || this.queryObj.end == ""){
        this.$message({ type: 'warning', message: "请选择营业时间" })
        return
      }
      var data = {
        beginDate : this.queryObj.begin,
        endDate : this.queryObj.end,
        now:moment().format("YYYY-MM-DD hh:mm:ss"),
      }
      this.loading = true;
      channelSaleAnalysis(data).then(res=>{
        if(res.code == 1){
          this.tableData = res.data
          for(var i=0;i<tableData.length;i++){
             this.heji.a += tableData[i].rentalRoomNum;
             this.heji.b += tableData[i].peopleNightRoomNum;
             this.heji.c += tableData[i].houseFeeIncome;
             this.heji.d += tableData[i].cateringFeeIncome;
             this.heji.e += tableData[i].orderFeeIncome;
             this.heji.f += tableData[i].consumptionAmount;
          }
          this.sumObj = res.data[res.data.length-1]
          this.printDate = data
        }
        this.loading = false
      });
    },
    //打印预览
     print() {
      this.createOneFormPage();
      if (this.LODOP) {
        this.LODOP.PREVIEW();
      }
    },
      createOneFormPage() {
      this.LODOP=getLodop();
      if (!this.LODOP) {
        return
      }
      this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
        this.LODOP.NewPageA(); // 自动分页
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
        this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-salesGuestsTable").innerHTML);
       this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-salesGuests").innerHTML);
       this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
   
    }
  },
  filters:{

    moneyFilter(row,sumObj,type){
      // type 1 房晚% 2 人晚% 3房租收入% 4 消费合计% 5平均房价 6房均消费 7 人均消费
      if(type == 1){
        if(!sumObj.houseFeeIncome){
          return 0
        }
        return (row.houseFeeIncome/sumObj.houseFeeIncome*100).toFixed(2)

      }else if(type == 2){
        if(!sumObj.peopleNightRoomNum){
          return 0
        }
        return (row.peopleNightRoomNum/sumObj.peopleNightRoomNum*100).toFixed(2)

      }else if(type == 3){
        if(!sumObj.consumptionAmount){
          return 0
        }
        return (row.consumptionAmount/sumObj.consumptionAmount*100).toFixed(2)

      }else if(type == 4){
        if(!sumObj.houseFeeIncome){
          return 0
        }
        return (row.houseFeeIncome/sumObj.houseFeeIncome*100).toFixed(2)

      }else if(type == 5){
        if(!row.houseFeeIncome || !row.rentalRoomNum){
          return 0
        }
        return (row.houseFeeIncome/row.rentalRoomNum).toFixed(2)

      }else if(type == 6){
        if(!row.consumptionAmount || !row.rentalRoomNum){
          return 0
        }
        return (row.consumptionAmount/row.rentalRoomNum).toFixed(2)

      }else if(type == 7){
        if(!row.consumptionAmount || !row.peopleNightRoomNum){
          return 0
        }
        return (row.consumptionAmount/row.peopleNightRoomNum).toFixed(2)
      }

    }
  },
  created() {
    this.init();
     var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
  },
  mounted() {
    
  },
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
</style>


