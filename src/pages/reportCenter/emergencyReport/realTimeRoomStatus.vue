<template>
  <div style="height:100%;">
    <div class="primary-tool">
        <el-button type="primary" size="mini" @click="init()">网页预览</el-button>
        <el-button type="primary" size="mini">PDF预览</el-button>
        <el-button type="primary" size="mini"><a class="exportLink" :href="baseRul+'pms/report/shiShiFangTaiExcel'" target="_blank">导出EXCEL</a></el-button>
        <el-button type="primary" size="mini">添加到收藏夹</el-button>
        <el-button type="primary" size="mini" @click="print">打印预览</el-button>
    </div>
    <div class="table-container" id="print-realtimeroomstatus">
      <h3>{{activeCompany.companyName}}</h3>
      <h4>实时房态报表</h4>
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
        <el-table-column prop="roomNumber" align="center" label="房间号"></el-table-column>
        <el-table-column prop="roomTypeName" align="center" label="房型"></el-table-column>
        <el-table-column prop="roomStatus" align="center" label="房态">
          <template slot-scope="scope">
            <span>{{roomStatus[scope.row.roomStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="guestName" align="center" label="有无客人" >
          <template slot-scope="scope">
            <span>{{scope.row.guestName == "null"?"无":"有"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="guestName" align="center" label="客人姓名" >
          <template slot-scope="scope">
            <span>{{scope.row.guestName == "null"?"":scope.row.guestName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaveFlag" align="center" label="预离">
          <template slot-scope="scope">
            <span>{{scope.row.leaveFlag == "N"?"否":"是"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 打印填充 iframe-->
    <iframe id="printIframe" src="" width="0" height="0" frameborder="0"></iframe>
  </div>
</template>

<script>
import {roomStatus,reportShiShiFangTai} from "@/api/reportCenter/pmsReportFormController"
import moment from "moment"
export default {
  data() {
    return {
      sDate: moment().format("YYYY-MM-DD"),
      sTime: moment().format("HH:mm:ss"),
      roomStatus:roomStatus,
      tableData: [],
      tableStyleObj:{
        border: '1px solid #ebeef5',
        padding: '8px',
        'text-align':'center'
      },baseRul:"http://localhost:8083/pms/"
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
    getList(){
      let self = this
      reportShiShiFangTai().then((data)=>{
        console.log(data.data)
        if(data.code == 1){
          self.tableData =  data.data
        }
      });
    },
    //打印预览
    print(){
      let bodyhtml = document.getElementById("print-realtimeroomstatus").innerHTML;
      var f = document.getElementById("printIframe");
      f.contentDocument.write(bodyhtml);
      f.contentDocument.close();
      f.contentWindow.print();
    }
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
