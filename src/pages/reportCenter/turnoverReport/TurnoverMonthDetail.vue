<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
        营业日期：<el-date-picker v-model="datepicker" value-format="yyyy-MM" type="month" placeholder="选择月份" size="mini"></el-date-picker>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="reportBusinessIncome()">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" :disabled="true">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
        </el-form>
      </div>
      <div class="tips">
        <p>注：数据统计截止到昨天</p>
        <p>应收金额 = 总营业额 - 佣金 - 优惠、促销价</p>
        <p>实际收入 = 应收金额 / ( 1 + 0.06 )</p>
        <p>平均房价 = 实际收入 / 已租房数量</p>
      </div>
    </el-col>
    <el-col :span="24" >
      <div class="tabs">
        <div class="tavs-title" id="print-turnoverofbusinessincome">
           <div style="margin-left: 7px;text-align: left;margin-top:20px">
              <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
           </div>
          <h3 style="text-align:center;">各营业点收入月报表</h3>
        </div>
          <el-table
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            :data="tableData"
            :show-summary="true"
            :summary-method="getSummaries"
            @expand-change="expandChange"
            border
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="companyName" label="营业点" width="300"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                :header-cell-style="tableStyleObj"
                :cell-style="tableStyleObj"
                :data="subTableData[scope.row.companyPk]" border>
                  <el-table-column width="120" v-for="(v,i) in subHeads[scope.row.companyPk]" :prop="v.code" :label="v.desc" :key="i"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="totalTurnover" label="营业额"></el-table-column>
            <el-table-column prop="totalCommission" label="佣金"></el-table-column>
            <el-table-column prop="totalPromotion" label="优惠/促销价"></el-table-column>
            <el-table-column prop="receivablePrice" label="应收金额"></el-table-column>
            <el-table-column prop="afterTaxes" label="实际收入"></el-table-column>
            <el-table-column prop="avgRoomPrice" label="平均房价"></el-table-column>
          </el-table>
          <div id="print-turnoverofbusinessincomeTable"  style="display:none;">
          <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
           <thead>
            <tr>
            <td colspan="13" style="text-align: right;">营业日期:{{datepicker}}</td>
            </tr>
          </thead>
          <tbody>
            <tr >
              <th style="border: 1px solid #000;">营业点</th>
              <th style="border: 1px solid #000;" v-for="(item, index) in tableData" :key="index">{{item.companyName}}</th>
            </tr>
             <tr >
              <td style="border: 1px solid #000;">营业额</td>
              <td style="border: 1px solid #000;" v-for="(item, index) in tableData" :key="index">{{item.totalTurnover}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;">佣金</td>
              <td style="border: 1px solid #000;" v-for="(item, index) in tableData" :key="index">{{item.totalCommission}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;">优惠/促销价</td>
              <td style="border: 1px solid #000; " v-for="(item, index) in tableData" :key="index">{{item.totalPromotion}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;">实际收入</td>
              <td style="border: 1px solid #000;"  v-for="(item, index) in tableData" :key="index">{{item.afterTaxes}}</td>
            </tr>
             <tr>
              <td style="border: 1px solid #000;">平均房价</td>
              <td style="border: 1px solid #000;"  v-for="(item, index) in tableData" :key="index">{{item.avgRoomPrice}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;text-align: left">渠道</td>
              <td style="border: 1px solid #000;">{{judao.a}}</td>
              <td style="border: 1px solid #000;">{{judao.b}}</td>
              <td style="border: 1px solid #000;">{{judao.c}}</td>
              <td style="border: 1px solid #000;">{{judao.d}}</td>
              <td style="border: 1px solid #000;">{{judao.e}}</td>
              <td style="border: 1px solid #000;">{{judao.f}}</td>
              <td style="border: 1px solid #000;">{{judao.g}}</td>
              <td style="border: 1px solid #000;">{{judao.h}}</td>
              <td style="border: 1px solid #000;">{{judao.i}}</td>
              <td style="border: 1px solid #000;">{{judao.g}}</td>
              <td style="border: 1px solid #000;">{{judao.k}}</td>
              <td style="border: 1px solid #000;">{{judao.l}}</td>
              <!-- <td style="border: 1px solid #000;text-align: left" :colspan="tableData.length"></td> -->
            </tr>
             <tr  v-for="(item, index) in head" :key="index">
              <td style="border: 1px solid #000;text-align: right" >{{item.desc}}</td>
              <td style="border: 1px solid #000;"  v-for="(ele, index) in tableData" :key="index">{{ele[item.code]}}</td>
            </tr>
            </tbody>
             <tfoot>
            <tr>
              <td colspan="6" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="6" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
           </div>
          <p style="height:20px;"><span class="left">打印人：{{userInfo.realName}}</span><span class="right">打印日期：{{datepickerTime}}</span></p>
          <p class="note_p2"></p>
      </div>
    </el-col>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>
<script>
import common from "@/api/common"
import {turnoverMoth,turnoverMonthDetail} from '@/api/reportCenter/pmsReportFormController'
import moment from "moment"
import { getLodop } from '@/utils/lodop'
export default {
  data() {
    return {
      datepicker: moment().format("YYYY-MM"),
      datepickerTime:  moment().format("YYYY-MM-DD HH:mm:ss"),
      value: '',
      tableData: [],
      head:[],
      subTableData:{},
      subHeads:{},
      startTimeOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
         'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      judao:{
        a:0,
        b:0,
        c:0,
        d:0,
        e:0,
        f:0,
        g:0,
        h:0,
        i:0,
        j:0,
        k:0,
        l:0
      },
      userInfo: JSON.parse(localStorage.getItem('pms_userinfo')),
       LODOP: null
    }
  },
  created(){
    this.reportBusinessIncome();
    this.monthDetail();
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
  methods: {
    //组装table数据
    monthDetail(){
      const datepicker = this.datepicker;
      turnoverMoth({month:datepicker}).then(res => {
        this.tableData = res.data
        this.subTableData = {}
        this.subHeads = {}
        this.head=[]
        this.tableData.forEach(item=>{
        turnoverMonthDetail({month:this.datepicker,
        companyPk:item.companyPk}).then(resp=>{
        this.head=resp.data.headers
        this.subHeads = Object.assign({}, this.subHeads);
        this.$set(this.subTableData,item.companyPk,resp.data.tableData)
        for (var obj in resp.data.tableData[0]) {
         item[obj] = resp.data.tableData[0][obj];
        }
      })
        })
      })
      },

    reportBusinessIncome(){
      const datepicker = this.datepicker;
      turnoverMoth({month:datepicker}).then(res => {
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
        month:this.datepicker,
        companyPk:row.companyPk
      }
      turnoverMonthDetail(data).then(res=>{
        // this.$set(this.subTableData,'43497ebc-ec16-4b82-89c5-a95e6a52d519',[{'channel0':'哈哈哈大','channel1':'牛逼'}])
        // this.$set(this.subHeads,row.companyPk,res.data.headers)
        this.subHeads[row.companyPk]=res.data.headers
        this.subHeads = Object.assign({}, this.subHeads);
        this.$set(this.subTableData,row.companyPk,res.data.tableData)
      })
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
      // this.LODOP.NewPageA(); // 自动分页
      // this.LODOP.SET_PRINT_PAGESIZE(1,0,0, "A4");//1指定纵向打印，指定A4纸，
      // this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      // this.LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", 'Full-Width');// 打印页整宽显示
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,903,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "营业收入月报打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-turnoverofbusinessincomeTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-turnoverofbusinessincome").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);

    }
  }
}
</script>
<style scoped>
.tips{
  color: red;
  margin-top: 10px;
}
.tips p{
  margin:0px;
}
.tips :nth-child(n+2){
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



