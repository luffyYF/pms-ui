<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
        <!-- 营业日期：<el-date-picker v-model="datepicker"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" 
                  :picker-options="startTimeOptions"
                  size="mini" :clearable="false">
              </el-date-picker> -->
        <el-form-item label="开始日期">
        <el-date-picker
          v-model="begin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="end"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          size="mini"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
        房号：<el-input v-model="roomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>

        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="historyStoreDate">网页预览</el-button>
          <!-- <el-button type="primary" size="mini">PDF预览</el-button> -->
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
        </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div class="tavs-title" id="print-historystore">
           <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3 style="text-align:center;">{{activeCompany.companyName}}</h3> -->
          <h3 style="text-align:center;">历史离店报表</h3>
        </div>
        <div class="tabs-contetn" id="print-historystoreTable">
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
          <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 12px;margin:0 auto;color:black;text-align: center;" cellpadding="0" cellspacing="0">
             <thead>
            <tr>
              <td colspan="8" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td colspan="9" style="text-align: right;font-size: 14px;">营业日期从：{{begin}}&nbsp;&nbsp;到&nbsp;&nbsp;{{end}}&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
              <th rowspan="2" style="width:7%;border: 1px solid #000;">组单号</th>
              <th rowspan="2" style="width:5%;border: 1px solid #000;">房号</th>
              <th rowspan="2" style="width:8%;border: 1px solid #000;">房间类型</th>
              <th rowspan="2" style="width:5%;border: 1px solid #000;">房价</th>
              <th rowspan="2" style="width:8%;border: 1px solid #000;">宾客姓名</th>
              <th rowspan="2" style="width:8%;border: 1px solid #000;">入住时间</th>
              <th rowspan="2" style="width:8%;border: 1px solid #000;">离店时间</th>
              <th colspan="2" style="width:8%;border: 1px solid #000;">消费</th>
              <th rowspan="2" style="width:7%;border: 1px solid #000;">消费合计</th>
              <th colspan="5" style="width:24%;border: 1px solid #000;">结算</th>
              <th rowspan="2" style="width:7%;border: 1px solid #000;">结算合计</th>
              <th rowspan="2" style="width:12%;border: 1px solid #000;">操作员</th>
            </tr>
            <tr>
              <th style="border: 1px solid #000;">房费</th>
              <th style="border: 1px solid #000;">其他</th>
              <th style="border: 1px solid #000;">现金</th>
              <th style="border: 1px solid #000;">银行卡</th>
              <th style="border: 1px solid #000;">支付宝</th>
              <th style="border: 1px solid #000;">微信支付</th>
              <th style="border: 1px solid #000;">其他</th>
            </tr>
          </thead>

            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.orderNo}}</td>
              <td style="border: 1px solid #000;"><span>{{item.roomNumber == 'null' ? "" : item.roomNumber}}</span></td>
              <td style="border: 1px solid #000;">{{item.typeName}}</td>
              <td style="border: 1px solid #000;"><span>{{item.price == 'null' ? "" : item.price}}</span></td>
              <td style="border: 1px solid #000;">{{item.memName}}</td>
              <td style="border: 1px solid #000;">{{item.beginDate}}</td>
              <td style="border: 1px solid #000;">{{item.endDate}}</td>
              <td style="border: 1px solid #000;">{{item.totalRoomPrice}}</td>
              <td style="border: 1px solid #000;">{{item.totalOrderPrice}}</td>

              <td style="border: 1px solid #000;">{{item.consumptionAmount}}</td>
              <td style="border: 1px solid #000;">{{item.cash}}</td>
              <td style="border: 1px solid #000;">{{item.bankCard}}</td>
              <td style="border: 1px solid #000;">{{item.aliPay}}</td>
              <td style="border: 1px solid #000;">{{item.wxPay}}</td>
              <td style="border: 1px solid #000;">{{item.preLicensing + item.check + item.remittance + item.order}}</td>
              <td style="border: 1px solid #000;">{{item.settlementAmount}}</td>
              <td style="border: 1px solid #000;"><span>{{item.createUserName == 'null' ? "" : item.createUserName}}</span></td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="8" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="9" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          <!-- <p style="height:60px;"><span class="left">打印日期：{{datepickerTime}}</span><span class="right">	打印人：	{{userInfo.realName}}</span></p> -->
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
import moment from "moment"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      // datepicker: [formatDate(new Date(), 'yyyy-MM-dd'), formatDate(new Date(), 'yyyy-MM-dd')],
      begin:moment().format("YYYY-MM-DD"),
      end:moment().add(1,'days').format("YYYY-MM-DD"),
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
      // const datepicker = this.datepicker;
      // historyStore({begin: datepicker[0], end: datepicker[1], roomNumber: this.roomNumber}).then(res => {
      //   console.log(res.data)
      //   this.tableData = res.data
      //   this.loading = false
      // })
      historyStore({begin: this.begin, end: this.end, roomNumber: this.roomNumber}).then(res => {
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
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,803,document.getElementById("print-historystoreTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-historystore").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "历史离店报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-historystoreTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-historystore").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
    exportReport() {
      // exportExcel(this.baseUrl + this.ziurl + "?begin=" + this.datepicker[0] + "&end=" + this.datepicker[1] + "&roomNumber=" + this.roomNumber);
       exportExcel(this.baseUrl + this.ziurl + "?begin=" + this.begin + "&end=" + this.end + "&roomNumber=" + this.roomNumber);
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


