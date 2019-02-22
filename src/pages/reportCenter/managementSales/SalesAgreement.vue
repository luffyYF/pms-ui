<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        
        <el-form :inline="true" size="mini" class="demo-form-inline">
          <el-form-item label="营业日期：" prop="begenAndEnd">
          <date-picker v-model="begenAndEnd"></date-picker>
          </el-form-item>
            <el-form-item label="协议类型:">
            <el-select v-model="printDate.agreementTypePk" placeholder="选择协议类型">
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
        <el-button type="primary" size="mini">打印预览</el-button>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title">
          <h3>深圳市前海豪斯菲尔信息科技有限公司</h3>
          <h3>销售分析报表 - 协议单位</h3>
        </div>
        <div class="tabs-contetn">
          <p style="margin: 0px">营业日期：<span>自 {{printDate.beginDate}} 至 {{printDate.endDate}}</span></p>
          <!-- show-summary :summary-method="getSummaries" -->
          <el-table :data="tableData" v-loading="loading" border height="450"  style="width: 100%; margin-top: 5px">
            <el-table-column prop="agreementName" label="协议单位"></el-table-column>
            <el-table-column prop="rentalRoomNum" label="房晚数" width="70"></el-table-column>
            <el-table-column label="房晚数%" width="90">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,1)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="peopleNightRoomNum" label="人晚数" width="70"></el-table-column>
            <el-table-column label="人晚数%" width="90">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,2)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="houseFeeIncome" label="房租收入"></el-table-column>
            <el-table-column label="房租收入%">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,3)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="cateringFeeIncome" label="餐饮收入"></el-table-column>
            <el-table-column prop="orderFeeIncome" label="其他收入"></el-table-column>
            <el-table-column prop="consumptionAmount" label="消费合计"></el-table-column>
            <el-table-column label="消费合计%">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,4)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="平均房价">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,5)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="房均消费">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,6)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
            <el-table-column label="人均消费">
              <template slot-scope="scope">
                  <span v-if="tableData.length-1 != scope.$index">{{scope.row | moneyFilter(sumObj,7)}}</span>
                  <!-- <span>{{scope.row}}</span> -->
              </template>
            </el-table-column>
          </el-table>
          <p style="height:20px;"><span class="left">打印日期：{{printDate.now}}</span><span class="right">	操作员：	{{userInfo.upmsRealName}}</span></p>
          <p style="height:20px;color:red">	注：此报表为夜审报表，数据统计截止到昨天。。</p>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import DatePicker from '@/components/DateComponent/DatePicker';
import {agreementSaleAnalysis} from '@/api/reportCenter/pmsReportFormController'
import {listType} from '@/api/systemSet/type/typeController'
import moment from 'moment'
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
        agreementTypePk:""
      },
      userInfo:JSON.parse(localStorage.getItem("pms_userinfo")),
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
        agreementTypePk:this.printDate.agreementTypePk
      }
      this.loading = true;
      agreementSaleAnalysis(data).then(res=>{
        if(res.code == 1){
          this.tableData = res.data
          this.sumObj = res.data[res.data.length-1]
          this.printDate = data
        }
        this.loading = false
      });
    },
    getListType(){
      var data = {
        typeMaster:"AGREEMENT",
        pageSize:0,
      }
      
      listType(data).then(res=>{
        if(res.code == 1){
          this.typeList = [{
            typePk:"",
            typeName:"全部"
          }]
          this.typeList = this.typeList.concat(res.data.data)
        }
        this.loading = false
      });
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
    this.init()
    this.getListType();
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


