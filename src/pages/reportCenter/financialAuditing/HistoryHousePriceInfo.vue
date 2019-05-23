<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
          修改日期自：<el-date-picker
                      v-model="form.beginDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :clearable="false" size="mini">
                    </el-date-picker>
          至：<el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :clearable="false" size="mini">
            </el-date-picker>
          房号：<el-input v-model="form.roomNumber" size="mini" style="width:120px;margin-bottom:5px"></el-input>
        <!-- <div style="margin-top:10px;"> -->
          <el-button type="primary" size="mini" @click="rentContractDate">网页预览</el-button>
          <el-button type="primary" size="mini">PDF预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        <!-- </div> -->
        </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div id="print-historyHousePriceInfo">
        <div class="tavs-title">
            <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <!-- <h3  style="text-align:center;">{{activeCompany.companyName}}</h3> -->
          <h3 style="text-align:center;">历史房价信息报表</h3>
        </div>
          <!-- <p style="text-align: center;">
            修改日期：自&nbsp;&nbsp;{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}
          </p> -->
        </div>
          <!-- <el-table
            v-loading="loading" 
            :data="tableData" 
            border 
            :header-cell-style="tableStyleObj"
            :cell-style="tableStyleObj"
            style="width: 100%; margin-top: 5px;border:1px solid black">
            <el-table-column prop="orderNo" label="组单号"></el-table-column>
            <el-table-column prop="channelTypeName" label="客源渠道"></el-table-column>
            <el-table-column prop="roomNumber" label="房号"></el-table-column>
            <el-table-column prop="roomTypeName" label="房型"></el-table-column>
            <el-table-column prop="rentPrice" label="房价"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'RESERVE'">预定</span>
                <span v-else-if="scope.row.status == 'VALID'">有效</span>
                <span v-else>取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="memName" label="会员信息">
              <template slot-scope="scope">
                <span>
                  {{scope.row.cardNumber != null ? scope.row.cardNumber : ""}}
                  {{(scope.row.cardNumber != null && scope.row.memName != null) ? "," : ""}}
                  {{scope.row.memName != null ? scope.row.memName : ""}}
                  {{((scope.row.memName != null && scope.row.certificateNo != null) || (scope.row.cardNumber != null && scope.row.certificateNo != null)) ? "," : ""}}
                  {{scope.row.certificateNo != null ? scope.row.certificateNo : ""}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="营业日期"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table> -->
          <div id="print-historyHousePriceInfoTable">
           <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
              <thead>
            <tr>
              <td colspan="5" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td  colspan="9" style="text-align: right;font-size: 14px;">修改日期：自&nbsp;&nbsp;{{form.beginDate}}&nbsp;&nbsp;至&nbsp;&nbsp;{{form.endDate}}</td>
            </tr>
            <tr>
              <th style="width:10%;border: 1px solid #000;">组单号</th>
              <th style="width:12%;border: 1px solid #000;">客源渠道</th>
              <th style="width:8%;border: 1px solid #000;">房号</th>
              <th style="width:10%;border: 1px solid #000;">房型</th>
              <th style="width:8%;border: 1px solid #000;">房价</th>
              <th style="width:10%;border: 1px solid #000;">状态</th>
              <th style="width:11%;border: 1px solid #000;">会员信息</th>
              <th style="width:12%;border: 1px solid #000;">营业日期</th>
              <th style="width:12%;border: 1px solid #000;">修改时间</th>
              <th style="width:8%;border: 1px solid #000;">备注</th>
            </tr>
          </thead>
            <!-- <tr>
              <th style="width:10%;border: 1px solid #000;">组单号</th>
              <th style="width:12%;border: 1px solid #000;">客源渠道</th>
              <th style="width:8%;border: 1px solid #000;">房号</th>
              <th style="width:10%;border: 1px solid #000;">房型</th>
              <th style="width:8%;border: 1px solid #000;">房价</th>
              <th style="width:10%;border: 1px solid #000;">状态</th>
              <th style="width:10%;border: 1px solid #000;">会员信息</th>
              <th style="width:12%;border: 1px solid #000;">营业日期</th>
              <th style="width:12%;border: 1px solid #000;">修改时间</th>
              <th style="width:8%;border: 1px solid #000;">备注</th>
            </tr> -->
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.orderNo}}</td>
              <td style="border: 1px solid #000;">{{item.channelTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.roomTypeName}}</td>
              <td style="border: 1px solid #000;">{{item.rentPrice}}</td>
              <!-- <td>{{item.status}}</td> -->
              <td style="border: 1px solid #000;"><span v-if="item.status == 'RESERVE'">预定</span>
                <span v-else-if="item.status == 'VALID'">有效</span>
                <span v-else>取消</span>
              </td>
              <td style="border: 1px solid #000;"><span>
                  {{item.cardNumber != null ? item.cardNumber : ""}}
                  {{(item.cardNumber != null && item.memName != null) ? "," : ""}}
                  {{item.memName != null ? item.memName : ""}}
                  {{((item.memName != null && item.certificateNo != null) || (item.cardNumber != null && item.certificateNo != null)) ? "," : ""}}
                  {{item.certificateNo != null ? item.certificateNo : ""}}
             </span>
              </td>
               <td style="border: 1px solid #000;">{{item.date}}</td>
              <td style="border: 1px solid #000;">{{item.updateTime}}</td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="7" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="7" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
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
import {rentContract} from '@/api/reportCenter'
import {formatDate, copyObj} from '@/utils/index'
import moment from "moment"
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      loading: false,
      form: {
        beginDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(1,'days').format("YYYY-MM-DD"),
        roomNumber: ''
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      tableStyleObj:{
        border: '1px solid black',
        padding: '8px',
        'text-align':'center',
         'font-family': '宋体',
        'font-size': '14px',
        'color':'black',
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/rentContractExcel",
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
    this.rentContractDate();
  },
  methods: {
    rentContractDate(){
      this.loading = true
      rentContract(this.form).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    //打印预览
    // print(){
    //   let bodyhtml = document.getElementById("print-historyHousePriceInfo").innerHTML;
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
      // this.LODOP.ADD_PRINT_TABLE(90,10,770,803,document.getElementById("print-historyHousePriceInfoTable").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"Vorient",2);
      // this.LODOP.ADD_PRINT_HTM(10,10,770,80,document.getElementById("print-historyHousePriceInfo").innerHTML);
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      // this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      // this.LODOP.ADD_PRINT_HTM(1063,15,300,60,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>")
      // this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1); // 设定打印项的基本属性 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
      // this.LODOP.SET_PRINT_STYLEA(0,"Horient",0); // 设定打印项在纸张内的水平位置锁定方式 0--左边距锁定 1--右边距锁定 2--水平方向居中 3--左边距和右边距同时锁定（中间拉伸），缺省值是0。
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "历史房价信息报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-historyHousePriceInfoTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-historyHousePriceInfo").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.beginDate + "&endDate=" + this.form.endDate + "&roomNumber=" + this.form.roomNumber);
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


