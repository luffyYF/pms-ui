<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        
        <el-form :inline="true" size="mini" class="demo-form-inline">
          <el-form-item label="营业日期：" prop="begenAndEnd">
          <date-picker v-model="begenAndEnd"></date-picker>
          </el-form-item>
            <el-form-item label="销售员:">
            <el-select v-model="printDate.saleTypePk" placeholder="选择销售员">
              <el-option
              v-for="item in typeList"
              :key="item.typePk"
              :label="item.typeName"
              :value="item.typePk"></el-option>
            </el-select>     
          </el-form-item>
        </el-form>
        <!-- <el-date-picker v-model="begenAndEnd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker> -->
        <el-button type="primary" size="mini" @click="init">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <el-button type="primary" size="mini">导出EXCEL</el-button>
        <el-button type="primary" size="mini">添加到收藏夹</el-button>
        <el-button type="primary" size="mini" @click="print">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24" id="print-salesAgreementConsumptionDetails">
      <div class="tabs">
        <div class="tavs-title">
          <h3 style="text-align:center">深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h4 style="text-align:center">销售员发展协议单位消费明细报表</h4>
        </div>
        <div class="detail-content">
          <p style="margin: 0px;text-align:center">营业日期：<span>自 {{printDate.beginDate}} 至 {{printDate.endDate}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售员：{{printDate.saleName}}</p>
          <!-- show-summary :summary-method="getSummaries" -->
          <!-- <el-table :header-cell-style="tableStyleObj" 
            :cell-style="tableStyleObj"  :span-method="objectSpanMethod" :data="tableData" v-loading="loading" border  style="width: 100%; margin:0 auto;margin-top: 5px;border:1px solid black">
            <el-table-column prop="agreementCode" label="协议号" align="center"></el-table-column>
            <el-table-column prop="agreementName" label="协议单位" align="center"></el-table-column>
            <el-table-column prop="typeName" label="房型" align="center"></el-table-column>
            <el-table-column prop="rentalRoomNum" label="房晚数" align="right" width="70"></el-table-column>
            <el-table-column prop="houseFeeIncome" label="房租收入" align="right"></el-table-column>
          </el-table> -->
            <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: left;" cellpadding="6" cellspacing="0">
            <tr>
              <th>协议号</th>
              <th>协议单位</th>
              <th>房型</th>
              <th>房晚数</th>
              <th>房租收入</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="align:center">{{item.agreementCode}}</td>
              <td style="align:center">{{item.agreementName}}</td>
              <td style="align:center">{{item.typeName}}</td>
              <td style="align:right">{{item.rentalRoomNum}}</td>
              <td style="align:right">{{item.houseFeeIncome}}</td>
            </tr>
          </table>
          <p style="height:20px;"><span class="left">打印日期：{{printDate.now}}</span><span class="right">	操作员：{{userInfo.upmsRealName}}</span></p>
          <p style="height:20px;color:red">	注：此报表为夜审报表，数据统计截止到昨天。。</p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import DatePicker from '@/components/DateComponent/DatePicker';
import {saleAgreementConsumptionDetails} from '@/api/reportCenter/pmsReportFormController'
import {listType} from '@/api/systemSet/type/typeController'
import moment from 'moment'
import { getLodop } from '@/utils/lodop'
export default {
  components:{moment,DatePicker},
  data() {
    return {
      begenAndEnd:{
        begin:moment().subtract(2, "days").format("YYYY-MM-DD"),
        end:moment().subtract(1, "days").format("YYYY-MM-DD")
      },
      tableData: [],
      typeList:[],
      loading:false,
       LODOP: null,
      queryObj:{
        begin:moment().subtract(2, "days").format("YYYY-MM-DD"),
        end:moment().subtract(1, "days").format("YYYY-MM-DD")
      },
      sumObj:{

      },
      printDate:{
        beginDate:moment().subtract(2, "days").format("YYYY-MM-DD"),
        endDate:moment().subtract(1, "days").format("YYYY-MM-DD"),
        now:moment().format("YYYY-MM-DD hh:mm:ss"),
        saleTypePk:""
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
      userInfo:JSON.parse(localStorage.getItem("pms_userinfo")),
      agreementPk:""
    }
  },
  watch:{
    begenAndEnd: function () {
      if (this.begenAndEnd) {
        this.queryObj.begin =this.begenAndEnd.begin;
        this.queryObj.end = this.begenAndEnd.end;
      }
    }
  },
  methods: {
       arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

            //处理行合并 begin 合并行
            if (columnIndex == 0 && row.mergeLine == "Y" && row.mergeColumn != "Y") {
                return {
                rowspan: row.mergeCount,
                colspan: 1
                };
            }
            if(columnIndex == 1 && row.mergeLine == "Y" && row.mergeColumn != "Y"){
                return {
                rowspan: row.mergeCount,
                colspan: 1
                }
            }
            //处理行合并 end
            if(columnIndex == 0 && row.mergeLine != "Y" && row.mergeColumn != "Y"){
                return {
                rowspan: 0,
                colspan: 0
                }
            }
            if(columnIndex == 1 && row.mergeLine != "Y" && row.mergeColumn != "Y"){
                return {
                    rowspan: 0,
                    colspan: 0
                }
            }
            //处理行合并 end  

            if (columnIndex == 0 && row.mergeColumn == "Y") {
                return {
                    rowspan: 1,
                    colspan: 3
                };
            }
            if ((columnIndex == 1 || columnIndex == 2) && row.mergeColumn == "Y") {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
            
      },
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     console.log(column)
    //     if (index === 0) {
    //       sums[index] = '合计';
    //       return;
    //     }
    //     if(column.property === 'roomNightNumber' || column.property === 'lateNumberOfPeople'  || column.property === 'rentIncome' || column.property === 'restaurantIncome' || column.property === 'otherIncome' || column.property === 'totalConsumption') {
    //       const values = data.map(item => parseInt(item[column.property]));
    //       if (!values.every(value => isNaN(value))) {
    //         sums[index] = values.reduce((prev, curr) => {
    //           const value = Number(curr);
    //           if (!isNaN(value)) {
    //             return prev + curr;
    //           } else {
    //             return prev;
    //           }
    //         }, 0);
    //         sums[index] += ' ';
    //       } else {
    //         sums[index] = '';
    //       }
    //     }
    //   });
    //   return sums;
    // },
    init(){
      if(this.queryObj.begin == null || this.queryObj.begin == "" || this.queryObj.end == null || this.queryObj.end == ""){
        this.$message({ type: 'warning', message: "请选择营业时间" })
        return
      }
      var data = {
        beginDate : this.queryObj.begin,
        endDate : this.queryObj.end,
        now:moment().format("YYYY-MM-DD hh:mm:ss"),
        saleTypePk:this.printDate.saleTypePk
      }
      this.loading = true;
      saleAgreementConsumptionDetails(data).then(res=>{
        if(res.code == 1){
          this.tableData = res.data
          this.sumObj = res.data[res.data.length-1]
          this.printDate = data
          this.typeList.forEach((item) => {
              if(item.typePk == data.saleTypePk){
                  this.printDate.saleName = item.typeName
              }
          })
        }
        this.loading = false
      });
    },
    getListType(){
      var data = {
        typeMaster:"SALE",
        pageSize:0,
      }
      listType(data).then(res=>{
        if(res.code == 1){
          this.typeList = this.typeList.concat(res.data.data)
        //   this.printDate.beginDate = '2019-01-13'
        //   this.printDate.endDate = '2019-01-7'
        //   this.printDate.saleTypePk = '546f01d3-c7cd-4c98-adfc-c7628c295862'
          if(res.data.data.length >0){
            this.printDate.saleTypePk = res.data.data[0].typePk
            this.init();
          }
        }
        this.loading = false
      });
    },
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
      // LODOP.SET_PREVIEW_WINDOW(1,);
      this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // LODOP.SET_PRINT_STYLE("Bold",1);//粗体
      // LODOP.SET_PRINT_STYLE("FontSize",20);
      // LODOP.ADD_PRINT_TEXT(50,231,260,39,"【豪斯菲尔公寓（格力香樟）】");//标题
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-salesAgreementConsumptionDetails").innerHTML);
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
    // this.init()
    this.getListType();
  },
  mounted() {
    
  },
}
</script>
<style scoped>
.detail-content{
    min-width:600px;
    width: 60%;
    margin:0 auto;
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
</style>


