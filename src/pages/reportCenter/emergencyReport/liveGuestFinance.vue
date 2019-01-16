<template>
  <div style="height:100%;">
        <div class="primary-tool">
            <el-button type="primary" size="mini" @click="init()">网页预览</el-button>
            <el-button type="primary" size="mini">PDF预览</el-button>
            <!-- 导出EXCEL -->
            <el-button type="primary" size="mini" @click="exportReport">导出EXCEL</el-button>
            <!-- <el-button type="primary" size="mini">添加到收藏夹</el-button> -->
            <el-button type="primary" size="mini" @click="print">打印预览</el-button> 
        </div>
        <div class="table-container" id="print-liveguestfinance">
          <h3>{{activeCompany.companyName}}</h3>
          <h4>在住客人账务明细报表</h4>
          <span style="padding-right:20px">打印日期：{{sDate}}</span>
          <span style="padding-right:20px">打印时间：{{sTime}}</span>
          <span>营业日期：{{sDate}}</span>
          <el-table 
            :header-cell-style="tableStyleObj" 
            :cell-style="tableStyleObj"
            :data="tableData"
            border 
            style="width: 100%; margin:0 auto;" 
            height="450">
            <el-table-column prop="projectName" align="center" label="项目" ></el-table-column>
            <el-table-column prop="consumptionAmount" align="center" label="消费金额" ></el-table-column>
            <el-table-column prop="settlementAmount" align="center" label="结算金额" ></el-table-column>
            <el-table-column prop="createTime" align="center" label="发生时间"></el-table-column>                
            <el-table-column prop="createUserName" align="center" label="操作员" ></el-table-column>
            <el-table-column prop="remark" align="center" label="备注"></el-table-column>
          </el-table>
        </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import common from "@/api/common"
import {reportZaiiZhuKeRenCaiWuMingXi,zaiZhuKeRenCaiWuMingXiExcel} from "@/api/reportCenter/pmsReportFormController"
import moment from "moment"
import exportExcel from '@/components/download/exportExcel'
export default {
  data() {
    return {
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      tableData: [],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },
      baseUrl:common.baseUrl,
      ziurl:"/report/zaiZhuKeRenCaiWuMingXiExcel"
    };
  },
  created() {
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
    init(){
      this.getList()
    },
    getExcel(){
        alert("55");
        window.open("/http://localhost:8083/pms/pms/report/zaiZhuKeRenCaiWuMingXiExcel", '_blank'); 
  
        // window.open = "http://localhost:8083/pms/pms/report/zaiZhuKeRenCaiWuMingXiExcel";
        alert("66");
      // zaiZhuKeRenCaiWuMingXiExcel().then(res=>{
      //   // alert(JSON.stringify(res));
      //   // this.download(res);
      // }).catch(error=>{
      // })
    },
    getList(){
      let self = this
      reportZaiiZhuKeRenCaiWuMingXi().then((data)=>{
        if(data.code == 1){
          self.tableData =  data.data
        }
      });
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-liveguestfinance").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    },
    exportReport() {
      exportExcel(this.baseUrl + this.ziurl);
    },
  }
};
</script>

<style scoped>
  .exportLink{
    color: white;
    text-decoration: none;
  }
 .table-container {
    padding: 20px;
    text-align: center;
    height: calc(100% - 180px);
    overflow-y: auto;
  }
</style>
