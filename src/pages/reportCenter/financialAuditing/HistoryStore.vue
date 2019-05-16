<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  size="mini" :clearable="false">
              </el-date-picker>
        房号：<el-input v-model="roomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>
        <div style="margin-top:10px;">
          <el-button type="primary" size="mini" @click="historyStoreDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24" id="print-historystore">
      <div class="tabs">
        <div class="tavs-title">
          <h3 style="text-align:center;">{{activeCompany.companyName}}</h3>
          <h4 style="text-align:center;">历史离店报表</h4>
        </div>
        <div class="tabs-contetn">
          <!-- <el-table 
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="roomNumber" label="房号">
              <template slot-scope="scope">
                <span>{{scope.row.roomNumber == 'null' ? "" : scope.row.roomNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="房间类型"></el-table-column>
            <el-table-column prop="price" label="房价">
              <template slot-scope="scope">
                <span>{{scope.row.price == 'null' ? "" : scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="memName" label="宾客姓名"></el-table-column>
            <el-table-column prop="beginDate" label="入住时间"></el-table-column>
            <el-table-column prop="endDate" label="离店时间"></el-table-column>
            <el-table-column prop="amount3" label="消费">
              <template>		
                <el-table-column prop="totalRoomPrice" label="房费"></el-table-column> -->
                <!-- <el-table-column prop="amount3" label="商品"></el-table-column> -->
                 <!--  <el-table-column prop="totalOrderPrice" label="其他"></el-table-column>
              </template>
            </el-table-column>					
            <el-table-column prop="consumptionAmount" label="消费合计	"></el-table-column>
            <el-table-column prop="amount3" label="结算">
              <template>		
                <el-table-column prop="cash" label="现金"></el-table-column>
                <el-table-column prop="bankCard" label="银行卡"></el-table-column> -->
                <!-- <el-table-column prop="amount3" label="储值卡"></el-table-column> -->
              <!-- <el-table-column prop="aliPay" label="支付宝"></el-table-column>
                <el-table-column prop="wxPay" label="微信支付"></el-table-column>
                <el-table-column prop="amount3" label="其他">
                  <template slot-scope="scope">
                    {{scope.row.preLicensing + scope.row.check + scope.row.remittance + scope.row.order}}
                  </template>
                </el-table-column>
              </template>
            </el-table-column>		
            <el-table-column prop="settlementAmount" label="结算合计	"></el-table-column>
            <el-table-column prop="createUserName" label="操作员	">
              <template slot-scope="scope">
                <span>{{scope.row.createUserName == 'null' ? "" : scope.row.createUserName}}</span>
              </template>
            </el-table-column>
          </el-table> -->
          <table width="100%" border="1" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <tr>
              <th rowspan="2">组单号</th>
              <th rowspan="2">房号</th>
              <th rowspan="2">房间类型</th>
              <th rowspan="2">房价</th>
              <th rowspan="2">宾客姓名</th>
              <th rowspan="2">入住时间</th>
              <th rowspan="2">离店时间</th>
              <th colspan="2">消费</th>
              <th rowspan="2">消费合计</th>
              <th colspan="5">结算</th>
              <th rowspan="2">结算合计</th>
              <th rowspan="2">操作员</th>
            </tr>
            <tr>
              <th>房费</th>
              <th>其他</th>
              <th>现金</th>
              <th>银行卡</th>
              <th>支付宝</th>
              <th>微信支付</th>
              <th>其他</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{item.orderNo}}</td>
              <td><span>{{item.roomNumber == 'null' ? "" : item.roomNumber}}</span></td>
              <td>{{item.typeName}}</td>
              <td><span>{{item.price == 'null' ? "" : item.price}}</span></td>
              <td>{{item.memName}}</td>
              <td>{{item.beginDate}}</td>
              <td>{{item.endDate}}</td>
              <td>{{item.totalRoomPrice}}</td>
              <td>{{item.totalOrderPrice}}</td>

              <td>{{item.consumptionAmount}}</td>
              <td>{{item.cash}}</td>
              <td>{{item.bankCard}}</td>
              <td>{{item.aliPay}}</td>
              <td>{{item.wxPay}}</td>
              <td>{{item.preLicensing + item.check + item.remittance + item.order}}</td>
              <td>{{item.settlementAmount}}</td>
              <td><span>{{item.createUserName == 'null' ? "" : item.createUserName}}</span></td>
            </tr>
          </table>
          <p style="height:60px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	打印人：	{{userInfo.upmsUserName}}</span></p>
        </div>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import {historyStore} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      datepicker: [formatDate(new Date(), 'yyyy-MM-dd'), formatDate(new Date(), 'yyyy-MM-dd')],
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      roomNumber: '',
      tableData: [],
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      loading: false,
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
        'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/historyStoreExcel",
       LODOP: null
    }
  },
  created(){
    var test = window.localStorage.getItem("current_logon_company");
    this.activeCompany = JSON.parse(test);
    if (
      this.activeCompany.companyName == "" ||
      this.activeCompany.companyName == null ||
      this.activeCompany.companyName == undefined
    ) {
      this.activeCompany.companyName == "";
    }
    this.userInfo = JSON.parse(localStorage.getItem('pms_userinfo'));
    this.historyStoreDate();
  },
  methods: {
    historyStoreDate(){
      this.loading = true
      const datepicker = this.datepicker;
      historyStore({begin: datepicker[0], end: datepicker[1], roomNumber: this.roomNumber}).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.loading = false
      })
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-historystore").innerHTML;
    //   var f = document.getElementById("printIframe");
    //   f.contentDocument.write(bodyhtml);
    //   f.contentDocument.close();
    //   f.contentWindow.print();
    // },
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
      this.LODOP.ADD_PRINT_HTM(10,10,774,1103,document.getElementById("print-historystore").innerHTML);
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?begin=" + this.datepicker[0] + "&end=" + this.datepicker[1] + "&roomNumber=" + this.roomNumber);
    },
  }
}
</script>
<style scoped>
.title{
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
}
.tavs-title{
  padding: 20px;
  text-align: center;
  height: calc(100% - 100px);
  overflow-y: auto;
  border-top: 3px solid #eee;

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


