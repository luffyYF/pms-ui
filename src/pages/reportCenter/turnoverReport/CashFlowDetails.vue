<template>
  <div>
    <el-col :span="24" class="title">
      <div class="demo-input-suffix">
        <el-form :inline="true" size="mini">
          开始日期：<el-date-picker
                      v-model="form.beginDate"
                      type="date"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期"
                      :clearable="false" size="mini">
                    </el-date-picker>
          结束日期：<el-date-picker
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              :clearable="false" size="mini">
            </el-date-picker>
          <el-button type="primary" size="mini" @click="receptionRoomDate">网页预览</el-button>
          <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
          <el-button type="primary" size="mini" @click="print">打印预览</el-button>
        </el-form>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="tabs">
        <div  id="print-cashFlowDetails">
        <div class="tavs-title">
           <div style="margin-left: 7px;text-align: left;">
            <img :src="activeCompany.companyImg|sourceImgUrl" width="250px">
          </div>
          <h3 style="text-align:center;">现金流明细表</h3>
        </div>
        </div>
          <div id="print-cashFlowDetailsTable">
            <table width="100%" border="0" style="border-collapse:collapse;border-color:black;font-family: 宋体;font-size: 14px;margin:0 auto;color:black;text-align: center;" cellpadding="6" cellspacing="0">
            <thead>
            <tr>
              <td colspan="3" style="text-align: left;font-size: 14px;">店铺:{{activeCompany.companyName}}</td>
              <td colspan="7" style="text-align: right;font-size: 14px;">入住时间：{{form.beginDate}}&nbsp;&nbsp;离店时间:{{form.endDate}}</td>
            </tr>
             <tr>
              <th style="width:10%;border: 1px solid #000;">操作员</th>
              <th style="width:10%;border: 1px solid #000;">客人姓名</th>
              <th style="width:10%;border: 1px solid #000;">房号</th>
              <th style="width:10%;border: 1px solid #000;">房型</th>
              <th style="width:10%;border: 1px solid #000;">入住类型</th>
              <th style="width:10%;border: 1px solid #000;">营业项目</th>
              <th style="width:10%;border: 1px solid #000;">账单类型</th>
              <th style="width:10%;border: 1px solid #000;">消费金额</th>
              <th style="width:10%;border: 1px solid #000;">营业时间</th>
              <th style="width:10%;border: 1px solid #000;">备注</th>
            </tr>
          </thead>
            <tr v-for="(item, index) in tableData" :key="index">
              <td style="border: 1px solid #000;">{{item.createUserName}}</td>
              <td style="border: 1px solid #000;">{{item.memName}}</td>
              <td style="border: 1px solid #000;">{{item.roomNumber}}</td>
              <td style="border: 1px solid #000;">{{item.roomTypeName}}</td>
              <td style="border: 1px solid #000;">
                <span v-if="item.checkInType == '-1'">空房</span>
                <span v-else-if="item.checkInType == '0'">普通房</span>
                <span v-else-if="item.checkInType == '1'">钟点房</span>
                <span v-else-if="item.checkInType == '4'">接待房</span>
              </td>
              <td style="border: 1px solid #000;">{{item.projectName}}</td>
              <td style="border: 1px solid #000;">
                <span v-if="item.billType == 'DUMB'">哑房账</span>
                <span v-else-if="item.billType == 'ROOM'">房间账单/正常账单</span>
                <span v-else-if="item.billType == 'OUTSIDE'">外账</span>
              </td>
              <td style="border: 1px solid #000;">{{item.consumptionAmount}}</td>
              <td style="border: 1px solid #000;">{{item.businessDate}}</td>
              <td style="border: 1px solid #000;">{{item.remark}}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000;">合计</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">{{a}}</td>
              <td style="border: 1px solid #000;">N/A</td>
              <td style="border: 1px solid #000;">N/A</td>
            </tr>
             <tfoot>
            <tr>
              <td colspan="4" style="text-align: left;font-size: 14px;">打印人：<span>{{userInfo.realName}}</span></td>
              <td colspan="6" style="text-align: right;font-size: 14px;">打印日期：<span>{{datepickerTime}}</span></td>
            </tr>
          </tfoot>
          </table>
          </div> 
      </div>
    </el-col>
  </div>
</template>
<script>
import {cashFlowDetailsReport} from '@/api/reportCenter/pmsReportFormController'
import {formatDate, copyObj} from '@/utils/index'
import moment from "moment"
import common from "@/api/common"
import exportExcel from '@/components/download/exportExcel'
import { getLodop } from '@/utils/lodop'

export default {
  data() {
    return {
      loading: false,
      a:'0',
      form: {     
        beginDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        endDate:moment().add(1,'days').format("YYYY-MM-DD hh:mm:ss"),
        userPk:'',
        projectPk:''
      },
      datepickerTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      tableData: [],
      baseUrl:common.baseUrl,
      ziurl:"/report/cashFlowDetailsReportExcel",
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
    this.receptionRoomDate();
  },
  methods: {
    receptionRoomDate(){
      this.loading = true
      cashFlowDetailsReport(this.form).then(res => {
        this.tableData = res.data
        var sum = 0;
          for(var i=0;i<this.tableData.length;i++){
             sum += this.tableData[i].consumptionAmount;
          }
          this.a = sum;
        this.loading = false
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
      this.LODOP.PRINT_INITA(0 , 0, 794, 1123, "现金流明细报表打印");
      this.LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);// 显示背景
      this.LODOP.SET_SHOW_MODE("HIDE_PAGE_PERCENT", true);
      this.LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", 1);
      this.LODOP.ADD_PRINT_TABLE(118,"1%","98%",975,document.getElementById("print-cashFlowDetailsTable").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      this.LODOP.SET_PRINT_STYLEA(0,"TableHeightScope",1);
      this.LODOP.ADD_PRINT_HTM(16,"1%","98%",109,document.getElementById("print-cashFlowDetails").innerHTML);
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",1);
      this.LODOP.ADD_PRINT_HTM(1093,"2%","98%",30,"<font color='#000000' size='2'><span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span></font>");
      this.LODOP.SET_PRINT_STYLEA(0,"ItemType",1);
      this.LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl + "?beginDate=" + this.form.beginDate + "&endDate=" + this.form.endDate + "&userPk=" + this.form.userPk + "&projectPk=" + this.form.projectPk);
    },
  },filters: {
      /* 格式化时间戳 */
      formatDate (val) {
          if(!val){
            return ""
          }
          return moment(new Date(val)).format("YY/MM/DD HH:mm:ss")
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
  text-align: center;
  margin-top: 20px;
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
